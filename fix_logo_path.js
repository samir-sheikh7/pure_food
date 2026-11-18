const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace logo-main.png with logo-footer.png
    content = content.replace(/assets\/logo\/logo-main\.png/g, 'assets/logo/logo-footer.png');
    
    // If they meant the hover effect isn't working because of the transparent border...
    // The links have: hover:text-primary transition-colors duration-300
    // That should work.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed logo in ' + file);
});
