/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window */
	/*global */

	win.APP = win.APP || {};

	var soundMaster;

	soundMaster = {

		userHasInteracted: false,

		init: function () {

			var soundMaster = this;

			soundMaster.initPlayers();

			// Listener for hash changes to play appropriate BG sound
			win.addEventListener('hashchange', soundMaster.playBgSound.bind(soundMaster), false);

			// Add a one-time event listener for the first user interaction
			var firstInteractionHandler = function() {
				if (!soundMaster.userHasInteracted) {
					soundMaster.userHasInteracted = true;
					// console.log('SoundMaster: User interaction detected.');
					// Attempt to play background sound now that interaction has occurred
					// Check if a BG sound was deferred and play it
					var pendingBgSoundData = soundMaster.roads[0]; // road 0 is for BG music
					if (pendingBgSoundData && pendingBgSoundData.sound && win.APP.info.get('music') === 'on') {
						// console.log('SoundMaster: Playing deferred BG music.');
						soundMaster.roads[0] = {}; // Temporarily clear the state to bypass the "same sound" check in play()
						soundMaster.play(pendingBgSoundData); // Now play it
					}
					// Remove this listener as it's only needed once
					['click', 'touchend', 'mousedown', 'keydown'].forEach(function(eventName) {
						win.removeEventListener(eventName, firstInteractionHandler, true);
					});
				}
			};

			['click', 'touchend', 'mousedown', 'keydown'].forEach(function(eventName) {
				win.addEventListener(eventName, firstInteractionHandler, true);
			});
		},

		roads: [{}, {}, {}, {}], // 4 roads

		initPlayers: function () {

			// todo: detect player type here (web, android, iOS)

			var soundMaster = this,
				isAndroidPlayer = win.AndAud_0,
				isIosPlayer = win.Media, // detect cordova Media
				player;

			if (isAndroidPlayer) {
				player = win.APP.soundMaster.androidPlayer;
			}

			if (isIosPlayer) {
				player = win.APP.soundMaster.iosPlayer;
			}

			player = player || win.APP.soundMaster.webPlayer; // get system player or use web player

			player.init();

			soundMaster.player = player;

		},

		getPlayer: function () {
			return this.player;
		},

		playBgSound: function () {

			var soundMaster = this,
				gbSound = soundMaster.getCurrentBgSound();

			if (!gbSound) { // If no current BG sound for this route
				// Stop existing BG sound if route changes to one with no music
				if (soundMaster.roads[0] && soundMaster.roads[0].sound) {
					soundMaster.stop({ road: 0 });
					soundMaster.roads[0] = {}; // Clear the state for BG music
				}
				return;
			}

			// The play method will handle deferring if userHasInteracted is false
			soundMaster.play({
				sound: gbSound,
				isLoop: true,
				road: 0
			});

		},

		getCurrentBgSound: function () {

			var state = Backbone.history.fragment;

			switch (state) {

				case '':
				case 'play':
				case 'select-level':
				case 'skirmish-select-map':
					return 'main-theme.mp3'; // file name main-theme.mp3

			}

			// if false - do not anything
			return false;

		},

		play: function (data) {

			var soundMaster = this,
				player = soundMaster.getPlayer(),
				prevState = soundMaster.roads[data.road],
				curStr = JSON.stringify(data);

			//save arguments for - do not start play the same sound
			// if (curStr === JSON.stringify(prevState) && data.isLoop) {
				// This check can prevent deferred sounds from playing.
				// The player.play() method itself handles replacing/restarting.
				// return;
			// }

			if (win.APP.info.get('music') === 'off') {
				soundMaster.stop(data); // Ensure player stops
				soundMaster.roads[data.road] = {}; // Clear state
				return;
			}

			// Defer background music (road 0) if user hasn't interacted yet
			if (data.road === 0 && !soundMaster.userHasInteracted) {
				// console.log('SoundMaster: User has not interacted yet. BG music (road 0) deferred.');
				soundMaster.roads[data.road] = JSON.parse(curStr); // Store to play later
				return; // IMPORTANT: Return here to prevent further processing until interaction
			}

			soundMaster.roads[data.road] = JSON.parse(curStr);
			player.play(data);

		},

		stop: function (data) {

			var soundMaster = this,
				player = soundMaster.getPlayer();

			player.stop(data);

		},

		stopBgSound: function () {

			var soundMaster = this,
				state = soundMaster.roads[0]; // 0 is bg sound

			soundMaster.stop(state);

		},

		restoreBgSound: function () {

			var soundMaster = this,
				stateToRestore = JSON.parse(JSON.stringify(soundMaster.roads[0])); // Get current state for road 0

			// If music is off, or no state, or no sound in state, do nothing
			if (win.APP.info.get('music') === 'off' || !stateToRestore || !stateToRestore.sound) {
				return;
			}

			soundMaster.roads[0] = {}; // Wipe previous state to force play() to proceed if sound is the same
			soundMaster.play(stateToRestore);

		}

	};

	win.APP.soundMaster = soundMaster;

}(window));