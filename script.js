
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 500);
});


const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));


const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'light');
  body.classList.add('light');
} else if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

updateNeonColorForTheme();
updatePaletteSelectorVisibility();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  updateNeonColorForTheme();
  updatePaletteSelectorVisibility();
});


function updateNeonColorForTheme() {
  if (body.classList.contains('light')) {
    
    document.documentElement.style.setProperty('--neon-color', '#000000');
  } else {
    
    document.documentElement.style.setProperty('--neon-color', '#00f7ff');
  }
}


const paletteButtons = document.querySelectorAll('.palette-btn');

paletteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');
    document.documentElement.style.setProperty('--neon-color', color);
    localStorage.setItem('neon-color', color);
  });
});


function updatePaletteSelectorVisibility() {
  if (body.classList.contains('light')) {
 
    document.querySelectorAll('.palette-btn.theme-light-only').forEach(btn => btn.style.display = 'block');
    document.querySelectorAll('.palette-btn.theme-dark-only').forEach(btn => btn.style.display = 'none');
  } else {

    document.querySelectorAll('.palette-btn.theme-dark-only').forEach(btn => btn.style.display = 'block');
    document.querySelectorAll('.palette-btn.theme-light-only').forEach(btn => btn.style.display = 'none');
  }
}


particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: getComputedStyle(document.documentElement).getPropertyValue('--neon-color').trim() },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" }
    },
    opacity: { value: 0.5, random: true },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: getComputedStyle(document.documentElement).getPropertyValue('--neon-color').trim(),
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.6 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});


document.querySelectorAll('img').forEach(img => {
  if (!img.alt) {
    img.alt = 'Imagem do site';
  }
  if (!img.title) {
    img.title = img.alt;
  }
});
