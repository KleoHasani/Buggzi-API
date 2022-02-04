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

// Validate given password agains hashed password.
UserSchema.methods.validatePassword = async function validatePassword(password) {
  try {
    return await compare(password, this.password);
  } catch {
    throw new Error("Internal error. Unable to validate user.");
  }
};

// Hash password on save. (Create new user.)
UserSchema.pre("save", async function () {
  try {
    this.password = await hash(this.password, 10);
    next();
  } catch (err) {
    console.log(err);
    throw new Error("Internal error. Unable to save.", { cause: 400 });
  }
});

// Hash password on update.
UserSchema.pre("updateOne", { document: true, query: true }, async function (next) {
  try {
    const update = this.getUpdate().$set;
    update.password = await hash(update.password, 10);
    next();
  } catch (err) {
    console.log(err);
    throw new Error("Internal error. Unable to save.", { cause: 400 });
  }
});

const UserModel = model("User", UserSchema, "tblUsers");

module.exports = { UserModel };
