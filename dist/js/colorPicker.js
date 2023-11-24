const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};
const createElement = (elementName, className, content) => {
    const element = document.createElement(elementName);
    element.className = className;
    element.append(content);
    return element;
};
export const createColorPicker = () => {
    const buttonsBar = createElement('div', 'buttonsBar', '');
    const buttonClear = createElement('div', 'buttonClear button', 'Clear');
    const buttonSave = createElement('div', 'buttonSave button', 'Save');
    document.body.appendChild(buttonsBar);
    buttonsBar.append(buttonClear, buttonSave);
    const scale = 0.3;
    const canvas = createCanvas(40, 1536 * scale);
    const ctx = canvas.getContext('2d');
    ctx.scale(1, scale);
    const rgb = [255, 0, 0]; // red;
    let sign = 1;
    let index = 1;
    const colors = [];
    const pickColorFromHeight = (height) => {
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
            document.body.style.backgroundColor = colors[(event.offsetY / scale) | 0];
            buttonSave.style.backgroundColor = colors[(event.offsetY / scale) | 0];
        });
    };
    const clearMap = () => {
        buttonClear.addEventListener('click', () => {
            document.body.style.backgroundColor = '#fff';
            buttonSave.style.backgroundColor = '#fff';
            const pickedColors = document.querySelectorAll('.savedColor');
            // console.log(pickedColors);
            for (const color of pickedColors)
                color.remove();
            // console.log(pickedColors);
        });
    };
    const saveColor = () => {
        buttonSave.addEventListener('click', () => {
            if (buttonSave.style.backgroundColor !== '#fff') {
                const savedColor = createElement('div', 'button savedColor', '');
                savedColor.style.backgroundColor = buttonSave.style.backgroundColor;
                savedColor.textContent = buttonSave.style.backgroundColor;
                buttonsBar.append(savedColor);
            }
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
                if (index === 1)
                    index = 0;
                else if (index === 0)
                    index = 2;
                else
                    index = 1;
            }
        }
        pickHeightOnClick();
        saveColor();
        clearMap();
    };
    paintHueMap();
    return canvas;
};
