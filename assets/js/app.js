/*eslint-env browser*/
/*global $*/
var topics = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Lunar", "Sun", "Comets", "Asteroids", "Space", "Stars", "Galaxy", "Cosmos", "Astronomy", "Universe", "Black Holes"]; // Starting topics array based around Space/astronomy styles
var apiKey = "&api_key=aDWTP2Hv0BWis8vPpDBeKqrdD6aBRF6W"; // API key used to retrieve data from the servers.
var limitValue = "12"; // Request limit set to 12, bonus = add another user input to adjust the limit accordingly to whatever value is selected.
var queryURL = "https://api.giphy.com/v1/gifs/search?rating=pg-13&limit=" + limitValue + apiKey + "&q=";
// query url with rating hard coded in, with variable limit and search parameters.
function topicButtonsGen() {
  $("#button-placement").empty(); // clear the DIV containing the current ApiTopic buttons to prevent duplicates
  for (var i = 0; i < topics.length; i++) {
    var apiButtons = $("<button>"); //  Initiate variable to build APIBUTTONS
    apiButtons
      .attr("type", "button") // apply required attributes to buttons
      .attr("data-topicvalue", topics[i])
      .addClass("btn btn btn-dark api-call-buttons m-1") // add classes for bootstrap bootstrap styling and a handle for click event/custom styling
      .text(topics[i]); // places string from current index of the topics array
    $("#button-placement").append(apiButtons); //append the values to the button-placement div each iteration of the loop
  }
}
function imageCreation(ajaxData) {
  var gifImgData = ajaxData.data;
  $("#image-box").empty(); // remove previous images each new request.
  for (var gifIndex = 0; gifIndex < gifImgData.length; gifIndex++) {
    var gifRating = gifImgData[gifIndex].rating;
    var fixedUrl = gifImgData[gifIndex].images.original_still.url;
    var animatedUrl = gifImgData[gifIndex].images.original.url;
    var imageFigure = $("<figure>");
    var imgTag = $("<img>");
    var figCaption = $("<figcaption>");
    imageFigure
      .addClass("figure col-md-3 col-lg-4")
      .append(imgTag)
      .prepend(figCaption);
    imgTag
      .addClass("img-fluid imgClick")
      .attr("src", fixedUrl)
      .attr("data-fixed", fixedUrl) // false for fixed image
      .attr("data-animated", animatedUrl) // true for animated gif
      .attr("data-status", false)
      .attr("alt", "Image failed to load from server.");
    figCaption.addClass("figure-caption text-center").text("Rated: " + gifRating);
    $("#image-box").prepend(imageFigure);
  }
}
function getApiCallData() {
  var searchValue = $(this)
    .attr("data-topicvalue")
    .trim();
  $("#gifDisplay").html("Displaying: " + "<h4 class='display-3 font-italic'>" + searchValue + " Gifs</h4>" + "Click the Images to animate them!");
  searchValue = searchValue.toLowerCase();
  searchValue = encodeURI(searchValue); // use the Value from the button clicked and remove spaces
  queryURL += searchValue; // attach the value from the button clicked to AJAX search query
  $.ajax({
    url: queryURL,
    type: "GET"
  }).then(function(responseData) {
    imageCreation(responseData);
    return responseData;
  });
  queryURL = "https://api.giphy.com/v1/gifs/search?rating=pg-13&limit=" + limitValue + apiKey + "&q="; //RESETS QUERY URL
  $("#bottomBtn").show(); // shows scroll to top button
}
$(function() {
  topicButtonsGen(); // initial call to generate the TOPICS Array buttons when the page is loaded.
  $("#textButton").on("click", function(event) {
    event.preventDefault();// need error handling to prevent any input from submitting to topics array
    var buttonData = $("#userButtonText")
      .val()
      .trim();
    topics.push(buttonData);
    $("#userButtonText").val("");
    buttonData = "";
    topicButtonsGen(); // Call to the API BUTTON placement function to add to the HTML document new user input along with everything in the array previously
  });
  $(document).on("click", ".api-call-buttons", getApiCallData); //Click event for API Call buttons class on the document
  $(document).on("click", ".imgClick", function() {
    // Click event to start/stop gif animation
    var animated = $(this).data("status");
    var imgFix = $(this).data("fixed");
    var imgGif = $(this).data("animated");
    if (animated == false) {
      $(this).attr("src", imgGif);
      $(this).data("status", true);
    }
    if (animated == true) {
      $(this).attr("src", imgFix);
      $(this).data("status", false);
    }
  });
});
