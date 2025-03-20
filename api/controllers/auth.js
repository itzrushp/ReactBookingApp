
import User from "../models/Users.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jasonwebtoken from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send("User has been Created.");

    } catch (err) {
        next(err);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Invalid Credentials"));

        const token = jasonwebtoken.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;


        res
        .cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails });

    } catch (err) {
        next(err);
    }
}