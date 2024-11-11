import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
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
    res.status(400).json({ message: "All Fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json("User signup successful");
  } catch (error) {
    res.status(500).json(error);
  }
};
