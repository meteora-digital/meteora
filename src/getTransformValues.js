function getTransformValues(el) {
  let matrix = window.getComputedStyle(el).transform;
  // Remove the brackets and matrix strings
  let transformValues = matrix.replace('matrix(', '').replace(')', '');
  let transformArray = transformValues.split(',');

  return {
    scaleX: parseFloat(transformArray[0]),
    skewY: parseFloat(transformArray[1]),
    skewX: parseFloat(transformArray[2]),
    scaleY: parseFloat(transformArray[3]),
    translateX: parseFloat(transformArray[4]),
    translateY: parseFloat(transformArray[5]),
  }
}

exports.getTransformValues = getTransformValues;