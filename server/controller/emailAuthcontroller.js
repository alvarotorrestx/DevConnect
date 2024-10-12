
const jwt=require('jsonwebtoken')
const { hashPassword, compareHashPassword }=require('../hash/bcrypt')


exports.register=async(req,res)=>{
    const { email, password }=req.body;

    try{
        const hashedPassword=hashPassword(password)
        const user= await User.create({ email: email, password: hashedPassword})
        res.status(200).json({
            status: "successful",
            message:"user successfully register"
        })
        
    }catch(error){
        res.status(500).json({ error: error.message });
    }

}
