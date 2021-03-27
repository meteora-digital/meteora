function closest(el, selector) {
  let element = el;
  let closest = el.parentNode.querySelector(selector) || false;

  while (closest == false) {
    element = element.parentNode;
    closest = element.parentNode.querySelector(selector) || false;
  }

  return closest;
}

exports.closest = closest;