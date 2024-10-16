import express from 'express'
import cors from 'cors'

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from './routes/tv.routes.js';
import searchRoutes from './routes/search.route.js';
import bookmarkRoutes from './routes/bookmark.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use(cors({
    origin: "https://entertainment-ms1g.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://entertainment-ms1g.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE , OPTIONS' );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Define routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use('/api/v1/bookmarks', protectRoute, bookmarkRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>")
})
// Start server
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});
