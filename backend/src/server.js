require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/stores');
const ownerRoutes = require('./routes/owner');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.json({ ok: true, message: 'BakeCart API' }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/owner', ownerRoutes);

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected');

    // Create/update tables based on models
    return sequelize.sync({ alter: true }); 
    // use { force: true } instead of { alter: true } only if you want to drop and recreate tables
  })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });
