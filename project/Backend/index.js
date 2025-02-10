// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// app.use("/api/users", userRoutes); // Use API route prefix

// // const dbURI = "mongodb://localhost:27017/ijazUser"; // MongoDB Local Connection
// const dbURI =
//   "mongodb+srv://ijaz:ijazUAE@ijazcluster.fjydy.mongodb.net/?retryWrites=true&w=majority&appName=ijazCluster";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(dbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected...");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err.message);
//   }
// };

// connectDB();

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// ------------------------------------------------------------------
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Store hashed password
});

const User = mongoose.model("User", userSchema, "User");

// Signup Route (Store Data in MongoDB)
app.post("/api/users/signup", async (req, res) => {
  try {
    console.log("requested data ", req.body); // Debugging

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// Login Route (Check Credentials)
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
