// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"javasScript/P5_circles.js":[function(require,module,exports) {
var b = function b(sketch) {
  var canwasWindowWidth = sketch.windowWidth;
  var canvasWwindowHeight = sketch.windowWidth;

  function changeWidowSize(maxWindowSize) {
    if (maxWindowSize.matches) {
      // If media query matches
      canwasWindowWidth = sketch.windowWidth;
      canvasWwindowHeight = sketch.windowWidth;
    } else {
      canwasWindowWidth = 450;
      canvasWwindowHeight = 450;
    }
  }

  var maxWindowSize = window.matchMedia("(max-width: 600px)");
  changeWidowSize(maxWindowSize); // Call listener function at run time

  maxWindowSize.addListener(changeWidowSize); // Attach listener function on state changes

  sketch.windowResized = function () {
    if (sketch.windowWidth < 600) {
      canwasWindowWidth = sketch.windowWidth;
      canvasWwindowHeight = sketch.windowWidth;
    }

    sketch.resizeCanvas(canwasWindowWidth, canwasWindowWidth);
  }; //color function constructor


  var Color = function Color() {
    this.r = sketch.random(0, 255);
    this.g = sketch.random(0, 255);
    this.b = sketch.random(0, 255);
  }; //circle function constructor


  var Circle = function Circle(x, y, size, speedX, speedY, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    Color.call(this, r, g, b);
  }; //method to change circle object speed on screeen


  Circle.prototype.changeSpeed = function () {
    this.speedX = sketch.random(0, 10);
    this.speedY = sketch.random(0, 10);
  }; //method to change circle object x-direction on screeen


  Circle.prototype.changeDirectionX = function () {
    this.speedX *= -1;
  }; //method to change circle object y-direction on screeen


  Circle.prototype.changeDirectionY = function () {
    this.speedY *= -1;
  }; //function to move circle object on screeen


  Circle.prototype.moveCircle = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  }; //function to draw circle object on screen


  Circle.prototype.drawObject = function () {
    sketch.fill(this.r, this.g, this.b); //sketch.rect(this.x,this.y,this.size,this.size);

    sketch.ellipse(this.x, this.y, this.size);
  }; //check if circle has reached end of screen, change move direction.


  Circle.prototype.changeDirection = function () {
    if (this.x > canwasWindowWidth - (this.size / 2 + 20) || this.x < 0 + this.size / 2) {
      this.changeDirectionX();
    }

    if (this.y > canvasWwindowHeight - this.size / 2 || this.y < 0 + this.size / 2) {
      this.changeDirectionY();
    }
  }; //check if circle has reached end of screen, change move direction.


  Circle.prototype.isOutsideScreen = function () {
    if (this.x > canwasWindowWidth - (this.size / 2 + 10)) {
      console.log('Of screen detectedd!');
      this.x -= 50;
    }

    if (this.y > canvasWwindowHeight - (this.size / 2 - 10)) {
      this.y -= 50;
    }
  };

  var backgroundColor; //Array to hold cicle objects

  var circles = [];

  sketch.setup = function () {
    backgroundColor = new Color();
    var canvas = sketch.createCanvas(canwasWindowWidth, canvasWwindowHeight); //sketch.windowWidth, sketch.windowHeight

    canvas.parent('p5sketch'); //draw random color backscreen on startup

    sketch.background(backgroundColor.r, backgroundColor.g, backgroundColor.b); //create circles instnce on startup

    for (i = 0; i < 2; i++) {
      circles[i] = new Circle(sketch.random(100, sketch.windowWidth - 100), sketch.random(100, sketch.windowHeight - 100), sketch.random(10, 100), sketch.random(-5, 5), sketch.random(-5, 5));
    }
  };

  sketch.draw = function () {
    sketch.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

    for (i = 0; i < circles.length; i++) {
      circles[i].moveCircle();
      circles[i].drawObject();
      circles[i].changeDirection();
      circles[i].isOutsideScreen();
    }
  }; //create circle object on mouse click.


  sketch.mouseClicked = function () {
    if (sketch.mouseX > 50 && sketch.mouseX < sketch.windowWidth - 50 && sketch.mouseY > 50 && sketch.mouseY < sketch.windowHeight - 50) {
      circles.push(new Circle(sketch.mouseX, sketch.mouseY, sketch.random(10, 100), sketch.random(-5, 5), sketch.random(-5, 5)));
    }
  };
};

var myp6 = new p5(b, 'p5sketch');
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34413" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javasScript/P5_circles.js"], null)
//# sourceMappingURL=/P5_circles.72c9e67e.js.map