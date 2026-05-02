import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (important for uptime robot)
app.get("/", (req, res) => {
  res.status(200).send("✅ Cezonal Backend Running");
});

// Test API
app.post("/test", (req, res) => {
  const data = req.body;

  res.json({
    success: true,
    message: "Data received successfully",
    data: data
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
