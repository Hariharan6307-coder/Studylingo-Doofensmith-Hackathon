import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

app.get('/', (req, res) => {
  res.send('Backend is running')
});

app.post('/register', async(req, res) => {
  const {name, email, password} = req.body;

  await supabase.auth.signUp({
    email: email, password: password
  })
  .then(async ({data, error}) => {
    if (error) {
      return res.status(400).json({error: signUpError.message});
    }
    const userId = data.user.id;

    const {error: insertError} = await supabase.from("user_stats").insert([{
      user_id: userId,
      user_name: name,
      streak: 0,
      xp: 0,
      xp_today: 0,
      xp_weekly: 0,
      gems: 0,
      following: "[]",
      followers: "[]",
      badges: "[]",
      current_topic_id: 101
    }]);

      if (insertError) {
        return res.status(500).json({error: insertError.message});
      }    
    })
  res.status(200).json({message: "User registered successfully"})
  
});

app.post('/login', async(req, res) => {
  const {email, password} = req.body;
  const {data, error} = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    return res.status(400).json({error: error.message});
  }

  return res.json({user: data.user, session: data.session});
});


async function getUserFromToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({error: "No Token Provided"});

  const {data: {user}, error} = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({error: "Invalid Token"});

  req.user = user;
  next();
}

app.get("/fetch-data", getUserFromToken, async (req, res) => {
  const userId = req.user.id;

  const {data, error} = await supabase
  .from("user_stats").select("*").eq("user_id", userId).single();

  if (error && error.code !== "PGRST116") {
    return res.status(500).json({error: error.message});
  }

  res.json({
    user_id: data.user_id,
    user_name: data.user_name,
    streak: data.streak,
    xp_today: data.xp_today,
    gems: data.gems,
    current_topic_id: data.current_topic_id
  });
});

app.get("/fetch-topics", async (req, res) => {
  const chapterName = req.query.chapterName;

  if (!chapterName) {
    return res.status(400).json({error: "Missing Chapter"});
  }

  const {data, error} = await supabase
  .from(`${chapterName}`).select("*");

  if (error) {
    return res.status(500).json({error: error.message});
  }
  
  res.json(data);
});

app.get("/get-rankings", async(req, res) => {
  const category = req.query.category;

  const {data, error} = await supabase
  .from("user_stats").select(`user_id, user_name, ${category}`).order(`${category}`, {ascending: false});

  if (error) {
    return res.status(500).json({error: error.message});
  }

  res.json(data);
});

app.get("/get-user-rankings", getUserFromToken, async(req, res) => {
  const userId = req.user.id;
  let rankingToday;
  let rankingWeekly;

  const {data: xpTodayData, error: xpTodayError} = await supabase
  .from("user_stats").select("user_id, xp_today").order("xp_today", {ascending: false});
  if (xpTodayError) {
    return res.status(500).json({xpTodayError: xpTodayError.message});
  }

  const {data: xpWeeklyData, error: xpWeeklyError} = await supabase
  .from("user_stats").select("user_id, xp_weekly").order("xp_weekly", {ascending: false});
  if (xpWeeklyError) {
    return res.status(500).json({xpWeeklyError: xpWeeklyError.message});
  }
  
  xpTodayData.forEach((userObj, index) => {
    if (userObj.user_id == userId) {
      rankingToday = index + 1;
      return;
    }
  });

  xpWeeklyData.forEach((userObj, index) => {
    if (userObj.user_id == userId) {
      rankingWeekly = index + 1;
      return;
    }
  });
  
  res.json({rankingToday, rankingWeekly});
});

app.patch("/update-xp", getUserFromToken, async(req, res) => {
  const userId = req.user.id;
  const xpGained = req.query.xpGained;

  const {data, error: fetchError} = await supabase
  .from("user_stats").select("xp_today, xp_weekly, xp").eq("user_id", userId).single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({error: fetchError.message});
  }

  const updatedXPToday = data.xp_today + xpGained;
  const updatedXPWeekly = data.xp_weekly + xpGained;
  const updatedXP = data.xp + xpGained;

  const {error: updateError} = await supabase
  .from("user_stats").update({xp_today: updatedXPToday, xp_weekly: updatedXPWeekly, xp: updatedXP}).eq("user_id", userId);

  if (updateError) {
    return res.status(500).json({error: updateError.message});
  }

  res.json({
    xp_today: updatedXPToday,
    xp_weekly: updatedXPWeekly,
    xp: updatedXP
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
