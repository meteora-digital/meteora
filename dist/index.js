function Event(event, params) {
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

exports.Event = Event;
function ajax(options) {
  var httpRequest = new XMLHttpRequest();
  var settings = Object.assign({
    url: '/',
    method: 'GET',
    data: '',
    contentType: false,
    load: function load(response) {
      if (settings.success !== undefined && typeof settings.success === 'function') {
        if (response.explicitOriginalTarget !== undefined) {
          settings.success(response.explicitOriginalTarget.response);
        } else if (response.currentTarget) {
          settings.success(response.currentTarget.response);
        }
      }

      ;
    },
    error: function error(response) {
      console.warn(response);
    }
  }, options);

  if (settings.contentType != false) {
    if (settings.method === 'GET') {
      settings.contentType = 'application/json;charset=UTF-8';
    } else if (settings.method === 'POST') {
      settings.contentType = 'application/x-www-form-urlencoded';
    } else {
      console.warn('method: ', settings.method, 'is not valid.');
      return false;
    }
  }

  httpRequest.addEventListener("load", settings.load);
  httpRequest.addEventListener("error", settings.error);
  httpRequest.open(settings.method, settings.url);
  httpRequest.setRequestHeader('x-requested-with', "XMLHttpRequest");
  httpRequest.setRequestHeader('Content-Type', settings.contentType);
  httpRequest.setRequestHeader('Access-Control-Allow-Origin', settings.url);
  httpRequest.send(settings.data);
}

;
exports.ajax = ajax;
function attach(el, event, func, userdelay) {
  var throttle = false; // not throttled

  var debounce = false; // holder debounce

  var delay = userdelay || false; // Feature detection

  var passiveIfSupported = false;
  func(); // initialise function before adding event handlers

  try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
      get: function get() {
        passiveIfSupported = {
          passive: false
        };
      }
    }));
  } catch (err) {}

  var attachment = function attachment(e) {
    if (delay) {
      // throttle
      if (!throttle) {
        throttle = true;
        func(e);
        setTimeout(function () {
          return throttle = 0;
        }, delay);
      } // debounce


      clearTimeout(debounce);
      debounce = setTimeout(function () {
        func();
      }, delay);
    } else {
      func();
    }
  };

  event.split(' ').forEach(function (type) {
    if (type === 'scroll' && passiveIfSupported) {
      el.addEventListener(type, function (e) {
        return attachment(e);
      }, passiveIfSupported);
    } else {
      el.addEventListener(type, function (e) {
        return attachment(e);
      });
    }
  });
}

exports.attach = attach;
function closest(el, selector) {
  var element = el;
  var closest = el.parentNode.querySelector(selector) || false;

  while (closest == false) {
    element = element.parentNode;
    closest = element.parentNode.querySelector(selector) || false;
  }

  return closest;
}

exports.closest = closest;
function containsClass(el, className) {
  return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
}

exports.containsClass = containsClass;
function drawSVG(svg) {
  var paths = svg.querySelectorAll('circle, ellipsis, line, polygon, polyline, rect, path'); // Initialize

  for (var i = 0; i < paths.length; i++) {
    paths[i].style.strokeDasharray = paths[i].getTotalLength();
    paths[i].style.strokeDashoffset = paths[i].getTotalLength();
  } // Our draw function. 1 = erase, 2 = draw


  var draw = function draw(duration) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    for (var i = 0; i < paths.length; i++) {
      paths[i].style.transition = "stroke-dashoffset ".concat(duration / 1000, "s ease");
      paths[i].style.strokeDashoffset = paths[i].getTotalLength() * dir;
    }
  };

  svg.draw = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    return draw(duration, 2);
  };

  svg.erase = function () {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    return draw(duration, 1);
  };
}

exports.drawSVG = drawSVG;
function each(selector, func) {
  var nodeList = document.querySelectorAll(selector);
  var nodeArray = [];

  for (var i = 0; i < nodeList.length; i++) {
    nodeArray.push(nodeList[i]);
  }

  if (func && typeof func === 'function') nodeArray.forEach(function (el, i) {
    return func(el, i);
  });
  return nodeArray;
}

exports.each = each;
function getTransformValues(el) {
  var matrix = window.getComputedStyle(el).transform; // Remove the brackets and matrix strings

  var transformValues = matrix.replace('matrix(', '').replace(')', '');
  var transformArray = transformValues.split(',');
  return {
    scaleX: parseFloat(transformArray[0]),
    skewY: parseFloat(transformArray[1]),
    skewX: parseFloat(transformArray[2]),
    scaleY: parseFloat(transformArray[3]),
    translateX: parseFloat(transformArray[4]),
    translateY: parseFloat(transformArray[5])
  };
}

exports.getTransformValues = getTransformValues;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function loopObject(object, func) {
  if (object && _typeof(object) === 'object') for (key in object) {
    func(key, object[key]);
  }
}

exports.loopObject = loopObject;
function nodeArray() {
  var nodeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var array = [];

  for (var i = 0; i < nodeList.length; i++) {
    array.push(nodeList[i]);
  }

  return array;
}

exports.nodeArray = nodeArray;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function objectAssign(defaultSettings, userSettings) {
  for (var key in defaultSettings) {
    if (userSettings[key] !== undefined) {
      if (_typeof(defaultSettings[key]) === "object" && _typeof(userSettings[key]) === "object") {
        objectAssign(defaultSettings[key], userSettings[key]);
      } else {
        defaultSettings[key] = userSettings[key];
      }
    }
  }

  return defaultSettings;
}

exports.objectAssign = objectAssign;
function offset(el) {
  var obj = {
    x: 0,
    y: 0
  };

  while (el) {
    obj.y += el.offsetTop;
    obj.x += el.offsetLeft;
    el = el.offsetParent;
  }

  return obj;
}

exports.offset = offset;
function parentWithClass(el, className) {
  var parent = el.parentNode;

  while ((' ' + parent.className + ' ').indexOf(' ' + className + ' ') == -1) {
    parent = parent.parentNode;
  }

  return parent;
}

exports.parentWithClass = parentWithClass;
function relativeTarget(target, relativeElement) {
  var node = target;
  var parent = node.parentNode;

  if (node !== relativeElement) {
    while (parent && parent !== relativeElement) {
      parent = parent.parentNode;
    }

    return parent === relativeElement;
  } else {
    return true;
  }
}

exports.relativeTarget = relativeTarget;
function serialize(form) {
  // Setup our serialized data
  var serialized = []; // Loop through each field in the form

  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]; // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields

    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue; // If a multi-select, get all selections

    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
      }
    } // Convert field data to a query string
    else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
      }
  }

  return serialized.join('&');
}

;
exports.serialize = serialize;
function stagger(arrayOfElements, func) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var setDelay = delay;

  for (var i = 0; i < arrayOfElements.length; i++) {
    func(arrayOfElements[i], delay);
    delay += setDelay;
  }
}

exports.stagger = stagger;