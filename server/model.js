const mongoose = require("mongoose");

const TOdoschema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("todo", TOdoschema);

module.exports = { todo };
