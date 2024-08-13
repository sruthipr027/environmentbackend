const axios = require('axios');

// Function to generate random environmental data
const generateRandomData = () => {
    return {
        ph: (Math.random() * 14).toFixed(2),          // pH values range from 0 to 14
        tss: (Math.random() * 1000).toFixed(2),      // TSS values in mg/L
        tds: (Math.random() * 1000).toFixed(2),      // TDS values in mg/L
        bod: (Math.random() * 500).toFixed(2),       // BOD values in mg/L
        cod: (Math.random() * 500).toFixed(2),       // COD values in mg/L
        chloride: (Math.random() * 1000).toFixed(2)  // Chloride values in mg/L
    };
};

// Function to post data to the backend
const postData = async () => {
    try {
        const data = generateRandomData();
        const response = await axios.post('http://localhost:4000/data/sensordata',data);
        console.log('Data posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

// Post data every 20 seconds
setInterval(postData, 300000); 
