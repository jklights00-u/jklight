// JK Lights Storefront Application Controller
import {
  getStoreInfo,
  getProducts,
  getProductById,
  getCategories,
  getRooms,
  getSliders,
  getBlogs,
  getFaqs,
  getWishlist,
  toggleWishlist,
  getCart,
  addToCart,
  updateCartQty,
  removeFromCart,
  addInquiry,
  recordStat,
  getWhatsAppProductUrl,
  getWhatsAppConsultationUrl
} from './store.js';

let activeCategory = 'all';
let activeRoom = 'all';
let currentVisualizerRoom = 'living';
let currentSlideIndex = 0;
let sliderInterval = null;
const SLIDE_DURATION = 5500; // 5.5s autoplay

document.addEventListener('DOMContentLoaded', () => {
  initStorefront();

  // Listen for real-time updates from Admin
  window.addEventListener('jk_store_updated', () => {
    refreshStorefront();
  });
});

function initStorefront() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const roomParam = urlParams.get('room');
    if (catParam) activeCategory = catParam;
    if (roomParam) activeRoom = roomParam;
  } catch (e) {}

  recordStat('viewsToday');
  loadStoreDetails();
  setupHeaderNavigation();
  renderHeroSlider();
  renderCategories();
  renderRooms();
  renderProducts();
  renderBlogs();
  renderFaqs();
  setupBlinkAndGlow();
  setupSearch();
  setupDrawersAndModals();
  setupFloatingChat();
  updateBadges();
}

function refreshStorefront() {
  loadStoreDetails();
  renderHeroSlider();
  renderCategories();
  renderRooms();
  renderProducts();
  renderBlogs();
  renderFaqs();
  updateBadges();
}

// 1. Render Store Contact & Showroom Details from Store
function loadStoreDetails() {
  const store = getStoreInfo();
  
  // Announcement
  const annEl = document.getElementById('announcementText');
  if (annEl) annEl.textContent = store.announcementText;

  // Location tags
  const locEl = document.getElementById('locationTagCity');
  if (locEl) locEl.textContent = store.city;

  // Showroom details in footer & section
  const addrEl = document.getElementById('showroomAddressText');
  if (addrEl) addrEl.textContent = store.address;

  const landmarkEl = document.getElementById('showroomLandmarkText');
  if (landmarkEl) landmarkEl.textContent = store.landmark;

  const phoneEl = document.getElementById('showroomPhoneText');
  if (phoneEl) {
    phoneEl.textContent = store.phone;
    phoneEl.href = `tel:${store.phone.replace(/\s+/g, '')}`;
  }

  const hoursEl = document.getElementById('showroomHoursText');
  if (hoursEl) hoursEl.textContent = `${store.timingsWeekdays} | ${store.timingsSunday}`;

  // Direction buttons
  const dirBtns = document.querySelectorAll('.js-gmaps-link');
  dirBtns.forEach(btn => {
    btn.href = store.gmapsQuery;
  });

  // Dynamic Showroom Photo from Admin Settings
  if (store.showroomImage) {
    const showroomImgs = document.querySelectorAll('.about-img-main, .js-showroom-img, img[src*="showroom.jpg"]');
    showroomImgs.forEach(img => {
      img.src = store.showroomImage;
    });
  }
}

// 2. Setup Header Navigation, ScrollSpy, and Mobile Drawer
function setupHeaderNavigation() {
  const mobileToggle = document.getElementById('btnMobileNavToggle');
  const mobileMenu = document.getElementById('mobileNavMenu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mobileMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Smooth scroll and active state on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
            const icon = mobileToggle?.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
          }
        }
      }
    });
  });

  // ScrollSpy with IntersectionObserver
  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
  }
}

// 3. Dynamic Hero Image Slider Carousel Engine
function renderHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const dotsContainer = document.getElementById('heroSliderDots');
  const prevBtn = document.getElementById('heroSliderPrev');
  const nextBtn = document.getElementById('heroSliderNext');
  const progressFill = document.getElementById('sliderProgressFill');
  const slider = document.getElementById('heroSlider');

  if (!track || !dotsContainer) return;

  const slides = getSliders(true);
  if (slides.length === 0) return;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  // Render Slides HTML
  track.innerHTML = slides.map((slide, idx) => `
    <div class="hero-slide ${idx === currentSlideIndex ? 'active' : ''}" data-index="${idx}">
      <div class="slide-bg" style="background-image: url('${slide.image}');"></div>
      <div class="slide-overlay"></div>
      <div class="slide-glow"></div>

      <div class="container slide-content-wrap">
        <div class="slide-content">
          ${slide.badge ? `<div class="slide-badge"><i class="fa-solid fa-sparkles"></i> <span>${slide.badge}</span></div>` : ''}
          <h1 class="slide-title">
            ${slide.title} <br />
            ${slide.highlightText ? `<span class="gold-text">${slide.highlightText}</span>` : ''}
          </h1>
          <p class="slide-desc">${slide.subtitle}</p>

          <div class="slide-ctas">
            <a href="${slide.btnLink || '#productsSection'}" class="btn btn-gold js-slide-btn" data-link="${slide.btnLink || '#productsSection'}">
              ${slide.btnText || 'Explore Fixtures'} <i class="fa-solid fa-arrow-right"></i>
            </a>

            ${slide.secondaryBtnText ? `
              <button class="btn btn-glass js-slide-secondary-btn" data-link="${slide.secondaryBtnLink || 'modal:consultation'}">
                ${slide.secondaryBtnText}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Render Dots
  dotsContainer.innerHTML = slides.map((_, idx) => `
    <button class="slider-dot ${idx === currentSlideIndex ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
  `).join('');

  // Attach button actions in slides
  track.querySelectorAll('.js-slide-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const link = btn.dataset.link;
      if (link.startsWith('modal:consultation')) {
        e.preventDefault();
        openConsultationModal();
      } else if (link.startsWith('modal:visualizer')) {
        e.preventDefault();
        openVisualizerModal();
      } else if (link.startsWith('#')) {
        e.preventDefault();
        document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  track.querySelectorAll('.js-slide-secondary-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = btn.dataset.link;
      if (link.startsWith('modal:consultation')) {
        openConsultationModal();
      } else if (link.startsWith('modal:visualizer')) {
        openVisualizerModal();
      } else if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else if (link.startsWith('#')) {
        document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dots click handler
  dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index, 10));
      resetSliderTimer();
    });
  });

  // Prev / Next handler
  if (prevBtn) {
    prevBtn.onclick = () => {
      goToSlide(currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1);
      resetSliderTimer();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      goToSlide(currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1);
      resetSliderTimer();
    };
  }

  function goToSlide(index) {
    const allSlides = track.querySelectorAll('.hero-slide');
    const allDots = dotsContainer.querySelectorAll('.slider-dot');
    if (allSlides.length === 0) return;

    allSlides[currentSlideIndex]?.classList.remove('active');
    allDots[currentSlideIndex]?.classList.remove('active');

    currentSlideIndex = (index + slides.length) % slides.length;

    allSlides[currentSlideIndex]?.classList.add('active');
    allDots[currentSlideIndex]?.classList.add('active');

    // Trigger progress animation
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      setTimeout(() => {
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
      }, 50);
    }
  }

  function startSliderTimer() {
    stopSliderTimer();
    if (progressFill) {
      progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
      progressFill.style.width = '100%';
    }
    sliderInterval = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, SLIDE_DURATION);
  }

  function stopSliderTimer() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
    }
  }

  function resetSliderTimer() {
    startSliderTimer();
  }

  // Hover pause & resume
  if (slider) {
    slider.onmouseenter = () => stopSliderTimer();
    slider.onmouseleave = () => startSliderTimer();

    // Touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.ontouchstart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopSliderTimer();
    };

    slider.ontouchend = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        // swipe left -> next slide
        goToSlide(currentSlideIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        // swipe right -> prev slide
        goToSlide(currentSlideIndex - 1);
      }
      startSliderTimer();
    };
  }

  // Initial timer start
  startSliderTimer();
}

// 4. Render Categories Navigation & Circular Icons
function renderCategories() {
  const categories = getCategories();

  // Subnav pills
  const subnav = document.getElementById('categorySubnav');
  if (subnav) {
    subnav.innerHTML = categories.map((cat, idx) => `
      <a href="#productsSection" class="nav-pill ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
        ${cat.name}
        ${idx === 0 ? '' : idx === 1 ? '<span class="tag-hot">HOT</span>' : ''}
      </a>
    `).join('');

    subnav.querySelectorAll('.nav-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        subnav.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        renderProducts();
        document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Circular Icons Grid
  const catGrid = document.getElementById('categoryGrid');
  if (catGrid) {
    const displayCats = categories.filter(c => c.id !== 'all');
    catGrid.innerHTML = displayCats.map(cat => `
      <div class="category-card" data-category="${cat.id}">
        <div class="category-circle">
          <img src="${cat.icon}" alt="${cat.name}" class="category-img" loading="lazy" />
        </div>
        <span class="category-name">${cat.name}</span>
      </div>
    `).join('');

    catGrid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        activeCategory = card.dataset.category;
        // Update subnav active class
        subnav?.querySelectorAll('.nav-pill').forEach(p => {
          p.classList.toggle('active', p.dataset.category === activeCategory);
        });
        renderProducts();
        document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

// 3. Render Shop By Room Cards
function renderRooms() {
  const rooms = getRooms();
  const roomGrid = document.getElementById('roomGrid');
  if (!roomGrid) return;

  roomGrid.innerHTML = rooms.map(room => `
    <div class="room-card" data-room="${room.id}">
      <img src="${room.image}" alt="${room.name}" class="room-img" loading="lazy" />
      <div class="room-overlay">
        <div class="room-info">
          <span class="room-name">${room.name}</span>
          <span class="room-arrow"><i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </div>
  `).join('');

  roomGrid.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', () => {
      activeRoom = card.dataset.room;
      activeCategory = 'all';
      renderProducts();
      document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function getCategoryEmoji(catId) {
  const emojis = {
    'chandeliers': '💎',
    'double-height': '🏛️',
    'wall': '✨',
    'pendant': '💡',
    'table-floor': '🛋️',
    'ceiling': '🌟',
    'track': '⚡',
    'outdoor': '🌿',
    'smart': '📱',
    'all': '🏮'
  };
  return emojis[catId] || '✨';
}

function renderProductCard(prod, wishlist) {
  const isWishlisted = wishlist.includes(prod.id);
  const waUrl = getWhatsAppProductUrl(prod);

  return `
    <div class="product-card" data-id="${prod.id}">
      <div class="product-media">
        <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" />
        ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
        <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" data-id="${prod.id}" title="Add to Wishlist">
          <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div class="product-content">
        <span class="product-category-name">${prod.category}</span>
        <h3 class="product-title" title="${prod.name}">${prod.name}</h3>
        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <span>${(prod.rating || 5).toFixed(1)} (${prod.reviewsCount || 12})</span>
          ${prod.inStock ? '<span style="color: #10b981; margin-left: auto; font-size: 0.75rem;">● In Showroom</span>' : '<span style="color: #ef4444; margin-left: auto; font-size: 0.75rem;">● Made to Order</span>'}
        </div>
        <div class="product-price-row">
          <span class="product-price">₹ ${prod.price.toLocaleString('en-IN')}</span>
          ${prod.originalPrice ? `<span class="product-original-price">₹ ${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          ${prod.discount ? `<span class="product-discount-tag">${prod.discount}</span>` : ''}
        </div>
        <div class="product-actions">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp js-wa-click" data-id="${prod.id}">
            <i class="fa-brands fa-whatsapp"></i> Buy on WhatsApp
          </a>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button class="btn btn-glass btn-sm js-quick-view" data-id="${prod.id}">
              <i class="fa-regular fa-eye"></i> Specs
            </button>
            <button class="btn btn-glass btn-sm js-add-cart" data-id="${prod.id}">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindProductEvents(container) {
  container.querySelectorAll('.wishlist-heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      toggleWishlist(id);
      renderProducts();
      updateBadges();
      showToast('Wishlist updated ✨');
    });
  });

  container.querySelectorAll('.js-wa-click').forEach(btn => {
    btn.addEventListener('click', () => {
      recordStat('whatsappClicks');
    });
  });

  container.querySelectorAll('.js-quick-view').forEach(btn => {
    btn.addEventListener('click', () => {
      openQuickViewModal(btn.dataset.id);
    });
  });

  container.querySelectorAll('.js-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id, 1);
      updateBadges();
      showToast('Added to Selection Cart 🛒');
      openCartDrawer();
    });
  });
}

// 4. Render Products Grid (Category-Wise & Filtered)
function renderProducts() {
  const products = getProducts();
  const categories = getCategories();
  const wishlist = getWishlist();
  const grid = document.getElementById('productsGrid');
  const sectionTitle = document.getElementById('productsSectionTitle');
  if (!grid) return;

  // Update active state of header category subnav
  document.querySelectorAll('#categorySubnav .nav-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === activeCategory);
  });

  // CASE A: Focused Category or Room Filter
  if (activeCategory !== 'all' || activeRoom !== 'all') {
    let filtered = products;
    let title = 'Explore Lighting Collection';
    let desc = 'Handcrafted luxury lighting fixtures for architectural residences';
    let count = 0;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
      const catObj = categories.find(c => c.id === activeCategory);
      title = catObj ? catObj.name : activeCategory.toUpperCase();
      desc = catObj ? catObj.desc : `Showing all ${filtered.length} fixtures in ${activeCategory}`;
      count = filtered.length;
    } else if (activeRoom !== 'all') {
      filtered = filtered.filter(p => p.room === activeRoom);
      const roomObj = getRooms().find(r => r.id === activeRoom);
      title = roomObj ? `${roomObj.name} Lighting` : `${activeRoom.toUpperCase()} LIGHTING`;
      desc = roomObj ? roomObj.desc : `Showing all ${filtered.length} fixtures for ${activeRoom}`;
      count = filtered.length;
    }

    if (sectionTitle) sectionTitle.textContent = title;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-lightbulb" style="font-size: 3rem; color: var(--gold-400); margin-bottom: 16px;"></i>
          <h3 style="color: #fff; margin-bottom: 8px;">No fixtures found in this category</h3>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">We customize lights on order as well. Contact our Gandhinagar showroom expert!</p>
          <button class="btn btn-gold" id="btnResetFilters">View All Products</button>
        </div>
      `;
      document.getElementById('btnResetFilters')?.addEventListener('click', () => {
        activeCategory = 'all';
        activeRoom = 'all';
        renderProducts();
      });
      return;
    }

    grid.innerHTML = `
      <div class="category-view-banner" style="grid-column: 1/-1; width: 100%;">
        <div class="cat-banner-left">
          <button class="cat-banner-back-btn js-show-all-cats">
            <i class="fa-solid fa-arrow-left"></i> View All Categories
          </button>
          <h2 class="cat-banner-title">${getCategoryEmoji(activeCategory)} ${title}</h2>
          <p class="cat-banner-subtitle">${desc}</p>
        </div>
        <div class="cat-filter-tools">
          <span class="cat-sec-count">${count} Models Available</span>
          <button class="btn btn-glass btn-sm js-show-all-cats">
            <i class="fa-solid fa-layer-group"></i> Browse All Sections
          </button>
        </div>
      </div>
      ${filtered.map(prod => renderProductCard(prod, wishlist)).join('')}
    `;

    bindProductEvents(grid);
    grid.querySelectorAll('.js-show-all-cats').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = 'all';
        activeRoom = 'all';
        renderProducts();
        document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
    return;
  }

  // CASE B: "All" View - Render Category Quick Jump Bar + Grouped Category Sections
  if (sectionTitle) sectionTitle.textContent = 'Explore Lighting Collection';

  const realCategories = categories.filter(c => c.id !== 'all');

  // 1. Category Quick-Jump Bar
  let jumpBarHtml = `
    <div class="category-jump-bar" style="grid-column: 1/-1; width: 100%;">
      <button class="cat-jump-btn active" data-target="all">
        <span>🏮 All Categories</span>
        <span class="cat-pill-count">${products.length}</span>
      </button>
  `;

  realCategories.forEach(cat => {
    const catCount = products.filter(p => p.category === cat.id).length;
    if (catCount > 0) {
      jumpBarHtml += `
        <button class="cat-jump-btn" data-target="cat-sec-${cat.id}">
          <span>${getCategoryEmoji(cat.id)} ${cat.name}</span>
          <span class="cat-pill-count">${catCount}</span>
        </button>
      `;
    }
  });
  jumpBarHtml += `</div>`;

  // Check if we are on the Homepage (has heroSlider) vs dedicated Products page
  const isHomePage = !!document.getElementById('heroSlider');

  // 2. Category Sections with Product Grids
  let sectionsHtml = '';
  realCategories.forEach(cat => {
    const catProducts = products.filter(p => p.category === cat.id);
    if (catProducts.length === 0) return;

    const displayedProducts = isHomePage ? catProducts.slice(0, 4) : catProducts;
    const hasMoreOnHome = isHomePage && catProducts.length > 4;

    sectionsHtml += `
      <div class="category-section-block" id="cat-sec-${cat.id}">
        <div class="category-section-header">
          <div>
            <div class="cat-sec-tag">${getCategoryEmoji(cat.id)} LUXURY COLLECTION</div>
            <h2 class="cat-sec-title">${cat.name}</h2>
            <p class="cat-sec-desc">${cat.desc || 'Premium fixtures handcrafted with refined materials & high efficiency illumination.'}</p>
          </div>
          <div class="cat-sec-actions">
            <span class="cat-sec-count">${catProducts.length} Models</span>
            ${isHomePage ? `
              <a href="products.html?category=${cat.id}#productsSection" class="btn btn-glass btn-sm">
                View All ${cat.name} (${catProducts.length}) <i class="fa-solid fa-arrow-right"></i>
              </a>
            ` : `
              <button class="btn btn-glass btn-sm js-filter-cat" data-cat="${cat.id}">
                View Only ${cat.name} <i class="fa-solid fa-arrow-right"></i>
              </button>
            `}
          </div>
        </div>
        <div class="category-products-subgrid">
          ${displayedProducts.map(prod => renderProductCard(prod, wishlist)).join('')}
        </div>
        ${hasMoreOnHome ? `
          <div class="cat-sec-view-more" style="text-align: center; margin-top: 24px; padding-top: 12px; grid-column: 1/-1; width: 100%;">
            <a href="products.html?category=${cat.id}#productsSection" class="btn btn-gold" style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 28px; font-weight: 700; border-radius: var(--radius-pill); box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);">
              <span>View More in ${cat.name} (${catProducts.length}+ Models)</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        ` : ''}
      </div>
    `;
  });

  grid.innerHTML = jumpBarHtml + sectionsHtml;
  bindProductEvents(grid);

  // Bind Jump Pills smooth scrolling
  grid.querySelectorAll('.cat-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      if (targetId === 'all') {
        activeCategory = 'all';
        activeRoom = 'all';
        renderProducts();
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          grid.querySelectorAll('.cat-jump-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      }
    });
  });

  // Bind "View Only [Category]" buttons
  grid.querySelectorAll('.js-filter-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderProducts();
      document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// 5. "See It In Your Space ✨" AI Room Visualizer Controller
function setupVisualizer() {
  const roomBg = document.getElementById('visualizerRoomBg');
  const fixtureOverlay = document.getElementById('visualizerFixtureOverlay');
  const fixtureImg = document.getElementById('visualizerFixtureImg');
  const dropzone = document.getElementById('visualizerDropzone');
  const fileInput = document.getElementById('visualizerFileInput');
  const tabs = document.querySelectorAll('.room-thumb-btn');
  const previewModalBtn = document.getElementById('btnPreviewInRoom');

  if (!roomBg || !fixtureImg) return;

  // Template Room Switcher
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentVisualizerRoom = tab.dataset.room;
      roomBg.src = tab.dataset.image;
      recordStat('roomPreviews');
    });
  });

  // Custom Photo Upload
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          roomBg.src = event.target.result;
          tabs.forEach(t => t.classList.remove('active'));
          showToast('Your room uploaded! Previewing lights...');
          recordStat('roomPreviews');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Preview in room modal button
  if (previewModalBtn) {
    previewModalBtn.addEventListener('click', () => {
      openVisualizerModal();
    });
  }
}

// 6. Interactive Blink & Glow Feature Banner Controller
function setupBlinkAndGlow() {
  const dimmerSlider = document.getElementById('dimmerSlider');
  const dimmerValText = document.getElementById('dimmerValueText');
  const chandelierImg = document.getElementById('spotlightChandelier');
  const ambientGlow = document.getElementById('spotlightGlowAmbient');
  const tempBtns = document.querySelectorAll('.temp-btn');

  if (!dimmerSlider || !chandelierImg) return;

  // Dimmer Brightness Slider
  dimmerSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    dimmerValText.textContent = `${val}%`;

    const brightnessFactor = val / 100;
    const glowSpread = Math.round(20 + (val * 0.4));
    const haloOpacity = (0.15 + (brightnessFactor * 0.45)).toFixed(2);

    chandelierImg.style.filter = `drop-shadow(0 0 ${glowSpread}px rgba(243, 207, 122, ${brightnessFactor})) brightness(${0.6 + brightnessFactor * 0.6})`;
    if (ambientGlow) {
      ambientGlow.style.opacity = haloOpacity;
      ambientGlow.style.transform = `translate(-50%, -50%) scale(${0.8 + brightnessFactor * 0.4})`;
    }
  });

  // Color Temperature (Warm 2700K, Neutral 4000K, Cool 6500K)
  tempBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tempBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const temp = btn.dataset.temp;
      if (temp === 'warm') {
        chandelierImg.style.filter = `sepia(0.4) drop-shadow(0 0 35px rgba(243, 180, 50, 0.8))`;
      } else if (temp === 'neutral') {
        chandelierImg.style.filter = `sepia(0.1) drop-shadow(0 0 35px rgba(255, 240, 200, 0.85))`;
      } else if (temp === 'cool') {
        chandelierImg.style.filter = `hue-rotate(180deg) saturate(0.8) drop-shadow(0 0 35px rgba(180, 220, 255, 0.85))`;
      }
    });
  });

  // Hover Blink & Glow effect
  chandelierImg.parentElement?.addEventListener('mouseenter', () => {
    chandelierImg.style.transform = 'scale(1.04)';
  });
  chandelierImg.parentElement?.addEventListener('mouseleave', () => {
    chandelierImg.style.transform = 'scale(1)';
  });
}

// 7. Global Search Filter
function setupSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      dropdown.classList.remove('active');
      return;
    }

    const products = getProducts();
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (matches.length > 0) {
      dropdown.innerHTML = matches.slice(0, 5).map(prod => `
        <div class="search-item" style="display: flex; align-items: center; gap: 12px; padding: 8px; cursor: pointer; border-radius: 6px; transition: background 0.2s;" data-id="${prod.id}">
          <img src="${prod.image}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" />
          <div>
            <div style="font-weight: 600; color: #fff; font-size: 0.88rem;">${prod.name}</div>
            <div style="color: var(--gold-400); font-size: 0.78rem;">₹ ${prod.price.toLocaleString('en-IN')} • ${prod.category}</div>
          </div>
        </div>
      `).join('');

      dropdown.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.background = 'rgba(255,255,255,0.06)');
        item.addEventListener('mouseleave', () => item.style.background = 'transparent');
        item.addEventListener('click', () => {
          openQuickViewModal(item.dataset.id);
          dropdown.classList.remove('active');
        });
      });
      dropdown.classList.add('active');
    } else {
      dropdown.innerHTML = `<div style="padding: 12px; color: var(--text-secondary); font-size: 0.85rem; text-align: center;">No matches found for "${q}"</div>`;
      dropdown.classList.add('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

// 8. Modals, Drawers, Forms
function setupDrawersAndModals() {
  // Wishlist Drawer Trigger
  document.getElementById('btnWishlistDrawer')?.addEventListener('click', () => {
    openWishlistDrawer();
  });
  document.getElementById('btnCloseWishlist')?.addEventListener('click', () => {
    document.getElementById('wishlistDrawer')?.classList.remove('active');
  });

  // Cart Drawer Trigger
  document.getElementById('btnCartDrawer')?.addEventListener('click', () => {
    openCartDrawer();
  });
  document.getElementById('btnCloseCart')?.addEventListener('click', () => {
    document.getElementById('cartDrawer')?.classList.remove('active');
  });

  // Consultation Modal Triggers
  document.querySelectorAll('.js-open-consultation').forEach(btn => {
    btn.addEventListener('click', () => {
      openConsultationModal();
    });
  });
  document.getElementById('btnCloseConsultation')?.addEventListener('click', () => {
    document.getElementById('consultationModal')?.classList.remove('active');
  });

  // Consultation Form Submit
  const consultForm = document.getElementById('consultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(consultForm);
      const name = formData.get('customerName');
      const phone = formData.get('phone');
      const roomType = formData.get('roomType');
      const notes = formData.get('notes');

      addInquiry({
        customerName: name,
        phone: phone,
        roomType: roomType,
        interest: 'General Consultation',
        preferredDate: formData.get('preferredDate') || 'This week',
        notes: notes
      });

      document.getElementById('consultationModal')?.classList.remove('active');
      consultForm.reset();
      showToast(`Thank you ${name}! Our lighting expert will call you shortly.`);

      // Optional direct WhatsApp handover
      const waChoice = confirm('Would you also like to open WhatsApp to connect directly with JK Lights Gandhinagar showroom?');
      if (waChoice) {
        window.open(getWhatsAppConsultationUrl(), '_blank');
      }
    });
  }

  // Get a Quote Modal
  document.getElementById('btnGetQuoteNav')?.addEventListener('click', () => {
    openConsultationModal('Custom Lighting Quote');
  });

  // Quick View Close
  document.getElementById('btnCloseQuickView')?.addEventListener('click', () => {
    document.getElementById('quickViewModal')?.classList.remove('active');
  });
}

// 9. Quick View Modal
function openQuickViewModal(productId) {
  const prod = getProductById(productId);
  if (!prod) return;

  const modal = document.getElementById('quickViewModal');
  const container = document.getElementById('quickViewContent');
  if (!modal || !container) return;

  const waUrl = getWhatsAppProductUrl(prod);

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
      <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-medium); height: 320px; background: #000;">
        <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div>
        <span style="color: var(--gold-400); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">${prod.category}</span>
        <h2 style="font-family: var(--font-serif); color: #fff; font-size: 1.6rem; margin: 4px 0 12px;">${prod.name}</h2>
        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
          <span style="font-size: 1.6rem; font-weight: 800; color: #fff;">₹ ${prod.price.toLocaleString('en-IN')}</span>
          ${prod.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted);">₹ ${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          ${prod.discount ? `<span style="color: #10b981; font-weight: 700;">${prod.discount}</span>` : ''}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px;">${prod.description}</p>
        
        <div style="background: rgba(255,255,255,0.04); border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 0.82rem; color: var(--text-secondary);">
          <div style="font-weight: 600; color: #fff; margin-bottom: 6px;">Technical Specifications:</div>
          ${Object.entries(prod.specs || {}).map(([k, v]) => `<div>• <strong style="text-transform: capitalize;">${k}:</strong> ${v}</div>`).join('')}
        </div>

        <div style="display: flex; gap: 12px;">
          <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
            <i class="fa-brands fa-whatsapp"></i> Buy on WhatsApp
          </a>
          <button class="btn btn-gold js-modal-add-cart" data-id="${prod.id}">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('.js-modal-add-cart')?.addEventListener('click', () => {
    addToCart(prod.id, 1);
    updateBadges();
    showToast('Added to Selection Cart 🛒');
    modal.classList.remove('active');
    openCartDrawer();
  });

  modal.classList.add('active');
}

function openConsultationModal(title = 'Book a Free Consultation') {
  const modal = document.getElementById('consultationModal');
  const titleEl = document.getElementById('consultationModalTitle');
  if (titleEl) titleEl.textContent = title;
  if (modal) modal.classList.add('active');
}

// 10. Drawers: Wishlist & Cart
function openWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const listEl = document.getElementById('wishlistItemsContainer');
  if (!drawer || !listEl) return;

  const wishlistIds = getWishlist();
  const products = getProducts().filter(p => wishlistIds.includes(p.id));

  if (products.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-secondary);">
        <i class="fa-regular fa-heart" style="font-size: 2.5rem; color: var(--gold-400); margin-bottom: 12px;"></i>
        <p>Your wishlist is empty</p>
        <span style="font-size: 0.8rem;">Tap the heart icon on any fixture to save it!</span>
      </div>
    `;
  } else {
    listEl.innerHTML = products.map(prod => `
      <div style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; border: 1px solid var(--border-light);">
        <img src="${prod.image}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px;" />
        <div style="flex: 1;">
          <h4 style="color: #fff; font-size: 0.88rem; margin-bottom: 4px;">${prod.name}</h4>
          <span style="color: var(--gold-400); font-size: 0.85rem; font-weight: 700;">₹ ${prod.price.toLocaleString('en-IN')}</span>
        </div>
        <button class="btn btn-whatsapp btn-sm js-wa-click" onclick="window.open('${getWhatsAppProductUrl(prod)}', '_blank')">
          <i class="fa-brands fa-whatsapp"></i>
        </button>
        <button class="action-icon-btn danger js-remove-wishlist" data-id="${prod.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join('');

    listEl.querySelectorAll('.js-remove-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleWishlist(btn.dataset.id);
        openWishlistDrawer();
        renderProducts();
        updateBadges();
      });
    });
  }

  drawer.classList.add('active');
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const itemsContainer = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalText');
  const waCheckoutBtn = document.getElementById('btnWhatsAppCheckout');
  if (!drawer || !itemsContainer) return;

  const cart = getCart();
  const allProducts = getProducts();

  let subtotal = 0;
  const cartItems = cart.map(item => {
    const product = allProducts.find(p => p.id === item.productId);
    if (!product) return null;
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    return { ...product, quantity: item.quantity, itemTotal };
  }).filter(Boolean);

  if (subtotalEl) subtotalEl.textContent = `₹ ${subtotal.toLocaleString('en-IN')}`;

  if (cartItems.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-secondary);">
        <i class="fa-solid fa-cart-shopping" style="font-size: 2.5rem; color: var(--gold-400); margin-bottom: 12px;"></i>
        <p>Your lighting cart is empty</p>
      </div>
    `;
    if (waCheckoutBtn) waCheckoutBtn.style.display = 'none';
  } else {
    if (waCheckoutBtn) waCheckoutBtn.style.display = 'flex';

    itemsContainer.innerHTML = cartItems.map(item => `
      <div style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
        <img src="${item.image}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px;" />
        <div style="flex: 1;">
          <h4 style="color: #fff; font-size: 0.88rem; margin-bottom: 4px;">${item.name}</h4>
          <span style="color: var(--gold-400); font-weight: 700; font-size: 0.85rem;">₹ ${item.price.toLocaleString('en-IN')}</span>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button class="action-icon-btn js-cart-minus" data-id="${item.id}">-</button>
            <span style="font-weight: 700; font-size: 0.85rem;">${item.quantity}</span>
            <button class="action-icon-btn js-cart-plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="action-icon-btn danger js-cart-remove" data-id="${item.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join('');

    itemsContainer.querySelectorAll('.js-cart-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQty(btn.dataset.id, -1);
        openCartDrawer();
        updateBadges();
      });
    });

    itemsContainer.querySelectorAll('.js-cart-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQty(btn.dataset.id, 1);
        openCartDrawer();
        updateBadges();
      });
    });

    itemsContainer.querySelectorAll('.js-cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
        openCartDrawer();
        updateBadges();
      });
    });

    // WhatsApp Checkout Button URL
    if (waCheckoutBtn) {
      const store = getStoreInfo();
      const itemsList = cartItems.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.itemTotal.toLocaleString('en-IN')}`).join('\n');
      const orderMessage = `Hello JK Lights Gandhinagar! 👋\nI would like to place an inquiry/order for my cart selection:\n\n${itemsList}\n\n*Estimated Total: ₹${subtotal.toLocaleString('en-IN')}*\nPlease confirm stock availability at Kudasan showroom.`;
      
      waCheckoutBtn.onclick = () => {
        recordStat('whatsappClicks');
        window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(orderMessage)}`, '_blank');
      };
    }
  }

  drawer.classList.add('active');
}

// 11. Floating Chat & Toast
function setupFloatingChat() {
  const trigger = document.getElementById('floatingWhatsAppTrigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      recordStat('whatsappClicks');
    });
  }
}

function updateBadges() {
  const wishlist = getWishlist();
  const cart = getCart();

  const wishBadge = document.getElementById('wishlistCountBadge');
  if (wishBadge) wishBadge.textContent = wishlist.length;

  const cartBadge = document.getElementById('cartCountBadge');
  if (cartBadge) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = totalQty;
  }
}

function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-sparkles" style="color: var(--gold-400);"></i> <span>${message}</span>`;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

// 6. Render Blogs & Design Insights
let activeBlogFilterMain = 'all';

function renderBlogs() {
  let blogs = getBlogs();
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  if (activeBlogFilterMain !== 'all') {
    blogs = blogs.filter(b => (b.category || '').toLowerCase() === activeBlogFilterMain.toLowerCase());
  }

  if (blogs.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-secondary); background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-light);">
        <i class="fa-solid fa-newspaper" style="font-size: 2rem; color: var(--gold-400); margin-bottom: 12px; display: block;"></i>
        No articles found in this category. Check back soon for new guides!
      </div>
    `;
    return;
  }

  grid.innerHTML = blogs.map(blog => `
    <article class="blog-card" data-id="${blog.id}">
      <div class="blog-media">
        <img src="${blog.image || 'assets/products/chandelier-imperial-crown.jpg'}" alt="${blog.title}" class="blog-img" loading="lazy" onerror="this.src='assets/products/chandelier-imperial-crown.jpg'" />
        <span class="blog-category-tag">${blog.category || 'Design Guide'}</span>
        ${blog.featured ? `<span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.85); color: #10b981; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.4);"><i class="fa-solid fa-star"></i> Featured</span>` : ''}
      </div>
      <div class="blog-content">
        <div class="blog-meta">
          <span><i class="fa-regular fa-calendar"></i> ${blog.date || 'Sep 2026'}</span>
          <span><i class="fa-regular fa-clock"></i> ${blog.readTime || '4 min read'}</span>
        </div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-summary">${blog.summary || ''}</p>
        <button class="blog-read-btn js-read-blog" data-id="${blog.id}">
          Read Guide <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.js-read-blog').forEach(btn => {
    btn.addEventListener('click', () => {
      openBlogModal(btn.dataset.id);
    });
  });

  document.querySelectorAll('#blogCategoryTabs [data-blog-cat]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#blogCategoryTabs [data-blog-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBlogFilterMain = btn.dataset.blogCat;
      renderBlogs();
    };
  });
}

function openBlogModal(blogId) {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === blogId);
  if (!blog) return;

  const modal = document.getElementById('blogModal');
  const container = document.getElementById('blogModalContent');
  if (!modal || !container) return;

  const rawContent = blog.content || blog.summary || '';
  const paragraphs = rawContent.split('\n').filter(p => p.trim()).map(p => `<p style="margin-bottom: 14px; line-height: 1.75;">${p.trim()}</p>`).join('');
  const whatsappMessage = encodeURIComponent(`Hello JK Lights Gandhinagar! 👋\nI just read your design guide:\n"${blog.title}"\n\nI would like to discuss lighting recommendations for my residence.`);

  container.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="blog-category-tag" style="position: static; display: inline-block; margin-bottom: 12px;">${blog.category || 'Design Guide'}</span>
      <h2 style="font-family: var(--font-serif); color: #fff; font-size: 1.85rem; line-height: 1.25; margin-bottom: 12px;">${blog.title}</h2>
      <div style="display: flex; gap: 16px; color: var(--gold-400); font-size: 0.85rem; flex-wrap: wrap;">
        <span><i class="fa-solid fa-user-pen"></i> ${blog.author || 'JK Lights Architectural Studio'}</span>
        <span><i class="fa-regular fa-calendar"></i> ${blog.date || 'Sep 2026'}</span>
        <span><i class="fa-regular fa-clock"></i> ${blog.readTime || '4 min read'}</span>
        ${blog.featured ? `<span style="color: #10b981;"><i class="fa-solid fa-star"></i> Featured Guide</span>` : ''}
      </div>
    </div>
    <div style="border-radius: 12px; overflow: hidden; height: 280px; margin-bottom: 24px; border: 1px solid var(--border-light);">
      <img src="${blog.image || 'assets/products/chandelier-imperial-crown.jpg'}" alt="${blog.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/products/chandelier-imperial-crown.jpg'" />
    </div>
    <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75; margin-bottom: 24px;">
      ${paragraphs}
      ${blog.proTip ? `
        <div style="background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); padding: 14px 18px; border-radius: 0 8px 8px 0; color: #fff; margin-top: 20px;">
          <strong style="color: var(--gold-300);"><i class="fa-solid fa-lightbulb"></i> Pro Tip from JK Lights Experts:</strong> ${blog.proTip}
        </div>
      ` : ''}
    </div>
    <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: 18px;">
      <a href="https://wa.me/919898091234?text=${whatsappMessage}" target="_blank" class="btn btn-whatsapp btn-sm">
        <i class="fa-brands fa-whatsapp"></i> Chat About This Guide
      </a>
      <button class="btn btn-gold btn-sm js-open-consultation" onclick="document.getElementById('blogModal').classList.remove('active');">
        <i class="fa-regular fa-calendar-check"></i> Book Consultation
      </button>
      <button class="btn btn-glass btn-sm" onclick="document.getElementById('blogModal').classList.remove('active');">
        Close
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.getElementById('btnCloseBlogModal')?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// 7. Render Interactive FAQ Accordion
function renderFaqs() {
  const faqs = getFaqs();
  const container = document.getElementById('faqAccordion');
  if (!container) return;

  container.innerHTML = faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question-btn" aria-expanded="${idx === 0}">
        <span class="faq-q-text">${faq.question}</span>
        <span class="faq-icon"><i class="fa-solid fa-${idx === 0 ? 'minus' : 'plus'}"></i></span>
      </button>
      <div class="faq-answer-pane" style="${idx === 0 ? 'max-height: 300px; padding: 0 24px 20px;' : 'max-height: 0; padding: 0 24px;'}">
        <p class="faq-a-text">${faq.answer}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      container.querySelectorAll('.faq-item').forEach(it => {
        it.classList.remove('active');
        it.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
        const pane = it.querySelector('.faq-answer-pane');
        if (pane) {
          pane.style.maxHeight = '0';
          pane.style.padding = '0 24px';
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        btn.querySelector('.faq-icon i').className = 'fa-solid fa-minus';
        const pane = item.querySelector('.faq-answer-pane');
        if (pane) {
          pane.style.maxHeight = '300px';
          pane.style.padding = '0 24px 20px';
        }
      }
    });
  });
}

// Full Visualizer Modal
function openVisualizerModal() {
  const modal = document.getElementById('visualizerModal');
  if (modal) modal.classList.add('active');
  document.getElementById('btnCloseVisualizerModal')?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}
