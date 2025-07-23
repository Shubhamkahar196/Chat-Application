import jwt from 'jsonwebtoken';
import { user  } from '../models/userModel.js'; 

 const profileController = async (req, res) => {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided." });
        }

      
        const userData = await jwt.verify(token, process.env.JWTPRIVATEKEY);

        const foundUser = await user.findOne({ _id: userData._id });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }

        
        res.json(foundUser);

    } catch (error) {
        console.error("Error in profileController:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token." });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired." });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const profileUpdate = async (req, res) => {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided." });
        }

    
        const userData = await jwt.verify(token, process.env.JWTPRIVATEKEY);

    
        const { firstName, lastName, email, avatarLink } = req.body;

      
        const userToUpdate = await user.findById(userData._id);

        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found." });
        }

    
        if (email && email !== userToUpdate.email) {
           
            userToUpdate.email = email;
        }

        
        if (firstName !== undefined) userToUpdate.firstName = firstName;
        if (lastName !== undefined) userToUpdate.lastName = lastName;
        if (avatarLink !== undefined) userToUpdate.avatarLink = avatarLink;

        await userToUpdate.save();

        res.json(userToUpdate);

    } catch (error) {
        console.error("Error in profileUpdate:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token." });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired." });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export default {
    profileController,
    profileUpdate
}