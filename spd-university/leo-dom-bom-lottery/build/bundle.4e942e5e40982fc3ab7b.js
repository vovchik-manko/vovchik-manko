/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _style = __webpack_require__(10);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _utils = __webpack_require__(14);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _paintHeader = __webpack_require__(15);
	
	var _paintHeader2 = _interopRequireDefault(_paintHeader);
	
	var _paintButton = __webpack_require__(17);
	
	var _paintButton2 = _interopRequireDefault(_paintButton);
	
	var _paintBalls = __webpack_require__(18);
	
	var _paintTicket = __webpack_require__(19);
	
	var _paintTicket2 = _interopRequireDefault(_paintTicket);
	
	var _paintWinners = __webpack_require__(20);
	
	var _paintWinners2 = _interopRequireDefault(_paintWinners);
	
	var _selectItem = __webpack_require__(21);
	
	var _selectItem2 = _interopRequireDefault(_selectItem);
	
	var _players = __webpack_require__(22);
	
	var _players2 = _interopRequireDefault(_players);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var container = document.createElement('div'),
	    div = document.createElement('div'),
	    playersContainer = document.createElement('div'),
	    ticketContainer = document.createElement('div'),
	    startButton = (0, _paintButton2.default)('start game'),
	    header = (0, _paintHeader2.default)();
	
	container.className = 'balls-result-container';
	playersContainer.className = 'players-container';
	ticketContainer.className = 'ticket-container';
	
	div.classList.add('header__balls-result-container');
	div.appendChild(container);
	
	document.body.appendChild(ticketContainer);
	
	header.logoContainer.appendChild(startButton);
	header.appendChild(div);
	
	var HORSESHOE_COUNT = 2,
	    MAX_NUMBER = 75,
	    HORSESHOE = 'HORSESHOE';
	
	var cutRandomElement = function cutRandomElement(obj) {
	    return obj.splice(randomInt(0, obj.length - 1), 1)[0];
	};
	
	var randomInt = function randomInt(from, to) {
	    return Math.round(Math.random() * (to - from) + from);
	};
	
	var createTicket = function createTicket() {
	    return new Array(3).fill(0).map(function () {
	        var field = new Array(5).fill(0).map(function () {
	            return [];
	        }),
	            shoes = [];
	
	        var _loop = function _loop(i) {
	            var shoe = void 0;
	            do {
	                shoe = randomInt(0, 24);
	            } while (shoes.some(function (item) {
	                return item % 5 == shoe % 5;
	            }));
	
	            shoes.push(shoe);
	        };
	
	        for (var i = 0; i < HORSESHOE_COUNT; i++) {
	            _loop(i);
	        }
	
	        var _loop2 = function _loop2(col) {
	            var numbers = new Array(15).fill(0).map(function (v, i) {
	                return col * 15 + 1 + i;
	            });
	
	            var _loop3 = function _loop3(row) {
	                field[row].push(shoes.some(function (item) {
	                    return item === col * 5 + row;
	                }) ? HORSESHOE : cutRandomElement(numbers));
	            };
	
	            for (var row = 0; row < 5; row++) {
	                _loop3(row);
	            }
	        };
	
	        for (var col = 0; col < 5; col++) {
	            _loop2(col);
	        }
	
	        return field;
	    });
	};
	
	// helpers
	
	var printWinner = function printWinner(game) {
	    var winner = (0, _paintWinners2.default)(_players2.default[game.playerId]);
	
	    winner.addEventListener('click', function (event) {
	        (0, _selectItem2.default)(event, (0, _paintTicket2.default)(game));
	    });
	
	    return winner;
	};
	
	var rowDoesNotContainHorseShoe = function rowDoesNotContainHorseShoe(row) {
	    return row.every(function (item) {
	        return item != HORSESHOE;
	    });
	};
	
	var empty = function empty(row) {
	    return !row.length;
	};
	
	var getFieldsCountWithEmptyRows = function getFieldsCountWithEmptyRows(n) {
	    return function (game) {
	        return game.progress.filter(function (field) {
	            return field.filter(empty).length == n;
	        }).length;
	    };
	};
	
	var fiveOrMoreEmptyRows = function fiveOrMoreEmptyRows(game) {
	    return game.progress.reduce(function (memo, field) {
	        return field.filter(empty).length + memo;
	    }, 0) >= 5;
	};
	
	var hasThreeRowsWithHorseShoe = function hasThreeRowsWithHorseShoe(n) {
	    return function (game) {
	        return game.progress.filter(function (field, fieldNumber) {
	            return field.filter(empty).length == 3 && field.filter(function (row, rowNumber) {
	                return !row.length && rowDoesNotContainHorseShoe(game.ticket[fieldNumber][rowNumber]);
	            }).length == 3 - n;
	        }).length;
	    };
	};
	
	var printGroup = function printGroup(text, insideFunction) {
	    var ulGroup = document.createElement('ul'),
	        ulGroupTitle = document.createElement('h4');
	
	    ulGroupTitle.textContent = text;
	    ulGroupTitle.className = 'winners-list__title';
	
	    ulGroup.className = 'winners-list';
	    ulGroup.appendChild(ulGroupTitle);
	
	    insideFunction(ulGroup);
	    _utils2.default.appendFragment(playersContainer, ulGroup);
	};
	
	// progress!
	
	var playGame = function playGame() {
	    container.innerHTML = '';
	    playersContainer.innerHTML = '';
	    ticketContainer.innerHTML = '';
	
	    var games = Object.keys(_players2.default).map(function (playerId) {
	        var ticket = createTicket();
	
	        return {
	            playerId: playerId,
	            ticket: ticket,
	            progress: ticket.map(function (field) {
	                return field.map(function (row) {
	                    return row.filter(function (item) {
	                        return item != HORSESHOE;
	                    });
	                });
	            })
	        };
	    });
	
	    var balls = new Array(MAX_NUMBER).fill(0).map(function (v, i) {
	        return i + 1;
	    });
	
	    var firstRowCrossed = false,
	        playedBalls = [];
	
	    var _loop4 = function _loop4() {
	        var ball = cutRandomElement(balls);
	        playedBalls.push(ball);
	
	        // Remove crossed number
	        games.forEach(function (game) {
	            game.progress = game.progress.map(function (field) {
	                return field.map(function (row) {
	                    return row.filter(function (number) {
	                        return number != ball;
	                    });
	                });
	            });
	        });
	
	        // looking for somebody who crossed first row
	        if (!firstRowCrossed && playedBalls.length >= 3) {
	            (function () {
	                var firstRowsWinners = games.filter(function (game) {
	                    return getFieldsCountWithEmptyRows(1)(game);
	                });
	
	                if (firstRowsWinners.length > 0) {
	                    printGroup('First row crossed!', function (parent) {
	
	                        _utils2.default.appendFragment(container, (0, _paintBalls.paintBallsTitle)(playedBalls, 'First row crossed!'), (0, _paintBalls.paintBalls)(playedBalls));
	
	                        firstRowsWinners.forEach(function (game) {
	                            return parent.appendChild(printWinner(game));
	                        });
	                    });
	                    firstRowCrossed = true;
	                }
	            })();
	        }
	    };
	
	    do {
	        _loop4();
	    } while (balls.length > 0 && games.filter(function (game) {
	        return getFieldsCountWithEmptyRows(3)(game) || fiveOrMoreEmptyRows(game);
	    }).length == 0);
	
	    _utils2.default.appendFragment(container, (0, _paintBalls.paintBallsTitle)(playedBalls), (0, _paintBalls.paintBalls)(playedBalls));
	
	    [{
	        name: 'Jackpot',
	        checker: function checker(game) {
	            return hasThreeRowsWithHorseShoe(0)(game) || fiveOrMoreEmptyRows(game);
	        }
	    }, {
	        name: 'First Category',
	        checker: hasThreeRowsWithHorseShoe(1)
	    }, {
	        name: 'Second Category',
	        checker: hasThreeRowsWithHorseShoe(2)
	    }, {
	        name: 'Third Category',
	        checker: function checker(game) {
	            return getFieldsCountWithEmptyRows(2)(game) > 0;
	        }
	    }, {
	        name: 'Forth Category',
	        checker: function checker(game) {
	            return getFieldsCountWithEmptyRows(1)(game) > 1;
	        }
	    }, {
	        name: 'Fifth Category',
	        checker: function checker(game) {
	            return getFieldsCountWithEmptyRows(1)(game) > 0;
	        }
	    }, {
	        name: 'Losers',
	        checker: function checker(game) {
	            return true;
	        }
	    }].reduce(function (games, _ref) {
	        var name = _ref.name,
	            checker = _ref.checker;
	
	        var winners = games.filter(checker);
	        if (winners.length) {
	            printGroup(name + '!', function (parent) {
	                return winners.forEach(function (game) {
	                    return parent.appendChild(printWinner(game));
	                });
	            });
	            return games.filter(function (looser) {
	                return winners.every(function (winner) {
	                    return winner != looser;
	                });
	            });
	        } else {
	            return games;
	        }
	    }, games);
	};
	
	startButton.addEventListener('click', playGame);
	_utils2.default.appendFragment(document.body, header, playersContainer);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  line-height: 133%;\n  width: 100%;\n  min-width: 270px;\n  margin: 0;\n  color: #333;\n  background-color: #eee;\n}\n*,\n*:before,\n*:after {\n  box-sizing: border-box;\n}\n.is-hiddden {\n  display: none !important;\n}\n.is-selected {\n  background-color: lemonchiffon;\n}\n.is-crossed {\n  text-decoration: line-through;\n}\n.is-highlighted {\n  background-color: lightgreen !important;\n}\n.header {\n  display: block;\n  padding: 5px;\n  background-color: lightyellow;\n  background-image: -webkit-linear-gradient(top, lightyellow, #fff067);\n  background-image: linear-gradient(to bottom, lightyellow, #ffffad);\n}\n@media screen and (max-width: 380px) {\n  .header {\n    text-align: center;\n  }\n}\n.header__logo {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.header__balls-result-container {\n  display: inline-block;\n  width: 82%;\n  vertical-align: top;\n}\n.header__logo-container {\n  display: inline-block;\n  vertical-align: top;\n  text-align: center;\n}\n.balls-result-container {\n  display: block;\n  padding: 10px;\n}\n.players-container {\n  width: 80%;\n  margin: 10px;\n}\n@media screen and (max-width: 380px) {\n  .players-container {\n    text-align: center;\n  }\n}\n.btn {\n  letter-spacing: 1px;\n  white-space: nowrap;\n  text-transform: uppercase;\n  text-decoration: none;\n  outline: none;\n  display: inline-block;\n  cursor: pointer;\n}\n.btn_start {\n  padding: 10px 20px;\n  color: #fff;\n  border: 1px solid #050b1e;\n  border-radius: 2px;\n  background-color: #3998f5;\n  background-image: -webkit-linear-gradient(top, #3998f5, #0a65be);\n  background-image: linear-gradient(to bottom, #3998f5, #0a65be);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 #3998f5;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.31);\n}\n.btn_start:hover {\n  color: #fff;\n  background-image: -webkit-linear-gradient(top, #0a65be, #3998f5);\n  background-image: linear-gradient(to bottom, #0a65be, #3998f5);\n}\n.balls {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: bold;\n  letter-spacing: 1px;\n  display: inline-block;\n  padding: 5px 8px;\n  margin: 2px;\n  border-radius: 50%;\n  background-color: #fff;\n  box-shadow: inset 2px 0 4px 2px #333;\n}\n.balls-container {\n  min-height: 40px;\n  margin: 5px;\n  text-align: left;\n  border-radius: 5px;\n  background-color: #eee;\n}\n.balls-title {\n  margin: 0 0 5px;\n}\n.winners-list {\n  display: inline-block;\n  width: 208px;\n  margin: 5px;\n  padding-left: 20px;\n  list-style: none;\n  vertical-align: top;\n  overflow: hidden;\n}\n.winners-list__title {\n  margin: 0;\n  padding: 0;\n}\n.winners-list__item {\n  text-align: left;\n  position: relative;\n  cursor: pointer;\n}\n.winners-list__item:hover {\n  background-color: lemonchiffon;\n}\n.winners-list__item:after {\n  position: absolute;\n  top: 0;\n  left: -18px;\n  content: attr(js-pointer);\n}\n.ticket {\n  text-align: center;\n  display: inline-block;\n  padding: 10px;\n  opacity: .9;\n  border-radius: 2px;\n  background-color: #506ab9;\n}\n@media screen and (min-width: 381px) and (min-height: 610px) {\n  .ticket {\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    z-index: 100;\n    border-radius: 15px;\n  }\n}\n.ticket__logo-container {\n  width: 168px;\n  height: 140px;\n}\n.ticket__logo {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n.ticket__field {\n  display: block;\n  margin: 0;\n  margin-top: 5px;\n}\n.ticket__row {\n  margin: 0;\n  padding: 0;\n}\n.ticket__cell {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n  margin: 1px;\n  border-radius: 3px;\n}\n", ""]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var utils = {};
	
	    utils.appendFragment = function (box) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        var frag = document.createDocumentFragment();
	
	        args.forEach(function (el) {
	            return frag.appendChild(el);
	        });
	        box.appendChild(frag);
	    };
	
	    return utils;
	}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var header = document.createElement('header');
	
	    header.className = 'header';
	
	    header.logoContainer = document.createElement('div');
	    header.logoContainer.className = 'header__logo-container';
	    header.appendChild(header.logoContainer);
	
	    header.logoContainer.appendChild((0, _getImg2.default)({
	        src: "../app.js/img/logo.png",
	        className: 'header__logo',
	        alt: 'Loto zabava'
	    }));
	
	    return header;
	};
	
	var _getImg = __webpack_require__(16);
	
	var _getImg2 = _interopRequireDefault(_getImg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (options) {
	    var img = document.createElement('img');
	
	    img.src = options.src;
	    img.className = options.className;
	    img.alt = options.alt;
	
	    return img;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (text) {
	    var btn = document.createElement('button');
	
	    btn.className = 'btn btn_start';
	    btn.textContent = text;
	
	    return btn;
	};
	
	;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function paintBalls(playedBalls) {
	    var ballsField = document.createElement('div');
	    ballsField.className = 'balls-container';
	
	    playedBalls.forEach(function (_) {
	        var ball = document.createElement('span');
	
	        ball.className = 'balls';
	        ball.textContent = _ < 10 ? '0' + _ : '' + _;
	        ballsField.appendChild(ball);
	    });
	
	    return ballsField;
	}
	
	function paintBallsTitle(playedBalls, progress) {
	    var ballsTitle = document.createElement('h4');
	
	    ballsTitle.textContent = (progress || 'Finish! ') + ' Balls (' + playedBalls.length + '): ';
	    ballsTitle.className = 'balls-title';
	
	    return ballsTitle;
	}
	
	exports.paintBalls = paintBalls;
	exports.paintBallsTitle = paintBallsTitle;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (game) {
	    var ticket = document.createElement('div'),
	        logoContainer = document.createElement('div');
	
	    var LIGHTGREEN = '#c0d6c0';
	    var LIGHTCORAL = '#f1c0ac';
	    var cellColors = ['lavender', 'lemonchiffon', LIGHTGREEN, LIGHTCORAL, 'lightblue'];
	
	    ticket.classList.add('ticket');
	    logoContainer.className = 'ticket__logo-container';
	    ticket.appendChild(logoContainer);
	    logoContainer.appendChild((0, _getImg2.default)({
	        src: '../app.js/img/ticket-logo.jpg',
	        className: 'ticket__logo',
	        alt: 'Zabava ticket'
	    }));
	
	    game.ticket.forEach(function (field, fieldNumber) {
	        var ticketField = document.createElement('div');
	        ticketField.className = 'ticket__field';
	
	        field.forEach(function (row, rowNumber) {
	            var ticketRow = document.createElement('div');
	            ticketRow.className = 'ticket__row';
	
	            row.map(function (cell, i) {
	                var ticketCell = document.createElement('div');
	
	                ticketCell.className = 'ticket__cell';
	                ticketCell.style.backgroundColor = cellColors[i];
	
	                ticketCell.textContent = cell === 'HORSESHOE' ? '𝞨' : cell < 10 ? ' ' + cell : cell;
	                if (game.progress[fieldNumber][rowNumber].length == 0) {
	                    if (ticketCell.textContent !== '𝞨') ticketCell.classList.add('is-crossed', 'is-highlighted');else ticketCell.classList.add('is-highlighted');
	                }
	
	                ticketRow.appendChild(ticketCell);
	            });
	
	            ticketField.appendChild(ticketRow);
	        });
	        ticket.appendChild(ticketField);
	    });
	
	    return ticket;
	};
	
	var _getImg = __webpack_require__(16);
	
	var _getImg2 = _interopRequireDefault(_getImg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (playerName) {
	    var player = document.createElement('li');
	
	    player.className = 'winners-list__item';
	    player.textContent = playerName;
	    player.setAttribute('js-pointer', '►');
	
	    return player;
	};
	
	;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (event, ticket) {
	    var target = event.target;
	    var winners = document.querySelectorAll('.winners-list__item'),
	        prevTicket = void 0;
	
	    if (target.tagName !== 'LI') return;
	
	    for (var i = 0; i < winners.length; i++) {
	        if (winners[i] === target) {
	            target.classList.toggle('is-selected');
	
	            prevTicket = target.querySelector('.ticket');
	
	            if (target.classList.contains('is-selected')) {
	                target.setAttribute('js-pointer', '▼');
	                target.appendChild(ticket);
	            } else {
	                target.setAttribute('js-pointer', '►');
	                target.removeChild(prevTicket);
	            }
	
	            continue;
	        }
	
	        if (winners[i].classList.contains('is-selected')) {
	            winners[i].classList.remove('is-selected');
	            winners[i].setAttribute('js-pointer', '►');
	
	            prevTicket = winners[i].querySelector('.ticket');
	            if (prevTicket) winners[i].removeChild(prevTicket);
	        }
	    }
	};
	
	;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var players = {
	    "1": 'Артеменко Антон',
	    "2": 'Басанский Артем',
	    "3": 'Буркатский Дмитрий',
	    "4": 'Дядик Тарас',
	    "5": 'Ковтуненко Владислав',
	    "6": 'Комаренко Николай',
	    "7": 'Кошевой Дмитрий',
	    "8": 'Кукуляк Юлия',
	    "9": 'Логинов Антон',
	    "10": 'Манько Владимир',
	    "11": 'Минченко Дмитрий',
	    "12": 'Пилипенко Ирина',
	    "13": 'Худенко Юрий',
	    "14": 'Щербина Максим',
	    "15": 'Яковлев Евгений',
	
	    "16": 'Гончаренко Владимир',
	    "17": 'Грицаенко Юрий',
	    "18": 'Древаль Наталия',
	    "19": 'Дяченко Сергей',
	    "20": 'Заика Анатолий',
	    "21": 'Колосов Михаил',
	    "22": 'Лавский Игорь',
	    "23": 'Маламуж Андрей'
	};
	
	exports.default = players;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.4e942e5e40982fc3ab7b.js.map