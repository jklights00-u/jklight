// JK Lights Unified LocalStorage State Management
import {
  DEFAULT_STORE_INFO,
  DEFAULT_CATEGORIES,
  DEFAULT_ROOMS,
  DEFAULT_PRODUCTS,
  DEFAULT_INQUIRIES,
  DEFAULT_SLIDERS,
  DEFAULT_BLOGS,
  DEFAULT_FAQS
} from './data.js';

const STORAGE_KEYS = {
  STORE_INFO: 'jk_lights_store_info',
  PRODUCTS: 'jk_lights_products',
  CATEGORIES: 'jk_lights_categories',
  ROOMS: 'jk_lights_rooms',
  INQUIRIES: 'jk_lights_inquiries',
  SLIDERS: 'jk_lights_sliders',
  BLOGS: 'jk_lights_blogs',
  FAQS: 'jk_lights_faqs',
  CART: 'jk_lights_cart',
  WISHLIST: 'jk_lights_wishlist',
  STATS: 'jk_lights_stats'
};

const STORE_VERSION = 'jk_lights_v2_categorized';

export function initStore() {
  try {
    const currentVer = localStorage.getItem('jk_lights_store_version');
    if (currentVer !== STORE_VERSION) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(DEFAULT_SLIDERS));
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
      localStorage.setItem('jk_lights_store_version', STORE_VERSION);
    } else {
      const existingProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!existingProducts || JSON.parse(existingProducts).length < DEFAULT_PRODUCTS.length) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      }
      const existingCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!existingCategories || JSON.parse(existingCategories).length < DEFAULT_CATEGORIES.length) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      }
    }
  } catch(e) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    localStorage.setItem('jk_lights_store_version', STORE_VERSION);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STORE_INFO)) {
    localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(DEFAULT_STORE_INFO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ROOMS)) {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SLIDERS)) {
    localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(DEFAULT_SLIDERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(DEFAULT_FAQS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify({
      whatsappClicks: 142,
      roomPreviews: 87,
      consultationsBooked: 24,
      viewsToday: 320
    }));
  }
}

function notifyUpdate(key, data) {
  window.dispatchEvent(new CustomEvent('jk_store_updated', { detail: { key, data } }));
}

// Store Info API
export function getStoreInfo() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STORE_INFO)) || DEFAULT_STORE_INFO;
}

export function updateStoreInfo(newInfo) {
  const current = getStoreInfo();
  const updated = { ...current, ...newInfo };
  localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.STORE_INFO, updated);
  return updated;
}

// Products API
export function getProducts() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function saveProduct(product) {
  const products = getProducts();
  let updated;
  if (product.id) {
    // Update existing
    updated = products.map(p => p.id === product.id ? { ...p, ...product } : p);
  } else {
    // New product
    const newProduct = {
      ...product,
      id: 'prod-' + Date.now(),
      rating: product.rating || 5.0,
      reviewsCount: product.reviewsCount || 1,
      featured: product.featured || false,
      trending: product.trending || false,
      inStock: product.inStock !== false
    };
    updated = [newProduct, ...products];
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.PRODUCTS, updated);
  return updated;
}

export function deleteProduct(id) {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.PRODUCTS, updated);
  return updated;
}

// Categories & Rooms API
export function getCategories() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || DEFAULT_CATEGORIES;
}

export function saveCategory(catData) {
  const categories = getCategories();
  const cleanId = (catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).toLowerCase();
  let updated;
  if (categories.some(c => c.id === cleanId)) {
    updated = categories.map(c => c.id === cleanId ? { ...c, ...catData, id: cleanId } : c);
  } else {
    const newCat = {
      id: cleanId,
      name: catData.name,
      icon: catData.icon || 'assets/products/chandelier-imperial-crown.jpg',
      count: '0 Models',
      desc: catData.desc || `${catData.name} luxury lighting collection for architectural spaces.`
    };
    updated = [...categories, newCat];
  }
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.CATEGORIES, updated);
  return updated;
}

export function deleteCategory(id) {
  if (id === 'all') return getCategories();
  const categories = getCategories();
  const updated = categories.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.CATEGORIES, updated);
  return updated;
}

export function getRooms() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ROOMS)) || DEFAULT_ROOMS;
}

// Inquiries & Leads API
export function getInquiries() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || [];
}

export function addInquiry(inquiryData) {
  const inquiries = getInquiries();
  const newInq = {
    ...inquiryData,
    id: 'inq-' + Date.now(),
    status: 'New',
    dateSubmitted: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
  };
  const updated = [newInq, ...inquiries];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  
  // Update stats
  recordStat('consultationsBooked');
  notifyUpdate(STORAGE_KEYS.INQUIRIES, updated);
  return newInq;
}

export function updateInquiryStatus(id, newStatus) {
  const inquiries = getInquiries();
  const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.INQUIRIES, updated);
  return updated;
}

export function deleteInquiry(id) {
  const inquiries = getInquiries();
  const updated = inquiries.filter(inq => inq.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.INQUIRIES, updated);
  return updated;
}

// Sliders API
export function getSliders(onlyActive = false) {
  initStore();
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLIDERS)) || DEFAULT_SLIDERS;
  const sorted = [...raw].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  if (onlyActive) {
    return sorted.filter(s => s.active !== false);
  }
  return sorted;
}

export function getSliderById(id) {
  const sliders = getSliders();
  return sliders.find(s => s.id === id);
}

export function saveSlider(sliderData) {
  const sliders = getSliders();
  let updated;
  if (sliderData.id) {
    updated = sliders.map(s => s.id === sliderData.id ? { ...s, ...sliderData } : s);
  } else {
    const newSlide = {
      ...sliderData,
      id: 'slide-' + Date.now(),
      order: Number(sliderData.order) || (sliders.length + 1),
      active: sliderData.active !== false
    };
    updated = [...sliders, newSlide];
  }
  localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.SLIDERS, updated);
  return updated;
}

export function deleteSlider(id) {
  const sliders = getSliders();
  const updated = sliders.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.SLIDERS, updated);
  return updated;
}

export function toggleSliderActive(id) {
  const sliders = getSliders();
  const updated = sliders.map(s => s.id === id ? { ...s, active: !s.active } : s);
  localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.SLIDERS, updated);
  return updated;
}

// Blogs API
export function getBlogs() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS)) || DEFAULT_BLOGS;
}

export function getBlogById(id) {
  const blogs = getBlogs();
  return blogs.find(b => b.id === id);
}

export function saveBlog(blogData) {
  const blogs = getBlogs();
  let updated;
  if (blogData.id) {
    updated = blogs.map(b => b.id === blogData.id ? { ...b, ...blogData } : b);
  } else {
    const newBlog = {
      ...blogData,
      id: 'blog-' + Date.now(),
      date: blogData.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: blogData.readTime || '4 min read',
      author: blogData.author || 'JK Lights Architectural Studio',
      image: blogData.image || 'assets/products/chandelier-imperial-crown.jpg',
      featured: blogData.featured || false
    };
    updated = [newBlog, ...blogs];
  }
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.BLOGS, updated);
  return updated;
}

export function deleteBlog(id) {
  const blogs = getBlogs();
  const updated = blogs.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.BLOGS, updated);
  return updated;
}

// FAQs API
export function getFaqs() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAQS)) || DEFAULT_FAQS;
}

// Wishlist API
export function getWishlist() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
}

export function toggleWishlist(productId) {
  const wishlist = getWishlist();
  let updated;
  if (wishlist.includes(productId)) {
    updated = wishlist.filter(id => id !== productId);
  } else {
    updated = [...wishlist, productId];
  }
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.WISHLIST, updated);
  return updated;
}

// Cart API
export function getCart() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
}

export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.productId === productId);
  let updated;
  if (existing) {
    updated = cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
  } else {
    updated = [...cart, { productId, quantity }];
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.CART, updated);
  return updated;
}

export function updateCartQty(productId, delta) {
  const cart = getCart();
  const updated = cart.map(item => {
    if (item.productId === productId) {
      const newQty = item.quantity + delta;
      return newQty > 0 ? { ...item, quantity: newQty } : null;
    }
    return item;
  }).filter(Boolean);
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.CART, updated);
  return updated;
}

export function removeFromCart(productId) {
  const cart = getCart();
  const updated = cart.filter(item => item.productId !== productId);
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
  notifyUpdate(STORAGE_KEYS.CART, updated);
  return updated;
}

// Stats & Analytics API
export function getStats() {
  initStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS)) || {
    whatsappClicks: 0,
    roomPreviews: 0,
    consultationsBooked: 0,
    viewsToday: 0
  };
}

export function recordStat(metric) {
  const stats = getStats();
  if (stats[metric] !== undefined) {
    stats[metric]++;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    notifyUpdate(STORAGE_KEYS.STATS, stats);
  }
}

// WhatsApp Link Generator with Pre-filled Message
export function getWhatsAppProductUrl(product) {
  const store = getStoreInfo();
  const message = `Hello JK Lights Gandhinagar! 👋\nI am interested in:\n• Product: ${product.name}\n• Price: ₹${product.price.toLocaleString('en-IN')}\n• Code: ${product.id}\n\nPlease share showroom availability, live photos, and discount details!`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppConsultationUrl() {
  const store = getStoreInfo();
  const message = `Hello JK Lights Gandhinagar! 👋\nI would like to book a Free Lighting Consultation for my space. Please connect with an expert designer.`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Full Factory Reset
export function resetToDefaults() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(DEFAULT_STORE_INFO));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
  localStorage.setItem(STORAGE_KEYS.SLIDERS, JSON.stringify(DEFAULT_SLIDERS));
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
  localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(DEFAULT_FAQS));
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
  notifyUpdate('ALL', null);
}
