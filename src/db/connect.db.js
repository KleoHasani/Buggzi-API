const mongoose = require("mongoose");

/**
 * Create MongoDB connection.
 * @returns {void}
 */
async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI, { connectTimeoutMS: 5000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { connect };
