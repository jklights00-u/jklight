/**
 * JK Lights - Unified Standalone Admin Controller & Invoices Studio
 * Compatible with both file:// protocol and web servers
 */
(function () {
  'use strict';

  // Seed Data Fallback if accessed directly
  const DEFAULT_STORE_INFO = {
    name: "JK Lights",
    city: "Gandhinagar, Gujarat",
    address: "1st Floor, VTC Complex, B-108, above Kabir World, Kudasan, Gandhinagar, Gujarat 382421",
    landmark: "B-108, Above Kabir World, Opp. Kanam Farm",
    phone: "+91 84605 76753",
    whatsapp: "918460576753",
    email: "contact@jklights.com",
    instagram: "https://www.instagram.com/jk_lights_gandhinagar?igsh=MXd1NG5zazA0bXY0Yw==",
    facebook: "https://www.facebook.com/jk_lights_gandhinagar",
    timingsWeekdays: "Mon - Sat: 10:00 AM - 9:30 PM",
    timingsSunday: "Sunday: 11:00 AM - 8:00 PM",
    gmapsQuery: "https://maps.google.com/?q=J+K+Lights+Gandhinagar+Kudasan",
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
      secondaryBtnLink: "https://wa.me/918460576753",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/chandelier.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
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
      image: "assets/products/double-height.jpg",
      featured: false,
      trending: true,
      inStock: true,
      badge: "43-Light Helix",
      description: "Staggered 43-drop crystal helix that captures daylight and emits brilliant warm evening light.",
      specs: { modelCode: "MH2932/1800", material: "Champagne Crystal Drops & Mirror Gold Plate", dimensions: "D1000mm x Drop 4800mm (4.8m)", lampHolder: "43x G4 LED Bulbs", finish: "Mirror Gold & Champagne Glass", voltage: "220-240V" }
    },

    // --- 3. DESIGNER WALL SCONCES ---
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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
      image: "assets/products/wall.jpg",
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

    // --- 4. HANGING PENDANTS ---
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
      image: "assets/products/pendant.jpg",
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
      image: "assets/products/pendant.jpg",
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
      image: "assets/products/pendant.jpg",
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
      image: "assets/products/table-floor.jpg",
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
      image: "assets/products/table-floor.jpg",
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
      image: "assets/products/table-floor.jpg",
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
      image: "assets/products/table-floor.jpg",
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
      image: "assets/products/table-floor.jpg",
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
      image: "assets/products/ceiling.jpg",
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
      image: "assets/products/ceiling.jpg",
      featured: false,
      trending: false,
      inStock: true,
      badge: "Sunburst",
      description: "Circular surface ceiling fixture with subtle radial halo backlighting on the ceiling surface.",
      specs: { modelCode: "JH26001", material: "Sand White Frame & Rose Gold Accents", dimensions: "D500mm x H65mm", wattageCct: "40W LED Tunable", finish: "White & Rose Gold", voltage: "220V" }
    },

    // --- 7. 48V MAGNETIC TRACK LIGHTS ---
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
      image: "assets/products/track.jpg",
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
      image: "assets/products/track.jpg",
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
      image: "assets/products/track.jpg",
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
      image: "assets/products/track.jpg",
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
      image: "assets/products/outdoor.jpg",
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
      image: "assets/products/outdoor.jpg",
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
      image: "assets/products/smart.jpg",
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

  const DEFAULT_INQUIRIES = [];
  const DEFAULT_INVOICES = [];

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

  const KEYS = {
    STORE_INFO: 'jk_lights_store_info',
    PRODUCTS: 'jk_lights_products',
    CATEGORIES: 'jk_lights_categories',
    ROOMS: 'jk_lights_rooms',
    INQUIRIES: 'jk_lights_inquiries',
    SLIDERS: 'jk_lights_sliders',
    BLOGS: 'jk_lights_blogs',
    INVOICES: 'jk_lights_invoices',
    STATS: 'jk_lights_stats'
  };

  const STORE_VERSION = 'jk_lights_v3_clean';
  try {
    const currentVer = localStorage.getItem('jk_lights_store_version');
    if (currentVer !== STORE_VERSION) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem(KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
      localStorage.setItem(KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
      localStorage.setItem(KEYS.STORE_INFO, JSON.stringify(DEFAULT_STORE_INFO));
      localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
      localStorage.setItem(KEYS.INVOICES, JSON.stringify([]));
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

  const AdminStore = {
    getStoreInfo: () => getLocal(KEYS.STORE_INFO, DEFAULT_STORE_INFO),
    updateStoreInfo: (info) => {
      const current = AdminStore.getStoreInfo();
      const updated = { ...current, ...info };
      setLocal(KEYS.STORE_INFO, updated);
      return updated;
    },
    getCategories: () => getLocal(KEYS.CATEGORIES, DEFAULT_CATEGORIES),
    getCategoryById: (id) => AdminStore.getCategories().find(c => c.id === id),
    saveCategory: (catData) => {
      const categories = AdminStore.getCategories();
      const cleanId = (catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).toLowerCase();
      const targetId = catData.origId || cleanId;
      let updated;
      if (categories.some(c => c.id === targetId || c.id === cleanId)) {
        updated = categories.map(c => (c.id === targetId || c.id === cleanId) ? { ...c, ...catData, id: cleanId } : c);
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
      if (id === 'all') return AdminStore.getCategories();
      const categories = AdminStore.getCategories();
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
    getProductById: (id) => AdminStore.getProducts().find(p => p.id === id),
    saveProduct: (prod) => {
      const list = AdminStore.getProducts();
      let updated;
      if (prod.id) {
        updated = list.map(p => p.id === prod.id ? { ...p, ...prod } : p);
      } else {
        const newProd = {
          ...prod,
          id: 'prod-' + Date.now(),
          rating: 5.0,
          reviewsCount: 1,
          trending: prod.trending !== false,
          inStock: prod.inStock !== false
        };
        updated = [newProd, ...list];
      }
      setLocal(KEYS.PRODUCTS, updated);
      return updated;
    },
    deleteProduct: (id) => {
      const list = AdminStore.getProducts();
      const updated = list.filter(p => p.id !== id);
      setLocal(KEYS.PRODUCTS, updated);
      return updated;
    },
    toggleProductStock: (id) => {
      const list = AdminStore.getProducts();
      const updated = list.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
      setLocal(KEYS.PRODUCTS, updated);
      return updated;
    },
    getSliders: () => {
      const sliders = getLocal(KEYS.SLIDERS, DEFAULT_SLIDERS);
      return [...sliders].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
    },
    getSliderById: (id) => AdminStore.getSliders().find(s => s.id === id),
    saveSlider: (slideData) => {
      const sliders = AdminStore.getSliders();
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
      const sliders = AdminStore.getSliders();
      const updated = sliders.filter(s => s.id !== id);
      setLocal(KEYS.SLIDERS, updated);
      return updated;
    },
    toggleSliderActive: (id) => {
      const sliders = AdminStore.getSliders();
      const updated = sliders.map(s => s.id === id ? { ...s, active: !s.active } : s);
      setLocal(KEYS.SLIDERS, updated);
      return updated;
    },
    getBlogs: () => getLocal(KEYS.BLOGS, DEFAULT_BLOGS),
    getBlogById: (id) => AdminStore.getBlogs().find(b => b.id === id),
    saveBlog: (blogData) => {
      const blogs = AdminStore.getBlogs();
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
      setLocal(KEYS.BLOGS, updated);
      return updated;
    },
    deleteBlog: (id) => {
      const blogs = AdminStore.getBlogs();
      const updated = blogs.filter(b => b.id !== id);
      setLocal(KEYS.BLOGS, updated);
      return updated;
    },
    getInquiries: () => getLocal(KEYS.INQUIRIES, DEFAULT_INQUIRIES),
    updateInquiryStatus: (id, status) => {
      const inqs = AdminStore.getInquiries();
      const updated = inqs.map(i => i.id === id ? { ...i, status } : i);
      setLocal(KEYS.INQUIRIES, updated);
      return updated;
    },
    deleteInquiry: (id) => {
      const inqs = AdminStore.getInquiries();
      const updated = inqs.filter(i => i.id !== id);
      setLocal(KEYS.INQUIRIES, updated);
      return updated;
    },
    getInvoices: () => getLocal(KEYS.INVOICES, DEFAULT_INVOICES),
    getInvoiceById: (id) => AdminStore.getInvoices().find(i => i.id === id),
    saveInvoice: (inv) => {
      const invoices = AdminStore.getInvoices();
      let updated;
      if (inv.id && invoices.some(i => i.id === inv.id)) {
        updated = invoices.map(i => i.id === inv.id ? { ...i, ...inv } : i);
      } else {
        const newInv = {
          ...inv,
          id: inv.id || `JK-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          date: inv.date || new Date().toISOString().split('T')[0]
        };
        updated = [newInv, ...invoices];
      }
      setLocal(KEYS.INVOICES, updated);
      return updated;
    },
    deleteInvoice: (id) => {
      const invoices = AdminStore.getInvoices();
      const updated = invoices.filter(i => i.id !== id);
      setLocal(KEYS.INVOICES, updated);
      return updated;
    },
    resetDefaults: () => {
      setLocal(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      setLocal(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
      setLocal(KEYS.ROOMS, DEFAULT_ROOMS);
      setLocal(KEYS.STORE_INFO, DEFAULT_STORE_INFO);
      setLocal(KEYS.SLIDERS, DEFAULT_SLIDERS);
      setLocal(KEYS.BLOGS, DEFAULT_BLOGS);
      setLocal(KEYS.INQUIRIES, DEFAULT_INQUIRIES);
      setLocal(KEYS.INVOICES, DEFAULT_INVOICES);
      localStorage.setItem('jk_lights_store_version', STORE_VERSION);
    }
  };

  let currentEditingProductId = null;
  let currentEditingSlideId = null;
  let currentEditingCategoryId = null;
  let currentEditingBlogId = null;

  const ADMIN_SECRET_KEY = 'Jigo$9094Pagal';
  const AUTH_STORAGE_KEY = 'jk_lights_admin_auth_v1';

  function isUserAuthenticated() {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'granted';
  }

  function setupAdminAuthentication() {
    const lockScreen = document.getElementById('adminLockScreen');
    const lockCard = document.getElementById('adminLockCard');
    const form = document.getElementById('adminLoginForm');
    const input = document.getElementById('adminPasswordInput');
    const toggleBtn = document.getElementById('btnTogglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const errorMsg = document.getElementById('lockErrorMsg');
    const errorText = document.getElementById('lockErrorText');
    const logoutBtn = document.getElementById('btnAdminLogout');

    if (!lockScreen) return;

    // Check if already authenticated in this session
    if (isUserAuthenticated()) {
      lockScreen.classList.add('hidden');
    } else {
      lockScreen.classList.remove('hidden');
      setTimeout(() => input?.focus(), 200);
    }

    // Toggle show/hide password
    toggleBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye-slash';
      } else {
        input.type = 'password';
        if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
      }
    });

    function validateAndUnlock() {
      const entered = (input?.value || '').trim();
      const validPasswords = ['Jigo$9094Pagal', 'jigo$9094pagal', 'Jigo$9094pagal', 'JIGO$9094PAGAL'];

      if (validPasswords.includes(entered)) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'granted');
        if (errorMsg) errorMsg.classList.remove('visible');
        lockScreen.classList.add('hidden');
        if (input) input.value = '';
        showToast('Access Granted! Welcome to JK Lights Admin Portal 👑');
        renderDashboard();
        renderInvoicesTable();
      } else {
        if (errorMsg) {
          if (errorText) errorText.textContent = entered ? 'Incorrect Password! Access Denied.' : 'Please enter the admin password.';
          errorMsg.classList.add('visible');
        }
        if (lockCard) {
          lockCard.classList.remove('shake-effect');
          void lockCard.offsetWidth; // trigger reflow
          lockCard.classList.add('shake-effect');
        }
        input?.focus();
        input?.select();
      }
    }

    // Form submit & unlock button
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      validateAndUnlock();
    });

    const unlockBtn = document.getElementById('btnUnlockAdmin');
    unlockBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      validateAndUnlock();
    });

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateAndUnlock();
      }
    });

    // Logout / Lock
    logoutBtn?.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      lockScreen.classList.remove('hidden');
      if (input) {
        input.value = '';
        input.focus();
      }
      if (errorMsg) errorMsg.classList.remove('visible');
      showToast('Admin session locked 🔒');
    });
  }

  function startAdminApp() {
    initAdmin();
    window.addEventListener('jk_store_updated', () => {
      try { renderDashboard(); } catch (e) {}
      try { renderInvoicesTable(); } catch (e) {}
      try { renderProductsTable(); } catch (e) {}
      try { renderCategoriesTable(); } catch (e) {}
      try { renderSlidersTable(); } catch (e) {}
      try { renderBlogsTable(); } catch (e) {}
      try { renderInquiriesTable(); } catch (e) {}
      try { loadSettingsForm(); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAdminApp);
  } else {
    startAdminApp();
  }

  function initAdmin() {
    try { setupAdminAuthentication(); } catch (e) { console.error('Auth setup error:', e); }
    try { setupSidebarTabs(); } catch (e) { console.error('Tabs setup error:', e); }
    try { renderDashboard(); } catch (e) { console.error('Dashboard render error:', e); }
    try { renderInvoicesTable(); } catch (e) { console.error('Invoices render error:', e); }
    try { renderProductsTable(); } catch (e) { console.error('Products render error:', e); }
    try { renderCategoriesTable(); } catch (e) { console.error('Categories render error:', e); }
    try { renderSlidersTable(); } catch (e) { console.error('Sliders render error:', e); }
    try { renderBlogsTable(); } catch (e) { console.error('Blogs render error:', e); }
    try { renderInquiriesTable(); } catch (e) { console.error('Inquiries render error:', e); }
    try { loadSettingsForm(); } catch (e) { console.error('Settings load error:', e); }
    try { setupProductModal(); } catch (e) { console.error('Product modal setup error:', e); }
    try { setupCategoryModal(); } catch (e) { console.error('Category modal setup error:', e); }
    try { setupSliderModal(); } catch (e) { console.error('Slider modal setup error:', e); }
    try { setupBlogModal(); } catch (e) { console.error('Blog modal setup error:', e); }
    try { setupBlogSearchAndFilter(); } catch (e) { console.error('Blog search error:', e); }
    try { setupManualInvoiceModal(); } catch (e) { console.error('Manual invoice modal error:', e); }
    try { setupSettingsForm(); } catch (e) { console.error('Settings form error:', e); }
    try { setupGlobalActions(); } catch (e) { console.error('Global actions error:', e); }
    try { setupUniversalModalHandlers(); } catch (e) { console.error('Universal modal error:', e); }
  }

  // Universal Modal Handlers (Close buttons, backdrop click, Escape key)
  function setupUniversalModalHandlers() {
    // 1. All close button elements (.modal-close-btn)
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('active');
      };
    });

    // 2. All cancel buttons across all modals
    document.querySelectorAll('.modal-backdrop button').forEach(btn => {
      const text = btn.textContent.trim().toLowerCase();
      if (text === 'cancel' || text === 'close preview' || text === 'close') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const modal = btn.closest('.modal-backdrop');
          if (modal) modal.classList.remove('active');
        });
      }
    });

    // 3. Click on backdrop to close
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });

    // 4. Escape key closes active modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
      }
    });
  }

  // Tabs
  function setupSidebarTabs() {
    const items = document.querySelectorAll('.admin-menu-item');
    const panels = document.querySelectorAll('.admin-view-panel');

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = item.dataset.target;
        items.forEach(m => m.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  }

  // 1. Dashboard
  function renderDashboard() {
    const products = AdminStore.getProducts();
    const inquiries = AdminStore.getInquiries();
    const invoices = AdminStore.getInvoices();

    const totalInvoiced = invoices.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0);
    const activeLeads = inquiries.filter(i => i.status !== 'Closed').length;

    const invoicedEl = document.getElementById('metricTotalInvoiced');
    if (invoicedEl) invoicedEl.textContent = `₹ ${totalInvoiced.toLocaleString('en-IN')}`;

    const prodCountEl = document.getElementById('metricTotalProducts');
    if (prodCountEl) prodCountEl.textContent = products.length;

    const leadsCountEl = document.getElementById('metricActiveInquiries');
    if (leadsCountEl) leadsCountEl.textContent = activeLeads;

    const recentTbody = document.getElementById('recentInquiriesTableBody');
    if (recentTbody) {
      const rec = inquiries.slice(0, 5);
      if (rec.length === 0) {
        recentTbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No customer inquiries yet.</td></tr>`;
      } else {
        recentTbody.innerHTML = rec.map(inq => {
          const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, '') : '918460576753';
          return `
            <tr>
              <td><strong>${inq.customerName}</strong><div style="font-size: 0.78rem; color: var(--text-secondary);">${inq.phone}</div></td>
              <td>${inq.roomType || 'General'}</td>
              <td>${inq.dateSubmitted}</td>
              <td><span class="status-badge ${inq.status.toLowerCase().replace(/\s+/g, '')}">${inq.status}</span></td>
              <td>
                <a href="https://wa.me/${cleanPhone}" target="_blank" class="action-icon-btn" title="Chat on WhatsApp">
                  <i class="fa-brands fa-whatsapp" style="color: var(--whatsapp);"></i>
                </a>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // 2. Invoices & Billing Table
  function renderInvoicesTable() {
    const invoices = AdminStore.getInvoices();
    const tbody = document.getElementById('invoicesTableBody');
    const searchInput = document.getElementById('invoiceSearchInput');
    const statusFilter = document.getElementById('invoiceStatusFilter');
    if (!tbody) return;

    // Update Invoice Metrics
    const totalCount = invoices.length;
    let paidAmt = 0;
    let pendingAmt = 0;

    invoices.forEach(inv => {
      const gt = Number(inv.grandTotal) || 0;
      if (inv.statusType === 'paid' || inv.status.toLowerCase().includes('paid in full')) {
        paidAmt += gt;
      } else {
        pendingAmt += gt;
      }
    });

    const cntEl = document.getElementById('invMetricCount');
    if (cntEl) cntEl.textContent = totalCount;
    const paidEl = document.getElementById('invMetricPaid');
    if (paidEl) paidEl.textContent = `₹ ${paidAmt.toLocaleString('en-IN')}`;
    const pendEl = document.getElementById('invMetricPending');
    if (pendEl) pendEl.textContent = `₹ ${pendingAmt.toLocaleString('en-IN')}`;

    let q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let filterStatus = statusFilter ? statusFilter.value : 'all';

    let list = invoices.filter(inv => {
      const matchQ = (inv.id && inv.id.toLowerCase().includes(q)) || 
                     (inv.customerName && inv.customerName.toLowerCase().includes(q)) ||
                     (inv.phone && inv.phone.toLowerCase().includes(q));
      let matchS = true;
      if (filterStatus === 'paid') matchS = inv.statusType === 'paid' || inv.status.toLowerCase().includes('paid');
      else if (filterStatus === 'advance') matchS = inv.statusType === 'advance' || inv.status.toLowerCase().includes('advance');
      else if (filterStatus === 'estimate') matchS = inv.statusType === 'estimate' || inv.status.toLowerCase().includes('estimate');

      return matchQ && matchS;
    });

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No invoices found. Click "Create Manual Invoice" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(inv => {
      const cleanPhone = inv.phone ? inv.phone.replace(/[^0-9]/g, '') : '918460576753';
      const statusClass = inv.statusType || (inv.status.toLowerCase().includes('paid') ? 'paid' : (inv.status.toLowerCase().includes('advance') ? 'advance' : 'estimate'));

      return `
        <tr>
          <td>
            <strong style="color: var(--gold-400); font-family: monospace;">${inv.id}</strong>
          </td>
          <td>
            <div style="font-weight: 600; color: #fff;">${inv.customerName}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">${inv.phone}</div>
          </td>
          <td>${inv.date}</td>
          <td>${inv.roomType || 'Lighting Collection'}</td>
          <td>
            <strong style="color: #fff; font-size: 1rem;">₹ ${(Number(inv.grandTotal) || 0).toLocaleString('en-IN')}</strong>
          </td>
          <td>
            <span class="inv-status-pill ${statusClass}">${inv.status}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn btn-gold btn-sm js-view-invoice-pdf" data-id="${inv.id}" title="View & Download PDF">
                <i class="fa-solid fa-file-pdf"></i> PDF
              </button>
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${inv.customerName}! Here is your JK Lights invoice ${inv.id} for ₹${Number(inv.grandTotal).toLocaleString('en-IN')}. Thank you!`)}" target="_blank" class="action-icon-btn" title="Send on WhatsApp">
                <i class="fa-brands fa-whatsapp" style="color: var(--whatsapp);"></i>
              </a>
              <button class="action-icon-btn danger js-delete-invoice" data-id="${inv.id}" title="Delete Invoice">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.js-view-invoice-pdf').forEach(btn => {
      btn.addEventListener('click', () => {
        const inv = AdminStore.getInvoiceById(btn.dataset.id);
        if (inv) openInvoiceModal(inv);
      });
    });

    tbody.querySelectorAll('.js-delete-invoice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this invoice record?')) {
          AdminStore.deleteInvoice(btn.dataset.id);
          renderInvoicesTable();
          renderDashboard();
          showToast('Invoice deleted');
        }
      });
    });

    if (searchInput) searchInput.oninput = () => renderInvoicesTable();
    if (statusFilter) statusFilter.onchange = () => renderInvoicesTable();
  }

  // 3. Manual Invoice Creation Studio Modal
  function setupManualInvoiceModal() {
    const modal = document.getElementById('manualInvoiceModal');
    const openBtn = document.getElementById('btnCreateManualInvoice');
    const closeBtn = document.getElementById('btnCloseManualInvoiceModal');
    const cancelBtn = document.getElementById('btnCancelManualInvoice');
    const form = document.getElementById('manualInvoiceForm');
    const addRowBtn = document.getElementById('btnAddLineItem');
    const container = document.getElementById('manualLineItemsContainer');

    if (!modal || !form || !container) return;

    const products = AdminStore.getProducts();

    function createLineItemRow(item = {}) {
      const row = document.createElement('div');
      row.className = 'line-item-row';
      row.innerHTML = `
        <div>
          <input type="text" class="form-control js-item-name" placeholder="Fixture Name / Custom Model" value="${item.name || ''}" list="productsDatalist" required />
        </div>
        <div>
          <input type="number" class="form-control js-item-qty" placeholder="Qty" value="${item.qty || 1}" min="1" required />
        </div>
        <div>
          <input type="number" class="form-control js-item-rate" placeholder="Rate (₹)" value="${item.rate || 1999}" min="0" required />
        </div>
        <div>
          <input type="number" class="form-control js-item-discount" placeholder="Disc (₹)" value="${item.discount || 0}" min="0" />
        </div>
        <div>
          <input type="number" class="form-control js-item-amount" placeholder="Amount (₹)" value="${item.amount || 1999}" readonly style="background: rgba(255,255,255,0.02); font-weight: 700; color: var(--gold-400);" />
        </div>
        <div>
          <button type="button" class="action-icon-btn danger js-remove-row" title="Remove Item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      row.querySelector('.js-remove-row').onclick = () => {
        if (container.querySelectorAll('.line-item-row').length > 1) {
          row.remove();
          recalcTotals();
        } else {
          showToast('At least 1 fixture item is required');
        }
      };

      row.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', () => {
          const qty = Number(row.querySelector('.js-item-qty').value) || 1;
          const rate = Number(row.querySelector('.js-item-rate').value) || 0;
          const disc = Number(row.querySelector('.js-item-discount').value) || 0;
          const amt = Math.max(0, (qty * rate) - disc);
          row.querySelector('.js-item-amount').value = amt;
          recalcTotals();
        });
      });

      container.appendChild(row);
      recalcTotals();
    }

    function recalcTotals() {
      let subtotal = 0;
      container.querySelectorAll('.line-item-row').forEach(r => {
        const amt = Number(r.querySelector('.js-item-amount').value) || 0;
        subtotal += amt;
      });

      const cgst = subtotal * 0.09;
      const sgst = subtotal * 0.09;
      const grandTotal = Math.round(subtotal + cgst + sgst);

      document.getElementById('calcSubtotalText').textContent = `₹ ${subtotal.toLocaleString('en-IN')}`;
      document.getElementById('calcCgstText').textContent = `₹ ${cgst.toFixed(2)}`;
      document.getElementById('calcSgstText').textContent = `₹ ${sgst.toFixed(2)}`;
      document.getElementById('calcGrandTotalText').textContent = `₹ ${grandTotal.toLocaleString('en-IN')}`;
    }

    // Add Datalist for fast autocomplete
    let datalist = document.getElementById('productsDatalist');
    if (!datalist) {
      datalist = document.createElement('datalist');
      datalist.id = 'productsDatalist';
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = `${p.name} (₹${p.price})`;
        datalist.appendChild(opt);
      });
      document.body.appendChild(datalist);
    }

    openBtn?.addEventListener('click', () => {
      form.reset();
      container.innerHTML = '';
      document.getElementById('manualInvIdInput').value = `JK-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      document.getElementById('manualInvDateInput').value = new Date().toISOString().split('T')[0];

      // Add default 2 rows
      createLineItemRow({ name: "Royal Crystal Grand Chandelier (18-Light E14)", qty: 1, rate: 24999, discount: 0, amount: 24999 });
      createLineItemRow({ name: "Dual Beam Luxury Wall Sconce (CREE LED)", qty: 2, rate: 1999, discount: 0, amount: 3998 });

      modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));
    addRowBtn?.addEventListener('click', () => createLineItemRow());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const items = [];
      let subtotal = 0;
      container.querySelectorAll('.line-item-row').forEach(r => {
        const name = r.querySelector('.js-item-name').value;
        const qty = Number(r.querySelector('.js-item-qty').value) || 1;
        const rate = Number(r.querySelector('.js-item-rate').value) || 0;
        const discount = Number(r.querySelector('.js-item-discount').value) || 0;
        const amount = Number(r.querySelector('.js-item-amount').value) || 0;
        subtotal += amount;
        items.push({ name, hsn: '9405', qty, rate, discount, amount });
      });

      const cgst = subtotal * 0.09;
      const sgst = subtotal * 0.09;
      const grandTotal = Math.round(subtotal + cgst + sgst);
      const statusVal = formData.get('status');
      let statusType = 'estimate';
      if (statusVal.includes('Paid')) statusType = 'paid';
      else if (statusVal.includes('Advance')) statusType = 'advance';

      const invoiceData = {
        id: formData.get('invoiceId') || `JK-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: formData.get('invoiceDate') || new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        customerName: formData.get('customerName'),
        phone: formData.get('phone'),
        address: formData.get('address') || 'Kudasan, Gandhinagar',
        roomType: formData.get('roomType') || 'Showroom Lighting Selection',
        status: statusVal,
        statusType: statusType,
        items: items,
        subtotal: subtotal,
        cgst: Number(cgst.toFixed(2)),
        sgst: Number(sgst.toFixed(2)),
        grandTotal: grandTotal,
        notes: formData.get('notes') || 'Includes 1-Year Comprehensive Warranty & Certified Installation Support.'
      };

      AdminStore.saveInvoice(invoiceData);
      modal.classList.remove('active');
      renderInvoicesTable();
      renderDashboard();
      showToast('Invoice generated and saved successfully! 📄');

      setTimeout(() => {
        openInvoiceModal(invoiceData);
      }, 300);
    });
  }

  // 4. Modal for Invoice Printing / PDF Download
  function openInvoiceModal(invoice) {
    let modal = document.getElementById('adminInvoiceModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'adminInvoiceModal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const store = AdminStore.getStoreInfo();
    const statusClass = invoice.statusType || (invoice.status.toLowerCase().includes('paid') ? 'paid' : (invoice.status.toLowerCase().includes('advance') ? 'advance' : 'estimate'));

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
                    1st Floor, VTC Complex, B-108, above Kabir World, Kudasan, Gandhinagar, Gujarat 382421<br />
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
                    <td style="text-align: right; font-weight: 600;">₹ ${(Number(invoice.subtotal) || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  ${invoice.cgst > 0 ? `
                    <tr>
                      <td>CGST (9.0%):</td>
                      <td style="text-align: right;">₹ ${(Number(invoice.cgst) || 0).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td>SGST (9.0%):</td>
                      <td style="text-align: right;">₹ ${(Number(invoice.sgst) || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  ` : ''}
                  <tr class="total-row">
                    <td>Grand Total:</td>
                    <td style="text-align: right;">₹ ${(Number(invoice.grandTotal) || 0).toLocaleString('en-IN')}</td>
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
      const msg = `Hello JK Lights Gandhinagar! 👋\nHere is the official invoice/estimate details:\n• Invoice No: ${invoice.id}\n• Customer: ${invoice.customerName}\n• Total Amount: ₹${(Number(invoice.grandTotal) || 0).toLocaleString('en-IN')}\nThank you!`;
      window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    };
  }

  // 5. Products Catalog Table
  let currentAdminCatFilter = 'all';

  function renderAdminCategoryTabs() {
    const categories = AdminStore.getCategories();
    const products = AdminStore.getProducts();
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
    const products = AdminStore.getProducts();
    const tbody = document.getElementById('productsTableBody');
    const searchInput = document.getElementById('productSearchInput');
    const catFilter = document.getElementById('productCategoryFilter');
    if (!tbody) return;

    renderAdminCategoryTabs();

    let q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let filterCat = catFilter ? catFilter.value : currentAdminCatFilter;
    currentAdminCatFilter = filterCat;

    let list = products.filter(p => {
      const matchQ = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.badge && p.badge.toLowerCase().includes(q));
      const matchC = filterCat === 'all' || p.category === filterCat;
      return matchQ && matchC;
    });

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No fixtures match criteria in this category.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(prod => `
      <tr>
        <td>
          <div class="product-thumb-cell">
            <img src="${prod.image}" alt="${prod.name}" class="product-thumb-img" onerror="this.src='assets/products/chandelier.jpg'" />
            <div>
              <div style="font-weight: 600; color: #fff;">${prod.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">ID: ${prod.id} • ${prod.specs?.modelCode || prod.category}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--gold-400);">₹ ${prod.price.toLocaleString('en-IN')}</div>
          ${prod.originalPrice ? `<div style="font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through;">₹ ${prod.originalPrice.toLocaleString('en-IN')} (${prod.discount || ''})</div>` : ''}
        </td>
        <td>
          <span class="stock-toggle ${prod.inStock ? 'in-stock' : 'out-stock'} js-toggle-stock" data-id="${prod.id}" title="Click to toggle stock status">
            ● ${prod.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </td>
        <td><span class="status-badge" style="background: rgba(212, 175, 55, 0.1); border: 1px solid var(--gold-border); color: var(--gold-300); text-transform: capitalize;">${prod.category}</span></td>
        <td>${prod.badge ? `<span class="status-badge new">${prod.badge}</span>` : '<span style="color: var(--text-muted);">-</span>'}</td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn js-edit-product" data-id="${prod.id}" title="Edit Fixture"><i class="fa-solid fa-pen"></i></button>
            <button class="action-icon-btn danger js-delete-product" data-id="${prod.id}" title="Delete Fixture"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.js-toggle-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        AdminStore.toggleProductStock(btn.dataset.id);
        renderProductsTable();
        showToast('Stock status updated');
      });
    });

    tbody.querySelectorAll('.js-edit-product').forEach(btn => {
      btn.addEventListener('click', () => openProductModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.js-delete-product').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this fixture?')) {
          AdminStore.deleteProduct(btn.dataset.id);
          renderProductsTable();
          renderDashboard();
          showToast('Product fixture deleted');
        }
      });
    });

    if (searchInput) searchInput.oninput = () => renderProductsTable();
    if (catFilter) catFilter.onchange = () => {
      currentAdminCatFilter = catFilter.value;
      renderProductsTable();
    };
  }

  function populateCategoryDropdowns() {
    const categories = AdminStore.getCategories();
    const productCatSelect = document.querySelector('#productForm select[name="category"]');
    if (productCatSelect) {
      const currentVal = productCatSelect.value;
      productCatSelect.innerHTML = categories.filter(c => c.id !== 'all').map(c => `
        <option value="${c.id}">${c.name} (${c.id})</option>
      `).join('');
      if (currentVal) productCatSelect.value = currentVal;
    }

    const filterSelect = document.getElementById('productCategoryFilter');
    if (filterSelect) {
      const currentFilter = filterSelect.value;
      filterSelect.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.filter(c => c.id !== 'all').map(c => `
          <option value="${c.id}">${c.name}</option>
        `).join('')}
      `;
      if (currentFilter) filterSelect.value = currentFilter;
    }
  }

  function setupProductModal() {
    const modal = document.getElementById('productModal');
    const openBtn = document.getElementById('btnAddNewProduct');
    const closeBtn = document.getElementById('btnCloseProductModal');
    const cancelBtn = document.getElementById('btnCancelProductModal');
    const form = document.getElementById('productForm');
    const imgInput = document.getElementById('productModalImageInput');
    const fileInput = document.getElementById('productModalFileInput');
    const imgPreview = document.getElementById('productModalImgPreview');
    const imgPathText = document.getElementById('productModalImgPathText');

    if (!modal || !form) return;

    populateCategoryDropdowns();

    function updatePreview(url) {
      const fallback = 'assets/products/chandelier-imperial-crown.jpg';
      const finalUrl = url || fallback;
      if (imgPreview) imgPreview.src = finalUrl;
      if (imgPathText) imgPathText.textContent = url ? (url.startsWith('data:') ? 'Custom Uploaded Photo' : url) : fallback;
    }

    imgInput?.addEventListener('input', () => updatePreview(imgInput.value));

    // Manual File Upload with FileReader (Base64)
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          const dataUrl = re.target.result;
          if (imgInput) imgInput.value = dataUrl;
          updatePreview(dataUrl);
          showToast('Product photo uploaded successfully! 📸');
        };
        reader.readAsDataURL(file);
      }
    });

    // Preset pills handler
    modal.querySelectorAll('.js-img-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        if (imgInput) {
          imgInput.value = btn.dataset.src;
          updatePreview(btn.dataset.src);
        }
      });
    });

    // Auto-calculate discount tag
    const priceInput = form.elements['price'];
    const origPriceInput = form.elements['originalPrice'];
    const discountInput = form.elements['discount'];

    function calcDiscount() {
      const p = Number(priceInput?.value) || 0;
      const op = Number(origPriceInput?.value) || 0;
      if (op > p && p > 0 && discountInput && !discountInput.dataset.manual) {
        const pct = Math.round(((op - p) / op) * 100);
        discountInput.value = `${pct}% OFF`;
      }
    }

    priceInput?.addEventListener('input', calcDiscount);
    origPriceInput?.addEventListener('input', calcDiscount);

    openBtn?.addEventListener('click', () => {
      currentEditingProductId = null;
      document.getElementById('productModalTitle').textContent = 'Add New Lighting Fixture';
      form.reset();
      populateCategoryDropdowns();
      if (imgInput) imgInput.value = 'assets/products/chandelier-imperial-crown.jpg';
      if (form.elements['category']) form.elements['category'].value = 'chandeliers';
      if (form.elements['room']) form.elements['room'].value = 'living';
      if (form.elements['price']) form.elements['price'].value = '24999';
      if (form.elements['originalPrice']) form.elements['originalPrice'].value = '34999';
      if (form.elements['discount']) form.elements['discount'].value = '28% OFF';
      if (form.elements['inStock']) form.elements['inStock'].checked = true;
      if (form.elements['trending']) form.elements['trending'].checked = true;
      updatePreview('assets/products/chandelier-imperial-crown.jpg');
      modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const prodData = {
        name: (formData.get('name') || '').trim(),
        category: formData.get('category') || 'chandeliers',
        room: formData.get('room') || 'living',
        price: Number(formData.get('price')) || 0,
        originalPrice: formData.get('originalPrice') ? Number(formData.get('originalPrice')) : null,
        discount: (formData.get('discount') || '').trim(),
        badge: (formData.get('badge') || '').trim(),
        image: (formData.get('image') || 'assets/products/chandelier-imperial-crown.jpg').trim(),
        description: (formData.get('description') || '').trim(),
        inStock: formData.get('inStock') === 'on',
        trending: formData.get('trending') === 'on'
      };

      if (currentEditingProductId) {
        prodData.id = currentEditingProductId;
      }

      AdminStore.saveProduct(prodData);
      modal.classList.remove('active');
      renderProductsTable();
      renderCategoriesTable();
      renderDashboard();
      showToast(currentEditingProductId ? 'Fixture updated successfully' : 'New fixture added to catalog');
    });
  }

  function openProductModal(id) {
    const prod = AdminStore.getProductById(id);
    if (!prod) return;

    currentEditingProductId = id;
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const imgPreview = document.getElementById('productModalImgPreview');
    const imgPathText = document.getElementById('productModalImgPathText');
    document.getElementById('productModalTitle').textContent = 'Edit Lighting Fixture';

    populateCategoryDropdowns();

    if (form.elements['name']) form.elements['name'].value = prod.name || '';
    if (form.elements['category']) form.elements['category'].value = prod.category || 'chandeliers';
    if (form.elements['room']) form.elements['room'].value = prod.room || 'living';
    if (form.elements['price']) form.elements['price'].value = prod.price || 0;
    if (form.elements['originalPrice']) form.elements['originalPrice'].value = prod.originalPrice || '';
    if (form.elements['discount']) form.elements['discount'].value = prod.discount || '';
    if (form.elements['badge']) form.elements['badge'].value = prod.badge || '';
    if (form.elements['image']) form.elements['image'].value = prod.image || 'assets/products/chandelier-imperial-crown.jpg';
    if (form.elements['description']) form.elements['description'].value = prod.description || '';
    if (form.elements['inStock']) form.elements['inStock'].checked = prod.inStock !== false;
    if (form.elements['trending']) form.elements['trending'].checked = prod.trending !== false;

    if (imgPreview) imgPreview.src = prod.image || 'assets/products/chandelier-imperial-crown.jpg';
    if (imgPathText) imgPathText.textContent = prod.image ? (prod.image.startsWith('data:') ? 'Custom Uploaded Photo' : prod.image) : '';

    modal.classList.add('active');
  }

  // 6. Categories Management (CRUD)
  function renderCategoriesTable() {
    const categories = AdminStore.getCategories();
    const products = AdminStore.getProducts();
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;

    if (categories.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No categories found. Click "Add New Category" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = categories.map(cat => {
      const isAll = cat.id === 'all';
      const count = isAll ? products.length : products.filter(p => p.category === cat.id).length;

      return `
        <tr>
          <td>
            <div class="cat-thumb-cell">
              <img src="${cat.icon || 'assets/products/chandelier-imperial-crown.jpg'}" alt="${cat.name}" class="cat-thumb-img" onerror="this.src='assets/products/chandelier.jpg'" />
              <div>
                <strong style="color: #fff; font-size: 0.95rem;">${cat.name}</strong>
              </div>
            </div>
          </td>
          <td>
            <div style="font-weight: 600; color: #fff;">${cat.name}</div>
            ${isAll ? '<span style="font-size: 0.72rem; color: var(--gold-400);">(System Default)</span>' : ''}
          </td>
          <td>
            <span class="cat-slug-badge">${cat.id}</span>
          </td>
          <td>
            <span class="status-badge" style="background: rgba(212, 175, 55, 0.1); border: 1px solid var(--gold-border); color: var(--gold-300);">
              ${count} ${count === 1 ? 'Fixture' : 'Fixtures'}
            </span>
          </td>
          <td>
            <div style="font-size: 0.82rem; color: var(--text-secondary); max-width: 260px; line-height: 1.4;">
              ${cat.desc || 'Luxury collection for architectural spaces.'}
            </div>
          </td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn js-edit-category" data-id="${cat.id}" title="Edit Category">
                <i class="fa-solid fa-pen"></i>
              </button>
              ${!isAll ? `
                <button class="action-icon-btn danger js-delete-category" data-id="${cat.id}" title="Delete Category">
                  <i class="fa-solid fa-trash"></i>
                </button>
              ` : '<span style="color: var(--text-muted); font-size: 0.75rem; padding: 4px 8px;">Default</span>'}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.js-edit-category').forEach(btn => {
      btn.addEventListener('click', () => openCategoryModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.js-delete-category').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.id;
        const linkedCount = products.filter(p => p.category === catId).length;
        const warning = linkedCount > 0 
          ? `This category currently has ${linkedCount} fixture(s) linked to it. Are you sure you want to delete it?`
          : `Are you sure you want to delete category "${catId}"?`;
        
        if (confirm(warning)) {
          AdminStore.deleteCategory(catId);
          renderCategoriesTable();
          renderProductsTable();
          populateCategoryDropdowns();
          showToast('Category deleted successfully');
        }
      });
    });
  }

  function setupCategoryModal() {
    const modal = document.getElementById('categoryModal');
    const openBtn = document.getElementById('btnAddNewCategory');
    const closeBtn = document.getElementById('btnCloseCategoryModal');
    const cancelBtn = document.getElementById('btnCancelCategoryModal');
    const form = document.getElementById('categoryForm');
    const nameInput = document.getElementById('categoryNameInput');
    const idInput = document.getElementById('categoryIdInput');
    const imgInput = document.getElementById('categoryModalImageInput');
    const fileInput = document.getElementById('categoryModalFileInput');
    const imgPreview = document.getElementById('categoryModalImgPreview');
    const imgPathText = document.getElementById('categoryModalImgPathText');

    if (!modal || !form) return;

    function updateCatPreview(url) {
      const fallback = 'assets/products/chandelier-imperial-crown.jpg';
      const finalUrl = url || fallback;
      if (imgPreview) imgPreview.src = finalUrl;
      if (imgPathText) imgPathText.textContent = url ? (url.startsWith('data:') ? 'Custom Uploaded Icon' : url) : fallback;
    }

    imgInput?.addEventListener('input', () => updateCatPreview(imgInput.value));

    // Manual Icon File Upload with FileReader (Base64)
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          const dataUrl = re.target.result;
          if (imgInput) imgInput.value = dataUrl;
          updateCatPreview(dataUrl);
          showToast('Category icon uploaded! 📸');
        };
        reader.readAsDataURL(file);
      }
    });

    // Presets
    modal.querySelectorAll('.js-cat-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        if (imgInput) {
          imgInput.value = btn.dataset.src;
          updateCatPreview(btn.dataset.src);
        }
      });
    });

    // Auto slugify name to ID
    nameInput?.addEventListener('input', () => {
      if (!currentEditingCategoryId && idInput) {
        idInput.value = nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    });

    openBtn?.addEventListener('click', () => {
      currentEditingCategoryId = null;
      document.getElementById('categoryModalTitle').textContent = 'Add New Category';
      form.reset();
      if (idInput) {
        idInput.readOnly = false;
        idInput.value = '';
      }
      if (imgInput) imgInput.value = 'assets/products/chandelier-imperial-crown.jpg';
      updateCatPreview('assets/products/chandelier-imperial-crown.jpg');
      modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const rawName = (formData.get('name') || '').trim();
      let rawId = (formData.get('id') || rawName).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!rawId) rawId = 'cat-' + Date.now();

      const catData = {
        name: rawName,
        id: rawId,
        origId: currentEditingCategoryId,
        icon: (formData.get('icon') || 'assets/products/chandelier-imperial-crown.jpg').trim(),
        desc: (formData.get('desc') || '').trim()
      };

      AdminStore.saveCategory(catData);
      modal.classList.remove('active');
      renderCategoriesTable();
      renderProductsTable();
      populateCategoryDropdowns();
      showToast(currentEditingCategoryId ? 'Category updated successfully' : 'New category created');
    });
  }

  function openCategoryModal(catId) {
    const cat = AdminStore.getCategoryById(catId);
    if (!cat) return;

    currentEditingCategoryId = catId;
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const idInput = document.getElementById('categoryIdInput');
    const imgPreview = document.getElementById('categoryModalImgPreview');
    const imgPathText = document.getElementById('categoryModalImgPathText');

    document.getElementById('categoryModalTitle').textContent = `Edit Category: ${cat.name}`;

    if (form.elements['name']) form.elements['name'].value = cat.name || '';
    if (form.elements['id']) form.elements['id'].value = cat.id || '';
    if (idInput) idInput.readOnly = (cat.id === 'all');
    if (form.elements['icon']) form.elements['icon'].value = cat.icon || 'assets/products/chandelier-imperial-crown.jpg';
    if (form.elements['desc']) form.elements['desc'].value = cat.desc || '';

    if (imgPreview) imgPreview.src = cat.icon || 'assets/products/chandelier-imperial-crown.jpg';
    if (imgPathText) imgPathText.textContent = cat.icon || '';

    modal.classList.add('active');
  }

  // 7. Hero Slider Management
  function renderSlidersTable() {
    const sliders = AdminStore.getSliders();
    const tbody = document.getElementById('slidersTableBody');
    if (!tbody) return;

    if (sliders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No hero slides configured.</td></tr>`;
      return;
    }

    tbody.innerHTML = sliders.map(slide => `
      <tr>
        <td style="font-weight: 700; color: var(--gold-400);">#${slide.order || 1}</td>
        <td>
          <img src="${slide.image}" alt="${slide.title}" style="width: 85px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-border);" onerror="this.src='assets/hero.jpg'" />
        </td>
        <td>
          <div style="font-weight: 600; color: #fff;">${slide.title}</div>
          <div style="font-size: 0.8rem; color: var(--gold-400);">${slide.highlightText || ''}</div>
        </td>
        <td>
          ${slide.badge ? `<span class="status-badge new">${slide.badge}</span>` : '-'}
        </td>
        <td>
          <div style="font-size: 0.85rem; color: #fff;">${slide.btnText || 'Explore'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${slide.btnLink || '#productsSection'}</div>
        </td>
        <td>
          <span class="stock-toggle ${slide.active !== false ? 'in-stock' : 'out-stock'} js-toggle-slide-active" data-id="${slide.id}">
            ${slide.active !== false ? 'Active' : 'Hidden'}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn js-edit-slider" data-id="${slide.id}" title="Edit Slide"><i class="fa-solid fa-pen"></i></button>
            <button class="action-icon-btn danger js-delete-slider" data-id="${slide.id}" title="Delete Slide"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.js-toggle-slide-active').forEach(btn => {
      btn.addEventListener('click', () => {
        AdminStore.toggleSliderActive(btn.dataset.id);
        renderSlidersTable();
        showToast('Slide visibility toggled');
      });
    });

    tbody.querySelectorAll('.js-edit-slider').forEach(btn => {
      btn.addEventListener('click', () => openSliderModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.js-delete-slider').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this hero slide banner?')) {
          AdminStore.deleteSlider(btn.dataset.id);
          renderSlidersTable();
          showToast('Hero slide removed');
        }
      });
    });
  }

  function setupSliderModal() {
    const modal = document.getElementById('sliderModal');
    const openBtn = document.getElementById('btnAddNewSlide');
    const closeBtn = document.getElementById('btnCloseSliderModal');
    const cancelBtn = document.getElementById('btnCancelSliderModal');
    const form = document.getElementById('sliderForm');
    const slideImgInput = document.getElementById('slideImageInput');
    const fileInput = document.getElementById('sliderModalFileInput');
    const imgPreview = document.getElementById('sliderModalImgPreview');
    const imgPathText = document.getElementById('sliderModalImgPathText');

    if (!modal || !form) return;

    function updateSliderPreview(url) {
      const fallback = 'assets/hero.jpg';
      const finalUrl = url || fallback;
      if (imgPreview) imgPreview.src = finalUrl;
      if (imgPathText) imgPathText.textContent = url ? (url.startsWith('data:') ? 'Custom Uploaded Banner' : url) : fallback;
    }

    slideImgInput?.addEventListener('input', () => updateSliderPreview(slideImgInput.value));

    // Manual Slide File Upload with FileReader (Base64)
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          const dataUrl = re.target.result;
          if (slideImgInput) slideImgInput.value = dataUrl;
          updateSliderPreview(dataUrl);
          showToast('Slide banner photo uploaded! 📸');
        };
        reader.readAsDataURL(file);
      }
    });

    // Preset buttons
    modal.querySelectorAll('.js-slide-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        if (slideImgInput) {
          slideImgInput.value = btn.dataset.src;
          updateSliderPreview(btn.dataset.src);
        }
      });
    });

    openBtn?.addEventListener('click', () => {
      currentEditingSlideId = null;
      document.getElementById('sliderModalTitle').textContent = 'Add New Hero Slide';
      form.reset();
      if (slideImgInput) slideImgInput.value = 'assets/hero.jpg';
      if (form.elements['order']) form.elements['order'].value = (AdminStore.getSliders().length + 1);
      if (form.elements['btnText']) form.elements['btnText'].value = 'Explore Fixtures';
      if (form.elements['btnLink']) form.elements['btnLink'].value = '#productsSection';
      if (form.elements['active']) form.elements['active'].checked = true;
      updateSliderPreview('assets/hero.jpg');
      modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const slideData = {
        title: (formData.get('title') || '').trim(),
        highlightText: (formData.get('highlightText') || '').trim(),
        badge: (formData.get('badge') || '').trim(),
        subtitle: (formData.get('subtitle') || '').trim(),
        image: (formData.get('image') || 'assets/hero.jpg').trim(),
        btnText: (formData.get('btnText') || 'Explore Fixtures').trim(),
        btnLink: (formData.get('btnLink') || '#productsSection').trim(),
        secondaryBtnText: (formData.get('secondaryBtnText') || '').trim(),
        secondaryBtnLink: (formData.get('secondaryBtnLink') || '').trim(),
        order: Number(formData.get('order')) || 1,
        active: formData.get('active') === 'on'
      };

      if (currentEditingSlideId) {
        slideData.id = currentEditingSlideId;
      }

      AdminStore.saveSlider(slideData);
      modal.classList.remove('active');
      renderSlidersTable();
      showToast(currentEditingSlideId ? 'Hero slide banner updated' : 'New hero slide added to homepage');
    });
  }

  function openSliderModal(id) {
    const slide = AdminStore.getSliderById(id);
    if (!slide) return;

    currentEditingSlideId = id;
    const modal = document.getElementById('sliderModal');
    const form = document.getElementById('sliderForm');
    const imgPreview = document.getElementById('sliderModalImgPreview');
    const imgPathText = document.getElementById('sliderModalImgPathText');
    document.getElementById('sliderModalTitle').textContent = 'Edit Hero Slide';

    if (form.elements['title']) form.elements['title'].value = slide.title || '';
    if (form.elements['highlightText']) form.elements['highlightText'].value = slide.highlightText || '';
    if (form.elements['badge']) form.elements['badge'].value = slide.badge || '';
    if (form.elements['subtitle']) form.elements['subtitle'].value = slide.subtitle || '';
    if (form.elements['image']) form.elements['image'].value = slide.image || 'assets/hero.jpg';
    if (form.elements['btnText']) form.elements['btnText'].value = slide.btnText || '';
    if (form.elements['btnLink']) form.elements['btnLink'].value = slide.btnLink || '';
    if (form.elements['secondaryBtnText']) form.elements['secondaryBtnText'].value = slide.secondaryBtnText || '';
    if (form.elements['secondaryBtnLink']) form.elements['secondaryBtnLink'].value = slide.secondaryBtnLink || '';
    if (form.elements['order']) form.elements['order'].value = slide.order || 1;
    if (form.elements['active']) form.elements['active'].checked = slide.active !== false;

    if (imgPreview) imgPreview.src = slide.image || 'assets/hero.jpg';
    if (imgPathText) imgPathText.textContent = slide.image ? (slide.image.startsWith('data:') ? 'Custom Uploaded Banner' : slide.image) : '';

    modal.classList.add('active');
  }

  // 8. Inquiries & Leads
  function renderInquiriesTable() {
    const inqs = AdminStore.getInquiries();
    const tbody = document.getElementById('inquiriesTableBody');
    if (!tbody) return;

    if (inqs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No inquiries received yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = inqs.map(inq => {
      const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, '') : '918460576753';

      return `
        <tr>
          <td>
            <div style="font-weight: 600; color: #fff;">${inq.customerName}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.dateSubmitted || ''}</div>
          </td>
          <td>${inq.phone}</td>
          <td>${inq.roomType || 'General'}</td>
          <td>
            <div style="font-size: 0.85rem; color: #fff;">${inq.interest || 'Consultation Request'}</div>
            ${inq.preferredDate ? `<div style="font-size: 0.75rem; color: var(--gold-400);">Preferred: ${inq.preferredDate}</div>` : ''}
            ${inq.notes ? `<div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">${inq.notes}</div>` : ''}
          </td>
          <td>
            <select class="form-control js-change-inq-status" data-id="${inq.id}" style="padding: 4px 8px; font-size: 0.78rem; width: 120px;">
              <option value="New" ${inq.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Scheduled" ${inq.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
              <option value="Closed" ${inq.status === 'Closed' ? 'selected' : ''}>Closed</option>
            </select>
          </td>
          <td>
            <div class="table-actions">
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${inq.customerName}! Thank you for your inquiry at JK Lights Gandhinagar. How can we assist you today?`)}" target="_blank" class="btn btn-whatsapp btn-sm">
                <i class="fa-brands fa-whatsapp"></i> Chat
              </a>
              <button class="action-icon-btn danger js-delete-inq" data-id="${inq.id}" title="Delete Inquiry">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.js-change-inq-status').forEach(sel => {
      sel.addEventListener('change', () => {
        AdminStore.updateInquiryStatus(sel.dataset.id, sel.value);
        renderInquiriesTable();
        renderDashboard();
        showToast('Lead status updated');
      });
    });

    tbody.querySelectorAll('.js-delete-inq').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this inquiry?')) {
          AdminStore.deleteInquiry(btn.dataset.id);
          renderInquiriesTable();
          renderDashboard();
          showToast('Inquiry deleted');
        }
      });
    });
  }

  // 9. Blog & Article Management (CRUD)
  let currentBlogSearchQuery = '';
  let currentBlogCategoryFilter = 'all';

  function setupBlogSearchAndFilter() {
    const searchInput = document.getElementById('blogSearchInput');
    const catFilter = document.getElementById('blogCategoryFilter');

    searchInput?.addEventListener('input', (e) => {
      currentBlogSearchQuery = e.target.value.toLowerCase().trim();
      renderBlogsTable();
    });

    catFilter?.addEventListener('change', (e) => {
      currentBlogCategoryFilter = e.target.value;
      renderBlogsTable();
    });
  }

  function renderBlogsTable() {
    let blogs = AdminStore.getBlogs();
    const tbody = document.getElementById('blogsTableBody');
    if (!tbody) return;

    if (currentBlogCategoryFilter !== 'all') {
      blogs = blogs.filter(b => (b.category || '').toLowerCase() === currentBlogCategoryFilter.toLowerCase());
    }

    if (currentBlogSearchQuery) {
      blogs = blogs.filter(b => 
        (b.title || '').toLowerCase().includes(currentBlogSearchQuery) ||
        (b.summary || '').toLowerCase().includes(currentBlogSearchQuery) ||
        (b.author || '').toLowerCase().includes(currentBlogSearchQuery) ||
        (b.category || '').toLowerCase().includes(currentBlogSearchQuery)
      );
    }

    if (blogs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No blog articles found matching your criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = blogs.map(blog => `
      <tr>
        <td>
          <img src="${blog.image || 'assets/products/chandelier-imperial-crown.jpg'}" alt="${blog.title}" style="width: 70px; height: 46px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-border);" onerror="this.src='assets/products/chandelier-imperial-crown.jpg'" />
        </td>
        <td>
          <div style="font-weight: 600; color: #fff; line-height: 1.3; margin-bottom: 4px;">${blog.title}</div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; max-width: 320px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${blog.summary || ''}</div>
        </td>
        <td>
          <span class="status-badge new" style="text-transform: none; font-weight: 600;">${blog.category || 'General'}</span>
        </td>
        <td>
          <div style="font-size: 0.85rem; color: #fff;">${blog.author || 'JK Design Studio'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${blog.date || 'Sep 2026'}</div>
        </td>
        <td>
          <span style="font-size: 0.8rem; color: var(--gold-400);"><i class="fa-regular fa-clock"></i> ${blog.readTime || '4 min read'}</span>
        </td>
        <td>
          ${blog.featured ? `<span style="color: #10b981; font-weight: 700; font-size: 0.8rem;"><i class="fa-solid fa-star"></i> Featured</span>` : `<span style="color: var(--text-muted); font-size: 0.8rem;">Standard</span>`}
        </td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn js-preview-blog" data-id="${blog.id}" title="Preview Article"><i class="fa-solid fa-eye"></i></button>
            <button class="action-icon-btn js-edit-blog" data-id="${blog.id}" title="Edit Article"><i class="fa-solid fa-pen"></i></button>
            <button class="action-icon-btn danger js-delete-blog" data-id="${blog.id}" title="Delete Article"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.js-preview-blog').forEach(btn => {
      btn.addEventListener('click', () => openBlogPreviewModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.js-edit-blog').forEach(btn => {
      btn.addEventListener('click', () => openBlogModalForEdit(btn.dataset.id));
    });

    tbody.querySelectorAll('.js-delete-blog').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to permanently delete this blog article?')) {
          AdminStore.deleteBlog(btn.dataset.id);
          renderBlogsTable();
          showToast('Blog article deleted successfully');
        }
      });
    });
  }

  function setupBlogModal() {
    const modal = document.getElementById('blogAdminModal');
    const openBtn = document.getElementById('btnAddNewBlog');
    const closeBtn = document.getElementById('btnCloseBlogAdminModal');
    const cancelBtn = document.getElementById('btnCancelBlogAdminModal');
    const form = document.getElementById('blogAdminForm');
    const imgInput = document.getElementById('blogModalImageInput');
    const fileInput = document.getElementById('blogModalFileInput');
    const imgPreview = document.getElementById('blogModalImgPreview');
    const imgPathText = document.getElementById('blogModalImgPathText');

    if (!modal || !form) return;

    function updateBlogImgPreview(url) {
      const fallback = 'assets/products/chandelier-imperial-crown.jpg';
      if (imgPreview) imgPreview.src = url || fallback;
      if (imgPathText) imgPathText.textContent = url ? (url.startsWith('data:') ? 'Custom Uploaded Photo' : url) : fallback;
    }

    imgInput?.addEventListener('input', () => updateBlogImgPreview(imgInput.value));

    // File Upload via FileReader
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          const dataUrl = re.target.result;
          if (imgInput) imgInput.value = dataUrl;
          updateBlogImgPreview(dataUrl);
          showToast('Cover photo uploaded! 📸');
        };
        reader.readAsDataURL(file);
      }
    });

    // Preset buttons
    modal.querySelectorAll('.js-blog-img-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        if (imgInput) {
          imgInput.value = btn.dataset.src;
          updateBlogImgPreview(btn.dataset.src);
        }
      });
    });

    openBtn?.addEventListener('click', () => {
      currentEditingBlogId = null;
      document.getElementById('blogAdminModalTitle').textContent = 'Add New Blog Article';
      form.reset();
      form.elements['author'].value = 'JK Lights Architectural Studio';
      form.elements['readTime'].value = '4 min read';
      updateBlogImgPreview('assets/products/chandelier-imperial-crown.jpg');
      modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const blogData = {
        title: formData.get('title').trim(),
        category: (formData.get('category') || 'Design Guide').trim(),
        author: (formData.get('author') || 'JK Lights Architectural Studio').trim(),
        readTime: (formData.get('readTime') || '4 min read').trim(),
        image: (formData.get('image') || 'assets/products/chandelier-imperial-crown.jpg').trim(),
        summary: (formData.get('summary') || '').trim(),
        content: (formData.get('content') || '').trim(),
        proTip: (formData.get('proTip') || '').trim(),
        featured: formData.get('featured') === 'on'
      };

      if (currentEditingBlogId) {
        blogData.id = currentEditingBlogId;
      }

      AdminStore.saveBlog(blogData);
      modal.classList.remove('active');
      renderBlogsTable();
      showToast(currentEditingBlogId ? 'Blog article updated successfully! ✍️' : 'New blog article published to storefront! 🎉');
    });

    // Setup preview modal close button
    document.getElementById('btnCloseBlogAdminPreviewModal')?.addEventListener('click', () => {
      document.getElementById('blogAdminPreviewModal')?.classList.remove('active');
    });
  }

  function openBlogModalForEdit(blogId) {
    const blog = AdminStore.getBlogById(blogId);
    if (!blog) return;

    currentEditingBlogId = blogId;
    const modal = document.getElementById('blogAdminModal');
    const form = document.getElementById('blogAdminForm');
    const imgPreview = document.getElementById('blogModalImgPreview');
    const imgPathText = document.getElementById('blogModalImgPathText');

    document.getElementById('blogAdminModalTitle').textContent = `Edit Blog Article`;

    form.elements['title'].value = blog.title || '';
    form.elements['category'].value = blog.category || 'Design Guide';
    form.elements['author'].value = blog.author || 'JK Lights Architectural Studio';
    form.elements['readTime'].value = blog.readTime || '4 min read';
    form.elements['image'].value = blog.image || '';
    form.elements['summary'].value = blog.summary || '';
    form.elements['content'].value = blog.content || '';
    form.elements['proTip'].value = blog.proTip || '';
    form.elements['featured'].checked = blog.featured !== false;

    if (imgPreview) imgPreview.src = blog.image || 'assets/products/chandelier-imperial-crown.jpg';
    if (imgPathText) imgPathText.textContent = blog.image ? (blog.image.startsWith('data:') ? 'Custom Uploaded Photo' : blog.image) : '';

    modal.classList.add('active');
  }

  function openBlogPreviewModal(blogId) {
    const blog = AdminStore.getBlogById(blogId);
    if (!blog) return;

    const modal = document.getElementById('blogAdminPreviewModal');
    const content = document.getElementById('blogAdminPreviewContent');
    if (!modal || !content) return;

    const rawContent = blog.content || blog.summary || '';
    const paragraphs = rawContent.split('\n').filter(p => p.trim()).map(p => `<p style="margin-bottom: 14px; line-height: 1.7;">${p.trim()}</p>`).join('');

    content.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="status-badge new" style="margin-bottom: 12px; display: inline-block;">${blog.category || 'Design Guide'}</span>
        <h2 style="font-family: var(--font-serif); color: #fff; font-size: 1.8rem; line-height: 1.3; margin-bottom: 12px;">${blog.title}</h2>
        <div style="display: flex; gap: 16px; color: var(--gold-400); font-size: 0.85rem; flex-wrap: wrap;">
          <span><i class="fa-solid fa-user-pen"></i> ${blog.author || 'JK Lights Architectural Studio'}</span>
          <span><i class="fa-regular fa-calendar"></i> ${blog.date || 'Sep 2026'}</span>
          <span><i class="fa-regular fa-clock"></i> ${blog.readTime || '4 min read'}</span>
          ${blog.featured ? `<span style="color: #10b981;"><i class="fa-solid fa-star"></i> Featured Guide</span>` : ''}
        </div>
      </div>
      <div style="border-radius: 10px; overflow: hidden; height: 280px; margin-bottom: 24px; border: 1px solid var(--border-light);">
        <img src="${blog.image || 'assets/products/chandelier-imperial-crown.jpg'}" alt="${blog.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/products/chandelier-imperial-crown.jpg'" />
      </div>
      <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.03); border-left: 3px solid var(--border-light); padding: 12px 16px; border-radius: 4px; margin-bottom: 18px; color: #fff; font-style: italic;">
          ${blog.summary || ''}
        </div>
        ${paragraphs}
        ${blog.proTip ? `
          <div style="background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-400); padding: 14px 18px; border-radius: 0 8px 8px 0; color: #fff; margin-top: 20px;">
            <strong style="color: var(--gold-300);"><i class="fa-solid fa-lightbulb"></i> Pro Tip from JK Lights Experts:</strong> ${blog.proTip}
          </div>
        ` : ''}
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn btn-gold btn-sm" id="btnPreviewEditBlog">
          <i class="fa-solid fa-pen"></i> Edit Article
        </button>
        <button class="btn btn-glass btn-sm" id="btnPreviewCloseBlog">
          Close Preview
        </button>
      </div>
    `;

    document.getElementById('btnPreviewEditBlog')?.addEventListener('click', () => {
      modal.classList.remove('active');
      openBlogModalForEdit(blog.id);
    });

    document.getElementById('btnPreviewCloseBlog')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.classList.add('active');
  }

  // 10. Store Settings
  function loadSettingsForm() {
    const store = AdminStore.getStoreInfo();
    const form = document.getElementById('storeSettingsForm');
    if (!form) return;

    if (form.elements['name']) form.elements['name'].value = store.name || '';
    if (form.elements['city']) form.elements['city'].value = store.city || '';
    if (form.elements['address']) form.elements['address'].value = store.address || '';
    if (form.elements['landmark']) form.elements['landmark'].value = store.landmark || '';
    if (form.elements['whatsapp']) form.elements['whatsapp'].value = store.whatsapp || '';
    if (form.elements['timingsWeekdays']) form.elements['timingsWeekdays'].value = store.timingsWeekdays || '';
    if (form.elements['timingsSunday']) form.elements['timingsSunday'].value = store.timingsSunday || '';
    if (form.elements['announcementText']) form.elements['announcementText'].value = store.announcementText || '';
    
    if (form.elements['showroomImage']) {
      const showroomImg = store.showroomImage || 'assets/showroom.jpg';
      form.elements['showroomImage'].value = showroomImg;
      const previewEl = document.getElementById('showroomPhotoPreview');
      if (previewEl) previewEl.src = showroomImg;
    }
  }

  function setupSettingsForm() {
    const form = document.getElementById('storeSettingsForm');
    if (!form) return;

    const showroomImgInput = document.getElementById('showroomImageInput');
    const showroomPreview = document.getElementById('showroomPhotoPreview');
    const showroomFileInput = document.getElementById('showroomPhotoFileInput');
    const btnResetPhoto = document.getElementById('btnResetShowroomPhoto');

    // Live URL preview
    if (showroomImgInput && showroomPreview) {
      showroomImgInput.addEventListener('input', () => {
        showroomPreview.src = showroomImgInput.value || 'assets/showroom.jpg';
      });
    }

    // File Upload handling via Base64 FileReader
    if (showroomFileInput && showroomImgInput && showroomPreview) {
      showroomFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
          showToast('Image size exceeds 5MB limit. Please choose a smaller image.', 'error');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          showroomImgInput.value = dataUrl;
          showroomPreview.src = dataUrl;
          showToast('Photo uploaded! Click "Save Settings" to apply. 📸');
        };
        reader.readAsDataURL(file);
      });
    }

    // Reset button
    if (btnResetPhoto && showroomImgInput && showroomPreview) {
      btnResetPhoto.addEventListener('click', () => {
        showroomImgInput.value = 'assets/showroom.jpg';
        showroomPreview.src = 'assets/showroom.jpg';
        showToast('Reset to default showroom image. Click "Save Settings" to apply.');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const updated = {
        name: (formData.get('name') || 'JK Lights').trim(),
        city: (formData.get('city') || 'Gandhinagar, Gujarat').trim(),
        address: (formData.get('address') || '').trim(),
        landmark: (formData.get('landmark') || '').trim(),
        whatsapp: (formData.get('whatsapp') || '918460576753').trim(),
        timingsWeekdays: (formData.get('timingsWeekdays') || '').trim(),
        timingsSunday: (formData.get('timingsSunday') || '').trim(),
        announcementText: (formData.get('announcementText') || '').trim(),
        showroomImage: (formData.get('showroomImage') || 'assets/showroom.jpg').trim()
      };

      AdminStore.updateStoreInfo(updated);
      showToast('Showroom & Contact information saved successfully! ✅');
    });
  }

  function setupGlobalActions() {
    document.getElementById('btnExportData')?.addEventListener('click', () => {
      const data = {
        storeInfo: AdminStore.getStoreInfo(),
        sliders: AdminStore.getSliders(),
        products: AdminStore.getProducts(),
        categories: AdminStore.getCategories(),
        blogs: AdminStore.getBlogs(),
        inquiries: AdminStore.getInquiries(),
        invoices: AdminStore.getInvoices()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jk-lights-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      showToast('Database exported to JSON');
    });

    document.getElementById('btnResetFactoryDemo')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all products, hero slides, invoices, and showroom details to defaults?')) {
        AdminStore.resetDefaults();
        showToast('Reset to defaults');
      }
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold-400);"></i> <span>${msg}</span>`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3500);
  }
})();
