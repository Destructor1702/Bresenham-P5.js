function Cell(i, j) {
    this.current = false;
    this.end = false;
    this.i = i;
    this.j = j;
    this.visited = false;
    this.weightValue = 0;

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;

        if (this.current) {
            fill(20, 20, 230);
            stroke(230, 230, 230, 0);
            rect(x, y, w, w);

        } else if (this.end) {
            fill(10, 10, 10);
            stroke(10, 10, 10, 0);
            rect(x, y, w, w);

        } else if (this.visited) {
            fill(27 + (this.weightValue * 30), 104, 27);
            stroke(27 + (this.weightValue * 30), 104, 27,0);
            rect(x, y, w, w);

        } else {
            fill(227, 227 , 227);
            stroke(127, 127, 127, 0);
            rect(x, y, w, w);
        }
    }
}

