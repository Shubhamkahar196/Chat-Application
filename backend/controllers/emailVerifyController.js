import { user } from '../models/userModel.js'; 
import { Token } from '../models/tokenModel.js';

 const verifyEmail = async (req, res) => {
    try {
        // 1. Find the user
        const foundUser = await user.findById(req.params.id); 
        if (!foundUser) {
            return res.status(400).send({
                message: "User doesn't exist"
            });
        }

        // 2. Check if the user is already verified
        if (foundUser.verified) {
            return res.status(400).send({
                message: "Email already verified"
            });
        }

        // 3. Find the verification token
        const token = await Token.findOne({
            userId: foundUser._id,
            token: req.params.token,
        });

        if (!token) {
            return res.status(400).send({ message: "Invalid Link or token not found." });
        }

        // 4. Check if the token has expired
        if (token.expiresAt < Date.now()) {
            // If the token is expired, you might want to:
            // a) Delete the expired token to clean up
            await Token.deleteOne({ _id: token._id }); 
            foundUser.verificationLinkSent = false; 
            await foundUser.save();

          
            return res.status(400).send({
                message: "Verification link has expired. Please request a new one."
            });
        }

        
        // 5. Verify the user
        foundUser.verified = true;
        
        foundUser.verificationLinkSent = false; // Reset this flag if you have it
        await foundUser.save();

        // 6. Delete the used token (important for security and cleanup)
        await Token.deleteOne({ _id: token._id }); // Delete the token after successful verification

        // 7. Send success response
        res.status(200).send({
            message: "Email Verified Successfully!"
        });

    } catch (error) {
        console.error("Error in verifyEmail:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
      
export default verifyEmail