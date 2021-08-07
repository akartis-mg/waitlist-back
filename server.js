const express = require('express');
require('dotenv-extended').load()
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());

//Define Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authBusiness', require('./routes/authBusiness'));
/*app.use('/api/typeCompany', require('./routes/typeCompany'));
app.use('/api/company', require('./routes/company'));
app.use('/api/branch', require('./routes/branch'));
app.use('/api/reservation', require('./routes/reservation'));
app.use('/api/staff', require('./routes/staff'));*/

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Waitlist.....' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
