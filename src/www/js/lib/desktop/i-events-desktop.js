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

				this._events = u.qsa(".item", this);

				var i, _event;
				for(i = 0; _event = this._events[i]; i++) {

					_event._tags = u.qsa("ul.tags li", _event);
					_event._media = u.qs("div.media", _event);
					_event._media._item_id = u.cv(_event._media, "item_id")
					_event._media._format = u.cv(_event._media, "format")

					_event._image_src = "/images/" + _event._media._item_id + "/single_media/300x." + _event._media._format;
					_event._image = u.ae(_event._media, "img");


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
					_event._location = u.qs(".location a", _event);


					_event._host._string = _event._host.innerHTML.toLowerCase()
					_event._name._string = _event._name.innerHTML.toLowerCase()
					_event._location._string = _event._location.innerHTML.toLowerCase()

					_event.clicked = function(event) {

						// inject img
						if(!this._image.is_loaded) {
							this._image.src = this._image_src;
							this._image.is_loaded = true;
						}

						if(u.hc(this, "selected")) {
							u.a.transition(this, "all 0.5s ease-out");
							u.rc(this, "selected");
							u.as(this, "height", "38px");

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
								u.as(_event, "height", "38px");
							}
						}
					}

					u.e.click(_event)
					u.ass(_event, {"height": "38px"})
				}
			}

			this.initDays = function() {

				this._days_list = u.qs("ul.days", this);
				this._all_days = u.ie(this._days_list, "li", {"class":"all selected","html":"Alle dage"});
				this._days = u.qsa("li", this._days_list);

				var i, day;
				for(i = 0; day = this._days[i]; i++) {

					u.linkScrambler(day);

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

				this._tags_list = u.qs(".tag_list", this);
				this._all_tags = u.ie(this._tags_list, "li", {"class":"all selected","html":"Alle"});
				this._tags = u.qsa("li", this._tags_list);

				var i, tag;
				for(i = 0; tag = this._tags[i]; i++) {

					u.linkScrambler(tag);

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
				this._search_input._default = "Skriv her"

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
			this._tag_filter._title.innerHTML = "Søg";

			this._tag_filter._title.fixed_width = true;
			u.linkScrambler(this._tag_filter._title);

			this._tag_filter._height = this._tag_filter.offsetHeight;

			u.ass(this._tag_filter, {"height" : "32px", "width" : "100px"});

			this._tag_filter._tag_list = u.qs("ul.tag_list", this._tag_filter);
			this._tag_filter._search = u.qs(".search", this._tag_filter);

			u.as(this._tag_filter._tag_list, "display", "none");
			u.as(this._tag_filter._search, "display", "none");


			this._tag_filter.open = false;

			this._tag_filter._title.clicked = function() {

				this.unscramble();

				if(!scene._tag_filter.open) {

					scene._tag_filter.transitioned = function() {

						u.as(scene._tag_filter._tag_list, "display", "block");
						u.as(scene._tag_filter._search, "display", "block");

						u.a.transition(scene._tag_filter._tag_list, "all 0.5s ease-out");
						u.as(scene._tag_filter._tag_list, "opacity", 1);

						u.a.transition(scene._tag_filter._search, "all 0.5s ease-out");
						u.as(scene._tag_filter._search, "opacity", 1);

						scene._tag_filter._title.innerHTML = "Luk";
						scene._tag_filter._title.default_text = scene._tag_filter._title.innerHTML;

					}

					u.ac(scene._tag_filter, "open");
					u.a.transition(scene._tag_filter, "all 0.5s ease-out");
					u.ass(scene._tag_filter, {"width" : "100%", "height" : scene._tag_filter._height + "px"});

					scene._tag_filter.open = true;

				} else {

					scene._tag_filter._tag_list.transitioned = function() {

						u.as(scene._tag_filter._tag_list, "display", "none");
						u.as(scene._tag_filter._search, "display", "none");

						scene._tag_filter._title.innerHTML = "Søg";
						scene._tag_filter._title.default_text = scene._tag_filter._title.innerHTML;

					}

					u.rc(scene._tag_filter, "open");

					u.a.transition(scene._tag_filter._tag_list, "all 0.5s ease-out");
					u.as(scene._tag_filter._tag_list, "opacity", 0);

					u.a.transition(scene._tag_filter._search, "all 0.5s ease-out");
					u.as(scene._tag_filter._search, "opacity", 0);

					u.a.transition(scene._tag_filter, "all 0.5s ease-out");
					u.ass(scene._tag_filter, {"width" : "100px", "height" : "32px"});

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

				var shape, svg, y2, x2;
				var svg_object = {
					"name":"event_build",
					"width":page.browser_w,
					"height":page.browser_h,
					"shapes":[]
				};

				this.svg = u.svg(svg_object);
				this.svg = u.ae(this, this.svg);
				this.svg.scene = this;



				x1 = 0;
				y1 = 0;

				x2 = page.browser_w;
				y2 = Math.round(page.browser_h/2) - 150;

				y3 = Math.round(page.browser_h/2) - 100;
				y4 = page.browser_h;

				f = page.browser_w/20;

				var points_x = [x1, x1+f,  x1+f*2, x1+f*3, x1+f*4, x1+f*5, x1+f*6, x1+f*7, x1+f*8, x1+f*9, x1+f*10, x1+f*11, x1+f*12, x1+f*13, x1+f*14, x1+f*15, x1+f*16, x1+f*17, x1+f*18, x1+f*19, x2];
				var points_y = [y2, y2+80, y2+20,  y2+170, y2+70,  y2+200, y2+120, y2+270, y2+180, y2+320,  y2+200,  y2+280,  y2+190,  y2+230,  y2+120,  y2+200,  y2+110,  y2+180,  y2+50,  y2+130,  y2];


				this.top_points = x1+","+y1+" ";
				for(i = 0; i < points_x.length; i++) {
					this.top_points += points_x[i]+","+points_y[i]+" ";
				}
				this.top_points += x2+","+y1;

				this.bottom_points = x1+","+y4+" ";
				for(i = 0; i < points_x.length; i++) {
					this.bottom_points += points_x[i]+","+points_y[i]+" ";
				}
				this.bottom_points += x2+","+y4;

				this.bottom_points2 = x1+","+y4+" ";
				for(i = 0; i < points_x.length; i++) {
					this.bottom_points2 += (points_x[i]-u.random(-10, 10))+","+points_y[i]+" ";
				}
				this.bottom_points2 += x2+","+y4;

				this.top_points2 = x1+","+y1+" ";
				for(i = 0; i < points_x.length; i++) {
					this.top_points2 += (points_x[i]-u.random(-10, 10))+","+(points_y[i]-10)+" ";
				}
				this.top_points2 += x2+","+y1;


				this._top = {"type":"polygon", "points": this.top_points};
				this._top = u.svgShape(this.svg, this._top);
				this._top.scene = this;

				this._bottom = {"type":"polygon", "points": this.bottom_points};
				this._bottom = u.svgShape(this.svg, this._bottom);
				this._bottom.scene = this;



				this.top_mid = x1+","+(y1-30)+" ";
				for(i = 0; i < points_x.length; i++) {
					this.top_mid += (points_x[i]-u.random(-10, 10))+","+(points_y[i]-30)+" ";
				}
				this.top_mid += x2+","+(y1-30);

				this.bottom_mid = x1+","+(y4+20)+" ";
				for(i = 0; i < points_x.length; i++) {
					this.bottom_mid += (points_x[i]-u.random(-10, 10))+","+(points_y[i]+20)+" ";
				}
				this.bottom_mid += x2+","+(y4+20);



				this.top_flat = x1+","+(y1-y4)+" ";
				for(i = 0; i < points_x.length; i++) {
					this.top_flat += (points_x[i]-u.random(-10, 10))+","+(points_y[i]-y4)+" ";
				}
				this.top_flat += x2+","+(y1-y4);

				this.bottom_flat = x1+","+(y4+y4)+" ";
				for(i = 0; i < points_x.length; i++) {
					this.bottom_flat += (points_x[i]-u.random(-10, 10))+","+(points_y[i]+y4)+" ";
				}
				this.bottom_flat += x2+","+(y4+y4);


				this._bottom.transitioned = function() {
					this.transitioned = null;

					this.transitioned = function() {
						this.transitioned = null;

						this.transitioned = function() {
							this.transitioned = null;
							this.scene.removeChild(this.scene.svg);
						//
						//
						// 	this.scene._top.transitioned = function() {
						//
						// 		this.transitioned = null;
						//
						// 		u.a.to(this, "all 0.5s ease-in", {"points":this.scene.top_flat});
						// 		u.a.to(this.scene._bottom, "all 0.4s ease-in", {"points":this.scene.bottom_flat});
						// 	}
						//
						// 	u.a.to(this.scene._top, "all 0.5s ease-in", {"points":this.scene.top_points2});
						//
						//
						}

						u.a.to(this.scene._top, "all 0.5s ease-in", {"points":this.scene.top_flat});
						u.a.to(this.scene._bottom, "all 0.4s ease-in", {"points":this.scene.bottom_flat});

						// u.a.to(this.scene._top, "all 0.5s ease-in", {"points":this.scene.top_points});
						// u.a.to(this, "all 0.5s ease-in", {"points":this.scene.bottom_points2});
					}

					u.a.to(this.scene._top, "all 0.8s ease-in", {"points":this.scene.top_points2});
					u.a.to(this.scene._bottom, "all 0.8s ease-in", {"points":this.scene.bottom_points2});
				}

				u.a.to(this._top, "all 0.8s ease-in", {"stroke-width":"2px"});
				u.a.to(this._bottom, "all 0.8s ease-in", {"stroke-width":"2px"});

				// u.a.to(this._top, "all 0.8s ease-out", {"points":this.top_mid});
				// u.a.to(this._bottom, "all 0.8s ease-out", {"points":this.bottom_mid});


				// u.a.transition(this, "all 1s linear");
				// u.a.setOpacity(this, 1);
				//
				// eye1 = u.svgShape(svg, {"type":"path","d":"M "+(page.browser_w/2 - 200)+" "+(page.browser_h/2 - 150)+" a 0 30 90 1 1 60 0z"});
				// eye2 = u.svgShape(svg, {"type":"path","d":"M "+(page.browser_w/2 + 200)+" "+(page.browser_h/2 - 150)+" a 0 30 90 1 1 60 0z"});
				//
				// u.a.to(eye1, "all 0.3s linear", {"d":"M "+(page.browser_w/2 - 200)+" "+(page.browser_h/2 - 150)+" a 30 30 90 1 1 60 0z"});
				// u.a.to(eye2, "all 0.2s linear", {"d":"M "+(page.browser_w/2 + 200)+" "+(page.browser_h/2 - 150)+" a 30 30 90 1 1 60 0z"});

			}
		}


		// destroy scene - scene needs to be removed
		scene.destroy = function() {
			u.bug("scene.destroy:" + u.nodeId(this))

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

			var svg_object = {
				"name":"event_build",
				"width":page.browser_w,
				"height":page.browser_h,
				"shapes":[]
			};

			this.svg = u.svg(svg_object);
			this.svg = u.ae(this, this.svg);
			this.svg.scene = this;

			this._top = {"type":"polygon", "points": this.top_flat, "stroke-width":"2px"};
			this._top = u.svgShape(this.svg, this._top);
			this._top.scene = this;

			this._bottom = {"type":"polygon", "points": this.bottom_flat, "stroke-width":"2px"};
			this._bottom = u.svgShape(this.svg, this._bottom);
			this._bottom.scene = this;

			this._bottom.transitioned = function() {
				this.transitioned = null;

				this.transitioned = function() {
					this.transitioned = null;

					this.transitioned = function() {
						this.transitioned = null;

						this.scene.finalizeDestruction();
					}
					u.a.to(this.scene._top, "all 0.5s ease-in", {"stroke-width":"0px"});
					u.a.to(this.scene._bottom, "all 0.5s ease-in", {"stroke-width":"0px"});

				}

				u.a.to(this.scene._top, "all 0.3s ease-in", {"points":this.scene.top_points});
				u.a.to(this.scene._bottom, "all 0.3s ease-in", {"points":this.scene.bottom_points});
			}

			u.a.to(this._top, "all 0.5s ease-in", {"points":this.top_points2});
			u.a.to(this._bottom, "all 0.5s ease-in", {"points":this.bottom_points2});

			// make up some page destruction
			// u.a.transition(this, "all 1s linear");
			// u.a.setOpacity(this, 0);

		}


		// scene is ready
		scene.ready();
	}
}
