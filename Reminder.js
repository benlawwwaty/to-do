const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    reminderTime: {
      type: String,
      required: [true, 'Reminder time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format']
    },
    daysOfWeek: {
      type: [Number],
      default: [],
      validate: {
        validator: (arr) => arr.every((d) => d >= 0 && d <= 6),
        message: 'daysOfWeek values must be between 0 (Sun) and 6 (Sat)'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      enum: ['work', 'health', 'personal', 'finance', 'other'],
      default: 'personal'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Reminder', reminderSchema);
