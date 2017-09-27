var cols, rows;
var w = 15;     //ancho casilla
var grid = [];  //mapa
var current;    //casilla actual
var end;        //casilla final
var origin;

var en_start = false;
var en_end = false;
var locked = false;
var cameFrom;

function setup() {
    background(127, 127, 127, 0);
    fill(227, 227, 227);
    createCanvas(600, 600);
    cols = floor(width / w);
    rows = floor(height / w);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    setCurrent(0, 0);
    setEnd(rows - 1, cols - 1);
    cameFrom = current;
}


function mousePressed() {
    if (locked === false) {
        clc_x = parseInt(mouseX / w);
        clc_y = parseInt(mouseY / w);

        if (en_start) {
            setCurrent(clc_x, clc_y);
        }
        if (en_end) {
            setEnd(clc_x, clc_y);
        }
    }
}


function draw() {
    background(61, 150, 34);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    if (locked === true) {
        Heuristic();
    }
}


///HEURISTIC
function Heuristic() {
    if (current !== end) {

        var e = document.getElementById("selAlgoritm");
        var option = e.options[e.selectedIndex].value;

        B = current;
        if (option === 'BR'){
            drawBresenhamLine(current.i, current.j, end.i, end.j);
        }if(option === 'PNT'){
            puntopendiente(current.i, current.j, end.i, end.j);
        }
        cameFrom = B;
    } else {
        var ddx = end.i - origin.i;
        var ddy = end.j - origin.j;
        setEnd((end.i + ddx)%40, (end.j + ddy)%40);
    }
}


////AUX FUNCTIONS ////
function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function setCurrent(x, y) {
    if (grid[index(x, y)] !== undefined) {
        before = current;
        for (g in grid) {
            grid[g].current = false;
        }

        grid[index(x, y)].current = true;
        current = grid[index(x, y)];
        current.weightValue++;
        current.visited = true;
        en_start = false;
        console.log('current : ' + x + ',' + y);
        if (cameFrom !== undefined && locked === false) {
            cameFrom.visited = false;
            cameFrom.weightValue = 0;
            origin = cameFrom;
        }
    } else {
        console.log('Invalid position: ' + x + ',' + y);
    }
}

function setEnd(x, y) {
    if (grid[index(x, y)] !== undefined) {
    for (g in grid) {
        grid[g].end = false;
    }
    grid[index(x, y)].end = true;
    end = grid[index(x, y)];
    en_end = false;
    console.log('end : ' + x + ',' + y);
    } else {
        console.log('Invalid position: ' + x + ',' + y);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

drawBresenhamLine = function (x0, y0, x1, y1) {
    var k = 0;
    var dx, dy, e2, err, sx, sy;
    console.log('Called LBR : ' + x0 + ',' + y0 + '->' + x1 + ',' + y1);
    dx = Math.abs(x1 - x0);
    sx = x0 < x1 ? 1 : -1;
    dy = Math.abs(y1 - y0);
    sy = y0 < y1 ? 1 : -1;
    err = (dx > dy ? dx : -dy) / 2;
    while (true) {
        //console.log('Push : '+x0 +' ,'+ y0);
        setCurrent(x0, y0);
        setEnd(x1,y1);
        if (x0 === x1 && y0 === y1) {
            break;
        }
        e2 = err;
        if (e2 > -dx) {
            err -= dy;
            x0 += sx;

        }
        if (e2 < dy) {
            err += dx;
            y0 += sy;

        }
        if (current !== end){

        }
    }


    return null;
};





function puntopendiente(x0, y0, x1, y1)
{
    var dx = x1 - x0;
    var dy = y1 - y0;

    setCurrent( x0, y0);
    if (Math.abs(dx) > Math.abs(dy)) {          // pendiente < 1
        var m =  dy /  dx;
        var b = y0 - m*x0;
        if(dx<0)
            dx =  -1;
        else
            dx =  1;
        while (x0 !== x1) {
            x0 += dx;
            y0 = Math.round(m*x0 + b);
            setCurrent(x0, y0);
        }
    } else
    if (dy !== 0) {                              // slope >= 1
         m =  dx /  dy;      // compute slope
         b = x0 - m*y0;
        if(dy<0)
            dy =  -1;
        else
            dy =  1;
        while (y0 !== y1) {
            y0 += dy;
            x0 = Math.round(m*y0 + b);
            setCurrent( x0, y0);
        }
    }
}

