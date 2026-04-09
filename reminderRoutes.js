const express = require('express');
const router = express.Router();
const {
  getAllReminders,
  getReminderById,
  createReminder,
  updateReminder,
  toggleActive,
  deleteReminder,
  getTodayReminders
} = require('../controllers/reminderController');

router.get('/today', getTodayReminders);

router.route('/').get(getAllReminders).post(createReminder);

router.route('/:id').get(getReminderById).put(updateReminder).delete(deleteReminder);

router.patch('/:id/toggle', toggleActive);

module.exports = router;
