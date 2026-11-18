document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains("hidden");
            const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "true");
                if (icon) icon.textContent = "close";
            } else {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                if (icon) icon.textContent = "menu";
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (!mobileMenu.classList.contains("hidden")) {
                    mobileMenu.classList.add("hidden");
                    mobileMenuBtn.setAttribute("aria-expanded", "false");
                    const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
                    if (icon) icon.textContent = "menu";
                }
            }
        });
    }

    // 2. Mobile Dropdown Toggle Logic
    const mobileDropdownBtn = document.querySelector(".mobile-dropdown-btn");
    const mobileDropdownMenu = document.querySelector(".mobile-dropdown-menu");

    if (mobileDropdownBtn && mobileDropdownMenu) {
        mobileDropdownBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isHidden = mobileDropdownMenu.classList.contains("hidden");
            if (isHidden) {
                mobileDropdownMenu.classList.remove("hidden");
                mobileDropdownMenu.classList.add("flex");
                mobileDropdownBtn.setAttribute("aria-expanded", "true");
                mobileDropdownBtn.querySelector("span").classList.add("rotate-180");
            } else {
                mobileDropdownMenu.classList.add("hidden");
                mobileDropdownMenu.classList.remove("flex");
                mobileDropdownBtn.setAttribute("aria-expanded", "false");
                mobileDropdownBtn.querySelector("span").classList.remove("rotate-180");
            }
        });
    }

    // 3. Close mobile menu on link click
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
                if (icon) icon.textContent = "menu";
            }
        });
    });

    // 4. Active Navigation State Logic
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.remove("text-white/80", "border-transparent", "font-medium");
            link.classList.add("text-primary", "font-bold", "border-primary");
            link.setAttribute("aria-current", "page");
        }
    });

    // 5. Sticky Navbar
    const header = document.querySelector('header');
    if (header) {
        // If we are not on the home page, the navbar should have a solid background
        // because inner pages don't have a dark hero video under the transparent navbar.
        if (currentPath !== "index.html") {
            header.classList.add('scrolled');
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50 || currentPath !== "index.html") {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    // 6. Professional 3D Card Hover Effect (Optimized with requestAnimationFrame & Zero Layout Thrashing)
    const cards = document.querySelectorAll('.group.bg-surface-container-lowest, article.group, a.group.flex.flex-col');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!prefersReducedMotion.matches && !window.matchMedia('(hover: none)').matches) {
        cards.forEach(card => {
            let rafId = null;
            let bounds = null;

            const onMouseEnter = () => {
                bounds = card.getBoundingClientRect();
                card.style.transition = 'transform 0.15s ease-out';
            };

            const onMouseMove = (e) => {
                if (!bounds) bounds = card.getBoundingClientRect();
                if (rafId) cancelAnimationFrame(rafId);

                rafId = requestAnimationFrame(() => {
                    const x = e.clientX - bounds.left;
                    const y = e.clientY - bounds.top;
                    const centerX = bounds.width / 2;
                    const centerY = bounds.height / 2;
                    const tiltX = Math.max(-4, Math.min(4, ((y - centerY) / centerY) * -4));
                    const tiltY = Math.max(-4, Math.min(4, ((x - centerX) / centerX) * 4));
                    card.style.transition = 'none';
                    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-3px)`;
                });
            };

            const onMouseLeave = () => {
                if (rafId) cancelAnimationFrame(rafId);
                bounds = null;
                card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            };

            card.addEventListener('mouseenter', onMouseEnter);
            card.addEventListener('mousemove', onMouseMove, { passive: true });
            card.addEventListener('mouseleave', onMouseLeave);
        });
    }

    // 7. Back to Top Button Logic
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});