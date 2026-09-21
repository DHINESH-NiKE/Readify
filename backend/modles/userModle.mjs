import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "FirstName should not be empty"],
    },
    lastname: {
      type: String,
      required: [true, "LastName should not be empty"],
    },
    email: {
      type: String,
      required: [true, "Email should not be empty"],
    },
    password: {
      type: String,
      required: [true, "Password should not be empty"],
    },
  },
  {
    timestamps: true,
    collection: "Users",
  },
);

const Users = mongoose.model("Users", userSchema);
export default Users;
