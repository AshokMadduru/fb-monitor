// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.

// get mouse-down events
document.onmousedown = function(data){
	self.port.emit("mouse-down", data.target.tagName+" "+data.target.id+" "+data.target.nodeType+" "+data.target.className);
}
