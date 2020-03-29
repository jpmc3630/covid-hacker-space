var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentsSchema = new Schema({
  username: String,
  body: String,
},{ timestamps: { createdAt: 'created_at' } });

// This creates our model from the above schema, using mongoose's model method
var Comments = mongoose.model("comments", CommentsSchema);

// Export the Note model
module.exports = Comments;
