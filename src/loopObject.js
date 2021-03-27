function loopObject(object, func) {
  if (object && typeof object === 'object') for (key in object) func(key, object[key]);
}

exports.loopObject = loopObject;