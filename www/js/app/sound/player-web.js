/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window */
	/*global */

	win.APP.soundMaster = win.APP.soundMaster || {};

	win.APP.soundMaster.webPlayer = {

		roads: new Array(4),

		pathPrefix: 'sounds/',

		init: function () {

			var player = this;

			player.roads = _.map(player.roads, function () {
				return new Audio();
			});

		},

		play: function (data) {

			var player = this,
				roadNumber = data.road,
				isLoop = data.isLoop,
				sound = data.sound,
				newAudio;

			player.stop(data);

			newAudio = new Audio();
			if (isLoop) {
				newAudio.addEventListener('ended', function() {
					if ( win.APP.info.get('music') === 'off' ) {
						return;
					}
					var audio = this;
					audio.currentTime = 0;
					audio.play();
				}, false);
			}

			newAudio.addEventListener('canplay', function () {
				var audio = this; // 'this' refers to newAudio
				if ( win.APP.info.get('music') === 'off' ) {
					return;
				}

				// Attempt to play the audio. This returns a Promise.
				var playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.catch(function(error) {
						// console.warn('WebPlayer: audio.play() was prevented for sound: ' + (audio.src || data.sound), error);
						// This catch is important. It prevents an unhandled promise rejection
						// from stopping other JavaScript, such as navigation.
					});
				}
			});

			player.roads[roadNumber].src = '';
			player.roads[roadNumber] = newAudio;

			newAudio.src = player.pathPrefix + sound;

		},

		stop: function (data) {

			var player = this,
				roadNumber = data.road,
				road = player.roads[roadNumber];

			if (road && road.pause) {
				road.pause();
			}

			if (road && road.currentTime && road.currentTime < 0.1) {
				road.currentTime = 0;
			}

		}

	}

}(window));