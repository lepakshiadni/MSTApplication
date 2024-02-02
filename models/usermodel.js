const mongoose = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
const feedUserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true
    },
    location:{
        type:String
    },
    phoneNumber:{
        type:String,
        unique:true,
        spare:true
    },
    role:{
        type:String,
        default:"user"
    }
},
    {
        timestamps: true
    },
);


module.exports = mongoose.model('FeedUser', feedUserSchema);
