// Core Module
const path = require('path');
const session = require('express-session');

// External Module
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongodb-session')(session);

// Local Module
const AuthRouter = require("./routes/AuthRouter");
const rootDir = require("./utils/pathUtil");
const StoreRouter=require("./routes/storeRouter");
const HostRouter=require("./routes/hostRouter");
const url_path = "mongodb+srv://bittugudhainiya:Sonali123@cluster0.bbwgrmj.mongodb.net/homestay?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDBStore({
  uri: url_path,
  collection: 'sessions',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

app.use(session({
  secret: 'My homestay',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  console.log("isLoggedIn:", req.isLoggedIn);
  next();
});

app.use(AuthRouter);
app.use(StoreRouter);
app.use(HostRouter);
app.use(express.static(path.join(rootDir, 'public')));

const PORT = 5000;

mongoose.connect(url_path)
  .then(() => {
    console.log("connected to mongoose");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error during connection:", err);
  });
