Util.Objects["manifest"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			u.as(this, "height", page.browser_h + "px");

		}

		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			page.resized();

			this.is_ready = true;
			page.cN.ready();
		}


		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
//				u.bug("scene.build:" + u.nodeId(this));

				this.is_built = true;

				this.content = u.qs(".content", this);

				// u.as(this.content, "marginTop", page.browser_h - 100 + "px")
				//
				// this.forgroundPerson = u.ie(this, "div", {"class":"forgroundPerson"});
				// u.as(this.forgroundPerson, "backgroundImage", "url(/img/gx_manifest.png)");
				//
				// // this.forgroundPerson.transitioned = function() {
				//
				// // 	u.a.transition(this, "all 1s linear");
				// // 	u.as(this, "opacity", 0)
				// // }
				//
				// u.a.transition(this.forgroundPerson, "all 3s linear");
				// u.ass(this.forgroundPerson, {"left" : "-300px", "width": "682px", "height": "451px", "opacity": 0})
				//
				//
				// this.vp = u.ie(this, "div", {"class":"vp"});
				// u.as(this.vp, "backgroundImage", "url(/assets/nav_manifest.jpg)");
				//
				// var player = u.videoPlayer();
				// u.ae(this.vp, player);
				//
				// player.playing = function(event) {
				// 	// this.transitioned = function() {
				// 	// 	//scene.vp.parentNode.removeChild(scene.vp);
				// 	// }
				//
				//
				//
				//
				// }
				//
				// u.a.transition(scene.content, "all 3s linear");
				// u.as(scene.content, "marginTop", "0px")
				//
				//
				// if(this.offsetWidth/this.offsetHeight > 480/270) {
				//
				// 	var height = (this.offsetWidth / (480/270));
				// 	u.as(this.vp, "height", height + "px");
				// 	u.as(this.vp, "marginTop", ((this.offsetHeight - height) / 2) + "px");
				// 	u.as(this.vp, "width", "100%");
				// 	u.as(this.vp, "marginLeft", 0);
				// }
				// else {
				// 	var width = (this.offsetHeight / (270/480));
				// 	u.as(this.vp, "width", width + "px");
				// 	u.as(this.vp, "marginLeft", ((this.offsetWidth - width) / 2) + "px");
				// 	u.as(this.vp, "height", "100%");
				// 	u.as(this.vp, "marginTop", 0);
				// }

				//player.loadAndPlay("/assets/nav_manifest_640x360.mp4");

				var lines = 50;
				var svg_object = {
					"name":"manifest_build",
					"width":page.browser_w,
					"height":page.browser_h,
					"shapes":[]
				};

				var i, shape, x1, new_coords = [];

				// start lines
				for(i = 0; i < lines; i++) {

					var x1 = (i*page.browser_w/lines) - 10 + u.random(5, 10);
					var x2 = (i*page.browser_w/lines) - 10 + u.random(5, 10);
					shape = {
						"type":"line",
						"class":"id"+i,
						"x1":x1,
						"x2":x2,
						"y1": -10,
						"y2": page.browser_h + 10,
						// "y1":i%2 ? -10 : page.browser_h + 10-2,
						// "y2":i%2 ? -8 : page.browser_h + 10,
//						new_coords[i]["stroke-width"] = u.random(2+j*0.5, 28+(Math.pow(j*0.5, 2)));
						"stroke-width": u.random(20, 50)
					}
					svg_object.shapes.push(shape);
				}


				// new end coords
				for(i = 0; i < lines; i++) {
					shape = {
						"y1":page.browser_h + 10,
//						"y2":-10,
						"stroke-width":2
					}
					new_coords[i] = shape;
				}

				var svg = u.svg(svg_object);
				svg.scene = this;
				svg._c = u.qs(".content");

				u.ae(this, svg);

				// get all lines in array to parse them randomly
				lines = u.qsa("line", svg);
				new_lines = [];
				for(i = 0; i < lines.length; i++) {
					new_lines.push(lines[i]);
				}

				// start animation sequence
//				j = 50;
				svg._animate = function() {
//					j--;
					if(new_lines.length) {
						i = u.random(0, new_lines.length-1);
						line = new_lines[i];
						new_lines.splice(i, 1);
//						new_coords[i]["stroke-width"] = 2; //u.random(2+j*0.5, 28+(Math.pow(j*0.5, 2)));


						u.a.to(line, "all 0.3s linear", new_coords[i]);
						new_coords.splice(i, 1);

						// continue animation
						u.t.setTimer(this, "_animate", 10);
					}
					else {
						this.parentNode.removeChild(this);
//						u.t.setTimer(this.scene, this.scene.finalizeDestruction, 500);
	//					this.scene.finalizeDestruction();
					}

				}
				svg._animate();


				// u.a.transition(this, "all 1s linear");
				// u.a.setOpacity(this, 1);

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


			var lines = 50;
			var svg_object = {
				"name":"destruction",
				"width":page.browser_w,
				"height":page.browser_h,
				"shapes":[]
			};

			var i, shape, x1, new_coords = [];

			// start lines
			for(i = 0; i < lines; i++) {

				var x1 = (i*page.browser_w/lines) - 10 + u.random(5, 10);
				shape = {
					"type":"line",
					"class":"id"+i,
					"x1":x1,
					"x2":x1,
					"y1":-10,
					"y2":-8,
					// "y1":i%2 ? -10 : page.browser_h + 10-2,
					// "y2":i%2 ? -8 : page.browser_h + 10,
					"stroke-width":2
				}
				svg_object.shapes.push(shape);
			}


			// new end coords
			for(i = 0; i < lines; i++) {
				shape = {
					"x2":(i*page.browser_w/lines) + u.random(-35, 35),
					"y1":-10,
					"y2":page.browser_h + 10
				}
				new_coords[i] = shape;
			}

			var svg = u.svg(svg_object);
			svg.scene = this;
			svg._c = u.qs(".content");

			u.ae(this, svg);

			// get all lines in array to parse them randomly
			lines = u.qsa("line", svg);
			new_lines = [];
			for(i = 0; i < lines.length; i++) {
				new_lines.push(lines[i]);
			}

			// start animation sequence
			j = 0;
			svg._animate = function() {
				j++;
				if(new_lines.length) {
					i = u.random(0, new_lines.length-1);
					line = new_lines[i];
					new_lines.splice(i, 1);
					new_coords[i]["stroke-width"] = u.random(2+j*0.5, 28+(Math.pow(j*0.5, 2)));


					u.a.to(line, "all 0.3s linear", new_coords[i]);
					new_coords.splice(i, 1);

					// let content node fall down
					if(j == 15) {
						u.a.transition(this._c, "all 0.2s ease-out");
						u.a.scaleRotateTranslate(this._c, 1, 5, 5, 100);
					}

					if(j == 20) {
						u.a.transition(this._c, "all 0.3s ease-out");
						u.a.scaleRotateTranslate(this._c, 0.8, -13, -5, 300);
					}

					if(j == 27) {
						u.a.transition(this._c, "all 0.3s ease-out");
						u.a.scaleRotateTranslate(this._c, 0.7, -3, 0, 1000);
					}

					// continue animation
					u.t.setTimer(this, "_animate", 10);
				}
				else {
					u.t.setTimer(this.scene, this.scene.finalizeDestruction, 500);
//					this.scene.finalizeDestruction();
				}

			}
			svg._animate();

		}


		// scene is ready
		scene.ready();
	}
}
