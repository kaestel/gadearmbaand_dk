Util.Objects["events"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this))
		}

		scene.tags = function() {
			
			scene._tag = u.qs(".tag_list");
			scene._tagsAll = u.ie(scene._tag, "li", {"class":"all selected","html":"All"});

			scene._tags = u.qsa("li", scene._tag);

			scene.selected_tags = [];

			var i, node;
			for(i = 0; node = scene._tags[i]; i++) {

				node.clicked = function() {

					// close li before filtering
					for(i = 0; node = scene.items[i]; i++) {
						if(u.hc(node, "selected")) {
							u.a.transition(node, "all 0.3s ease-out");
							u.rc(node, "selected");
							u.as(node, "height", "41px");
						}
					}


					if(u.hc(this, "all")) {
						
						var i, node;
						for(i = 0; node = scene._tags[i]; i++) {
							if(node != this) {
								u.rc(node, "selected");
							} else {
								u.ac(node, "selected");
							}
							
						}

						scene.selected_tags = [];

					} else if(u.hc(this, "selected")){

						u.rc(this, "selected");
						
						scene.selected_tags.splice(scene.selected_tags.indexOf(this.innerHTML), 1);

						if(scene.selected_tags.length == 0) {
							u.ac(scene._tags[0], "selected");	
						}

					} else {
						u.rc(scene._tagsAll, "selected")
						u.ac(this, "selected");

						scene.selected_tags.push(this.innerHTML)
					}

					scene.filter(scene.selected_tags)
				}

				u.ce(node)
			}

		}

		scene.filter = function(selected_tags) {

			var i, node;
			for(i = 0; node = scene.items[i]; i++) { // looping the list itmes (li)
				node._tags = u.qsa("ul.tags li", node);

				var hasTag = 0;

				var j, node_tag;
				for(j = 0; node_tag = node._tags[j]; j++) { // looping the tags in li

					var k, list_tag;
					for(k = 0; list_tag = selected_tags[k]; k++) { // loop the selected tags

						if(node_tag.innerHTML == list_tag) {
							hasTag++;
						}
					}
				}
				
				if(hasTag == selected_tags.length) {
					
					node.transitioned = function() {
						
					}

					u.a.transition(node, "all 0.3s ease-out");
					u.as(node, "display", "block");
					u.as(node, "height", "41px");

				} else {
					node.transitioned = function() {
						u.as(this, "display", "none");
					}

					u.a.transition(node, "all 0.3s ease-out");
					u.as(node, "height", "0px");
				}

			}

		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			scene.items = u.qsa(".item");
			


			// filtering of tags
			scene.tags();

			// opne close navigation on click
			var i, node;
			for(i = 0; node = scene.items[i]; i++) {

				node._height = node.offsetHeight;
				
				node.clicked = function() {

					if(u.hc(this, "selected")) {
						u.a.transition(this, "all 0.3s ease-out");
						u.rc(this, "selected");
						u.as(this, "height", "41px");
					}else {
						u.a.transition(this, "all 0.5s ease-out");
						u.ac(this, "selected");
						u.as(this, "height", this._height + "px");
					}
					
					var i, node;
					for(i = 0; node = scene.items[i]; i++) {
						
						if(u.hc(node, "selected") && node != this) {
							
							u.a.transition(node, "all 0.3s ease-out");
							u.rc(node, "selected");
							u.as(node, "height", "41px");
						}
					}
				}

				u.ce(node)
				u.ass(node, {"height": "41px"})
			}

		}

		// scene is ready
		scene.ready();
	}
}
