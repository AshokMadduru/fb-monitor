var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
// Import the page-mod API
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

var eventName = "";
// create a page mod
pageMod.PageMod({
	include:"https://www.facebook*",
	contentScriptFile:self.data.url("content.js"),
	onAttach: function(worker) {
    worker.port.on("mouse-down", function(message) {
			console.log(message);
			 if(message[2] == "uiTextareaAutogrow input autofocus mentionsTextarea textInput"){
				console.log("In update Status");
				eventName = "In update Status";
			} else if(message[2] == "_42ft _4jy0 _11b _4jy3 _4jy1 selected _51sy" ) {
				console.log("status updated");
				eventName = "status updated";
			} else if(message[2].search("PageLikedButton") == -1 && message[2].search("PageLikeButton") != -1) {
				console.log("facebook page liked");
				eventName = "facebook page liked";
			} else if(message[2] == "_2dpb") {
				console.log("facebook own profile page opened");
				eventName = "facebook own profile page opened";
			} else if(message[2].search("FriendRequestAdd") != -1 ){
				console.log("Friend request sent");
				eventName = "Friend request sent"
			} else if(message[2] == "_586i") {
				console.log("clicked on top search box !!!");
				eventName = "clicked on top search box"
			} else if(message[2] == "_42ft _4jy0 _4jy3 _4jy1 selected _51sy") {
				console.log("friend request accepted");
				eventName = "friend request accepted"
			} else if(message[2] == "_42ft _4jy0 _4jy3 _517h _51sy") {
				console.log("Deleted friend request");
				eventName = "Deleted friend request";
			} else if(message[2] == "_1ayn") {
				console.log("Clicked on HOME button");
				eventName = "Clicked on HOME button";
			} else if(message[2] == "_42ft _4jy0 layerConfirm _2ok uiOverlayButton _4jy4 _4jy1 selected _51sy") {
				console.log("Message sent!");
				eventName = "Message sent!"
			} else if(message[2] == "uiLinkButton navSubmenu") {
				console.log("Log out!");
				eventName = "Log out"
			} else if(message[2].search("UFIAddCommentInput") != -1 || message[2] == "_209g _2vxa") {
				console.log("Commented");
				eventName = "Commented"
			} else if(message[2] == "_42ft _4jy0 layerConfirm uiOverlayButton _4jy3 _4jy1 selected _51sy") {
				console.log("Shared");
				eventName = "Shared";
			} 
			//syncFbInfo("01/04/2015 10:48:00", eventName);
		});
  }
});

function syncFbInfo(TS, eName){
	var {Cc, Ci} = require('chrome');
	var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
	var url = "https://autocode.pythonanywhere.com/BrowserMonitoring/fb/getfbInfo";
	console.log("before parameters");
	var params = "eventTime="+TS+"&eventName="+eName;
  http.open("POST", url, true);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Connection", "close");
  http.onreadystatechange = function() {
		//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      console.log("Send Data to server: "+http.status+"| "+http.responseText);
    }
  }
  http.send(params);
}

function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        month = month < 10 ? "0" + month : month
         day = day < 10 ? "0" + day : day
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        
        hour = hour < 10 ? "0" + hour : hour
        //hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        second = second < 10 ? "0" + second : second
        morning = hour < 12 ? "am" : "pm";

    return  day+ "/" + month + "/" + year + " " + hour + ":" +
            minuteFormatted + ":" +second;
}