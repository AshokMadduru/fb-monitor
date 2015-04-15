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
    worker.port.on("data", function(message) {
			console.log(message[1]);
			sendToServer(formatDate(new Date()),message[0],message[1],message[2]);
		});
  }
});
function sendToServer(dateTime,action,sub,details){
	var {Cc, Ci} = require('chrome');
	var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
	var url = "https://autocode.pythonanywhere.com/BrowserMonitoring/fb/getfbInfo";
	var params = "name=ASHOK"+"&dateTime="+dateTime+"&action="+action+"&sub="+sub+"&Details="+details;
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
