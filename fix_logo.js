const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<img src="assets\/logo\/logo-main\.png"[^>]+>/, '<img src="assets/logo/logo-footer.png" alt="Pure Foods Logo" class="w-[180px] h-auto invert mix-blend-screen object-contain transition-all duration-300 logo-img">');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
