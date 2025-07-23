import express from 'express';
import  {avatarController}  from '../controllers/avatarController.js';
const router = express.Router();


router.post("/", avatarController.avatarController);
router.get("/all", avatarController.getAllAvatars);

export default AvatarRouter;