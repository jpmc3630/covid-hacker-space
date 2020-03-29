var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var headlinesHashSchema = new Schema({
  hHash: {
      type: String,
  }
});


// This creates our model from the above schema, using mongoose's model method
var headlinesHash = mongoose.model("headlinesHash", headlinesHashSchema);

// Export the Note model
module.exports = headlinesHash;