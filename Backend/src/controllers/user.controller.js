import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import { log } from "console";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating accesstoken",
      [error]
    );
  }
};

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

  console.log("user controller :", req.file);

  const logoLocalPath = req.file?.path;

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

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createUser, "User is successfully created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "All feilds are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User with this email or username is dosn't exist");
  }

  const isPassValid = await user.isPasswordCorrect(password);

  if (!isPassValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201, {}, "User logout Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken = req.body.refreshToken;

    if (!incomingRefreshToken) {
      console.log(incomingRefreshToken);

      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "referesh token Expired or Used");
    }

    const { accessToken, newRefreshtoken } =
      await generateAccessAndRefreshToken(user?._id);

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshtoken, options)
      .json(
        new ApiResponse(
          201,
          {
            accessToken,
            refreshToken: newRefreshtoken,
          },
          "accessToken refreshed Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});

const checkAuth = asyncHandler(async (req, res) => {
  const { refreshToken } = req.query;

  if (!refreshToken) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Optionally: you can verify user exists using decoded._id

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "Refresh token valid", clear: false },
          "Refresh access token required"
        )
      );
  } catch (err) {
    console.error("Refresh token verification failed:", err.message);

    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          { message: "Session Expired", clear: true },
          "Invalid or expired refresh token"
        )
      );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!newPassword && !oldPassword) {
    throw new ApiError(400, "All feilds are required");
  }

  if (newPassword.length < 8) {
    throw new ApiError(400, "new password must have 8 characters");
  }

  const user = await User.findById(req.user?._id);

  const isOldPasswordvalid = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordvalid) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "password change Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        userdata: req.user,
      },
      "User fetched Successfully"
    )
  );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email, fermName } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
        fermName,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Account details update Successfully"));
});

const changeLogoImage = asyncHandler(async (req, res) => {
  const logoLocalPath = req.file?.path;

  if (!logoLocalPath) {
    throw new ApiError(401, "logo file is missing");
  }

  const logo = await uploadOnCloudinary(logoLocalPath);

  if (!logo.url) {
    throw new ApiError(401, "Error while uploading logo try again");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        logo: logo.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, user, "logo image changed Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  changeLogoImage,
  checkAuth,
};
