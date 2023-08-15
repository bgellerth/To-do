import mongoose from "mongoose";

export interface Todo {
  title: string;
  text: string;
  isChecked: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },

    isChecked: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // it adds createdAt / updatedAt fields
  }
);

export default mongoose.model("toDo", todoSchema);
