import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fermName } = req.body;

  if (
    [username, email, password, fermName].some(
      (feilds) => feilds?.trim() === ""
    )
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(
      401,
      "User with this username or email is Already Exist"
    );
  }

  const logoLocalPath = req.file?.path;
  console.log(logoLocalPath);

  if (!logoLocalPath) {
    throw new ApiError(401, "logo is required");
  }

  const logo = await uploadOnCloudinary(logoLocalPath);

  if (!logo) {
    throw new ApiError(501, "Something went wrong while uploading logo");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fermName,
    logo: logo?.url || "",
  });

  const createUser = await User.findById(user._id).select("-password");

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createUser, "User is successfully created"));
});

export { registerUser };
