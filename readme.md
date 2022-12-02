Here i have built udacitys final project: capstone Travel App.

i have aqquired data from 3 APIs that take the latitide and longitude from one and then use it to get the forecasted 16 day temperature from the next API and finally aquiring a photo that matches the city that is searched from the client. clients can add the travel dates from where they want to depart and return, and documents the duration of the trip and the amount of days left until the trip begins.

i have used HTML,SCSS,JS, NPM and Node to build this app



RUNNING APPLICATION:
open up a fresh terminal and run "NPM i" to install the package.json files. (it is important that you wait until the npm has finished installing before running anything, this can take a few minutes.)
1. RUN SERVER - open a new terminal and run "npm run start" to run server on its port.
2. BUILD SERVER - open another new terminal and run " npm run prod" to build app in production. (if the build fails it is because you didnt let npm install packages completley.)
3. TESTING:
    when running tests make sure to kill all terminals and server, then open a new terminal and run "npm run test".
    - express.spec file tests the express server functionality
    - handleSubmit.spec file tests the application js functionality
4. DEV MODE - open a new terminal and run "npm run dev" to open project in developer mode.

EXTEND YOUR PROJECT/WAYS TO STAND OUT SECTION:
i have used, Add end date and display length of trip.


service workers have been added into the html, as told within the learning content. not sure why it causes a error in the console upon start up, but it seems like it s a regualr thing for everyone. much be outdated from udacty learning.

