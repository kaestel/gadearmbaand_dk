u.bug_console_only = true;


Util.Objects["page"] = new function() {
	this.init = function(page) {

		if(u.hc(page, "i:page")) {

			// header reference
			page.hN = u.qs("#header");

			// content reference
			page.cN = u.qs("#content", page);

			// navigation reference
			page.nN = u.qs("#navigation", page);

			// footer reference
			page.fN = u.qs("#footer");


			// global resize handler 
			page.resized = function() {
//				u.bug("page.resized:" + u.nodeId(this));

				page.browser_w = u.browserW();
				page.browser_h = u.browserH();


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

				page.offsetHeight;
			}

			// global scroll handler 
			page.scrolled = function() {
//				u.bug("page.scrolled:" + u.nodeId(this))

				page.scroll_y = u.scrollY();


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

				page.offsetHeight;
			}

			// Page is ready
			page.ready = function() {
				u.bug("page.ready called:" + u.nodeId(this));

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {
					u.bug("page initialization:" + u.nodeId(this));

					// page is ready
					this.is_ready = true;


					this.cN.scene = u.qs(".scene", this.cN);


					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);


					// start intro
					this.initIntro();


					// build navigation
					this.initNavigation();


					// build header
					this.initHeader();


					// resize / scroll straight away to adjust widths
					this.resized();
					this.scrolled();


					// enable ajax navigation
					u.navigation();


					// initialize current scene
					u.init(this.cN.scene);
				}

			}


			// Content is ready - called from page.ready, scene and intro to make sure
			// we are at the correct state before showing the content and starting the scene rendering
			page.cN.ready = function() {
				u.bug("page.cN ready called")


				if(!page.intro && page.is_ready && page.cN.scene.is_ready && !page.cN.is_ready) {
					u.bug("finally make page.cN ready")


					this.is_ready = true;


					// load remaining pages once current scene is shown
					page.current_scene.built = function() {

						// only ever run this once
						page.current_scene.built = null;

					}

					// build current scene
//					page.current_scene.scroll_offset = u.scrollY();
					page.current_scene.build();


				}

			}

			// navigation controller
			page.cN.navigate = function(url) {
				u.bug("cN.navigate:" + url)



			}




			// initialize header
			page.initHeader = function() {
//				u.bug("initHeader")

				var bn_nav = u.qs("ul.servicenavigation li.navigation", page.hN);

				// very simple navigation toggle
				u.ce(bn_nav);
				bn_nav.clicked = function() {

					if(u.hc(page.nN, "open")) {
						u.rc(page.nN, "open");
					}
					else {
						u.ac(page.nN, "open");
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
					if(!u.hc(node, "buy")) {
						u.ce(node, {"type":"link"});
					}
				}

			}


			// initialize intro
			page.initIntro = function() {
//				u.bug("initIntro")

				// create intro layer
				if(u.hc(page, "front")) {
					page.intro = u.ae(document.body, "div", {"id":"intro"});

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
