import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    //example:
    // res.status(200).json({
    //     message:"server error"
    // })

    //get user details from the frontend 
    //input validation (input checks like sign up)--not empty
    //check if user already exists: checks like username,email
    //check for images,check for avatar
    //upload image to cloudinary,:check avatar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response othervise error

    const { fullName, email, username, password } = req.body//agar data json ya forms main aye tou asay mil jay ga
    console.log("name", fullName)
    console.log("Request body:", req.body);
    // if(fullName==""){
    //       throw new ApiError(400,"Full name is required")
    // }
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email address");
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path//ye multer ki wja se mil raha hai
    const caverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    //upload image to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(caverImageLocalPath)
    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar image to cloudinary")
    }
    //create user object
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user.id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Error creating user")
    }
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

export { registerUser }