import mongoose, { Schema } from "mongoose";

const NodeSchema = new mongoose.Schema({
  title: {
    type: Number,
    required: [true, "please add the title"],
    unique: true,
    maxLength: [40, "titles cannot be more than 40 character"],
  },
  description: {
    type: Number,
    required: true,
    maxLength: [100, "descriptio cannot be more than 40 character"],
  },
  text: {
    type: String,
    required: true,
    default: function () {
      // Assuming session.user.name is a string representing the user's name
      return this.session?.user?.name || "";
    },
  },
});

const NodeValue = mongoose.models.Note || mongoose.model("Note", NodeSchema);

export default NodeValue;
