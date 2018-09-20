const express = require('express');
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');
const House = require('./models/models');
const bodyParser = require('body-parser');
// connecting to database
mongoose.connect('mongodb://localhost:27017/search',{ useNewUrlParser: true })
.then((db) => console.log('sucessfully connected to the database'))
.catch(e => console.log(e));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function(req, res){
    // console.log(req.body)
  const newHouse = new House({
      location : req.body.location,
      rate : req.body.rate,
      room : req.body.room,
      waterProblem : req.body.waterProblem,
      parkingProblem : req.body.parkingProblem
  });
  newHouse.save().then(()=> {
      res.send('successfully saved your house info')
  })
});
app.post('/search/data', function(req, res){
    let response = [];
    // console.log(fetchedAllHouse());
    House.find({}).then((houses) => {
        let response = [];

        // searching logic
        // via location
        if(typeof req.body.location != 'undefined'){
            houses.filter(function(house){
              if(house.location == req.body.location){
                response.push(house);
              }
            });
          }
        
          // via rate
          if(typeof req.body.rate != 'undefined'){
            houses.filter(function(house){
                if(house.rate == req.body.rate){
                  response.push(house);
                }
              });
          }

        //   via room number
        if(typeof req.body.room != 'undefined'){
            houses.filter(function(house){
                if(house.rate == req.body.room){
                  response.push(house);
                }
              });
          }

        //   via waterproblem
        if(typeof req.body.waterProblem != 'undefined'){
            houses.filter(function(house){
                if(house.waterProblem.toString() == req.body.waterProblem.toString()){
                  response.push(house);
                }
              });
          }

        //   via parkingproblem
        if(typeof req.body.parkingProblem != 'undefined'){
            houses.filter(function(house){
                if(house.parkingProblem.toString() == req.body.parkingProblem.toString()){
                  response.push(house);
                }
              });
          }
        
          // reducing redundancey
          response = _.uniqBy(response, 'id');
        
          // in case no filtering has been applied, respond with all houses
          if(Object.keys(req.body).length === 0 && response.length === 0){
            res.send('No result found!')
          }
        
          res.json(response);
        


        // 
    });
  });

app.listen(3000, function(){
  console.log('app listening on port 3000!')
});