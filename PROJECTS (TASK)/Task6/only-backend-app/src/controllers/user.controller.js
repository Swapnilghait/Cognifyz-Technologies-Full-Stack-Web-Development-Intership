import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {

    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.accessToken = accessToken
        user.refreshToken = refreshToken

    
        await user.save({validateBeforeSave: false})
        // console.log("SAVED USER" , user);


        // console.log("ACCESS TOKEN" , accesstoken);


        // console.log("RETURNNING BOTH");

        return {accessToken, refreshToken}


    } catch (error) {

        throw new ApiError(500, "something went wrong while generating access tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok",
    // })

 


    const {fullName, email, username, password} = req.body
    // console.log("email:", email);
    // console.log("password:", password);

    // console.log("This is req.body log");
    // console.log(req.body);

    if (
        [fullName, email, username, password].some((field) => {
            return field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All fields are required while registering")
    }


    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exist")
    }


    // console.log("This is req.files log");
    // console.log(req.files);

    

   

    


    const user = await User.create(
        {
            fullName,
            email,
            password,
            username: username.toLowerCase()
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Server Error: Error occured while registering user ")

    }


    //beginner
    // const response = ApiResponse(200, createdUser, "User Created and this is this data")

    // pro
    return res.status(201).json(
        new ApiResponse(200, createdUser, "USER CREATED SUCCESSFULLY"),
    )

})


//loginUser
const loginUser = asyncHandler(async (req, res) => {
    

    const {email, username, password} = req.body
    console.log(email, username, password);

  

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

   
    const user = await User.findOne({
        $or: [{username}, {email}]
    })


   

    if (!user) {
        throw new ApiError(404, "user not found")
    }


    // console.log(user.password);

    const isPasswordValid = await user.isPasswordCorrect(password)

    console.log(isPasswordValid);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }


    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    console.log(loggedInUser);
    console.log(accessToken);
    console.log(refreshToken);


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )


})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))


})


const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshAccessToken || req.query.refreshAccessToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized")
    }


    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken._id)

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "reFRESH TOKEN IS EXPIRED OR USED")
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", newRefreshToken)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access token refreshed successfully"
            )
        )


})















export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,

}