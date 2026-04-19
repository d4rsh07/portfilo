gsap.registerPlugin(ScrollTrigger);

// SPLASH
const typingEl = document.getElementById("typing");
const splashEl = document.getElementById("splash");

const text = "Hi, I'm Rehaan";
let i = 0;

function type(){
    if(i < text.length){
        typingEl.innerHTML += text[i++];
        setTimeout(type, 70);
    } else {
        gsap.to(splashEl,{
            opacity:0,
            duration:1,
            onComplete:()=> splashEl.style.display="none"
        });
    }
}
type();

// HERO
gsap.from(".hero-text h1",{y:100,opacity:0});
gsap.to(".reveal span",{y:0,stagger:0.1});

// OPEN PROJECT
function openProject(video,title,desc){
    const overlay = document.getElementById("projectOverlay");
    const content = document.querySelector(".overlay-content");
    const vid = document.getElementById("overlayVideo");

    overlay.style.display = "flex";

    vid.src = video;
    vid.muted = false;
    vid.preload = "auto";
    vid.load();
    vid.addEventListener("loadeddata", () => {
        vid.play().catch(()=>{});
    }, { once: true });
    
    document.getElementById("overlayTitle").innerText = title;
    document.getElementById("overlayDesc").innerText = desc;

    content.style.transform = "scale(1)";
    content.style.opacity = "1";
}

// CLOSE PROJECT
function closeProject(){
    const overlay = document.getElementById("projectOverlay");
    const content = document.querySelector(".overlay-content");
    const vid = document.getElementById("overlayVideo");

    content.style.transform = "scale(0.8)";
    content.style.opacity = "0";

    setTimeout(()=>{
        overlay.style.display = "none";
        vid.pause();
        vid.muted = true;
        vid.src = "";
    }, 300);
}

// CLICK OUTSIDE CLOSE
document.getElementById("projectOverlay").addEventListener("click",(e)=>{
    if(e.target.id === "projectOverlay" || e.target.className === "overlay-bg"){
        closeProject();
    }
});

// ESC CLOSE
document.addEventListener("keydown",(e)=>{
    if(e.key === "Escape"){
        const overlay = document.getElementById("projectOverlay");
        if(overlay.style.display === "flex"){
            closeProject();
        }
    }
});

// SCROLL REVEAL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll(".project").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
});