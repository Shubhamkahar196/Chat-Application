import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from "joi-password-complexity";

const userSchema = new  Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false},
    verificationLinkSent: {type:Boolean, default: false},
    avatarLink: {type: String},
},{timestamps: true});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        },
        process.env.JWTPRIVATEKEY,{expiresIn: "7d"}
    );
    return token;
}

export const user = mongoose.model("user", userSchema);

export const validateRegister = (data) =>{
    const schmea = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required.label("Last Name"),
        email: Joi.string().email().required.label("Email"),
        password: passwordComplexity().required.label("Password"),
    });
    return Schema.validate(data);
};

export const validateLogin = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required.label("Email"),
                password: passwordComplexity().required.label("Password"),
    });
    return schema.validate(data);
}

