Util.Objects["front"] = new function() {
	this.init = function(scene) {

		u.bug("init front")

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
			u.bug("scene.ready:" + u.nodeId(this));



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
							//node._image_src = "/images/" + node.image_id + "/image/x" + node.offsetWidth + "." + node.format;
							//http://gadearmbaand.local/images/6/image/x200.jpg
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
					u.as(li, "height", li.offsetWidth+"px");

					link.clicked = function(event) {
						u.e.kill();
						//
						console.log("TODO: ajax load this page");
					}
					u.ce(link);


				}

				// handle article page
				// if (u.hc(li, "blank")) {
				// 	u.as(li, "height", li.offsetWidth+"px");
				// };
			}


			u.textscaler(this, {
				"min_height":400,
				"max_height":1000,
				"min_width":600,
				"max_width":1300,
				"unit":"rem",
				"h1":{
					"min_size":4,
					"max_size":8
				},
				"h2":{
					"min_size":2,
					"max_size":4
				},
				"h3":{
					"min_size":1.4,
					"max_size":2.8
				},
				"p":{
					"min_size":1,
					"max_size":2
				},
				"p span.s2":{
					"min_size":1.4,
					"max_size":2.8
				}
			});


			this.is_ready = true;
			page.cN.ready();


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



		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
//				u.bug("scene.build:" + u.nodeId(this));

				this.is_built = true;

			}
		}


		// destroy scene - scene needs to be removed
		scene.destroy = function() {
//			u.bug("scene.destroy:" + u.nodeId(this))

			// destruction is a one time, oneway street
			this.destroy = null;

		}



		// ready to start page builing process
		scene.ready();
	}
}
