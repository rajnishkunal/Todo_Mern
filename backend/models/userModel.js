import mongoose  from "mongoose";

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Must provide an email"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        require:[true,"Must provide an password"],
    }
})

const User=mongoose.model("User",userSchema);

export default User;