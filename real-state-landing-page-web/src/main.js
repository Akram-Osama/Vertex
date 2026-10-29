const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");

const revealHero = () => {
    hero?.classList.add("is-revealed");
    document.body.classList.add("is-revealed");
};

heroVideo?.addEventListener("ended", revealHero, { once: true });

if (heroVideo?.ended) {
    revealHero();
}

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");

// فتح وقفل قائمة الموبايل
menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
    );
});

// إغلاق القائمة بعد اختيار أي رابط
document.querySelectorAll(
    ".nav-link, .brand, .discover-link, .scroll-hint, .contact-button"
).forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

// الأقسام اللي بنتابعها في الصفحة
const sectionIds = [
    "home",
    "project",
    "location",
    "units",
    "features",
    "contact"
];

const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

const navLinks = [
    ...document.querySelectorAll(".nav-link")
];

const pageNumbers = [
    ...document.querySelectorAll(".page-number")
];

// تحديث القائمة ومؤشر الأرقام مع التمرير
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        const visibleSections = entries
            .filter(entry => entry.isIntersecting)
            .sort(
                (a, b) => b.intersectionRatio - a.intersectionRatio
            );

        if (!visibleSections.length) return;

        const currentId = visibleSections[0].target.id;

        // تفعيل رابط القسم الحالي
        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentId}`
            );
        });

        // مؤشر الأرقام الأربعة
        let pageIndex = 0;

        if (currentId === "project") {
            pageIndex = 1;
        } else if (currentId === "location") {
            pageIndex = 2;
        } else if (
            ["units", "features", "contact"].includes(currentId)
        ) {
            pageIndex = 3;
        }

        pageNumbers.forEach((link, index) => {
            link.classList.toggle("active", index === pageIndex);
        });
    }, {
        threshold: [0.25, 0.5, 0.7]
    });

    sections.forEach(section => observer.observe(section));
}


/* =========================================
   VERTEX — PROJECT SCROLL REVEAL
========================================= */

const projectRevealItems = document.querySelectorAll(
    ".project-section .project-reveal"
);

if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    projectRevealItems.forEach((item) => {
        projectObserver.observe(item);
    });
} else {
    // Fallback للمتصفحات القديمة
    projectRevealItems.forEach((item) => {
        item.classList.add("is-visible");
    });
}
