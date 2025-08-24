const form = document.getElementById('creator');
if (form) {
  const charName = document.getElementById('charName');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = charName.value.trim();

    if (!/^[a-zA-Z0-9 _-]{2,16}$/.test(name)) {
      alert('Имя должно быть 2–16 символов: буквы/цифры/пробел/-/_');
      return;
    }
    localStorage.setItem('char_name', name);
    window.location.href = 'main-menu.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const view = document.getElementById('view');
  if (!view) return; // если это не main-menu, выходим

  const actions = document.querySelector('.right-menu__content');
  const name = localStorage.getItem('char_name') || 'Player';

  render('home');

  actions.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;
    render(btn.dataset.view);
  });

  function render(which) {
    switch (which) {
      case 'profile': renderProfile(); break;
      case 'settings': renderSettings(); break;
      case 'home':
      default: renderHome(); break;
    }
  }

  function renderHome() {
    console.log("Render Home!");
    view.innerHTML = `
      <section class="home-screen">
        <button class="fight-btn">Fight!</button>
      </section>
    `;
  }
  const HEROES = [
    { name: "Assassin", img: "images/hero2.png" },
    { name: "Knight", img: "images/hero3.png" },
    { name: "Mage", img: "images/hero4.png" }
  ];

  // читаем выбранного героя из localStorage (по умолчанию 0)
  function getHeroIndex() {
    const i = Number(localStorage.getItem('selected_hero_index'));
    return Number.isInteger(i) && i >= 0 && i < HEROES.length ? i : 0;
  }
  function setHeroIndex(i) {
    localStorage.setItem('selected_hero_index', String(i));
  }

  function renderProfile() {
    const i = getHeroIndex();
    const hero = HEROES[i];
    const player = localStorage.getItem('char_name') || 'Player';

  // function renderProfile() {
    view.innerHTML = `
      <section class="profile-screen">
        <div class="avatar-wrap">
          <img src="images/hero1.jpg" alt="Avatar" class="avatar">
          <div class="hero-controls">
            <button class="hero-btn" id="prevHero" aria-label="Previous">◀</button>
            <button class="hero-btn" id="nextHero" aria-label="Next">▶</button>
          </div>
        </div>
        <div class="profile-info">
          <p>Name: <strong>${name}</strong></p>&nbsp;&nbsp;
          <p>
            Wins: <span class="win">1</span> &nbsp;&nbsp;
            Losses: <span class="lose">1</span>
          </p>
        </div>
        
      </section>
    `;
      const imgEl = document.getElementById('heroImage');
      const nameEl = document.getElementById('heroName');
      const posEl = document.getElementById('heroPos');
      const prevBtn = document.getElementById('prevHero');
      const nextBtn = document.getElementById('nextHero');

      function update(toIndex) {
        const idx = (toIndex + HEROES.length) % HEROES.length; // кольцевой
        setHeroIndex(idx);
        imgEl.src = HEROES[idx].img;
        imgEl.alt = HEROES[idx].name;
        nameEl.textContent = HEROES[idx].name;
        posEl.textContent = idx + 1;
      }

      prevBtn.addEventListener('click', () => update(getHeroIndex() - 1));
      nextBtn.addEventListener('click', () => update(getHeroIndex() + 1));

      // стрелки на клавиатуре
      const keyHandler = (e) => {
        if (e.key === 'ArrowLeft') update(getHeroIndex() - 1);
        if (e.key === 'ArrowRight') update(getHeroIndex() + 1);
      };
      document.addEventListener('keydown', keyHandler, { once: false });

      // свайп на мобильном
      let sx = 0;
      imgEl.addEventListener('touchstart', (e) => sx = e.touches[0].clientX, { passive: true });
      imgEl.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) {
          if (dx < 0) update(getHeroIndex() + 1); else update(getHeroIndex() - 1);
        }
      }, { passive: true });
    }

    function renderSettings() {
      view.innerHTML = `<h2>Settings</h2><p>Coming soon…</p>`;
    };
  });