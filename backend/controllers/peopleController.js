import { user  } from '../models/userModel.js'; 

 const peopleController = async(req,res)=>{
    const users = await user.find({
        verified: true
    });
    res.json(users);
}

export default peopleController