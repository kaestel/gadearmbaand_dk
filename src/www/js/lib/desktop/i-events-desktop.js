Util.Objects["events"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this))
		}
		
		scene.init_tags = function() {
			
			this._tag = u.qs(".tag_list");
			this._tagsAll = u.ie(this._tag, "li", {"class":"all selected","html":"All"});
			this._tags = u.qsa("li", this._tag);

			this.selected_tags = [];

			var i, node;
			for(i = 0; node = this._tags[i]; i++) {


				node.clicked = function() {

					// close li before filtering
					for(i = 0; node = scene.items[i]; i++) {
						if(u.hc(node, "selected")) {
							u.a.transition(node, "all 0.3s ease-out");
							u.rc(node, "selected");
							u.as(node, "height", "41px");
						}
					}
					// we clicked on ALL 
					if(u.hc(this, "all")) {
						
						var i, node;
						for(i = 0; node = scene._tags[i]; i++) {

							u.rc(node, "selected");
							
						}

						u.ac(scene._tagsAll, "selected")
						scene.selected_tags = [];

					} 
					// node is already selected
					else if(u.hc(this, "selected")){

						u.rc(this, "selected");
						scene.selected_tags.splice(scene.selected_tags.indexOf(this.innerHTML), 1);

						if(scene.selected_tags.length == 0) { // no more node selected? highlight ALL again
							u.ac(scene._tagsAll, "selected");	
						}

					} 
					// click on unselected node
					else {
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
			for(i = 0; node = this.items[i]; i++) { // looping the list itmes (li)
				
				var has_tags = true

				// the arrey is empty
				if(selected_tags.length == 0) {

					node.transitioned = function() {
						u.a.transition(this, "none");
					}

					u.a.transition(node, "all 0.3s ease-out");
					u.as(node, "display", "block");
					u.as(node, "height", "41px");

				} 

				// we have a tag selected
				else {

					for(k = 0; list_tag = selected_tags[k]; k++) { // loop the selected tags

						if(node.node_tags_array.indexOf(list_tag) == -1) { // check if node doesn't has tag

							has_tags = false;

							node.transitioned = function() {
								u.as(this, "display", "none");
							}

							u.a.transition(node, "all 0.3s ease-out");
							u.as(node, "height", "0px");

							break;
						}
					}
					
					if(has_tags) {

						node.transitioned = function() {
							u.a.transition(this, "none");
						}

						u.a.transition(node, "all 0.3s ease-out");
						u.as(node, "display", "block");
						u.as(node, "height", "41px");
					}
				}
			}
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			scene.items = u.qsa(".item");
			scene.item_tags = u.qsa("ul.tags li");
			

			// filtering of tags
			scene.init_tags();

			// opne close navigation on click
			var i, node;
			for(i = 0; node = scene.items[i]; i++) {

				node.tag_values = u.qsa("ul.tags li", node);
				node.node_tags_array = [];

				var j, node_tag;
				for(j = 0; node_tag = node.tag_values[j]; j++) {
					node.node_tags_array.push(node_tag.innerHTML);
				}

				node._height = node.offsetHeight;

				node.clicked = function() {

					if(u.hc(this, "selected")) {
						u.a.transition(this, "all 0.3s ease-out");
						u.rc(this, "selected");
						u.as(this, "height", "41px");

					} else {
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


			this.is_ready = true;
			page.cN.ready();

		}




		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
//				u.bug("scene.build:" + u.nodeId(this));

				this.is_built = true;


				u.a.transition(this, "all 1s linear");
				u.a.setOpacity(this, 1);

			}
		}


		// destroy scene - scene needs to be removed
		scene.destroy = function() {
//			u.bug("scene.destroy:" + u.nodeId(this))

			// destruction is a one time, oneway street
			this.destroy = null;


			// when destruction is done, remove scene from content and notify content.ready
			// to continue building the new scene
			this.finalizeDestruction = function() {

				this.parentNode.removeChild(this);
				page.cN.ready();

			}

			this.transitioned = function() {

				// destruction is done
				this.finalizeDestruction();
			}

			// make up some page destruction
			u.a.transition(this, "all 1s linear");
			u.a.setOpacity(this, 0);

		}


		// scene is ready
		scene.ready();
	}
}
