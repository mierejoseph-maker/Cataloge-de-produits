const sortie = document.querySelector("#sortie");
function afficher(html) {
  sortie.innerHTML += html;
}

const catalogue = [
  { id: 1, sku: "OUT-001", nom: "Marteau de charpentier", categorie: "Outillage", prix: 28, stock: 14, image: "https://www.tools.hamer.co.nz/cdn/shop/files/CH-20_0e45e855-bad6-41ce-a84d-241dd8ce7a08.jpg?v=1736910922&width=1946" },
  { id: 2, sku: "OUT-002", nom: "Tournevis plat", categorie: "Outillage", prix: 9.5, stock: 32, image: "https://d3m9l0v76dty0.cloudfront.net/system/photos/4286809/large/796e718ab985db244ad7fbd788b4336a.jpg" },
  { id: 3, sku: "OUT-003", nom: "Perceuse sans fil", categorie: "Outillage", prix: 129, stock: 6, image: "https://media.adeo.com/mkp/e2dd7a3be84c8df33a057d595274e852/media.jpg" },
  { id: 4, sku: "FIX-001", nom: "Boîte de vis 4 mm", categorie: "Fixation", prix: 12, stock: 40, image: "https://www.tihsa.com/57963-large_default/caja-de-100-tornillos-para-metal-cabeza-redonda-10-x-3-4-pulg-toolcraft.jpg" },
  { id: 5, sku: "FIX-002", nom: "Chevilles universelles", categorie: "Fixation", prix: 8, stock: 0, image: "https://www.huck-net.co.uk/media/img/images/wa2316_TevJkLk.jpg" },
  { id: 6, sku: "FIX-003", nom: "Équerres de fixation", categorie: "Fixation", prix: 18.5, stock: 18, image: "https://media.wickes.co.uk/is/image/wickes/E3131_246005_00?%24largeNormal%24=&defaultImage=wickes%2F2018-Wickes-Missing-Product-650x650" },
  { id: 7, sku: "MES-001", nom: "Mètre ruban 5 m", categorie: "Mesure", prix: 16, stock: 25, image: "https://d207zvy2rsg5b5.cloudfront.net/CA95212E-1CBC-4330-87DF-3DD5D3661085/Products/Medium/STAN33425-33-425_3.jpg" },
  { id: 8, sku: "MES-002", nom: "Niveau à bulle", categorie: "Mesure", prix: 34, stock: 9, image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Spirit_Level_5E5W0843.jpg" },
  { id: 9, sku: "MES-003", nom: "Équerre métallique", categorie: "Mesure", prix: 11.5, stock: 21, image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Steel_Square-1.jpg" },
  { id: 10, sku: "SEC-001", nom: "Gants de protection", categorie: "Protection", prix: 14, stock: 30, image: "https://cdn.store-assets.com/s/898807/i/66638891.jpg?width=1024" },
  { id: 11, sku: "SEC-002", nom: "Lunettes de sécurité", categorie: "Protection", prix: 19, stock: 0, image: "https://mutualindustries.com/Products/highres/4514.jpg" },
  { id: 12, sku: "SEC-003", nom: "Casque de chantier", categorie: "Protection", prix: 42, stock: 11, image: "https://images.thdstatic.com/productImages/b4f3a039-ba5b-40a0-88bc-1e10f355ac95/svn/white-pip-hard-hats-pro11rw-vpd6-64_600.jpg" },
];

let state = {
  category: "all",
  maxPrice: 150,
  sortOrder: null,
  discountActive: false,
};


// Catégories uniques déduites du catalogue (reduce + spread)
  function getCategories() {
    return catalogue.reduce((liste, { categorie }) => {
      return liste.includes(categorie) ? liste : [...liste, categorie];
    }, []);
  }
 
  // filter : catégorie + prix max
  function getFiltered() {
    return catalogue
      .filter(({ categorie }) => state.category === 'all' || categorie === state.category)
      .filter(({ prix }) => prix <= state.maxPrice);
  }
 
  // sort : tri croissant / décroissant 
  function getSorted(produits) {
    if (!state.sortOrder) return produits;
    const copie = [...produits];
    copie.sort((a, b) => state.sortOrder === 'asc' ? a.prix - b.prix : b.prix - a.prix);
    return copie;
  }
 
  // calcule le prix final (avec ou sans réduction -10%) pour chaque produit affiché
  function withFinalPrice(produits) {
    return produits.map((produit) => {
      const { prix } = produit;
      const prixFinal = state.discountActive ? +(prix * 0.9).toFixed(2) : prix;
      return { ...produit, prixFinal };
    });
  }
 
  function getDisplayList() {
    const filtres = getFiltered();
    const tries = getSorted(filtres);
    return withFinalPrice(tries);
  }
 
  // produit le moins cher parmi les produits affichés et en stock
  function findCheapestInStock(produits) {
    const enStock = produits.filter(({ stock }) => stock > 0);
    if (enStock.length === 0) return null;
    const prixMin = Math.min(...enStock.map(({ prixFinal }) => prixFinal));
    return enStock.find(({ prixFinal }) => prixFinal === prixMin) || null;
  }
 
  // valeur totale du stock affiché (prix catalogue, hors réduction)
  function getTotalStockValue(produits) {
    return produits.reduce((total, { prix, stock }) => total + prix * stock, 0);
  }
 
 
  function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    const categories = ['all', ...getCategories()];
    container.innerHTML = categories.map((cat) => {
      const label = cat === 'all' ? 'Toutes' : cat;
      const active = state.category === cat ? 'active' : '';
      return `<button class="chip ${active}" data-category="${cat}">${label}</button>`;
    }).join('');
 
    container.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        state = { ...state, category: btn.dataset.category };
        render();
      });
    });
  }
 
  function badgeMarkup(produit, isCheapest) {
    const { stock } = produit;
    const badges = [
      stock === 0 && { text: 'Rupture de stock', type: 'rupture' },
      state.discountActive && stock > 0 && { text: '-10%', type: 'discount' },
      isCheapest && stock > 0 && { text: 'Meilleur prix', type: 'best' },
    ].filter(Boolean);
 
    if (badges.length === 0) return '';
    return `<div class="badges">${badges.map(({ text, type }) =>
      `<span class="badge ${type}">${text}</span>`
    ).join('')}</div>`;
  }
 
  function cardMarkup(produit, isCheapest) {
    const { sku, nom, categorie, prix, prixFinal, stock, image } = produit;
    const stockClass = stock === 0 ? 'empty' : '';
    const priceRow = state.discountActive
      ? `<span class="price-old">${prix.toFixed(2)} €</span><span class="price-final">${prixFinal.toFixed(2)} €</span>`
      : `<span class="price-final">${prix.toFixed(2)} €</span>`;
 
    return `
      <article class="card">
        ${badgeMarkup(produit, isCheapest)}
        <span class="sku">${sku}</span>
        <img class="product-image" src="${image}" alt="${nom}" loading="lazy" />
        <span class="category-tag">${categorie}</span>
        <h3 class="name">${nom}</h3>
        <div class="price-row">${priceRow}</div>
        <div class="stock-row"><span class="stock-dot ${stockClass}"></span>${stock === 0 ? 'Rupture de stock' : `Stock : ${stock}`}</div>
      </article>
    `;
  }
 
  function render() {
    const produits = getDisplayList();
    const cheapest = findCheapestInStock(produits);
 
    sortie.innerHTML = '';
    const contenu = produits.length === 0
      ? `<div class="empty-state">Aucun produit ne correspond à ces filtres.</div>`
      : produits.map((p) => cardMarkup(p, cheapest && p.id === cheapest.id)).join('');
    afficher(contenu);
 
    // Encart de synthèse
    document.getElementById('stat-count').textContent = produits.length;
    const totalValue = getTotalStockValue(produits);
    document.getElementById('stat-value').textContent =
      totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
 
    // États actifs des boutons
    document.getElementById('sort-asc').classList.toggle('active', state.sortOrder === 'asc');
    document.getElementById('sort-desc').classList.toggle('active', state.sortOrder === 'desc');
    document.getElementById('discount-toggle').classList.toggle('active', state.discountActive);
    document.getElementById('discount-toggle').textContent = state.discountActive ? 'Réduction active (-10%)' : 'Appliquer -10%';
 
    renderCategoryFilters();
  }
 
 
  document.getElementById('price-range').addEventListener('input', (e) => {
    const value = Number(e.target.value);
    state = { ...state, maxPrice: value };
    document.getElementById('price-value').textContent = `${value} €`;
    render();
  });
 
  document.getElementById('sort-asc').addEventListener('click', () => {
    state = { ...state, sortOrder: state.sortOrder === 'asc' ? null : 'asc' };
    render();
  });
 
  document.getElementById('sort-desc').addEventListener('click', () => {
    state = { ...state, sortOrder: state.sortOrder === 'desc' ? null : 'desc' };
    render();
  });
 
  document.getElementById('discount-toggle').addEventListener('click', () => {
    state = { ...state, discountActive: !state.discountActive };
    render();
  });
 
  // Rendu initial
  document.getElementById('price-value').textContent = `${state.maxPrice} €`;
  render();
