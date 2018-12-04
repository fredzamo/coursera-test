$(function () { // Same as document.addEventListener("DOMContentLoaded"...

	console.log($("#brand").text());

	onScroll();

	showLoading("#main-content");

	initMainContent();
});

function initMainContent() {

	var titleSnippertHtml = "snippets/title-snippet.html";
  	var sectionSnippertHtml = "snippets/section-snippet.html";
  	var listItemSnippertHtml = "snippets/listItem-snippet.html";
  	var sectionsJson = "data/sections.json";

	$ajaxUtils.sendGetRequest(listItemSnippertHtml, function (itemhtml) {
		$ajaxUtils.sendGetRequest(titleSnippertHtml, function (titlehtml) {
			$ajaxUtils.sendGetRequest(sectionsJson, function(obj) {
				var sections = obj.sections;

				$ajaxUtils.sendGetRequest(sectionSnippertHtml, function(sectionhtml) {

					var titleContent = $stringUtils.insertProperty(titlehtml, "title", "Menu");

					var viewRow = new ViewUtils();
					var viewItem = new ViewUtils();
					viewRow.addTitleDiv(titleContent);
					viewRow.startRowDiv();

					for (var i = 0; i < sections.length; i++) {
						console.log(sections[i]);

						var sec = sections[i];

						var itemsHtml = $stringUtils.insertProperty(itemhtml, "id", sec.id);

						var sectionsHtml = $stringUtils.insertProperty(sectionhtml, "id", sec.id);
						sectionsHtml = $stringUtils.insertProperty(sectionsHtml, "text", sec.paragraph);

						sectionsHtml = $stringUtils.insertProperty(sectionsHtml, "md-size", 4);
						sectionsHtml = $stringUtils.insertProperty(sectionsHtml, "xs-size", 12);
						
						// sm-size is set based on number of sections
						if (i != 0 && (sections.length % 2) != 0 && (i % 2) === 0) {
							sectionsHtml = $stringUtils.insertProperty(sectionsHtml, "sm-size", 12);
						} else {
							sectionsHtml = $stringUtils.insertProperty(sectionsHtml, "sm-size", 6);
						}

						viewRow.addContent(sectionsHtml);
						viewItem.addContent(itemsHtml);
					}		

					viewRow.endRowDiv();	
					insertHtml("#main-content", viewRow.build());

					insertHtml("#nav-list", viewItem.build());
		  		}, false);
		  	}, true);

	  	}, false);
	}, false);

}

// insert html content in specific selector
function insertHtml(selector, html) {
	var targetElem = document.querySelector(selector);
  	targetElem.innerHTML = html;
}

// Show loading icon inside element identified by 'selector'.
function showLoading(selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
}

function onBlur() {
	// Same as document.querySelector(".navbar-toggle").addEventListener("blur",...
	$(".navbar-toggle").blur(function (event) {
    	var screenWidth = window.innerWidth;
    	if (screenWidth < 768) {
    		$("#collapsable-nav").collapse('hide');
  		}
  	});
}

function onScroll() {
	window.onscroll = function() {
		if (window.innerWidth < 768 && (document.body.scrollTop > 350 
			|| document.documentElement.scrollTop > 350)) {
        	$("#collapsable-nav").collapse('hide');
    	}
	};
}

