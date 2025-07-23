import bcrypt from 'bcryptjs';
import { user, validateRegister } from '../models/userModel.js';
import { Token } from '../models/tokenModel.js'
import sendEmail from '../utils/sendEmail.js';

 const registerController = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);

        if (error) {
            return res.status(400).send({
                message: error.details[0]
            })
        }
        let user = await user.findOne({
            email: req.body.email
        });

        if (user && user.verified) {
            return res.status(409).send({
                message: "User with given email already exists"
            })
        }

        if (user && user.verificationLinkSent) {
            return res.status(400).send({
                message: "A verification link has been already send to the email"
            })
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const token = await new Token({
            userId: user._id,
            token: Token,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        }).save();

        const url = `${process.env.BASE_URL}/user/${user._id}/verficationLinkSent`;
        await sendEmail(user.email, "Verify Email", url);

        user.verificationLinkSent = true;
        await user.save();
        res.status(201).send({
            message: "verification email sent to ${user.email}"
        })
    }catch(error){
        console.error("Error in registerController", error);
        res.status(500).send({
            message: "Internal server error"
        })
    }


}

export default registerController