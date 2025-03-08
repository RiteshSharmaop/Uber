import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Captain } from "../Models/captain.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
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
    .json(new ApiResponse(201, "Captain registered successfully", {captain, token}));
});

export { registerCaptain };
