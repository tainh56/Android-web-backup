/*jslint white: true, nomen: true */
(function (win) {

	'use strict';
	/*global window, document */
	/*global APP */

	win.APP.maps = win.APP.maps || {};

	win.APP.maps.skirmish_001_064 = {
		"type": "skirmish",
		"size": {"width": 16, "height": 16},
		"name": "The forever war",
		"name-es": "La guerra interminable",
		"name-ru": "Вечная война",
		"isOpen": true,
		"maxPlayers": 4,
		"units": [{"x": 1, "y": 1, "type": "commander", "ownerId": 0}, {"x": 14, "y": 14, "type": "commander", "ownerId": 1}, {"x": 1, "y": 14, "type": "commander", "ownerId": 2}, {"x": 14, "y": 1, "type": "commander", "ownerId": 3}],
		"buildings": [{"x": 7, "y": 7, "type": "farm", "state": "normal"}, {"x": 8, "y": 7, "type": "farm", "state": "normal"}, {"x": 8, "y": 8, "type": "farm", "state": "normal"}, {"x": 7, "y": 8, "type": "farm", "state": "normal"}, {"x": 14, "y": 12, "type": "farm", "state": "normal"}, {"x": 12, "y": 14, "type": "farm", "state": "normal"}, {"x": 3, "y": 14, "type": "farm", "state": "normal"}, {"x": 1, "y": 12, "type": "farm", "state": "normal"}, {"x": 7, "y": 10, "type": "farm", "state": "normal"}, {"x": 8, "y": 5, "type": "farm", "state": "normal"}, {"x": 10, "y": 8, "type": "farm", "state": "normal"}, {"x": 5, "y": 7, "type": "farm", "state": "normal"}, {"x": 7, "y": 5, "type": "castle", "state": "normal"}, {"x": 10, "y": 7, "type": "castle", "state": "normal"}, {"x": 8, "y": 10, "type": "castle", "state": "normal"}, {"x": 5, "y": 8, "type": "castle", "state": "normal"}, {"x": 3, "y": 1, "type": "farm", "state": "normal"}, {"x": 1, "y": 3, "type": "farm", "state": "normal"}, {"x": 12, "y": 1, "type": "farm", "state": "normal"}, {"x": 14, "y": 3, "type": "farm", "state": "normal"}, {"x": 1, "y": 1, "type": "castle", "state": "normal", "ownerId": 0}, {
			"x": 14,
			"y": 14,
			"type": "castle",
			"state": "normal",
			"ownerId": 1
		}, {"x": 1, "y": 14, "type": "castle", "state": "normal", "ownerId": 2}, {"x": 14, "y": 1, "type": "castle", "state": "normal", "ownerId": 3}],
		"terrain": {
			"x0y6": "water-1",
			"x0y7": "stone-1",
			"x0y8": "stone-1",
			"x0y9": "water-1",
			"x0y10": "water-1",
			"x0y11": "water-1",
			"x0y12": "water-1",
			"x0y13": "stone-1",
			"x0y14": "stone-1",
			"x0y15": "stone-1",
			"x1y6": "water-1",
			"x1y7": "stone-1",
			"x1y8": "stone-1",
			"x1y9": "water-1",
			"x1y10": "water-1",
			"x1y11": "water-1",
			"x1y12": "terra-1",
			"x1y13": "road-1",
			"x1y14": "road-1",
			"x1y15": "stone-1",
			"x2y6": "water-1",
			"x2y7": "water-1",
			"x2y8": "water-1",
			"x2y9": "water-1",
			"x2y10": "water-1",
			"x2y11": "forest-2",
			"x2y12": "road-1",
			"x2y13": "road-1",
			"x2y14": "road-1",
			"x2y15": "stone-1",
			"x3y6": "water-1",
			"x3y7": "water-1",
			"x3y8": "water-1",
			"x3y9": "water-1",
			"x3y10": "hill-1",
			"x3y11": "road-1",
			"x3y12": "road-1",
			"x3y13": "road-1",
			"x3y14": "terra-1",
			"x3y15": "water-1",
			"x4y6": "hill-1",
			"x4y7": "forest-2",
			"x4y8": "stone-1",
			"x4y9": "forest-2",
			"x4y10": "road-1",
			"x4y11": "road-1",
			"x4y12": "road-1",
			"x4y13": "hill-1",
			"x4y14": "water-1",
			"x4y15": "water-1",
			"x5y6": "road-1",
			"x5y7": "terra-1",
			"x5y8": "road-1",
			"x5y9": "road-1",
			"x5y10": "road-1",
			"x5y11": "road-1",
			"x5y12": "stone-1",
			"x5y13": "water-1",
			"x5y14": "water-1",
			"x5y15": "water-1",
			"x6y6": "road-1",
			"x6y7": "road-1",
			"x6y8": "road-1",
			"x6y9": "road-1",
			"x6y10": "road-1",
			"x6y11": "hill-1",
			"x6y12": "water-1",
			"x6y13": "water-1",
			"x6y14": "water-1",
			"x6y15": "water-1",
			"x7y6": "road-1",
			"x7y7": "terra-1",
			"x7y8": "terra-1",
			"x7y9": "road-1",
			"x7y10": "terra-1",
			"x7y11": "stone-1",
			"x7y12": "water-1",
			"x7y13": "water-1",
			"x7y14": "stone-1",
			"x7y15": "stone-1",
			"x8y6": "road-1",
			"x8y7": "terra-1",
			"x8y8": "terra-1",
			"x8y9": "road-1",
			"x8y10": "road-1",
			"x8y11": "stone-1",
			"x8y12": "water-1",
			"x8y13": "water-1",
			"x8y14": "stone-1",
			"x8y15": "stone-1",
			"x9y6": "road-1",
			"x9y7": "road-1",
			"x9y8": "road-1",
			"x9y9": "road-1",
			"x9y10": "road-1",
			"x9y11": "hill-1",
			"x9y12": "water-1",
			"x9y13": "water-1",
			"x9y14": "water-1",
			"x9y15": "water-1",
			"x10y6": "road-1",
			"x10y7": "road-1",
			"x10y8": "terra-1",
			"x10y9": "road-1",
			"x10y10": "road-1",
			"x10y11": "road-1",
			"x10y12": "forest-2",
			"x10y13": "water-1",
			"x10y14": "water-1",
			"x10y15": "water-1",
			"x0y5": "water-1",
			"x1y5": "water-1",
			"x2y5": "water-1",
			"x3y5": "stone-1",
			"x4y5": "road-1",
			"x5y5": "road-1",
			"x6y5": "road-1",
			"x7y5": "road-1",
			"x8y5": "terra-1",
			"x9y5": "road-1",
			"x10y5": "road-1",
			"x0y4": "water-1",
			"x1y4": "water-1",
			"x2y4": "hill-1",
			"x3y4": "road-1",
			"x4y4": "road-1",
			"x5y4": "road-1",
			"x6y4": "stone-1",
			"x7y4": "hill-1",
			"x8y4": "stone-1",
			"x9y4": "forest-2",
			"x10y4": "road-1",
			"x0y3": "water-1",
			"x1y3": "terra-1",
			"x2y3": "road-1",
			"x3y3": "road-1",
			"x4y3": "road-1",
			"x5y3": "forest-2",
			"x6y3": "water-1",
			"x7y3": "water-1",
			"x8y3": "water-1",
			"x9y3": "water-1",
			"x10y3": "stone-1",
			"x0y2": "stone-1",
			"x1y2": "road-1",
			"x2y2": "road-1",
			"x3y2": "road-1",
			"x4y2": "stone-1",
			"x5y2": "water-1",
			"x6y2": "water-1",
			"x7y2": "water-1",
			"x8y2": "water-1",
			"x9y2": "water-1",
			"x10y2": "water-1",
			"x0y1": "stone-1",
			"x1y1": "road-1",
			"x2y1": "road-1",
			"x3y1": "terra-1",
			"x4y1": "water-1",
			"x5y1": "water-1",
			"x6y1": "water-1",
			"x7y1": "stone-1",
			"x8y1": "stone-1",
			"x9y1": "water-1",
			"x10y1": "water-1",
			"x0y0": "stone-1",
			"x1y0": "stone-1",
			"x2y0": "stone-1",
			"x3y0": "water-1",
			"x4y0": "water-1",
			"x5y0": "water-1",
			"x6y0": "water-1",
			"x7y0": "stone-1",
			"x8y0": "stone-1",
			"x9y0": "water-1",
			"x10y0": "water-1",
			"x11y0": "water-1",
			"x11y1": "water-1",
			"x11y2": "stone-1",
			"x11y3": "road-1",
			"x11y4": "road-1",
			"x11y5": "road-1",
			"x11y6": "hill-1",
			"x11y7": "hill-1",
			"x11y8": "hill-1",
			"x11y9": "forest-2",
			"x11y10": "road-1",
			"x11y11": "road-1",
			"x11y12": "road-1",
			"x11y13": "stone-1",
			"x11y14": "water-1",
			"x11y15": "water-1",
			"x12y0": "water-1",
			"x12y1": "terra-1",
			"x12y2": "road-1",
			"x12y3": "road-1",
			"x12y4": "road-1",
			"x12y5": "hill-1",
			"x12y6": "water-1",
			"x12y7": "water-1",
			"x12y8": "water-1",
			"x12y9": "water-1",
			"x12y10": "stone-1",
			"x12y11": "road-1",
			"x12y12": "road-1",
			"x12y13": "road-1",
			"x12y14": "terra-1",
			"x12y15": "water-1",
			"x13y0": "stone-1",
			"x13y1": "road-1",
			"x13y2": "road-1",
			"x13y3": "road-1",
			"x13y4": "forest-2",
			"x13y5": "water-1",
			"x13y6": "water-1",
			"x13y7": "water-1",
			"x13y8": "water-1",
			"x13y9": "water-1",
			"x13y10": "water-1",
			"x13y11": "forest-2",
			"x13y12": "road-1",
			"x13y13": "road-1",
			"x13y14": "road-1",
			"x13y15": "stone-1",
			"x14y0": "stone-1",
			"x14y1": "road-1",
			"x14y2": "road-1",
			"x14y3": "terra-1",
			"x14y4": "water-1",
			"x14y5": "water-1",
			"x14y6": "water-1",
			"x14y7": "stone-1",
			"x14y8": "stone-1",
			"x14y9": "water-1",
			"x14y10": "water-1",
			"x14y11": "water-1",
			"x14y12": "terra-1",
			"x14y13": "road-1",
			"x14y14": "road-1",
			"x14y15": "stone-1",
			"x15y0": "stone-1",
			"x15y1": "stone-1",
			"x15y2": "stone-1",
			"x15y3": "water-1",
			"x15y4": "water-1",
			"x15y5": "water-1",
			"x15y6": "water-1",
			"x15y7": "stone-1",
			"x15y8": "stone-1",
			"x15y9": "water-1",
			"x15y10": "water-1",
			"x15y11": "water-1",
			"x15y12": "water-1",
			"x15y13": "stone-1",
			"x15y14": "stone-1",
			"x15y15": "stone-1"
		}
	};

}(window));