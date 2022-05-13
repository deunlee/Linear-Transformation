const sketch = function (p5) {
    const width  = 600;
    const height = 480;
    const step = p5.floor(height / 8); // 좌표 평면 1칸의 픽셀 수

    const hLines = []; // horizontal lines [[x1,y1,x2,y2], [x1,y1,x2,y2], ...]
    const vLines = []; // vertical   lines
    let xAxis = []; // horizontal center line [x1,y1,x2,y2]
    let yAxis = []; // vertical   center line
    let s;

    const matrix = [
        [2, 1],
        [1, 2],
    ];
    const currMatrix = [
        [0, 0],
        [0, 0],
    ]; // It will be calculated.

    p5.setup = function setup() {
        p5.createCanvas(width, height);
        // frameRate(60);

        // Calculate coordinates of grid lines.
        const hBound = width / 2 + step * 5; // horizontal bound
        const vBound = height / 2 + step * 5; // vertical   bound
        for (let i = -vBound; i <= vBound; i += step)
            hLines.push([-hBound, i, hBound, i]);
        for (let i = -hBound; i <= hBound; i += step)
            vLines.push([i, -vBound, i, vBound]);
        xAxis = [-hBound, 0, hBound, 0];
        yAxis = [0, -vBound, 0, vBound];

        s = p5.createSlider(0, 1, 0.25, 0.001);
    };

    let old_a = 0;
    let a = 0;

    p5.draw = function draw() {

        a = s.value();
        if (a === old_a) return;
        old_a = a;
        // a+=deltaTime / 2000;
        // if (a>=1)a=0;

        p5.background(0);
        p5.translate(width / 2, height / 2); // Set the center of the screen as the origin.
        // Change the coordinate system in the direction of increasing the top right.
        p5.applyMatrix(1, 0, 0, -1, 0, 0);

        // Draw background grid lines.
        p5.stroke(120); // gray
        p5.strokeWeight(0.5);
        for (const pos of hLines) p5.line(...pos); // [x1,y1,x2,y2]
        for (const pos of vLines) p5.line(...pos);

        // Apply linear transformation.
        currMatrix[0][0] = (matrix[0][0] - 1) * a + 1;
        currMatrix[0][1] = matrix[0][1] * a;
        currMatrix[1][0] = matrix[1][0] * a;
        currMatrix[1][1] = (matrix[1][1] - 1) * a + 1;

        // Draw grid lines.
        p5.strokeWeight(1.5);
        p5.stroke(60, 170, 220);
        for (const pos of hLines) transLine(...pos);
        for (const pos of vLines) transLine(...pos);

        // Draw x and y axes.
        p5.stroke(200);
        p5.strokeWeight(2);
        transLine(...xAxis);
        transLine(...yAxis);

        // Draw unit vectors.
        p5.strokeWeight(3);
        strokeFill(255, 110, 80);
        drawArrow(step, 0, 6); // red for x (i hat)
        strokeFill(120, 190, 90);
        drawArrow(0, step, 6); // green for y (j hat)

        // Draw the origin.
        p5.noStroke();
        p5.fill(255);
        p5.circle(0, 0, 12);

        // Draw a dot. (1,1)
        p5.fill(255, 204, 0);
        transCircle(step, step, 12);
    };

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
        p5.stroke(r, g, b);
        p5.fill(r, g, b);
    }

    function drawArrow(x, y, r) {
        // for unit vector
        let [nx, ny] = matmul(currMatrix, [x, y]);
        let angle = ny / (nx + 0.0001);
        p5.line(0, 0, nx, ny);
        p5.push();
        p5.translate(nx, ny);
        p5.rotate(-p5.PI / 2 + p5.atan(angle));
        p5.triangle(0, r, -r, -r, r, -r);
        p5.pop();
    }

    // Do NOT use applyMatrix() in p5.js.
    // Otherwise, thickness of line changes, and a circle becomes an ellipse.

    function transLine(x1, y1, x2, y2) {
        p5.line(...matmul(currMatrix, [x1, y1]), ...matmul(currMatrix, [x2, y2]));
    }

    function transCircle(x, y, r) {
        p5.circle(...matmul(currMatrix, [x, y]), r);
    }

    // function transTriangle(x, y, r) {
    //     const [nx, ny] = matmul(currMatrix, [x, y]);
    //     triangle(nx, ny + r, nx - r, ny - r, nx + r, ny - r);
    // }
};

const mySketch = new p5(sketch);
