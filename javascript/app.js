$(document).ready(function() {

	var searchTerm = "";
	var number = 0;
	var startYear = 0;
	var endYear = 0;

	var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	var urlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  	  apiKey + "&q=";

  	var articleCounter = 0;

	function getResults (numArticles, url) {

		$.ajax({
	    url: url,
	    method: "GET"
	    }).done(function(response) {

	    	var results = response.data;
	    	
	    	for (var i = 0; i < numArticles; i++) {

	    		articleCounter++;

	    		var link = results[i].docs.web_url;
	    		var headline = results[i].docs.headline.main;
	    		var snippet = results[i].docs.snippet;
	    		var date = results[i].docs.pub_date;

	    		var story = $("<div>").addClass("story");
	    		story.attr("id", "article-num-" + articleCounter);
	    		$("#article-display").append(story);

	    		story.append(link).append(headline).append(snippet).append(date);

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

		// if (number > 0) {
		// 	nytURL = nytURL + "&qf=" + number;
		// }
		// console.log("num " + nytURL);

		// if (startYear > 0) {
		// 	nytURL = nytURL + "&begin_date=" + startYear + "0101";
		// }
		// console.log("strt " + nytURL);

		// if (endYear > 0) {
		// 	nytURL = nytURL + "&end_date=" + endYear + "1231";
		// }
		// console.log("end " + nytURL);

		getResults(number, nytURL);

	});


});