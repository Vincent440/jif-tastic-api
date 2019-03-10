/*eslint-env browser*/
/*global $*/
//--------------------------------------------------------------------------------------------------------------
//link to portfolio page https://vincent440.github.io/portfolio.html
//-------------------Giphy API WEEK 6 HW----------------------Global variables----------------------------------
var topics = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Lunar",
"Sun","Comets","Asteroids","Space","Stars","Galaxy","Cosmos","Astronomy","Universe","Black Holes"];//Starting topics array based around Space/astronomy styles

var apiKey= "&api_key=aDWTP2Hv0BWis8vPpDBeKqrdD6aBRF6W";//API key used to retrieve data from the servers.

var limitValue = "12";//Request limit set to 12, bonus = add another user input to adjust the limit accordingly to whatever value is selected. 
var queryURL = "https://api.giphy.com/v1/gifs/search?rating=pg-13&limit="+limitValue+apiKey+"&q=";
//query url with rating hard coded in, with variable limit and search parameters. 
//-----------------------------------------FUNCTION CREATION-----------------------------------------------------
function topicButtonsGen() {

    $("#button-placement").empty();//clear the DIV containing the current ApiTopic buttons to prevent duplicates 
        
    for (var i = 0 ; i < topics.length ; i++) {

        //  Initiate variable to build APIBUTTONS 
        var apiButtons = $("<button>");

        //apply require attributes to buttons
        apiButtons.attr("type","button");
        apiButtons.attr("data-topicvalue",topics[i]);
        //add classes for bootstrap bootstrap styling and a handle for click event/custom styling
        apiButtons.addClass("btn btn btn-dark api-call-buttons m-1");
        //places string from current index of the topics array
        apiButtons.text(topics[i]);
        //append the values to the button-placement div each iteration of the loop
        $("#button-placement").append(apiButtons);
    }
}
function imageCreation(ajaxData)  {

    var gifImgData = ajaxData.data;
    
    $("#image-box").empty(); //remove previous images each new request. 

    for (var gifIndex = 0; gifIndex < gifImgData.length; gifIndex++)   {

        var gifRating = gifImgData[gifIndex].rating;
        var fixedUrl = gifImgData[gifIndex].images.original_still.url;
        var animatedUrl = gifImgData[gifIndex].images.original.url;
        var imageFigure = $("<figure>");
        var imgTag = $("<img>");
        var figCaption = $("<figcaption>");

        imageFigure.addClass("figure col-md-3 col-lg-4");
        imageFigure.append(imgTag);
        imageFigure.prepend(figCaption);

        imgTag.addClass("img-fluid imgClick")
        imgTag.attr("src",fixedUrl);
        imgTag.attr("data-fixed",fixedUrl);//0 for fixed image
        imgTag.attr("data-animated",animatedUrl);//1 for animated gif
        imgTag.attr("data-status",false);
        imgTag.attr("alt","Image failed to load from server.");

        figCaption.addClass("figure-caption text-center");
        figCaption.text("Rated: "+gifRating); 
       
        $("#image-box").prepend(imageFigure);
    }

}


function getApiCallData() {

    var searchValue = this.getAttribute('data-topicvalue').trim();
    $("#gifDisplay").html("Displaying: " + "<h4>"+searchValue+" Gifs</h4>"  + "Click the Images to animate them!" );
    searchValue = searchValue.toLowerCase();
    searchValue = encodeURI(searchValue);//use the Value from the button clicked and remove spaces
    queryURL+=searchValue;//attach the value from the button clicked to AJAX search query             
    $.ajax({//AJAX CALL        
        url:queryURL,
        type:"GET"
    }).then(function(responseData) {
        imageCreation(responseData)
        return responseData;
    })
    queryURL = "https://api.giphy.com/v1/gifs/search?rating=pg-13&limit="+limitValue+apiKey+"&q=";//RESETS QUERY URL
    $("#bottomBtn").show();//shows scroll to top button
}
//----DOCUMENT READY-----------------------FUNCTION CALLS AND CLICK EVENTS-----------------------------------------
$(function() { // Shorthand for $( document ).ready()

    topicButtonsGen();//initial call to generate the TOPICS Array buttons when the page is loaded.

    $("#textButton").on( "click", function() {  
        
        event.preventDefault();
        var buttonData = $("#userButtonText").val().trim();
        topics.push(buttonData);
        console.log(buttonData);

        $("#userButtonText").val("");
        buttonData = '';
        console.log("User entered: "+ buttonData +" ;in the textbox" );
      
        console.log(buttonData);

        topicButtonsGen();//Call to the API BUTTON placement function to add to the HTML document new user input along with everything in the array previously
        
        });
    //Click event for API Call buttons class on the document
    $(document).on( "click",".api-call-buttons", getApiCallData);

    $(document).on( "click",".imgClick", function() {// document click event for GIF images to start/stop the
        var animated = $(this).data("status");
        var imgFix = $(this).data("fixed");
        var imgGif = $(this).data("animated");
        //if statement, for if the image is static, animate it/ if statement to do opposite, if animated make static.
        if ( animated == false )  {
            $(this).attr( "src" , imgGif );
            $(this).data( "status" , true );
        }
        if ( animated == true )  {
            $(this).attr( "src" , imgFix );
            $(this).data( "status" , false );
        } 
    });
});