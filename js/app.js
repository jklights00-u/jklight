/**
 * JK Lights - Unified Standalone Storefront Controller
 * Compatible with both file:// protocol and web servers (Vite/Node/LiveServer)
 */
(function () {
  'use strict';

  // --- 1. DEFAULT SEED DATA ---
  const DEFAULT_STORE_INFO = {
    name: "JK Lights",
    tagline: "Experience The Symphony of Luxury Illumination",
    city: "Gandhinagar, Gujarat",
    address: "2nd Floor, VTC Complex (Vrundavan Trade Center), Above Kabir World, Reliance Cross Road, Kudasan, Gandhinagar - 382421",
    landmark: "Above Kabir World, Opp. Kanam Farm",
    phone: "+91 84605 76753",
    whatsapp: "918460576753",
    email: "contact@jklights.com",
    instagram: "https://www.instagram.com/jk_lights_gandhinagar?igsh=MXd1NG5zazA0bXY0Yw==",
    facebook: "https://www.facebook.com/jk_lights_gandhinagar",
    timingsWeekdays: "Mon - Sat: 10:00 AM - 9:30 PM",
    timingsSunday: "Sunday: 11:00 AM - 8:00 PM",
    gmapsQuery: "https://maps.google.com/?q=J+K+Lights+Gandhinagar+Kudasan",
    gmbSearchUrl: "https://www.google.com/search?q=J+K+Lights+Gandhinagar",
    showroomImage: "assets/showroom.jpg",
    announcementText: "🚚 Free Site Consultation in Gandhinagar & Ahmedabad | 🛠️ Professional Installation | 🛡️ 1 Year Warranty | 🏬 Visit Our Kudasan Showroom"
  };

  const DEFAULT_SLIDERS = [
    {
      id: "slide-1",
      title: "Grand Festive & Inaugural Offer",
      highlightText: "Upto 35% OFF",
      subtitle: "Experience luxury crystal chandeliers, designer pendants, and smart lighting with exclusive showroom discounts.",
      badge: "Special Showroom Offer 🔥",
      image: "assets/hero.jpg",
      btnText: "Claim Offer & Shop Now",
      btnLink: "#productsSection",
      secondaryBtnText: "Book Consultation",
      secondaryBtnLink: "modal:consultation",
      order: 1,
      active: true
    },
    {
      id: "slide-2",
      title: "Architectural Designer Wall Lights",
      highlightText: "Dual Beam & Warm Ambience",
      subtitle: "Transform plain walls into sculptural statements with modern waterproof sconces and warm amber cones.",
      badge: "Wall Light Collection ✨",
      image: "assets/products/wall.jpg",
      btnText: "Explore Wall Lights",
      btnLink: "#productsSection",
      secondaryBtnText: "See In Room",
      secondaryBtnLink: "modal:visualizer",
      order: 2,
      active: true
    },
    {
      id: "slide-3",
      title: "Royal K9 Faceted Crystal Chandeliers",
      highlightText: "Timeless Grandeur",
      subtitle: "Breathtaking double-height chandeliers handcrafted for high-ceiling living rooms, bungalows, and duplexes.",
      badge: "Showroom Bestseller 💎",
      image: "assets/products/chandelier.jpg",
      btnText: "View Grand Chandeliers",
      btnLink: "#productsSection",
      secondaryBtnText: "WhatsApp Inquiry",
      secondaryBtnLink: "https://wa.me/918460576753?text=Hello%20JK%20Lights!%20I%20am%20interested%20in%20the%20Royal%20Crystal%20Chandelier.",
      order: 3,
      active: true
    },
    {
      id: "slide-4",
      title: "Modern Pendants & Architectural Tracks",
      highlightText: "Contemporary Living",
      subtitle: "Sleek dining pendants, anti-glare magnetic tracks, and 3-color tunable ceiling lights engineered for elegance.",
      badge: "Trending 2026 🌟",
      image: "assets/products/pendant.jpg",
      btnText: "Discover Pendants",
      btnLink: "#productsSection",
      secondaryBtnText: "Visit Showroom",
      secondaryBtnLink: "#showroomSection",
      order: 4,
      active: true
    }
  ];

  const DEFAULT_CATEGORIES = [
    { id: "all", name: "All Products", icon: "assets/products/chandelier-imperial-crown.jpg", count: "70+ Models", desc: "Complete luxury lighting collection crafted for bungalows, villas & duplexes." },
    { id: "chandeliers", name: "Grand Chandeliers", icon: "assets/products/chandelier-imperial-crown.jpg", count: "16 Models", desc: "Faceted K9 crystal, imperial crowns, ring halos & amber fluted glass clusters." },
    { id: "double-height", name: "Double Height Chandeliers", icon: "assets/products/double-height-spiral.jpg", count: "11 Models", desc: "3m to 6.85m vertical cascading spirals & raindrop helixes for stairwells & duplexes." },
    { id: "wall", name: "Designer Wall Lights", icon: "assets/products/wall-marble.jpg", count: "14 Models", desc: "Dual-beam architectural up-down sconces, Spanish marble discs & crystal leaf brackets." },
    { id: "pendant", name: "Hanging Pendants", icon: "assets/products/pendant-dining-bar.jpg", count: "5 Models", desc: "Linear dining clusters, fluted cognac drops, faceted crystal cylinders & Scandinavian domes." },
    { id: "table-floor", name: "Table & Floor Lamps", icon: "assets/products/lamp-arched-marble.jpg", count: "11 Models", desc: "Sculptural arched marble floor lamps, amber discs, natural travertine & classic banker lamps." },
    { id: "ceiling", name: "Ceiling Lights", icon: "assets/products/ceiling-triple-ring.jpg", count: "5 Models", desc: "Concentric triple rings, ultra-slim 3-CCT panels & floral crystal flush ceiling fixtures." },
    { id: "track", name: "48V Magnetic Tracks", icon: "assets/products/track-system.jpg", count: "6 Modules", desc: "Low-voltage architectural recessed rails, darklight grilles, rotatable spots & in-track modules." },
    { id: "outdoor", name: "Outdoor & Landscape", icon: "assets/products/outdoor-bollard.jpg", count: "5 Fixtures", desc: "IP65 pathway bollards, IP67 garden spike uplights, facade beams & solar security sconces." },
    { id: "smart", name: "Smart Tunable Lights", icon: "assets/products/smart-halo.jpg", count: "2 Devices", desc: "WiFi & Bluetooth ambient rings, rotary dimmers & 16M color scene controllers." }
  ];

  const DEFAULT_ROOMS = [
    { id: "living", name: "Living Room & Duplex", image: "assets/rooms/living.jpg", desc: "Opulent Chandeliers & Ambient Halos" },
    { id: "bedroom", name: "Master Bedroom", image: "assets/rooms/bedroom.jpg", desc: "Warm Cove Sconces & Bedside Drops" },
    { id: "dining", name: "Dining & Bar", image: "assets/rooms/dining.jpg", desc: "Stunning Linear & Cluster Pendants" },
    { id: "kitchen", name: "Kitchen Island", image: "assets/rooms/dining.jpg", desc: "Task Under-Cabinet & Island Pendants" },
    { id: "office", name: "Office & Study", image: "assets/rooms/living.jpg", desc: "Anti-Glare Magnetic Architectural Tracks" },
    { id: "outdoor", name: "Outdoor & Facade", image: "assets/products/outdoor-bollard.jpg", desc: "Waterproof Bollards & Facade Beams" }
  ];

  const DEFAULT_PRODUCTS = [
    // --- 1. GRAND CHANDELIERS ---
    {
      id: "prod-SS7640",
      name: "SS7640 Nordic Golden Ring Halo Chandelier",
      category: "chandeliers",
      room: "living",
      price: 6999,
      originalPrice: 9470,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 42,
      image: "assets/products/chandelier-halo.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Showroom Star",
      description: "Triple-tier concentric glowing halos in satin French Gold. Features multi-angle suspension wires for customized angle layouts and remote 3-color tunable brightness.",
      specs: { modelCode: "SS7640", material: "Aviation Aluminum & Silica Optical Rings", dimensions: "D800 + D600 + D400mm Triple Tier", wattageCct: "108W 3-CCT Smart Tunable LED", finish: "French Satin Gold", voltage: "220-240V 50Hz" }
    },
    {
      id: "prod-TN9542",
      name: "TN9542 Artisan Frosted Acrylic Halo Chandelier",
      category: "chandeliers",
      room: "dining",
      price: 6499,
      originalPrice: 8640,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 28,
      image: "assets/products/chandelier-halo.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Modernist",
      description: "Sleek circular acrylic floating halo chandelier delivering a soft, non-glare diffused downlight perfect over 6-seater dining setups.",
      specs: { modelCode: "TN9542/480MM", material: "Die-cast Aluminum & Frosted PMMA Diffuser", dimensions: "Diameter 480mm, Drop 1200mm", wattageCct: "48W Warm White 3000K", finish: "Rose Gold & Textured Black", voltage: "220V AC" }
    },
    {
      id: "prod-TN5138",
      name: "TN5138 Geometric Nesting Ring Chandelier",
      category: "chandeliers",
      room: "living",
      price: 8990,
      originalPrice: 12480,
      discount: "28% OFF",
      rating: 4.9,
      reviewsCount: 34,
      image: "assets/products/chandelier-halo.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Architect's Pick",
      description: "Interlocking architectural glowing hoops creating an avant-garde artistic silhouette with uniform 360-degree ambient lighting.",
      specs: { modelCode: "TN5138/610MM", material: "Brushed Aluminum & Silica Diffuser", dimensions: "Diameter 610mm x Height 1500mm", wattageCct: "72W High Lumen LED (3000K/4000K/6000K)", finish: "Champagne Gold", voltage: "220-240V" }
    },
    {
      id: "prod-MT2176-L4",
      name: "MT2176-L4 Linear Minimalist Dining Island Chandelier",
      category: "chandeliers",
      room: "dining",
      price: 6490,
      originalPrice: 8820,
      discount: "26% OFF",
      rating: 4.8,
      reviewsCount: 22,
      image: "assets/products/pendant-dining-bar.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Island Bestseller",
      description: "Streamlined horizontal linear bar featuring 4 downward focused anti-glare cones engineered specifically for modern kitchen islands and dining tables.",
      specs: { modelCode: "MT2176-L4", material: "Extruded Aluminum & Spun Brass Accents", dimensions: "L1200 x W200 x H1500mm Adjustable", wattageCct: "4-Head Integrated COB 48W", finish: "Matte Black & Antique Brass", voltage: "220V" }
    },
    {
      id: "prod-MT21787-12",
      name: "MT21787-12 Contemporary 12-Light Sputnik Chandelier",
      category: "chandeliers",
      room: "living",
      price: 11990,
      originalPrice: 16090,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 39,
      image: "assets/products/chandelier.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Mid-Century Modern",
      description: "Mid-century 12-arm radial starburst fixture bringing dynamic drama and expansive illumination to high-ceiling drawing rooms.",
      specs: { modelCode: "MT21787-12", material: "Forged Iron Arms & Brass Sockets", dimensions: "D850mm x H650mm + 500mm Rod", lampHolder: "12x G9 Bulbs (Compatible with Dimmable LED)", finish: "Brushed Brass & Deep Black", voltage: "220-240V" }
    },
    {
      id: "prod-KD8022",
      name: "KD8022 Tiered K9 Crystal Grand Chandelier",
      category: "chandeliers",
      room: "living",
      price: 9990,
      originalPrice: 13710,
      discount: "27% OFF",
      rating: 5.0,
      reviewsCount: 51,
      image: "assets/products/chandelier.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Luxury Crystal",
      description: "Cascading concentric tiers of precision cut K9 crystal prisms that refract light into vibrant rainbow glimmers across the room.",
      specs: { modelCode: "KD8022/600R", material: "Faceted K9 Optical Crystal & Polished Gold Frame", dimensions: "Diameter 600mm x Height 450mm", lampHolder: "9x E14 Lamp Holders", finish: "24K Gold PVD Mirror Finish", voltage: "220-240V" }
    },
    {
      id: "prod-KD2331",
      name: "KD2331 Square Waterfall Faceted Crystal Chandelier",
      category: "chandeliers",
      room: "living",
      price: 16990,
      originalPrice: 23840,
      discount: "29% OFF",
      rating: 4.9,
      reviewsCount: 33,
      image: "assets/products/chandelier.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Royal Palace",
      description: "Geometric square cascade composed of multi-angled crystal prisms designed for neoclassical drawing rooms and master suites.",
      specs: { modelCode: "KD2331/600S", material: "Precision Cut Triangular Crystal Bars & Brass", dimensions: "600 x 600mm Square x H400mm", lampHolder: "12x E14 LED Bulbs", finish: "High Gloss Gold", voltage: "220-240V" }
    },
    {
      id: "prod-KDA039",
      name: "KDA039 Rectangular Crystal Prism Dining Chandelier",
      category: "chandeliers",
      room: "dining",
      price: 14990,
      originalPrice: 20260,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 27,
      image: "assets/products/pendant-dining-bar.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Dining Showpiece",
      description: "Elongated luxury crystal prism bar designed to hang gracefully above 8 to 10-seater dining banquet tables.",
      specs: { modelCode: "KDA039/800S", material: "Fluted K9 Crystal & Heavy Gauge Brass", dimensions: "L800 x W350 x H350mm (Drop 1500mm)", lampHolder: "16x G9 LED Bulbs", finish: "Champagne Brass", voltage: "220-240V" }
    },
    {
      id: "prod-B1078",
      name: "Beluga B1078 Smoked Glass Sphere Cluster Chandelier",
      category: "chandeliers",
      room: "living",
      price: 11850,
      originalPrice: 15990,
      discount: "26% OFF",
      rating: 4.8,
      reviewsCount: 19,
      image: "assets/products/chandelier-smoked-sphere.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Beluga Exclusive",
      description: "Contemporary cluster of hand-blown smoked cognac glass orbs creating a mood-lit, ultra-luxurious evening atmosphere.",
      specs: { modelCode: "BELUGA-B1078", material: "Hand-Blown Smoked Glass & Titanium Frame", dimensions: "D750mm x H600mm", lampHolder: "8x E27 Filament Warm LED", finish: "Titanium Chrome & Smoked Cognac", voltage: "220-240V" }
    },
    {
      id: "prod-B8015",
      name: "Beluga B8015 Amber Fluted Glass Cluster Chandelier",
      category: "chandeliers",
      room: "dining",
      price: 11850,
      originalPrice: 15990,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 24,
      image: "assets/products/chandelier-amber-fluted.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Beluga Series",
      description: "Hand-pleated amber glass shades with brushed gold hardware, evoking European warmth and mid-century elegance.",
      specs: { modelCode: "BELUGA-B8015", material: "Fluted Amber Glass & Brushed Gold", dimensions: "D650mm x H550mm", lampHolder: "6x E27 Warm White LED", finish: "Brushed French Gold", voltage: "220-240V" }
    },
    {
      id: "prod-B6611",
      name: "Beluga B6611 Grand Imperial Crystal Crown Chandelier",
      category: "chandeliers",
      room: "living",
      price: 36990,
      originalPrice: 49910,
      discount: "26% OFF",
      rating: 5.0,
      reviewsCount: 44,
      image: "assets/products/chandelier-imperial-crown.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Royal Jewel",
      description: "Massive crown chandelier featuring hundreds of diamond-faceted crystal spears radiating royal opulence in grand living rooms.",
      specs: { modelCode: "BELUGA-B6611/196", material: "Diamond Cut K9 Crystal & Electroplated Gold", dimensions: "D900mm x H1200mm Drop", lampHolder: "18x E14 LED Bulbs", finish: "Imperial 24K Gold PVD", voltage: "220-240V" }
    },
    {
      id: "prod-ER25003",
      name: "ER25003 Elegance Ring Halo Crystal Chandelier",
      category: "chandeliers",
      room: "living",
      price: 24490,
      originalPrice: 32780,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 31,
      image: "assets/products/chandelier-halo.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Trending 2026",
      description: "Continuous circle of crystal baguettes internally illuminated by high CRI LEDs, offering seamless warm-to-cool tunable ambiance.",
      specs: { modelCode: "ER25003/800", material: "K9 Crystal Inlaid Ring & Satin Brass", dimensions: "Diameter 800mm, Cable 1500mm", wattageCct: "80W Tunable LED 3000K-6500K", finish: "Satin Brushed Gold", voltage: "220-240V" }
    },
    {
      id: "prod-ER8003",
      name: "ER8003 Spiral Drop Crystal Chandelier",
      category: "chandeliers",
      room: "living",
      price: 20990,
      originalPrice: 28160,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 29,
      image: "assets/products/chandelier.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Showroom Exclusive",
      description: "Dynamic swirling spiral formation of crystal drops providing shimmering multidirectional light distribution.",
      specs: { modelCode: "ER8003", material: "Cut Crystals & Polished Brass Chassis", dimensions: "D600mm x H850mm", lampHolder: "12x E14 LED Bulbs", finish: "Polished French Brass", voltage: "220-240V" }
    },
    {
      id: "prod-ER9232",
      name: "ER9232 Heritage Palace 24-Light Grand Chandelier",
      category: "chandeliers",
      room: "living",
      price: 37900,
      originalPrice: 50550,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 41,
      image: "assets/products/chandelier-imperial-crown.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Heritage Collection",
      description: "Traditional two-tier European palace candelabra silhouette adorned with crystal garlands and bobeches for palatial villas.",
      specs: { modelCode: "ER9232", material: "Solid Cast Brass & K9 Precision Prisms", dimensions: "D1000mm x H1300mm", lampHolder: "24x E14 Candle Bulbs", finish: "Royal Antique Gold", voltage: "220-240V" }
    },
    {
      id: "prod-ER9076",
      name: "ER9076 Grand Emperor Double Tier 48-Light Chandelier",
      category: "chandeliers",
      room: "living",
      price: 112000,
      originalPrice: 149000,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 15,
      image: "assets/products/chandelier-imperial-crown.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Masterpiece",
      description: "Monumental 48-light chandelier engineered for luxury bungalows, farmhouses, and banquet spaces demanding an unforgettable centerpiece.",
      specs: { modelCode: "ER9076", material: "Forged Brass Core & Bohemian Cut Crystal", dimensions: "D1400mm x H2200mm", lampHolder: "48x E14 Bulbs", finish: "Imperial 24K Gold", voltage: "220-240V" }
    },
    {
      id: "prod-KDF8100",
      name: "KDF8100 Prestige Art Deco Fluted Glass Rod Chandelier",
      category: "chandeliers",
      room: "living",
      price: 57500,
      originalPrice: 76790,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 23,
      image: "assets/products/chandelier-amber-fluted.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Art Deco",
      description: "Architectural Art Deco cylinder array made of individual textured glass tubes that glow with exquisite golden warmth.",
      specs: { modelCode: "KDF8100/600", material: "Handcrafted Borosilicate Fluted Tubes & Gold Brass", dimensions: "D600mm x H750mm", lampHolder: "14x G9 Bulbs", finish: "Champagne Polished Brass", voltage: "220-240V" }
    },

    // --- 2. DOUBLE HEIGHT STAIRWELL CHANDELIERS ---
    {
      id: "prod-MTD23775",
      name: "MTD23775-7D 388W Grand Duplex Spiral Chandelier",
      category: "double-height",
      room: "living",
      price: 33900,
      originalPrice: 44990,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 48,
      image: "assets/products/double-height-spiral.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "3.5m Staircase Drop",
      description: "Sculptural 7-ring spiral helix chandelier engineered specifically for double-height staircase voids and duplex foyers. Includes remote control.",
      specs: { modelCode: "MTD23775-7D", material: "Heavy Aluminum Canopy & Silica Light Rings", dimensions: "Diameter 800mm x Total Drop 3500mm (3.5m)", wattageCct: "388W High Lumen 3-CCT Integrated LED", finish: "Satin French Gold", voltage: "220-240V AC" }
    },
    {
      id: "prod-MT21704-7H",
      name: "MT21704-7H French Gold Cascading Raindrop Stairwell Chandelier",
      category: "double-height",
      room: "living",
      price: 13990,
      originalPrice: 18770,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 32,
      image: "assets/products/double-height.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "3.0m Duplex Drop",
      description: "Delicate cascading raindrop pendants creating a magical vertical light waterfall down high-ceiling stairwells.",
      specs: { modelCode: "MT21704-7H/FG", material: "Spun Brass Cones & Laser Crystal Pods", dimensions: "D600mm x H3000mm (3.0m Drop)", wattageCct: "200W Integrated LED (Warm White)", finish: "French Satin Gold", voltage: "220-240V" }
    },
    {
      id: "prod-MT21704-11C",
      name: "MT21704/11C Grand 11-Tier Duplex Staircase Chandelier",
      category: "double-height",
      room: "living",
      price: 32500,
      originalPrice: 42910,
      discount: "24% OFF",
      rating: 5.0,
      reviewsCount: 21,
      image: "assets/products/double-height-spiral.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "6.85m Mega Drop",
      description: "Massive 6.85-meter drop 11-tier staircase chandelier designed for triple-height atriums and palatial entrance halls.",
      specs: { modelCode: "MT21704/11C FG", material: "Reinforced Brass Chassis & Crystal Pendants", dimensions: "D800mm x Total Height 6850mm (6.85m Drop)", wattageCct: "438W High Power LED Array", finish: "French Gold", voltage: "220-240V" }
    },
    {
      id: "prod-T0159",
      name: "T0159/37B 37-Globe Stairwell Meteor Shower Chandelier",
      category: "double-height",
      room: "living",
      price: 46800,
      originalPrice: 62520,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 29,
      image: "assets/products/chandelier-smoked-sphere.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "5.0m Meteor Drop",
      description: "37 illuminated bubble glass globes suspended at staggered heights mimicking a cosmic meteor shower across duplex ceilings.",
      specs: { modelCode: "T0159/37B", material: "Hand-Blown Champagne Bubble Glass Orbs & Brass", dimensions: "Canopy D900mm x Height 5000mm (5m Drop)", lampHolder: "37x G4 LED Bulbs", finish: "Champagne Gold & Clear Bubble Glass", voltage: "220-240V" }
    },
    {
      id: "prod-B5127",
      name: "Beluga B5127/25 25-Pendant Double Height Spiral Chandelier",
      category: "double-height",
      room: "living",
      price: 29990,
      originalPrice: 40230,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 37,
      image: "assets/products/double-height-spiral.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "4.0m Spiral Drop",
      description: "Beluga collection 25-light spiral staircase cascade with faceted crystal pods casting brilliant starry reflections.",
      specs: { modelCode: "BELUGA-B5127/25 FG", material: "K9 Champagne Crystal Pods & Gold Base", dimensions: "D800mm x Height 4000mm (4m Drop)", lampHolder: "25x G9 LED Bulbs", finish: "French Gold & Champagne Crystal", voltage: "220-240V" }
    },
    {
      id: "prod-DT8989",
      name: "DT8989/18 Architectural Iron & Natural Marble Duplex Chandelier",
      category: "double-height",
      room: "living",
      price: 48200,
      originalPrice: 64380,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 18,
      image: "assets/products/wall-marble.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Natural Marble & Iron",
      description: "Unique fusion of raw Spanish natural marble discs and matte black architectural iron arms for luxury organic-modern homes.",
      specs: { modelCode: "DT8989/18", material: "Spanish Natural White Marble & Forged Black Iron", dimensions: "D850mm x Drop 4200mm (4.2m)", wattageCct: "18-Light Integrated Warm LED 216W", finish: "Matte Black & Natural Veined Marble", voltage: "220-240V" }
    },
    {
      id: "prod-DT8988",
      name: "DT8988 Prismatic 288W Stairwell Pendant Centerpiece",
      category: "double-height",
      room: "living",
      price: 48200,
      originalPrice: 64380,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 26,
      image: "assets/products/double-height.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "288W High Lumen",
      description: "High-output 288W luminous crystal-textured pillars descending in an organic spiral formation.",
      specs: { modelCode: "DT8988", material: "Extruded Prismatic Acrylic & Gold Alloy", dimensions: "D750mm x H3800mm (3.8m Drop)", wattageCct: "288W 3-CCT Smart LED", finish: "Matte Champagne Gold", voltage: "220-240V" }
    },
    {
      id: "prod-DT2132",
      name: "DT2132/18 18-Drop Crystal Cylinder Staircase Chandelier",
      category: "double-height",
      room: "living",
      price: 45500,
      originalPrice: 60740,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 25,
      image: "assets/products/double-height-spiral.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "3.6m Duplex Drop",
      description: "Heavy solid crystal fluted rods delivering crystal clarity and dramatic vertical illumination for staircases.",
      specs: { modelCode: "DT2132/18", material: "Solid Fluted Crystal Cylinders & Brushed Brass", dimensions: "D700mm x Drop 3600mm (3.6m)", lampHolder: "18x G9 LED", finish: "Brushed Brass", voltage: "220-240V" }
    },
    {
      id: "prod-ER9216",
      name: "ER9216 32-Light Imperial Grand Ballroom Double Height Chandelier",
      category: "double-height",
      room: "living",
      price: 112000,
      originalPrice: 149000,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 14,
      image: "assets/products/chandelier-imperial-crown.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Grand Ballroom",
      description: "Magnificent two-tier grand chandelier designed for double-height banquet halls and palatial living spaces.",
      specs: { modelCode: "ER9216", material: "Cast Brass & Bohemian Faceted Crystals", dimensions: "Diameter 1200mm x Drop 2150mm", lampHolder: "32x E14 LED Bulbs", finish: "24K Gold PVD Finish", voltage: "220-240V" }
    },
    {
      id: "prod-MH2918",
      name: "MH2918/1800 44-Light Starburst Galaxy Duplex Chandelier",
      category: "double-height",
      room: "living",
      price: 69900,
      originalPrice: 92380,
      discount: "24% OFF",
      rating: 5.0,
      reviewsCount: 20,
      image: "assets/products/double-height-spiral.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "44-Light Galaxy",
      description: "44 crystal-tipped radiant beams arranged in a cascading galaxy spiral down the staircase atrium.",
      specs: { modelCode: "MH2918/1800", material: "Plated Brass Rods & Crystal Star Points", dimensions: "D1000mm x Drop 4500mm (4.5m)", lampHolder: "44x G4 LED Bulbs", finish: "24K Gold Plated", voltage: "220-240V" }
    },
    {
      id: "prod-MH2932",
      name: "MH2932/1800 43-Light Crystal Helix Duplex Staircase Chandelier",
      category: "double-height",
      room: "living",
      price: 64800,
      originalPrice: 86420,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 17,
      image: "assets/products/double-height-spiral.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "43-Light Helix",
      description: "Staggered 43-drop crystal helix that captures daylight and emits brilliant warm evening light.",
      specs: { modelCode: "MH2932/1800", material: "Champagne Crystal Drops & Mirror Gold Plate", dimensions: "D1000mm x Drop 4800mm (4.8m)", lampHolder: "43x G4 LED Bulbs", finish: "Mirror Gold & Champagne Glass", voltage: "220-240V" }
    },

    // --- 3. DESIGNER WALL SCONCES & MIRROR LIGHTS ---
    {
      id: "prod-SS1973",
      name: "SS1973 Contemporary Minimalist Up-Down Wall Sconce",
      category: "wall",
      room: "living",
      price: 1750,
      originalPrice: 2380,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 64,
      image: "assets/products/wall-up-down.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Architect's Choice",
      description: "Dual upward and downward optical lenses projecting razor-sharp warm light cones on textured wallpaper and accent walls.",
      specs: { modelCode: "SS1973", material: "Die-cast Aluminum Body", dimensions: "W100 x D80 x H280mm", wattageCct: "12W CREE Warm White 3000K", finish: "Matte Black & Gold Accent", voltage: "220-240V" }
    },
    {
      id: "prod-SS2738",
      name: "SS2738 Curved Ambient Halo Wall Light",
      category: "wall",
      room: "bedroom",
      price: 1950,
      originalPrice: 2600,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 38,
      image: "assets/products/wall.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Bedside Sconce",
      description: "Graceful sweeping curved silhouette offering indirect cove-style wall wash illumination ideal for luxury bedrooms.",
      specs: { modelCode: "SS2738", material: "Curved Aluminum & PMMA Diffuser", dimensions: "W120 x H320mm", wattageCct: "14W 3-Color CCT LED", finish: "Brushed Brass", voltage: "220V" }
    },
    {
      id: "prod-SS2967",
      name: "SS2967 Natural Spanish Marble & Brass Wall Sconce",
      category: "wall",
      room: "living",
      price: 2790,
      originalPrice: 3750,
      discount: "26% OFF",
      rating: 5.0,
      reviewsCount: 49,
      image: "assets/products/wall-marble.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Real Marble",
      description: "Natural veined marble backplate with an illuminated front brass disc, creating back-lit halo ambient glow.",
      specs: { modelCode: "SS2967", material: "Authentic Natural Marble & Solid Brass", dimensions: "W150 x H380mm", lampHolder: "1x G9 LED 7W", finish: "Spanish White Marble & Satin Gold", voltage: "220V" }
    },
    {
      id: "prod-SS3158",
      name: "SS3158 Geometric Ribbon LED Accent Wall Light",
      category: "wall",
      room: "bedroom",
      price: 2280,
      originalPrice: 3040,
      discount: "25% OFF",
      rating: 4.7,
      reviewsCount: 31,
      image: "assets/products/wall.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Minimalist Art",
      description: "Sculptural ribbon motif casting continuous fluid light along bedroom corridors and foyer walls.",
      specs: { modelCode: "SS3158", material: "Spun Aluminum Ribbon & Silicone Diffuser", dimensions: "W180 x H420mm", wattageCct: "18W Tunable LED", finish: "Matte Gold", voltage: "220V" }
    },
    {
      id: "prod-SS2799",
      name: "SS2799-80 Linear Vanity & Bathroom Mirror Sconce",
      category: "wall",
      room: "bedroom",
      price: 2690,
      originalPrice: 3590,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 45,
      image: "assets/products/wall-up-down.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Vanity Waterproof",
      description: "Wide, shadow-free linear bathroom mirror light with moisture resistance and high color-rendering index.",
      specs: { modelCode: "SS2799-80", material: "Anodized Aluminum & Acrylic Diffuser", dimensions: "Length 800mm x H60mm", wattageCct: "20W High CRI RA>92 LED (IP54)", finish: "Brushed Rose Gold", voltage: "220V" }
    },
    {
      id: "prod-SS1969",
      name: "SS1969-3 3-Light Frosted Globe Vanity Wall Fixture",
      category: "wall",
      room: "bedroom",
      price: 4190,
      originalPrice: 5630,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 27,
      image: "assets/products/wall.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Opal Globe",
      description: "Three opal glass spheres mounted on a satin brass horizontal stem providing warm, glare-free illumination.",
      specs: { modelCode: "SS1969-3", material: "Opal White Frosted Glass & Polished Brass", dimensions: "L550 x H200mm", lampHolder: "3x G9 LED", finish: "Brushed Brass", voltage: "220V" }
    },
    {
      id: "prod-SS3299B",
      name: "SS3299B Artisan Rosewood & Polished Marble Sconce",
      category: "wall",
      room: "living",
      price: 3600,
      originalPrice: 4800,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 22,
      image: "assets/products/wall-marble.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Wood & Marble",
      description: "Exquisite pairing of rich wood grain, natural stone, and warm filament glow for luxury rustic and contemporary interiors.",
      specs: { modelCode: "SS3299B", material: "Real Teakwood Finish, Polished Marble & Brass", dimensions: "W160 x H350mm", lampHolder: "1x E27 Filament", finish: "Warm Teak & Marble", voltage: "220V" }
    },
    {
      id: "prod-SS3313A",
      name: "SS3313A Sculptural Crystal Leaf Luxury Wall Light",
      category: "wall",
      room: "living",
      price: 4200,
      originalPrice: 5630,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 36,
      image: "assets/products/wall.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Crystal Leaf",
      description: "Hand-molded crystal glass leaves radiating from a gold stem that sparkles with diamond brilliance.",
      specs: { modelCode: "SS3313A", material: "Hand-Molded Crystal Leaves & Gold Chassis", dimensions: "W220 x H450mm", lampHolder: "2x E14 LED", finish: "French Gold", voltage: "220V" }
    },
    {
      id: "prod-DKMB5277",
      name: "DKMB5277-2 Double Cone Vintage Brass Wall Light",
      category: "wall",
      room: "living",
      price: 5350,
      originalPrice: 7150,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 19,
      image: "assets/products/wall-up-down.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Vintage Brass",
      description: "Mid-century Italian double-conical sconce offering directional up-down illumination.",
      specs: { modelCode: "DKMB5277-2", material: "Heavy Spun Brass & Matte Black Metal", dimensions: "W320 x H240mm", lampHolder: "2x E27 Lamps", finish: "Brushed Brass & Black", voltage: "220V" }
    },
    {
      id: "prod-LM9002",
      name: "LM9002/1 Fluted Amber Glass Designer Sconce",
      category: "wall",
      room: "dining",
      price: 2550,
      originalPrice: 3420,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 33,
      image: "assets/products/chandelier-amber-fluted.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Amber Glass",
      description: "Amber ribbed cylindrical glass shade diffusing honey-warm illumination for dining alcoves.",
      specs: { modelCode: "LM9002/1", material: "Textured Fluted Amber Glass & Brass Arm", dimensions: "W140 x H300mm", lampHolder: "1x E27 Warm LED", finish: "Amber & Antique Gold", voltage: "220V" }
    },
    {
      id: "prod-B6616",
      name: "Beluga B6616/2 Handcrafted Ceramic & Brass Wall Light",
      category: "wall",
      room: "living",
      price: 5750,
      originalPrice: 7680,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 21,
      image: "assets/products/wall-marble.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Artisan Ceramic",
      description: "Artisan ceramic fluting layered with warm gold metalwork for high-end boutique interiors.",
      specs: { modelCode: "BELUGA-B6616/2", material: "Matte White Ceramic & Electroplated Brass", dimensions: "W200 x H360mm", lampHolder: "2x G9 LED", finish: "Pure White Ceramic & Gold", voltage: "220V" }
    },
    {
      id: "prod-WDB1674",
      name: "Beluga WDB1674/5 5-Tier Crystal Waterfall Wall Sconce",
      category: "wall",
      room: "living",
      price: 4890,
      originalPrice: 6560,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 41,
      image: "assets/products/wall.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Waterfall Sconce",
      description: "Five cascading tiers of crystal prisms creating a dramatic waterfall of sparkling light.",
      specs: { modelCode: "WDB1674/5", material: "5-Tier K9 Faceted Crystal & Gold Plating", dimensions: "W300 x H520mm", lampHolder: "5x E14 Bulbs", finish: "24K Gold PVD", voltage: "220-240V" }
    },
    {
      id: "prod-WDB1225",
      name: "WDB1225 Artistic Songbird on Branch Ambient Wall Light",
      category: "wall",
      room: "bedroom",
      price: 2590,
      originalPrice: 3480,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 53,
      image: "assets/products/wall.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Songbird Series",
      description: "Enchanting illuminated bird perched on a brass twig, offering gentle bedtime ambient lighting.",
      specs: { modelCode: "WDB1225", material: "Illuminated Frosted Acrylic Bird & Gold Brass Branch", dimensions: "W280 x H360mm", wattageCct: "12W 3000K Soft Glow LED", finish: "Gold & Translucent White", voltage: "220V" }
    },
    {
      id: "prod-WDB1172",
      name: "WDB1172 Contemporary Triangular Crystal Rod Wall Sconce",
      category: "wall",
      room: "living",
      price: 3100,
      originalPrice: 4140,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 28,
      image: "assets/products/wall.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Crystal Rods",
      description: "Vertical array of triangular crystal rods framing warm internal candle bulbs.",
      specs: { modelCode: "WDB1172", material: "Prismatic Triangular Crystal Rods & Satin Gold", dimensions: "W180 x H400mm", lampHolder: "2x E14 LED", finish: "Satin Gold", voltage: "220V" }
    },

    // --- 4. HANGING PENDANT LIGHTS ---
    {
      id: "prod-BEL-HP101",
      name: "Beluga BEL-HP101 Fluted Cognac Glass Drop Pendant",
      category: "pendant",
      room: "dining",
      price: 3290,
      originalPrice: 4450,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 36,
      image: "assets/products/pendant.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Fluted Cognac",
      description: "Rich cognac fluted glass pendant providing warm ambient dining glow.",
      specs: { modelCode: "BEL-HP101", material: "Hand-Blown Ribbed Cognac Glass & Brass Cap", dimensions: "D180 x H380mm (Cord 1500mm)", lampHolder: "1x E27 Filament LED", finish: "Cognac Amber & Brushed Gold", voltage: "220V" }
    },
    {
      id: "prod-BEL-HP205",
      name: "Beluga BEL-HP205 Triple Cluster Linear Dining Bar Pendant",
      category: "pendant",
      room: "dining",
      price: 8890,
      originalPrice: 11900,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 30,
      image: "assets/products/pendant-dining-bar.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Dining Trio",
      description: "Three staggered smoked glass shades mounted on a matte black ceiling canopy for rectangular dining tables.",
      specs: { modelCode: "BEL-HP205", material: "Smoked Mirror Glass & Matte Black Bar", dimensions: "Linear Bar L900mm x Drop 1200mm", lampHolder: "3x E27 LED", finish: "Smoked Grey Mirror & Black", voltage: "220V" }
    },
    {
      id: "prod-BEL-HP312",
      name: "Beluga BEL-HP312 Golden Globe Ring Suspension Pendant",
      category: "pendant",
      room: "bedroom",
      price: 4990,
      originalPrice: 6750,
      discount: "26% OFF",
      rating: 4.8,
      reviewsCount: 22,
      image: "assets/products/chandelier-halo.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Golden Ring",
      description: "Luminous frosted glass sphere nestled inside a slender gold ring, perfect for bedside suspension.",
      specs: { modelCode: "BEL-HP312", material: "Satin Gold Brass Ring & Opal Glass Sphere", dimensions: "Diameter 350mm Ring (Cord 1200mm)", wattageCct: "20W Tunable LED", finish: "Satin Gold & Opal White", voltage: "220V" }
    },
    {
      id: "prod-BEL-HP420",
      name: "Beluga BEL-HP420 Faceted Crystal Cylinder Island Pendant",
      category: "pendant",
      room: "kitchen",
      price: 4290,
      originalPrice: 5800,
      discount: "26% OFF",
      rating: 5.0,
      reviewsCount: 40,
      image: "assets/products/pendant.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Island Crystal",
      description: "Solid crystal cylinder focusing a warm sparkle onto breakfast counters and bar islands.",
      specs: { modelCode: "BEL-HP420", material: "Solid Faceted Optical Crystal & Brushed Brass", dimensions: "D100 x H450mm", wattageCct: "12W High CRI COB 3000K", finish: "French Gold & Clear Crystal", voltage: "220V" }
    },
    {
      id: "prod-SS-P1021",
      name: "SS-P1021 Nordic Scandinavian Wood & Pastel Dome Pendant",
      category: "pendant",
      room: "dining",
      price: 2390,
      originalPrice: 3200,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 28,
      image: "assets/products/pendant-dining-bar.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Nordic Wood",
      description: "Scandinavian minimalism featuring smooth matte pastel aluminum crowned with natural solid wood.",
      specs: { modelCode: "SS-P1021", material: "Spun Aluminum & Natural Ash Wood Top", dimensions: "D300 x H200mm", lampHolder: "1x E27", finish: "Matte Grey & Ash Wood", voltage: "220V" }
    },

    // --- 5. LUXURY TABLE & FLOOR LAMPS ---
    {
      id: "prod-KK9279A",
      name: "KK9279A Modernist Brushed Brass Arc Table Lamp",
      category: "table-floor",
      room: "bedroom",
      price: 5490,
      originalPrice: 7360,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 31,
      image: "assets/products/table-floor.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Desk Elegance",
      description: "Sculptural arched table lamp crafted from solid brushed brass, delivering warm task and ambient bedside glow.",
      specs: { modelCode: "KK9279A", material: "Brushed Brass Metal & Heavy Weighted Base", dimensions: "W250 x H480mm", lampHolder: "1x E27 LED Warm Bulb", finish: "Brushed Gold", voltage: "220V" }
    },
    {
      id: "prod-KK9367A",
      name: "KK9367A Contemporary Smoked Glass Globe Table Lamp",
      category: "table-floor",
      room: "living",
      price: 7990,
      originalPrice: 10880,
      discount: "27% OFF",
      rating: 4.9,
      reviewsCount: 24,
      image: "assets/products/chandelier-smoked-sphere.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Smoked Globe",
      description: "Translucent smoked glass sphere sitting on a minimalist gold pedestal, casting an intimate moody ambiance.",
      specs: { modelCode: "KK9367A", material: "Hand-Blown Smoked Glass & Gold Metal Pedestal", dimensions: "Diameter 280mm x Height 420mm", lampHolder: "1x E27 Vintage Filament", finish: "Smoked Grey Glass & Gold", voltage: "220V" }
    },
    {
      id: "prod-KK8006A",
      name: "KK8006A Minimalist Textured Ceramic Bedside Lamp",
      category: "table-floor",
      room: "bedroom",
      price: 6450,
      originalPrice: 8640,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 29,
      image: "assets/products/table-floor.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Ceramic & Linen",
      description: "Tactile ribbed ceramic base paired with an organic linen drum shade for soothing bedroom lighting.",
      specs: { modelCode: "KK8006A", material: "Handcrafted Textured Ceramic & Natural Linen", dimensions: "D300 x H520mm", lampHolder: "1x E27 Warm White", finish: "Off-White Textured Clay & Oatmeal Linen", voltage: "220V" }
    },
    {
      id: "prod-KK8038A",
      name: "KK8038A Sculptural Natural Travertine Stone Table Lamp",
      category: "table-floor",
      room: "living",
      price: 6950,
      originalPrice: 9280,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 17,
      image: "assets/products/table-floor.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Natural Travertine",
      description: "Raw, porous travertine stone block crowned with a brushed brass dome diffuser, representing luxury organic design.",
      specs: { modelCode: "KK8038A", material: "Raw Natural Italian Travertine Stone & Solid Brass", dimensions: "W220 x H450mm", lampHolder: "1x E14 Warm LED", finish: "Natural Beige Stone & Satin Brass", voltage: "220V" }
    },
    {
      id: "prod-KK9232A",
      name: "KK9232A Architect Multi-Joint Adjustable Arm Desk Lamp",
      category: "table-floor",
      room: "office",
      price: 3990,
      originalPrice: 5440,
      discount: "27% OFF",
      rating: 4.8,
      reviewsCount: 35,
      image: "assets/products/table-floor.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Architect Desk",
      description: "Precision balanced multi-joint drafting lamp providing directable anti-glare light for home offices and studios.",
      specs: { modelCode: "KK9232A", material: "Heavy Aluminum Frame & Brass Tension Springs", dimensions: "Adjustable Reach H700mm", lampHolder: "1x E27 LED", finish: "Matte Black & Gold Knobs", voltage: "220V" }
    },
    {
      id: "prod-DYA17141",
      name: "DYA17141 Classic Banker's Emerald Green Glass Lamp",
      category: "table-floor",
      room: "office",
      price: 2850,
      originalPrice: 3840,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 42,
      image: "assets/products/table-floor.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Vintage Banker",
      description: "Timeless traditional banker's lamp featuring an emerald green glass swivel hood and classic brass pull chain.",
      specs: { modelCode: "DYA17141", material: "Emerald Green Cased Glass & Cast Brass Base", dimensions: "W270 x H380mm", lampHolder: "1x E27 Pull Chain Switch", finish: "Emerald Green & Antique Brass", voltage: "220V" }
    },
    {
      id: "prod-KK9279AA",
      name: "KK9279AA Sculptural Arched Floor Lamp with Marble Base",
      category: "table-floor",
      room: "living",
      price: 8400,
      originalPrice: 11200,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 38,
      image: "assets/products/lamp-arched-marble.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Arched Floor Lamp",
      description: "Sweeping architectural floor lamp anchored by a solid black marble pedestal, casting light gracefully over sofas.",
      specs: { modelCode: "KK9279AA", material: "Brushed Brass Stem & Heavy Black Marquina Marble", dimensions: "W450 x H1650mm", lampHolder: "1x E27 Warm LED", finish: "Brushed Brass & Black Marble", voltage: "220V" }
    },
    {
      id: "prod-KK9356AA",
      name: "KK9356AA Amber Disc Ambient Luxury Floor Lamp",
      category: "table-floor",
      room: "living",
      price: 12450,
      originalPrice: 16640,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 22,
      image: "assets/products/lamp-arched-marble.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Amber Disc",
      description: "Large glowing amber disc radiating a sunset glow across high-end living room seating areas.",
      specs: { modelCode: "KK9356AA", material: "Champagne Amber Acrylic Disc & Brass Pillar", dimensions: "Diameter 400mm x Height 1580mm", wattageCct: "36W 3-CCT Dimmable LED", finish: "Champagne Amber & Gold", voltage: "220V" }
    },
    {
      id: "prod-KK9089AA",
      name: "KK9089AA Twin Globe Carrara Marble Floor Standing Fixture",
      category: "table-floor",
      room: "living",
      price: 12900,
      originalPrice: 17280,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 19,
      image: "assets/products/lamp-arched-marble.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Carrara Marble",
      description: "Dual illuminated opal glass spheres branching from a gold stem grounded in an authentic white Carrara marble base.",
      specs: { modelCode: "KK9089AA", material: "Solid White Carrara Marble & Opal Glass Globes", dimensions: "W380 x H1600mm", lampHolder: "2x G9 Warm LED", finish: "White Carrara Marble & Gold", voltage: "220V" }
    },
    {
      id: "prod-DYC058",
      name: "DYC058 Integrated Walnut Pedestal Table Floor Lamp",
      category: "table-floor",
      room: "bedroom",
      price: 8850,
      originalPrice: 11840,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 26,
      image: "assets/products/table-floor.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "2-in-1 Table Lamp",
      description: "Functional two-in-one floor standing lamp with an integrated circular walnut side table shelf.",
      specs: { modelCode: "DYC058", material: "Solid Walnut Wood Shelf & Brass Upright", dimensions: "Table D400mm x Total H1450mm", lampHolder: "1x E27 Bulb", finish: "Natural Walnut & Satin Gold", voltage: "220V" }
    },
    {
      id: "prod-B8107",
      name: "Beluga B8107/3 3-Globe Vertical Pillar Floor Lamp",
      category: "table-floor",
      room: "living",
      price: 8640,
      originalPrice: 11520,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 33,
      image: "assets/products/lamp-arched-marble.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Beluga 3-Globe",
      description: "Vertical totem of three glowing opal globes delivering balanced 360-degree room lighting.",
      specs: { modelCode: "BELUGA-B8107/3", material: "Opal White Glass & Satin Gold Column", dimensions: "W300 x H1500mm", lampHolder: "3x G9 Bulbs", finish: "Satin French Gold & White Glass", voltage: "220V" }
    },

    // --- 6. CEILING & FLUSH LIGHTS ---
    {
      id: "prod-SS1882",
      name: "SS1882 Ultra Slim Geometric Square Flush Ceiling Light",
      category: "ceiling",
      room: "bedroom",
      price: 2350,
      originalPrice: 3160,
      discount: "26% OFF",
      rating: 4.8,
      reviewsCount: 44,
      image: "assets/products/ceiling.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Ultra Slim",
      description: "Ultra-thin 50mm profile ceiling flush light with remote control color temperature and nightlight mode.",
      specs: { modelCode: "SS1882", material: "Aviation Aluminum & Optical PMMA", dimensions: "500 x 500mm x Thickness 50mm", wattageCct: "48W 3-CCT Tunable LED", finish: "Matte Sand White", voltage: "220-240V" }
    },
    {
      id: "prod-TN2608A",
      name: "TN2608A Concentric Triple Ring Modern Ceiling Flush Fixture",
      category: "ceiling",
      room: "living",
      price: 8350,
      originalPrice: 11200,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 35,
      image: "assets/products/ceiling-triple-ring.jpg",
      featured: true,
      trending: false,
      inStock: true,
      badge: "Triple Ring",
      description: "Three overlapping luminous gold rings mounted flush to the ceiling, ideal for bedrooms and living rooms.",
      specs: { modelCode: "TN2608A", material: "Gold Plated Metal & Silica Diffusers", dimensions: "D600mm x H100mm", wattageCct: "72W High Lumen LED", finish: "French Gold & Black", voltage: "220V" }
    },
    {
      id: "prod-MTB8824",
      name: "MTB8824-6L 6-Way Multi-Directional Modern Ceiling Fixture",
      category: "ceiling",
      room: "living",
      price: 7650,
      originalPrice: 10250,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 28,
      image: "assets/products/ceiling.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "6-Way Semi-Flush",
      description: "Semi-flush 6-arm fixture with low ceiling clearance, delivering widespread ambient illumination.",
      specs: { modelCode: "MTB8824-6L", material: "Forged Steel & Brass Sockets", dimensions: "D750mm x H250mm", lampHolder: "6x E27 Bulbs", finish: "Matte Black & Brass", voltage: "220V" }
    },
    {
      id: "prod-LR7229",
      name: "LR7229/5 5-Leaf Flower Blossom Crystal Ceiling Light",
      category: "ceiling",
      room: "living",
      price: 10750,
      originalPrice: 14330,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 32,
      image: "assets/products/ceiling.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Crystal Blossom",
      description: "Artistic floral crystal petals blooming from a gold core with remote-controlled light moods.",
      specs: { modelCode: "LR7229/5", material: "Faceted K9 Crystal Petals & Gold Chassis", dimensions: "D680mm x H120mm", wattageCct: "65W 3-CCT LED", finish: "Polished Gold & Clear Crystal", voltage: "220V" }
    },
    {
      id: "prod-JH26001",
      name: "JH26001 Sunburst Surface Mounted Architectural Ceiling Light",
      category: "ceiling",
      room: "bedroom",
      price: 4800,
      originalPrice: 6435,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 21,
      image: "assets/products/ceiling-triple-ring.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Sunburst",
      description: "Circular surface ceiling fixture with subtle radial halo backlighting on the ceiling surface.",
      specs: { modelCode: "JH26001", material: "Sand White Frame & Rose Gold Accents", dimensions: "D500mm x H65mm", wattageCct: "40W LED Tunable", finish: "White & Rose Gold", voltage: "220V" }
    },

    // --- 7. 48V LOW VOLTAGE MAGNETIC TRACK LIGHTS ---
    {
      id: "prod-GMT-01",
      name: "GMT-01 48V Low Voltage Magnetic Track Rail (2-Meter Surface/Recessed)",
      category: "track",
      room: "office",
      price: 2400,
      originalPrice: 3200,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 46,
      image: "assets/products/track-system.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "48V Safe Rail",
      description: "Heavy-duty 48V DC magnetic profile track supporting plug-and-play repositioning of floodlights, spots, and pendants.",
      specs: { modelCode: "GMT-01 (2M)", material: "Architectural Extruded 6063 Aluminum", dimensions: "2000mm L x 35mm W x 35mm H", wattageCct: "48V DC Copper Busbar (Max 200W)", finish: "Matte Deep Anodized Black", voltage: "48V DC Low Voltage" }
    },
    {
      id: "prod-GMT-02",
      name: "GMT-02 Magnetic Linear Flood Diffused Light Module (12W)",
      category: "track",
      room: "office",
      price: 1390,
      originalPrice: 1850,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 38,
      image: "assets/products/track-system.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Linear Diffused",
      description: "Magnetic snap-in diffused linear light module delivering smooth, glare-free ambient line lighting.",
      specs: { modelCode: "GMT-02 (12W)", material: "Aluminum Body & Frosted Opal Optical Cover", dimensions: "L300mm x W22mm Snap-in", wattageCct: "12W Osram LED (3000K/4000K, RA>90)", finish: "Matte Black", voltage: "48V DC" }
    },
    {
      id: "prod-GMT-03",
      name: "GMT-03 Magnetic Linear Darklight Grille Module (18W Anti-Glare UGR<16)",
      category: "track",
      room: "office",
      price: 1850,
      originalPrice: 2450,
      discount: "24% OFF",
      rating: 5.0,
      reviewsCount: 52,
      image: "assets/products/track-system.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Anti-Glare UGR<16",
      description: "Deep louvered anti-glare architectural module preventing eye strain while illuminating workspaces and luxury offices.",
      specs: { modelCode: "GMT-03 (18W)", material: "Deep Micro-Baffles & Optical Black Honeycomb", dimensions: "L450mm x W22mm", wattageCct: "18W Bridgelux LED, UGR<16", finish: "Matte Black Darklight", voltage: "48V DC" }
    },
    {
      id: "prod-GMT-04",
      name: "GMT-04 Magnetic 360° Rotatable Architectural Spotlight (10W)",
      category: "track",
      room: "living",
      price: 1450,
      originalPrice: 1950,
      discount: "26% OFF",
      rating: 4.9,
      reviewsCount: 41,
      image: "assets/products/track.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "360° Spotlight",
      description: "Fully articulated 360-degree rotating and 90-degree tilting magnetic spotlight for highlighting artwork and focal walls.",
      specs: { modelCode: "GMT-04 (10W)", material: "CNC Machined Aluminum & 24° Optical Lens", dimensions: "D45mm x L120mm", wattageCct: "10W CREE COB LED (RA>92)", finish: "Matte Black & Gold Ring", voltage: "48V DC" }
    },
    {
      id: "prod-GMT-05",
      name: "GMT-05 Magnetic Suspension Cylinder Pendant Module (12W)",
      category: "track",
      room: "dining",
      price: 1950,
      originalPrice: 2600,
      discount: "25% OFF",
      rating: 4.8,
      reviewsCount: 29,
      image: "assets/products/track.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Track Pendant",
      description: "Snap-in magnetic hanging cylinder pendant that slides anywhere along the magnetic rail above dining and island tables.",
      specs: { modelCode: "GMT-05 (12W)", material: "Slender Aluminum Tube & Brass Ring", dimensions: "D40mm x L300mm (Drop Cord 1200mm)", wattageCct: "12W Warm White 3000K", finish: "Matte Black & Gold Collar", voltage: "48V DC" }
    },
    {
      id: "prod-SMT-01",
      name: "SMT-01 Ultra-Slim In-Track 48V Power Supply Driver (100W)",
      category: "track",
      room: "office",
      price: 2550,
      originalPrice: 3400,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 34,
      image: "assets/products/track-system.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "100W Power Driver",
      description: "Concealed inside-track power supply unit that clips into the magnetic channel without needing an external driver box.",
      specs: { modelCode: "SMT-01 (100W)", material: "Reinforced Aluminum Shielding Driver", dimensions: "In-track concealed module", wattageCct: "100W 48V DC Constant Voltage Output", finish: "Concealed Black", voltage: "Input 220V / Output 48V DC" }
    },

    // --- 8. OUTDOOR & LANDSCAPE LIGHTS ---
    {
      id: "prod-GOL-01",
      name: "GOL-01 Heavy-Duty IP65 Architectural Path Bollard (60cm)",
      category: "outdoor",
      room: "outdoor",
      price: 2100,
      originalPrice: 2800,
      discount: "25% OFF",
      rating: 4.9,
      reviewsCount: 37,
      image: "assets/products/outdoor-bollard.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "IP65 Weatherproof",
      description: "Robust pathway bollard designed to withstand harsh monsoon rains and dust while illuminating garden walkways.",
      specs: { modelCode: "GOL-01 (60CM)", material: "Anti-Corrosion Die-cast Aluminum & Tempered Glass", dimensions: "Height 600mm x Diameter 90mm", wattageCct: "10W Sealed Warm White 3000K LED", finish: "Anthracite Dark Grey", protection: "IP65 Waterproof & Dustproof" }
    },
    {
      id: "prod-GOL-02",
      name: "GOL-02 IP67 Waterproof Outdoor Garden Landscape Spike Light (7W)",
      category: "outdoor",
      room: "outdoor",
      price: 1190,
      originalPrice: 1650,
      discount: "28% OFF",
      rating: 4.8,
      reviewsCount: 49,
      image: "assets/products/outdoor.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "IP67 Spike Light",
      description: "Adjustable landscape spike light for uplighting trees, palms, shrubs, and exterior stone facades.",
      specs: { modelCode: "GOL-02 (7W)", material: "Heavy Aluminum Body & Ground Anchor Stake", dimensions: "D60 x L95mm + 160mm Stake", wattageCct: "7W CREE COB (30° Beam)", finish: "Sand Black", protection: "IP67 Submersible Waterproof" }
    },
    {
      id: "prod-GOL-03",
      name: "GOL-03 Dual-Beam Narrow Facade Column Projector Light (18W IP66)",
      category: "outdoor",
      room: "outdoor",
      price: 2950,
      originalPrice: 3950,
      discount: "25% OFF",
      rating: 5.0,
      reviewsCount: 26,
      image: "assets/products/wall-up-down.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Facade Beam",
      description: "Powerful pencil-beam facade projector casting tall 10-meter upward and downward architectural pillars of light on bungalow exteriors.",
      specs: { modelCode: "GOL-03 (18W)", material: "Die-cast Heavy Alloy & 8° Narrow Lenses", dimensions: "W120 x H240mm", wattageCct: "18W High Power LED (Up & Down Beam)", finish: "Dark Grey IP66", protection: "IP66 High Pressure Water Resistance" }
    },
    {
      id: "prod-GOL-04",
      name: "GOL-04 Solar Smart Motion Sensor Exterior Security Wall Light",
      category: "outdoor",
      room: "outdoor",
      price: 1350,
      originalPrice: 1850,
      discount: "27% OFF",
      rating: 4.7,
      reviewsCount: 33,
      image: "assets/products/outdoor.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Solar + PIR Sensor",
      description: "Zero-electricity solar exterior wall light with automatic twilight activation and PIR motion detection.",
      specs: { modelCode: "GOL-04 Solar", material: "UV Resistant Polycarbonate & Monocrystalline Panel", dimensions: "W140 x H200mm", wattageCct: "8W LED + 2200mAh Lithium Battery", finish: "Matte Black", protection: "IP65 Weatherproof" }
    },
    {
      id: "prod-GBL-01",
      name: "GBL-01 Modern Geometric Recessed Step & Footlight (3W IP65)",
      category: "outdoor",
      room: "outdoor",
      price: 690,
      originalPrice: 950,
      discount: "27% OFF",
      rating: 4.8,
      reviewsCount: 41,
      image: "assets/products/outdoor.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Step Footlight",
      description: "Recessed stair and wall footlight providing downward soft guide lighting for outdoor steps, ramps, and boundary walls.",
      specs: { modelCode: "GBL-01 (3W)", material: "Die-cast Aluminum Housing & Wall Box", dimensions: "85 x 85mm Face, Depth 50mm", wattageCct: "3W Warm White 3000K", finish: "Dark Grey IP65", protection: "IP65 Step Light" }
    },

    // --- 9. SMART TUNABLE LIGHTS ---
    {
      id: "prod-SMART-01",
      name: "Smart WiFi + Bluetooth RGB & CCT Ambient Controller Bulb (12W)",
      category: "smart",
      room: "bedroom",
      price: 899,
      originalPrice: 1499,
      discount: "40% OFF",
      rating: 4.9,
      reviewsCount: 72,
      image: "assets/products/smart-halo.jpg",
      featured: true,
      trending: true,
      inStock: true,
      badge: "Tuya / Alexa",
      description: "Voice-controlled smart bulb with 16 million RGB colors, music synchronization, and programmable sunrise wakeup schedules.",
      specs: { modelCode: "SMART-BULB-12W", material: "Thermal Polycarbonate & Aluminum Core", dimensions: "Standard B22 / E27", wattageCct: "12W (1100 Lumens RGB + Tunable White)", connectivity: "WiFi 2.4GHz + BLE Mesh (Alexa/Google Home)", voltage: "220-240V" }
    },
    {
      id: "prod-SMART-02",
      name: "Smart Multi-Scene Wireless Rotary Dimmer & Scene Switch",
      category: "smart",
      room: "living",
      price: 1850,
      originalPrice: 2600,
      discount: "29% OFF",
      rating: 4.9,
      reviewsCount: 36,
      image: "assets/products/smart.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "Rotary Dimmer",
      description: "Premium tactile rotary knob switch for stepless chandelier dimming and one-touch lighting scene selection.",
      specs: { modelCode: "SMART-ROTARY-01", material: "Brushed Aluminum Knob & Glass Bezel", dimensions: "86 x 86mm Standard Box", compatibility: "Zigbee 3.0 / WiFi Gateway", control: "Smooth 1-100% Dimming & CCT Control", voltage: "220V" }
    }
  ];

  const DEFAULT_BLOGS = [
    {
      id: "blog-1",
      title: "How to Choose the Perfect Chandelier Size for Your Living Room",
      category: "Design Guide",
      date: "Sep 2026",
      readTime: "4 min read",
      image: "assets/products/chandelier-imperial-crown.jpg",
      summary: "Discover the golden rule of room dimensions (Length + Width in feet = Chandelier diameter in inches) and ceiling height clearance tips for grand homes.",
      author: "JK Design Studio",
      content: `When selecting a luxury chandelier for your living room or duplex foyer, proportions are everything. A chandelier that is too small gets lost in the space, while an oversized fixture can overwhelm your interior architecture.

Here is the golden mathematical formula used by lighting architects across Gujarat:
1. Measure your room's Length and Width in feet (e.g., 20 feet by 16 feet).
2. Add these two numbers together: 20 + 16 = 36.
3. Convert that sum to inches: Your ideal chandelier diameter is approximately 36 inches (900mm to 1000mm).

For ceiling height clearance, always maintain at least 7 to 8 feet of clearance from the bottom of the chandelier to the floor in walking zones. In double-height living spaces (18-22 feet), opt for vertical cascading spiral crystal designs with drops of 10 to 16 feet.`,
      proTip: "In duplex stairwells or double-height foyers, choose a chandelier with motorized suspension lifters to make crystal cleaning and bulb maintenance effortless!",
      featured: true,
      tags: ["Chandeliers", "Duplex", "Calculations", "Living Room"]
    },
    {
      id: "blog-2",
      title: "Warm (2700K) vs Neutral (4000K) vs Cool (6500K): Which is Right?",
      category: "Lighting 101",
      date: "Aug 2026",
      readTime: "5 min read",
      image: "assets/products/wall-marble.jpg",
      summary: "Understand color temperatures to create cozy bedrooms, productive home offices, and sparkling dining areas without harsh glare.",
      author: "Architectural Lighting Team",
      content: `Light color temperature (measured in Kelvin) dictates the emotional atmosphere and biological comfort of your residence.

Here is how to select the right color temperature for each zone:
• 2700K - 3000K (Warm White): Produces an amber, candle-like glow that triggers relaxation. Perfect for master bedrooms, luxury living room chandeliers, bedside wall sconces, and dining areas.
• 4000K (Natural / Neutral White): Clean, crisp, and true-to-life without yellow or blue tints. Essential for modern kitchens, vanity mirrors, wardrobe dressing zones, and study tables.
• 5000K - 6500K (Cool Daylight): High alertness light best suited for commercial spaces, utility laundry zones, and exterior landscape security floodlights.

At JK Lights Gandhinagar, we recommend installing 3-CCT Smart Tunable fixtures so you can transition smoothly from 4000K focus during daytime to 2700K cozy ambiance at dusk.`,
      proTip: "Never mix 2700K and 6500K light sources in the same direct line of sight. It causes visual fatigue and makes luxury woodwork appear distorted.",
      featured: true,
      tags: ["Kelvin", "Warm White", "CCT", "Interior Design"]
    },
    {
      id: "blog-3",
      title: "Why Magnetic Track Lighting is the Top Choice for Modern Villas in 2026",
      category: "Trends 2026",
      date: "Aug 2026",
      readTime: "3 min read",
      image: "assets/products/track-system.jpg",
      summary: "Discover the flexibility of 48V low-voltage magnetic rails allowing you to reposition spot, flood, and pendant lights effortlessly without rewiring.",
      author: "JK Lights Gandhinagar",
      content: `Traditional fixed ceiling spotlights are quickly being replaced by 48V Low-Voltage Magnetic Architectural Track Systems in new villas and bungalows across Gandhinagar and Ahmedabad.

Key benefits of magnetic track systems:
1. Tool-Free Repositioning: Simply snap spotlights, linear diffusers, wall washers, or mini hanging drops in and out with magnetic lock clicks.
2. Ultra-Safe 48V DC Low Voltage: Completely touch-safe with zero risk of electric shock during adjustments.
3. Minimalist Trimless Architecture: Recessed seamlessly into false ceilings for razor-sharp, modern visual lines.
4. Anti-Glare Dark Light Grilles: Deep recessed optics (UGR < 16) provide brilliant floor lux levels while concealing the raw LED glare from eye level.`,
      proTip: "Plan your magnetic track layout before false ceiling plastering. Recessed tracks require early channel framing with your POP contractor.",
      featured: false,
      tags: ["Magnetic Tracks", "Architectural", "Modern Villa", "Anti-Glare"]
    }
  ];

  const DEFAULT_FAQS = [
    {
      id: "faq-1",
      question: "Do you provide on-site lighting consultation in Gandhinagar and Ahmedabad?",
      answer: "Yes! Our specialized architectural lighting consultants offer free on-site visits across Gandhinagar (Kudasan, Infocity, Raysan, PDPU road) and Ahmedabad. We evaluate your floor plans, ceiling heights, and color schemes to recommend ideal lumen levels and fixture placements."
    },
    {
      id: "faq-2",
      question: "Can I customize the size, finish, and crystal quality of chandeliers?",
      answer: "Absolutely. We specialize in custom-built crystal and brass chandeliers tailored specifically for duplexes, banquet halls, and double-height staircases with custom drops up to 20+ feet."
    },
    {
      id: "faq-3",
      question: "What warranty and after-sales support do you offer?",
      answer: "All our designer lighting fixtures and LED drivers come with a minimum 1-year comprehensive showroom warranty. We also maintain spare crystals, drivers, and LED chips in our Kudasan showroom."
    },
    {
      id: "faq-4",
      question: "Do you offer professional installation and delivery?",
      answer: "Yes, our certified electrician team handles safe transportation, heavy-duty ceiling anchoring, crystal assembly, and electrical testing across Gujarat."
    },
    {
      id: "faq-5",
      question: "Where is the JK Lights showroom located in Gandhinagar?",
      answer: "Our flagship showroom is located on the 2nd Floor, VTC Complex (Vrundavan Trade Center), Above Kabir World, Reliance Cross Road, Kudasan, Gandhinagar - 382421. Open Mon-Sat 10:00 AM - 9:30 PM & Sunday 11:00 AM - 8:00 PM."
    }
  ];

  const DEFAULT_INVOICES = [
    {
      id: "JK-INV-2026-8801",
      date: "08/09/2026",
      dueDate: "15/09/2026",
      customerName: "Chirag Patel",
      phone: "+91 98250 11223",
      email: "chirag.patel@gmail.com",
      address: "Bungalow 42, Kudasan Green Villa, Gandhinagar - 382421",
      roomType: "Living Room Duplex & Foyer",
      status: "Advance Paid (50%)",
      statusType: "advance",
      items: [
        { name: "Royal Crystal Grand Chandelier (18-Light E14)", hsn: "9405", qty: 1, rate: 24999, discount: 0, amount: 24999 },
        { name: "Dual Beam Luxury Wall Sconce (CREE LED)", hsn: "9405", qty: 4, rate: 1999, discount: 400, amount: 7596 }
      ],
      subtotal: 32595,
      cgst: 2933.55,
      sgst: 2933.55,
      grandTotal: 38462,
      notes: "Site visit completed. Chandelier drop customized to 14ft with safety cable anchor testing."
    },
    {
      id: "JK-INV-2026-8802",
      date: "07/09/2026",
      dueDate: "14/09/2026",
      customerName: "Bhavin Shah",
      phone: "+91 97240 55667",
      email: "bhavin.shah@yahoo.com",
      address: "A-502, Infocity Heights, Gandhinagar",
      roomType: "Dining Area & Kitchen",
      status: "Full Payment Received",
      statusType: "paid",
      items: [
        { name: "Modern Cluster Pendant Light (3-Cone Gold)", hsn: "9405", qty: 2, rate: 4999, discount: 500, amount: 9498 },
        { name: "Geometric Nested LED Ceiling Light (72W Tunable)", hsn: "9405", qty: 1, rate: 3499, discount: 0, amount: 3499 }
      ],
      subtotal: 12997,
      cgst: 1169.73,
      sgst: 1169.73,
      grandTotal: 15336,
      notes: "Showroom cash receipt #7712. Includes 1-Year Comprehensive Warranty on drivers."
    }
  ];

  // --- 2. LOCAL STORAGE / STATE MANAGEMENT ---
  const KEYS = {
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
    INVOICES: 'jk_lights_invoices',
    STATS: 'jk_lights_stats'
  };

  const STORE_VERSION = 'jk_lights_v2_categorized';
  try {
    const currentVer = localStorage.getItem('jk_lights_store_version');
    if (currentVer !== STORE_VERSION) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem(KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
      localStorage.setItem('jk_lights_store_version', STORE_VERSION);
    }
  } catch (e) {}

  function getLocal(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setLocal(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      window.dispatchEvent(new CustomEvent('jk_store_updated', { detail: { key, val } }));
    } catch (e) {}
  }

  const Store = {
    getStoreInfo: () => getLocal(KEYS.STORE_INFO, DEFAULT_STORE_INFO),
    getSliders: (onlyActive = false) => {
      const sliders = getLocal(KEYS.SLIDERS, DEFAULT_SLIDERS);
      const sorted = [...sliders].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      return onlyActive ? sorted.filter(s => s.active !== false) : sorted;
    },
    getSliderById: (id) => Store.getSliders().find(s => s.id === id),
    saveSlider: (slideData) => {
      const sliders = Store.getSliders();
      let updated;
      if (slideData.id) {
        updated = sliders.map(s => s.id === slideData.id ? { ...s, ...slideData } : s);
      } else {
        const newSlide = {
          ...slideData,
          id: 'slide-' + Date.now(),
          order: Number(slideData.order) || (sliders.length + 1),
          active: slideData.active !== false
        };
        updated = [...sliders, newSlide];
      }
      setLocal(KEYS.SLIDERS, updated);
      return updated;
    },
    deleteSlider: (id) => {
      const sliders = Store.getSliders();
      const updated = sliders.filter(s => s.id !== id);
      setLocal(KEYS.SLIDERS, updated);
      return updated;
    },
    toggleSliderActive: (id) => {
      const sliders = Store.getSliders();
      const updated = sliders.map(s => s.id === id ? { ...s, active: !s.active } : s);
      setLocal(KEYS.SLIDERS, updated);
      return updated;
    },
    getCategories: () => getLocal(KEYS.CATEGORIES, DEFAULT_CATEGORIES),
    getCategoryById: (id) => Store.getCategories().find(c => c.id === id),
    saveCategory: (catData) => {
      const categories = Store.getCategories();
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
      setLocal(KEYS.CATEGORIES, updated);
      return updated;
    },
    deleteCategory: (id) => {
      if (id === 'all') return Store.getCategories();
      const categories = Store.getCategories();
      const updated = categories.filter(c => c.id !== id);
      setLocal(KEYS.CATEGORIES, updated);
      return updated;
    },
    getRooms: () => getLocal(KEYS.ROOMS, DEFAULT_ROOMS),
    getProducts: () => {
      const stored = getLocal(KEYS.PRODUCTS, null);
      if (!stored || stored.length < DEFAULT_PRODUCTS.length) {
        setLocal(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
      }
      return stored;
    },
    getProductById: (id) => Store.getProducts().find(p => p.id === id),
    getBlogs: () => getLocal(KEYS.BLOGS, DEFAULT_BLOGS),
    getFaqs: () => getLocal(KEYS.FAQS, DEFAULT_FAQS),
    getWishlist: () => getLocal(KEYS.WISHLIST, []),
    toggleWishlist: (id) => {
      const list = Store.getWishlist();
      const updated = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
      setLocal(KEYS.WISHLIST, updated);
      return updated;
    },
    getCart: () => getLocal(KEYS.CART, []),
    addToCart: (productId, qty = 1) => {
      const cart = Store.getCart();
      const existing = cart.find(item => item.productId === productId);
      let updated;
      if (existing) {
        updated = cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + qty } : item);
      } else {
        updated = [...cart, { productId, quantity: qty }];
      }
      setLocal(KEYS.CART, updated);
      return updated;
    },
    updateCartQty: (productId, delta) => {
      const cart = Store.getCart();
      const updated = cart.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
      setLocal(KEYS.CART, updated);
      return updated;
    },
    removeFromCart: (productId) => {
      const cart = Store.getCart();
      const updated = cart.filter(item => item.productId !== productId);
      setLocal(KEYS.CART, updated);
      return updated;
    },
    addInquiry: (inq) => {
      const inquiries = getLocal(KEYS.INQUIRIES, []);
      const newInq = {
        ...inq,
        id: 'inq-' + Date.now(),
        status: 'New',
        dateSubmitted: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      };
      setLocal(KEYS.INQUIRIES, [newInq, ...inquiries]);
      return newInq;
    },
    getInvoices: () => getLocal(KEYS.INVOICES, DEFAULT_INVOICES),
    getInvoiceById: (id) => Store.getInvoices().find(i => i.id === id),
    saveInvoice: (invoiceData) => {
      const invoices = Store.getInvoices();
      let updated;
      if (invoiceData.id && invoices.some(i => i.id === invoiceData.id)) {
        updated = invoices.map(i => i.id === invoiceData.id ? { ...i, ...invoiceData } : i);
      } else {
        const newInv = {
          ...invoiceData,
          id: invoiceData.id || `JK-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          date: invoiceData.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          status: invoiceData.status || 'Estimate / Booking Confirmed',
          statusType: invoiceData.statusType || 'estimate'
        };
        updated = [newInv, ...invoices];
      }
      setLocal(KEYS.INVOICES, updated);
      return updated;
    },
    deleteInvoice: (id) => {
      const invoices = Store.getInvoices();
      const updated = invoices.filter(i => i.id !== id);
      setLocal(KEYS.INVOICES, updated);
      return updated;
    },
    generateBookingInvoice: (customerData) => {
      const allProducts = Store.getProducts();
      let items = [];
      let subtotal = 0;

      if (customerData.cartItems && customerData.cartItems.length > 0) {
        items = customerData.cartItems.map(ci => {
          const prod = allProducts.find(p => p.id === ci.productId);
          const name = prod ? prod.name : 'Luxury Lighting Fixture';
          const rate = prod ? prod.price : 1999;
          const amt = rate * ci.quantity;
          subtotal += amt;
          return { name, hsn: '9405', qty: ci.quantity, rate, discount: 0, amount: amt };
        });
      } else {
        // Consultation / Site visit estimate
        items = [
          { name: `Architectural Lighting Consultation & Site Survey (${customerData.roomType || 'Living Room'})`, hsn: '9983', qty: 1, rate: 0, discount: 0, amount: 0 },
          { name: 'Complimentary Showroom Demonstration & Lux Layout Blueprint', hsn: '9983', qty: 1, rate: 0, discount: 0, amount: 0 }
        ];
        subtotal = 0;
      }

      const cgst = subtotal > 0 ? (subtotal * 0.09) : 0;
      const sgst = subtotal > 0 ? (subtotal * 0.09) : 0;
      const grandTotal = Math.round(subtotal + cgst + sgst);

      const invData = {
        id: `JK-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        customerName: customerData.customerName || 'Valued Customer',
        phone: customerData.phone || '+91 84605 76753',
        email: customerData.email || 'customer@jklights.com',
        address: customerData.address || 'Gandhinagar / Ahmedabad, Gujarat',
        roomType: customerData.roomType || 'Residential Luxury Lighting',
        status: subtotal > 0 ? 'Estimate / Quotation' : 'Booking Confirmed (Zero Fee)',
        statusType: subtotal > 0 ? 'estimate' : 'paid',
        items: items,
        subtotal: subtotal,
        cgst: Number(cgst.toFixed(2)),
        sgst: Number(sgst.toFixed(2)),
        grandTotal: grandTotal,
        notes: customerData.notes || 'Includes 1-Year Comprehensive Warranty & Certified Installation Support.'
      };

      Store.saveInvoice(invData);
      return invData;
    },
    openClientDetailsModal: (cartItems = [], onSuccess) => {
      let modal = document.getElementById('clientDetailsInvoiceModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'clientDetailsInvoiceModal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      const allProducts = Store.getProducts();
      let subtotal = 0;
      let totalQty = 0;
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach(ci => {
          const prod = allProducts.find(p => p.id === ci.productId);
          const rate = prod ? prod.price : 1999;
          subtotal += rate * ci.quantity;
          totalQty += ci.quantity;
        });
      }

      modal.innerHTML = `
        <div class="modal-dialog" style="max-width: 620px;">
          <button class="modal-close-btn js-close-client-modal"><i class="fa-solid fa-xmark"></i></button>
          
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(212, 175, 55, 0.15); display: flex; align-items: center; justify-content: center; color: var(--gold-400); font-size: 1.3rem;">
              <i class="fa-solid fa-file-invoice"></i>
            </div>
            <div>
              <h2 style="font-family: var(--font-serif); color: #fff; font-size: 1.5rem; margin: 0;">Generate Official Tax Invoice</h2>
              <span style="color: var(--gold-300); font-size: 0.8rem;">Enter your billing details to personalize your GST invoice</span>
            </div>
          </div>

          ${subtotal > 0 ? `
            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--gold-border); border-radius: 8px; padding: 12px 16px; margin: 16px 0 20px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="color: #cbd5e1; font-size: 0.82rem;">Selected Fixtures:</span>
                <strong style="color: #fff; margin-left: 6px; font-size: 0.9rem;">${totalQty} Items in Cart</strong>
              </div>
              <div>
                <span style="color: #cbd5e1; font-size: 0.82rem;">Grand Total (18% GST):</span>
                <strong style="color: var(--gold-400); font-size: 1.05rem; margin-left: 6px;">₹ ${Math.round(subtotal * 1.18).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          ` : ''}

          <form id="clientDetailsInvoiceForm">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="form-group">
                <label class="form-label">Client Full Name *</label>
                <input type="text" name="clientName" class="form-control" placeholder="e.g. Rajeshbhai Patel" required autofocus />
              </div>

              <div class="form-group">
                <label class="form-label">WhatsApp / Phone *</label>
                <input type="tel" name="clientPhone" class="form-control" placeholder="e.g. +91 84605 76753" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Site / Delivery Address *</label>
              <input type="text" name="clientAddress" class="form-control" placeholder="e.g. Bunglow 14, Pramukh Elysium, Kudasan, Gandhinagar" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="form-group">
                <label class="form-label">Project / Space Scope</label>
                <input type="text" name="clientScope" class="form-control" placeholder="e.g. Duplex Living Room / 4BHK Villa" />
              </div>

              <div class="form-group">
                <label class="form-label">Special Remarks / Notes</label>
                <input type="text" name="clientNotes" class="form-control" placeholder="e.g. Include 12ft drop cables" value="1-Year Full Driver Warranty Included." />
              </div>
            </div>

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
              <button type="button" class="btn btn-glass js-close-client-modal">Cancel</button>
              <button type="submit" class="btn btn-gold">
                <i class="fa-solid fa-file-pdf"></i> Generate & Download Invoice PDF
              </button>
            </div>
          </form>
        </div>
      `;

      modal.classList.add('active');

      modal.querySelectorAll('.js-close-client-modal').forEach(btn => {
        btn.onclick = () => modal.classList.remove('active');
      });

      const form = modal.querySelector('#clientDetailsInvoiceForm');
      form.onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const clientData = {
          name: fd.get('clientName').trim(),
          phone: fd.get('clientPhone').trim(),
          address: fd.get('clientAddress').trim(),
          roomType: fd.get('clientScope').trim() || 'Cart Lighting Selection',
          notes: fd.get('clientNotes').trim() || 'Includes 1-Year Comprehensive Warranty & Certified Installation Support.'
        };

        modal.classList.remove('active');
        if (typeof onSuccess === 'function') {
          onSuccess(clientData);
        }
      };
    },
    openInvoiceModal: (invoice) => {
      let modal = document.getElementById('invoiceModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'invoiceModal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      const store = Store.getStoreInfo();
      const statusClass = invoice.statusType || (invoice.grandTotal === 0 ? 'paid' : 'estimate');

      modal.innerHTML = `
        <div class="modal-dialog invoice-modal-dialog">
          <!-- Toolbar -->
          <div class="invoice-preview-toolbar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-file-invoice" style="color: var(--gold-400); font-size: 1.4rem;"></i>
              <div>
                <h4 style="color: #fff; margin: 0; font-size: 1.05rem;">JK Lights - Official Tax Invoice / Estimate</h4>
                <span style="color: var(--gold-300); font-size: 0.78rem;">Invoice ID: ${invoice.id}</span>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <button class="btn btn-gold btn-sm js-print-invoice" title="Download as PDF or Print">
                <i class="fa-solid fa-download"></i> Download PDF / Print
              </button>
              <button class="btn btn-whatsapp btn-sm js-wa-invoice" title="Share on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp
              </button>
              <button class="action-icon-btn js-close-invoice" title="Close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <!-- Printable Invoice Paper -->
          <div class="invoice-paper-wrapper">
            <div class="invoice-paper" id="invoicePrintTarget">
              <div class="inv-gold-bar"></div>

              <!-- Header -->
              <div class="inv-header">
                <div class="inv-brand">
                  <img src="assets/logo.jpg" alt="JK Lights" class="inv-logo-img" />
                  <div>
                    <div class="inv-brand-title">JK LIGHTS</div>
                    <div class="inv-brand-sub">Lighting & A Brighter Tomorrow</div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
                      2nd Floor, VTC Complex, Above Kabir World, Kudasan, Gandhinagar - 382421<br />
                      GSTIN: <strong>24AAACJ1234F1Z5</strong> | State: Gujarat (24) | Ph: +91 84605 76753
                    </div>
                  </div>
                </div>

                <div class="inv-doc-title">
                  <h2>TAX INVOICE</h2>
                  <div style="font-weight: 700; color: #334155; font-size: 0.95rem;">${invoice.id}</div>
                  <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">Date: ${invoice.date}</div>
                  <div style="margin-top: 6px;">
                    <span class="inv-status-pill ${statusClass}">${invoice.status}</span>
                  </div>
                </div>
              </div>

              <!-- Customer Details Grid -->
              <div class="inv-info-grid">
                <div class="inv-box">
                  <div class="inv-box-label">Billed & Scheduled To:</div>
                  <div style="font-weight: 800; font-size: 1.05rem; color: #0f172a;">${invoice.customerName}</div>
                  <div style="color: #475569; margin-top: 4px;"><strong>Phone:</strong> ${invoice.phone}</div>
                  ${invoice.address ? `<div style="color: #475569;"><strong>Site Address:</strong> ${invoice.address}</div>` : ''}
                  <div style="color: #475569;"><strong>Space / Scope:</strong> ${invoice.roomType || 'Residential Lighting'}</div>
                </div>

                <div class="inv-box">
                  <div class="inv-box-label">Showroom & Order Details:</div>
                  <div style="color: #475569;"><strong>Experience Center:</strong> Kudasan Reliance Cross Rd</div>
                  <div style="color: #475569;"><strong>Executive:</strong> Gandhinagar Lighting Architect</div>
                  <div style="color: #475569;"><strong>Warranty:</strong> 1-Year Full Certified Driver Warranty</div>
                  <div style="color: #475569;"><strong>Due Date:</strong> ${invoice.dueDate || invoice.date}</div>
                </div>
              </div>

              <!-- Line Items Table -->
              <table class="inv-table">
                <thead>
                  <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 48%;">Item Description</th>
                    <th style="width: 12%;">HSN</th>
                    <th style="width: 10%; text-align: center;">Qty</th>
                    <th style="width: 12%; text-align: right;">Rate (₹)</th>
                    <th style="width: 13%; text-align: right;">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoice.items.map((item, idx) => `
                    <tr>
                      <td>${idx + 1}</td>
                      <td>
                        <strong>${item.name}</strong>
                      </td>
                      <td>${item.hsn || '9405'}</td>
                      <td style="text-align: center;">${item.qty}</td>
                      <td style="text-align: right;">₹ ${Number(item.rate).toLocaleString('en-IN')}</td>
                      <td style="text-align: right; font-weight: 700;">₹ ${Number(item.amount).toLocaleString('en-IN')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Totals Breakdown & Terms -->
              <div class="inv-totals-grid">
                <div class="inv-terms-box">
                  <div style="font-weight: 700; margin-bottom: 4px; color: #0f172a;">Terms & Showroom Conditions:</div>
                  • All LED fixtures & chandeliers carry a 1-Year Comprehensive Warranty on drivers & structural fittings.<br />
                  • Chandelier installation includes ceiling anchor drop load testing by certified electricians.<br />
                  • Bank Details: HDFC Bank Kudasan Branch | A/C: 50200012345678 | IFSC: HDFC0001234
                </div>

                <div>
                  <table class="inv-summary-table">
                    <tr>
                      <td>Subtotal (Taxable Value):</td>
                      <td style="text-align: right; font-weight: 600;">₹ ${invoice.subtotal.toLocaleString('en-IN')}</td>
                    </tr>
                    ${invoice.cgst > 0 ? `
                      <tr>
                        <td>CGST (9.0%):</td>
                        <td style="text-align: right;">₹ ${invoice.cgst.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td>SGST (9.0%):</td>
                        <td style="text-align: right;">₹ ${invoice.sgst.toLocaleString('en-IN')}</td>
                      </tr>
                    ` : ''}
                    <tr class="total-row">
                      <td>Grand Total:</td>
                      <td style="text-align: right;">₹ ${invoice.grandTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Footer & Signature -->
              <div class="inv-footer">
                <div>
                  <strong>JK Lights Gandhinagar</strong><br />
                  This is a computer-generated tax invoice & quotation.
                </div>
                <div class="inv-signature">
                  <div class="inv-sign-line"></div>
                  <strong>Authorized Signatory</strong><br />
                  <span style="font-size: 0.7rem;">Kudasan Showroom Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      modal.classList.add('active');

      modal.querySelector('.js-close-invoice').onclick = () => {
        modal.classList.remove('active');
      };

      modal.querySelector('.js-print-invoice').onclick = () => {
        window.print();
      };

      modal.querySelector('.js-wa-invoice').onclick = () => {
        const msg = `Hello JK Lights Gandhinagar! 👋\nHere is my official invoice/estimate details:\n• Invoice No: ${invoice.id}\n• Customer: ${invoice.customerName}\n• Total Amount: ₹${invoice.grandTotal.toLocaleString('en-IN')}\nPlease confirm my booking/order!`;
        window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
      };
    },
    getWhatsAppProductUrl: (product) => {
      const store = Store.getStoreInfo();
      const msg = `Hello JK Lights Gandhinagar! 👋\nI am interested in:\n• Fixture: ${product.name}\n• Price: ₹${product.price.toLocaleString('en-IN')}\n• Code: ${product.id}\n\nPlease share live showroom availability and photos!`;
      return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(msg)}`;
    },
    getWhatsAppConsultationUrl: () => {
      const store = Store.getStoreInfo();
      const msg = `Hello JK Lights Gandhinagar! 👋\nI would like to book a Free Lighting Consultation for my space. Please connect with an expert designer.`;
      return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(msg)}`;
    }
  };

  // Expose Store globally for admin or other scripts
  window.JKStore = Store;

  // --- 3. STOREFRONT CONTROLLER ---
  let activeCategory = 'all';
  let activeRoom = 'all';
  let currentSlideIndex = 0;
  let sliderInterval = null;
  const SLIDE_DURATION = 5500;

  document.addEventListener('DOMContentLoaded', () => {
    init();

    window.addEventListener('jk_store_updated', () => {
      renderAll();
    });
  });

  function init() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      const roomParam = urlParams.get('room');
      if (catParam) activeCategory = catParam;
      if (roomParam) activeRoom = roomParam;
    } catch (e) {}

    setupNavigation();
    renderAll();
    setupSearch();
    setupBlinkAndGlow();
    setupDrawersAndModals();
    updateBadges();
  }

  function renderAll() {
    renderStoreDetails();
    renderHeroSlider();
    renderCategories();
    renderRooms();
    renderProducts();
    renderBlogs();
    renderFaqs();
    updateBadges();
  }

  // Header Details
  function renderStoreDetails() {
    const store = Store.getStoreInfo();
    const annEl = document.getElementById('announcementText');
    if (annEl) annEl.textContent = store.announcementText;

    const locEl = document.getElementById('locationTagCity');
    if (locEl) locEl.textContent = store.city;

    const addrEl = document.getElementById('showroomAddressText');
    if (addrEl) addrEl.textContent = store.address;

    const phoneEl = document.getElementById('showroomPhoneText');
    if (phoneEl) {
      phoneEl.textContent = store.phone;
      phoneEl.href = `tel:${store.phone.replace(/\s+/g, '')}`;
    }

    const hoursEl = document.getElementById('showroomHoursText');
    if (hoursEl) hoursEl.textContent = `${store.timingsWeekdays} | ${store.timingsSunday}`;

    document.querySelectorAll('.js-gmaps-link').forEach(btn => btn.href = store.gmapsQuery);

    // Dynamic Showroom Photo from Admin Settings
    if (store.showroomImage) {
      const showroomImgs = document.querySelectorAll('.about-img-main, .js-showroom-img, img[src*="showroom.jpg"]');
      showroomImgs.forEach(img => {
        img.src = store.showroomImage;
      });
    }
  }

  // Navigation & ScrollSpy
  function setupNavigation() {
    const mobileToggle = document.getElementById('btnMobileNavToggle');
    const mobileMenu = document.getElementById('mobileNavMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

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

    // ScrollSpy
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

  // Hero Slider
  function renderHeroSlider() {
    const track = document.getElementById('heroSliderTrack');
    const dotsContainer = document.getElementById('heroSliderDots');
    const prevBtn = document.getElementById('heroSliderPrev');
    const nextBtn = document.getElementById('heroSliderNext');
    const progressFill = document.getElementById('sliderProgressFill');
    const slider = document.getElementById('heroSlider');

    if (!track || !dotsContainer) return;

    const slides = Store.getSliders(true);
    if (slides.length === 0) return;

    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;

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

    dotsContainer.innerHTML = slides.map((_, idx) => `
      <button class="slider-dot ${idx === currentSlideIndex ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
    `).join('');

    track.querySelectorAll('.js-slide-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const link = btn.dataset.link;
        if (link.startsWith('modal:consultation')) {
          e.preventDefault();
          openConsultationModal();
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

    dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index, 10));
        startTimer();
      });
    });

    if (prevBtn) {
      prevBtn.onclick = () => {
        goToSlide(currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1);
        startTimer();
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        goToSlide(currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1);
        startTimer();
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

      if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        setTimeout(() => {
          progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
          progressFill.style.width = '100%';
        }, 50);
      }
    }

    function startTimer() {
      stopTimer();
      if (progressFill) {
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
      }
      sliderInterval = setInterval(() => {
        goToSlide(currentSlideIndex + 1);
      }, SLIDE_DURATION);
    }

    function stopTimer() {
      if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
      }
      if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
      }
    }

    if (slider) {
      slider.onmouseenter = stopTimer;
      slider.onmouseleave = startTimer;

      let touchStartX = 0;
      slider.ontouchstart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopTimer();
      };
      slider.ontouchend = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) goToSlide(currentSlideIndex + 1);
        else if (touchEndX - touchStartX > 50) goToSlide(currentSlideIndex - 1);
        startTimer();
      };
    }

    startTimer();
  }

  // Categories Navigation & Grid
  function renderCategories() {
    const categories = Store.getCategories();
    const subnav = document.getElementById('categorySubnav');
    if (subnav) {
      subnav.innerHTML = categories.map((cat, idx) => `
        <a href="#productsSection" class="nav-pill ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
          ${cat.name}
          ${idx === 1 ? '<span class="tag-hot">HOT</span>' : ''}
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
          subnav?.querySelectorAll('.nav-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.category === activeCategory);
          });
          renderProducts();
          document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  }

  // Rooms Grid
  function renderRooms() {
    const rooms = Store.getRooms();
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
    const waUrl = Store.getWhatsAppProductUrl(prod);

    return `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-media">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/logo.jpg'" />
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
        Store.toggleWishlist(btn.dataset.id);
        renderProducts();
        updateBadges();
        showToast('Wishlist updated ✨');
      });
    });

    container.querySelectorAll('.js-quick-view').forEach(btn => {
      btn.addEventListener('click', () => openQuickViewModal(btn.dataset.id));
    });

    container.querySelectorAll('.js-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.addToCart(btn.dataset.id, 1);
        updateBadges();
        showToast('Added to Selection Cart 🛒');
        openCartDrawer();
      });
    });
  }

  // Products Grid - Category Wise & Filtered
  function renderProducts() {
    const products = Store.getProducts();
    const categories = Store.getCategories();
    const wishlist = Store.getWishlist();
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
        const roomObj = Store.getRooms().find(r => r.id === activeRoom);
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

  // Blogs Grid & Dynamic Reader
  let activeBlogFilter = 'all';

  function renderBlogs() {
    let blogs = Store.getBlogs();
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    // Filter if on blog.html with category tabs
    if (activeBlogFilter !== 'all') {
      blogs = blogs.filter(b => (b.category || '').toLowerCase() === activeBlogFilter.toLowerCase());
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
      btn.addEventListener('click', () => openBlogModal(btn.dataset.id));
    });

    // Setup blog category filter pills if present
    document.querySelectorAll('#blogCategoryTabs [data-blog-cat]').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('#blogCategoryTabs [data-blog-cat]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeBlogFilter = btn.dataset.blogCat;
        renderBlogs();
      };
    });
  }

  function openBlogModal(blogId) {
    const blog = Store.getBlogs().find(b => b.id === blogId);
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
        <a href="https://wa.me/918460576753?text=${whatsappMessage}" target="_blank" class="btn btn-whatsapp btn-sm">
          <i class="fa-brands fa-whatsapp"></i> Chat About This Guide
        </a>
        <button class="btn btn-gold btn-sm js-open-consultation" onclick="document.getElementById('blogModal').classList.remove('active');">
          <i class="fa-regular fa-calendar-check"></i> Book Site Consultation
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

  // FAQs Accordion
  function renderFaqs() {
    const faqs = Store.getFaqs();
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
        
        container.querySelectorAll('.faq-item').forEach(it => {
          it.classList.remove('active');
          it.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
          const pane = it.querySelector('.faq-answer-pane');
          if (pane) {
            pane.style.maxHeight = '0';
            pane.style.padding = '0 24px';
          }
        });

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

  // Blink and Glow Spotlight Controller
  function setupBlinkAndGlow() {
    const dimmerSlider = document.getElementById('dimmerSlider');
    const dimmerValText = document.getElementById('dimmerValueText');
    const chandelierImg = document.getElementById('spotlightChandelier');
    const ambientGlow = document.getElementById('spotlightGlowAmbient');
    const tempBtns = document.querySelectorAll('.temp-btn');

    if (!dimmerSlider || !chandelierImg) return;

    dimmerSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (dimmerValText) dimmerValText.textContent = `${val}%`;

      const factor = val / 100;
      const glow = Math.round(20 + (val * 0.4));
      chandelierImg.style.filter = `drop-shadow(0 0 ${glow}px rgba(243, 207, 122, ${factor})) brightness(${0.6 + factor * 0.6})`;
      if (ambientGlow) {
        ambientGlow.style.opacity = (0.15 + (factor * 0.45)).toFixed(2);
        ambientGlow.style.transform = `translate(-50%, -50%) scale(${0.8 + factor * 0.4})`;
      }
    });

    tempBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tempBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const temp = btn.dataset.temp;
        if (temp === 'warm') chandelierImg.style.filter = `sepia(0.4) drop-shadow(0 0 35px rgba(243, 180, 50, 0.8))`;
        else if (temp === 'neutral') chandelierImg.style.filter = `sepia(0.1) drop-shadow(0 0 35px rgba(255, 240, 200, 0.85))`;
        else if (temp === 'cool') chandelierImg.style.filter = `hue-rotate(180deg) saturate(0.8) drop-shadow(0 0 35px rgba(180, 220, 255, 0.85))`;
      });
    });
  }

  // Search Filter
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

      const products = Store.getProducts();
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
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

  // Modals & Drawers
  function setupDrawersAndModals() {
    document.getElementById('btnWishlistDrawer')?.addEventListener('click', openWishlistDrawer);
    document.getElementById('btnCloseWishlist')?.addEventListener('click', () => {
      document.getElementById('wishlistDrawer')?.classList.remove('active');
    });

    document.getElementById('btnCartDrawer')?.addEventListener('click', openCartDrawer);
    document.getElementById('btnCloseCart')?.addEventListener('click', () => {
      document.getElementById('cartDrawer')?.classList.remove('active');
    });

    document.querySelectorAll('.js-open-consultation').forEach(btn => {
      btn.addEventListener('click', () => openConsultationModal());
    });
    document.getElementById('btnCloseConsultation')?.addEventListener('click', () => {
      document.getElementById('consultationModal')?.classList.remove('active');
    });

    const consultForm = document.getElementById('consultationForm');
    if (consultForm) {
      consultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(consultForm);
        const name = formData.get('customerName');
        const phone = formData.get('phone');
        const roomType = formData.get('roomType');
        const notes = formData.get('notes');
        const preferredDate = formData.get('preferredDate') || 'This week';

        Store.addInquiry({
          customerName: name,
          phone: phone,
          roomType: roomType,
          interest: 'Showroom Visit & Consultation',
          preferredDate: preferredDate,
          notes: notes
        });

        const invoice = Store.generateBookingInvoice({
          customerName: name,
          phone: phone,
          roomType: roomType,
          preferredDate: preferredDate,
          notes: notes
        });

        document.getElementById('consultationModal')?.classList.remove('active');
        consultForm.reset();
        showToast(`Thank you ${name}! Generating your official booking invoice PDF...`);
        
        setTimeout(() => {
          Store.openInvoiceModal(invoice);
        }, 400);
      });
    }

    document.getElementById('btnGetQuoteNav')?.addEventListener('click', () => {
      openConsultationModal('Custom Lighting Quote');
    });

    document.getElementById('btnCloseQuickView')?.addEventListener('click', () => {
      document.getElementById('quickViewModal')?.classList.remove('active');
    });
  }

  function openQuickViewModal(productId) {
    const prod = Store.getProductById(productId);
    if (!prod) return;

    const modal = document.getElementById('quickViewModal');
    const container = document.getElementById('quickViewContent');
    if (!modal || !container) return;

    const waUrl = Store.getWhatsAppProductUrl(prod);

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
            <div style="font-weight: 600; color: #fff; margin-bottom: 6px;">Technical Highlights:</div>
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
      Store.addToCart(prod.id, 1);
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

  function openVisualizerModal() {
    const modal = document.getElementById('visualizerModal');
    if (modal) modal.classList.add('active');
    document.getElementById('btnCloseVisualizerModal')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  function openWishlistDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const listEl = document.getElementById('wishlistItemsContainer');
    if (!drawer || !listEl) return;

    const wishlistIds = Store.getWishlist();
    const products = Store.getProducts().filter(p => wishlistIds.includes(p.id));

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
          <button class="btn btn-whatsapp btn-sm js-wa-click" onclick="window.open('${Store.getWhatsAppProductUrl(prod)}', '_blank')">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
          <button class="action-icon-btn danger js-remove-wishlist" data-id="${prod.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join('');

      listEl.querySelectorAll('.js-remove-wishlist').forEach(btn => {
        btn.addEventListener('click', () => {
          Store.toggleWishlist(btn.dataset.id);
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

    const cart = Store.getCart();
    const allProducts = Store.getProducts();

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
          Store.updateCartQty(btn.dataset.id, -1);
          openCartDrawer();
          updateBadges();
        });
      });

      itemsContainer.querySelectorAll('.js-cart-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          Store.updateCartQty(btn.dataset.id, 1);
          openCartDrawer();
          updateBadges();
        });
      });

      itemsContainer.querySelectorAll('.js-cart-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          Store.removeFromCart(btn.dataset.id);
          openCartDrawer();
          updateBadges();
        });
      });

      if (waCheckoutBtn) {
        const store = Store.getStoreInfo();
        const itemsList = cartItems.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.itemTotal.toLocaleString('en-IN')}`).join('\n');
        const orderMessage = `Hello JK Lights Gandhinagar! 👋\nI would like to place an inquiry/order for my selection:\n\n${itemsList}\n\n*Estimated Total: ₹${subtotal.toLocaleString('en-IN')}*\nPlease confirm showroom availability.`;
        
        waCheckoutBtn.onclick = () => {
          window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(orderMessage)}`, '_blank');
        };

        let cartPdfBtn = document.getElementById('btnCartInvoicePdf');
        if (!cartPdfBtn) {
          cartPdfBtn = document.createElement('button');
          cartPdfBtn.id = 'btnCartInvoicePdf';
          cartPdfBtn.className = 'btn btn-glass btn-sm';
          cartPdfBtn.style.cssText = 'width: 100%; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;';
          cartPdfBtn.innerHTML = '<i class="fa-solid fa-file-invoice"></i> Download GST Estimate / Invoice PDF';
          waCheckoutBtn.parentNode.insertBefore(cartPdfBtn, waCheckoutBtn.nextSibling);
        }
        cartPdfBtn.style.display = 'flex';
        cartPdfBtn.onclick = () => {
          Store.openClientDetailsModal(cart, (clientData) => {
            const inv = Store.generateBookingInvoice({
              customerName: clientData.name,
              phone: clientData.phone,
              address: clientData.address,
              roomType: clientData.roomType,
              notes: clientData.notes,
              cartItems: cart
            });
            showToast(`Official Tax Invoice generated for ${clientData.name} 📄`);
            drawer.classList.remove('active');
            setTimeout(() => {
              Store.openInvoiceModal(inv);
            }, 300);
          });
        };
      }
    }

    drawer.classList.add('active');
  }

  function updateBadges() {
    const wishlist = Store.getWishlist();
    const cart = Store.getCart();

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
})();
