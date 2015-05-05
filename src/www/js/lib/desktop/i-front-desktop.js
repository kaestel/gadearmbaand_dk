Util.Objects["front"] = new function() {
	this.init = function(scene) {

		// global resize handler
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			var block_height = Math.ceil(this.offsetWidth/5);

			var i, li;
			for (i = 0; li = this.lis[i]; i++) {

				if(li.is_ready) {

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
						u.as(li.li_video, "height", (block_height*2)+"px", false);
						// article height
						u.as(li.li_article, "height", (block_height*2)+"px", false);
					}


					// handle margins
					if(u.hc(li, "push_up|push_up_half")) {
						u.as(li, "marginTop", -(block_height)+"px", false);
					}
					if(u.hc(li, "push_down")) {
						u.as(li, "marginTop", block_height+"px", false);
					}

				}

			}


			// adjust grid padding
			var factor = (this.offsetWidth - 600) / 600;
			var padding = (10 + (factor * 30))+"px "+(10 + (factor * 20))+"px";

			var h2_40_padding = "0 0 " + (20 + (factor * 25))+"px";
			var h2_20_padding = "0 0 " + (10 + (factor * 12))+"px";

			this.article_rule.style.setProperty("padding", padding, "important");
			this.article_h2_40_rule.style.setProperty("padding", h2_40_padding, "important");
			this.article_h2_20_rule.style.setProperty("padding", h2_20_padding, "important");
			this.article_p_rule.style.setProperty("padding", h2_40_padding, "important");
			this.tweet_rule.style.setProperty("padding", padding, "important");


		}

		// global scroll handler
		scene.scrolled = function() {
//			u.bug("page.scrolled:" + u.nodeId(this))

			if(this.is_built) {
				var i, li;
				for (i = 0; li = this.lis[i]; i++) {

//					u.bug("check render:" + li.is_built)

					var li_y = u.absY(li);
					if(!li.is_built && ((li_y > page.scroll_y && li_y < page.scroll_y + (page.browser_h-100)) || li_y+li.offsetHeight > page.scroll_y && li_y+li.offsetHeight < page.scroll_y + (page.browser_h - 100))) {

//						u.bug("go render:" + li.is_built)
						this.renderNode(li);

					}
				}
			}
		}

		// scene ready-check
		scene.isReady = function() {
//			u.bug("is almost ready:" + this.is_almost_ready + "," + this.load_image_count + "=" + this.loaded_image_count)
			if(this.is_almost_ready && this.load_image_count == this.loaded_image_count) {
				this.is_ready = true;
				page.cN.ready();
			}
		}

		scene.ready = function() {
			u.bug("scene.ready:" + u.nodeId(this));


			// create padding rule for grid
			this.style_tag = document.createElement("style");
			this.style_tag.setAttribute("media", "all")
			this.style_tag.setAttribute("type", "text/css")
			this.style_tag = u.ae(document.head, this.style_tag);

			this.style_tag.sheet.insertRule("#content .scene.front li.article .card {}", 0);
			this.article_rule = this.style_tag.sheet.cssRules[0];

			this.style_tag.sheet.insertRule("#content .scene.front li.article.forty .card h2 {}", 0);
			this.article_h2_40_rule = this.style_tag.sheet.cssRules[0];

			this.style_tag.sheet.insertRule("#content .scene.front li.article.twenty .card h2 {}", 0);
			this.article_h2_20_rule = this.style_tag.sheet.cssRules[0];

			this.style_tag.sheet.insertRule("#content .scene.front li.article .card p {}", 0);
			this.article_p_rule = this.style_tag.sheet.cssRules[0];

			this.style_tag.sheet.insertRule("#content .scene.front li.tweet .card {}", 0);
			this.tweet_rule = this.style_tag.sheet.cssRules[0];


			this.h1 = u.qs("h1", this);


			//this.ul = u.qs(".grid");
			this.lis = u.qsa("ul.grid > li", this);

			this.load_image_count = 0;
			this.loaded_image_count = 0;

			var i, li;
			for (i = 0; li = this.lis[i]; i++) {

				li.scene = this;

				// pre-index for resizing
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
					li.image = u.qs("div.image", li);
					if(li.image) {


						u.as(li, "perspective", (li.offsetWidth) + "px");
						u.as(li.image, u.a.vendor("transform"), "rotateX(-180deg)");
						u.as(li.image, u.a.vendor("transformOrigin"), "50% 50% -"+(li.offsetWidth)+"px");


						li.image.li = li;
						li.image.image_id = u.cv(li.image, "image_id");
						li.image.format = u.cv(li.image, "format");

						if(li.image.image_id && li.image.format) {
							li.image.loaded = function(queue) {
								
								this.img = u.ae(this, "img", {"src": queue[0].image.src});
								this.li.scene.loaded_image_count++;
								this.li.scene.isReady();

							}
							li.image._image_src = "/images/" + li.image.image_id + "/image/400x." + li.image.format;
							this.load_image_count++;

							u.preloader(li.image, [li.image._image_src])
						}

					}
				}

				// handle tweet
				else if(u.hc(li, "tweet")) {

					li.cards = u.qsa(".card", li);

				}

				// handle article
				else if(u.hc(li, "article")) {

					li.card = u.qs(".card", li);
					li.link = u.qs(".card a", li);

					if(!li.link.target) {
						u.ce(li.link, {"type":"link"});
					}

					this._linkScrambler(li);
				}

				// handle ambassador
				else if(u.hc(li, "ambassador")) {
					//u.as(li, "height", li.offsetWidth+"px");

					// article
					li.li_article = u.qs("li.article", li);

					li.li_article.card = u.qs(".card", li.li_article);

					li.li_article.link = u.qs(".card a", li.li_article);
					li.li_article.link.li = li.li_article;

					if(!li.li_article.link.target) {
						u.ce(li.li_article.link, {"type":"link"});
					}

					this._linkScrambler(li.li_article);


					// video
					li.li_video = u.qs("li.video", li);
					li.video = u.qs("div.video", li.li_video);
					li.image = u.qs("div.image", li.li_video);

					li.li_video.li = li;
					li.video.li = li;
					li.image.li = li;


					u.as(li.li_video, "perspective", (li.li_video.offsetWidth) + "px");
					u.as(li.image, u.a.vendor("transform"), "rotateX(-180deg)");
					u.as(li.image, u.a.vendor("transformOrigin"), "50% 50% -"+(li.li_video.offsetWidth)+"px");

					// u.as(li.li_video, "perspective", (li.li_video.offsetWidth*2) + "px");
					// u.as(li.image, u.a.vendor("transform"), "rotateX(133deg) translateZ(-"+li.li_video.offsetWidth+"px)");
					u.as(li.video, u.a.vendor("transform"), "rotateX(-180deg)");


					li.video_id = u.cv(li.video, "video_id");
					li.video_format = u.cv(li.video, "video_format");

					li.image_id = u.cv(li.image, "image_id");
					li.image_format = u.cv(li.image, "image_format");


					if(li.image_id && li.image_format) {
						li.image.loaded = function(queue) {
							u.ae(this, "img", {"src": queue[0].image.src});
							this.li.scene.loaded_image_count++;
							this.li.scene.isReady();
						}

						li._image_src = "/images/" + li.image_id + "/image/720x." + li.image_format;
						u.preloader(li.image, [li._image_src])
						this.load_image_count++;
					}


					if(li.video_id && li.video_format) {

						li._video_url = "/videos/" + li.video_id + "/video/720x." + li.video_format;
						li.bn_play = u.ae(li.image, "div", {"class": "play"});

						u.e.click(li.image);
						li.image.clicked = function(event) {

							u.a.transition(this, "all 0.5s ease-in-out");
							u.as(this, u.a.vendor("transform"), "rotateX(180deg)");

							u.a.transition(this.li.video, "all 0.5s ease-in-out");
							u.as(this.li.video, u.a.vendor("transform"), "rotateX(0deg)");

							// reset video (if playback is started elsewhere)
							this.li.resetPlayer = function() {

								this.video.transitioned = function() {
									u.as(this, "zIndex", 1);
								}
								u.a.transition(this.video, "all 0.5s ease-in-out");
								u.as(this.video, u.a.vendor("transform"), "rotateX(-180deg)");

								u.a.transition(this.image, "all 0.5s ease-in-out");
								u.as(this.image, u.a.vendor("transform"), "rotateX(0deg)");
								
							}

							if(page.videoPlayer.current_node) {
								page.videoPlayer.current_node.resetPlayer();
							}

							//u.as(this.play_bn, "display", "none");
							page.videoPlayer.ended = function(event) {
								this.current_node = false;

								this.parentNode.transitioned = function() {
									u.as(this, "zIndex", 1);
								}
								u.a.transition(this.parentNode, "all 0.5s ease-in-out");
								u.as(this.parentNode, u.a.vendor("transform"), "rotateX(-180deg)");

								u.a.transition(this.parentNode.li.image, "all 0.5s ease-in-out");
								u.as(this.parentNode.li.image, u.a.vendor("transform"), "rotateX(0deg)");

							}
							
//							this.li.video.ended;

							u.as(this.li.video, "zIndex", 3);
							u.ae(this.li.video, page.videoPlayer);
							page.videoPlayer.current_node = this.li;
							page.videoPlayer.loadAndPlay(this.li._video_url, {"playpause":true});

						}

					}
				}


				li.is_ready = true;

				// resize grid
				this.resized();

			}

			// resize grid
			this.resized();


			u.textscaler(this, {
				"min_width":800,
				"max_width":1200,
				"unit":"px",
				"li .actions a":{
					"min_size":13,
					"max_size":14
				},
				"li h3":{
					"min_size":13,
					"max_size":14
				},
				".twenty h2":{
					"min_size":16,
					"max_size":22
				},
				".forty h2":{
					"min_size":28,
					"max_size":45
				},
				".tweet p":{
					"min_size":15,
					"max_size":22
				},
				".ambassador p":{
					"min_size":15,
					"max_size":22
				}
			});


			// call middle step which checks for images loaded
			this.is_almost_ready = true;
			this.isReady();

		}

		// scramble text in buttons
		scene._linkScrambler = function(li) {

			li.link.default_text = li.link.innerHTML;
			li.link.scrambled_count = 0;
			li.link.randomizer = function() {
				var indexes = [];
				var chars = [];
				var rand;
				while(chars.length < this.scrambled_sequence.length/3) {

					rand = u.random(0, this.scrambled_sequence.length-1);
					if(indexes.indexOf(rand) == -1) {
						indexes.push(rand);
						chars.push(this.scrambled_sequence[rand]);
					}

				}
				return [chars, indexes];
			}

			li.link.scramble = function() {

				this.scrambled_sequence = this.innerHTML.split("");
				var c = this.randomizer();

				if(this.scrambled_count < 20) {

					var index, char;

					while(c[0].length) {
						index = c[1].splice([u.random(0, c[1].length-1)], 1);
						char = c[0].splice([u.random(0, c[0].length-1)], 1);

						this.scrambled_sequence[index] = char;
					}
					this.innerHTML = this.scrambled_sequence.join("");

					this.scrambled_count++;
					u.t.setTimer(this, this.scramble, 50);
				}
				else {
					this.innerHTML = this.default_text;
				}

			}
			li.link.unscramble = function() {

				// u.a.transition(this.link, "all 0.3s ease-in-out");
				// u.as(this.link, u.a.vendor("transform"), "rotateX(0deg)");

				this.innerHTML = this.default_text;
				this.scrambled_count = 0;
			}

			li.link.mousedover = function() {
				u.t.resetTimer(this.t_scrambler);

				if(!this.scrambled_count) {

					// u.a.transition(this.link, "all 0.3s ease-in-out");
					// u.as(this.link, u.a.vendor("transform"), "rotateX(360deg)");

					this.scramble();
				}
			}
			li.link.mousedout = function() {
				u.t.resetTimer(this.t_scrambler);

				this.t_scrambler = u.t.setTimer(this, "unscramble", 100);
			}
			u.e.addEvent(li.link, "mouseover", li.link.mousedover);
			u.e.addEvent(li.link, "mouseout", li.link.mousedout);

		}

		// twitter card rotator
		scene._rotateCard = function() {

			if(this.cards.length > 1) {
				var new_card = this.card+1 < this.cards.length ? this.card+1 : 0;

				if(!u.hc(page.nN, "open")) {
					this.cards[this.card].transitioned = function() {
						u.a.transition(this, "none");
						u.as(this, u.a.vendor("transform"), "rotateX(180deg)");
					}
					u.a.transition(this.cards[this.card], "all 0.5s ease-in-out");
					u.as(this.cards[this.card], u.a.vendor("transform"), "rotateX(-180deg)");

					u.a.transition(this.cards[new_card], "all 0.5s ease-in-out");
					u.as(this.cards[new_card], u.a.vendor("transform"), "rotateX(0)");

					this.card = new_card;
				}

				u.t.setTimer(this, this.rotateCard, 5000);
			}
		}

		// render timestamp
		scene.next_render = new Date().getTime();

		// render a node
		scene.renderNode = function(li) {

//			u.bug("renderNode:" + u.nodeId(li) + ", " + li.is_built);

			li.is_built = true;

			var now = new Date().getTime();

			// delay rendering for a minimum of 100ms between each render
			this.next_render = now - this.next_render > 100 ? now : now + (100 - (now - this.next_render));


			// instagram
			if(u.hc(li, "instagram")) {

				li.image.transitioned = function() {
					u.a.removeTransform(this);
				}
				u.a.transition(li.image, "all 1s ease-in-out "+(this.next_render-now)+"ms");
				u.as(li.image, u.a.vendor("transform"), "rotateX(0)");
			}

			// ambassador
			else if(u.hc(li, "ambassador")) {

				li.image.transitioned = function() {

					u.a.transition(this, "none");
					u.a.removeTransform(this);

					u.as(this.li.li_video, u.a.vendor("perspective"), 500 + "px");

					u.as(this.li.li_video, u.a.vendor("transformStyle"), "preserve-3d");
					u.as(this.li.li_video, u.a.vendor("perspectiveOrigin"), "50% 0");
					u.as(this, u.a.vendor("transformOrigin"), "50% 50% 0");

				}

				u.a.transition(li.image, "all 1s ease-in-out "+(this.next_render-now)+"ms");
				u.as(li.image, u.a.vendor("transform"), "rotateX(0)");

				// u.a.transition(li.image, "all 0.5s ease-in-out "+(this.next_render-now)+"ms");
				// u.as(li.image, u.a.vendor("transform"), "rotateX(0deg) translateZ(0)");

				u.a.transition(li.li_article.card, "all 0.5s ease-in-out "+(this.next_render-now)+"ms");
				u.as(li.li_article.card, u.a.vendor("transform"), "rotateX(0)");
			}

			// article
			else if(u.hc(li, "article")) {

				u.a.transition(li.card, "all 0.5s ease-in-out "+(this.next_render-now)+"ms");
				u.as(li.card, u.a.vendor("transform"), "rotateX(0)");

			}

			// tweet
			else if(u.hc(li, "tweet")) {

				li.cards[0].transitioned = function() {
					u.a.transition(this, "none");
					u.a.removeTransform(this);
				}

				u.a.transition(li.cards[0], "all 0.5s ease-in-out "+(this.next_render-now)+"ms");
				u.as(li.cards[0], u.a.vendor("transform"), "rotateX(0)");
				li.card = 0;

				// enable card rotation
				li.rotateCard = this._rotateCard;

				u.t.setTimer(li, li.rotateCard, 5000);
			}
		}

		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
//				u.bug("scene.build:" + u.nodeId(this));

				u.a.transition(this.h1, "all 0.5s ease-in");
				u.a.setOpacity(this.h1, 1);


				this.is_built = true;

				// scroll handler handles rendering when is_built is set
				this.scrolled();
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

			// hide header
			u.a.transition(this.h1, "all 0.5s ease-out");
			u.a.setOpacity(this.h1, 0);

			var i, li, j = 0;

			for(i = 0; li = this.lis[i]; i++) {
				var li_y = u.absY(li);

				// only destroy visible elements
				if((li_y > page.scroll_y && li_y < page.scroll_y + page.browser_h) || li_y+li.offsetHeight > page.scroll_y && li_y+li.offsetHeight < page.scroll_y + page.browser_h) {
//					u.bug("move:" + u.nodeId(li))
					u.as(li, "zIndex", 100-j);

					u.ac(li.parentNode, "destroy");

					u.a.transition(li, "all 0.5s ease-in "+(150*j++)+"ms");
					u.as(li, u.a.vendor("transform"), "translateY(1500px) rotateX(-540deg)");
				}
			}

			u.t.setTimer(this, this.finalizeDestruction, (150*j)+500);

		}


		// ready to start page builing process
		scene.ready();
	}
}
