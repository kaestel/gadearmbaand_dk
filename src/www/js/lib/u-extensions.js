// scramble text in buttons
u.linkScrambler = function(link) {
	u.bug("linkScrambler:" + u.nodeId(link, true));

	link.default_text = link.innerHTML;
	link.scrambled_count = 0;
	link.randomizer = function() {
//		u.bug("randomizer")

		var indexes = [];
//		var chars = [];
		var rand;
		while(indexes.length < this.scrambled_sequence.length/2) {

			rand = u.random(0, this.scrambled_sequence.length-1);
			if(indexes.indexOf(rand) == -1) {
				indexes.push(rand);
//				chars.push(this.scrambled_sequence[rand]);
			}

		}
//		return [chars, indexes];
		return indexes;
	}

	link.scramble = function() {
//		u.bug("scramble")

//		this.scrambled_sequence = this.innerHTML.split("");
		var indexes = this.randomizer();
		u.bug("indexes:" + indexes.join("#"));


		if(this.scrambled_count < 7) {

			var a, b, c, d;

			while(indexes.length > 1) {
				ia = u.random(0, indexes.length-1);
				ca = indexes[ia];
				indexes.splice(ia, 1);

				ib = u.random(0, indexes.length-1);
				cb = indexes[ib];
				indexes.splice(ib, 1);

//				u.bug("switch:" + ca + " with " + cb);

				c = this.scrambled_sequence[ca];
				d = this.scrambled_sequence[cb];

				u.bug("switch:" + ca + "("+c+")" + " with " + cb + "("+d+")");

				this.scrambled_sequence[ca] = d;
				this.scrambled_sequence[cb] = c;

				// index = c[1].splice([u.random(0, c[1].length-1)], 1);
				// char = c[0].splice([u.random(0, c[0].length-1)], 1);
				//
				// this.scrambled_sequence[index] = char;
			}
			this.innerHTML = this.scrambled_sequence.join("");

			this.scrambled_count++;
			this.t_scrambler = u.t.setTimer(this, this.scramble, 50);
		}
		else {
			this.innerHTML = this.default_text;
		}

	}
	link.unscramble = function() {
		u.bug("unscramble")

		u.t.resetTimer(this.t_scrambler);
		this.innerHTML = this.default_text;
		if(!this.fixed_width) {
			u.as(this, "width", "auto");
		}
		this.scrambled_count = 0;
	}

	link.mousedover = function() {
//		u.bug("mouseover scramble")
		u.t.resetTimer(this.t_unscrambler);

		if(!this.scrambled_count) {

			this.default_text = this.innerHTML;
			this.scrambled_sequence = this.default_text.split("");

			if(!this.fixed_width) {
				u.as(this, "width", u.actualWidth(this) + "px");
			}
			this.scramble();
		}
	}
	link.mousedout = function() {
//		u.bug("mouseout scramble")

		u.t.resetTimer(this.t_unscrambler);
		this.t_unscrambler = u.t.setTimer(this, "unscramble", 100);
	}


	if(u.e.event_pref == "mouse") {
		u.e.addEvent(link, "mouseover", link.mousedover);
		u.e.addEvent(link, "mouseout", link.mousedout);
	}
	else {
		u.e.addEvent(link, "touchstart", link.mousedover);
		u.e.addEvent(link, "touchend", link.mousedout);
	}

}
