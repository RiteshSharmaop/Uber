import { Router } from "express";
import { body } from "express-validator";
const router = Router();
import { registerUser } from "../controller/user.controller.js";

router.route("/register").post(registerUser);

// TODO: Erros not solved for bottem this
// router.post('/register', [
//     body('email').isEmail().withMessage('Invalid Email'),
//     body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
// ],
//     registerUser
// )

export default router;
