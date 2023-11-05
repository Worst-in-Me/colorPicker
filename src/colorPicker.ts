const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    return canvas;
};

export const createColorPicker = () => {
    const canvas = createCanvas(40, 1536);
    const ctx = canvas.getContext('2d')!;

    const rgb = [255, 0, 0]; // red;
    let sign = 1;
    let index = 1;

    const colors: string[] = [];

    const pickColorFromHeight = (height: number): string => {
        const step = (height / 255) | 0;
        const color = height - step * 255;
        switch (step) {
            case 0:
                colors.push(`rgb(${255}, ${color}, ${0})`);
                return `rgb(${255}, ${color}, ${0})`;
            case 1:
                colors.push(`rgb(${255 - color}, ${255}, ${0})`);
                return `rgb(${255 - color}, ${255}, ${0})`;
            case 2:
                colors.push(`rgb(${0}, ${255}, ${color})`);
                return `rgb(${0}, ${255}, ${color})`;
            case 3:
                colors.push(`rgb(${0}, ${255 - color}, ${255})`);
                return `rgb(${0}, ${255 - color}, ${255})`;
            case 4:
                colors.push(`rgb(${color}, ${0}, ${255})`);
                return `rgb(${color}, ${0}, ${255})`;
            case 5:
                colors.push(`rgb(${255}, ${0}, ${255 - color})`);
                return `rgb(${255}, ${0}, ${255 - color})`;
            default:
                return `rgb(${255}, ${0}, ${0})`;
        }
    };

    const pickHeightOnClick = () => {
        canvas.addEventListener('click', (event) => {
            document.body.style.backgroundColor = colors[event.offsetY];
        });
    };

    const paintHueMap = () => {
        //red to blue

        for (const height of new Array(255 * 6).keys()) {
            ctx.fillStyle = pickColorFromHeight(height);
            ctx.fillRect(0, height, 40, 1);

            rgb[index] += sign;
            if (rgb[index] === 255 || rgb[index] === 0) {
                sign *= -1;

                if (index === 1) index = 0;
                else if (index === 0) index = 2;
                else index = 1;
            }
        }
        pickHeightOnClick();

        // for (const b of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(255, 0, ${b})`;
        //     ctx.fillRect(0, b, 400, 1);
        // }
        // for (const r of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(${255 - r}, 0, 255)`;
        //     ctx.fillRect(0, 256 + r, 400, 1);
        // }
        // //blue to green
        // for (const g of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(0, ${g}, 255)`;
        //     ctx.fillRect(0, 256 * 2 + g, 400, 1);
        // }
        // for (const b of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(0, 255, ${255 - b})`;
        //     ctx.fillRect(0, 256 * 3 + b, 400, 1);
        // }
        // //green to red
        // for (const r of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(${r}, 255, 0)`;
        //     ctx.fillRect(0, 256 * 4 + r, 400, 1);
        // }
        // for (const g of new Array(256).keys()) {
        //     ctx.fillStyle = `rgb(255, ${255 - g}, 0)`;
        //     ctx.fillRect(0, 256 * 5 + g, 400, 1);
        // }
    };

    paintHueMap();

    return canvas;
};
