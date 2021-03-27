function stagger(arrayOfElements, func, delay = 500) {
  const setDelay = delay;
  for (var i = 0; i < arrayOfElements.length; i++) {
    func(arrayOfElements[i], delay);
    delay += setDelay;
  }
}

exports.stagger = stagger;