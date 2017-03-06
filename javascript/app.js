// sets the code to run when the page is ready
$(document).ready(function() {

	// the initial values of the search variables
	var searchTerm = "";
	var number = 0;
	var startYear = 0;
	var endYear = 0;

	// stores the NYT API key
	var apiKey = "016580a022f047d4b377b3844f6ae813";

	// stores the base of the URL needed for the API query, user terms will be added
	var urlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  	  apiKey + "&q=";

  	// NYT API doesn't control for number of responses, so we'll set it through this variable
  	var articleCounter = 0;

  	// function to retrieve data from the API (# of articles and URL with terms will be added from user)
	function getResults (numArticles, url) {

		// AJAX call
		$.ajax({
	    url: url,
	    method: "GET"
	    }).done(function(apiData) {
	    	
	    	// loop function to run through the number of articles the user requested
	    	for (var i = 0; i < numArticles; i++) {

	    		// needed to count which articles we are on, will be used for individual divs
	    		articleCounter++;

	    		// creates a div to put the articles, adds class & id, 
	    		// puts the div into the HTML element "article-div"
	    		var story = $("<div>").addClass("story container");
	    		story.attr("id", "article-num-" + articleCounter);
	    		$("#article-display").append(story);

	    		// check if the response.doc[i] object exists
	    		if(apiData.response.docs[i] !== undefined){

	    			// if there is a headline, make a h3 header and put it in the appropriate div
					if (apiData.response.docs[i].headline !== null) {
						$("#article-num-" + articleCounter)
					  		.append(
					    		"<h3 class='articleHeadline'><span class='itemNumber'>" + articleCounter + " " + 
					    		"</span><strong><a href='" + apiData.response.docs[i].web_url + "'target='_blank'>" +
					    		apiData.response.docs[i].headline.main + "</a></strong></h3>");
					}	

					// if there is a byline, make a h5 header and put it in the appropriate div
					if (apiData.response.docs[i].byline && apiData.response.docs[i].byline.original) {
						$("#article-num-" + articleCounter)
					  		.append("<h5>" + apiData.response.docs[i].byline.original + "</h5>");
					}

					// if there is a snippet, make a h5 header and put it in the appropriate div
					if (apiData.response.docs[i].snippet !== null) {
						$("#article-num-" + articleCounter)
							.append("<h5>" + apiData.response.docs[i].snippet + "</h5>");
					}

					// if there is a publication date, make a h5 header and put it in the appropriate div
					if (apiData.response.docs[i].pub_date !== null) {
						$("#article-num-" + articleCounter)
							.append("<h5>" + apiData.response.docs[i].pub_date + "</h5>");
					}

				// if a response could not be returned...
				} else {
					console.log('could not find apiData.response.docs[i]');
				}

	    	}
	    });

	}


	// when the search button is clicked, run the following code...
	$("#searchBtn").on("click", function(event){
		
		// prevents the default on the button being pushed
		event.preventDefault();

		// sets article counter to zero, to clear any previous count set by a previous search
		articleCounter = 0;

		// empties any articles there could be from a previous search
		$("#article-display").empty();

		// retrieves the user input search term
		// creates variable to add the term to the base url
		searchTerm = $("#searchTerm").val().trim();
		var nytURL = urlBase + searchTerm;

		// retrieves the user number
		// and start & end year (if entered)
		number = $("#number").val().trim();
		startYear = $("#startYear").val().trim();
		endYear = $("#endYear").val().trim();

		// if they entered a start year, add it to the end of the api url
		if (parseInt(startYear)) {
		  nytURL = nytURL + "&begin_date=" + startYear + "0101";
		}

		// if they entered an end year, add it to the end of the api url
		if (parseInt(endYear)) {
    	  nytURL = nytURL + "&end_date=" + endYear + "1231";
		}

		// triggers the query function to run with the number of articles requested
		// and the appropriate url to send with the query
		getResults(number, nytURL);

	});


	// this button clears the previous articles, and resets the article counter
	$("#clearBtn").on("click", function() {

		articleCounter = 0;
		$("#article-display").empty();
});

});