import express from 'express';
import {getMyProfile, loginuser, logout, VerfiyUser} from '../controllers/loginuser.js';
import {signupUser} from '../controllers/signupuser.js';
import {addTaks, deleteTask, updateTask} from '../controllers/tasksdata.js';
import {
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
} from '../controllers/Updates.js';
import {IsAuthenticated} from '../middleware/auth.js';

export const router = express.Router();
// Signup Route
router.route('/signup').post(signupUser);

// Login Route
router.route('/verify').post(IsAuthenticated, VerfiyUser);
router.route('/login').post(loginuser);
router.route('/logout').get(logout);

// Tasks Route

router
  .route('/Task/:id')
  .put(IsAuthenticated, updateTask)
  .delete(IsAuthenticated, deleteTask);
router.route('/addTask').post(IsAuthenticated, addTaks);

// Updates Routes

router.route('/updateprofile').put(IsAuthenticated, updateProfile);
router.route('/getprofile').put(IsAuthenticated, getMyProfile);

router.route('/updatepassword').put(IsAuthenticated, updatePassword);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword').post(resetPassword);
