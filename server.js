import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors()); // allow all (for now)
app.use(express.json());

// 🔒 Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Backend + Supabase Connected");
});


// =============================
// ✅ CONTACT FORM API
// =============================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, mobile, location } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { error } = await supabase
      .from("contacts") // ✅ your table
      .insert([{ name, email, mobile, location }]);

    if (error) {
      console.error("Contact insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// =============================
// ✅ NEWSLETTER API
// =============================
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const { error } = await supabase
      .from("newsletter_subscribers") // ✅ your table
      .insert([{ email }]);

    if (error) {
      console.error("Subscribe error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// =============================
// (Optional) TEST API
// =============================
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


// 🚀 Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
