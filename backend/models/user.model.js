// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String },
//     username: { type: String, uniquqe: true, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     image: { type: String, default: "" },
//   },
//   { timestamps: true },
// );

// const user = mongoose.model("User", userSchema);

// export default user;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, uniquqe: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

const user = mongoose.model("User", userSchema);

export default user;
