/*jslint white: true, nomen: true */
(function (win) {

    'use strict';
    /*global window, document */
    /*global APP */

    win.APP.maps = win.APP.maps || {};

    win.APP.maps.skirmish_001_022 = {
        version: 1,
        "type": "skirmish",
        "size": {"width": 15, "height": 9},
        "name": "Snake",
        "name-es": "Serpiente",
        "name-ru": "Змея",
        "isOpen": true,
        "maxPlayers": 2,
        "units": [{"x": 14, "y": 1, "type": "commander", "ownerId": 1}, {
            "x": 0,
            "y": 7,
            "type": "commander",
            "ownerId": 0
        }],
        "buildings": [{"x": 6, "y": 3, "type": "farm", "state": "destroyed"}, {
            "x": 6,
            "y": 4,
            "type": "farm",
            "state": "destroyed"
        }, {"x": 8, "y": 4, "type": "farm", "state": "destroyed"}, {
            "x": 8,
            "y": 5,
            "type": "farm",
            "state": "destroyed"
        }, {"x": 1, "y": 2, "type": "farm", "state": "destroyed"}, {
            "x": 13,
            "y": 6,
            "type": "farm",
            "state": "destroyed"
        }, {"x": 5, "y": 1, "type": "castle", "state": "normal"}, {
            "x": 9,
            "y": 7,
            "type": "castle",
            "state": "normal"
        }, {"x": 0, "y": 6, "type": "farm", "state": "normal", "ownerId": 0}, {
            "x": 0,
            "y": 7,
            "type": "castle",
            "state": "normal",
            "ownerId": 0
        }, {"x": 14, "y": 2, "type": "farm", "state": "normal", "ownerId": 1}, {
            "x": 14,
            "y": 1,
            "type": "castle",
            "state": "normal",
            "ownerId": 1
        }],
        "terrain": {
            "x0y0": "water-2",
            "x0y1": "water-1",
            "x0y2": "water-1",
            "x0y3": "water-1",
            "x0y4": "water-1",
            "x0y5": "stone-1",
            "x0y6": "terra-1",
            "x0y7": "road-1",
            "x0y8": "water-1",
            "x1y0": "water-1",
            "x1y1": "water-1",
            "x1y2": "terra-1",
            "x1y3": "road-1",
            "x1y4": "road-1",
            "x1y5": "road-1",
            "x1y6": "road-1",
            "x1y7": "road-1",
            "x1y8": "water-1",
            "x2y0": "water-1",
            "x2y1": "terra-1",
            "x2y2": "road-1",
            "x2y3": "road-1",
            "x2y4": "terra-2",
            "x2y5": "hill-1",
            "x2y6": "forest-1",
            "x2y7": "stone-1",
            "x2y8": "water-1",
            "x3y0": "water-1",
            "x3y1": "forest-1",
            "x3y2": "road-1",
            "x3y3": "water-1",
            "x3y4": "water-1",
            "x3y5": "water-1",
            "x3y6": "water-1",
            "x3y7": "water-1",
            "x3y8": "water-1",
            "x4y0": "water-1",
            "x4y1": "terra-1",
            "x4y2": "road-1",
            "x4y3": "water-1",
            "x4y4": "water-1",
            "x4y5": "water-1",
            "x4y6": "water-1",
            "x4y7": "water-1",
            "x4y8": "water-2",
            "x5y0": "water-1",
            "x5y1": "road-1",
            "x5y2": "road-1",
            "x5y3": "forest-1",
            "x5y4": "terra-1",
            "x5y5": "terra-4",
            "x5y6": "terra-1",
            "x5y7": "water-1",
            "x5y8": "water-1",
            "x6y0": "water-1",
            "x6y1": "terra-5",
            "x6y2": "road-1",
            "x6y3": "terra-1",
            "x6y4": "terra-1",
            "x6y5": "hill-1",
            "x6y6": "hill-1",
            "x6y7": "forest-2",
            "x6y8": "water-1",
            "x7y0": "water-1",
            "x7y1": "forest-2",
            "x7y2": "road-1",
            "x7y3": "road-1",
            "x7y4": "road-1",
            "x7y5": "road-1",
            "x7y6": "road-1",
            "x7y7": "forest-1",
            "x7y8": "water-1",
            "x8y0": "water-1",
            "x8y1": "hill-1",
            "x8y2": "forest-1",
            "x8y3": "hill-1",
            "x8y4": "terra-1",
            "x8y5": "terra-1",
            "x8y6": "road-1",
            "x8y7": "hill-1",
            "x8y8": "water-1",
            "x9y0": "water-1",
            "x9y1": "water-1",
            "x9y2": "terra-1",
            "x9y3": "terra-1",
            "x9y4": "forest-1",
            "x9y5": "terra-1",
            "x9y6": "road-1",
            "x9y7": "road-1",
            "x9y8": "water-1",
            "x10y0": "water-2",
            "x10y1": "water-1",
            "x10y2": "water-1",
            "x10y3": "water-1",
            "x10y4": "water-1",
            "x10y5": "water-1",
            "x10y6": "road-1",
            "x10y7": "hill-1",
            "x10y8": "water-1",
            "x11y0": "water-1",
            "x11y1": "water-1",
            "x11y2": "water-1",
            "x11y3": "water-1",
            "x11y4": "water-1",
            "x11y5": "water-1",
            "x11y6": "road-1",
            "x11y7": "terra-2",
            "x11y8": "water-1",
            "x12y0": "water-1",
            "x12y1": "stone-1",
            "x12y2": "terra-5",
            "x12y3": "terra-1",
            "x12y4": "forest-2",
            "x12y5": "road-1",
            "x12y6": "road-1",
            "x12y7": "terra-1",
            "x12y8": "water-1",
            "x13y0": "water-1",
            "x13y1": "road-1",
            "x13y2": "road-1",
            "x13y3": "road-1",
            "x13y4": "road-1",
            "x13y5": "road-1",
            "x13y6": "terra-1",
            "x13y7": "water-1",
            "x13y8": "water-1",
            "x14y0": "water-1",
            "x14y1": "road-1",
            "x14y2": "terra-1",
            "x14y3": "stone-1",
            "x14y4": "water-1",
            "x14y5": "water-1",
            "x14y6": "water-1",
            "x14y7": "water-1",
            "x14y8": "water-2"
        }
    };

}(window));