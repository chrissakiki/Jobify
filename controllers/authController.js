import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  if (password.length < 6) {
    throw new BadRequestError("Password should be at least 6 characters");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new BadRequestError("Email has already been taken!");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.CREATED).json({
    user,
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if ((!name || !email || !lastName, !location)) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ _id: req.user._id });

  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
