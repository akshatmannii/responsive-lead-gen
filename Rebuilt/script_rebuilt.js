/* =====================================================
   script.js - Rebuilt Interaction Layer
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Sticky Navbar
    ========================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();

    /* ==========================================
       Smooth Scroll
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

    /* ==========================================
       Scroll Reveal Animation
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .card, .stats article, .process li, .why-card, .testimonial"
    );

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       Counter Animation
    ========================================== */

    const counters = document.querySelectorAll(".stats h3");

    function animateCounter(element) {

        const original = element.textContent;

        const match = original.match(/\d+(\.\d+)?/);

        if (!match) return;

        const target = parseFloat(match[0]);

        const suffix = original.replace(match[0], "");

        let startTime = null;

        const duration = 1500;

        function step(timestamp) {

            if (!startTime)
                startTime = timestamp;

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            const value = target * progress;

            if (target % 1 === 0)
                element.textContent = Math.round(value) + suffix;
            else
                element.textContent = value.toFixed(1) + suffix;

            if (progress < 1)
                requestAnimationFrame(step);
            else
                element.textContent = original;

        }

        requestAnimationFrame(step);

    }

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (
                entry.isIntersecting &&
                !entry.target.dataset.started
            ) {

                entry.target.dataset.started = "true";

                animateCounter(entry.target);

            }

        });

    });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ==========================================
       FAQ Accordion
    ========================================== */

    document.querySelectorAll(".faq-item").forEach(item => {

        const question = item.querySelector(".faq-question");

        const answer = item.querySelector(".faq-answer");

        if (!question || !answer)
            return;

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(i => {

                i.classList.remove("active");

                const a = i.querySelector(".faq-answer");

                if (a)
                    a.style.maxHeight = null;

            });

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

    /* ==========================================
       Ripple Button Effect
    ========================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const size = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (e.offsetX - size / 2) + "px";

            ripple.style.top =
                (e.offsetY - size / 2) + "px";

            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================================
       Active Navigation Link
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top)
                current = section.id;

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================================
       Floating Hero Badges
    ========================================== */

    document.querySelectorAll(".badge").forEach((badge, index) => {

        badge.style.animation =
            `float ${5 + index}s ease-in-out infinite`;

    });

    /* ==========================================
       Mouse Glow Effect
    ========================================== */

    const glow = document.querySelector(".hero-glow");

    if (glow) {

        document.addEventListener("mousemove", e => {

            const x = e.clientX;
            const y = e.clientY;

            glow.style.left = (x - 450) + "px";
            glow.style.top = (y - 450) + "px";

        });

    }

});

/* ==========================================
   Ripple Animation CSS
========================================== */

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

.ripple{

position:absolute;

border-radius:50%;

background:rgba(255,255,255,.35);

transform:scale(0);

animation:ripple .6s linear;

pointer-events:none;

}

.btn{

position:relative;

overflow:hidden;

}

nav a.active{

color:#7C3AED;

}

@keyframes ripple{

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);