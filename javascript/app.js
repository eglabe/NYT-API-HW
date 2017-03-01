$(document).ready(function() {

	var searchTerm = "";
	var number = 0;
	var startYear = 0;
	var endYear = 0;

	var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";


	function getResults (url) {

		$.ajax({
	    url: url,
	    method: "GET"
	    }).done(function(response) {

	    	var results = response.data;
	    	
	    	for (var i = 0; i < results.length; i++) {
	    		results[i]
	    		var link = results[i].docs.web_url;
	    		var headline = results[i].docs.headline.main;
	    		var snippet = results[i].docs.snippet;
	    		var date = results[i].docs.pub_date;

	    		var story = $("<div>").addClass("story");

	    		story.append(link).append(headline).append(snippet).append(date);
	    		$("#results-display").append(story);

	    	}

	    });

	}


	$("#searchBtn").on("click", function(event){
		
		searchTerm = $("#searchTerm").val().trim();
		number = $("#number").val().trim();
		startYear = $("#startYear").val().trim();
		endYear = $("#endYear").val().trim();

		var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + "?=" + apiKey 
			+ "&q=" + searchTerm;
		console.log("term " + nytURL);

		if (number > 0) {
			nytURL = nytURL + "&qf=" + number;
		}
		console.log("num " + nytURL);

		if (startYear > 0) {
			nytURL = nytURL + "&begin_date=" + startYear + "0101";
		}
		console.log("strt " + nytURL);

		if (endYear > 0) {
			nytURL = nytURL + "&end_date=" + endYear + "1231";
		}
		console.log("end " + nytURL);

		return nytURL;

		getResults(nytURL);

	});


});