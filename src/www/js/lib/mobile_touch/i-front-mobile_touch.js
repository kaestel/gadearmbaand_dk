Util.Objects["front"] = new function() {
	this.init = function(scene) {

		// global resize handler
		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			var block_height = Math.ceil(this.offsetWidth/5);

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


			this.h1 = u.qs("h1", this);


			//this.ul = u.qs(".grid");
			this.lis = u.qsa("ul.grid > li", this);
			var i, li;

			for (i = 0; li = this.lis[i]; i++) {

//				u.a.scale(li, 15);

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
						node.li = li;
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

					li.card = u.qs(".card", li);
					li.link = u.qs(".card a", li);

					if(!li.link.target) {
						u.ce(li, {"type":"link"});
					}

				}


				// handle ambassador
				if(u.hc(li, "ambassador")) {
					//u.as(li, "height", li.offsetWidth+"px");

					li.li_article = u.qs("li.article", li);

					li.li_article.card = u.qs(".card", li.li_article);

					li.li_article.link = u.qs(".card a", li.li_article);

					if(!li.li_article.link.target) {
						u.ce(li.li_article, {"type":"link"});
					}


					// video
					li.li_video = u.qs("li.video", li);
					li.video = u.qs("div.video", li.li_video);
					li.image = u.qs("div.image", li.li_video);

					li.li_video.li = li;
					li.video.li = li;
					li.image.li = li;



					li.video_id = u.cv(li.video, "video_id");
					li.video_format = u.cv(li.video, "video_format");

					li.image_id = u.cv(li.image, "image_id");
					li.image_format = u.cv(li.image, "image_format");


					if(li.image_id && li.image_format) {
						li.image.loaded = function(queue) {
							u.ae(this, "img", {"src": queue[0].image.src});
						}

						li._image_src = "/images/" + li.image_id + "/image/720x." + li.image_format;
						u.preloader(li.image, [li._image_src])
					}


					if(li.video_id && li.video_format) {

						li._video_url = "/videos/" + li.video_id + "/video/720x." + li.video_format;
						li.bn_play = u.ae(li.image, "div", {"class": "play"});

						u.e.click(li.image);
						li.image.clicked = function(event) {

							//u.as(this.play_bn, "display", "none");
							page.videoPlayer.ended = function(event) {

							}
							
//							this.li.video.ended;

							u.as(this.li.video, "zIndex", 3);
							u.ae(this.li.video, page.videoPlayer);
							page.videoPlayer.current_node = this.li;
							page.videoPlayer.loadAndPlay(this.li._video_url, {"playpause":true});

						}

					}
				}

			}

			// resize grid
			this.resized();


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

			u.a.transition(this.h1, "all 1s ease-out");
			u.a.setOpacity(this.h1, 0);

			var i, li, j = 0;

			for(i = 0; li = this.lis[i]; i++) {
				var li_y = u.absY(li);
				if((li_y > page.scroll_y && li_y < page.scroll_y + page.browser_h) || li_y+li.offsetHeight > page.scroll_y && li_y+li.offsetHeight < page.scroll_y + page.browser_h) {
					u.bug("move:" + u.nodeId(li))
					u.as(li, "zIndex", 100-j);
					u.a.transition(li, "all 0.3s ease-in "+(150*j++)+"ms");
					u.a.origin(li, li.offsetWidth/2, li.offsetWidth/2);
					u.a.scaleRotateTranslate(li, 0.5, 15, 0, 2000);
					u.a.setOpacity(li, 0);
				}
			}

			u.t.setTimer(this, this.finalizeDestruction, (100*j)+500);

		}



		// ready to start page builing process
		scene.ready();
	}
}
