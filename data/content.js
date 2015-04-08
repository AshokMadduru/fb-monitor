// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.

// get mouse-down events
var prev = " ";
document.onmousedown = function(data){
	console.log(data.target.className);
	if(data.target.className == "_42ft _4jy0 _11b _4jy3 _4jy1 selected _51sy"){
		self.port.emit("mouse","Status posted");
		prev = " ";
	}else if(data.target.className == "_4jy0 _4jy3 _4jy1 _51sy selected _42ft") {
		self.port.emit("mouse","Shared");
		prev = " ";
	}else if(data.target.parentNode.className == "UFILikeLink"){
		self.port.emit("mouse","Liked");
		prev = " ";
	}else if(data.target.className == "_209g _2vxa"){
		self.port.emit("mouse", "clicked on comment");
		prev  = "comment";
	}else if(data.target.parentNode.className == "comment_link"){
		prev = "comment";
	}/* else if(data.target.className = "share_action_link"){
		prev  = "share";
	} */
}

document.onkeydown = function(data){
	console.log(data.key);
	if(data.key == "Enter"){
		console.log("clicked on enter");
		if(prev == "comment"){
			console.log("commented");
		}
		prev  = " ";
	}
}

