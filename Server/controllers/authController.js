
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register API

export const register = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password,8);
      const user = await User.create({
               name,
               email,
               password: hashedPassword,

    farmerId:
      "AGRI" +
      Date.now()
        .toString()
        .slice(-6),
});
        res.status(201).json({
            message: "User Registered Successfully",
            
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Login API

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;


    // console.log("Email Received:", email);

        const user = await User.findOne({email});

        //   console.log("User Found:", user);

        if(!user){
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Password",
            });
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        });
        res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message:error.message});
    }
};

// Profile API

export const getProfile = async (req,res) => {
    try {
        const user = await User.findById(
            req.user.id
        ).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// UpdateProfile

export const updateProfile = async (req, res) => {
  try {

    const updateData = {
      ...req.body,
    };

    if (req.files?.profileImage) {
      updateData.profileImage =
        "/uploads/" +
        req.files.profileImage[0].filename;
    }

    if (req.files?.bannerImage) {
      updateData.bannerImage =
        "/uploads/" +
        req.files.bannerImage[0].filename;
    }


if (
  req.body.profileImage === "" &&
  !req.files?.profileImage
) {
  updateData.profileImage = "";
}

if (
  req.body.bannerImage === "" &&
  !req.files?.bannerImage
) {
  updateData.bannerImage = "";
}
    const user = await User.findByIdAndUpdate(


      req.user.id,
      updateData,
      { new: true }
    );

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current Password is Incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      8
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Updated Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



export const forgotPassword = async (req, res) => {
  try {

    const {
      email,
      password,
      confirmPassword,
    } = req.body;

    // Check all fields
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Passwords match?
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};