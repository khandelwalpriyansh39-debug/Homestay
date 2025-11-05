 // Core Modules
const path = require('path');

// External Modul
const express = require('express');
const AuthRouter = express.Router();

// Local Module

const Authcontroler=require('../controllers/AuthController');
AuthRouter.post("/api/auth/login",Authcontroler.postLogin);
AuthRouter.post("/api/auth/logout",Authcontroler.postLogout);
AuthRouter.post("/api/auth/reset_password",Authcontroler.postResetPassword);
AuthRouter.post("/api/auth/SignUp",Authcontroler.postSignUp);
module.exports = AuthRouter;