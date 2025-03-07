import { Router } from "express";
import { body } from "express-validator";
const router = Router();
import { authUser } from "../middleware/auth.middelware.js";
import { loginUser, registerUser , getCurrentUser , loggedOutUser} from "../controller/user.controller.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(authUser ,getCurrentUser);
router.route("/logout").get(authUser ,loggedOutUser);



// TODO: Erros not solved for bottem this
// router.post('/register', [
//     body('email').isEmail().withMessage('Invalid Email'),
//     body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
// ],
//     registerUser
// )

export default router;
