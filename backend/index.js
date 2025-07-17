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
      badges: "[]"
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
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
