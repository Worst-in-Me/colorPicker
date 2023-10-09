// const body = document.querySelector('body');

// export function map<Item, Result>(list: Item[], fn: (arg: Item, idx: number) => Result): Result[] {
//     const result: Result[] = [];
//     for (const [idx, val] of list.entries()) {
//         result.push(fn(val, idx));
//     }

//     return result;
// }

// const k = new Array<number>(1, 2, 3);
// const b = map(k, String);

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    return canvas;
};

export const createColorPicker = () => {
    const canvas = createCanvas(40, 1536);
    const ctx = canvas.getContext('2d')!;

    const paintHueMap = () => {
        //red to blue
        const rgb = [255, 0, 0]; // red;
        let sign = 1;
        let index = 1;
        for (const value of new Array(256 * 6).keys()) {
            const [r, g, b] = rgb;
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(0, value, 40, 1);

            rgb[index] += sign;
            if (rgb[index] === 255 || rgb[index] === 0) {
                sign *= -1;

                if (index === 1) index = 0;
                else if (index === 0) index = 2;
                else index = 1;
            }
        }

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
