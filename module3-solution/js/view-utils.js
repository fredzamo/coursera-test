function ViewUtils() {

	var title;
	var content = "";
	var start;
	var end;

	this.addTitleDiv = function(titleContent) {
		title = titleContent;
		return this;
	}

	this.startRowDiv = function() {
		start = "<div class='row'>";
		return this;
	}

	this.endRowDiv = function() {
		end = "<div class='row'>";
		return this;
	}

	this.addContent = function(cnt) {
	  content += cnt;
	  return this;
	}

	this.build = function() {
		if (title != undefined) {
			return (title + start + content + end);
		}

		return (start + content + end);
	}
};