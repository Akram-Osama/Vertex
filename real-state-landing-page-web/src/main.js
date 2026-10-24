
const hero = document.querySelector(".hero");
const video = document.querySelector("#heroVideo");
const header = document.querySelector("#header");
const heroContent = document.querySelector("#heroContent");
const fallback = document.querySelector("#videoFallback");

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

let revealStarted = false;

// Reveal the header and text once.
function revealHero() {
    if (revealStarted) return;
    revealStarted = true;

    // Keep the last frame visible.
    video.pause();

    hero.classList.add("is-revealing");

    // Header drops from the top.
    header.classList.add("visible");

    // Text rises after the header begins to appear.
    window.setTimeout(() => {
        heroContent.classList.add("visible");
        hero.classList.add("is-finished");
    }, 550);
}

// Start the cinematic sequence when video ends.
video.addEventListener("ended", revealHero);

// Fallback if the video cannot load.
video.addEventListener("error", () => {
    fallback.classList.remove("hidden");
    revealHero();
});

// Try autoplay. The video must be muted for autoplay
// to work in most browsers.
async function startVideo() {
    try {
        await video.play();
    } catch (error) {
        // If autoplay is blocked, show the hero content
        // rather than leaving the page blank.
        fallback.classList.remove("hidden");
        revealHero();
    }
}

// Mobile navigation.
menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "فتح القائمة" : "إغلاق القائمة"
    );

    navLinks.classList.toggle("open", !isOpen);
});

// Close the mobile menu after selecting a link.
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
    });
});

// Keep the video at the final frame and reveal the page
// if it was already finished before listeners were attached.
if (video.readyState >= 2 && video.ended) {
    revealHero();
} else {
    startVideo();
}
