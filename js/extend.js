(function($) {
	var touch = {},
		touchTimeout, tapTimeout, swipeTimeout, longTapDelay = 750,
		longTapTimeout;

	function parentIfText(node) {
		return "tagName" in node ? node : node.parentNode
	}
	function swipeDirection(x1, x2, y1, y2) {
		var xDelta = Math.abs(x1 - x2),
			yDelta = Math.abs(y1 - y2);
		return xDelta >= yDelta ? (x1 - x2 > 0 ? "Left" : "Right") : (y1 - y2 > 0 ? "Up" : "Down")
	}
	function longTap() {
		longTapTimeout = null;
		if (touch.last) {
			touch.el.trigger("longTap");
			touch = {}
		}
	}
	function cancelLongTap() {
		if (longTapTimeout) {
			clearTimeout(longTapTimeout)
		}
		longTapTimeout = null
	}
	function cancelAll() {
		if (touchTimeout) {
			clearTimeout(touchTimeout)
		}
		if (tapTimeout) {
			clearTimeout(tapTimeout)
		}
		if (swipeTimeout) {
			clearTimeout(swipeTimeout)
		}
		if (longTapTimeout) {
			clearTimeout(longTapTimeout)
		}
		touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
		touch = {}
	}
	$(document).ready(function() {
		var now, delta;
		$(document.body).bind("touchstart", function(e) {
			now = Date.now();
			delta = now - (touch.last || now);
			touch.el = $(parentIfText(e.touches[0].target));
			touchTimeout && clearTimeout(touchTimeout);
			touch.x1 = e.touches[0].pageX;
			touch.y1 = e.touches[0].pageY;
			if (delta > 0 && delta <= 250) {
				touch.isDoubleTap = true
			}
			touch.last = now;
			longTapTimeout = setTimeout(longTap, longTapDelay)
		}).bind("touchmove", function(e) {
			cancelLongTap();
			touch.x2 = e.touches[0].pageX;
			touch.y2 = e.touches[0].pageY;
			if (Math.abs(touch.x1 - touch.x2) > 10) {
				e.preventDefault()
			}
		}).bind("touchend", function(e) {
			cancelLongTap();
			if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
				swipeTimeout = setTimeout(function() {
					touch.el.trigger("swipe");
					touch.el.trigger("swipe" + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
					touch = {}
				}, 0)
			} else {
				if ("last" in touch) {
					tapTimeout = setTimeout(function() {
						var event = $.Event("tap");
						event.cancelTouch = cancelAll;
						touch.el.trigger(event);
						if (touch.isDoubleTap) {
							touch.el.trigger("doubleTap");
							touch = {}
						} else {
							touchTimeout = setTimeout(function() {
								touchTimeout = null;
								touch.el.trigger("singleTap");
								touch = {}
							}, 250)
						}
					}, 0)
				}
			}
		}).bind("touchcancel", cancelAll);
		$(window).bind("scroll", cancelAll)
	});
	["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(m) {
		$.fn[m] = function(callback) {
			return this.bind(m, callback)
		}
	})
})(Zepto);
(function($) {
	$.extend($, {
		contains: function(parent, node) {
			return parent.compareDocumentPosition ? !! (parent.compareDocumentPosition(node) & 16) : parent !== node && parent.contains(node)
		}
	})
})(Zepto);
(function($, undefined) {
	$.extend($, {
		toString: function(obj) {
			return Object.prototype.toString.call(obj)
		},
		slice: function(array, index) {
			return Array.prototype.slice.call(array, index || 0)
		},
		later: function(fn, when, periodic, context, data) {
			return window["set" + (periodic ? "Interval" : "Timeout")](function() {
				fn.apply(context, data)
			}, when || 0)
		},
		parseTpl: function(str, data) {
			var tmpl = "var __p=[],print=function(){__p.push.apply(__p,arguments);};" + "with(obj||{}){__p.push('" + str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(match, code) {
				return "'," + code.replace(/\\'/g, "'") + ",'"
			}).replace(/<%([\s\S]+?)%>/g, function(match, code) {
				return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
			}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
			var func = new Function("obj", tmpl);
			return data ? func(data) : func
		},
		throttle: function(delay, fn, debounce_mode) {
			var last = 0,
				timeId;
			if (typeof fn !== "function") {
				debounce_mode = fn;
				fn = delay;
				delay = 250
			}
			function wrapper() {
				var that = this,
					period = Date.now() - last,
					args = arguments;

				function exec() {
					last = Date.now();
					fn.apply(that, args)
				}
				function clear() {
					timeId = undefined
				}
				if (debounce_mode && !timeId) {
					exec()
				}
				timeId && clearTimeout(timeId);
				if (debounce_mode === undefined && period > delay) {
					exec()
				} else {
					timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay)
				}
			}
			wrapper._zid = fn._zid = fn._zid || $.proxy(fn)._zid;
			return wrapper
		},
		debounce: function(delay, fn, t) {
			return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t === undefined ? false : t !== false)
		}
	});
	$.each("String Boolean RegExp Number Date Object Null Undefined".split(" "), function(i, name) {
		var fn;
		if ("is" + name in $) {
			return
		}
		switch (name) {
		case "Null":
			fn = function(obj) {
				return obj === null
			};
			break;
		case "Undefined":
			fn = function(obj) {
				return obj === undefined
			};
			break;
		default:
			fn = function(obj) {
				return new RegExp(name + "]", "i").test(toString(obj))
			}
		}
		$["is" + name] = fn
	});
	var toString = $.toString
})(Zepto);
(function($, undefined) {
	var ua = navigator.userAgent,
		na = navigator.appVersion,
		br = $.browser;
	$.extend(br, {
		qq: /qq/i.test(ua),
		uc: /UC/i.test(ua) || /UC/i.test(na)
	});
	br.uc = br.uc || !br.qq && !br.chrome && !br.firefox && !/safari/i.test(ua);
	try {
		br.version = br.uc ? na.match(/UC(?:Browser)?\/([\d.]+)/)[1] : br.qq ? ua.match(/MQQBrowser\/([\d.]+)/)[1] : br.version
	} catch (e) {}
	$.support = $.extend($.support || {}, {
		orientation: !(br.uc || (parseFloat($.os.version) < 5 && (br.qq || br.chrome))) && !($.os.android && parseFloat($.os.version) > 3) && "orientation" in window && "onorientationchange" in window,
		touch: "ontouchend" in document,
		cssTransitions: "WebKitTransitionEvent" in window,
		has3d: "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()
	})
})(Zepto);
(function($) {
	$.matchMedia = (function() {
		var mediaId = 0,
			cls = "gmu-media-detect",
			transitionEnd = $.fx.transitionEnd,
			cssPrefix = $.fx.cssPrefix,
			$style = $("<style></style>").append("." + cls + "{" + cssPrefix + "transition: width 0.001ms; width: 0; position: absolute; top: -10000px;}\n").appendTo("head");
		return function(query) {
			var id = cls + mediaId++,
				$mediaElem = $('<div class="' + cls + '" id="' + id + '"></div>').appendTo("body"),
				listeners = [],
				ret;
			$style.append("@media " + query + " { #" + id + " { width: 1px; } }\n");
			if ("matchMedia" in window) {
				return window.matchMedia(query)
			}
			$mediaElem.on(transitionEnd, function() {
				ret.matches = $mediaElem.width() === 1;
				$.each(listeners, function(i, fn) {
					$.isFunction(fn) && fn.call(ret, ret)
				})
			});
			ret = {
				matches: $mediaElem.width() === 1,
				media: query,
				addListener: function(callback) {
					listeners.push(callback);
					return this
				},
				removeListener: function(callback) {
					var index = listeners.indexOf(callback);~index && listeners.splice(index, 1);
					return this
				}
			};
			return ret
		}
	}());
	$(function() {
		var handleOrtchange = function(mql) {
				$(window).trigger("ortchange")
			};
		$.mediaQuery = {
			ortchange: "screen and (width: " + window.innerWidth + "px)"
		};
		$.matchMedia($.mediaQuery.ortchange).addListener(handleOrtchange)
	});

	function _registerScrollStop() {
		$(window).on("scroll", $.debounce(80, function() {
			$(document).trigger("scrollStop")
		}, false))
	}
	function _touchstartHander() {
		$(window).off("scroll");
		_registerScrollStop()
	}
	_registerScrollStop();
	$(window).on("pageshow", function(e) {
		if (e.persisted) {
			$(document).off("touchstart", _touchstartHander).one("touchstart", _touchstartHander)
		}
	})
})(Zepto);
(function(window, doc) {
	var m = Math,
		_bindArr = [],
		dummyStyle = doc.createElement("div").style,
		vendor = (function() {
			var vendors = "webkitT,MozT,msT,OT,t".split(","),
				t, i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				t = vendors[i] + "ransform";
				if (t in dummyStyle) {
					return vendors[i].substr(0, vendors[i].length - 1)
				}
			}
			return false
		})(),
		cssVendor = vendor ? "-" + vendor.toLowerCase() + "-" : "",
		transform = prefixStyle("transform"),
		transitionProperty = prefixStyle("transitionProperty"),
		transitionDuration = prefixStyle("transitionDuration"),
		transformOrigin = prefixStyle("transformOrigin"),
		transitionTimingFunction = prefixStyle("transitionTimingFunction"),
		transitionDelay = prefixStyle("transitionDelay"),
		isAndroid = (/android/gi).test(navigator.appVersion),
		isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		has3d = prefixStyle("perspective") in dummyStyle,
		hasTouch = "ontouchstart" in window && !isTouchPad,
		hasTransform = !! vendor,
		hasTransitionEnd = prefixStyle("transition") in dummyStyle,
		RESIZE_EV = "onorientationchange" in window ? "orientationchange" : "resize",
		START_EV = hasTouch ? "touchstart" : "mousedown",
		MOVE_EV = hasTouch ? "touchmove" : "mousemove",
		END_EV = hasTouch ? "touchend" : "mouseup",
		CANCEL_EV = hasTouch ? "touchcancel" : "mouseup",
		TRNEND_EV = (function() {
			if (vendor === false) {
				return false
			}
			var transitionEnd = {
				"": "transitionend",
				"webkit": "webkitTransitionEnd",
				"Moz": "transitionend",
				"O": "otransitionend",
				"ms": "MSTransitionEnd"
			};
			return transitionEnd[vendor]
		})(),
		nextFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
				return setTimeout(callback, 1)
			}
		})(),
		cancelFrame = (function() {
			return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
		})(),
		translateZ = has3d ? " translateZ(0)" : "",
		iScroll = function(el, options) {
			var that = this,
				i;
			that.wrapper = typeof el == "object" ? el : doc.getElementById(el);
			that.wrapper.style.overflow = "hidden";
			that.scroller = that.wrapper.children[0];
			that.translateZ = translateZ;
			that.options = {
				hScroll: true,
				vScroll: true,
				x: 0,
				y: 0,
				bounce: true,
				bounceLock: false,
				momentum: true,
				lockDirection: true,
				useTransform: true,
				useTransition: false,
				topOffset: 0,
				checkDOMChanges: false,
				handleClick: true,
				onRefresh: null,
				onBeforeScrollStart: function(e) {
					var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : (e.target ? e.target.nodeName.toLowerCase() : "");
					if (nodeType != "iframe" && nodeType != "select" && nodeType != "option" && nodeType != "input" && nodeType != "textarea" && nodeType != "video" && nodeType != "audio") {
						e.preventDefault()
					}
				},
				onScrollStart: null,
				onBeforeScrollMove: null,
				onScrollMove: null,
				onBeforeScrollEnd: null,
				onScrollEnd: null,
				onTouchEnd: null,
				onDestroy: null
			};
			for (i in options) {
				that.options[i] = options[i]
			}
			that.x = that.options.x;
			that.y = that.options.y;
			that.options.useTransform = hasTransform && that.options.useTransform;
			that.options.useTransition = hasTransitionEnd && that.options.useTransition;
			that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + "transform" : "top left";
			that.scroller.style[transitionDuration] = "0";
			that.scroller.style[transformOrigin] = "0 0";
			if (that.options.useTransition) {
				that.scroller.style[transitionTimingFunction] = "cubic-bezier(0.33,0.66,0.66,1)"
			}
			if (that.options.useTransform) {
				that.scroller.style[transform] = "translate(" + that.x + "px," + that.y + "px)" + translateZ
			} else {
				that.scroller.style.cssText += ";position:absolute;top:" + that.y + "px;left:" + that.x + "px"
			}
			that.refresh();
			that._bind(RESIZE_EV, window);
			that._bind(START_EV);
			if (that.options.checkDOMChanges) {
				that.checkDOMTime = setInterval(function() {
					that._checkDOMChanges()
				}, 500)
			}
		};
	iScroll.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		currPageX: 0,
		currPageY: 0,
		pagesX: [],
		pagesY: [],
		aniTime: null,
		isStopScrollAction: false,
		handleEvent: function(e) {
			var that = this;
			switch (e.type) {
			case START_EV:
				if (!hasTouch && e.button !== 0) {
					return
				}
				that._start(e);
				break;
			case MOVE_EV:
				that._move(e);
				break;
			case END_EV:
			case CANCEL_EV:
				that._end(e);
				break;
			case RESIZE_EV:
				that._resize();
				break;
			case TRNEND_EV:
				that._transitionEnd(e);
				break
			}
		},
		_checkDOMChanges: function() {
			if (this.moved || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
				return
			}
			this.refresh()
		},
		_resize: function() {
			var that = this;
			setTimeout(function() {
				that.refresh()
			}, isAndroid ? 200 : 0)
		},
		_pos: function(x, y) {
			x = this.hScroll ? x : 0;
			y = this.vScroll ? y : 0;
			if (this.options.useTransform) {
				this.scroller.style[transform] = "translate(" + x + "px," + y + "px) scale(" + this.scale + ")" + translateZ
			} else {
				x = m.round(x);
				y = m.round(y);
				this.scroller.style.left = x + "px";
				this.scroller.style.top = y + "px"
			}
			this.x = x;
			this.y = y
		},
		_start: function(e) {
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				matrix, x, y, c1, c2;
			if (!that.enabled) {
				return
			}
			if (that.options.onBeforeScrollStart) {
				that.options.onBeforeScrollStart.call(that, e)
			}
			if (that.options.useTransition) {
				that._transitionTime(0)
			}
			that.moved = false;
			that.animating = false;
			that.distX = 0;
			that.distY = 0;
			that.absDistX = 0;
			that.absDistY = 0;
			that.dirX = 0;
			that.dirY = 0;
			that.isStopScrollAction = false;
			if (that.options.momentum) {
				if (that.options.useTransform) {
					matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, "").split(",");
					x = +matrix[4];
					y = +matrix[5]
				} else {
					x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, "");
					y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, "")
				}
				if (x != that.x || y != that.y) {
					that.isStopScrollAction = true;
					if (that.options.useTransition) {
						that._unbind(TRNEND_EV)
					} else {
						cancelFrame(that.aniTime)
					}
					that.steps = [];
					that._pos(x, y);
					if (that.options.onScrollEnd) {
						that.options.onScrollEnd.call(that)
					}
				}
			}
			that.startX = that.x;
			that.startY = that.y;
			that.pointX = point.pageX;
			that.pointY = point.pageY;
			that.startTime = e.timeStamp || Date.now();
			if (that.options.onScrollStart) {
				that.options.onScrollStart.call(that, e)
			}
			that._bind(MOVE_EV, window);
			that._bind(END_EV, window);
			that._bind(CANCEL_EV, window)
		},
		_move: function(e) {
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				deltaX = point.pageX - that.pointX,
				deltaY = point.pageY - that.pointY,
				newX = that.x + deltaX,
				newY = that.y + deltaY,
				timestamp = e.timeStamp || Date.now();
			if (that.options.onBeforeScrollMove) {
				that.options.onBeforeScrollMove.call(that, e)
			}
			that.pointX = point.pageX;
			that.pointY = point.pageY;
			if (newX > 0 || newX < that.maxScrollX) {
				newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX
			}
			if (newY > that.minScrollY || newY < that.maxScrollY) {
				newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY
			}
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = m.abs(that.distX);
			that.absDistY = m.abs(that.distY);
			if (that.absDistX < 6 && that.absDistY < 6) {
				return
			}
			if (that.options.lockDirection) {
				if (that.absDistX > that.absDistY + 5) {
					newY = that.y;
					deltaY = 0
				} else {
					if (that.absDistY > that.absDistX + 5) {
						newX = that.x;
						deltaX = 0
					}
				}
			}
			that.moved = true;
			that._beforePos ? that._beforePos(newY, deltaY) && that._pos(newX, newY) : that._pos(newX, newY);
			that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
			if (timestamp - that.startTime > 300) {
				that.startTime = timestamp;
				that.startX = that.x;
				that.startY = that.y
			}
			if (that.options.onScrollMove) {
				that.options.onScrollMove.call(that, e)
			}
		},
		_end: function(e) {
			if (hasTouch && e.touches.length !== 0) {
				return
			}
			var that = this,
				point = hasTouch ? e.changedTouches[0] : e,
				target, ev, momentumX = {
					dist: 0,
					time: 0
				},
				momentumY = {
					dist: 0,
					time: 0
				},
				duration = (e.timeStamp || Date.now()) - that.startTime,
				newPosX = that.x,
				newPosY = that.y,
				newDuration;
			that._unbind(MOVE_EV, window);
			that._unbind(END_EV, window);
			that._unbind(CANCEL_EV, window);
			if (that.options.onBeforeScrollEnd) {
				that.options.onBeforeScrollEnd.call(that, e)
			}
			if (!that.moved) {
				if (hasTouch && this.options.handleClick && !that.isStopScrollAction) {
					that.doubleTapTimer = setTimeout(function() {
						that.doubleTapTimer = null;
						target = point.target;
						while (target.nodeType != 1) {
							target = target.parentNode
						}
						if (target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA") {
							ev = doc.createEvent("MouseEvents");
							ev.initMouseEvent("click", true, true, e.view, 1, point.screenX, point.screenY, point.clientX, point.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
							ev._fake = true;
							target.dispatchEvent(ev)
						}
					}, 0)
				}
				that._resetPos(400);
				if (that.options.onTouchEnd) {
					that.options.onTouchEnd.call(that, e)
				}
				return
			}
			if (duration < 300 && that.options.momentum) {
				momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
				momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
				newPosX = that.x + momentumX.dist;
				newPosY = that.y + momentumY.dist;
				if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) {
					momentumX = {
						dist: 0,
						time: 0
					}
				}
				if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) {
					momentumY = {
						dist: 0,
						time: 0
					}
				}
			}
			if (momentumX.dist || momentumY.dist) {
				newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
				that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);
				if (that.options.onTouchEnd) {
					that.options.onTouchEnd.call(that, e)
				}
				return
			}
			that._resetPos(200);
			if (that.options.onTouchEnd) {
				that.options.onTouchEnd.call(that, e)
			}
		},
		_resetPos: function(time) {
			var that = this,
				resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
				resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
			if (resetX == that.x && resetY == that.y) {
				if (that.moved) {
					that.moved = false;
					if (that.options.onScrollEnd) {
						that.options.onScrollEnd.call(that)
					}
					if (that._afterPos) {
						that._afterPos()
					}
				}
				return
			}
			that.scrollTo(resetX, resetY, time || 0)
		},
		_transitionEnd: function(e) {
			var that = this;
			if (e.target != that.scroller) {
				return
			}
			that._unbind(TRNEND_EV);
			that._startAni()
		},
		_startAni: function() {
			var that = this,
				startX = that.x,
				startY = that.y,
				startTime = Date.now(),
				step, easeOut, animate;
			if (that.animating) {
				return
			}
			if (!that.steps.length) {
				that._resetPos(400);
				return
			}
			step = that.steps.shift();
			if (step.x == startX && step.y == startY) {
				step.time = 0
			}
			that.animating = true;
			that.moved = true;
			if (that.options.useTransition) {
				that._transitionTime(step.time);
				that._pos(step.x, step.y);
				that.animating = false;
				if (step.time) {
					that._bind(TRNEND_EV)
				} else {
					that._resetPos(0)
				}
				return
			}
			animate = function() {
				var now = Date.now(),
					newX, newY;
				if (now >= startTime + step.time) {
					that._pos(step.x, step.y);
					that.animating = false;
					if (that.options.onAnimationEnd) {
						that.options.onAnimationEnd.call(that)
					}
					that._startAni();
					return
				}
				now = (now - startTime) / step.time - 1;
				easeOut = m.sqrt(1 - now * now);
				newX = (step.x - startX) * easeOut + startX;
				newY = (step.y - startY) * easeOut + startY;
				that._pos(newX, newY);
				if (that.animating) {
					that.aniTime = nextFrame(animate)
				}
			};
			animate()
		},
		_transitionTime: function(time) {
			time += "ms";
			this.scroller.style[transitionDuration] = time
		},
		_momentum: function(dist, time, maxDistUpper, maxDistLower, size) {
			var deceleration = 0.0006,
				speed = m.abs(dist) * (this.options.speedScale || 1) / time,
				newDist = (speed * speed) / (2 * deceleration),
				newTime = 0,
				outsideDist = 0;
			if (dist > 0 && newDist > maxDistUpper) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistUpper = maxDistUpper + outsideDist;
				speed = speed * maxDistUpper / newDist;
				newDist = maxDistUpper
			} else {
				if (dist < 0 && newDist > maxDistLower) {
					outsideDist = size / (6 / (newDist / speed * deceleration));
					maxDistLower = maxDistLower + outsideDist;
					speed = speed * maxDistLower / newDist;
					newDist = maxDistLower
				}
			}
			newDist = newDist * (dist < 0 ? -1 : 1);
			newTime = speed / deceleration;
			return {
				dist: newDist,
				time: m.round(newTime)
			}
		},
		_offset: function(el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop
			}
			if (el != this.wrapper) {
				left *= this.scale;
				top *= this.scale
			}
			return {
				left: left,
				top: top
			}
		},
		_bind: function(type, el, bubble) {
			_bindArr.concat([el || this.scroller, type, this]);
			(el || this.scroller).addEventListener(type, this, !! bubble)
		},
		_unbind: function(type, el, bubble) {
			(el || this.scroller).removeEventListener(type, this, !! bubble)
		},
		destroy: function() {
			var that = this;
			that.scroller.style[transform] = "";
			that._unbind(RESIZE_EV, window);
			that._unbind(START_EV);
			that._unbind(MOVE_EV, window);
			that._unbind(END_EV, window);
			that._unbind(CANCEL_EV, window);
			if (that.options.useTransition) {
				that._unbind(TRNEND_EV)
			}
			if (that.options.checkDOMChanges) {
				clearInterval(that.checkDOMTime)
			}
			if (that.options.onDestroy) {
				that.options.onDestroy.call(that)
			}
			for (var i = 0, l = _bindArr.length; i < l;) {
				_bindArr[i].removeEventListener(_bindArr[i + 1], _bindArr[i + 2]);
				_bindArr[i] = null;
				i = i + 3
			}
			_bindArr = [];
			var div = doc.createElement("div");
			div.appendChild(this.wrapper);
			div.innerHTML = "";
			that.wrapper = that.scroller = div = null
		},
		refresh: function() {
			var that = this,
				offset;
			that.wrapperW = that.wrapper.clientWidth || 1;
			that.wrapperH = that.wrapper.clientHeight || 1;
			that.minScrollY = -that.options.topOffset || 0;
			that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
			that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
			that.maxScrollX = that.wrapperW - that.scrollerW;
			that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
			that.dirX = 0;
			that.dirY = 0;
			if (that.options.onRefresh) {
				that.options.onRefresh.call(that)
			}
			that.hScroll = that.options.hScroll && that.maxScrollX < 0;
			that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
			offset = that._offset(that.wrapper);
			that.wrapperOffsetLeft = -offset.left;
			that.wrapperOffsetTop = -offset.top;
			that.scroller.style[transitionDuration] = "0";
			that._resetPos(400)
		},
		scrollTo: function(x, y, time, relative) {
			var that = this,
				step = x,
				i, l;
			that.stop();
			if (!step.length) {
				step = [{
					x: x,
					y: y,
					time: time,
					relative: relative
				}]
			}
			for (i = 0, l = step.length; i < l; i++) {
				if (step[i].relative) {
					step[i].x = that.x - step[i].x;
					step[i].y = that.y - step[i].y
				}
				that.steps.push({
					x: step[i].x,
					y: step[i].y,
					time: step[i].time || 0
				})
			}
			that._startAni()
		},
		scrollToElement: function(el, time) {
			var that = this,
				pos;
			el = el.nodeType ? el : that.scroller.querySelector(el);
			if (!el) {
				return
			}
			pos = that._offset(el);
			pos.left += that.wrapperOffsetLeft;
			pos.top += that.wrapperOffsetTop;
			pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
			pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
			time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;
			that.scrollTo(pos.left, pos.top, time)
		},
		scrollToPage: function(pageX, pageY, time) {
			var that = this,
				x, y;
			time = time === undefined ? 400 : time;
			if (that.options.onScrollStart) {
				that.options.onScrollStart.call(that)
			}
			x = -that.wrapperW * pageX;
			y = -that.wrapperH * pageY;
			if (x < that.maxScrollX) {
				x = that.maxScrollX
			}
			if (y < that.maxScrollY) {
				y = that.maxScrollY
			}
			that.scrollTo(x, y, time)
		},
		disable: function() {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
			this._unbind(MOVE_EV, window);
			this._unbind(END_EV, window);
			this._unbind(CANCEL_EV, window)
		},
		enable: function() {
			this.enabled = true
		},
		stop: function() {
			if (this.options.useTransition) {
				this._unbind(TRNEND_EV)
			} else {
				cancelFrame(this.aniTime)
			}
			this.steps = [];
			this.moved = false;
			this.animating = false
		},
		isReady: function() {
			return !this.moved && !this.animating
		}
	};

	function prefixStyle(style) {
		if (vendor === "") {
			return style
		}
		style = style.charAt(0).toUpperCase() + style.substr(1);
		return vendor + style
	}
	dummyStyle = null;
	if (typeof exports !== "undefined") {
		exports.iScroll = iScroll
	} else {
		window.iScroll = iScroll
	}(function($) {
		if (!$) {
			return
		}
		var orgiScroll = iScroll,
			id = 0,
			cacheInstance = {};

		function createInstance(el, options) {
			var uqid = "iscroll" + id++;
			el.data("_iscroll_", uqid);
			return cacheInstance[uqid] = new orgiScroll(el[0], options)
		}
		window.iScroll = function(el, options) {
			return createInstance($(typeof el == "string" ? "#" + el : el), options)
		};
		$.fn.iScroll = function(method) {
			var resultArr = [];
			this.each(function(i, el) {
				if (typeof method == "string") {
					var instance = cacheInstance[$(el).data("_iscroll_")],
						pro;
					if (instance && (pro = instance[method])) {
						var result = $.isFunction(pro) ? pro.apply(instance, Array.prototype.slice.call(arguments, 1)) : pro;
						if (result !== instance && result !== undefined) {
							resultArr.push(result)
						}
					}
				} else {
					if (!$(el).data("_iscroll_")) {
						createInstance($(el), method)
					}
				}
			});
			return resultArr.length ? resultArr : this
		}
	})(window.Zepto || null)
})(window, document);
(function($, undefined) {
	var id = 1,
		_blankFn = function() {},
		tpl = "<%=name%>-<%=id%>",
		record = (function() {
			var data = {},
				id = 0,
				iKey = "GMUWidget" + (+new Date());
			return function(obj, key, val) {
				var dkey = obj[iKey] || (obj[iKey] = ++id),
					store = data[dkey] || (data[dkey] = {});
				!$.isUndefined(val) && (store[key] = val);
				$.isNull(val) && delete store[key];
				return store[key]
			}
		})();
	$.ui = $.ui || {
		version: "2.0.5",
		guid: _guid,
		define: function(name, data, superClass) {
			if (superClass) {
				data.inherit = superClass
			}
			var Class = $.ui[name] = _createClass(function(el, options) {
				var obj = _createObject(Class.prototype, {
					_id: $.parseTpl(tpl, {
						name: name,
						id: _guid()
					})
				});
				obj._createWidget.call(obj, el, options, Class.plugins);
				return obj
			}, data);
			return _zeptoLize(name, Class)
		},
		isWidget: function(obj, name) {
			return obj instanceof(name === undefined ? _widget : $.ui[name] || _blankFn)
		}
	};

	function _guid() {
		return id++
	}
	function _createObject(proto, data) {
		var obj = {};
		Object.create ? obj = Object.create(proto) : obj.__proto__ = proto;
		return $.extend(obj, data || {})
	}
	function _createClass(Class, data) {
		if (data) {
			_process(Class, data);
			$.extend(Class.prototype, data)
		}
		return $.extend(Class, {
			plugins: [],
			register: function(fn) {
				if ($.isObject(fn)) {
					$.extend(this.prototype, fn);
					return
				}
				this.plugins.push(fn)
			}
		})
	}
	function _process(Class, data) {
		var superClass = data.inherit || _widget,
			proto = superClass.prototype,
			obj;
		obj = Class.prototype = _createObject(proto, {
			$factory: Class,
			$super: function(key) {
				var fn = proto[key];
				return $.isFunction(fn) ? fn.apply(this, $.slice(arguments, 1)) : fn
			}
		});
		obj._data = $.extend({}, proto._data, data._data);
		delete data._data;
		return Class
	}
	function _zeptoLize(name) {
		$.fn[name] = function(opts) {
			var ret, obj, args = $.slice(arguments, 1);
			$.each(this, function(i, el) {
				obj = record(el, name) || $.ui[name](el, $.extend($.isPlainObject(opts) ? opts : {}, {
					setup: true
				}));
				if ($.isString(opts)) {
					if (!$.isFunction(obj[opts]) && opts !== "this") {
						throw new Error(name + "组件没有此方法")
					}
					ret = $.isFunction(obj[opts]) ? obj[opts].apply(obj, args) : undefined
				}
				if (ret !== undefined && ret !== obj || opts === "this" && (ret = obj)) {
					return false
				}
				ret = undefined
			});
			return ret !== undefined ? ret : this
		}
	}
	var _widget = function() {};
	$.extend(_widget.prototype, {
		_data: {
			status: true
		},
		data: function(key, val) {
			var _data = this._data;
			if ($.isObject(key)) {
				return $.extend(_data, key)
			} else {
				return !$.isUndefined(val) ? _data[key] = val : _data[key]
			}
		},
		_createWidget: function(el, opts, plugins) {
			if ($.isObject(el)) {
				opts = el || {};
				el = undefined
			}
			var data = $.extend({}, this._data, opts);
			$.extend(this, {
				_el: el ? $(el) : undefined,
				_data: data
			});
			var me = this;
			$.each(plugins, function(i, fn) {
				var result = fn.apply(me);
				if (result && $.isPlainObject(result)) {
					var plugins = me._data.disablePlugin;
					if (!plugins || $.isString(plugins) && !~plugins.indexOf(result.pluginName)) {
						delete result.pluginName;
						$.each(result, function(key, val) {
							var orgFn;
							if ((orgFn = me[key]) && $.isFunction(val)) {
								me[key] = function() {
									me[key + "Org"] = orgFn;
									return val.apply(me, arguments)
								}
							} else {
								me[key] = val
							}
						})
					}
				}
			});
			if (data.setup) {
				this._setup(el && el.getAttribute("data-mode"))
			} else {
				this._create()
			}
			this._init();
			var me = this,
				$el = this.trigger("init").root();
			$el.on("tap", function(e) {
				(e["bubblesList"] || (e["bubblesList"] = [])).push(me)
			});
			record($el[0], me._id.split("-")[0], me)
		},
		_create: function() {},
		_setup: function(mode) {},
		root: function(el) {
			return this._el = el || this._el
		},
		id: function(id) {
			return this._id = id || this._id
		},
		destroy: function() {
			var me = this,
				$el;
			$el = this.trigger("destroy").off().root();
			$el.find("*").off();
			record($el[0], me._id.split("-")[0], null);
			$el.off().remove();
			this.__proto__ = null;
			$.each(this, function(key) {
				delete me[key]
			})
		},
		on: function(ev, callback) {
			this.root().on(ev, $.proxy(callback, this));
			return this
		},
		off: function(ev, callback) {
			this.root().off(ev, callback);
			return this
		},
		trigger: function(event, data) {
			event = $.isString(event) ? $.Event(event) : event;
			var onEvent = this.data(event.type),
				result;
			if (onEvent && $.isFunction(onEvent)) {
				event.data = data;
				result = onEvent.apply(this, [event].concat(data));
				if (result === false || event.defaultPrevented) {
					return this
				}
			}
			this.root().trigger(event, data);
			return this
		}
	})
})(Zepto);
(function($, undefined) {
	$.ui.define("slider", {
		_data: {
			viewNum: 1,
			imgInit: 2,
			itemRender: null,
			imgZoom: false,
			loop: false,
			stopPropagation: false,
			springBackDis: 15,
			autoPlay: true,
			autoPlayTime: 4000,
			animationTime: 400,
			showArr: true,
			showDot: true,
			slide: null,
			slideend: null,
			index: 0,
			_stepLength: 1,
			_direction: 1
		},
		_create: function() {
			var me = this,
				i = 0,
				j, k = [],
				content = me.data("content");
			me._initConfig();
			(me.root() || me.root($("<div></div>"))).addClass("ui-slider").appendTo(me.data("container") || (me.root().parent().length ? "" : document.body)).html('<div class="ui-slider-wheel"><div class="ui-slider-group">' + (function() {
				if (me.data("itemRender")) {
					var render = me.data("itemRender");
					while (j = render.call(me, i++)) {
						k.push('<div class="ui-slider-item">' + j + "</div>")
					}
				} else {
					while (j = content[i++]) {
						k.push('<div class="ui-slider-item"><a href="' + j.href + '"><img lazyload="' + j.pic + '"/></a>' + (j.title ? "<p>" + j.title + "</p>" : "") + "</div>")
					}
				}
				k.push(me.data("loop") ? '</div><div class="ui-slider-group">' + k.join("") + "</div></div>" : "</div></div>");
				return k.join("")
			}()));
			me._addDots()
		},
		_setup: function(mode) {
			var me = this,
				root = me.root().addClass("ui-slider");
			me._initConfig();
			if (!mode) {
				var items = root.children(),
					group = $('<div class="ui-slider-group"></div>').append(items.addClass("ui-slider-item"));
				root.empty().append($('<div class="ui-slider-wheel"></div>').append(group).append(me.data("loop") ? group.clone() : ""));
				me._addDots()
			} else {
				me.data("loop") && $(".ui-slider-wheel", root).append($(".ui-slider-group", root).clone())
			}
		},
		_init: function() {
			var me = this,
				index = me.data("index"),
				root = me.root(),
				_eventHandler = $.proxy(me._eventHandler, me);
			me._setWidth();
			$(me.data("wheel")).on("touchstart touchmove touchend touchcancel webkitTransitionEnd", _eventHandler);
			$(window).on("ortchange", _eventHandler);
			$(".ui-slider-pre", root).on("tap", function() {
				me.pre()
			});
			$(".ui-slider-next", root).on("tap", function() {
				me.next()
			});
			me.on("destroy", function() {
				clearTimeout(me.data("play"));
				$(window).off("ortchange", _eventHandler)
			});
			me.data("autoPlay") && me._setTimeout()
		},
		_initConfig: function() {
			var o = this._data;
			if (o.viewNum > 1) {
				o.loop = false;
				o.showDot = false;
				o.imgInit = o.viewNum + 1
			}
		},
		_addDots: function() {
			var me = this,
				root = me.root(),
				length = $(".ui-slider-item", root).length / (me.data("loop") ? 2 : 1),
				html = [];
			if (me.data("showDot")) {
				html.push('<p class="ui-slider-dots">');
				while (length--) {
					html.push("<b></b>")
				}
				html.push("</p>")
			}
			me.data("showArr") && (html.push('<span class="ui-slider-pre"><b></b></span><span class="ui-slider-next"><b></b></span>'));
			root.append(html.join(""))
		},
		_setWidth: function() {
			var me = this,
				o = me._data,
				root = me.root(),
				width = Math.ceil(root.width() / o.viewNum),
				height = root.height(),
				loop = o.loop,
				items = $(".ui-slider-item", root).toArray(),
				length = items.length,
				wheel = $(".ui-slider-wheel", root).width(width * length)[0],
				dots = $(".ui-slider-dots b", root).toArray(),
				allImgs = $("img", root).toArray(),
				lazyImgs = allImgs.concat(),
				dotIndex = {},
				i, j, l = o.imgInit || length;
			o.showDot && (dots[0].className = "ui-slider-dot-select");
			if (o.imgZoom) {
				$(lazyImgs).on("load", function() {
					var h = this.height,
						w = this.width,
						min_h = Math.min(h, height),
						min_w = Math.min(w, width);
					if (h / height > w / width) {
						this.style.cssText += "height:" + min_h + "px;" + "width:" + min_h / h * w + "px;"
					} else {
						this.style.cssText += "height:" + min_w / w * h + "px;" + "width:" + min_w + "px"
					}
					this.onload = null
				})
			}
			for (i = 0; i < length; i++) {
				items[i].style.cssText += "width:" + width + "px;position:absolute;-webkit-transform:translate3d(" + i * width + "px,0,0);z-index:" + (900 - i);
				dotIndex[i] = loop ? (i > length / 2 - 1 ? i - length / 2 : i) : i;
				if (i < l) {
					j = lazyImgs.shift();
					j && (j.src = j.getAttribute("lazyload"));
					if (o.loop) {
						j = allImgs[i + length / 2];
						j && (j.src = j.getAttribute("lazyload"))
					}
				}
			}
			me.data({
				root: root[0],
				wheel: wheel,
				items: items,
				lazyImgs: lazyImgs,
				allImgs: allImgs,
				length: length,
				width: width,
				height: height,
				dots: dots,
				dotIndex: dotIndex,
				dot: dots[0]
			});
			return me
		},
		_eventHandler: function(e) {
			var me = this;
			switch (e.type) {
			case "touchmove":
				me._touchMove(e);
				break;
			case "touchstart":
				me._touchStart(e);
				break;
			case "touchcancel":
			case "touchend":
				me._touchEnd();
				break;
			case "webkitTransitionEnd":
				me._transitionEnd();
				break;
			case "ortchange":
				me._resize.call(me);
				break
			}
		},
		_touchStart: function(e) {
			var me = this;
			me.data({
				pageX: e.touches[0].pageX,
				pageY: e.touches[0].pageY,
				S: false,
				T: false,
				X: 0
			});
			me.data("wheel").style.webkitTransitionDuration = "0ms"
		},
		_touchMove: function(e) {
			var o = this._data,
				X = o.X = e.touches[0].pageX - o.pageX;
			if (!o.T) {
				var index = o.index,
					length = o.length,
					S = Math.abs(X) < Math.abs(e.touches[0].pageY - o.pageY);
				o.loop && (o.index = index > 0 && (index < length - 1) ? index : (index === length - 1) && X < 0 ? length / 2 - 1 : index === 0 && X > 0 ? length / 2 : index);
				S || clearTimeout(o.play);
				o.T = true;
				o.S = S
			}
			if (!o.S) {
				o.stopPropagation && e.stopPropagation();
				e.preventDefault();
				o.wheel.style.webkitTransform = "translate3d(" + (X - o.index * o.width) + "px,0,0)"
			}
		},
		_touchEnd: function() {
			var me = this,
				o = me._data;
			if (!o.S) {
				var distance = o.springBackDis,
					stepLength = o.X <= -distance ? Math.ceil(-o.X / o.width) : (o.X > distance) ? -Math.ceil(o.X / o.width) : 0;
				o._stepLength = Math.abs(stepLength);
				me._slide(o.index + stepLength)
			}
		},
		_slide: function(index, auto) {
			var me = this,
				o = me._data,
				length = o.length,
				end = length - o.viewNum + 1;
			if (-1 < index && index < end) {
				me._move(index)
			} else {
				if (index >= end) {
					if (!o.loop) {
						me._move(end - (auto ? 2 : 1));
						o._direction = -1
					} else {
						o.wheel.style.cssText += "-webkit-transition:0ms;-webkit-transform:translate3d(-" + (length / 2 - 1) * o.width + "px,0,0);";
						o._direction = 1;
						$.later(function() {
							me._move(length / 2)
						}, 20)
					}
				} else {
					if (!o.loop) {
						me._move(auto ? 1 : 0)
					} else {
						o.wheel.style.cssText += "-webkit-transition:0ms;-webkit-transform:translate3d(-" + (length / 2) * o.width + "px,0,0);";
						$.later(function() {
							me._move(length / 2 - 1)
						}, 20)
					}
					o._direction = 1
				}
			}
			return me
		},
		_move: function(index) {
			var o = this._data,
				dotIndex = o.dotIndex[index];
			this.trigger("slide", dotIndex);
			if (o.lazyImgs.length) {
				var j = o.allImgs[index];
				j && j.src || (j.src = j.getAttribute("lazyload"))
			}
			if (o.showDot) {
				o.dot.className = "";
				o.dots[dotIndex].className = "ui-slider-dot-select";
				o.dot = o.dots[dotIndex]
			}
			o.index = index;
			o.wheel.style.cssText += "-webkit-transition:" + o.animationTime + "ms;-webkit-transform:translate3d(-" + index * o.width + "px,0,0);"
		},
		_transitionEnd: function() {
			var me = this,
				o = me._data;
			me.trigger("slideend", o.dotIndex[o.index]);
			if (o.lazyImgs.length) {
				for (var length = o._stepLength, i = 0; i < length; i++) {
					var j = o.lazyImgs.shift();
					j && (j.src = j.getAttribute("lazyload"));
					if (o.loop) {
						j = o.allImgs[o.index + o.length / 2];
						j && !j.src && (j.src = j.getAttribute("lazyload"))
					}
				}
				o._stepLength = 1
			}
			me._setTimeout()
		},
		_setTimeout: function() {
			var me = this,
				o = me._data;
			if (!o.autoPlay) {
				return me
			}
			clearTimeout(o.play);
			o.play = $.later(function() {
				me._slide.call(me, o.index + o._direction, true)
			}, o.autoPlayTime);
			return me
		},
		_resize: function() {
			var me = this,
				o = me._data,
				width = o.root.offsetWidth / o.viewNum,
				length = o.length,
				items = o.items;
			if (!width) {
				return me
			}
			o.width = width;
			clearTimeout(o.play);
			for (var i = 0; i < length; i++) {
				items[i].style.cssText += "width:" + width + "px;-webkit-transform:translate3d(" + i * width + "px,0,0);"
			}
			o.wheel.style.removeProperty("-webkit-transition");
			o.wheel.style.cssText += "width:" + width * length + "px;-webkit-transform:translate3d(-" + o.index * width + "px,0,0);";
			o._direction = 1;
			me._setTimeout();
			return me
		},
		pre: function() {
			var me = this;
			me._slide(me.data("index") - 1);
			return me
		},
		next: function() {
			var me = this;
			me._slide(me.data("index") + 1);
			return me
		},
		stop: function() {
			var me = this;
			clearTimeout(me.data("play"));
			me.data("autoPlay", false);
			return me
		},
		resume: function() {
			var me = this;
			me.data("_direction", 1);
			me.data("autoPlay", true);
			me._setTimeout();
			return me
		}
	})
})(Zepto);
(function(window, undefined) {
	var hasTouch = ("createTouch" in document) || ("ontouchstart" in window),
		testStyle = document.createElement("div").style,
		testVendor = (function() {
			var cases = {
				"OTransform": ["-o-", "otransitionend"],
				"WebkitTransform": ["-webkit-", "webkitTransitionEnd"],
				"MozTransform": ["-moz-", "transitionend"],
				"msTransform": ["-ms-", "MSTransitionEnd"],
				"transform": ["", "transitionend"]
			},
				prop;
			for (prop in cases) {
				if (prop in testStyle) {
					return cases[prop]
				}
			}
			return false
		})(),
		sg = [
			["width", "left", "right"],
			["height", "top", "bottom"]
		],
		cssVendor = testVendor && testVendor[0],
		toCase = function(str) {
			return (str + "").replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter) {
				return (letter + "").toUpperCase()
			})
		},
		testCSS = function(prop) {
			var _prop = toCase(cssVendor + prop);
			return (prop in testStyle) && prop || (_prop in testStyle) && _prop
		},
		parseArgs = function(arg, dft) {
			for (var key in dft) {
				if (typeof arg[key] == "undefined") {
					arg[key] = dft[key]
				}
			}
			return arg
		},
		children = function(elem) {
			var children = elem.children || elem.childNodes,
				_ret = [],
				i = 0;
			for (; i < children.length; i++) {
				if (children[i].nodeType === 1) {
					_ret.push(children[i])
				}
			}
			return _ret
		},
		each = function(arr, func) {
			var i = 0,
				j = arr.length;
			for (; i < j; i++) {
				if (func.call(arr[i], i, arr[i]) === false) {
					break
				}
			}
		},
		returnFalse = function(evt) {
			evt = TouchSlider.fn.eventHook(evt);
			evt.preventDefault()
		},
		startEvent = hasTouch ? "touchstart" : "mousedown",
		moveEvent = hasTouch ? "touchmove" : "mousemove",
		endEvent = hasTouch ? "touchend" : "mouseup",
		transitionend = testVendor[1] || "",
		TouchSlider = function(id, cfg) {
			if (!(this instanceof TouchSlider)) {
				return new TouchSlider(id, cfg)
			}
			if (typeof id != "string" && !id.nodeType) {
				cfg = id;
				id = cfg.id
			}
			if (!id.nodeType) {
				id = document.getElementById(id)
			}
			this.cfg = parseArgs(cfg || {}, this._default);
			this.element = id;
			if (this.element) {
				this.container = this.element.parentNode || document.body;
				this.setup()
			}
		};
	TouchSlider.fn = TouchSlider.prototype = {
		version: "1.2.8",
		_default: {
			"id": "slider",
			"begin": 0,
			"auto": true,
			"speed": 600,
			"timeout": 5000,
			"direction": "left",
			"align": "center",
			"fixWidth": true,
			"mouseWheel": false,
			"before": new Function,
			"after": new Function
		},
		css: function(elem, css) {
			if (typeof css == "string") {
				var style = document.defaultView && document.defaultView.getComputedStyle && getComputedStyle(elem, null) || elem.currentStyle || elem.style || {};
				return style[toCase(css)]
			} else {
				var prop, propFix;
				for (prop in css) {
					if (prop == "float") {
						propFix = ("cssFloat" in testStyle) ? "cssFloat" : "styleFloat"
					} else {
						propFix = toCase(prop)
					}
					elem.style[propFix] = css[prop]
				}
			}
		},
		addListener: function(e, n, o, u) {
			if (e.addEventListener) {
				e.addEventListener(n, o, u);
				return true
			} else {
				if (e.attachEvent) {
					e.attachEvent("on" + n, o);
					return true
				}
			}
			return false
		},
		removeListener: function(e, n, o, u) {
			if (e.addEventListener) {
				e.removeEventListener(n, o, u);
				return true
			} else {
				if (e.attachEvent) {
					e.detachEvent("on" + n, o);
					return true
				}
			}
			return false
		},
		eventHook: function(origEvt) {
			var evt = {},
				props = "changedTouches touches scale target view which clientX clientY fromElement offsetX offsetY pageX pageY toElement".split(" ");
			origEvt = origEvt || window.event;
			each(props, function() {
				evt[this] = origEvt[this]
			});
			evt.target = origEvt.target || origEvt.srcElement || document;
			if (evt.target.nodeType === 3) {
				evt.target = evt.target.parentNode
			}
			evt.preventDefault = function() {
				origEvt.preventDefault && origEvt.preventDefault();
				evt.returnValue = origEvt.returnValue = false
			};
			evt.stopPropagation = function() {
				origEvt.stopPropagation && origEvt.stopPropagation();
				evt.cancelBubble = origEvt.cancelBubble = true
			};
			if (hasTouch && evt.touches.length) {
				evt.pageX = evt.touches.item(0).pageX;
				evt.pageY = evt.touches.item(0).pageY
			} else {
				if (typeof origEvt.pageX == "undefined") {
					var doc = document.documentElement,
						body = document.body;
					evt.pageX = origEvt.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					evt.pageY = origEvt.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
				}
			}
			evt.origEvent = origEvt;
			return evt
		},
		bind: function(func, obj) {
			return function() {
				return func.apply(obj, arguments)
			}
		},
		setup: function() {
			this.slides = children(this.element);
			this.length = this.slides.length;
			this.cfg.timeout = parseInt(this.cfg.timeout);
			this.cfg.speed = parseInt(this.cfg.speed);
			this.cfg.begin = parseInt(this.cfg.begin);
			this.cfg.auto = !! this.cfg.auto;
			this.cfg.timeout = Math.max(this.cfg.timeout, this.cfg.speed);
			this.touching = !! hasTouch;
			this.css3transition = !! testVendor;
			this.index = this.cfg.begin < 0 || this.cfg.begin >= this.length ? 0 : this.cfg.begin;
			if (this.length < 1) {
				return false
			}
			switch (this.cfg.direction) {
			case "up":
			case "down":
				this.direction = this.cfg.direction;
				this.vertical = 1;
				break;
			case "right":
				this.direction = "right";
			default:
				this.direction = this.direction || "left";
				this.vertical = 0;
				break
			}
			this.addListener(this.element, startEvent, this.bind(this._start, this), false);
			this.addListener(document, moveEvent, this.bind(this._move, this), false);
			this.addListener(document, endEvent, this.bind(this._end, this), false);
			this.addListener(document, "touchcancel", this.bind(this._end, this), false);
			this.addListener(this.element, transitionend, this.bind(this.transitionend, this), false);
			this.addListener(window, "resize", this.bind(function() {
				clearTimeout(this.resizeTimer);
				this.resizeTimer = setTimeout(this.bind(this.resize, this), 100)
			}, this), false);
			if (this.cfg.mouseWheel) {
				this.addListener(this.element, "mousewheel", this.bind(this.mouseScroll, this), false);
				this.addListener(this.element, "DOMMouseScroll", this.bind(this.mouseScroll, this), false)
			}
			this.playing = this.cfg.auto;
			this.resize()
		},
		getSum: function(type, start, end) {
			var sum = 0,
				i = start,
				_type = toCase("-" + type);
			for (; i < end; i++) {
				sum += this["getOuter" + _type](this.slides[i])
			}
			return sum
		},
		getPos: function(type, index) {
			var _type = toCase("-" + type),
				myWidth = this.getSum(type, index, index + 1),
				sum = this.getSum(type, 0, index) + this["getOuter" + _type](this.element) / 2 - this["get" + _type](this.element) / 2;
			switch (this.cfg.align) {
			case "left":
				return -sum;
			case "right":
				return this[type] - myWidth - sum;
			default:
				return (this[type] - myWidth) / 2 - sum
			}
		},
		resize: function() {
			clearTimeout(this.aniTimer);
			var _this = this,
				css, type = sg[this.vertical][0],
				_type = toCase("-" + type),
				pst = this.css(this.container, "position");
			this.css(this.container, {
				"overflow": "hidden",
				"visibility": "hidden",
				"listStyle": "none",
				"position": pst == "static" ? "relative" : pst
			});
			this[type] = this["get" + _type](this.container);
			css = {
				"float": this.vertical ? "none" : "left",
				display: "block"
			};
			each(this.slides, function() {
				if (_this.cfg.fixWidth) {
					css[type] = _this[type] - _this["margin" + _type](this) - _this["padding" + _type](this) - _this["border" + _type](this) + "px"
				}
				_this.css(this, css)
			});
			this.total = this.getSum(type, 0, this.length);
			css = {
				position: "relative",
				overflow: "hidden"
			};
			css[cssVendor + "transition-duration"] = "0ms";
			css[type] = this.total + "px";
			css[sg[this.vertical][1]] = this.getPos(type, this.index) + "px";
			this.css(this.element, css);
			this.css(this.container, {
				"visibility": "visible"
			});
			this.playing && this.play();
			return this
		},
		slide: function(index, speed) {
			var direction = sg[this.vertical][1],
				type = sg[this.vertical][0],
				transition = testCSS("transition"),
				nowPos = parseFloat(this.css(this.element, direction)) || 0,
				endPos, css = {},
				change, size = this.getSum(type, index, index + 1);
			index = Math.min(Math.max(0, index), this.length - 1);
			speed = typeof speed == "undefined" ? this.cfg.speed : parseInt(speed);
			endPos = this.getPos(type, index);
			change = endPos - nowPos, speed = Math.abs(change) < size ? Math.ceil(Math.abs(change) / size * speed) : speed;
			if (transition) {
				css[transition] = direction + " ease " + speed + "ms";
				css[direction] = endPos + "px";
				this.css(this.element, css)
			} else {
				var _this = this,
					begin = 0,
					time = speed / 10,
					animate = function(t, b, c, d) {
						return -c * ((t = t / d - 1) * t * t * t - 1) + b
					},
					run = function() {
						if (begin < time) {
							begin++;
							_this.element.style[direction] = Math.ceil(animate(begin, nowPos, change, time)) + "px";
							_this.aniTimer = setTimeout(run, 10)
						} else {
							_this.element.style[direction] = endPos + "px";
							_this.transitionend({
								propertyName: direction
							})
						}
					};
				clearTimeout(this.aniTimer);
				run()
			}
			this.cfg.before.call(this, index, this.slides[this.index]);
			this.index = index;
			return this
		},
		play: function() {
			clearTimeout(this.timer);
			this.playing = true;
			this.timer = setTimeout(this.bind(function() {
				this.direction == "left" || this.direction == "up" ? this.next() : this.prev()
			}, this), this.cfg.timeout);
			return this
		},
		pause: function() {
			clearTimeout(this.timer);
			this.playing = false;
			return this
		},
		stop: function() {
			this.pause();
			return this.slide(0)
		},
		prev: function(offset, sync) {
			clearTimeout(this.timer);
			var index = this.index;
			offset = typeof offset == "undefined" ? offset = 1 : offset % this.length;
			index -= offset;
			if (sync === false) {
				index = Math.max(index, 0)
			} else {
				index = index < 0 ? this.length + index : index
			}
			return this.slide(index)
		},
		next: function(offset, sync) {
			clearTimeout(this.timer);
			var index = this.index;
			if (typeof offset == "undefined") {
				offset = 1
			}
			index += offset;
			if (sync === false) {
				index = Math.min(index, this.length - 1)
			} else {
				index %= this.length
			}
			return this.slide(index)
		},
		_start: function(evt) {
			evt = this.eventHook(evt);
			var name = evt.target.nodeName.toLowerCase();
			if (!this.touching && (name == "a" || name == "img")) {
				evt.preventDefault()
			}
			this.removeListener(this.element, "click", returnFalse);
			this.startPos = [evt.pageX, evt.pageY];
			this.element.style[toCase(cssVendor + "transition-duration")] = "0ms";
			this.startTime = +new Date;
			this._pos = parseFloat(this.css(this.element, sg[this.vertical][1])) || 0
		},
		_move: function(evt) {
			if (!this.startPos || evt.scale && evt.scale !== 1) {
				return
			}
			evt = this.eventHook(evt);
			this.stopPos = [evt.pageX, evt.pageY];
			var range, direction = sg[this.vertical][1],
				type = sg[this.vertical][0],
				offset = this.stopPos[this.vertical] - this.startPos[this.vertical];
			if (this.scrolling || typeof this.scrolling == "undefined" && Math.abs(offset) >= Math.abs(this.stopPos[1 - this.vertical] - this.startPos[1 - this.vertical])) {
				evt.preventDefault();
				offset = offset / ((!this.index && offset > 0 || this.index == this.length - 1 && offset < 0) ? (Math.abs(offset) / this[type] + 1) : 1);
				this.element.style[direction] = this._pos + offset + "px";
				if (window.getSelection != null) {
					range = getSelection();
					if (range.empty) {
						range.empty()
					} else {
						if (range.removeAllRanges) {
							range.removeAllRanges()
						}
					}
				}
				if (offset && typeof this.scrolling == "undefined") {
					this.scrolling = true;
					clearTimeout(this.timer);
					clearTimeout(this.aniTimer)
				}
			} else {
				this.scrolling = false
			}
		},
		_end: function(evt) {
			if (this.startPos) {
				if (this.scrolling) {
					var type = sg[this.vertical][0],
						direction = sg[this.vertical][1],
						offset = this.stopPos[this.vertical] - this.startPos[this.vertical],
						absOff = Math.abs(offset),
						sub = absOff / offset,
						myWidth, curPos, tarPos, next = this.index,
						off = 0;
					this.addListener(this.element, "click", returnFalse);
					if (absOff > 20) {
						curPos = parseFloat(this.css(this.element, sg[this.vertical][1]));
						do {
							if (next >= 0 && next < this.length) {
								tarPos = this.getPos(type, next);
								myWidth = this.getSum(type, next, next + 1)
							} else {
								next += sub;
								break
							}
						} while (Math.abs(tarPos - curPos) > myWidth / 2 && (next -= sub));
						off = Math.abs(next - this.index);
						if (!off && +new Date - this.startTime < 250) {
							off = 1
						}
					}
					offset > 0 ? this.prev(off, false) : this.next(off, false);
					this.playing && this.play()
				}
				delete this._pos;
				delete this.stopPos;
				delete this.startPos;
				delete this.scrolling;
				delete this.startTime
			}
		},
		mouseScroll: function(evt) {
			if (this.cfg.mouseWheel) {
				evt = this.eventHook(evt);
				var _this = this,
					e = evt.origEvent,
					toX = 0,
					toY = 0,
					to;
				if ("wheelDeltaX" in e) {
					toX = e.wheelDeltaX;
					toY = e.wheelDeltaY
				} else {
					if ("wheelDelta" in e) {
						toY = e.wheelDelta
					} else {
						if ("detail" in e) {
							toY = -e.detail
						} else {
							return
						}
					}
				}
				if (!this.vertical && Math.abs(toX) > Math.abs(toY)) {
					to = toX
				} else {
					if (toY && (!e.wheelDeltaX || this.vertical && Math.abs(toX) < Math.abs(toY))) {
						to = toY
					}
				}
				if (to) {
					evt.preventDefault();
					clearTimeout(this.mouseTimer);
					this.mouseTimer = setTimeout(function() {
						to > 0 ? _this.prev(1, false) : _this.next(1, false)
					}, 100)
				}
			}
		},
		transitionend: function(evt) {
			if (evt.propertyName == sg[this.vertical][1]) {
				this.cfg.after.call(this, this.index, this.slides[this.index]);
				this.playing && this.play()
			}
		},
		refresh: function() {
			this.slides = children(this.element);
			this.length = this.slides.length;
			if (this.index >= this.length) {
				this.index = this.length - 1
			}
			this.resize()
		},
		append: function(elem) {
			this.element.appendChild(elem);
			this.refresh()
		},
		insertBefore: function(elem, target) {
			this.element.insertBefore(elem, target);
			this.refresh()
		},
		remove: function(elem) {
			this.element.removeChild(elem);
			this.refresh()
		}
	};
	each(["Width", "Height"], function(i, type) {
		var _type = type.toLowerCase();
		each(["margin", "padding", "border"], function(j, name) {
			TouchSlider.fn[name + type] = function(elem) {
				return (parseFloat(this.css(elem, name + "-" + sg[i][1] + (name == "border" ? "-width" : ""))) || 0) + (parseFloat(this.css(elem, name + "-" + sg[i][2] + (name == "border" ? "-width" : ""))) || 0)
			}
		});
		TouchSlider.fn["get" + type] = function(elem) {
			return elem["offset" + type] - this["padding" + type](elem) - this["border" + type](elem)
		};
		TouchSlider.fn["getOuter" + type] = function(elem) {
			return elem["offset" + type] + (this.element == elem ? 0 : this["margin" + type](elem))
		}
	});
	window.TouchSlider = TouchSlider
})(window);
(function(a) {
	a.extend(a.fn, {
		cookie: function(b, c, d) {
			var e, f, g, h;
			if (arguments.length > 1 && String(c) !== "[object Object]") {
				d = a.extend({}, d);
				if (c === null || c === undefined) d.expires = -1;
				return typeof d.expires == "number" && (e = d.expires * 24 * 60 * 60 * 1e3, f = d.expires = new Date, f.setTime(f.getTime() + e)), c = String(c), document.cookie = [encodeURIComponent(b), "=", d.raw ? c : encodeURIComponent(c), d.expires ? "; expires=" + d.expires.toUTCString() : "", d.path ? "; path=" + d.path : "", d.domain ? "; domain=" + d.domain : "", d.secure ? "; secure" : ""].join("")
			}
			return d = c || {}, h = d.raw ?
			function(a) {
				return a
			} : decodeURIComponent, (g = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? h(g[1]) : null
		}
	})
})(Zepto);