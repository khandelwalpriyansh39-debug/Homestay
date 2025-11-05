// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");
 const hostcontroler=require('../controllers/hostController');


hostRouter.get("/add-home", hostcontroler.getHomeadd);
hostRouter.post("/add-home",hostcontroler.postHomeAdd );
hostRouter.get("/host-home-list",hostcontroler.getHostHome);
hostRouter.get("/edit-home/:homeId",hostcontroler.getEditHome );
hostRouter.post("/edit-home",hostcontroler.postEditHome);
hostRouter.post("/delete-home/:homeId",hostcontroler.postDeleteHome);

module.exports = hostRouter;
