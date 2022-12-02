let projectData = {};
let pixaData = {};
const express = require('express');
const app = express();
//const mockAPIResponse = require('./mockAPI.js');
//middleware
const bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
const cors = require ('cors');
app.use(cors());

// port the app will listen to for incoming requests
const port = 8086;
const server = app.listen(port, expressTest)
function expressTest (){
    console.log('travel app is listening on port 8086!');
};
   
//initialize main project folder
app.use(express.static('dist'))


//get route
app.get('/all', function (req, res) {
     res.sendFile('dist/index.html')
   // res.sendFile(path.resolve('src/client/views/index.html'))
})


//get all the data from server
app.get ('/getWeather', (req,res)=>{
    res.send (projectData);
});

//get pixa data from server
app.get ('/getPixa', (req,res)=>{
  res.send (pixaData);
});

//post
app.post('/postWeather', (req, res)=>{

  //let newEntry =  [{lat: req.body.lat},{lng: req.body.lng},{temp: req.body.temp}];
  let newEntry =  [{lat: req.body.lat},{lng: req.body.lng},{temp: req.body.temp}];
  projectData = newEntry;
  console.log(projectData);
  res.send(projectData);
}
);

// post route pixabay
app.post('/postPixa', (req, res)=>{

  
 let newEntry =  [{pixa: req.body.pixa}];
 pixaData = newEntry;
 console.log(pixaData);
 res.send(pixaData);
}
     
  
  );


  //get for testing
 app.get('/test', function (req, res) {
  res.send({})
})

module.exports = {app, server};