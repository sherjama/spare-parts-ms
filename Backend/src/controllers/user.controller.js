import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Shelf } from "../models/shelves.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";
import { generateInitialsImage } from "../utils/pfpGenerator.js";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

const options = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
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

  const logoLocalPath = generateInitialsImage(username);

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
    logoId: logo?.public_id || "",
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  await Shelf.create({
    shelfName: "none",
    CreatedBy: user._id,
  });

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        201,
        {
          user: createUser,
          accessToken,
          refreshToken,
        },
        "User is successfully created"
      )
    );
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
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
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
  const refreshToken = req.cookies?.refreshToken;

  if (req.user && req.user._id) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  } else if (refreshToken) {
    await User.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: 1 } }
    );
  }

  res
    .clearCookie("accessToken", { ...options })
    .clearCookie("refreshToken", { ...options })
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json(new ApiResponse(401, { clear: true }, "No refresh token"));

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken)
      return res
        .status(401)
        .json(new ApiResponse(401, { clear: true }, "Invalid refresh token"));

    const newAccessToken = user.generateAccessToken();

    res
      .cookie("accessToken", newAccessToken, options)
      .status(200)
      .json(new ApiResponse(200, { clear: false }, "Access token refreshed"));
  } catch {
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          { clear: true },
          "Invalid or expired refresh token"
        )
      );
  }
});

const checkAuth = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken)
    return res
      .status(401)
      .json(new ApiResponse(401, { clear: true }, "Access token not found"));

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    if (!user)
      return res
        .status(401)
        .json(new ApiResponse(401, { clear: true }, "Invalid access token"));

    return res
      .status(200)
      .json(new ApiResponse(200, { clear: false, user }, "Access token valid"));
  } catch {
    return res
      .status(401)
      .json(
        new ApiResponse(401, { clear: true }, "Invalid or expired access token")
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
  const updateFields = {};

  const allowedFields = [
    "username",
    "email",
    "fermName",
    "contact",
    "state",
    "city",
    "region",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateFields,
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
  console.log(logo);

  if (!logo.url) {
    throw new ApiError(401, "Error while uploading logo try again");
  }

  // old logo delete
  const userLogo = await User.findById(req.user?._id).select("logoId");
  const resp = await deleteOnCloudinary(userLogo);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        logo: logo.url,
        logoId: logo.public_id,
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
