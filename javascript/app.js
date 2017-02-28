$(document).ready(function() {

	var searchTerm = "";
	var number = 0;
	var startYear = 0;
	var endYear = 0;

	var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	function getResults (url, amount) {

		$.ajax({
	    url: url,
	    method: "GET"
	    }).done(function(response) {

	    	var results = response.data;

	    	for (var i = 0; i < results.length; i++) {
	    		results[i]



	    	}

	    }

	}


	$("#searchBtn").on("click", function(event){

		searchTerm = $("#searchTerm").val().trim();
		number = $("#number").val().trim();

		var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + "?" + apiKey;

		


	});


});