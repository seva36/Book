const books = [
  {title:'1984',author:'Джордж Орвелл',genre:'Класика',isbn:'9780451524935',price:420},
  {title:'Колгосп тварин',author:'Джордж Орвелл',genre:'Класика',isbn:'9780451526342',price:350},
  {title:'Дорога на Віґан-Пірс',author:'Джордж Орвелл',genre:'Класика',isbn:'9780156276410',price:390},
  {title:'Данина Каталонії',author:'Джордж Орвелл',genre:'Класика',isbn:'9780156186253',price:410},
  {title:'Гобіт',author:'Дж. Р. Р. Толкін',genre:'Фентезі',isbn:'9780547928227',price:520},
  {title:'Братство Персня',author:'Дж. Р. Р. Толкін',genre:'Фентезі',isbn:'9780547928210',price:590},
  {title:'Дві вежі',author:'Дж. Р. Р. Толкін',genre:'Фентезі',isbn:'9780547928203',price:590},
  {title:'Повернення короля',author:'Дж. Р. Р. Толкін',genre:'Фентезі',isbn:'9780547928197',price:590},
  {title:'Гордість і упередження',author:'Джейн Остін',genre:'Класика',isbn:'9780141439518',price:370},
  {title:'Емма',author:'Джейн Остін',genre:'Класика',isbn:'9780141439587',price:390},
  {title:'Розум і почуття',author:'Джейн Остін',genre:'Класика',isbn:'9780141439662',price:380},
  {title:'Менсфілд-парк',author:'Джейн Остін',genre:'Класика',isbn:'9780141439808',price:410},
  {title:'Великий Гетсбі',author:'Ф. Скотт Фіцджеральд',genre:'Класика',isbn:'9780743273565',price:340},
  {title:'Ніч лагідна',author:'Ф. Скотт Фіцджеральд',genre:'Класика',isbn:'9780684801544',price:420},
  {title:'Останній магнат',author:'Ф. Скотт Фіцджеральд',genre:'Класика',isbn:'9780684804453',price:390},
  {title:'По цей бік раю',author:'Ф. Скотт Фіцджеральд',genre:'Класика',isbn:'9780684801520',price:370},
  {title:'Убити пересмішника',author:'Гарпер Лі',genre:'Проза',isbn:'9780061120084',price:460},
  {title:'Піди, постав сторожа',author:'Гарпер Лі',genre:'Проза',isbn:'9780062409850',price:430},
  {title:'451° за Фаренгейтом',author:'Рей Бредбері',genre:'Фантастика',isbn:'9781451673319',price:390},
  {title:'Марсіанські хроніки',author:'Рей Бредбері',genre:'Фантастика',isbn:'9781451678192',price:440},
  {title:'Кульбабове вино',author:'Рей Бредбері',genre:'Фантастика',isbn:'9780553277534',price:410},
  {title:'Щось лихе насуває',author:'Рей Бредбері',genre:'Фантастика',isbn:'9781501167710',price:420},
  {title:'Дюна',author:'Френк Герберт',genre:'Фантастика',isbn:'9780441172719',price:550},
  {title:'Месія Дюни',author:'Френк Герберт',genre:'Фантастика',isbn:'9780593098233',price:480},
  {title:'Діти Дюни',author:'Френк Герберт',genre:'Фантастика',isbn:'9780593098240',price:510},
  {title:'Бог-імператор Дюни',author:'Френк Герберт',genre:'Фантастика',isbn:'9780593098257',price:530},
  {title:'Алхімік',author:'Пауло Коельйо',genre:'Проза',isbn:'9780062315007',price:360},
  {title:'Вероніка вирішує померти',author:'Пауло Коельйо',genre:'Проза',isbn:'9780061124266',price:380},
  {title:'Одинадцять хвилин',author:'Пауло Коельйо',genre:'Проза',isbn:'9780060589288',price:390},
  {title:'Заїр',author:'Пауло Коельйо',genre:'Проза',isbn:'9780060832810',price:400},
  {title:'Воно',author:'Стівен Кінг',genre:'Трилер',isbn:'9781501142970',price:690},
  {title:'Сяйво',author:'Стівен Кінг',genre:'Трилер',isbn:'9780307743657',price:540},
  {title:'Зелена миля',author:'Стівен Кінг',genre:'Трилер',isbn:'9781501192264',price:470},
  {title:'Кладовище домашніх тварин',author:'Стівен Кінг',genre:'Трилер',isbn:'9781501156700',price:510},
  {title:'Вбивство у «Східному експресі»',author:'Аґата Крісті',genre:'Трилер',isbn:'9780062693662',price:330},
  {title:'І не лишилось жодного',author:'Аґата Крісті',genre:'Трилер',isbn:'9780062073488',price:350},
  {title:'Убивство Роджера Екройда',author:'Аґата Крісті',genre:'Трилер',isbn:'9780062073563',price:340},
  {title:'Смерть на Нілі',author:'Аґата Крісті',genre:'Трилер',isbn:'9780062073556',price:360}
];

const genres = ['Усі книжки', ...new Set(books.map((book) => book.genre))];
const cartKey = 'paliturka-cart-v1';
const favoritesKey = 'paliturka-favorites-v1';
let activeGenre = 'Усі книжки';
let searchTerm = '';
let cart = readStored(cartKey, {});
let favorites = new Set(readStored(favoritesKey, []));

const bookGrid = document.querySelector('#book-grid');
const genreFilters = document.querySelector('#genre-filters');
const sortSelect = document.querySelector('#sort-select');
const searchInput = document.querySelector('#search-input');
const cartOverlay = document.querySelector('#cart-overlay');
const checkoutOverlay = document.querySelector('#checkout-overlay');

function readStored(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    return stored ?? fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(value) {
  return `${new Intl.NumberFormat('uk-UA').format(value)} ₴`;
}

function coverUrl(isbn, size = 'L') {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}

function renderFilters() {
  genreFilters.innerHTML = genres.map((genre) => `<button class="filter-chip${genre === activeGenre ? ' active' : ''}" type="button" data-genre="${genre}" aria-pressed="${genre === activeGenre}">${genre}</button>`).join('');
}

function getVisibleBooks() {
  const query = searchTerm.trim().toLocaleLowerCase('uk');
  const visible = books.map((book, index) => ({...book, id: String(index)})).filter((book) => {
    const matchesGenre = activeGenre === 'Усі книжки' || book.genre === activeGenre;
    const matchesSearch = !query || `${book.title} ${book.author} ${book.genre}`.toLocaleLowerCase('uk').includes(query);
    return matchesGenre && matchesSearch;
  });
  if (sortSelect.value === 'price-asc') visible.sort((a, b) => a.price - b.price);
  if (sortSelect.value === 'price-desc') visible.sort((a, b) => b.price - a.price);
  if (sortSelect.value === 'title-asc') visible.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
  return visible;
}

function renderBooks() {
  const visible = getVisibleBooks();
  document.querySelector('#results-count').textContent = `${visible.length} ${visible.length === 1 ? 'книжка' : visible.length > 1 && visible.length < 5 ? 'книжки' : 'книжок'}`;
  document.querySelector('#empty-state').hidden = visible.length > 0;
  bookGrid.hidden = visible.length === 0;
  document.querySelector('#reset-filters').hidden = activeGenre === 'Усі книжки' && !searchTerm;
  bookGrid.innerHTML = visible.map((book) => `<article class="book-card"><div class="cover-wrap"><span class="genre-label">${book.genre}</span><button class="favorite-button${favorites.has(book.id) ? ' is-favorite' : ''}" type="button" data-favorite="${book.id}" aria-label="${favorites.has(book.id) ? 'Прибрати з обраного' : 'Додати в обране'}: ${book.title}" aria-pressed="${favorites.has(book.id)}">${favorites.has(book.id) ? '♥' : '♡'}</button><img src="${coverUrl(book.isbn)}" alt="Обкладинка книжки «${book.title}»" loading="lazy" data-isbn="${book.isbn}"></div><div class="book-info"><h3 class="book-title">${book.title}</h3><p class="book-author">${book.author}</p><div class="book-bottom"><span class="book-price">${formatPrice(book.price)}</span><button class="add-button" type="button" data-add="${book.id}" aria-label="Додати в кошик: ${book.title}">+</button></div></div></article>`).join('');
  bookGrid.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => {
      if (image.dataset.fallback) return;
      image.dataset.fallback = 'true';
      image.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80';
    }, {once: true});
  });
}

function renderAuthors() {
  const authors = [...new Set(books.map((book) => book.author))];
  document.querySelector('#author-list').innerHTML = authors.map((author) => `<span class="author-name">${author}</span>`).join('');
}

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(id) {
  cart[id] = (cart[id] ?? 0) + 1;
  saveCart();
  renderCart();
  openCart();
}

function cartEntries() {
  return Object.entries(cart).filter(([id, quantity]) => books[Number(id)] && quantity > 0).map(([id, quantity]) => ({...books[Number(id)], id, quantity}));
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = entries.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
  const total = subtotal + (subtotal > 0 && subtotal < 1000 ? 80 : 0);
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('#drawer-count').textContent = `(${count})`;
  document.querySelector('#cart-empty').hidden = count > 0;
  document.querySelector('#cart-footer').hidden = count === 0;
  document.querySelector('#cart-lines').innerHTML = entries.map((entry) => `<div class="cart-line"><img src="${coverUrl(entry.isbn, 'M')}" alt="" loading="lazy"><div class="cart-line-info"><strong>${entry.title}</strong><span>${entry.author}</span><div class="quantity-control"><button type="button" data-quantity="${entry.id}" data-change="-1" aria-label="Зменшити кількість: ${entry.title}">−</button><span>${entry.quantity}</span><button type="button" data-quantity="${entry.id}" data-change="1" aria-label="Збільшити кількість: ${entry.title}">+</button></div></div><div class="cart-line-end"><strong>${formatPrice(entry.price * entry.quantity)}</strong><button class="remove-line" type="button" data-remove="${entry.id}">Вилучити</button></div></div>`).join('');
  document.querySelector('#cart-total').textContent = formatPrice(total);
  document.querySelector('#checkout-total').textContent = formatPrice(total);
  document.querySelector('#shipping-note').textContent = subtotal >= 1000 ? 'Чудово! Доставка за наш рахунок.' : `До безкоштовної доставки залишилось ${formatPrice(1000 - subtotal)}.`;
}

function updateCheckoutOptions() {
  const delivery = document.querySelector('select[name="delivery"]');
  const address = document.querySelector('input[name="address"]');
  const addressLabel = address.closest('label');
  const subtotal = cartEntries().reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1000 || delivery.value === 'Самовивіз' ? 0 : 80;
  address.required = delivery.value !== 'Самовивіз';
  address.placeholder = delivery.value === 'Самовивіз' ? 'Не потрібно для самовивозу' : 'Київ, відділення № 1';
  addressLabel.firstChild.textContent = delivery.value === 'Самовивіз' ? 'Місто та примітка (необов’язково)' : 'Місто та відділення';
  document.querySelector('#checkout-total').textContent = formatPrice(subtotal + shipping);
}

function openCart() {
  cartOverlay.hidden = false;
  document.body.classList.add('no-scroll');
  cartOverlay.querySelector('[data-close-cart]').focus();
}

function closeCart() {
  cartOverlay.hidden = true;
  if (checkoutOverlay.hidden) document.body.classList.remove('no-scroll');
}

function closeCheckout() {
  checkoutOverlay.hidden = true;
  if (cartOverlay.hidden) document.body.classList.remove('no-scroll');
}

function resetFilters() {
  activeGenre = 'Усі книжки';
  searchTerm = '';
  searchInput.value = '';
  sortSelect.value = 'featured';
  renderFilters();
  renderBooks();
}

genreFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-genre]');
  if (!button) return;
  activeGenre = button.dataset.genre;
  renderFilters();
  renderBooks();
});

bookGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add]');
  const favoriteButton = event.target.closest('[data-favorite]');
  if (addButton) addToCart(addButton.dataset.add);
  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    localStorage.setItem(favoritesKey, JSON.stringify([...favorites]));
    renderBooks();
  }
});

document.querySelector('#cart-lines').addEventListener('click', (event) => {
  const quantityButton = event.target.closest('[data-quantity]');
  const removeButton = event.target.closest('[data-remove]');
  if (quantityButton) {
    const id = quantityButton.dataset.quantity;
    cart[id] = (cart[id] ?? 0) + Number(quantityButton.dataset.change);
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }
  if (removeButton) {
    delete cart[removeButton.dataset.remove];
    saveCart();
    renderCart();
  }
});

searchInput.addEventListener('input', () => { searchTerm = searchInput.value; renderBooks(); });
sortSelect.addEventListener('change', renderBooks);
document.querySelector('#open-cart').addEventListener('click', openCart);
cartOverlay.addEventListener('click', (event) => { if (event.target.closest('[data-close-cart]')) closeCart(); });
checkoutOverlay.addEventListener('click', (event) => { if (event.target.closest('[data-close-checkout]')) closeCheckout(); });
document.querySelector('#reset-filters').addEventListener('click', resetFilters);
document.querySelector('#empty-reset').addEventListener('click', resetFilters);

document.querySelector('#checkout-button').addEventListener('click', () => {
  closeCart();
  document.querySelector('#checkout-form').hidden = false;
  document.querySelector('#order-success').hidden = true;
  updateCheckoutOptions();
  checkoutOverlay.hidden = false;
  document.body.classList.add('no-scroll');
  checkoutOverlay.querySelector('input').focus();
});

document.querySelector('select[name="delivery"]').addEventListener('change', updateCheckoutOptions);

document.querySelector('#checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const firstName = String(formData.get('name')).trim().split(/\s+/)[0];
  const success = document.querySelector('#order-success');
  success.innerHTML = `<span>✳</span><h3>Дякуємо, ${firstName}!</h3><p>Ваше демо-замовлення оформлено на суму ${document.querySelector('#checkout-total').textContent}. У реальному магазині менеджер зв'язався б із вами для підтвердження.</p><button class="button button-dark" type="button" data-finish-order>Повернутись до книжок</button>`;
  event.currentTarget.hidden = true;
  success.hidden = false;
  cart = {};
  saveCart();
  renderCart();
  success.querySelector('[data-finish-order]').addEventListener('click', closeCheckout);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCheckout();
    closeCart();
  }
});

renderFilters();
renderBooks();
renderAuthors();
renderCart();