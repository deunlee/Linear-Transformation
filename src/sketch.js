const width  = 600;
const height = 480;
const step   = Math.floor(height / 8); // 좌표 평면 1칸의 픽셀 수

const hLines = []; // horizontal lines [[x1,y1,x2,y2], [x1,y1,x2,y2], ...]
const vLines = []; // vertical   lines
let   xAxis  = []; // horizontal center line [x1,y1,x2,y2]
let   yAxis  = []; // vertical   center line
let s;

const matrix = [
    [0, 1],
    [1, 0]
];
const currMatrix = [[0, 0], [0, 0]]; // It will calculated.

function setup() {
    createCanvas(width, height);
    // frameRate(60);
    
    // Calculate coordinates of grid lines.
    const hBound = width/2  + step*5; // horizontal bound
    const vBound = height/2 + step*5; // vertical   bound
    for (let i = -vBound; i <= vBound; i += step) hLines.push([-hBound, i, hBound, i]);
    for (let i = -hBound; i <= hBound; i += step) vLines.push([i, -vBound, i, vBound]);
    xAxis = [-hBound, 0, hBound, 0];
    yAxis = [0, -vBound, 0, vBound];

    s = createSlider(0, 1, 0.25, 0.001);
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
    translate(width/2, height/2);
    applyMatrix(1, 0, 0, -1, 0, 0); // 화면 가운데를 원점으로 설정

    // Draw background grid lines.
    stroke(100);
    strokeWeight(1);
    for (const pos of hLines) line(...pos); // [x1,y1,x2,y2]
    for (const pos of vLines) line(...pos);

    // Apply linear transformation.
    currMatrix[0][0] = (matrix[0][0] - 1) * a + 1;
    currMatrix[0][1] = matrix[0][1] * a;
    currMatrix[1][0] = matrix[1][0] * a;
    currMatrix[1][1] = (matrix[1][1] - 1) * a + 1;

    // Draw grid lines.
    strokeWeight(1.5);
    stroke(60, 170, 220);
    for (const pos of hLines) transLine(...pos);
    for (const pos of vLines) transLine(...pos);

    // Draw x and y axes.
    stroke(200);
    strokeWeight(2);
    transLine(...xAxis);
    transLine(...yAxis);
    
    // Draw unit vectors.
    strokeWeight(3);
    strokeFill(255, 110, 80);
    drawArrow(step, 0, 6); // red for x (i hat)
    strokeFill(120, 190, 90);
    drawArrow(0, step, 6); // green for y (j hat)

    // Draw the origin.
    noStroke();
    fill(255);
    circle(0, 0, 12);

    // Draw a dot. (1,1)
    fill(255, 204, 0);
    transCircle(step, step, 12);
}

function setMatrix(a, b, c, d) {
    matrix[0][0] = a;
    matrix[0][1] = b;
    matrix[1][0] = c;
    matrix[1][1] = d;
}

function matmul(m1, m2) {
    return [
        m1[0][0] * m2[0] + m1[0][1] * m2[1],
        m1[1][0] * m2[0] + m1[1][1] * m2[1],
    ];
}

function strokeFill(r, g, b) {
    stroke(r, g, b);
    fill(r, g, b);
}

function drawArrow(x, y, r) { // for unit vector
    let [nx, ny] = matmul(currMatrix, [x, y]);
    let angle = (ny / (nx+0.0001));
    line(0, 0, nx, ny);
    push();
    translate(nx, ny);
    rotate(-PI/2 + atan(angle));
    triangle(0, r, -r, -r, r, -r);
    pop();
}

// p5.js의 applyMatrix()를 쓰면 직선 두께가 변하고, 원이 타원이 된다.
// 따라서 직접 구현한 다음 함수를 사용한다.

function transLine(x1, y1, x2, y2) {
    line(...matmul(currMatrix, [x1, y1]),
         ...matmul(currMatrix, [x2, y2]));
}

function transCircle(x, y, r) {
    circle(...matmul(currMatrix, [x, y]), r);
}

function transTriangle(x, y, r) {
    const [nx, ny] = matmul(currMatrix, [x, y]);
    triangle(nx, ny+r, nx-r, ny-r, nx+r, ny-r);
}
