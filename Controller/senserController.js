const SensorData = require('../Models/sensorDataSchema');


 exports.sensor = async (req, res) => {
    try {
        const { ph, tss, tds, bod, cod, chloride ,timestamp} = req.body;

        const sensorData = new SensorData({
            ph,
            tss,
            tds,
            bod,
            cod,
            chloride,
            timestamp
        });

        await sensorData.save();
        res.status(201).json(sensorData);
    } catch (error) {
        console.error('Error saving sensor data:', error);
        res.status(500).json({ message: 'Error saving sensor data' });
    }

};
 exports.getSensorData = async (req, res) => {
    try {
        const data = await SensorData.find(); // or other logic to get data
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        res.status(500).json({ message: "Error fetching sensor data" });
    }
};

exports.getSensorReport = async (req, res) => {
    try {
        const { columnname, timestamp } = req.params;  // Ensure correct extraction of params
        let startDate;

       /*  switch (timestamp) {
            case 'daily':
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'weekly':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - startDate.getDay());
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'monthly':
                startDate = new Date();
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'yearly':
                startDate = new Date();
                startDate.setMonth(0, 1); // January 1st
                startDate.setHours(0, 0, 0, 0);
                break;
            default:
                return res.status(400).json({ message: 'Invalid timeframe specified' });
        } */

        const sensorData = await SensorData.find({ 
            timestamp: { $gte: startDate } 
        }).select(`${columnname} timestamp`);
        console.log(sensorData);

        res.status(200).json(sensorData);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
}
