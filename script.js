// Animated typing effect for landing section
const roles = ["Python Developer", "AI & ML Engineer", "Generative AI Builder"];
let index = 0, charIndex = 0, typing = true;
const typedText = document.querySelector('.typed-text');

function typeRole() {
  if (!typedText) return;
  let current = roles[index];
  if (typing) {
    typedText.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      typing = false;
      setTimeout(typeRole, 1200);
    } else {
      setTimeout(typeRole, 80);
    }
  } else {
    charIndex--;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typing = true;
      index = (index + 1) % roles.length;
      setTimeout(typeRole, 400);
    } else {
      setTimeout(typeRole, 32);
    }
  }
}
typeRole();

// Simple animated canvas background (particles)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  window.addEventListener('resize', () => {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  });
  const particles = Array.from({length:80},()=>({
    x: Math.random()*w, y: Math.random()*h,
    r: Math.random()*2+1.5,
    vx: (Math.random()-0.5)*0.6, vy: (Math.random()-0.5)*0.6
  }));
  function drawParticles() {
    ctx.clearRect(0,0,w,h);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
      ctx.fillStyle = `rgba(0,216,255,0.16)`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// Sticky nav + active link highlight
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function highlightNav() {
  let scrollY = window.scrollY;
  let found = false;
  for (let i = sections.length-1; i>=0; i--) {
    let sec = sections[i];
    if (scrollY + 80 >= sec.offsetTop) {
      navLinks.forEach(l=>l.classList.remove('active'));
      let id = sec.id;
      let link = navLinks.find(l=>l.getAttribute('href') === '#'+id);
      if (link) link.classList.add('active');
      found = true;
      break;
    }
  }
  if (!found) navLinks.forEach(l=>l.classList.remove('active'));
}
window.addEventListener('scroll', highlightNav);

// Animate on scroll (simple Intersection Observer)
const aosElems = Array.from(document.querySelectorAll('.aos'));
const observer = new window.IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.2});
aosElems.forEach(el=>observer.observe(el));

// Animate skills progress bars
window.addEventListener('scroll', ()=>{
  document.querySelectorAll('.progress').forEach(bar=>{
    if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
      bar.style.width = `calc(${bar.style.getPropertyValue('--value')} * 1%)`;
    }
  });
});

// Contact form fade-in
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach((el,i)=>{
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  setTimeout(()=>{
    el.style.transition = 'opacity 0.7s, transform 0.7s';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 900 + i*160);
});

// Back to top button
const topBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', ()=>{
  if (window.scrollY > 300) topBtn.style.display = 'block';
  else topBtn.style.display = 'none';
});
topBtn && topBtn.addEventListener('click', ()=>{
  window.scrollTo({top:0,behavior:'smooth'});
});

// Smooth scroll for nav links
navLinks.forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({top:target.offsetTop-55,behavior:'smooth'});
    }
  });
});

// Contact form submission (dummy)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}
