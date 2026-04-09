const Reminder = require('../models/Reminder');

const getAllReminders = async (req, res) => {
  try {
    const { category, priority, isActive } = req.query;
    const filter = {};

    if (category)           filter.category = category;
    if (priority)           filter.priority = priority;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const reminders = await Reminder.find(filter).sort({ reminderTime: 1 });

    res.status(200).json({
      success: true,
      count: reminders.length,
      data: reminders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.status(200).json({ success: true, data: reminder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create(req.body);
    res.status(201).json({ success: true, data: reminder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.status(200).json({ success: true, data: reminder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const toggleActive = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    reminder.isActive = !reminder.isActive;
    await reminder.save();
    res.status(200).json({
      success: true,
      message: `Reminder is now ${reminder.isActive ? 'active ✅' : 'inactive ⏸️'}`,
      data: reminder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.status(200).json({ success: true, message: 'Reminder deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTodayReminders = async (req, res) => {
  try {
    const todayDay = new Date().getDay();

    const reminders = await Reminder.find({
      isActive: true,
      $or: [
        { daysOfWeek: { $size: 0 } },
        { daysOfWeek: todayDay }
      ]
    }).sort({ reminderTime: 1 });

    res.status(200).json({
      success: true,
      today: new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      count: reminders.length,
      data: reminders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllReminders,
  getReminderById,
  createReminder,
  updateReminder,
  toggleActive,
  deleteReminder,
  getTodayReminders
};
