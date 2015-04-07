// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.

// get mouse-down events
document.onmousedown = function(data){
	console.log(data.target.className);
	if(data.target.className == "_42ft _4jy0 _11b _4jy3 _4jy1 selected _51sy")
		self.port.emit("mouse","Status posted");
	else if(data.target.className == "_42ft _4jy0 layerConfirm uiOverlayButton _4jy3 _4jy1 selected _51sy") self.port.emit("mouse","Shared");
	else if(data.target.parentNode.className == "UFILikeLink") self.port.emit("mouse","Liked");
}

