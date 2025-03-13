import { validationResult } from "express-validator";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {BlacklistToken } from "../Models/blacklistToken.model.js";
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
    
    if(firstname.length < 3) {  
      throw new ApiError(400 , "First name must be 3 letter or long")
    }
    if (firstname == "" || email == "" || password == "") {
      throw new ApiError(400, "All fields are Required");
    }
    let ad = 0;
    for (let i = 0; i < email.length; ++i) {
      if (email[i] == "@") ad++;
    }
    if (ad != 1) {
      throw new ApiError(400, "type Correct email");
    }

    // To check single variable
    // const exixtedUser = User.findOne({userName})
    const exixtedUser = await User.findOne({
      $or: [{ email }],
    });
    // console.log("Existed User : ", exixtedUser);
    if (exixtedUser) {
      return res.status(404).json(new ApiError(404, null, "User Already Exist"));
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

    // return res.status(201).json(new ApiResponse(201 , "DONE............"))

    const createdUser = await User.findById(user._id);
    if (!createdUser) {
      return new ApiError(
        500,
        "Something went wrong while registering the user in db"
      );
    }

    const token = await user.generateAuthToken();

    // return res.status(201).json({createdUser})
    console.log("Created User : ", createdUser, token);
    return res
      .status(201)
      .json(new ApiResponse(201, {user: createdUser , token}, "User Register Successfully"));
  } catch (error) {
    return new ApiError(401, "Failed to Login User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // rewq.body take data from user - > (username, email , passwred)
  // validate input fields are not empty and in correct formate
  // find user if it exist or not - > if not send to register page
  // encrypt pass & check password is correct or not
  // generate access and refresh token and send to user by secure cookies
  // if correct authenticate user tu accesss things
  // return response

  const {email , password} = req.body;
  if(email == "" || password == "") {
    throw new ApiError(400 , "All fields are required")
  }
  let ad = 0;
  for (let i = 0; i < email.length; ++i) {
    if (email[i] == "@") ad++;
  }
  if (ad != 1) {
    throw new ApiError(400, "type Correct email");
  }
  const user =  await User.findOne({email}).select("+password");
  if(!user) {
    throw new ApiError(404 , "User not found")
  }

  const isMatch = await user.comparePassword(password);
  if(!isMatch) {
    throw new ApiError(400 , "Invalid Password")
  }
  const token = user.generateAuthToken();
  console.log("Token : ", token);
  res.cookie("token" , token )
  return res
  .status(201)
  .json(
    new ApiResponse(
      201,
      {token , user}, 
      "User Login Successfully"))

});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(
      new ApiResponse(201,
        req.user,
        "Current User Featched Successfully")
    );
});

const loggedOutUser = asyncHandler(async (req, res) => {

      const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
      
      if(!token) {
          throw new ApiError(401, "Unauthorized Request")
      }
  
      // Add to blacklist
      await BlacklistToken.create({token}); 
  
      // Clear cookie with same options used when setting it
      res.clearCookie("token");
  
      return res
          .status(201)
          .json(new ApiResponse(201, null, "User Logout Successfully"));
});


export { 
  registerUser,
  loginUser,
  getCurrentUser,
  loggedOutUser
};
