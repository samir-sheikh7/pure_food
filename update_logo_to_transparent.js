const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace logo-footer.png with logo-transparent.png
    content = content.replace(/assets\/logo\/logo-footer\.png/g, 'assets/logo/logo-transparent.png');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated to transparent logo in ' + file);
});
