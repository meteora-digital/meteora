function containsClass(el, className) {
    return (' ' + el.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

exports.containsClass = containsClass;