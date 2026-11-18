const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace 'group' on the relative container
    content = content.replace('class="relative group"', 'class="relative dropdown"');
    
    // Replace hover on the anchor and add dropdown-btn class
    content = content.replace('text-white/80 group-hover:text-white py-2', 'text-white/80 hover:text-white py-2 dropdown-btn');
    
    // Replace dropdown menu classes
    content = content.replace('opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all', 'opacity-0 invisible transition-all dropdown-menu');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed dropdown in ' + file);
});
