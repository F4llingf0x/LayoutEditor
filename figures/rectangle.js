class Rectang {
  constructor(x, y) {
    this.x0 = x;
    this.y0 = y;
    this.x1 = 0;
    this.y1 = 0;
    this.color = elementColor;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.x0, this.y0, this.x1, this.y1);
    ctx.stroke();
  }

  setEnd(x1, y1) {
    this.x1 = x1 - this.x0;
    this.y1 = y1 - this.y0;
  }
}
