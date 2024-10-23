export class Canvas {
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;
    private static update: () => void;
    private static canvasID = "canvas";

    static {
        Canvas.canvas = document.getElementById(
            this.canvasID
        ) as HTMLCanvasElement;
        Canvas.context = Canvas.canvas.getContext("2d", {
            desynchronized: false, // causes issues on Brave when true
            // preserveDrawingBuffer: true, // ?
            // imageSmoothingEnabled: false, // ?
        }) as CanvasRenderingContext2D;

        // Disable default browser right click interaction
        Canvas.canvas.oncontextmenu = function (event) {
            event.preventDefault();
            // event.stopPropagation(); // ?
        };

        window.addEventListener("resize", Canvas.resizeCanvas);
        Canvas.resizeCanvas();

        // Canvas.context.scale(1, 1);
    }

    private static resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        Canvas.canvas.width = width;
        Canvas.canvas.height = height;
        // console.log(width, height);
    }

    static getWidth(): number {
        return Canvas.canvas.width;
    }

    static getHeight(): number {
        return Canvas.canvas.height;
    }

    static setAnimation(update: () => void) {
        Canvas.update = update;
    }

    static beginAnimation() {
        Canvas.update();
        requestAnimationFrame(Canvas.beginAnimation);
    }

    static setScale(scale: number) {
        Canvas.context.scale(scale, scale);
    }

    // Drawing

    static rectangle(x: number, y: number, width: number, height: number) {
        Canvas.context.fillRect(x, y, width, height);
    }

    static square(x: number, y: number, size: number) {
        Canvas.rectangle(x, y, size, size);
    }

    static setColor(color: string) {
        Canvas.context.fillStyle = color;
    }

    static text(text: string, x: number, y: number) {
        Canvas.context.fillText(text, x, y);
    }

    static circle(x: number, y: number, radius: number) {
        Canvas.context.beginPath();
        Canvas.context.arc(x, y, radius, 0, 2 * Math.PI);
        Canvas.context.fill();
    }
}
