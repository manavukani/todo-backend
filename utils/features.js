import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      // httpOnly: true, // disables cookies when deployed
      maxAge: 24 * 60 * 60 * 1000, // 1 day,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", // backend and frontend are on different domains
      secure: process.env.NODE_ENV === "Development" ? false : true, // true for production else  cookie will be blocked
    })
    .json({
      success: true,
      message,
    });
};
