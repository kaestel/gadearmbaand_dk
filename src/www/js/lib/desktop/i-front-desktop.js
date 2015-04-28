Util.Objects["front"] = new function() {
	this.init = function(scene) {

		// global resize handler
		scene.resized = function() {
			u.bug("page.resized:" + u.nodeId(this));

			var i, li;
			for (i = 0; li = this.lis[i]; i++) {
				// handle article page
				if (u.hc(li, "article")) {
					u.as(li, "height", li.offsetWidth+2+"px");
				}

				// handle instagram
				if (u.hc(li, "instagram")) {
					u.as(li, "height", li.offsetWidth+2+"px");
				}

				// handle tweet
				if (u.hc(li, "tweet")) {
					u.as(li, "height", li.offsetWidth/2+2+"px");
				}

				// handle ambassador
				if (u.hc(li, "ambassador")) {

					// video height
					var video = u.qs("li.video");
					u.as(video, "height", video.offsetWidth/3*2+2+"px");

					// article height
					var article = u.qs("li.article");
					u.as(article, "height", article.offsetWidth/3*2+2+"px");
					//console.log("video width: " + video.offsetWidth);
				}

				// handle margins
				if (u.hc(li, "push_up")) {
					u.as(li, "marginTop", -li.offsetWidth-1+"px");
				}
				if (u.hc(li, "push_up_half")) {
					u.as(li, "marginTop", -li.offsetWidth/2-1+"px");
				}
				if (u.hc(li, "push_down")) {
					u.as(li, "marginTop", li.offsetWidth+1+"px");
				}
			}



		}

		// global scroll handler
		scene.scrolled = function() {
			u.bug("page.scrolled:" + u.nodeId(this))

		}

		// Page is ready
		scene.ready = function() {
			u.bug("scene.ready:" + u.nodeId(this));



			//this.ul = u.qs(".grid");
			this.lis = u.qsa("li", this);
			var i, li;

			for (i = 0; li = this.lis[i]; i++) {

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
								console.log(queue[0].image);
								u.ae(this, "img", {"src": queue[0].image.src});
							}
							//console.log("/img/temp/" + node.image_id + "." + node.format);
							node._image_src = "/images/" + node.image_id + "/image/400x." + node.format;
							//node._image_src = "/images/" + node.image_id + "/image/x" + node.offsetWidth + "." + node.format;
							//http://gadearmbaand.local/images/6/image/x200.jpg
							u.preloader(node, [node._image_src])
						}
					}
					// set height, so we can oversize image
					u.as(li, "height", li.offsetWidth+2+"px");
				}

				// handle tweet
				if (u.hc(li, "tweet")) {
					u.as(li, "height", li.offsetWidth/2+2+"px");
				}

				// handle article page
				if (u.hc(li, "article")) {
					var link = u.qs("a");
					u.as(li, "height", li.offsetWidth+2+"px");

					link.clicked = function(event) {
						u.e.kill();
						//
						console.log("TODO: ajax load this page");
					}
					u.ce(link);


				}


				// handle ambassador
				if (u.hc(li, "ambassador")) {
					//u.as(li, "height", li.offsetWidth+"px");

					// article
					var article = u.qs("li.article", li);
					u.as(article, "height", article.offsetWidth/3*2+2+"px");

					// video
					var video = u.qs("li.video", li);
					u.as(video, "height", video.offsetWidth/3*2+2+"px");

					video.video_id = u.cv(node, "video_id");
					video.format = u.cv(node, "format");

					if (video.video_id && video.format) {


						video._video_url = "/videos/" + video.video_id + "/video/510x." + video._video_format;

						// inject video_wrapper
						//this.item.video_wrapper = u.ae(node, "div", {"class":"video_wrapper"});

						video.play_bn = u.ae(this.item._image, "div", {"class": "play"});
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


				// handle article page
				// if (u.hc(li, "blank")) {
				// 	u.as(li, "height", li.offsetWidth+"px");
				// };

				// handle tweet
				if (u.hc(li, "push_up")) {
					u.as(li, "marginTop", -li.offsetWidth-1+"px");
				}
				if (u.hc(li, "push_up_half")) {
					u.as(li, "marginTop", -li.offsetWidth/2-1+"px");
				}
				if (u.hc(li, "push_down")) {
					u.as(li, "marginTop", li.offsetWidth+1+"px");
				}
			}


			u.textscaler(this, {
				// "min_height":400,
				// "max_height":1000,
				"min_width":800,
				"max_width":1400,
				"unit":"px",
				// "h1":{
				// 	"min_size":4,
				// 	"max_size":8
				// },
				".twenty h2":{
					"min_size":16,
					"max_size":24
				},
				".forty h2":{
					"min_size":28,
					"max_size":48
				},
				".tweet p":{
					"min_size":14,
					"max_size":26
				},
				// "h3":{
				// 	"min_size":1.4,
				// 	"max_size":2.8
				// },
				// "p span.s2":{
				// 	"min_size":1.4,
				// 	"max_size":2.8
				// }
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



		// ready to start page builing process
		scene.ready();
	}
}
