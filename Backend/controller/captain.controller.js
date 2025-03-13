import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Captain } from "../Models/captain.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import {BlacklistToken} from "../Models/blacklistToken.model.js";
const registerCaptain = asyncHandler(async (req, res, next) => {
 
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new ApiError(400, validationErrors.array());
  }
  const { fullname, email, password, vehicle } = req.body;
  const firstname = fullname.firstname;
  const lastname = fullname.lastname;
  const color = vehicle.color;
  const plate = vehicle.plate;
  const capacity = vehicle.capacity;
  const vehicleType = vehicle.vehicleType;
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  const isCaptain = await Captain.findOne({ email });
  if (isCaptain) {
    throw new ApiError(400, "Captain already registered");
  }

  const captain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  if (!captain) {
    throw new ApiError(500, "Captain not registered");
  }
  const token = captain.generateAuthToken();

  return res
    .status(201)
    .json(new ApiResponse(201, {captain, token} , "Captain registered successfully"));
});


const loginCaptain = asyncHandler(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new ApiError(400, validationErrors.array());
  }

  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }
  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    throw new ApiError(400, "Invalid email`");
  }
  const isMatchPassword = await captain.comparePassword(password);
  if(!isMatchPassword){
    throw new ApiError(400, "Invalid password");
  }
  const token = captain.generateAuthToken();
  return res
  .status(201)
  .cookie("token", token)
  .json(
    new ApiResponse(
      201,  
      { 
        captain, 
        token },
        "Captain logged in successfully",
      )
    );
});

const currentCaptain = asyncHandler(async (req, res, next) => {
  const captain = req.captain;
  return res
    .status(201)
    .json(new ApiResponse(201,captain ,"Captain found"));
});

const logoutCaptain = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  const blacklistedToken = await BlacklistToken.create({ token });
  if (!blacklistedToken) {
    throw new ApiError(500, "Captain not logged out");
  }

  const captain = req.captain;
  return res
    .status(201)
    .clearCookie("token")
    .json(new ApiResponse(201, captain, "Captain logged out successfully"));
}
);

export { registerCaptain , loginCaptain, currentCaptain, logoutCaptain };
