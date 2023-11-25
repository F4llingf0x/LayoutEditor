const canvas = document.getElementById("layoutSpace");

function initBackground() {
  let markerDistance = canvas.width / 30;
  let numberOfXMarkers = canvas.width / markerDistance;
  let numberOfYMarkers = parseInt(canvas.height / markerDistance);

  let xStart = (canvas.width - markerDistance * numberOfXMarkers) / 2;
  let yStart = (canvas.height - markerDistance * numberOfYMarkers) / 2;

  let dots = [];

  for (let i = 0; i < numberOfXMarkers; i++) {
    for (let j = 0; j < numberOfYMarkers; j++) {
      let currentMarker = new Dot(
        xStart + i * markerDistance,
        yStart + j * markerDistance
      );
      dots.push(currentMarker);
      currentMarker.draw();
    }
  }

  return dots;
}
