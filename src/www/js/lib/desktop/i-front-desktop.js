Util.Objects["front"] = new function() {
	this.init = function(scene) {

		// global resize handler
		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			var block_height = Math.ceil(this.offsetWidth/5);


			var i, li;
			for (i = 0; li = this.lis[i]; i++) {

				// handle article and instagram items
				if(u.hc(li, "article|instagram")) {
					if(li._forty) {
						u.as(li, "height", (block_height*2)+"px", false);
					}
					else {
						u.as(li, "height", block_height+"px", false);
					}
				}

				// handle tweet items
				if(u.hc(li, "tweet")) {
					u.as(li, "height", block_height+"px", false);
				}


				// handle ambassador
				if(u.hc(li, "ambassador")) {
					// video height
					u.as(li.video, "height", (block_height*2)+"px", false);
					// article height
					u.as(li.article, "height", (block_height*2)+"px", false);
				}


				// handle margins
				if(u.hc(li, "push_up|push_up_half")) {
					u.as(li, "marginTop", -(block_height)+"px", false);
				}
				if(u.hc(li, "push_down")) {
					u.as(li, "marginTop", block_height+"px", false);
				}
			}


			// adjust grid padding
			var factor = (this.offsetWidth - 600) / 600;
			var padding = (10 + (factor * 30))+"px "+(10 + (factor * 20))+"px";
			this.article_rule.style.setProperty("padding", padding, "important");
			this.tweet_rule.style.setProperty("padding", padding, "important");


		}

		// global scroll handler
		scene.scrolled = function() {
			u.bug("page.scrolled:" + u.nodeId(this))

		}

		// Page is ready
		scene.ready = function() {
			u.bug("scene.ready:" + u.nodeId(this));


			// create padding rule for grid
			this.style_tag = document.createElement("style");
			this.style_tag.setAttribute("media", "all")
			this.style_tag.setAttribute("type", "text/css")
			this.style_tag = u.ae(document.head, this.style_tag);

			this.style_tag.sheet.insertRule("#content .scene.front li.article {}", 0);
			this.article_rule = this.style_tag.sheet.cssRules[0];

			this.style_tag.sheet.insertRule("#content .scene.front li.tweet {}", 0);
			this.tweet_rule = this.style_tag.sheet.cssRules[0];


			//this.ul = u.qs(".grid");
			this.lis = u.qsa("li", this);
			var i, li;

			for (i = 0; li = this.lis[i]; i++) {

				// pre-index
				if(u.hc(li, "forty")) {
					li._forty = true;
				}
				else if(u.hc(li, "sixty")) {
					li._sixty = true;
				}
				else {
					li._twenty = true;
				}


				// handle instagram images
				if(u.hc(li, "instagram")) {

					// img
					var node = u.qs("div.image", li);
					if(node) {
						node.image_id = u.cv(node, "image_id");
						node.format = u.cv(node, "format");

						if(node.image_id && node.format) {
							node.loaded = function(queue) {
								u.ae(this, "img", {"src": queue[0].image.src});
							}
							node._image_src = "/images/" + node.image_id + "/image/400x." + node.format;
							u.preloader(node, [node._image_src])
						}
					}
				}

				// handle tweet
				if(u.hc(li, "tweet")) {}

				// handle article page
				if(u.hc(li, "article")) {

					var link = u.qs("a", li);
					u.ce(link, {"type":"link"});

				}


				// handle ambassador
				if(u.hc(li, "ambassador")) {
					//u.as(li, "height", li.offsetWidth+"px");

					// article
					li.article = u.qs("li.article", li);

					// video
					li.video = u.qs("li.video", li);

					li.video.video_id = u.cv(node, "video_id");
					li.video.video_format = u.cv(node, "video_format");

					li.video.image_id = u.cv(node, "image_id");
					li.video.image_format = u.cv(node, "image_format");

					if(li.video.image_id && li.video.image_format) {
						node.loaded = function(queue) {
							u.ae(this, "img", {"src": queue[0].image.src});
						}
						node._image_src = "/images/" + node.image_id + "/image/400x." + node.format;
						u.preloader(node, [node._image_src])
					}


					if(li.video.video_id && li.video.format) {

						li.video._video_url = "/videos/" + li.video.video_id + "/video/510x." + li.video._video_format;

						// inject video_wrapper
						//this.item.video_wrapper = u.ae(node, "div", {"class":"video_wrapper"});

						li.video.play_bn = u.ae(this.item._image, "div", {"class": "play"});
						//this.item.play_bn.url = this.item._video_url;

						u.e.click(this.item);
						this.item.clicked = function(event) {

							//u.as(this.play_bn, "display", "none");
							page.videoPlayer.ended = function(event) {
								//console.log("video player is done playing. LOOOP!");
								page.videoPlayer.play();
							}

							this.player = u.ae(this._image, page.videoPlayer);
							this.player = page.videoPlayer.loadAndPlay(this._video_url, {"playpause":true});
						}

					}

				};

			}

			// resize grid
			this.resized();


			u.textscaler(this, {
				"min_width":800,
				"max_width":1400,
				"unit":"px",
				".twenty h2":{
					"min_size":16,
					"max_size":24
				},
				".forty h2":{
					"min_size":24,
					"max_size":48
				},
				".tweet p":{
					"min_size":14,
					"max_size":26
				}
			});


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

				// remove style tag
				this.style_tag.parentNode.removeChild(this.style_tag);


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



		// ready to start page builing process
		scene.ready();
	}
}
