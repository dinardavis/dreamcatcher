import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
// import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* USE CLIENT APP */ 
app.use(express.static(path.join(__dirname, "/client/build")))

/* LOCATION API */
app.get('/location', (req, res) => {
  let location = "Paris"
  res.json(location)
})

/* ADVISORY WIDGET DATA SEARCH */
app.get('/advisory', (req, res) => {
  fetch(`https://www.travel-advisory.info/api`)
  .then(res => res.json())
  .then(data => res.json(data.data))
    .catch((err) => {
      console.log(err);
  })
})

/* PHOTOS WIDGET DATA SEARCH */
app.get('/photos', (req, res) => {
  const location = {
    current: "Paris"
  }

  fetch(`https://api.unsplash.com/search/photos/?query=${location.current}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&orientation=portrait&per_page=30`)
      .then(res => res.json())
      .then(data => res.json(data))
      .catch((error) => {
        console.log(error)
      });
})

/* WHEATHER WIDGET DATA SEARCH */
app.get('/weather', (req, res) => {
  const location = "paris"
  const tempUnits = "imperial"
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${tempUnits}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
  .then(res => res.json())
  .then(data => res.json(data))
  .catch(err => {
      console.log(err)
  });
})

/* FLIGHT WIDGET DATA SEARCH */
app.get('/flight', (req, res) => {

  const fromAirportCode = 'SFO'
  const toAirportCode = 'LHR'
  const departureDate = '2024-05-07'
  const returnDate = '2024-05-14'

  const options = {
    method: 'GET',
    url: `https://api1.diversesaga.com/api/v1/searchFlights?origin=${fromAirportCode}&destination=${toAirportCode}&date=${departureDate}&returnDate=${returnDate}&adults=1&currency=USD&countryCode=US&market=en-US`,
    headers: {
      'Authorization': process.env.REACT_APP_FLIGHT_API_KEY,
    }
  };

  axios.request(options).then((res) => {
    res.json(res.data)
  }).catch((error) => {
    console.error(error)
  })


})

/* RENDER CLIENT FOR ALL PAGES */
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/build/index.html"))); 

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running on server port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));



  
  
