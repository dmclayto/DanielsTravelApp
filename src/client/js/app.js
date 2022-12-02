//variables
//const button = document.querySelector("#generate");
const destination = document.getElementById("destination");
const temp = document.getElementById("temp");
const img = document.getElementById("img");
const extra = document.getElementById("extra");
const countdown =  document.getElementById("countdown");
//API Variables for Geonames
const geoWeb = "http://api.geonames.org/searchJSON?q=";
const geoAPIKey = "&maxRows=10&username=dmclayto";
const city = document.querySelector("#city")

//API variables for weatherbit (16 day degree forecast)

//oldkey
//&key=ebd3cca93b454fb39bc3092c9c3f8bbe

const weatherbitAPIKey = "&key=764f8e42e2ae4fd1bc5d46711259417c";
//const weatherbitwebCurrent =  "http://api.weatherbit.io/v2.0/current/energy?";
const weatherbitwebForecast = "http://api.weatherbit.io/v2.0/forecast/daily?";
const webLat = "lat=";
const webLon = "&lon=";

//API variables for Pixabay
const pixabayURI = "https://pixabay.com/api/?key=";
const pixabaywebTwo =  "&q="
const pixabaywebThree = "&image_type=photo"
const pixabayAPIKey = "30004342-9b10360e4b14b8d3e2daffbaa";

//========================================================================================


//event button function

async function handleSubmit(event) {
    event.preventDefault()
 //button.addEventListener('click', (performAction) =>{
   // performAction.preventDefault();

   

    //run geo function
    const geoURI = `${geoWeb}${city.value}${geoAPIKey}`;
   getGeonames (geoURI) 
   //run weatherbit function
    .then ((geonamesResultsArray) =>{
        getweatherbit (weatherbitwebForecast + webLat + geonamesResultsArray[0] + webLon + geonamesResultsArray[1] + weatherbitAPIKey)
      
        .then ((weatherbitResultsArray)=>{
            postData ('http://localhost:8086/postWeather', {temp: weatherbitResultsArray}) 
           .then
           // run pixabay function
            getPixabay (pixabayURI + pixabayAPIKey + pixabaywebTwo + city.value + pixabaywebThree )
           .then ((pixa)=>{
                postData ('http://localhost:8086/postPixa', {pixa: pixa}) 
           
        // update image to UI
        .then (()=>{
            uploadimage()
           
         //update the UI application
    .then (()=>{
        updateUI ()
    
})})})})
})
}
 
 
// Get the data from Geonames. 
 
 const getGeonames = async (url) =>{
    try {
        const res = await fetch (url);
        const data = await res.json()
         console.log (data); 
        
         // turn latitude and longitude into variables for later
         const lat = data.geonames[0].lat;
         console.log ("latitude",lat);
         const lon = data.geonames[0].lng;
         console.log ("longitude", lon);
         const country = data.geonames[0].countryName;
         console.log (country)
         // building variable for weather bit to transfer geo data
         const geonamesResultsArray = [lat, lon, country];
         console.log (geonamesResultsArray);
      //return and post the data to the console.
        return ( geonamesResultsArray)
        
     // if city  doesnt exist post this message to console.
    } catch (error){
        console.log (error, "cant find city ")
    }
};

//Get the data from weatherbit
 const getweatherbit = async (url) =>{
   
    try {  const res = await fetch (url);
    const data = await res.json()
       console.log (data)
       const tempLow = data.data[0].low_temp
       console.log ("temp low:", tempLow)
       const tempMax = data.data[0].high_temp
       const weatherbitResultsArray = ["Forecasted temperatures range <br> minimum " + " " + tempLow+ " " +"and maximum"+ " " + tempMax+ " " + "degrees <br> over the next 16 days."]
       console.log ( weatherbitResultsArray);
        return (weatherbitResultsArray)
    } catch (error){
        console.log (error, "cant find weather data from weatherbit ")
    }
};
    
// get the data from pixabay 
 const getPixabay = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data);
        const pixa = data.hits[0].previewURL;
        console.log (pixa);
      
        return (pixa)
    }
    catch (error) {
        console.log("could not find photo of location", error);
    }}


    

// post data client side function
  const postData = async( url = '', data = {}) => {

    try{
    const res = await fetch (url,{
        method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
})
    const newData = await res.json();
    return newData;
 } catch (error){
    console.log (error)
    
 } 
 
};


 

//Update the UI
 const updateUI = async () =>{
    
   
   try{
    const req = await fetch('http://localhost:8086/getWeather');
    const allData = await req.json ();
   // update temp, city name , image
  
     destination.innerHTML = `<p>Travelling to:  ${city.value}</p>`;
    temp.innerHTML = `<p>  ${allData[2].temp}  </p>`;
     temp.style.cssText = "background-color: #5c263f; margin: 8px; padding: 3px; border: solid; border-color: rebeccapurple;"
    
     
 
    
     // countdown for duration of trip and update css for extra element dynamically
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const dateOne = new Date(startDate.value);
const dateTwo = new Date (endDate.value);
const diffInTime = dateTwo.getTime() - dateOne.getTime();
const diffInDays = diffInTime / (1000 * 3600 * 24);
// add to html
extra.innerHTML=  ("Total trip duration is " + diffInDays + " days. <br> " + dateOne + " <br>to <br> " + dateTwo);
extra.style.cssText = "background-color: #3b4a6b; margin: 8px; padding: 3px; border: solid; border-color: rebeccapurple;";

   // counting down days till trip begins and  update the css dynamically for countdown element
const currentDate = new Date();
const diff = (new Date(startDate.value).getTime() - currentDate.getTime());
const daysToGo = (diff / (1000 * 3600 * 24));
const daysToGoRounded = daysToGo.toFixed(0);
//add to html
countdown.innerHTML =   daysToGoRounded + " day(s) to go until take off!" ;
countdown.style.cssText = "background-color: #3b4a6b; margin: 8px; padding: 3px; border: solid; border-color: rebeccapurple;";
 
}catch(error){
    console.log("could not get data from server", error);
}
}




 const uploadimage = async () =>{
    try{
        const req = await fetch('http://localhost:8086/getPixa');
        const allData = await req.json ();
        img.src = `${allData[0].pixa}`;
      
      
     
    }catch(error){
        console.log("could not get photo from server", error);
    }
    }


export { handleSubmit, uploadimage, updateUI, postData, getPixabay, getweatherbit, getGeonames}