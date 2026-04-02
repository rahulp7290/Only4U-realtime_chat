import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import User from "../models/user.model.js";



// const signUp = async (req, res) => {
//   // Sign up logic here

//   try{

//     const {username , email , password} = req.body;

//     const existingUser = await User.findOne({ $or: [ { email }, { username } ] });

//     if(existingUser){
//       return res.status(400).json({ message: "User already exists" });
//     }

//     if(password.length <6){
//       return res.status(400).json({ message: "Password must be at least 6 characters long" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const token = await genToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//       secure: false
//     });
//     return  res.status(201).json({ message: "User created successfully" });

//   } catch(error){
//     res.status(500).json({ message: `Server error ${error.message}` });
//   }
// }

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "None", // ✅ more secure, adjust if needed
    //   secure: true, // ⚠️ set true in production with HTTPS
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.cookie("token", token, {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/"
});

    // 🔥 RETURN USER DATA (NO PASSWORD)
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error.message}` });
  }
};


const Login = async (req, res) => {
  // Sign up logic here

  try{

    const { email , password} = req.body;

    const existingUser = await User.findOne({ email });

    if(!existingUser){
      return res.status(400).json({ message: "User does not exist" });
    }

   const isMatch = await bcrypt.compare(password, existingUser.password);

   if(!isMatch){
    return res.status(400).json({ message: "Invalid credentials" });
   }


    const token = await genToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // ✅ more secure, adjust if needed
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true
    });

    // return res.status(200).json({ message: "Login successful" });
     return res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });

  } catch(error){
    res.status(500).json({ message: `Server error ${error.message}` });
  }
}

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error.message}` });
  }
};

export { signUp, Login, Logout };
