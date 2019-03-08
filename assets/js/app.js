/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/*eslint-env browser*/
/*global $*/
//--------------------------------------------------------------------------------------------------------------
//link to portfolio page https://vincent440.github.io/portfolio.html
//-------------------Giphy API WEEK 6 HW----------------------Global variables----------------------------------
var topics = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Lunar",
"Sun","Comets","Asteroids","Space","Stars","Galaxy","Cosmos","Astronomy","Universe","Black Holes"];//Starting topics array based around Space/astronomy styles

//API key used to retrieve data from the servers.
var apiKey= "&api_key=aDWTP2Hv0BWis8vPpDBeKqrdD6aBRF6W";
//Request limit set to 10, bonus = add another user input to adjust the limit accordingly to whatever value is selected. 
var limitValue = "10";
//a string containing the search request using the VALUE of the button clicked. currently space to test api call 
var queryUserInput ="";

//the query url to call the api using string concatenation to build the API request based off of what button is clicked
//bonuses= add option to adjust limit, option to append more gifs instead of just replace, option to local storage save favorites gifs
var queryURL = "https://api.giphy.com/v1/gifs/search?"+"limit="+limitValue+apiKey+"&q=";//this will get placed into my AJAX call with my GET method.

//console log query url to test call & check for errors
console.log(queryURL);
//-----------------------------------------FUNCTION CREATION-----------------------------------------------------
//function to generate buttons with the topics array as the data Value
//topicButtonsGen function will be called when the page loads , and on the click event for the Api Topic Submit button to add new values the user input
function topicButtonsGen() {

    //clear the DIV containing the current ApiTopic buttons to prevent duplicates 
    $("#button-placement").empty();
        
    for (var i = 0 ; i < topics.length ; i++) {

        //  Initiate variable to build APIBUTTONS 
        var apiButtons = $("<button>");

        //apply require attributes to buttons
        apiButtons.attr("type","button");
        apiButtons.attr("data-topicvalue",topics[i]);
        //add classes for bootstrap bootstrap styling and a handle for click event/custom styling
        apiButtons.addClass("btn btn btn-dark api-call-buttons");
        //places string from current index of the topics array
        apiButtons.text(topics[i]);
        //append the values to the button-placement div each iteration of the loop
        $("#button-placement").append(apiButtons);
    }
    
}

function imageCreation(ajaxData)  {
    console.log(ajaxData);

}


function getApiCallData(){

    var searchValue = this.getAttribute('data-topicvalue').trim();

    searchValue = searchValue.toLowerCase();

    searchValue = encodeURI(searchValue);
    console.log(searchValue);//use the Value from the button clicked 

    queryURL+=searchValue;//attach to AJAX call the value in the search term grabbed from the button clicked.   
            
    console.log(queryURL);

    $.ajax({//AJAX CALL
        
        url:queryURL,
        type:"GET"

    }).then(function(responseData) {
        imageCreation(responseData)
        //console.log(responseData);
        return responseData;

    })
    queryURL = "https://api.giphy.com/v1/gifs/search?"+"limit="+limitValue+apiKey+"&q=";
    console.log(queryURL);

}


    // this Function will be called Inside the AJAX then function |OR| this code will go inside the then function
    //this will take in the retrieved Data from the AJAX call response

    //variable to create image tags to store GIF Web URLs

    //a for loop ( to loop through each index of the retrieved data from the GIPHY api)
    //
    //place the web url of the image inside the SRC of the image element var created
    //add attributes to the images if needed here
    //add a class to the gifs for either styling or click function if needed to start/stop animation
    //DOM push the gifs to the page inside the DIV created to hold them

//----DOCUMENT READY-----------------------FUNCTION CALLS AND CLICK EVENTS-----------------------------------------

// Shorthand for $( document ).ready()
$(function() {

    //document ready function to prevent any issues well loading JS and the page. 
    //initial call to generate the TOPICS Array buttons when the page is loaded.

    topicButtonsGen();

    console.log( "ready!" );    

    $("#textButton").on( "click", function() {  
        
        //Click event for submit button
        //  event prevent default to stop page from refreshing on clicks
        //      take in value and push it to topics array
        //      Call function to clear Gif button divs & generate buttons with updated array values
        //     clear the textbox inside the html to wait for new user input, and dump the variable containing the previous user input.

        //--------------console.log is your friend----------------------
        event.preventDefault();
        
        var buttonData = $("#userButtonText").val().trim();
        console.log(buttonData);
        $("#userButtonText").val("");
        console.log("User entered: "+ buttonData +" ;in the textbox" );
        buttonData='';
        console.log(buttonData);
        topicButtonsGen();//Call to the API BUTTON placement function to add to the HTML document new user input along with everything in the array previously

    });
    //Click event for API Call buttons class on the document
    $(document).on( "click",".api-call-buttons", getApiCallData);

    $(document).on( "click",/*ENTER GIF CLASS HERE */ function() {

        // document click event for GIF images to start/stop them 
        //if statement, for if the image is static, animate it/ if statement to do opposite, if animated make static.
        //      on the click event of the gif class have the image src switch from image_Still url to the playable gif_url retrived from the response. 
        //      will NEED to read more on the DOCUMENTATION/ test out gifs on page when they are succesfully placed into html

    });

});


/*
When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

Under every gif, display its rating (PG, G, so on).


This data is provided by the GIPHY API.
Only once you get images displaying with button presses should you move on to the next step.


Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
Deploy your assignment to Github Pages.
Rejoice! You just made something really cool. */