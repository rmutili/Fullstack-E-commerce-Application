import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");

    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Token found");
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    // console.log("token not found");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  // console.log(req.user);
  if (req.user && req.user.isAdmin) {
    // req.user is set in the protect middleware
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized. Only for administrators");
  }
};

export { protect, admin };
