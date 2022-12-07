function attach(el, event, func, userdelay) {
  let throttle = false; // not throttled
  let debounce = false; // holder debounce
  let delay = userdelay || false;
  // Feature detection
  let passiveIfSupported = false;

  func(); // initialise function before adding event handlers

  try {
    window.addEventListener("test", null, 
      Object.defineProperty(
        {}, 
        "passive", 
        {
          get: function() { passiveIfSupported = { passive: false }; }
        }
      )
    );
  } catch(err) {}

  const attachment = (e) => {
    if (delay) {
      // throttle
      if (!throttle) {
        throttle = true;
        func(e);
        setTimeout(() => throttle = 0, delay);
      }
      // debounce
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        func();
      }, delay);
    } else {
      func();
    }
  }

  event.split(' ').forEach((type) => {
    if (passiveIfSupported) {
      el.addEventListener(type, (e) => attachment(e), passiveIfSupported);
    }else {
      el.addEventListener(type, (e) => attachment(e));
    }
  });
}

exports.attach = attach;