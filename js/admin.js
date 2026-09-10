// JK Lights Admin Management Dashboard Controller
import {
  getStoreInfo,
  updateStoreInfo,
  getProducts,
  getProductById,
  saveProduct,
  deleteProduct,
  getSliders,
  getSliderById,
  saveSlider,
  deleteSlider,
  toggleSliderActive,
  getCategories,
  getRooms,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getStats,
  resetToDefaults
} from './store.js';

let currentEditingProductId = null;
let currentEditingSlideId = null;

document.addEventListener('DOMContentLoaded', () => {
  initAdmin();

  window.addEventListener('jk_store_updated', () => {
    renderDashboard();
    renderProductsTable();
    renderSliderTable();
    renderInquiriesTable();
    loadSettingsForm();
  });
});

function initAdmin() {
  setupNavigationTabs();
  renderDashboard();
  renderProductsTable();
  renderSliderTable();
  renderInquiriesTable();
  loadSettingsForm();
  setupProductModal();
  setupSliderModal();
  setupSettingsForm();
  setupGlobalActions();
}

// Tab Navigation
function setupNavigationTabs() {
  const menuItems = document.querySelectorAll('.admin-menu-item');
  const panels = document.querySelectorAll('.admin-view-panel');

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPanelId = item.dataset.target;

      menuItems.forEach(m => m.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(targetPanelId)?.classList.add('active');
    });
  });
}

// 1. Dashboard Overview Metrics
function renderDashboard() {
  const products = getProducts();
  const inquiries = getInquiries();
  const stats = getStats();

  const totalValue = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const activeInquiries = inquiries.filter(i => i.status !== 'Closed').length;

  document.getElementById('metricTotalProducts').textContent = products.length;
  document.getElementById('metricActiveInquiries').textContent = activeInquiries;
  document.getElementById('metricCatalogValue').textContent = `₹ ${totalValue.toLocaleString('en-IN')}`;
  document.getElementById('metricWhatsAppClicks').textContent = stats.whatsappClicks || 0;

  // Recent Inquiries Preview Table
  const recentInqContainer = document.getElementById('recentInquiriesTableBody');
  if (recentInqContainer) {
    const recent = inquiries.slice(0, 5);
    if (recent.length === 0) {
      recentInqContainer.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No customer inquiries yet.</td></tr>`;
    } else {
      recentInqContainer.innerHTML = recent.map(inq => `
        <tr>
          <td><strong>${inq.customerName}</strong><div style="font-size: 0.78rem; color: var(--text-secondary);">${inq.phone}</div></td>
          <td>${inq.roomType || 'General'}</td>
          <td>${inq.dateSubmitted}</td>
          <td><span class="status-badge ${inq.status.toLowerCase().replace(/\s+/g, '')}">${inq.status}</span></td>
          <td>
            <a href="https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}" target="_blank" class="action-icon-btn" title="Chat on WhatsApp">
              <i class="fa-brands fa-whatsapp" style="color: var(--whatsapp);"></i>
            </a>
          </td>
        </tr>
      `).join('');
    }
  }
}

// 2. Products Catalog Management (CRUD)
let currentAdminCatFilter = 'all';

function renderAdminCategoryTabs() {
  const categories = getCategories();
  const products = getProducts();
  const tabsContainer = document.getElementById('adminCategoryTabs');
  if (!tabsContainer) return;

  let html = `
    <button class="cat-jump-btn ${currentAdminCatFilter === 'all' ? 'active' : ''}" data-cat="all">
      <span>🏮 All Products</span>
      <span class="cat-pill-count">${products.length}</span>
    </button>
  `;

  categories.filter(c => c.id !== 'all').forEach(cat => {
    const count = products.filter(p => p.category === cat.id).length;
    html += `
      <button class="cat-jump-btn ${currentAdminCatFilter === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.name}</span>
        <span class="cat-pill-count">${count}</span>
      </button>
    `;
  });

  tabsContainer.innerHTML = html;

  tabsContainer.querySelectorAll('.cat-jump-btn').forEach(btn => {
    btn.onclick = () => {
      currentAdminCatFilter = btn.dataset.cat;
      const select = document.getElementById('productCategoryFilter');
      if (select) select.value = currentAdminCatFilter;
      renderProductsTable();
    };
  });
}

function renderProductsTable() {
  const products = getProducts();
  const tbody = document.getElementById('productsTableBody');
  const searchInput = document.getElementById('productSearchInput');
  const categoryFilter = document.getElementById('productCategoryFilter');

  if (!tbody) return;

  renderAdminCategoryTabs();

  let query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let catFilter = categoryFilter ? categoryFilter.value : currentAdminCatFilter;
  currentAdminCatFilter = catFilter;

  let filtered = products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || (p.badge && p.badge.toLowerCase().includes(query));
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    return matchesQuery && matchesCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No fixtures match criteria in this category.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(prod => `
    <tr>
      <td>
        <div class="product-thumb-cell">
          <img src="${prod.image}" alt="${prod.name}" class="product-thumb-img" onerror="this.src='assets/products/chandelier.jpg'" />
          <div>
            <div style="font-weight: 600; color: #fff;">${prod.name}</div>
            <div style="font-size: 0.75rem; color: var(--gold-400); text-transform: uppercase;">${prod.category} • ${prod.room || 'general'}</div>
          </div>
        </div>
      </td>
      <td>
        <span style="font-weight: 700; color: #fff;">₹ ${prod.price.toLocaleString('en-IN')}</span>
        ${prod.originalPrice ? `<div style="font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through;">₹ ${prod.originalPrice.toLocaleString('en-IN')}</div>` : ''}
      </td>
      <td>
        <button class="stock-toggle ${prod.inStock ? 'in-stock' : 'out-stock'} js-toggle-stock" data-id="${prod.id}">
          ${prod.inStock ? '● In Showroom' : '○ Out of Stock'}
        </button>
      </td>
      <td>
        ${prod.trending ? '<span style="color: var(--gold-400); font-weight: 600; font-size: 0.8rem;">★ Trending</span>' : '<span style="color: var(--text-muted); font-size: 0.8rem;">Standard</span>'}
      </td>
      <td>
        <span class="status-badge" style="background: rgba(255,255,255,0.06); color: #fff;">${prod.badge || 'None'}</span>
      </td>
      <td>
        <div class="table-actions">
          <button class="action-icon-btn js-edit-product" data-id="${prod.id}" title="Edit Fixture">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="action-icon-btn danger js-delete-product" data-id="${prod.id}" title="Delete Fixture">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Attach Table Listeners
  tbody.querySelectorAll('.js-toggle-stock').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = getProductById(btn.dataset.id);
      if (prod) {
        saveProduct({ ...prod, inStock: !prod.inStock });
        showAdminToast(`Stock status updated for ${prod.name}`);
      }
    });
  });

  tbody.querySelectorAll('.js-edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      openEditProductModal(btn.dataset.id);
    });
  });

  tbody.querySelectorAll('.js-delete-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = getProductById(btn.dataset.id);
      if (prod && confirm(`Are you sure you want to delete "${prod.name}" from showroom catalog?`)) {
        deleteProduct(prod.id);
        showAdminToast(`Product deleted successfully`);
      }
    });
  });

  searchInput?.addEventListener('input', () => renderProductsTable());
  categoryFilter?.addEventListener('change', () => {
    currentAdminCatFilter = categoryFilter.value;
    renderProductsTable();
  });
}

// 3. Product Add / Edit Modal
function setupProductModal() {
  const modal = document.getElementById('productModal');
  const btnOpenAdd = document.getElementById('btnAddNewProduct');
  const btnClose = document.getElementById('btnCloseProductModal');
  const form = document.getElementById('productForm');
  const imgInput = document.getElementById('productModalImageInput');
  const imgPreview = document.getElementById('productModalImgPreview');
  const imgPathText = document.getElementById('productModalImgPathText');

  function updatePreview(url) {
    if (imgPreview) imgPreview.src = url || 'assets/products/chandelier-imperial-crown.jpg';
    if (imgPathText) imgPathText.textContent = url || 'No image specified';
  }

  imgInput?.addEventListener('input', () => updatePreview(imgInput.value));

  modal?.querySelectorAll('.js-img-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      if (imgInput) {
        imgInput.value = btn.dataset.src;
        updatePreview(btn.dataset.src);
      }
    });
  });

  const priceInput = form?.elements['price'];
  const origPriceInput = form?.elements['originalPrice'];
  const discountInput = form?.elements['discount'];

  function calcDiscount() {
    const p = Number(priceInput?.value) || 0;
    const op = Number(origPriceInput?.value) || 0;
    if (op > p && p > 0 && discountInput) {
      const pct = Math.round(((op - p) / op) * 100);
      discountInput.value = `${pct}% OFF`;
    }
  }

  priceInput?.addEventListener('input', calcDiscount);
  origPriceInput?.addEventListener('input', calcDiscount);

  if (btnOpenAdd) {
    btnOpenAdd.addEventListener('click', () => {
      currentEditingProductId = null;
      document.getElementById('productModalTitle').textContent = 'Add New Lighting Fixture';
      form.reset();
      updatePreview('assets/products/chandelier-imperial-crown.jpg');
      modal.classList.add('active');
    });
  }

  btnClose?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const productData = {
      name: formData.get('name'),
      category: formData.get('category'),
      room: formData.get('room'),
      price: parseInt(formData.get('price'), 10),
      originalPrice: formData.get('originalPrice') ? parseInt(formData.get('originalPrice'), 10) : null,
      discount: formData.get('discount') || '',
      badge: formData.get('badge') || '',
      image: formData.get('image') || 'assets/products/chandelier-imperial-crown.jpg',
      description: formData.get('description') || '',
      trending: formData.get('trending') === 'on',
      inStock: formData.get('inStock') === 'on'
    };

    if (currentEditingProductId) {
      productData.id = currentEditingProductId;
    }

    saveProduct(productData);
    modal.classList.remove('active');
    form.reset();
    showAdminToast(currentEditingProductId ? 'Product details updated' : 'New product added to catalog');
  });
}

function openEditProductModal(productId) {
  const prod = getProductById(productId);
  if (!prod) return;

  currentEditingProductId = productId;
  document.getElementById('productModalTitle').textContent = 'Edit Lighting Fixture';

  const form = document.getElementById('productForm');
  const imgPreview = document.getElementById('productModalImgPreview');
  const imgPathText = document.getElementById('productModalImgPathText');

  form.elements['name'].value = prod.name;
  form.elements['category'].value = prod.category;
  form.elements['room'].value = prod.room || 'living';
  form.elements['price'].value = prod.price;
  form.elements['originalPrice'].value = prod.originalPrice || '';
  form.elements['discount'].value = prod.discount || '';
  form.elements['badge'].value = prod.badge || '';
  form.elements['image'].value = prod.image;
  form.elements['description'].value = prod.description || '';
  form.elements['trending'].checked = !!prod.trending;
  form.elements['inStock'].checked = !!prod.inStock;

  if (imgPreview) imgPreview.src = prod.image || 'assets/products/chandelier-imperial-crown.jpg';
  if (imgPathText) imgPathText.textContent = prod.image || '';

  document.getElementById('productModal').classList.add('active');
}

// 4. Hero Slider & Banners Management (CRUD)
function renderSliderTable() {
  const sliders = getSliders();
  const tbody = document.getElementById('slidersTableBody');
  if (!tbody) return;

  if (sliders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No hero slides found. Click "Add New Slide" to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = sliders.map(slide => `
    <tr>
      <td style="font-weight: 800; color: var(--gold-400); font-size: 1.1rem; text-align: center; width: 60px;">
        #${slide.order || 1}
      </td>
      <td style="width: 120px;">
        <div style="width: 100px; height: 60px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-medium); background: #000;">
          <img src="${slide.image}" alt="${slide.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/hero.jpg'" />
        </div>
      </td>
      <td>
        <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${slide.title}</div>
        ${slide.highlightText ? `<div style="color: var(--gold-400); font-weight: 600; font-size: 0.85rem;">${slide.highlightText}</div>` : ''}
        <div style="color: var(--text-muted); font-size: 0.78rem; max-width: 280px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${slide.subtitle || ''}</div>
      </td>
      <td>
        ${slide.badge ? `<span style="background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold-border); color: var(--gold-300); font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 12px;">${slide.badge}</span>` : '<span style="color: var(--text-muted); font-size: 0.8rem;">None</span>'}
      </td>
      <td>
        <div style="font-size: 0.85rem; color: #fff; font-weight: 600;">${slide.btnText || 'Explore'}</div>
        <div style="font-size: 0.75rem; color: var(--gold-400);">${slide.btnLink || '#productsSection'}</div>
      </td>
      <td>
        <button class="status-badge ${slide.active !== false ? 'new' : 'closed'} js-toggle-slide-active" data-id="${slide.id}" style="cursor: pointer; border: none; font-weight: 700;">
          ${slide.active !== false ? '● Active' : '○ Inactive'}
        </button>
      </td>
      <td>
        <div class="table-actions">
          <button class="action-icon-btn js-edit-slide" data-id="${slide.id}" title="Edit Slide">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="action-icon-btn danger js-delete-slide" data-id="${slide.id}" title="Delete Slide">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Event handlers
  tbody.querySelectorAll('.js-edit-slide').forEach(btn => {
    btn.addEventListener('click', () => {
      openEditSliderModal(btn.dataset.id);
    });
  });

  tbody.querySelectorAll('.js-delete-slide').forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = getSliderById(btn.dataset.id);
      if (slide && confirm(`Are you sure you want to delete slide "${slide.title}"?`)) {
        deleteSlider(slide.id);
        showAdminToast('Slide removed from carousel');
      }
    });
  });

  tbody.querySelectorAll('.js-toggle-slide-active').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleSliderActive(btn.dataset.id);
      showAdminToast('Slide status toggled');
    });
  });
}

function setupSliderModal() {
  const modal = document.getElementById('sliderModal');
  const btnOpenAdd = document.getElementById('btnAddNewSlide');
  const btnClose = document.getElementById('btnCloseSliderModal');
  const form = document.getElementById('sliderForm');

  if (btnOpenAdd) {
    btnOpenAdd.addEventListener('click', () => {
      currentEditingSlideId = null;
      document.getElementById('sliderModalTitle').textContent = 'Add New Hero Slide';
      form.reset();
      form.elements['order'].value = (getSliders().length + 1);
      modal.classList.add('active');
    });
  }

  btnClose?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const slideData = {
      title: formData.get('title'),
      highlightText: formData.get('highlightText') || '',
      subtitle: formData.get('subtitle') || '',
      badge: formData.get('badge') || '',
      image: formData.get('image') || 'assets/hero.jpg',
      btnText: formData.get('btnText') || 'Explore Fixtures',
      btnLink: formData.get('btnLink') || '#productsSection',
      secondaryBtnText: formData.get('secondaryBtnText') || '',
      secondaryBtnLink: formData.get('secondaryBtnLink') || '',
      order: parseInt(formData.get('order'), 10) || 1,
      active: formData.get('active') === 'on'
    };

    if (currentEditingSlideId) {
      slideData.id = currentEditingSlideId;
    }

    saveSlider(slideData);
    modal.classList.remove('active');
    form.reset();
    showAdminToast(currentEditingSlideId ? 'Hero slide updated successfully! ✨' : 'New hero slide added to homepage! ✨');
  });
}

function openEditSliderModal(slideId) {
  const slide = getSliderById(slideId);
  if (!slide) return;

  currentEditingSlideId = slideId;
  document.getElementById('sliderModalTitle').textContent = 'Edit Hero Slide';

  const form = document.getElementById('sliderForm');
  form.elements['title'].value = slide.title || '';
  form.elements['highlightText'].value = slide.highlightText || '';
  form.elements['subtitle'].value = slide.subtitle || '';
  form.elements['badge'].value = slide.badge || '';
  form.elements['image'].value = slide.image || '';
  form.elements['btnText'].value = slide.btnText || '';
  form.elements['btnLink'].value = slide.btnLink || '';
  form.elements['secondaryBtnText'].value = slide.secondaryBtnText || '';
  form.elements['secondaryBtnLink'].value = slide.secondaryBtnLink || '';
  form.elements['order'].value = slide.order || 1;
  form.elements['active'].checked = slide.active !== false;

  document.getElementById('sliderModal').classList.add('active');
}

// 5. Inquiries & Leads Management
function renderInquiriesTable() {
  const inquiries = getInquiries();
  const tbody = document.getElementById('inquiriesTableBody');
  if (!tbody) return;

  if (inquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No inquiries received yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = inquiries.map(inq => {
    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    const waChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${inq.customerName}! Greetings from JK Lights Gandhinagar showroom. We received your consultation inquiry.`)}`;

    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: #fff;">${inq.customerName}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${inq.dateSubmitted}</div>
        </td>
        <td>
          <a href="tel:${cleanPhone}" style="color: var(--gold-400); text-decoration: none; font-weight: 600;">
            <i class="fa-solid fa-phone"></i> ${inq.phone}
          </a>
        </td>
        <td>
          <span style="color: #fff; font-weight: 500;">${inq.roomType || 'General'}</span>
          ${inq.interest ? `<div style="font-size: 0.78rem; color: var(--text-secondary);">${inq.interest}</div>` : ''}
        </td>
        <td>
          <div style="font-size: 0.85rem; color: var(--text-secondary); max-width: 250px;">${inq.notes || 'No extra notes'}</div>
          ${inq.preferredDate ? `<div style="font-size: 0.75rem; color: var(--gold-400);">Preferred: ${inq.preferredDate}</div>` : ''}
        </td>
        <td>
          <select class="form-control js-inquiry-status" data-id="${inq.id}" style="padding: 4px 8px; font-size: 0.8rem; width: 140px;">
            <option value="New" ${inq.status === 'New' ? 'selected' : ''}>🟡 New</option>
            <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>🔵 Contacted</option>
            <option value="Showroom Scheduled" ${inq.status === 'Showroom Scheduled' ? 'selected' : ''}>🟢 Scheduled</option>
            <option value="Closed" ${inq.status === 'Closed' ? 'selected' : ''}>⚪ Closed</option>
          </select>
        </td>
        <td>
          <div class="table-actions">
            <a href="${waChatUrl}" target="_blank" class="action-icon-btn" title="Chat on WhatsApp">
              <i class="fa-brands fa-whatsapp" style="color: var(--whatsapp);"></i>
            </a>
            <a href="tel:${cleanPhone}" class="action-icon-btn" title="Call Customer">
              <i class="fa-solid fa-phone"></i>
            </a>
            <button class="action-icon-btn danger js-delete-inquiry" data-id="${inq.id}" title="Delete Lead">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.js-inquiry-status').forEach(select => {
    select.addEventListener('change', () => {
      updateInquiryStatus(select.dataset.id, select.value);
      showAdminToast(`Lead status updated to ${select.value}`);
    });
  });

  tbody.querySelectorAll('.js-delete-inquiry').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this inquiry?')) {
        deleteInquiry(btn.dataset.id);
        showAdminToast('Inquiry removed');
      }
    });
  });
}

// 5. Store Settings Form
function loadSettingsForm() {
  const store = getStoreInfo();
  const form = document.getElementById('storeSettingsForm');
  if (!form) return;

  if (form.elements['name']) form.elements['name'].value = store.name || '';
  if (form.elements['city']) form.elements['city'].value = store.city || '';
  if (form.elements['address']) form.elements['address'].value = store.address || '';
  if (form.elements['landmark']) form.elements['landmark'].value = store.landmark || '';
  if (form.elements['phone']) form.elements['phone'].value = store.phone || '';
  if (form.elements['whatsapp']) form.elements['whatsapp'].value = store.whatsapp || '';
  if (form.elements['email']) form.elements['email'].value = store.email || '';
  if (form.elements['timingsWeekdays']) form.elements['timingsWeekdays'].value = store.timingsWeekdays || '';
  if (form.elements['timingsSunday']) form.elements['timingsSunday'].value = store.timingsSunday || '';
  if (form.elements['announcementText']) form.elements['announcementText'].value = store.announcementText || '';
  if (form.elements['gmapsQuery']) form.elements['gmapsQuery'].value = store.gmapsQuery || '';
  
  if (form.elements['showroomImage']) {
    const imgUrl = store.showroomImage || 'assets/showroom.jpg';
    form.elements['showroomImage'].value = imgUrl;
    const preview = document.getElementById('showroomPhotoPreview');
    if (preview) preview.src = imgUrl;
  }
}

function setupSettingsForm() {
  const form = document.getElementById('storeSettingsForm');
  if (!form) return;

  const showroomImgInput = document.getElementById('showroomImageInput');
  const showroomPreview = document.getElementById('showroomPhotoPreview');
  const showroomFileInput = document.getElementById('showroomPhotoFileInput');
  const btnResetPhoto = document.getElementById('btnResetShowroomPhoto');

  if (showroomImgInput && showroomPreview) {
    showroomImgInput.addEventListener('input', () => {
      showroomPreview.src = showroomImgInput.value || 'assets/showroom.jpg';
    });
  }

  if (showroomFileInput && showroomImgInput && showroomPreview) {
    showroomFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        showroomImgInput.value = event.target.result;
        showroomPreview.src = event.target.result;
        showAdminToast('Photo uploaded! Click "Save Settings" to apply. 📸');
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnResetPhoto && showroomImgInput && showroomPreview) {
    btnResetPhoto.addEventListener('click', () => {
      showroomImgInput.value = 'assets/showroom.jpg';
      showroomPreview.src = 'assets/showroom.jpg';
      showAdminToast('Reset to default showroom image.');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const updated = {
      name: formData.get('name'),
      city: formData.get('city'),
      address: formData.get('address'),
      landmark: formData.get('landmark'),
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      timingsWeekdays: formData.get('timingsWeekdays'),
      timingsSunday: formData.get('timingsSunday'),
      announcementText: formData.get('announcementText'),
      gmapsQuery: formData.get('gmapsQuery'),
      showroomImage: formData.get('showroomImage') || 'assets/showroom.jpg'
    };

    updateStoreInfo(updated);
    showAdminToast('Showroom & Contact information saved successfully! ✅');
  });
}

// 6. Global Export & Reset
function setupGlobalActions() {
  document.getElementById('btnExportData')?.addEventListener('click', () => {
    const data = {
      storeInfo: getStoreInfo(),
      sliders: getSliders(),
      products: getProducts(),
      categories: getCategories(),
      rooms: getRooms(),
      inquiries: getInquiries()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jk-lights-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showAdminToast('Database exported to JSON');
  });

  document.getElementById('btnResetFactoryDemo')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all products, showroom details, and sample data to factory defaults?')) {
      resetToDefaults();
      showAdminToast('Showroom catalog reset to defaults');
    }
  });
}

function showAdminToast(msg) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--gold-400);"></i> <span>${msg}</span>`;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3500);
}
