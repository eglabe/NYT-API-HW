// sets the code to run when the page is ready
$(document).ready(function() {

	// the initial values of the search variables
	var searchTerm = "";
	var number = 0;
	var startYear = 0;
	var endYear = 0;

	// stores the NYT API key
	var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

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

	    		// check if the response.doc[i] objects exists
	    		if(apiData.response.docs[i] !== undefined){
	    			// 
					if (apiData.response.docs[i].headline !== null) {
						$("#article-num-" + articleCounter)
					  		.append(
					    		"<h3 class='articleHeadline'><span class='itemNumber'>" + articleCounter + " " + 
					    		"</span><strong><a href='" + apiData.response.docs[i].web_url + "'target='_blank'>" +
					    		apiData.response.docs[i].headline.main + "</a></strong></h3>");
					}				

					if (apiData.response.docs[i].byline && apiData.response.docs[i].byline.original) {
						$("#article-num-" + articleCounter)
					  		.append("<h5>" + apiData.response.docs[i].byline.original + "</h5>");
					}

					if (apiData.response.docs[i].snippet !== null) {
						$("#article-num-" + articleCounter)
							.append("<h5>" + apiData.response.docs[i].snippet + "</h5>");
					}

					if (apiData.response.docs[i].pub_date !== null) {
						$("#article-num-" + articleCounter)
							.append("<h5>" + apiData.response.docs[i].pub_date + "</h5>");
					}
				} else {
					console.log('could not find apiData.response.docs[i]');
				}

	    	}
	    });

	}


	$("#searchBtn").on("click", function(event){
		
		event.preventDefault();

		articleCounter = 0;

		$("#article-display").empty();

		searchTerm = $("#searchTerm").val().trim();
		var nytURL = urlBase + searchTerm;

		number = $("#number").val().trim();
		startYear = $("#startYear").val().trim();
		endYear = $("#endYear").val().trim();


		if (parseInt(startYear)) {
		  nytURL = nytURL + "&begin_date=" + startYear + "0101";
		}

		if (parseInt(endYear)) {
    	  nytURL = nytURL + "&end_date=" + endYear + "1231";
		}

		getResults(number, nytURL);

	});


	// This button clears the top articles section
	$("#clearBtn").on("click", function() {
		articleCounter = 0;
		$("#article-display").empty();
});

});