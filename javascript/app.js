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
	    }).done(function(apiData) {
	    	
	    	for (var i = 0; i < numArticles; i++) {

	    		articleCounter++;

	    		var story = $("<div>").addClass("story container");
	    		story.attr("id", "article-num-" + articleCounter);
	    		$("#article-display").append(story);

				if (apiData.response.docs[i].headline !== "null") {
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

				if (apiData.response.docs[i].snippet !== "null") {
					$("#article-num-" + articleCounter)
						.append("<h5>" + apiData.response.docs[i].snippet + "</h5>");
				}

				if (apiData.response.docs[i].pub_date !== "null") {
					$("#article-num-" + articleCounter)
						.append("<h5>" + apiData.response.docs[i].pub_date + "</h5>");
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