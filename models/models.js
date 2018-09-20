const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const houseSchema = Schema({
    location : {
        type : String
    },
     rate: {
        type : Number
        
    },
    room : {
        type : Number
        
    },
    waterProblem : {
        type : Boolean
    },
    parkingProblem : {
        type : Boolean
    }
});
module.exports = mongoose.model('House',houseSchema);