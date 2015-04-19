u.bug_console_only = true;

Util.Objects["front"] = new function() {
	this.init = function(scene) {

		// global resize handler
		scene.resized = function() {
			u.bug("page.resized:" + u.nodeId(this));

		}

		// global scroll handler
		scene.scrolled = function() {
			u.bug("page.scrolled:" + u.nodeId(this))

			// // forward scroll event to current scene
			// if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
			// 	page.cN.scene.scrolled();
			// }
		}

		// Page is ready
		scene.ready = function() {
			//alert("front ready");
			// u.bug("page.ready:" + u.nodeId(this));
			var ul = u.qs("#grid");
			var lis = u.qsa("li", ul);
			var i, li;

			for (i = 0; li = lis[i]; i++) {

				// handle instagram images
				if (u.hc(li, "instagram")) {

					// img
					var node = u.qs("div.image", li);
					if (node) {
						node.image_id = u.cv(node, "image_id");
						node.format = u.cv(node, "format");

						if (node.image_id && node.format) {
							//console.log("we have all variables to load node");
							node.loaded = function(queue) {
								console.log(queue[0]._image);
								u.ae(this, "img", {"src": queue[0]._image.src});
							}
							//console.log("/img/temp/" + node.image_id + "." + node.format);
							node._image_src = "/img/temp/" + node.image_id + "." + node.format;
							u.preloader(node, [node._image_src])
						}
					}
				}

				// handle tweet
				if (u.hc(li, "tweet")) {

				}

				// handle article page
				if (u.hc(li, "article")) {
					var link = u.qs("a");
					link.clicked = function(event) {
						u.e.kill();
						//
						console.log("TODO: ajax load this page");
					}
					u.ce(link);


				}
			}

		}
		//
		// // add main instagram image
		// this.item._image.loaded = function(queue) {
		// 	//u.as(this, "backgroundImage", "url("+queue[0]._image.src+")");
		//
		// 	this.transitioned = function() {
		// 		u.a.transition(this, "none");
		//
		// 		// remove preloader bg
		// 		u.as(scene.item, "backgroundImage", "none");
		// 	}
		// 	u.ae(this, "img", {"src": queue[0]._image.src});
		// 	u.a.transition(this, "all 1s ease-out 0.1s");
		// 	u.a.setOpacity(this, 1);
		// }
		// u.preloader(this.item._image, ["/images/" + this.item._image_id + "/image/510x." + this.item._image_format]);


		// initialize header
		scene.initGrid = function() {
			// var frontpage_link = u.qs("li.front a", this.nN);
			// if(frontpage_link) {
			// 	var logo = u.ae(this.hN, "a", {"class":"logo", "href":frontpage_link.href, "html":frontpage_link.innerHTML});
			// 	u.ce(logo, {"type":"link"});
			// }
		}

		// ready to start page builing process
		scene.ready();
	}
}
