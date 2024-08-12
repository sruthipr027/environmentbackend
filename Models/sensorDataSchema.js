const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    ph: { type: Number, required: true },
    tss: { type: Number, required: true },
    tds: { type: Number, required: true },
    bod: { type: Number, required: true },
    cod: { type: Number, required: true },
    chloride: { type: Number, required: true },
    timestamp: {
        type: Date,
        default: Date.now
    }
    
    
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
