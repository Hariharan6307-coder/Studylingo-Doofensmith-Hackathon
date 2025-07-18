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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
