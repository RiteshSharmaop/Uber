import { validationResult } from "express-validator";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // take data from user -> name email pass
  // apply validation if user has not sended empty user name or pass or email or email is in in-correct formate
  // check if user is already existed  , email) or not if yes then throw error
  // check for images, check for avatar
  // if availavble uploade in cloudinary, check avatart is uploaded in clloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check fro user creation
  // return response

  // taking data from frontend/user
  // object name must be same as frontend
  // fullName , email , password , userName  these name must be same in both frontend and backend

  try {
    const { fullname, email, password } = req.body;
    let firstname = fullname.firstname;
    let lastname = fullname.lastname;
    
    if (firstname == "" || email == "" || password == "") {
      return new ApiError(400, "All fields are Required");
    }
    let ad = 0;
    for (let i = 0; i < email.length; ++i) {
      if (email[i] == "@") ad++;
    }
    if (ad != 1) {
      return new ApiError(400, "type Correct email");
    }

    // To check single variable
    // const exixtedUser = User.findOne({userName})
    const exixtedUser = await User.findOne({
      $or: [{ email }],
    });
    // console.log("Existed User : ", exixtedUser);
    if (exixtedUser) {
      return new ApiError(409, "User with email and Already Exist");
    }
    // const hashPassword = await User.hashPassword(password)
    // creating user object
    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    // return res.status(200).json(new ApiResponse(200 , "DONE............"))

    const createdUser = await User.findById(user._id);
    if (!createdUser) {
      return new ApiError(
        500,
        "Something went wrong while registering the user in db"
      );
    }

    const token = user.generateAuthToken();

    // return res.status(201).json({createdUser})
    return res
      .status(201)
      .json(new ApiResponse(200, {createdUser , token}, "User Register Successfully"));
  } catch (error) {
    return new ApiError(401, "Failed to Login User");
  }
});

export { registerUser };
