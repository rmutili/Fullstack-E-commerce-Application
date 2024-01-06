import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
});
