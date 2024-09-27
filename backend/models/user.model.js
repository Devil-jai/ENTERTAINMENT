import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  bookmarks: [
    {
      type: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      title:{
        type:String,
        required:true
      }
    },
  ],
});

export const User = mongoose.model("User", userSchema);
