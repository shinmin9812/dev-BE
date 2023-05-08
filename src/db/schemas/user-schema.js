const { Schema, model } = require("mongoose");
const { shortId } = require("../../utils/short-id");
const UserSchema = new Schema(
  {
    short_id: shortId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    full_name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
)

const User = model("User", UserSchema);

module.exports = { User };
