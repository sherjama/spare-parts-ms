import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      avatar: {
        type: String, // cloudinary url
        required: true,
      },
    },
    { timestamps: true }
  );

userSchema.pre("save",async function(next){
    if(!this.isModified(this.password)) next()
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

  export const User = mongoose.model("User",userSchema)