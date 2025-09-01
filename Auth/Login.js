
import UserModel from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/jsonweb.js";

export const LoginUser = async (req, res) => {
  // Extract the identificationCard from the request body.
  const { identificationCard } = req.body;

  try {
    // 1. Find the user by their identificationCard.
    // We explicitly cast the identificationCard to a string to match the database column type.
    const user = await UserModel.findOne({
      where: { identificationCard: String(identificationCard) },
    });

    // 2. If the user is not found, send an error response.
    if (!user) {
      return res.status(404).json({
        error: "User not found. Please provide a valid identification card.",
      });
    }

    // 3. If the user exists, create a JWT payload.
    // We get all the user data by calling user.toJSON()
    const payload = user.toJSON();

    // 4. Generate the JWT token.
    // We sign the payload using the secret key from our config file.
    const token = jsonwebtoken.sign(payload, config.jwtSecret, {
      expiresIn: "1h", // The token will expire in 1 hour.
    });

    // 5. Send the success response with the token and user data.
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: payload,
    });
  } catch (error) {
    // 6. Handle any potential server errors.
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

