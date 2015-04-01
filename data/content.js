// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.

// get mouse-down events
document.onmousedown = function(data){
	var datas = [data.target.tagName, data.target.id, data.target.className,data.target.documentElement];
	self.port.emit("mouse-down", /* data.target.tagName+" "+ data.target.id 
	+" "+data.target.nodeType+" "+*/datas );
}
