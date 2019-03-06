/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/*eslint-env browser*/
/*global $*/
//--------------------------------------------------------------------------------------------------------------
//link to portfolio page https://vincent440.github.io/portfolio.html

//-------------------Giphy API WEEK 6 HW----------------------Global variables----------------------------------

//Starting topics array based around Space/astronomy styles
//Push user input from Textbox to this array then button placement Function call to include the new string added to array. 

var topics = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Lunar",
"Sun","Comets","Asteroids","space","stars","galaxy","cosmos","astronomy","universe"];

//API key used to retrieve data from the servers.
var apiKey= "&api_key=aDWTP2Hv0BWis8vPpDBeKqrdD6aBRF6W";
//Request limit set to 10,bonus = add another user input to adjust the limit accordingly to whatever value is selected. 
var apiLimitValue = "&limit=10";
//a string containing the search request using the VALUE of the button clicked. currently space to test api call 
var queryUserInput ="space";

//the query url to call the api using string concatenation to build the API request based off of what button is clicked
//bonuses= add option to adjust limit, option to append more gifs instead of just replace, option to local storage save favorites gifs
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+queryUserInput+apiLimitValue+apiKey;//this will get placed into my AJAX call with my GET method.

//console log query url to test call & check for errors
console.log(queryURL);
//-----------------------------------------FUNCTION CREATION-----------------------------------------------------
function topicButtonsGen() {
    //function to generate buttons with the topics array as the data Value
    //this function will be called when the page loads , and on the click event
    //for the button under the text box to add new buttons to the HTML with the value the USER inputs.

    //clear the DIV containing the current ApiTopic buttons to prevent duplicates 

    //  Initiate variable to build APIBUTTONS var apiButtons = $("<button>");
    //  inside for loop  (loop through each index of the topic array )      {
    //        .attr("data-topic",String pulled from current index of the array)
    //  add attribute equal to the String of the current index in the array for each button to be able to grab this value to make the api request
    //       .addClass(apiCallButton) to the buttons
    //       that class will be used for the handle for click event to call the API based on the value of the button clicked. 
    //      }
}
function imageCreation(){
    // this Function will be called Inside the AJAX then function |OR| this code will go inside the then function
    //this will take in the retrieved Data from the AJAX call response

    //variable to create image tags to store GIF Web URLs

    //a for loop ( to loop through each index of the retrieved data from the GIPHY api)
    //
    //place the web url of the image inside the SRC of the image element var created
    //add attributes to the images if needed here
    //add a class to the gifs for either styling or click function if needed to start/stop animation
    //DOM push the gifs to the page inside the DIV created to hold them
}
//----DOCUMENT READY-----------------------FUNCTION CALLS AND CLICK EVENTS-----------------------------------------

// Shorthand for $( document ).ready()
$(function() {
    //document ready function to prevent any issues well loading JS and the page. 
    //initial call to generate the TOPICS Array buttons when the page is loaded.
    console.log( "ready!" );    
    $("#textButton").on( "click", function() {  
        
        //Click event for submit button
        //  event prevent default to stop page from refreshing on clicks
        //      take in value and push it to topics array
        //      Call function to clear Gif button divs & generate buttons with updated array values
        //     clear the textbox inside the html to wait for new user input, and dump the variable containing the previous user input.
        //console.log is your friend
        event.preventDefault();
        console.log("text button clicked!");
        var buttonData = $("#userButtonText").val().trim();
        console.log(buttonData);     
      $("#userButtonText").val("");

        console.log("User entered: "+ buttonData +" ;in the textbox" );
        buttonData='';
        console.log(buttonData);

    });
    //Click event for API Call buttons class
    $(".apiCallButton").on( "click", function() {  
       
        //      use the Value from the button clicked 
        //      attach to an AJAX call with the value in the search term
        //      AJAX CALL
        //and THEN function inside click event
        
    });
    //?? click event for GIF images to start/stop them not sure of the functionality of the gifs retrived from api
    //how I can maybe make the gifs start/stop
    //      on the click event of the gif class have the image src switch from image_Still url to the playable gif_url retrived from the response. 
    //      will NEED to read more on the DOCUMENTATION/ test out gifs on page when they are succesfully placed into html
  });