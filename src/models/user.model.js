const { Schema, model } = require("mongoose");
const { compare, hash } = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Save password hashed to database on new user create.
 * @param {PreSaveMiddlewareFunction} next
 */
async function saveHashedPassword(next) {
  try {
    this.password = await hash(this.password, 10);
    next();
  } catch (err) {
    console.log(err);

    throw new Error("Internal error. Unable to save.", { cause: 400 });
  }
}

UserSchema.methods.validatePassword = async function validatePassword(password) {
  try {
    return await compare(password, this.password);
  } catch {
    throw new Error("Internal error. Unable to validate user.");
  }
};

UserSchema.pre("save", saveHashedPassword);
UserSchema.pre("updateOne", saveHashedPassword);

const UserModel = model("User", UserSchema, "tblUsers");

module.exports = { UserModel };
