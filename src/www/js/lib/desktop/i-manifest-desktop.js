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
			u.bug("scene.ready:" + u.nodeId(this));


			page.resized();

			this.is_ready = true;
			page.cN.ready();
		}



		// build scene - start actual rendering of scene
		scene.build = function() {

			if(!this.is_built) {
				u.bug("scene.build:" + u.nodeId(this));

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


			this.finalizeDestruction = function() {

				this.parentNode.removeChild(this);
				page.cN.ready();

			}


			this.transitioned = function() {

				// do actual destroy rendering
				this.finalizeDestruction();
			}

			u.a.transition(this, "all 1s linear");
			u.a.setOpacity(this, 1);

		}


		// scene is ready
		scene.ready();
	}
}
