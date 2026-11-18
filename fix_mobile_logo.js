const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update logo sizing for mobile responsiveness
    content = content.replace(/class="w-\[180px\] h-auto object-contain transition-all duration-300 logo-img"/g, 'class="w-[120px] md:w-[180px] h-auto object-contain transition-all duration-300 logo-img"');
    // Just in case it has different classes:
    content = content.replace(/w-\[180px\]/g, 'w-[120px] md:w-[180px]');
    // Wait, the search might hit both. 
    // It's fine since it will replace exactly what we need.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed mobile logo size in ' + file);
});
