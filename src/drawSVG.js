function drawSVG(svg) {
  const paths = svg.querySelectorAll('circle, ellipsis, line, polygon, polyline, rect, path');

  // Initialize
  for (var i = 0; i < paths.length; i++) {
    paths[i].style.strokeDasharray = paths[i].getTotalLength();
    paths[i].style.strokeDashoffset = paths[i].getTotalLength();
  }

  // Our draw function. 1 = erase, 2 = draw
  const draw = (duration, dir = 1) => {
    for (var i = 0; i < paths.length; i++) {
      paths[i].style.transition = `stroke-dashoffset ${duration / 1000}s ease`;
      paths[i].style.strokeDashoffset = paths[i].getTotalLength() * dir;
    }
  }

  svg.draw = (duration = 1000) => draw(duration, 2);
  svg.erase = (duration = 1000) => draw(duration, 1);
}

exports.drawSVG = drawSVG;