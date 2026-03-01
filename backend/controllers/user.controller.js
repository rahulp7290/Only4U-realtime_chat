import User from "../models/user.model.js"; // ✅ match model name
import uploadCloudinary from "../config/cloudinary.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId); // ✅ use User model

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error " + error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        image,
      },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error " + error.message,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `profile error ${error}` });
  }
};
