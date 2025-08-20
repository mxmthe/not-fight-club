const form = document.getElementById('creator');
const charName = document.getElementById('charName');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = charName.value.trim();
  // простая валидация
  if (!/^[a-zA-Z0-9 _-]{2,16}$/.test(name)) {
    alert('Имя должно быть 2–16 символов: буквы/цифры/пробел/-/_');
    return;
  }
  // 1) сохраняем (если хочешь передать в другую страницу/игру)
  localStorage.setItem('char_name', name);

  // 2) переход на страницу игры (замени на путь к твоей игре)
  window.location.href = 'main-menu.html';

  // или просто показать, что всё сработало:
  // alert('Создан персонаж: ' + name);
});
