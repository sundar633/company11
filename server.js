import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔒 Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend + Supabase Connected");
});

// Insert into "trail" table
app.post("/test", async (req, res) => {
  const { message } = req.body;

  const { error } = await supabase
    .from("trail")
    .insert([{ message }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
