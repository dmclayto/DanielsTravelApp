
// import js app stuff
import { handleSubmit, uploadimage, updateUI, postData, getPixabay, getweatherbit, getGeonames} from './js/app'
// importing scss files.
import './styles/styles.scss'


// creating eventlistner button for seek trip
document.getElementById("generate").addEventListener('click', handleSubmit);




 

export {
    handleSubmit, uploadimage, updateUI, postData, getPixabay, getweatherbit, getGeonames}
   