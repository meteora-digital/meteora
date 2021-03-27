function nodeArray(nodeList = []) {
  const array = [];
  for (var i = 0; i < nodeList.length; i++) array.push(nodeList[i]);
  return array;
}

exports.nodeArray = nodeArray;