function each(selector, func) {
  const nodeList = document.querySelectorAll(selector);
  const nodeArray = [];

  for (var i = 0; i < nodeList.length; i++) nodeArray.push(nodeList[i]);

  if (func && typeof func === 'function') nodeArray.forEach((el,i) => func(el,i));
  return nodeArray;
}

exports.each = each;
