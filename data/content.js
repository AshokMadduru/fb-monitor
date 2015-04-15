// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.

// get mouse-down events
var prev = " ";
var comment_id = " ";
var comment_text_id = " ";
var post = " ";
document.onmousedown = function(data){
	//console.log(data.target.className);
	if(data.target.className == "_42ft _4jy0 _11b _4jy3 _4jy1 selected _51sy"){
		//self.port.emit("mouse","Status posted");
		prev = " ";
		var status = document.getElementsByClassName("uiTextareaAutogrow input autofocus mentionsTextarea textInput")[0].value;
		self.port.emit("data",["Status Updated"," ",status]);
	}else if(data.target.className == "_4jy0 _4jy3 _4jy1 _51sy selected _42ft" || data.target.className == "_42ft _4jy0 layerConfirm uiOverlayButton _4jy3 _4jy1 selected _51sy") {
		//self.port.emit("mouse","Shared");
		prev = " ";
		self.port.emit("data",["Shared"," "," "]);
	}else if(data.target.parentNode.className == "UFILikeLink"){
		//self.port.emit("mouse","Liked");
		var parent = data.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;
		//console.log("parent ClassName: "+parent);
		var parent_id = data.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		//console.log("parent id: "+parent_id);
		var children = document.getElementById(parent_id).childNodes;
		//console.log("children length: "+children.length);
		for( var k =0;k<children.length;k++){
			var child = document.getElementById(parent_id).childNodes[k].childNodes;
			for( var i = 0; i<child.length;i++){
				if(document.getElementById(parent_id).childNodes[k].childNodes[i].className == "clearfix _5x46"){
				var chil = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes;
				//console.log("len of chil: "+chil.length);
				for( var j =0;j<chil.length;j++){
					var name = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].className;
					//console.log("name:"+name);
					if(name == "_3dp _29k"){
						var decision = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].className;
						//console.log("decision : "+decision);
						if(decision == "fwb fcg"){
							var sub = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML;
							//console.log("poster: "+document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML);
							self.port.emit("data",["Liked",sub,"Liked "+sub+"'s Post"]);
						}else{
							var post = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML;
							//console.log("poster: "+post);
							var sub = document.getElementById(parent_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML;
							self.port.emit("data",["Liked",post,"Liked "+post+"'s Post"]);
						}
					}
				}
			}
		} 
		}
		
		prev = " ";
	}else if(data.target.className == "_209g _2vxa"){
		//self.port.emit("mouse", "clicked on comment");
		prev  = "comment";
		comment_id= data.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		comment_text_id = data.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		//console.log(comment_id);
		//console.log(comment_text_id);
	}else if(data.target.parentNode.className == "comment_link"){
		prev = "comment";
		comment_id = data.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		comment_text_id = document.getElementById(data.target.parentNode.parentNode.parentNode.parentNode.parentNode.id).lastChild.id;
		//console.log(comment_id);
		//console.log(comment_text_id);
	}/* else if(data.target.className = "share_action_link"){
		prev  = "share";
	} */
}

document.onkeydown = function(data){
	//console.log(data.key);
	if(data.key == "Enter"){
		//console.log("clicked on enter");
		if(prev == "comment"){
			//console.log("commented");
			//console.log(document..className);
			var children = document.getElementById(comment_id).childNodes;
			//console.log("children length: "+children.length);
			for( var k =0;k<children.length;k++){
				var child = document.getElementById(comment_id).childNodes[k].childNodes;
				for( var i = 0; i<child.length;i++){
					if(document.getElementById(comment_id).childNodes[k].childNodes[i].className == "clearfix _5x46"){
					var chil = document.getElementById(comment_id).childNodes[k].childNodes[i].childNodes;
					//console.log("len of chil: "+chil.length);
					for( var j =0;j<chil.length;j++){
						var name = document.getElementById(comment_id).childNodes[k].childNodes[i].childNodes[j].className;
						//console.log("name:"+name);
						if(name == "_3dp _29k"){
							var decision = document.getElementById(comment_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].className;
							//console.log("decision : "+decision);
							if(decision == "fwb fcg"){
								post = document.getElementById(comment_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML;
							}else{
								post = document.getElementById(comment_id).childNodes[k].childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML;
								//console.log("poster: "+post);
							}
						}
					}
					}
				}		 
			}
			
			var start = document.getElementById(comment_text_id).childNodes[0].childNodes;
			var chil_length = start.length;
			//console.log("chil_length: "+chil_length);
			var comment = document.getElementById(comment_text_id).childNodes[0].childNodes[chil_length-2].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML;
			//console.log(comment);
			self.port.emit("data",["Comment","Commented on "+post+"'s post.",comment]);
		}
		prev  = " ";
	}
}

