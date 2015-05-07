Util.Objects["events"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:" + u.nodeId(this))
		}


		// perform filtering (days, tags, search)
		scene._filter = function() {

			// reset selected event
			if(this.selected_event) {
				u.rc(this.selected_event, "selected");
				this.selected_event = false;
			}


			var i, node;
			for(i = 0; node = this.events[i]; i++) {

				// close all open events
// 				if(u.hc(node, "selected")) {
// //					u.a.transition(node, "all 0.3s ease-out");
// 					u.rc(node, "selected");
// //					u.as(node, "height", this.event_height + "px");
// 				}

				if(this.checkDays(node) && this.checkTags(node) && this.checkSearch(node)) {
					
					if(!node._shown) {
						u.a.transition(node, "all 0.3s ease-out");
						u.as(node, "display", "block");
						u.as(node, "height", this.event_height + "px");
						
						node._shown = true;
					}

				} 
				else {

					if(node._shown) {

						node.transitioned = function() {
							u.as(this, "display", "none");
						}
						u.a.transition(node, "all 0.3s ease-out");
						u.as(node, "height", "0px");

						node._shown = false;
					}
				}
			}
		}


		// check if event matches day
		scene.checkDays = function(event_node) {

			// if no day is selected or event matched selected day
			if(!this._selected_day || this._selected_day == event_node._day) {
				return true;
			}
			return false;
		}

		// check if event matches tags
		scene.checkTags = function(event_node) {

			// no tags are selected - all events are valid
			if(this._selected_tags.length == 0) {

				return true;
			} 
			// loop through selected tags for each event
			else {

				var i, tag;
				for(i = 0; tag = this._selected_tags[i]; i++) {

					// check if node dosen't have tag
					if(event_node.tags_array.indexOf(tag) == -1) {
						return false;
					}
				}
			}

			return true;	
		}

		// check if event matches search
		scene.checkSearch = function(event_node) {

			// if no search or event matches search-string
			if(!this._selected_search || event_node._host._string.match(this._selected_search) || event_node._name._string.match(this._selected_search) || event_node._location._string.match(this._selected_search)) {
				return true;
			}
			return false;
		}


		// initialize events
		scene.initEvents = function() {

			this.events = u.qsa(".item", this);
			this.event_height = 38;

			var i, node;
			for(i = 0; node = this.events[i]; i++) {

				node.scene = this;

				node._tags = u.qsa("ul.tags li", node);
				node._media = u.qs("div.media", node);
				node._media._item_id = u.cv(node._media, "item_id")
				node._media._format = u.cv(node._media, "format")

				node._image_src = "/images/" + node._media._item_id + "/single_media/300x." + node._media._format;
				node._image = u.ae(node._media, "img");


				node.tags_array = [];

				var j, tag;
				for(j = 0; tag = node._tags[j]; j++) {
					node.tags_array.push(tag.innerHTML);
				}

				node._shown = true;
				node._height = node.offsetHeight;

				node._day = u.cv(node, "day").toLowerCase();
				node._name = u.qs(".name", node);
				node._host = u.qs(".host", node);
				node._location = u.qs(".location a", node);

				node._facebook = u.qs(".text .action a", node);
				u.linkScrambler(node._facebook);

				node._host._string = node._host.innerHTML.toLowerCase()
				node._name._string = node._name.innerHTML.toLowerCase()
				node._location._string = node._location.innerHTML.toLowerCase()

				node.clicked = function(event) {

					// inject img
					if(!this._image.is_loaded) {
						this._image.src = this._image_src;
						this._image.is_loaded = true;
					}

					if(u.hc(this, "selected")) {
						u.a.transition(this, "all 0.3s ease-out");
						u.rc(this, "selected");
						this.scene.selected_event = false;
						u.as(this, "height", this.scene.event_height+"px");
					}
					else {
						u.a.transition(this, "all 0.5s ease-out");
						u.ac(this, "selected");
						this.scene.selected_event = this;
						u.as(this, "height", this._height + "px");
					}

					var i, node;
					for(i = 0; node = this.scene.events[i]; i++) {

						if(this.scene.selected_event != node && u.hc(node, "selected")) {
							u.a.transition(node, "all 0.3s ease-out");
							u.rc(node, "selected");
							u.as(node, "height", this.scene.event_height+"px");
						}
					}
				}

				u.e.click(node)
				u.ass(node, {"height": this.event_height+"px"})
			}
		}

		// initalized all days
		scene.initDays = function() {

			this._days_list = u.qs("ul.days", this);
			this._all_days = u.ie(this._days_list, "li", {"class":"all selected","html":"Alle dage"});
			this._days = u.qsa("li", this._days_list);

			var i, day;
			for(i = 0; day = this._days[i]; i++) {

				day.scene = this;

				// add link scrambling
				u.linkScrambler(day);


				day.clicked = function() {

					// unselection and not "alle dage"
					if(u.hc(this, "selected") && this != this.scene._all_days) {

						u.rc(this, "selected");
						u.ac(this.scene._all_days, "selected");
						this.scene._selected_day = "";

					} 
					// selection
					else {

						// reset all days
						var i, day;
						for(i = 0; day = this.scene._days[i]; i++) {
							u.rc(day, "selected");
						}

						// "alle dage" selected
						if(this == this.scene._all_days) {
							this.scene._selected_day = "";
						}
						// single day selected
						else {
							this.scene._selected_day = this.innerHTML.toLowerCase();
						}

						u.ac(this, "selected");

					}

					// perform filtering
					this.scene._filter();
				}
				u.ce(day)

			}
		}

		// initialize all tags
		scene.initTags = function() {

			this.tags_list = u.qs(".tag_list", this);
			this.all_tags = u.ie(this.tags_list, "li", {"class":"all selected","html":"Alle"});
			this.tags = u.qsa("li", this.tags_list);

			var i, tag;
			for(i = 0; tag = this.tags[i]; i++) {

				tag.scene = this;

				// add text scrambler
				u.linkScrambler(tag);


				tag.clicked = function() {

					// reset the search field
					if(this.scene._search_input) {
						this.scene._search_input.value = this.scene._search_input._default;
						this.scene._selected_search = "";
					}


					// all tags clicked
					if(u.hc(this, "all")) {

						// unselect all tags
						var i, tag;
						for(i = 0; tag = this.scene.tags[i]; i++) {
							u.rc(tag, "selected");
						}

						// select all tags
						u.ac(this.scene.all_tags, "selected")

						// empty tag scope
						this.scene._selected_tags = [];

					} 
					// selected tag clicked
					else if(u.hc(this, "selected")){

						// unselect tag
						u.rc(this, "selected");

						// remove tag from tag scope
						this.scene._selected_tags.splice(this.scene._selected_tags.indexOf(this.innerHTML), 1);

						// no more node selected? highlight ALL again
						if(this.scene._selected_tags.length == 0) {
							u.ac(this.scene._all_tags, "selected");
						}

					}
					// new tag clicked
					else {

						// unselect "all"-tag
						u.rc(this.scene._all_tags, "selected")

						// select this tag
						u.ac(this, "selected");

						// add tag to tag scope
						this.scene._selected_tags.push(this.innerHTML)
					}

					// perform filtering
					this.scene._filter();

				}
				u.ce(tag)

			}
		}

		// initialize search
		scene.initSearch = function() {

			this._search = u.qs("form.search", this);
			this._search_input = u.qs("input", this._search);
			this._search_input._default = "Skriv her";
			this._search_input.scene = this;

			// setting default value
			this._search_input.value = this._search_input._default;

			// remove default value
			this._search_input.focused = function() {

				if(this.value == this._default) {
					this.value = "";
				} 
			}

			// restore default value if no custom value is present
			this._search_input.blurred = function() {

				if(this.value == "") {
					this.value = this._default;
				} 
			}

			// perform search
			this._search_input.keySearch = function() {

				// update seach-string
				this.scene._selected_search = this.value.toLowerCase();

				// perform filtering
				this.scene._filter();
			}

			// listen for key-up
			this._search_input.keyUp = function(event) {

				u.t.resetTimer(this.t_search)

				// start seach after 300ms
				this.t_search = u.t.setTimer(this, this.keySearch, 300);
			}

			// add event listeners
			u.e.addEvent(this._search_input, "focus", this._search_input.focused);
			u.e.addEvent(this._search_input, "blur", this._search_input.blurred);
			u.e.addEvent(this._search_input, "keyup", this._search_input.keyUp);
		}

		// initialize filter panel
		scene.initFilters = function() {

			// open close advanced search
			this._tag_filter = u.qs(".filter", this);
			this._tag_filter.scene = this;

			this._tag_filter._title = u.qs("h2", this._tag_filter);
			this._tag_filter._title.innerHTML = "Søg";
			this._tag_filter._title.scene = this;

			// add scramble for title
			this._tag_filter._title.fixed_width = true;
			u.linkScrambler(this._tag_filter._title);

			// get initial height
			this._tag_filter._height = this._tag_filter.offsetHeight;

			// set initial width and height
			u.ass(this._tag_filter, {"height" : "32px", "width" : "100px"});


			this._tag_filter._tag_list = u.qs("ul.tag_list", this._tag_filter);
			this._tag_filter._search = u.qs(".search", this._tag_filter);

			u.as(this._tag_filter._tag_list, "display", "none");
			u.as(this._tag_filter._search, "display", "none");


			this._tag_filter.open = false;

			this._tag_filter._title.clicked = function() {

				this.unscramble();

				// open filter
				if(!this.scene._tag_filter.open) {

					this.scene._tag_filter.transitioned = function() {

						u.as(this.scene._tag_filter._tag_list, "display", "block");
						u.as(this.scene._tag_filter._search, "display", "block");

						u.a.transition(this.scene._tag_filter._tag_list, "all 0.5s ease-out");
						u.as(this.scene._tag_filter._tag_list, "opacity", 1);

						u.a.transition(this.scene._tag_filter._search, "all 0.5s ease-out");
						u.as(this.scene._tag_filter._search, "opacity", 1);

						this.scene._tag_filter._title.innerHTML = "Luk";
						this.scene._tag_filter._title.default_text = this.scene._tag_filter._title.innerHTML;

					}

					u.ac(this.scene._tag_filter, "open");
					u.a.transition(this.scene._tag_filter, "all 0.5s ease-out");
					u.ass(this.scene._tag_filter, {"width" : "100%", "height" : this.scene._tag_filter._height + "px"});

					this.scene._tag_filter.open = true;

				}

				// close filter
				else {

					this.scene._tag_filter._tag_list.transitioned = function() {

						u.as(this.scene._tag_filter._tag_list, "display", "none");
						u.as(this.scene._tag_filter._search, "display", "none");

						this.scene._tag_filter._title.innerHTML = "Søg";
						this.scene._tag_filter._title.default_text = this.scene._tag_filter._title.innerHTML;

					}

					u.rc(this.scene._tag_filter, "open");

					u.a.transition(this.scene._tag_filter._tag_list, "all 0.3s ease-out");
					u.as(this.scene._tag_filter._tag_list, "opacity", 0);

					u.a.transition(this.scene._tag_filter._search, "all 0.3s ease-out");
					u.as(this.scene._tag_filter._search, "opacity", 0);

					u.a.transition(this.scene._tag_filter, "all 0.3s ease-out");
					u.ass(this.scene._tag_filter, {"width" : "100px", "height" : "32px"});

					this.scene._tag_filter.open = false;

				}
			}

			u.ce(this._tag_filter._title);
		}

		// get scene ready
		scene.ready = function() {

			// global variables
			this._selected_day = "";
			this._selected_tags = [];
			this._selected_search = "";


			// initializing events
			this.initEvents();
			this.initDays();
			this.initTags();
			this.initSearch();
			this.initFilters();


			this.h1 = u.qs("h1", this);
			this.div_events = u.qs("div.events", this);
			this.div_filters = u.qs("div.filters", this);

			u.as(this.h1, u.a.vendor("transform"), "translate(0, -300px) rotate(10deg)");
			u.as(this.div_filters, u.a.vendor("transform"), "translate(0, -300px) rotate(10deg)");
			u.as(this.div_events, u.a.vendor("transform"), "translate(0, "+page.browser_h+"px) rotate(10deg)");

			this.is_ready = true;
			page.cN.ready();

		}


		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
// 				u.bug("scene.build:" + u.nodeId(this));

				this.is_built = true;

				u.a.transition(this.h1, "all 0.6s ease-in-out");
				u.as(this.h1, u.a.vendor("transform"), "translate(0, 0) rotate(0)");
				u.a.transition(this.div_filters, "all 0.6s ease-in-out");
				u.as(this.div_filters, u.a.vendor("transform"), "translate(0, 0) rotate(0)");
				u.a.transition(this.div_events, "all 0.6s ease-in-out");
				u.as(this.div_events, u.a.vendor("transform"), "translate(0, 0) rotate(0)");

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

			this.h1.transitioned = function() {

				// destruction is done
				this.finalizeDestruction();
			}

			u.a.transition(this.h1, "all 0.6s ease-in-out");
			u.as(this.h1, u.a.vendor("transform"), "translate(0, -300px) rotate(10deg)");
			u.a.transition(this.div_filters, "all 0.6s ease-in-out");
			u.as(this.div_filters, u.a.vendor("transform"), "translate(0, -300px) rotate(10deg)");
			u.a.transition(this.div_events, "all 0.6s ease-in-out");
			u.as(this.div_events, u.a.vendor("transform"), "translate(0, "+page.browser_h+"px) rotate(-10deg)");

		}


		// scene is ready
		scene.ready();
	}
}
