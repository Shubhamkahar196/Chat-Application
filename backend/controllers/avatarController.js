import Avatar from '../models/avatarsModel.js';

export const avatarController = async (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ message: "Avatar link is required." });
    }

    try {
        const newAvatar = new Avatar({ link });
        await newAvatar.save();

        return res
            .status(201)
            .json({ success: true, message: "Avatar link added successfully!", avatar: newAvatar });

    } catch (error) {
        console.error("Error adding avatar link:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Avatar link already exists." });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




export const getAllAvatars = async (req, res) => {
    try {
        
        const avatars = await Avatar.find();

        return res.status(200).json({ success: true, avatars });

    } catch (error) {
  
        console.error("Error fetching avatars:", error); 
        return res.status(500).json({ message: "Internal Server Error" }); 
    }
};