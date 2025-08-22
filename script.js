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

  function renderProfile() {
    view.innerHTML = `
      <section class="profile-screen">
        <div class="avatar-wrap">
          <img src="images/hero1.jpg" alt="Avatar" class="avatar">
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
  }

  function renderSettings() {
    view.innerHTML = `<h2>Settings</h2><p>Coming soon…</p>`;
  }
});

