import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Username is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  userProfile: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message:
        "Password is too weak! Must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol (!,@,#,$,%,&,*)",
    },
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        console.log("elemnt", el, this.password);

        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  isAdmin: { type: Boolean, default: false },
});

// Custom validation for passwordConfirm
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
