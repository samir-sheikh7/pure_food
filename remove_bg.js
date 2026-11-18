const { Jimp } = require('jimp');

async function removeWhiteBg() {
    const image = await Jimp.read('assets/logo/logo-footer.png');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        
        // If the pixel is white or very close to white
        if (red > 230 && green > 230 && blue > 230) {
            // Calculate how close to pure white it is (230-255)
            // 255 -> alpha 0, 230 -> alpha 255
            const avg = (red + green + blue) / 3;
            const alpha = Math.max(0, 255 - ((avg - 230) * 10.2));
            this.bitmap.data[idx + 3] = Math.min(this.bitmap.data[idx + 3], alpha);
        }
    });
    await image.write('assets/logo/logo-transparent.png');
    console.log('Saved as logo-transparent.png');
}

removeWhiteBg().catch(console.error);
