var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
// Import the page-mod API
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
// store ids, classnames and tagnames etc
var unique_data = require("sdk/simple-storage");
if(!unique_data.storage.classnames){
	unique_data.storage.classnames = {status:"uiTextareaAutogrow input autofocus mentionsTextarea textInput",
	comment:"_209g _2vxa",
	find_friends:"_586i",
	chat_search:"inputtext inputsearch textInput",
	chat:"fbNubButton",
	add_photo:"_n _5f0v"
	};
}
if(!unique_data.storage.ids){
	unique_data.storage.ids = { email : "email",
		password:"pass"
		};
}
// create a page mod
pageMod.PageMod({
	include:"https://www.facebook*",
	contentScriptFile:self.data.url("content.js"),
	onAttach: function(worker) {
    worker.port.on("mouse", function(message) {
			console.log(message);
			//sendToServer(formatDate(new Date()),message);
		});
  }
});
function sendToServer(dateTime,action){
	var {Cc, Ci} = require('chrome');
	var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
	var url = "https://autocode.pythonanywhere.com/BrowserMonitoring/fb/getfbInfo";
	var params = "name=ASHOK"+"&dateTime="+dateTime+"&action="+action;
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
