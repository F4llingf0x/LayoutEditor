class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = canvas.width * 0.0007;
    this.color = markerColor;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
