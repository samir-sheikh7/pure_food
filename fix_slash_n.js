const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the literal string '\n' with an actual newline character
    content = content.replace(/\\n/g, '\n');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed literal \\n in ' + file);
});
