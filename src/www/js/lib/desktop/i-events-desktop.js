Util.Objects["events"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:" + u.nodeId(this));
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:" + u.nodeId(this))
		}

		scene._filter = function() {

			var i, _event;
			for(i = 0; _event = this._events[i]; i++) {

				// close all open events
				if(u.hc(_event, "selected")) {
					u.a.transition(_event, "all 0.5s ease-out");
					u.rc(_event, "selected");
					u.as(_event, "height", "41px");
				}

				if(this.checkDays(_event) && this.checkTags(_event) && this.checkSearch(_event)) {
					
					if(!_event._shown) {
						u.a.transition(_event, "all 0.5s ease-out");
						u.as(_event, "display", "block");
						u.as(_event, "height", "41px");
						
						_event._shown = true;
					}

				} else {

					if(_event._shown) {
						
						_event.transitioned = function() {
							u.as(this, "display", "none");
						}
						u.a.transition(_event, "all 0.5s ease-out");
						u.as(_event, "height", "0px");
						
						_event._shown = false;
					}
				}
			}
		}
		
		scene.checkDays = function(event_node) {

			if(!this._selected_day || this._selected_day == event_node._day) {
				return true;

			} else {
				return false;
			}
		}

		scene.checkTags = function(event_node) {

			if(this._selected_tags.length == 0) {

				return true;

			} else {

				var i, tag;
				for(i = 0; tag = this._selected_tags[i]; i++) {

					// check if node dosen't have tah
					if(event_node._event_tags_array.indexOf(tag) == -1) {

						return false;

					}
				}
			}
			
			return true;	
		}

		scene.checkSearch = function(event_node) {
			
			if(!this._selected_search || event_node._host._string.match(this._selected_search) || event_node._name._string.match(this._selected_search) || event_node._location._string.match(this._selected_search)) {

				return true;

			} else {

				return false;
			}	
		}
		

		scene.ready = function() {

			// global variables
			this._selected_day = "";
			this._selected_tags = [];
			this._selected_search = "";

			
			
			this.initEvents = function() {

				this._events = u.qsa(".item");

				var i, _event;
				for(i = 0; _event = this._events[i]; i++) {

					_event._tags = u.qsa("ul.tags li", _event);
					_event._media = u.qs("div.media", _event);
					_event._media._item_id = u.cv(_event._media, "item_id")
					_event._media._format = u.cv(_event._media, "format")

					// inject img
					u.ae(_event._media, "img", {"src" : "/images/" + _event._media._item_id + "/single_media/300x." + _event._media._format});

					_event._event_tags_array = [];

					var j, _event_tag;
					for(j = 0; _event_tag = _event._tags[j]; j++) {
						_event._event_tags_array.push(_event_tag.innerHTML);
					}

					_event._shown = true;
					_event._height = _event.offsetHeight;

					_event._day = u.cv(_event, "day").toLowerCase();
					_event._name = u.qs(".name", _event);
					_event._host = u.qs(".host", _event);
					_event._location = u.qs(".location", _event);

					_event._host._string = _event._host.innerHTML.toLowerCase()
					_event._name._string = _event._name.innerHTML.toLowerCase()
					_event._location._string = _event._location.innerHTML.toLowerCase()

					_event.clicked = function() {

						if(u.hc(this, "selected")) {
							u.a.transition(this, "all 0.5s ease-out");
							u.rc(this, "selected");
							u.as(this, "height", "41px");

						} else {
							u.a.transition(this, "all 0.8s ease-out");
							u.ac(this, "selected");
							u.as(this, "height", this._height + "px");
						}
						
						var i, _event;
						for(i = 0; _event = scene._events[i]; i++) {
							
							if(u.hc(_event, "selected") && _event != this) {
								
								u.a.transition(_event, "all 0.5s ease-out");
								u.rc(_event, "selected");
								u.as(_event, "height", "41px");
							}
						}
					}

					u.ce(_event)
					u.ass(_event, {"height": "41px"})
				}
			}

			this.initDays = function() {

				this._days_list = u.qs("ul.days");
				this._all_days = u.ie(this._days_list, "li", {"class":"all selected","html":"All days"});
				this._days = u.qsa("li", this._days_list);

				var i, day;
				for(i = 0; day = this._days[i]; i++) {

					day.clicked = function() {

						if(u.hc(this, "selected")){

							if(this != scene._all_days) {
								u.rc(this, "selected");
								u.ac(scene._all_days, "selected");
								scene._selected_day = "";
							}

						} else {

							var i, day;
							for(i = 0; day = scene._days[i]; i++) {
								u.rc(day, "selected");
							}

							if(this == scene._all_days) {
								scene._selected_day = "";
							} else {
								scene._selected_day = this.innerHTML.toLowerCase();
							}

							u.ac(this, "selected");

						}
						scene._filter();
					}

					u.ce(day)
				}
			}

			this.initTags = function() {

				this._tags_list = u.qs(".tag_list");
				this._all_tags = u.ie(this._tags_list, "li", {"class":"all selected","html":"All"});
				this._tags = u.qsa("li", this._tags_list);

				var i, tag;
				for(i = 0; tag = this._tags[i]; i++) {

					tag.clicked = function() {

						if(u.hc(this, "all")) {
				
							var i, tag;
							for(i = 0; tag = scene._tags[i]; i++) {

								u.rc(tag, "selected");
								
							}

							// reset the search field
							scene._search_input.value = scene._search_input._default;
							scene._selected_search = "";

							u.ac(scene._all_tags, "selected")
							scene._selected_tags = [];

						} else if(u.hc(this, "selected")){

							u.rc(this, "selected");
							scene._selected_tags.splice(scene._selected_tags.indexOf(this.innerHTML), 1);

							// no more node selected? highlight ALL again
							if(scene._selected_tags.length == 0) {
								u.ac(scene._all_tags, "selected");
							}

						} else {
							u.rc(scene._all_tags, "selected")
							u.ac(this, "selected");

							scene._selected_tags.push(this.innerHTML)
						}

						scene._filter();

					}


					u.ce(tag)
				}
			}

			this.initSearch = function() {

				this._search = u.qs("form.search", this);
				this._search_input = u.qs("input", this._search);
				this._search_input._default = "Type here"
				
				// setting default value
				this._search_input.value = this._search_input._default;

				this._search_input.focused = function() {

					if(this.value == this._default) {
						this.value = "";
					} 
				}

				this._search_input.blurred = function() {

					if(this.value == "") {
						this.value = this._default;
					} 
					
				}

				this._search_input.keySearch = function() {

					scene._selected_search = this.value.toLowerCase();
					scene._filter();
				}


				this._search_input.keyUp = function(event) {

					u.t.resetTimer(this.t_search)
					this.t_search = u.t.setTimer(this, this.keySearch, 300);
				}

				u.e.addEvent(this._search_input, "focus", this._search_input.focused);
				u.e.addEvent(this._search_input, "blur", this._search_input.blurred);
				u.e.addEvent(this._search_input, "keyup", this._search_input.keyUp);
			}


			// initializing events
			this.initEvents();
			this.initDays();
			this.initTags();
			this.initSearch();


			// open close advanced search
			this._tag_filter = u.qs(".filter", this);
			this._tag_filter._title = u.qs("h2", this._tag_filter);
			this._tag_filter._title.innerHTML = "open advanced search";

			this._tag_filter._height = this._tag_filter.offsetHeight;

			u.ass(this._tag_filter, {"height" : "34px", "width" : "190px"});

			this._tag_filter._tag_list = u.qs("ul.tag_list", this._tag_filter);
			this._tag_filter._search = u.qs(".search", this._tag_filter);

			u.as(this._tag_filter._tag_list, "display", "none");
			u.as(this._tag_filter._search, "display", "none");


			this._tag_filter.open = false;

			this._tag_filter._title.clicked = function() {

				if(!scene._tag_filter.open) {

					scene._tag_filter.transitioned = function() {

						u.as(scene._tag_filter._tag_list, "display", "block");
						u.as(scene._tag_filter._search, "display", "block");

						u.a.transition(scene._tag_filter._tag_list, "all 0.5s ease-out");
						u.as(scene._tag_filter._tag_list, "opacity", 1);

						u.a.transition(scene._tag_filter._search, "all 0.5s ease-out");
						u.as(scene._tag_filter._search, "opacity", 1);

						scene._tag_filter._title.innerHTML = "close advanced search";

					}

					u.a.transition(scene._tag_filter, "all 0.5s ease-out");
					u.ass(scene._tag_filter, {"width" : "100%", "height" : scene._tag_filter._height + "px"});

					scene._tag_filter.open = true;

				} else {

					scene._tag_filter._tag_list.transitioned = function() {

						u.as(scene._tag_filter._tag_list, "display", "none");
						u.as(scene._tag_filter._search, "display", "none");

						scene._tag_filter._title.innerHTML = "open advanced search";

					}

					u.a.transition(scene._tag_filter._tag_list, "all 0.5s ease-out");
					u.as(scene._tag_filter._tag_list, "opacity", 0);

					u.a.transition(scene._tag_filter._search, "all 0.5s ease-out");
					u.as(scene._tag_filter._search, "opacity", 0);

					u.a.transition(scene._tag_filter, "all 0.5s ease-out");
					u.ass(scene._tag_filter, {"width" : "190px", "height" : "34px"});

					scene._tag_filter.open = false;

				}
			}

			u.ce(this._tag_filter._title);


			this.is_ready = true;
			page.cN.ready();

		}


		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
				// u.bug("scene.build:" + u.nodeId(this));

				this.is_built = true;

				u.a.transition(this, "all 1s linear");
				u.a.setOpacity(this, 1);

			}
		}


		// destroy scene - scene needs to be removed
		scene.destroy = function() {
			// u.bug("scene.destroy:" + u.nodeId(this))

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


		// scene is ready
		scene.ready();
	}
}
