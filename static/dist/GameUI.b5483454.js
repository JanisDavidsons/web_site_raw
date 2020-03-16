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
})({"../src/snake/Configuration.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_LEVEL = exports.SPEED = exports.CELLS_VERTICAL = exports.CELLS_HORIZONTAL = void 0;
var CELLS_HORIZONTAL = 70;
exports.CELLS_HORIZONTAL = CELLS_HORIZONTAL;
var CELLS_VERTICAL = 35;
exports.CELLS_VERTICAL = CELLS_VERTICAL;
var SPEED = 100;
exports.SPEED = SPEED;
var MAX_LEVEL = 10;
exports.MAX_LEVEL = MAX_LEVEL;
},{}],"../src/snake/Cell.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

var Cell =
/** @class */
function () {
  function Cell(x, y) {
    this.x = x;
    this.y = y;
  }

  return Cell;
}();

exports.Cell = Cell;
},{}],"../src/snake/Grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _Cell = require("./Cell");

var Grid =
/** @class */
function () {
  function Grid(configuration) {
    this.apples = [new _Cell.Cell(33, 22), new _Cell.Cell(35, 22), new _Cell.Cell(37, 22), new _Cell.Cell(39, 22), new _Cell.Cell(41, 22)];
    this.configuration = configuration;
  }

  Grid.prototype.seed = function () {
    for (var i = 0; i < this.configuration.apples; i++) {
      var x = Math.floor(Math.random() * this.configuration.nbCellsX);
      var y = Math.floor(Math.random() * this.configuration.nbCellsY);
      this.apples.push(new _Cell.Cell(x, y));
    }
  };

  Grid.prototype.isAppleInside = function (cell) {
    return this.getApples().find(function (it) {
      return it.x === cell.x && it.y == cell.y;
    }) !== undefined;
  };

  Grid.prototype.removeApple = function (cell) {
    var apple = this.apples.find(function (it) {
      return it.x === cell.x && it.y == cell.y;
    });

    if (!apple) {
      return;
    }

    var i = this.apples.indexOf(apple);
    this.apples.splice(i, 1);
  };

  Grid.prototype.isDone = function () {
    return this.apples.length === 0;
    ;
  };

  Grid.prototype.getApples = function () {
    return this.apples;
  };

  return Grid;
}();

exports.Grid = Grid;
},{"./Cell":"../src/snake/Cell.ts"}],"../src/snake/Snake.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

var _Cell = require("./Cell");

var Snake =
/** @class */
function () {
  function Snake() {
    this.head = new _Cell.Cell(2, 0);
    this.tail = [new _Cell.Cell(0, 0), new _Cell.Cell(1, 0)];
    this.currentDirection = 'Right';
    this.growCells = 0;
  }

  Snake.prototype.setDirection = function (newDirection) {
    if (this.currentDirection === 'Right' && newDirection === 'Left') {
      return;
    }

    if (this.currentDirection === 'Up' && newDirection === 'Down') {
      return;
    }

    if (this.currentDirection === 'Down' && newDirection === 'Up') {
      return;
    }

    if (this.currentDirection === 'Left' && newDirection === 'Right') {
      return;
    }

    this.currentDirection = newDirection;
  };

  Snake.prototype.move = function () {
    var oldHeadDirection = new _Cell.Cell(this.head.x, this.head.y);

    if (this.currentDirection === "Right") {
      this.head = new _Cell.Cell(this.head.x + 1, this.head.y);
    } else if (this.currentDirection === "Down") {
      this.head = new _Cell.Cell(this.head.x, this.head.y + 1);
    } else if (this.currentDirection === "Up") {
      this.head = new _Cell.Cell(this.head.x, this.head.y - 1);
    } else if (this.currentDirection === "Left") {
      this.head = new _Cell.Cell(this.head.x - 1, this.head.y);
    }

    if (this.growCells > 0) {
      this.growCells = this.growCells - 1;
    } else {
      this.tail.shift();
    }

    this.tail.push(oldHeadDirection);
  };

  Snake.prototype.grow = function () {
    this.growCells = 3;
  };

  Snake.prototype.getHead = function () {
    return this.head;
  };

  Snake.prototype.isSnake = function (cell) {
    return this.getTail().find(function (touchingItsef) {
      return touchingItsef.x === cell.x && touchingItsef.y === cell.y;
    }) !== undefined;
  };

  Snake.prototype.getDirection = function () {
    return this.currentDirection;
  };

  Snake.prototype.getTail = function () {
    return this.tail;
  };

  return Snake;
}();

exports.Snake = Snake;
},{"./Cell":"../src/snake/Cell.ts"}],"../src/snake/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _Grid = require("./Grid");

var _Snake = require("./Snake");

var _Configuration = require("./Configuration");

var Game =
/** @class */
function () {
  function Game(configuration) {
    this.score = 0;
    this.running = false;
    this.configuration = configuration;
    this.snake = new _Snake.Snake();
    this.grid = new _Grid.Grid(this.configuration);
    this.nextTick = 0;
    this.running = true;
  }

  Game.prototype.getSnake = function () {
    return this.snake;
  };

  Game.prototype.getConfiguration = function () {
    return this.configuration;
  };

  Game.prototype.shouldUpdate = function (time) {
    return this.running && time >= this.nextTick;
  };

  Game.prototype.update = function (time) {
    this.nextTick = time + this.configuration.speed;
    this.snake.move();

    switch (this.checkState()) {
      case -1:
        this.die();
        break;

      case 1:
        this.snake.grow();
        this.score += 100;
        this.grid.removeApple(this.snake.getHead());

        if (this.grid.isDone()) {
          this.levelUp();
        }

    }
  };

  Game.prototype.checkState = function () {
    var cell = this.snake.getHead(); // left the play area or ate itself??

    if (this.isOutside(cell) || this.snake.isSnake(cell)) {
      // dead
      return -1;
    } // ate apple?


    if (this.grid.isAppleInside(cell)) {
      return 1;
    } // nothing special


    return 0;
  };

  Game.prototype.levelUp = function () {
    this.score += 1000;
    this.configuration.level++;

    if (this.configuration.level < _Configuration.MAX_LEVEL) {
      this.configuration.speed -= 7;
      this.grid.seed();
    } else {
      this.win();
    }
  };

  Game.prototype.win = function () {
    this.stop();
  };

  Game.prototype.die = function () {
    this.stop();
  };

  Game.prototype.isOutside = function (cell) {
    var _a = this.configuration,
        nbCellsX = _a.nbCellsX,
        nbCellsY = _a.nbCellsY;
    return cell.x < 0 || cell.x >= nbCellsX || cell.y < 0 || cell.y >= nbCellsY;
  };

  Game.prototype.getScore = function () {
    return this.score;
  };

  Game.prototype.getGrid = function () {
    return this.grid;
  };

  Game.prototype.stop = function () {
    this.running = false;
  };

  return Game;
}();

exports.Game = Game;
},{"./Grid":"../src/snake/Grid.ts","./Snake":"../src/snake/Snake.ts","./Configuration":"../src/snake/Configuration.ts"}],"../src/snake/GameUI.ts":[function(require,module,exports) {
"use strict";

var _Configuration = require("./Configuration");

var _Game = require("./Game");

var CELL_SIZE = 20;
var SCALE = 2.0;

var GameUI =
/** @class */
function () {
  function GameUI(canvas, game) {
    this.canvas = canvas;
    this.game = game;
    requestAnimationFrame(this.draw.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.focus();
  }

  GameUI.prototype.draw = function (time) {
    var context = this.canvas.getContext("2d");

    if (this.game.shouldUpdate(time)) {
      this.drawBackground(context);
      this.drawGrid(context);
      this.drawBrand(context);
      this.drawScore(context);
      this.drawSnake(context);
      this.drawApples(context);
      this.game.update(time);
    }

    requestAnimationFrame(this.draw.bind(this));
  };

  GameUI.prototype.drawBackground = function (context) {
    var _a = this.game.getConfiguration(),
        width = _a.width,
        height = _a.height;

    context.fillStyle = "#4caf50";
    context.fillRect(0, 0, width, height);
  };

  GameUI.prototype.drawBrand = function (context) {
    var _a = this.game.getConfiguration(),
        width = _a.width,
        height = _a.height;

    context.font = height / 2.5 + "px Roboto";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "rgba(255,255,255,0.75)"; //context.fillText("CODELEX", width / 2, height / 2);
  };

  GameUI.prototype.drawScore = function (context) {
    context.font = 35 * SCALE + "px Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "rgba(255,255,255,0.75)";
    context.fillText(game.getScore().toString(), 10 * SCALE, 10 * SCALE);
  };

  GameUI.prototype.drawGrid = function (context) {
    var game = this.game;

    var _a = game.getConfiguration(),
        width = _a.width,
        height = _a.height,
        cellWidth = _a.cellWidth,
        cellHeight = _a.cellHeight;

    var lineWidth = 1 * SCALE;
    context.strokeStyle = "rgba(255,255,255,0.95)";
    context.lineWidth = lineWidth;

    for (var x = 0; x <= width; x += cellWidth) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (var y = 0; y <= height; y += cellHeight) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  };

  GameUI.prototype.drawApples = function (context) {
    var _a = game.getConfiguration(),
        cellWidth = _a.cellWidth,
        cellHeight = _a.cellHeight;

    var lineWidth = 1 * SCALE;
    context.fillStyle = "#e91e63";
    var apples = game.getGrid().getApples();
    apples.forEach(function (cell) {
      return context.fillRect(cellWidth * cell.x + lineWidth, cellHeight * cell.y + lineWidth, cellWidth - lineWidth * 2, cellHeight - lineWidth * 2);
    });
  };

  GameUI.prototype.drawSnake = function (context) {
    var snake = this.game.getSnake();

    var _a = this.game.getConfiguration(),
        cellWidth = _a.cellWidth,
        cellHeight = _a.cellHeight; // head


    var size = CELL_SIZE * SCALE / 10;
    var offset = CELL_SIZE * SCALE / 3;
    var x = cellWidth * snake.getHead().x;
    var y = cellHeight * snake.getHead().y;
    context.fillStyle = "#111111";
    context.fillRect(x, y, cellWidth, cellHeight); // eyes

    switch (snake.getDirection()) {
      case "Up":
        context.beginPath();
        context.arc(x + offset, y + offset, size, 0, 2 * Math.PI, false);
        context.arc(x + 2 * offset, y + offset, size, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
        break;

      case "Down":
        context.beginPath();
        context.arc(x + offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
        context.arc(x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
        break;

      case "Right":
        context.beginPath();
        context.arc(x + 2 * offset, y + offset, size, 0, 2 * Math.PI, false);
        context.arc(x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
        break;

      case "Left":
        context.beginPath();
        context.arc(x + offset, y + offset, size, 0, 2 * Math.PI, false);
        context.arc(x + offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
        break;
    } // tail


    context.fillStyle = "#333333";
    var tail = snake.getTail();
    tail.forEach(function (cell) {
      return context.fillRect(cellWidth * cell.x, cellHeight * cell.y, cellWidth, cellHeight);
    });
  };

  GameUI.prototype.onKeyDown = function (event) {
    var snake = this.game.getSnake();

    switch (event.key) {
      case "w":
        event.preventDefault();
        snake.setDirection("Up");
        break;

      case "s":
        event.preventDefault();
        snake.setDirection("Down");
        break;

      case "a":
        event.preventDefault();
        snake.setDirection("Left");
        break;

      case "d":
        event.preventDefault();
        snake.setDirection("Right");
        break;
    }
  };

  return GameUI;
}();

var createCanvas = function createCanvas() {
  var container = document.getElementById("game");
  var canvas = document.createElement("Canvas");
  container.appendChild(canvas); // canvas element size in the page

  canvas.style.width = _Configuration.CELLS_HORIZONTAL * CELL_SIZE + "px";
  canvas.style.height = _Configuration.CELLS_VERTICAL * CELL_SIZE + "px"; // image buffer size

  canvas.width = _Configuration.CELLS_HORIZONTAL * CELL_SIZE * SCALE;
  canvas.height = _Configuration.CELLS_VERTICAL * CELL_SIZE * SCALE;
  return canvas;
};

var createConfiguration = function createConfiguration(canvas) {
  return {
    level: 0,
    speed: _Configuration.SPEED,
    width: canvas.width,
    height: canvas.height,
    nbCellsX: _Configuration.CELLS_HORIZONTAL,
    nbCellsY: _Configuration.CELLS_VERTICAL,
    cellWidth: canvas.width / _Configuration.CELLS_HORIZONTAL,
    cellHeight: canvas.height / _Configuration.CELLS_VERTICAL,
    apples: 5
  };
};

var canvas = createCanvas();
var configuration = createConfiguration(canvas);
var game = new _Game.Game(configuration);
new GameUI(canvas, game);
},{"./Configuration":"../src/snake/Configuration.ts","./Game":"../src/snake/Game.ts"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/snake/GameUI.ts"], null)
//# sourceMappingURL=/GameUI.b5483454.js.map