import { User } from "../Models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createUser = async ({ fullname, email, password }) => {
  console.log("##################################");
  try {
    let firstname = fullname.firstname;
    let lastname = fullname.lastname;

    if (firstname == "" || email == "" || password == "") {
      return new ApiError(400, "All fields are Required");
    }
    console.log(firstname);

    let ad = 0;
    for (let i = 0; i < email.length; ++i) {
      if (email[i] == "@") ad++;
    }
    if (ad != 1) {
      return new ApiError(400, "type Correct Email");
    }

    const exixtedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });
    // console.log("Existed User : ", exixtedUser);
    if (exixtedUser) {
      return new ApiError(409, "User with email and Already Exist");
    }

    // creating user object
    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    console.log("USER CREATED");
    console.log(user);

    // return res.status(201).json({createdUser})
    return res
      .status(200)
      .json(new ApiResponse(200, "User Register Successfully"));
  } catch (error) {
    return new ApiError(401, "Failed to Login User");
  }
};

export { createUser };
