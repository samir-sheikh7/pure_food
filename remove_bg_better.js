const { Jimp } = require('jimp');

async function processLogo() {
    try {
        const image = await Jimp.read('assets/logo/logo-footer.png');
        
        // Autocrop the white borders
        image.autocrop({ tolerance: 0.1 }); 
        
        // Remove white background with a hard threshold
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // If pixel is light grey or white, make it transparent
            if (r > 210 && g > 210 && b > 210) {
                this.bitmap.data[idx + 3] = 0; 
                this.bitmap.data[idx + 0] = 255;
                this.bitmap.data[idx + 1] = 255;
                this.bitmap.data[idx + 2] = 255;
            }
        });
        
        await image.write('assets/logo/logo-transparent.png');
        console.log('Processed logo successfully');
    } catch (e) {
        console.error(e);
    }
}

processLogo();
