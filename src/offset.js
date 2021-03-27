function offset(el) {
  const obj = {
    x: 0,
    y: 0,
  };

  while(el) {
    obj.y += el.offsetTop;
    obj.x += el.offsetLeft;
    el = el.offsetParent;
  }

  return obj;
}

exports.offset = offset;