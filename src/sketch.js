const width  = 600;
const height = 480;
const step   = Math.floor(height / 8);

const hLines = []; // horizontal lines [[x1,y1,x2,y2], [x1,y1,x2,y2], ...]
const vLines = []; // vertical   lines
let   xAxis  = []; // horizontal center line [x1,y1,x2,y2]
let   yAxis  = []; // vertical   center line
let s;

function setup() {
    createCanvas(width, height);
    // frameRate(60);
    
    // 그리드 좌표 계산
    const hBound = width/2  + step*5; // horizontal bound
    const vBound = height/2 + step*5; // vertical bound
    for (let i = -vBound; i <= vBound; i += step) {
        hLines.push([-hBound, i, hBound, i]); // [x1,y1,x2,y2]
    }
    for (let i = -hBound; i <= hBound; i+= step) {
        vLines.push([i, -vBound, i, vBound]);
    }
    xAxis = [-hBound, 0, hBound, 0];
    yAxis = [0, -vBound, 0, vBound];

    s = createSlider(0, 1, 0.5, 0.001);

    // draw1()
}
let old_a = 0;
let a=0;
function draw() {
    a = s.value();
    if (a === old_a) return;
    old_a = a;
// a+=deltaTime / 2000;
// if (a>=1)a=0;
    
    background(0);
    applyMatrix(1, 0, 0, -1, width/2, height/2); // 화면 가운데를 원점으로 설정

    stroke(100);
    strokeWeight(1);
    for (const pos of hLines) line(...pos); // [x1,y1,x2,y2]
    for (const pos of vLines) line(...pos);

    const matrix = [
        [0, 1],
        [1, 0]
    ];
    matrix[0][0] = (matrix[0][0] - 1) * a + 1;
    matrix[0][1] = matrix[0][1] * a;
    matrix[1][0] = matrix[1][0] * a;
    matrix[1][1] = (matrix[1][1] - 1) * a + 1;

    stroke(60, 170, 220);
    strokeWeight(1.5);
    for (const pos of hLines) transLine(...pos, matrix);
    for (const pos of vLines) transLine(...pos, matrix);

    stroke(200);
    strokeWeight(2);
    transLine(...xAxis, matrix);
    transLine(...yAxis, matrix);
    
    noStroke();
    fill(255, 4, 0);
    circle(0, 0, 13);

    fill(255, 204, 0);
    transCircle(0, step, 13, matrix)
}

function matmul(m1, m2) {
    return [
        m1[0][0] * m2[0] + m1[0][1] * m2[1],
        m1[1][0] * m2[0] + m1[1][1] * m2[1],
    ];
}

function transLine(x1, y1, x2, y2, matrix) {
    line(...matmul(matrix, [x1, y1]), ...matmul(matrix, [x2, y2]));
}

function transCircle(x, y, r, matrix) {
    circle(...matmul(matrix, [x, y]), r);
}
