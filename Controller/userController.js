const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Register
exports.register = async (req, res) => {
    console.log('inside controller register');
    const { username, email, password } = req.body;

    try {
        const existUser = await users.findOne({ email });
        if (existUser) {
            return res.status(406).json('Account already exists, please login');
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new users({
            username,
            email,
            password: hashedPassword
        });

        // Save
        await newUser.save();
        return res.status(200).json(newUser);
    } catch (err) {
        console.log('Register failed due to', err);
        return res.status(500).json('Registration failed');
    }
}

// Login
exports.login = async (req, res) => {
    console.log('inside controller login');
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(406).json('Incorrect email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(406).json('Incorrect email or password');
        }

        //token
        const token = jwt.sign({ userId: existingUser._id }, "supersecretkey12345");

        return res.status(200).json({
            existingUser,
            token
        });
    } catch (err) {
        console.log('Login failed due to', err);
        return res.status(500).json(`Login failed due to ${err}`);
    }
}
//sensordata
/* exports.sensor = async (req, res) => {
    console.log('Incoming data:', req.body);  // Add this line
    const { ph, tss, tds, bod, cod, chloride } = req.body;
    try {
        const newData = new sensorData({
            ph,
            tss,
            tds,
            bod,
            cod,
            chloride
        });
        await newData.save();
        res.status(201).json(newData);
    } catch (err) {
        console.error('Error saving sensor data:', err);
        res.status(500).json({ error: 'Failed to save sensor data' });
    }
}; */