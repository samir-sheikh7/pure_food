const fs = require('fs');
const files = ['index.html', 'about.html', 'products.html', 'certificates.html', 'contact.html'];

const newHeader = `  <header class="fixed top-0 w-full z-50 bg-transparent transition-all duration-300">
    <div class="h-20 max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-gutter">
      <div class="flex items-center gap-stack-sm shrink-0">
        <a href="index.html" class="flex items-center gap-stack-sm" aria-label="Home">
          <img src="assets/logo/logo-main.png" alt="Pure Foods Logo" class="w-[180px] h-auto object-contain transition-all duration-300 logo-img">
        </a>
      </div>
      <nav class="hidden md:flex items-center gap-stack-lg" aria-label="Main Navigation">
        <a class="nav-link transition-colors duration-300 py-2 text-white/80 hover:text-primary font-medium border-b-2 border-transparent" href="index.html">Home</a>
        <div class="relative group dropdown">
          <a href="about.html" aria-expanded="false" aria-haspopup="true" class="nav-link flex items-center gap-1 text-label-lg font-label-lg text-white/80 hover:text-primary transition-colors duration-300 py-2 border-b-2 border-transparent">
            About Us <span class="material-symbols-outlined text-[18px] group-hover:-rotate-180 transition-transform duration-300" aria-hidden="true">expand_more</span>
          </a>
          <!-- Bridging gap for hover -->
          <div class="absolute top-full left-0 w-48 pt-2">
            <div class="bg-black/90 shadow-xl border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 dropdown-menu py-stack-sm border border-white/20/30">
              <a class="block px-stack-md py-2 text-label-lg text-white/80 hover:bg-white/10 hover:text-primary transition-colors duration-300" href="quality.html">Quality</a>
              <a class="block px-stack-md py-2 text-label-lg text-white/80 hover:bg-white/10 hover:text-primary transition-colors duration-300" href="sustainability.html">Sustainability</a>
              <a class="block px-stack-md py-2 text-label-lg text-white/80 hover:bg-white/10 hover:text-primary transition-colors duration-300" href="social-responsibility.html">Social Responsibility</a>
            </div>
          </div>
        </div>
        <a class="nav-link text-label-lg font-label-lg text-white/80 hover:text-primary transition-colors duration-300 py-2 border-b-2 border-transparent" href="products.html">Products</a>
        <a class="nav-link text-label-lg font-label-lg text-white/80 hover:text-primary transition-colors duration-300 py-2 border-b-2 border-transparent" href="certificates.html">Certificates</a>
        <a class="nav-link text-label-lg font-label-lg text-white/80 hover:text-primary transition-colors duration-300 py-2 border-b-2 border-transparent" href="contact.html">Contact Us</a>
      </nav>
      <div class="flex items-center gap-stack-md">
        <div class="hidden xl:flex flex-col items-end border-r border-outline-variant pr-stack-md">
          <span class="text-[12px] text-white/60 uppercase tracking-widest">Export Support</span>
          <span class="text-label-lg font-label-lg text-white">+91 123 456 7890</span>
        </div>
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block" aria-label="Search">
          <span class="material-symbols-outlined text-white/80" aria-hidden="true">search</span>
        </button>
        <!-- Mobile Menu Toggle -->
        <button id="mobile-menu-btn" aria-expanded="false" class="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Toggle Mobile Menu">
          <span class="material-symbols-outlined text-white/80" aria-hidden="true">menu</span>
        </button>
      </div>
    </div>
    <!-- Mobile Menu Container -->
    <div id="mobile-menu" class="hidden md:hidden bg-black/95 border-t border-white/10 px-margin-mobile py-stack-md shadow-xl absolute w-full left-0 top-20">
      <div class="flex flex-col gap-4">
        <a class="mobile-nav-link font-label-lg text-label-lg text-white/80 hover:text-primary transition-colors duration-300" href="index.html">Home</a>
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <a href="about.html" class="mobile-nav-link font-label-lg text-label-lg text-white/80 hover:text-primary transition-colors duration-300 flex-1">About Us</a>
            <button class="mobile-dropdown-btn p-2 text-white/80" aria-expanded="false" aria-label="Toggle About Submenu">
              <span class="material-symbols-outlined transition-transform duration-300" aria-hidden="true">expand_more</span>
            </button>
          </div>
          <div class="mobile-dropdown-menu hidden flex-col pl-4 mt-2 gap-3 border-l border-white/20">
            <a class="mobile-nav-link text-label-lg text-white/60 hover:text-primary transition-colors duration-300" href="quality.html">Quality</a>
            <a class="mobile-nav-link text-label-lg text-white/60 hover:text-primary transition-colors duration-300" href="sustainability.html">Sustainability</a>
            <a class="mobile-nav-link text-label-lg text-white/60 hover:text-primary transition-colors duration-300" href="social-responsibility.html">Social Responsibility</a>
          </div>
        </div>
        <a class="mobile-nav-link font-label-lg text-label-lg text-white/80 hover:text-primary transition-colors duration-300" href="products.html">Products</a>
        <a class="mobile-nav-link font-label-lg text-label-lg text-white/80 hover:text-primary transition-colors duration-300" href="certificates.html">Certificates</a>
        <a class="mobile-nav-link font-label-lg text-label-lg text-white/80 hover:text-primary transition-colors duration-300" href="contact.html">Contact Us</a>
      </div>
    </div>
  </header>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<header');
    const end = content.indexOf('</header>') + 9;
    if (start !== -1 && end !== -1) {
        content = content.substring(0, start) + newHeader + content.substring(end);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    } else {
        console.log('Skipped ' + file);
    }
});
