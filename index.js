import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
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
import { Console } from "console";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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

// /* USE CLIENT APP */ 
app.use(express.static(path.join(__dirname, "/client/build")))


/* CURRENT SEARCH DATA */
let currentCityAndTempInfo;
let currentFlightInfo;


app.post('/currentCityAndTemp', (req, res) => {
  const { cityAndTempParcel } = req.body
  currentCityAndTempInfo = cityAndTempParcel
})

app.get('/currentCityAndTemp', (req, res) => { 
  res.send(currentCityAndTempInfo)
})

app.post('/flightinfo', (req, res) => {
  const { flightParcel } = req.body
  currentFlightInfo = flightParcel
})

app.get('/flightinfo', (req, res) => { 
  res.send(currentFlightInfo)
})


app.post('/initializeData', (req, res) => {
  const { flightParcel } = req.body
  currentFlightInfo = flightParcel
  const { cityAndTempParcel } = req.body
  currentCityAndTempInfo = cityAndTempParcel
  // console.log(currentFlightInfo)
  // console.log(currentCityAndTempInfo)
})




/* WEATHER SEARCH API CALL */

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

app.get('/weather', (req, res) => {
  setTimeout(() => {
    console.log(currentCityAndTempInfo)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCityAndTempInfo.city}&units=${currentCityAndTempInfo.temperatureUnits}&appid=${WEATHER_API_KEY}`)
    .then(res => res.json())
    .then(data => res.json(data))
    .catch(err => {
        console.log(err)
    })
  }, 2000);
})


/* PHOTO CAROUSEL SEARCH API CALL */

const PHOTO_API_KEY = process.env.UNSPLASH_API_KEY

app.get('/photos', (req, res) => {
  let photosArray = []
  fetch(`https://api.unsplash.com/search/photos/?query=${currentCityAndTempInfo.city}&client_id=${PHOTO_API_KEY}&orientation=portrait&per_page=30`)
  .then(res => res.json())
  .then(data => res.json(data))
  .then(data => photosArray.push(data))
  .catch((error) => {
    console.log(error)
  });
})



/* FLIGHT SEARCH API CALL */

const FLIGHT_INFO_API_KEY = process.env.FLIGHT_API_KEY

app.get('/flight', (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmVlOWY0NzExY2JhYzhmOTcwMWU2ZSIsImlhdCI6MTY5NDQyNzYzNn0.SwKrDkRKUfSVxT4y0ysd07SPfsyuUQFlDbCI27UtcV4`,
    }
  };

  fetch(`https://api1.diversesaga.com/api/v1/searchFlights?origin=${currentFlightInfo.fromAirport}&destination=${currentFlightInfo.toAirport}&date=${currentFlightInfo.departureDay}&returnDate=${currentFlightInfo.returnDay}&adults=1&currency=USD&countryCode=US&market=en-US`, options)
  .then(res => res.json())
  .then(data => res.json(data))
  .catch((error) => {
    console.log(error)
  });
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
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));



  
  
