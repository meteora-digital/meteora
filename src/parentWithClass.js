function parentWithClass(el, className) {
	let parent = el.parentNode;

	while(!parent.classList.contains(className)) {
		parent = parent.parentNode;
	}

	return parent;
}

exports.parentWithClass = parentWithClass;