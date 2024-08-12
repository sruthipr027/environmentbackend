const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('MOngodb successfully conneceted');
}).catch((err)=>{
    console.log(err);

})