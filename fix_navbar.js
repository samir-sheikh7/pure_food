const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync('website/' + file, 'utf8');
    
    const headerStart = content.indexOf('<header');
    const headerEnd = content.indexOf('</header>') + 9;
    
    if (headerStart === -1) return;
    
    let header = content.substring(headerStart, headerEnd);
    
    // 1. Logo
    header = header.replace('mix-blend-multiply', 'brightness-0 invert');
    
    // 2. Links & Text
    header = header.replace(/text-on-surface-variant/g, 'text-white/80');
    header = header.replace(/hover:text-primary/g, 'hover:text-white');
    header = header.replace(/text-on-surface/g, 'text-white');
    header = header.replace(/text-charcoal-text/g, 'text-white/60');
    
    // 3. Dropdown background
    header = header.replace('bg-surface shadow-xl', 'bg-black/90 shadow-xl border-white/10');
    header = header.replace(/hover:bg-surface-container-high/g, 'hover:bg-white/10');
    
    // 4. Mobile menu background
    header = header.replace('bg-surface border-t border-outline-variant/20', 'bg-black/95 border-t border-white/10');
    
    // 5. Button hovers
    header = header.replace(/hover:bg-surface-container/g, 'hover:bg-white/10');
    
    // 6. Active nav state in data attribute
    header = header.replace('text-primary font-bold border-b-2 border-primary', 'text-white font-bold border-b-2 border-white');
    
    // 7. Border in header
    header = header.replace('border-outline-variant', 'border-white/20');
    
    content = content.substring(0, headerStart) + header + content.substring(headerEnd);
    fs.writeFileSync('website/' + file, content, 'utf8');
    console.log('Fixed navbar in ' + file);
});
