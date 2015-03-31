var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
// Import the page-mod API
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
// create a page mod
pageMod.PageMod({
	include:"https://www.facebook*",
	contentScriptFile:self.data.url("content.js"),
	onAttach: function(worker) {
    worker.port.on("mouse-down", function(message) {
			console.log(message);
			 if(message == "uiTextareaAutogrow input autofocus mentionsTextarea textInput"){
				console.log("In update Status");
			} 
		});
  }
});