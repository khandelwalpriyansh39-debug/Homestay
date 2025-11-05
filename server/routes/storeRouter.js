 // Core Modules
const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module

const storecontroler=require('../controllers/StoreController');
storeRouter.get("/",storecontroler.getIndex);
storeRouter.get("/homes",storecontroler.registeredhome);
storeRouter.get("/bookings",storecontroler.getBooking);

storeRouter.get("/favourite",storecontroler.getFavouriteList);

storeRouter.get("/homes/:homeid",storecontroler.getHomeDetails);
storeRouter.post("/favourite",storecontroler.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeid",storecontroler.postRemoveFormFavourite);
module.exports = storeRouter;