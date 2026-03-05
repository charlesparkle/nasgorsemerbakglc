document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. HAMBURGER MENU (MOBILE NAVIGATION)
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Toggle menu saat hamburger di-klik
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Animasi icon hamburger menjadi "X"
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menutup menu jika user mengklik area gelap (overlay)
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open') && e.target === document.body) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tutup menu otomatis saat salah satu link di-klik (Mobile UX)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       2. SCROLL ANIMATION (INTERSECTION OBSERVER)
    ========================================= */
    // Menambahkan class 'appear' pada elemen saat masuk ke layar (Viewport)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi mulai saat 15% elemen terlihat
    };

    const fadeElements = document.querySelectorAll('.fade-in-up, .feature-item, .menu-card-clean, .menu-card-visual');

    // Berikan class awal untuk animasi statis
    fadeElements.forEach(el => {
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
        }
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Hentikan observasi setelah elemen muncul agar performa ringan
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       3. NAVBAR SCROLL EFFECT
    ========================================= */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '15px 0';
        }
    });

    /* =========================================
       4. RANGE SLIDER UI UPDATE (LEVEL PEDAS)
    ========================================= */
    // Hanya untuk memberikan efek visual yang lebih responsif saat digeser
    const pedasSlider = document.getElementById('pedasRange');

    if (pedasSlider) {
        pedasSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            const min = e.target.min || 1;
            const max = e.target.max || 3;
            const percentage = ((val - min) / (max - min)) * 100;

            // Gradient: Red for filled part, grey for track
            e.target.style.background = `linear-gradient(to right, var(--primary-red) ${percentage}%, #ddd ${percentage}%)`;
        });

        // Trigger event sekali saat pertama load untuk set warna awal
        pedasSlider.dispatchEvent(new Event('input'));
    }

    /* =========================================
       5. WHATSAPP CUSTOMIZATION LOGIC
    ========================================= */
    const waButton = document.querySelector('.btn-whatsapp-lg');
    const customForm = document.querySelector('.custom-form');

    function updateWhatsAppLink() {
        if (!waButton || !customForm) return;

        // Base Number
        const baseUrl = "https://wa.me/6281234567890?text=";

        // Get Toppings
        const toppingCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
        let toppings = [];
        toppingCheckboxes.forEach(cb => toppings.push(cb.value));
        const toppingText = toppings.length > 0 ? toppings.join(', ') : 'Tidak ada';

        // Get Sayur
        const sayurRadio = document.querySelector('input[name="sayur"]:checked');
        const sayurText = sayurRadio ? sayurRadio.value : 'Sesuai standar';

        // Get Pedas
        const pedasRange = document.getElementById('pedasRange');
        let pedasText = 'Sedang';
        if (pedasRange) {
            if (pedasRange.value == 1) pedasText = 'Tidak Pedas';
            if (pedasRange.value == 2) pedasText = 'Sedang';
            if (pedasRange.value == 3) pedasText = 'Pedas';
        }

        // Create Message
        const message = `Halo Semerbak! 👋%0A%0ASaya tertarik untuk penawaran *Bulk Order / Bukber*. Berikut preferensi racikan saya:%0A%0A🌿 *Sayuran:* ${sayurText}%0A🌶️ *Level Pedas:* ${pedasText}%0A🍳 *Extra Topping:* ${toppingText}%0A%0AMohon info lebih lanjut mengenai harga dan ketersediaan. Terima kasih!`;

        waButton.href = baseUrl + message;
    }

    // Bind events
    if (customForm) {
        customForm.addEventListener('change', updateWhatsAppLink);
        // Initialize on load
        updateWhatsAppLink();
    }
});