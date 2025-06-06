/*jslint white: true, nomen: true */
(function (win, doc) {

	'use strict';
	/*global window, document, Dexie */ // Replaced openDatabase with Dexie
	/*global $, _, log */ // Added log for completeness if used elsewhere

	win.APP.map = {
		mapPackVersion: 4,
		squareSize: {
			min: 24,
			max: 96, // 192
			default: 48 // 24 * 2
		},
		//maxCanvasSize: 3145728 - 1, // 2048 * 768 * 2 - 1 - default version
		maxCanvasSize: 1536 * 768 * 2, // 1536 * 768 * 2 - 1
		scaleImage: function (img, scale) {

			var imgWidth = img.width,
				imgHeight = img.height,
				srcCanvas,
				srcCtx,
				srcData,
				dstCanvas,
				dstCtx,
				offset,
				x, y, r, g, b, a;

			srcCanvas = doc.createElement('canvas');
			srcCanvas.width = imgWidth;
			srcCanvas.height = imgHeight;

			srcCtx = srcCanvas.getContext('2d');
			srcCtx.drawImage(img, 0, 0);
			srcData = srcCtx.getImageData(0, 0, img.width, img.height).data;

			dstCanvas = doc.createElement('canvas');
			dstCanvas.width = imgWidth * scale;
			dstCanvas.height = imgHeight * scale;
			dstCtx = dstCanvas.getContext('2d');

			offset = 0;
			for (y = 0; y < imgHeight; y += 1) {
				for (x = 0; x < imgWidth; x += 1) {
					r = srcData[offset];
					offset += 1;
					g = srcData[offset];
					offset += 1;
					b = srcData[offset];
					offset += 1;
					a = srcData[offset] / 100;
					offset += 1;
					dstCtx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
					dstCtx.fillRect(x * scale, y * scale, scale, scale);
				}
			}

			return dstCanvas.toDataURL();

		},
		allColors: ['blue', 'red', 'green', 'black', 'gray'],
		playerColors: ['blue', 'red', 'green', 'black'],
		playerTypes: ['player', 'cpu', 'none'],
		money: [500, 750, 1000, 1500, 2000, 5000],
		unitsLimits: [10, 15, 20, 25],
		terrainTypes: ['bridge-1', 'bridge-2', 'forest-1', 'forest-2', 'hill-1', 'road-1', 'stone-1', 'stone-2', 'terra-1', 'terra-2', 'terra-3', 'terra-4', 'terra-5', 'water-1', 'water-2', 'water-3'],
		progressLength: 0,
		progress: 0,
		getTypeByTileName: function (tileName) {
			return tileName.replace(/\-\d+$/, '');
		},

		prepareTiles: function (tiles) {

			var deferred = $.Deferred(),
				promise = deferred.promise(),
				mainDeferred = $.Deferred(),
				map = this;

			function preLoadImage(src, key) {

				var deferred = $.Deferred(),
					img = new Image(),
					onImageLoad, // Declare for correct removal
					onImageError; // Declare for correct removal

				onImageLoad = function () {
					// 'this' refers to the img object
					this.removeEventListener('load', onImageLoad);
					this.removeEventListener('error', onImageError);

					try {
						var base64Scaled = win.APP.map.scaleImage(this, 4);
						tiles[key] = {
							base64: base64Scaled,
							img: this // Store the successfully loaded image object
						};
						map.recountProgress();
						deferred.resolve();
					} catch (e) {
						console.error('Error scaling image ' + src + ' for key ' + key + ':', e);
						deferred.reject(e); // Reject if scaling fails
					}
				};

				onImageError = function (event) {
					// 'this' refers to the img object
					this.removeEventListener('load', onImageLoad);
					this.removeEventListener('error', onImageError);
					console.error('Failed to load image ' + src + ' for key ' + key + '.', event);
					// Do not call recountProgress for failed images
					deferred.reject(new Error('Failed to load image: ' + src));
				};

				img.addEventListener('load', onImageLoad, false);
				img.addEventListener('error', onImageError, false);

				// Setting img.src last to ensure event listeners are attached.

				img.src = src;

				return deferred.promise();

			}

			_.each(tiles, function (src, key) {

				promise = promise.then(function () {
					return preLoadImage(src, key);
				});

			});

			promise.then(function () {
				mainDeferred.resolve();
			});

			deferred.resolve();

			return mainDeferred.promise();

		},

		preCacheImages: function () {

			var map = this,
				deferred = $.Deferred(),
				promise = deferred.promise(),
				mainDeferred = $.Deferred();

			// just preload all images
			function preLoadImage(src) {

				var deferred = $.Deferred(), // Renamed from 'deferred' to avoid conflict if any outer scope var has same name
					img = new Image(),
					onImageLoad, // Declare for correct removal
					onImageError; // Declare for correct removal

				onImageLoad = function () {
					// 'this' refers to the img object
					this.removeEventListener('load', onImageLoad);
					this.removeEventListener('error', onImageError);
					win.APP.allImagesCache[src] = this; // Use the original src path as key
					map.recountProgress();
					deferred.resolve();
				};

				onImageError = function (event) {
					// 'this' refers to the img object
					this.removeEventListener('load', onImageLoad);
					this.removeEventListener('error', onImageError);
					console.error('Failed to pre-cache image ' + src + '.', event);
					// Do not call recountProgress for failed images
					deferred.reject(new Error('Failed to pre-cache image: ' + src));
				};

				img.addEventListener('load', onImageLoad, false);
				img.addEventListener('error', onImageError, false);

				// Setting img.src last to ensure event listeners are attached.
				img.src = src;

				return deferred.promise();

			}

			_.each(win.APP.allImages, function (imgPath) {
				promise = promise.then(function () {
					return preLoadImage(imgPath);
				});
			});

			promise.then(function () {
				mainDeferred.resolve();
			});

			deferred.resolve();

			return mainDeferred.promise();

		},

		recountProgress: function () {

			this.progress += 1;
			doc.querySelector('.js-progress-bar').style.width = Math.round(this.progress / this.progressLength * 100) + '%';

		},

        preloadData: function () {

			this.progressLength = win.APP.allImages.length + _.keys(win.APP.mapTiles).length + _.keys(win.APP.mapTilesPreview).length + _.keys(win.APP.maps).length;

			// Wrap jQuery promises with Promise.resolve() to ensure a native Promise chain
			return Promise.resolve(this.prepareTiles(win.APP.mapTiles))
				.then(function () {
					// win.APP.map.prepareTiles also returns a jQuery promise
					return Promise.resolve(win.APP.map.prepareTiles(win.APP.mapTilesPreview));
				}).then(function () {
                    // win.APP.map.db.init() returns a native Promise, so it integrates directly
                    return win.APP.map.db.init();
				}).then(function () {
					// win.APP.map.preCacheImages returns a jQuery promise
                    return Promise.resolve(win.APP.map.preCacheImages());
				}).then(function () {
					return Promise.resolve(); // Ensure a resolved promise is returned
				}).catch(function (err) { // .catch will now operate on a native Promise
					console.error('[MAP PRELOAD] Error during preloadData chain:', err);
					// It's important to re-throw the error if you want calling code to know about it
					// or handle it specifically if this is the final catch.
					throw err;
				});

		},

		detectDuplicate: function () {

			//TODO: if new map -> window.APP.map.detectDuplicate();

			function getMapNames(map) {
				var mapNames = {};

				_.each(win.APP.info.availableLanguages, function (lang) {
					mapNames[lang] = map['name-' + lang] || map.name;
				});

				return mapNames;

			}

			function getTerrainArray(map) {

				var arr = [],
					terrain = map.terrain,
					width = map.size.width,
					height = map.size.height,
					x, y, lastSymbolIndex, value;

				for (x = 0; x < width; x += 1) {
					for (y = 0; y < height; y += 1) {
						value = terrain['x' + x + 'y' + y];
						lastSymbolIndex = value.lastIndexOf('-');
						arr.push(value.substr(0, lastSymbolIndex));
					}
				}

				return arr;

			}

			// get all skirmish maps
			this.db.getAllMapList().then(function (mapList) {

				_.each(mapList, function (mainMap) {

					var mainMapWidth = mainMap.size.width,
						mainMapHeight = mainMap.size.height,
						mainMapTerrain = getTerrainArray(mainMap),
						mainMapNames = getMapNames(mainMap);

					_.each(mapList, function (map) {

						if (map === mainMap) {
							return;
						}

						var mapNames = getMapNames(map),
							mapTerrain,
							theSameTerrainCount = 0,
							percent;

						 //detect the same names
						_.each(mapNames, function (name, key) {
							if ( name.trim() === mainMapNames[key].trim() ) {
								console.log('!!! - The Same Name -', name);
							}
						});

						if ( mainMapWidth === map.size.width && mainMapHeight === map.size.height ) {
							mapTerrain = getTerrainArray(map);
							_.each(mapTerrain, function (terrainType, index) {
								if (terrainType === mainMapTerrain[index]) {
									theSameTerrainCount += 1;
								}
							});
						}

						percent = Math.round(theSameTerrainCount / mainMapTerrain.length * 100);

						if (percent > 75) {
							console.log(map);
							console.log('%', percent, mapNames.en, '< = >', mainMapNames.en);
						}

					});

				});

			});

		},

		terra: {
			pathResistance: 1,
			defence: 5
		},
		road: {
			pathResistance: 1,
			defence: 0
		},
		bridge: {
			pathResistance: 1,
			defence: 0
		},
		hill: {
			pathResistance: 2,
			defence: 10
		},
		forest: {
			pathResistance: 2,
			defence: 10
		},
		stone: {
			pathResistance: 3,
			defence: 15
		},
		water: {
			pathResistance: 3,
			flowPathResistance: 1,
			defence: 0
		},

		// db
		db: {

			name: 'AE2DB',
			version: '1',
			description: 'AE2 DB',
			size: 1024 * 1024 * 15, // 1024 x 1024 x 20 = 1MB x 15 = 15MB
			db: false, // field for db
			// Use constants for table names for easier maintenance
			SKIRMISH_MAPS_TABLE: 'skirmish', // Changed from skirmishMaps to avoid conflict with property name
			MISSION_MAPS_TABLE: 'mission',   // Changed from missionMaps
			savedGame: 'savedGame',
			userMap: 'userMap',

			init: function () {
				var dbMaster = this,
					map = win.APP.map,
					info = win.APP.info,
					currentMapVersion = map.mapPackVersion,
					previousMapVersion = info.get('mapPackVersion') || 0;

				// Initialize Dexie
				dbMaster.db = new Dexie(dbMaster.name);
				// Define the schema. Version number should be incremented if schema (tables, indexes) changes.
				dbMaster.db.version(1).stores({
					[dbMaster.SKIRMISH_MAPS_TABLE]: 'jsMapKey', // jsMapKey as primary key
					[dbMaster.MISSION_MAPS_TABLE]: 'jsMapKey',
					[dbMaster.savedGame]: 'name,date',    // name as primary key, date as index
					[dbMaster.userMap]: 'jsMapKey'
				});

				// Dexie opens the database automatically on first operation or by calling db.open()
				// db.open() is not strictly necessary here if we perform operations immediately.

				return new Promise(function (resolve, reject) {
					var dbPreparationPromise;

					if (currentMapVersion > previousMapVersion) { // remove all maps
						info.set('mapPackVersion', currentMapVersion);
						// Clear the skirmishMaps table, then repopulate all maps.
						dbPreparationPromise = dbMaster.db.table(dbMaster.SKIRMISH_MAPS_TABLE).clear()
							.then(function () {
								return dbMaster.prepareDefaultMap();
							});
					} else {
						dbPreparationPromise = dbMaster.prepareDefaultMap();
					}
					dbPreparationPromise.then(resolve).catch(function(e) {
						console.error("Database initialization or map preparation failed:", e);
						reject(e);
					});
				});
			},

			prepareDefaultMap: function () {
				var maps = win.APP.maps,
					dbMaster = this,
					mapObj = win.APP.map;

				var mapKeys = _.keys(maps); // Get keys before iteration as maps object is modified
				var chain = Promise.resolve();

				mapKeys.forEach(function (jsMapKey) {
					var mapDataToProcess = maps[jsMapKey]; // Capture current map data
					if (mapDataToProcess) {
						chain = chain.then(function () {
							return dbMaster.prepareMap(mapDataToProcess, jsMapKey)
								.then(function() {
									// Cleanup and progress update after each map is processed
									if (win.APP.maps[jsMapKey]) { // Check if not already deleted
										win.APP.maps[jsMapKey] = null;
										delete win.APP.maps[jsMapKey];
									}
									mapObj.recountProgress();
								});
						});
					}
				});
				return chain;
			},

            prepareMap: function (mapDataToProcess, jsMapKey) {
                var dbMaster = this;
                var tableToUse = mapDataToProcess.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;

                return dbMaster.db.table(tableToUse).get(jsMapKey)
                    .then(function (existingMapRow) {
                        if (existingMapRow) {
                            return dbMaster.compareMap(existingMapRow, mapDataToProcess, jsMapKey);
                        } else {
                            return dbMaster.insertMap(mapDataToProcess, jsMapKey);
                        }
                    });
            },

        	compareMap: function (oldMapRow, newMapData, jsMapKey) {
				var dbMaster = this,
					oldMap = JSON.parse(oldMapRow.map), // oldMapRow is {jsMapKey, info, map} from DB
					newMapVersion = newMapData.version || 0,
					oldMapVersion = oldMap.version || 0,
					savedProperties = ['isOpen', 'isDone', 'isDoneByDifficult_easy', 'isDoneByDifficult_normal', 'isDoneByDifficult_hard'];

				if (oldMapVersion >= newMapVersion) {
					return Promise.resolve(); // No update needed
				}

				// Preserve properties by merging into newMapData before stringifying
				_.each(savedProperties, function (property) {
					if (oldMap.hasOwnProperty(property)) {
						newMapData[property] = oldMap[property];
					}
				});

				// insertMap will stringify the updated newMapData
				return dbMaster.insertMap(newMapData, jsMapKey); // This will effectively 'put' or update
			},

			insertMap: function (mapData, jsMapKey) {
				var dbMaster = this,
					info = JSON.parse(JSON.stringify(mapData)); // Create a deep copy for info

				// Remove large fields from the 'info' object to be stored
				delete info.units;
				delete info.buildings;
				delete info.terrain;

				var record = {
					jsMapKey: jsMapKey,
					info: JSON.stringify(info),
					map: JSON.stringify(mapData) // Store the full mapData object
				};

                var tableToUse = mapData.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;
				return dbMaster.db.table(tableToUse).put(record);
			},

			removeMap: function (data) {
				var dbMaster = this,
					type = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE,
					jsMapKey = data.jsMapKey;

				return dbMaster.db.table(type).delete(jsMapKey).catch(function() {
					return Promise.resolve(); // Resolve even if delete fails (e.g., item not found)
				});
			},

			removeSave: function (name) {
				var dbMaster = this;
				return dbMaster.db.table(dbMaster.savedGame).delete(name).catch(function() {
					return Promise.resolve();
				});
			},

			getMapsInfo: function (data) {
				data = data || {};
				var dbMaster = this,
					mapsInfo = {};
				data.type = data.type || dbMaster.SKIRMISH_MAPS_TABLE;
                var tableToUse = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;

				return dbMaster.db.table(tableToUse).orderBy('jsMapKey').toArray()
					.then(function (results) {
						results.forEach(function (row) {
							mapsInfo[row.jsMapKey] = JSON.parse(row.info);
						});
						return mapsInfo;
					});
			},

			getMapInfo: function (data) {
				data = data || {};
				var dbMaster = this;
				data.type = data.type || dbMaster.SKIRMISH_MAPS_TABLE;
                var tableToUse = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;

				return dbMaster.db.table(tableToUse).get(data.jsMapKey)
					.then(function (row) {
						if (row) {
							return JSON.parse(row.info);
						}
						return null; // Or throw an error if map not found is unexpected
					});
			},

			getMap: function (data) {
				data = data || {};
				var dbMaster = this;
				data.type = data.type || dbMaster.SKIRMISH_MAPS_TABLE;
                var tableToUse = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;

				return dbMaster.db.table(tableToUse).get(data.jsMapKey)
					.then(function (row) {
						if (row && row.map) { // Check if row and row.map exist
							try {
								var parsedMap = JSON.parse(row.map);
								// console.log('[getMap] Successfully parsed map:', data.jsMapKey); // Optional: for successful parsing
								return parsedMap;
							} catch (e) {
								console.error('[getMap] Failed to parse map data from DB for jsMapKey: ' + data.jsMapKey, e);
								console.error('[getMap] Problematic map string for ' + data.jsMapKey + ':', row.map);
								// Reject the promise so the caller's .catch() is triggered
								return Promise.reject(new Error('Parse failed for map ' + data.jsMapKey + ': ' + e.message));
							}
						}
						// If row is null, or row.map is null/undefined, map is not found or data is incomplete.
						console.warn('[getMap] Map data not found or incomplete in DB for jsMapKey: ' + data.jsMapKey + '. Row:', row);
						return null; // Map not found or incomplete, resolve with null
					})
					.catch(function(err){ // Catch errors from Dexie .get() or from the Promise.reject in the .then() block
						console.error('[getMap] Error during getMap operation for ' + data.jsMapKey + ':', err);
						throw err; // Re-throw the error to be handled by the caller's .catch()
					});
			},

			getMapList: function (data) {
				// This function seems identical to getMapsInfo, can be aliased or removed if so.
				// Assuming it's meant to be the same for now.
				data = data || {};
				var dbMaster = this;
				data.type = data.type || dbMaster.SKIRMISH_MAPS_TABLE;
				return dbMaster.getMapsInfo(data); // Re-use getMapsInfo
			},

			getAllMapList: function (data) {
				data = data || {};
				var dbMaster = this;
				data.type = data.type || dbMaster.SKIRMISH_MAPS_TABLE;
                var tableToUse = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;

				return dbMaster.db.table(tableToUse).orderBy('jsMapKey').toArray()
					.then(function (results) {
						var mapsData = {};
						results.forEach(function (row) {
							mapsData[row.jsMapKey] = JSON.parse(row.map);
						});
						return mapsData;
					});
			},

			openMap: function (openMaps) {
				var dbMaster = this;
				_.each(openMaps, function (mapData) {
					dbMaster.getMap(mapData).then(function (map) {
						if (map) {
							map.isOpen = true;
							// insertMap now uses 'put' which handles update
							return dbMaster.insertMap(map, mapData.jsMapKey);
						}
					});
				});
			},

			setMapDone: function (mapData) {
				var dbMaster = this,
					difficultLevel = win.APP.info.get('difficult');

				dbMaster.getMap(mapData).then(function (map) {
					if (map) {
						map.isDone = true;
						map['isDoneByDifficult_' + difficultLevel] = true;
						// insertMap now uses 'put' which handles update
						return dbMaster.insertMap(map, mapData.jsMapKey);
					}
				});
			},

			saveGame: function (date, name, data) {
				var dbMaster = this;

				// Sanitize briefing data as in original
				_.each(data.map, function (value, key) {
					if (!/briefing/i.test(key)) { // save briefing only
						return;
					}
					_.each(value, function (briefing) {
						// detect onShow
						if (briefing.onShow && briefing.onShow.context && briefing.onShow.default_context) {
							briefing.onShow.context = briefing.onShow.default_context;
						}

						// detect onHide
						if (briefing.onHide && briefing.onHide.context && briefing.onHide.default_context) {
							briefing.onHide.context = briefing.onHide.default_context;
						}
					});
				});

				var record = {
					name: name, // primary key
					date: date,
					game: JSON.stringify(data)
				};
				return dbMaster.db.table(dbMaster.savedGame).put(record);
			},

			getSavedGames: function () {
				var dbMaster = this;
				return dbMaster.db.table(dbMaster.savedGame)
					.orderBy('date')
					.reverse() // Dexie sorts ascending by default, then reverse for DESC
					.toArray()
					.then(function (results) {
						return results.map(function (row) {
							return row.name;
						});
					});
			},

			getSavedGame: function (gameName) {
				var dbMaster = this;
				return dbMaster.db.table(dbMaster.savedGame).get(gameName);
				// This will return the game object or undefined if not found.
				// The original returned results.rows.item(0) which could be null.
				// Dexie's get returns undefined for no match, which is fine.
			},

			mapIsExist: function (data) {
				var dbMaster = this;
                var tableToUse = data.type === dbMaster.SKIRMISH_MAPS_TABLE ? dbMaster.SKIRMISH_MAPS_TABLE : dbMaster.MISSION_MAPS_TABLE;
				return dbMaster.db.table(tableToUse).get(data.jsMapKey)
					.then(function (result) {
						return Boolean(result);
					});
			}

		}

	};

}(window, window.document));