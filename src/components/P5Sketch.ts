/* eslint-disable @typescript-eslint/no-unused-vars */
import P5 from 'p5';

type RectPos  = [number, number, number, number];
type Matrix22 = [[number, number], [number, number]];

interface P5Sketch extends P5 {
    start()    : void;
    stop()     : void;
    getSpeed() : void;
    setSpeed(value: number): void;
    setMatrix([a, b, c, d]: RectPos): void;
    drawOnce() : void;
}

function createP5(parent: HTMLElement, width: number, height: number) {
    function sketch(p5: P5Sketch) {
        // const width  = 600;
        // const height = 480;
        const step   = p5.floor(height / 8); // number of pixels in one cell
        const hLines : RectPos[] = []; // horizontal lines [[x1,y1,x2,y2], [x1,y1,x2,y2], ...]
        const vLines : RectPos[] = []; // vertical   lines
        let   xAxis  : RectPos   = [0, 0, 0, 0]; // horizontal center line [x1,y1,x2,y2]
        let   yAxis  : RectPos   = [0, 0, 0, 0]; // vertical   center line

        const matrix: Matrix22 = [
            [2, 1],
            [1, 2],
        ]; // setMatrix()
        const currMatrix: Matrix22 = [
            [0, 0],
            [0, 0],
        ]; // It will be calculated automatically.

        let sliderValue    = 0;
        let speed          = 0.005;
        let isPlaying      = false;

        p5.start     = function () { sliderValue = 0; isPlaying = true; };
        p5.stop      = function () { isPlaying = false; };
        p5.getSpeed  = function () { return speed;      };
        p5.setSpeed  = function (value) { speed = value; };
        p5.setMatrix = function ([a, b, c, d]) {
            matrix[0][0] = a;
            matrix[0][1] = b;
            matrix[1][0] = c;
            matrix[1][1] = d;
        };

        p5.setup = function () {
            const canvas = p5.createCanvas(width, height);
            canvas.parent(parent);
            // p5.frameRate(30);

            // Calculate coordinates of grid lines.
            const hBound = width  / 2 + step * 5; // horizontal bound
            const vBound = height / 2 + step * 5; // vertical   bound
            for (let i = -vBound; i <= vBound; i += step) hLines.push([-hBound, i, hBound, i]);
            for (let i = -hBound; i <= hBound; i += step) vLines.push([i, -vBound, i, vBound]);
            xAxis = [-hBound, 0, hBound, 0];
            yAxis = [0, -vBound, 0, vBound];

        };

        p5.draw = function () {
            if (!isPlaying) return;
            sliderValue += p5.deltaTime / 2500; // speed
            if (sliderValue >= 1) {
                sliderValue = 1;
                p5.stop();
            }

            p5.drawOnce();
        };

        p5.drawOnce = function () {
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
            currMatrix[0][0] = (matrix[0][0] - 1) * sliderValue + 1;
            currMatrix[0][1] = matrix[0][1] * sliderValue;
            currMatrix[1][0] = matrix[1][0] * sliderValue;
            currMatrix[1][1] = (matrix[1][1] - 1) * sliderValue + 1;

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

        function matmul(m1: Matrix22, m2: [number, number]): [number, number] {
            return [
                m1[0][0] * m2[0] + m1[0][1] * m2[1],
                m1[1][0] * m2[0] + m1[1][1] * m2[1],
            ];
        }

        function strokeFill(r: number, g: number, b: number) {
            p5.stroke(r, g, b);
            p5.fill(r, g, b);
        }

        function drawArrow(x: number, y: number, r: number) {
            // for unit vector
            const [nx, ny] = matmul(currMatrix, [x, y]);
            const angle = ny / (nx + 0.0001);
            p5.line(0, 0, nx, ny);
            p5.push();
            p5.translate(nx, ny);
            if (nx >= 0) {
                p5.rotate(-p5.PI / 2 + p5.atan(angle));
            } else {
                p5.rotate(p5.PI / 2 + p5.atan(angle));
            }
            p5.triangle(0, r, -r, -r, r, -r);
            p5.pop();
        }

        // Do NOT use applyMatrix() in p5.js.
        // Otherwise, thickness of line changes, and a circle becomes an ellipse.

        function transLine(x1: number, y1: number, x2: number, y2: number) {
            p5.line(...matmul(currMatrix, [x1, y1]), ...matmul(currMatrix, [x2, y2]));
        }

        function transCircle(x: number, y: number, r: number) {
            p5.circle(...matmul(currMatrix, [x, y]), r);
        }

        function transTriangle(x: number, y: number, r: number) {
            const [nx, ny] = matmul(currMatrix, [x, y]);
            p5.triangle(nx, ny + r, nx - r, ny - r, nx + r, ny - r);
        }
    }

    return new P5(sketch);
}

export default createP5;
