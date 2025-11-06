// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB15: localStorage Persistence (prof-aligned)
// ==========================================

let favorites = [];

// DOM refs
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// localStorage helpers
function saveFavorites() {
  try {
    localStorage.setItem('localFavorites', JSON.stringify(favorites));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    alert('Unable to save favorites. Your browser may have storage disabled.');
  }
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem('localFavorites');
    favorites = saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    favorites = [];
  }
}

// render all (resets filters, then uses search to draw)
function displayFavorites() {
  favoritesList.innerHTML = '';
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }
  searchInput.value = '';
  categoryFilter.value = 'all';
  searchFavorites();
}

// search/filter + draw cards
function searchFavorites() {
  const text = searchInput.value.toLowerCase().trim();
  const cat = categoryFilter.value;

  const filtered = favorites.filter(f => {
    const t = (f.notes || '').toLowerCase();
    const inText = !text || f.name.toLowerCase().includes(text) || t.includes(text);
    const inCat = cat === 'all' || f.category === cat;
    return inText && inCat;
  });

  if (filtered.length === 0) {
    favoritesList.innerHTML = (text || cat !== 'all')
      ? '<p class="empty-message">No favorites match your search.</p>'
      : '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }

  favoritesList.innerHTML = '';
  filtered.forEach(fav => {
    const originalIndex = favorites.indexOf(fav);
    const stars = '⭐'.repeat(Number(fav.rating) || 0);
    favoritesList.innerHTML += `
      <div class="favorite-card">
        <h3>${fav.name}</h3>
        <span class="favorite-category">${fav.category}</span>
        <div class="favorite-rating">${stars} (${fav.rating}/5)</div>
        <p class="favorite-notes">${fav.notes || ''}</p>
        <p class="favorite-date">Added: ${fav.dateAdded}</p>
        <div class="favorite-actions">
          <button class="btn btn-danger" onclick="deleteFavorite(${originalIndex})">Delete</button>
        </div>
      </div>`;
  });
}

// delete by index (inline onclick)
function deleteFavorite(index) {
  const fav = favorites[index];
  if (!fav) return;
  const ok = confirm(`Are you sure you want to delete "${fav.name}"?`);
  if (ok) {
    favorites.splice(index, 1);
    saveFavorites();
    searchFavorites();
  } else {
    console.log('Deletion cancelled');
  }
}

// add favorite
function addFavorite(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value;
  const rating = parseInt(document.getElementById('rating').value, 10) || 0;
  const notes = (document.getElementById('notes').value || '').trim();

  if (!name || !category) {
    alert('Please fill in the place name and category!');
    return;
  }

  favorites.push({
    name,
    category,
    rating,
    notes,
    dateAdded: new Date().toLocaleDateString()
  });

  saveFavorites();
  form.reset();
  displayFavorites();
}

// events
form.addEventListener('submit', addFavorite);
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);

// init
loadFavorites();
displayFavorites();