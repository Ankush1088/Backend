import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["Recruiter", "Student"],
      default: "Student", 
    },

    profile: {
      bio: {
        type: String,
      },
      skill: [
        {
          type: String,
        },
      ],
      resume: {
        type: String, // URL to resume file
      },
      resumeOrignal: {
        type: String,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export  const User = mongoose.model("User", UserSchema);
