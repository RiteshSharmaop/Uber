import { Router } from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controller/captain.controller.js";
const router = Router();

router.post("/register", [
    body("fullname.firstname").isString().isLength({min: 3}),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"), 
    body("vehicle.color").isString().isLength({min: 3}).withMessage("Color must be at least 3 characters long"),    
    body("vehicle.plate").isString().isLength({min: 3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({min: 1}).withMessage("Capacity must be a number"),
    body("vehicle.vehicleType").isString().isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be either car, motorcycle or auto"),  
], registerCaptain);

export default router;