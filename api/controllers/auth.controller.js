import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All Fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json("User signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "User not found"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    console.log(token);
    // res.status(200).json({ message: "token created success" });

    res.status(200).cookie("authToken", token, {
      httpOnly: true,
      secure: false,
    });

    const { password: pass, ...rest } = validUser.toObject();

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  const user = await User.findOne({ email });

  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      const { password, ...rest } = user.toObject();

      res
        .status(200)
        .cookie("gToken", token, {
          httpOnly: true,
          secure: false,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: bcrypt.hashSync(generatedPassword, 10),
        photoUrl,
      });

      await newUser.save();

      res.status(200).json("GAuth signup successful");
    }
  } catch (error) {
    next(error);
  }
};
