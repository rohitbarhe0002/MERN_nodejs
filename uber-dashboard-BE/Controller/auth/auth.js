import User from "../../Schema/user/user.js";
import bcrypt from "bcryptjs";
// import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

/// register user
export const signUp = async (req, res, next) => {
  const { username, email, address, password, userType, city, phoneNumber } =
    req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send({ message: "user has been created" });
  } catch (err) {
    next(err);
  }
};

/// login user
export const signIn = async (req, res, next) => {
  try {
    console.log("hited");
    const user = await User.findOne({ username: req.body.username });
    const isPasswordChecked = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordChecked) {
      return res.status(404).json({ errorMessage: "password is not matched" });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherdetails } = user._doc;

    // Set the cookie and send the response in one go
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expiresIn: "20h",
      })
      .status(200)
      .json({ ...otherdetails, token });
  } catch (err) {
    console.log(err,"errors")
    res.status(500).json(err);
  }
};
