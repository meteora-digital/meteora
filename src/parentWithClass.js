function parentWithClass(el, className) {
  let parent = el.parentNode;
  while((' ' + parent.className + ' ').indexOf(' ' + className + ' ') == -1) parent = parent.parentNode;
  return parent;
}

exports.parentWithClass = parentWithClass;