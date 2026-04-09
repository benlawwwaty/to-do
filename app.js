require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminderRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: ' Daily Reminders API is running!',
    version: '1.0.0',
    endpoints: {
      health:         'GET    /',
      allReminders:   'GET    /api/reminders',
      todayReminders: 'GET    /api/reminders/today',
      getOne:         'GET    /api/reminders/:id',
      create:         'POST   /api/reminders',
      update:         'PUT    /api/reminders/:id',
      toggle:         'PATCH  /api/reminders/:id/toggle',
      delete:         'DELETE /api/reminders/:id'
    }
  });
});

app.use('/api/reminders', reminderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
