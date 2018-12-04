$(function () { // Same as document.addEventListener("DOMContentLoaded"...

	console.log($("#brand").text());

	onScroll();

	showLoading("#main-content");

	initMainContent();
});

function initMainContent() {

	var titleSnippertHtml = "snippets/title-snippet.html";
  	var sectionSnippertHtml = "snippets/section-snippet.html";
  	var sectionsJson = "data/sections.json";

  	$ajaxUtils.sendGetRequest(titleSnippertHtml, function (titlehtml) {

		$ajaxUtils.sendGetRequest(sectionsJson, function(obj) {
			var sections = obj.sections;

			$ajaxUtils.sendGetRequest(sectionSnippertHtml, function(sectionhtml) {

				var titleContent = $stringUtils.insertProperty(titlehtml, "title", "Menu");

				var view = new ViewUtils();
				view.addTitleDiv(titleContent);
				view.startRowDiv();

				for (var i = 0; i < sections.length; i++) {
					console.log(sections[i]);

					var sec = sections[i];
					var replaced = $stringUtils.insertProperty(sectionhtml, "id", sec.id);
					replaced = $stringUtils.insertProperty(replaced, "text", sec.paragraph);

					view.addContent(replaced);
				}		

				view.endRowDiv();	
				insertHtml("#main-content", view.build());
	  		}, false);
	  	}, true);

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

