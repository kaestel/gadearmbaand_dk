u.bug_console_only = true;


Util.Objects["page"] = new function() {
	this.init = function(page) {

		if(u.hc(page, "i:page")) {

			// remove initializer class
			u.rc(page, "i:page");

			// header reference
			page.hN = u.qs("#header");

			// content reference
			page.cN = u.qs("#content", page);

			// navigation reference
			page.nN = u.qs("#navigation", page);

			// footer reference
			page.fN = u.qs("#footer");



			// global resize handler 
			page.resized = function(event) {
//				u.bug("page.resized:" + u.nodeId(this));

				// update global values
				page.browser_w = u.browserW();
				page.browser_h = u.browserH();


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

				page.offsetHeight;
			}

			// global scroll handler 
			page.scrolled = function(event) {
//				u.bug("page.scrolled:" + u.nodeId(this))

				// update global values
				page.scroll_y = u.scrollY();


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

				page.offsetHeight;
			}

			// global orientation change handler
			page.orientationchanged = function(event) {

			}



			// Page is ready
			page.ready = function() {
//				u.bug("page.ready called:" + u.nodeId(this));

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {
//					u.bug("page initialization:" + u.nodeId(this));

					// page is ready
					this.is_ready = true;


					// map the current scene
					this.cN.scene = u.qs(".scene", this.cN);


					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// set orientation change handler
					if(u.e.event_pref == "touch") {
						u.e.addEvent(window, "orientationchange", page.orientationchanged);
					}
					// set resize handler
					else {
						u.e.addEvent(window, "resize", page.resized);
					}

					// resize / scroll straight away to adjust widths
					this.resized();
					this.scrolled();


					// start intro
					this.initIntro();


					// build navigation
					this.initNavigation();


					// build header
					this.initHeader();


					// enable ajax navigation
					u.navigation();


					// initialize current scene
					u.init(this.cN.scene);
				}

			}


			// Content is ready - called from page.ready, scene and intro to make sure
			// we are at the correct state before showing the content and starting the scene rendering
			page.cN.ready = function() {
//				u.bug("page.cN ready called")


				// is page in a state to continue
				if(!page.intro && page.is_ready && page.cN.scene.is_ready) {

					// if existing scene exists, then destroy it
					// destroy will callback to this function and start the build when approriate
					// start destroying process for all notes but new scene
					var destroying = false;
					var scenes = u.qsa(".scene", this);
					for(i = 0; scene = scenes[i]; i++) {
						if(scene != this.scene){
							if(typeof(scene.destroy) == "function") {
//								u.bug("should destroy first")
								destroying = true;
								scene.destroy();
							}
						}
					}

					if(!destroying && this.scene && !this.scene.built && typeof(this.scene.build) == "function") {
//						u.bug("should build")

						// take page back to top
						window.scrollTo(0, 0);

						this.scene.built = true;
						this.scene.build();
					}

				}

			}


			// navigation controller
			page.cN.navigate = function(url) {
//				u.bug("cN.navigate:" + url)

				// content received
				this.response = function(response) {
//					u.bug("navigate response:" + response.body_class)

					// set body class
					u.setClass(document.body, response.body_class);
					// set title
					document.title = response.head_title;

					// get .scene content from response
					this.scene = u.qs(".scene", response);

					// append new scene to #content
					this.scene = u.ae(this, this.scene);

					// init content - will callback to ready when done
					u.init(this);

				}
				// request new content
				u.request(this, u.h.getCleanHash(url));

			}


			// initialize header
			page.initHeader = function() {
//				u.bug("initHeader")

				// get the navigation node from the servicenavigation
				var bn_nav = u.qs("ul.servicenavigation li.navigation", page.hN);

				// very simple navigation toggle
				u.ce(bn_nav);
				bn_nav.clicked = function() {

					// close navigation
					if(u.hc(page.nN, "open")) {

						page.nN.transitioned = function() {
							u.rc(this, "open");
						}
						u.a.transition(page.nN, "all 0.5s linear");
						u.a.setOpacity(page.nN, 0);

					}
					// open navigation
					else {
						u.ac(page.nN, "open");

						u.a.transition(page.nN, "all 0.5s linear");
						u.a.setOpacity(page.nN, 1);
					}

				}

			}


			// setup and activate Navigation
			page.initNavigation = function() {
//				u.bug("initNavigation")

				var i, node;

				// navigation nodes
				page.nN.nodes = u.qsa("li", page.nN);
				for(i = 0; node = page.nN.nodes[i]; i++) {

					// all navigation nodes except "buy"
					if(!u.hc(node, "buy")) {
						u.ce(node);
						node.clicked = function(event) {

							// save next url to process after navigation has been removed
							page.nN.next_url = this.url;

							// remove navigation
							page.nN.transitioned = function() {
								u.rc(this, "open");
								page.navigate(this.next_url);
							}
							u.a.transition(page.nN, "all 0.5s linear");
							u.a.setOpacity(page.nN, 0);

						}

					}
					// the external buy link
					else {
						u.e.click(node);
						node.clicked = function(event) {

							// remove navigation
							page.nN.transitioned = function() {
								u.rc(this, "open");
							}
							u.a.transition(page.nN, "all 0.5s linear");
							u.a.setOpacity(page.nN, 0);

						}

					}

				}

			}


			// initialize intro
			page.initIntro = function() {
//				u.bug("initIntro")

				// create intro layer
				if(u.hc(document.body, "front")) {
					page.intro = u.ae(document.body, "div", {"id":"intro"});

					page.intro.svg = u.svg({
						"node":page.intro,
						"width":page.browser_w,
						"height":page.browser_h,
						"class":"intro",
						"shapes":[
							{
								"type":"line",
								"x1":-10,
								"y1":page.browser_h/2,
								"x2":-8,
								"y2":page.browser_h/2
							}
						]
						
					});


					page.intro.line1 = u.qs("line", page.intro.svg);

					page.intro.line1.transitioned = function() {

						page.intro.line1.transitioned = function() {



							page.intro.path1 = u.svgShape(page.intro.svg, {
								"type":"path",
								"d":"M "+(page.browser_w/2 - 100)+" "+(page.browser_h/2)+" a 0 100 90 1 1 200 0z"
//								"d":"M28.7,83.3c-4.3,4.3-6.9,10.2-6.9,16.7c0,2.9,0.5,5.8,1.5,8.3c1,2.6,2.4,5,4.2,7"
							});
							u.a.to(page.intro.path1, "all 0.2s linear", {"d":"M "+(page.browser_w/2 - 100)+" "+(page.browser_h/2)+" a 100 100 90 1 1 200 0z"});

							// u.svgShape(page.intro.svg, {
							// 	"type":"circle",
							// 	"cx":page.browser_w/2,
							// 	"cy":page.browser_h/2,
							// 	"r":100
							// });
						}

						u.a.to(page.intro.line1, "all 0.2s linear", {"x1":page.browser_w/2 - 100});


					}
					u.a.to(page.intro.line1, "all 0.4s linear", {"x2":page.browser_w/2 + 100});



					// remove intro
					u.ce(page.intro);
					page.intro.clicked = function() {

						this.parentNode.removeChild(this);
						page.intro = false;

						// notify page.cN.ready to continue content rendering
						page.cN.ready();

					}
				}

			}



			// ready to start page builing process
			page.ready();

		}

	}
}


// Controlled initialization
function static_init() {
	u.o.page.init(u.qs("#page"));
}
u.e.addDOMReadyEvent(static_init);
