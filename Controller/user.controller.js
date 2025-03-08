import { User } from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
 console.log( fullname, email, phonenumber, password, role);
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Missing required field",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });

    await newUser.save(); // ✅ Save user in DB

    return res.status(200).json({
      message: `Account created successfully, ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error registering user",
      success: false,
    });
  }
};

// Login
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required field",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
  
    if (user.role !== role) {
      return res.status(403).json({
        message: "you don't have the necessary role to access this resources",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user .email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user:userData,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in Login",
      success: false,
      error: error.message,
    });
  }
}; 

// Logout
export const Logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "You have been logged out",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error in Logout",
      success: false,
      error: error.message,
    }); 
  }
};

// Update User
export const update = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skill } = req.body;
    const file = req.file;
    let skillArray;
    if (skill) {
      skillArray = skill.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User  not found",
        success: false,
      }); 
    }

    // Update user data
    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skill) {
      user.profile.skill = skillArray;
    } 

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error in update",
      success: false,
      error: error.message,
    });
  }
};