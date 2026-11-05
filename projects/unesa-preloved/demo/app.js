const qs = (s, scope=document) => scope.querySelector(s);
const qsa = (s, scope=document) => [...scope.querySelectorAll(s)];

// Landing page: premium side-reveal motion.
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  const reveals = qsa('.reveal-side');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // reveal once; keeps the page elegant and stable
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in-view'));
  }

  const header = qs('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 70);
  window.addEventListener('scroll', updateHeader, {passive:true});
  updateHeader();
});

// Auth tabs + prototype validation
const tabButtons = qsa('.tab-btn');
if(tabButtons.length){
  const loginForm = qs('#loginForm');
  const registerForm = qs('#registerForm');

  const activateTab = (name) => {
    tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
    const isLogin = name === 'login';
    if(loginForm) loginForm.hidden = !isLogin;
    if(registerForm) registerForm.hidden = isLogin;
  };

  tabButtons.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  const requestedTab = new URLSearchParams(location.search).get('tab');
  if(requestedTab === 'register') activateTab('register');

  const validateCampusEmail = (form) => {
    const email = qs('input[type=email]', form);
    const error = qs('.form-error', form);
    if(!email) return false;
    const ok = email.value.trim().toLowerCase().endsWith('@mhs.unesa.ac.id');
    if(error) error.style.display = ok ? 'none' : 'block';
    if(ok){
      sessionStorage.setItem('unesaUser', email.value.trim());
      location.href='marketplace.html';
    }
    return ok;
  };

  loginForm?.addEventListener('submit', e => { e.preventDefault(); validateCampusEmail(loginForm); });
  registerForm?.addEventListener('submit', e => { e.preventDefault(); validateCampusEmail(registerForm); });
}

// Marketplace category chips
qsa('.chip').forEach(chip => chip.addEventListener('click', () => {
  qsa('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const cat = chip.dataset.category;
  qsa('.product-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
}));

const searchInput = qs('#marketSearch');
searchInput?.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase().trim();
  qsa('.product-card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
  });
});

// Sell form photo preview
const imageInput = qs('#images');
imageInput?.addEventListener('change', () => {
  const preview = qs('#previewGrid');
  if(preview) preview.innerHTML = '';
  [...imageInput.files].slice(0,4).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    preview?.appendChild(img);
  });
  if(imageInput.files[0]){
    const summaryImg = qs('#summaryImage');
    if(summaryImg){
      summaryImg.src = URL.createObjectURL(imageInput.files[0]);
      summaryImg.style.display='block';
    }
    const placeholder = qs('.summary-photo span');
    if(placeholder) placeholder.style.display='none';
  }
});

const titleInput = qs('#itemName');
const priceInput = qs('#price');
titleInput?.addEventListener('input', () => {
  const el = qs('#summaryName');
  if(el) el.textContent = titleInput.value || 'Nama barangmu';
});
priceInput?.addEventListener('input', () => {
  const el = qs('#summaryPrice');
  if(el) el.textContent = 'Rp' + Number(priceInput.value || 0).toLocaleString('id-ID');
});

qs('#sellForm')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Prototype: listing siap dikirim ke backend Supabase. Pada tahap integrasi, data form dan URL foto Cloudinary akan disimpan di tabel barang.');
});
