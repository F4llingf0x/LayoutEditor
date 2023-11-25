class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 1;
    this.color = elementColor;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  setEnd(x1, y1) {
    this.radius = Math.sqrt(
      Math.pow(x1 - this.x, 2) + Math.pow(y1 - this.y, 2)
    );
  }
}
