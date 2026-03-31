import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Droplets, Truck } from 'lucide-react';

const productsData = {
  'bowl-basin': {
    title: 'Aura Bowl Basin',
    price: '₹ 8,499',
    description: 'Experience the ultimate luxury with our Aura Bowl Basin. Designed to sit elegantly on your countertop, this basin brings a modern focal point to your bathroom. Crafted from high-grade ceramic, it features a smooth, non-porous surface that is exceptionally durable and easy to clean. The organic, curved shape is perfect for contemporary settings.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&auto=format',
    rating: 4.8,
    reviews: 124,
    specs: ['Dimensions: 450x450x150 mm', 'Material: Premium Vitreous China', 'Installation: Counter Top', 'Color: Alpine White']
  },
  'wall-hung-full-pedestal': {
    title: 'Classic Wall Hung with Full Pedestal',
    price: '₹ 7,599',
    description: 'A timeless choice that brings traditional elegance to any bathroom. The full pedestal beautifully conceals plumbing while providing sturdy support for the wall-hung basin above. Finished in a high-gloss glaze for incredible durability.',
    image: '/images/basins/wall_hung_pedestal.png',
    rating: 4.5,
    reviews: 189,
    specs: ['Dimensions: 550x440x820 mm', 'Material: Ceramic', 'Installation: Wall Mount & Floor Support', 'Color: White']
  },
  'wall-hung-half-pedestal': {
    title: 'Modern Wall Hung with Half Pedestal',
    price: '₹ 6,899',
    description: 'Achieve a cleaner, floating look with our half-pedestal basin. It cleverly hides unsightly pipes while keeping your floor clear, making bathroom cleaning incredibly easy and maintaining a spacious feel.',
    image: '/images/basins/wall_hung_half_pedestal.png',
    rating: 4.7,
    reviews: 142,
    specs: ['Dimensions: 500x420x450 mm', 'Material: Vitreous China', 'Installation: Wall Mount', 'Color: Alpine White']
  },
  'wall-hung-no-pedestal': {
    title: 'Zen Wall Hung Basin Without Pedestal',
    price: '₹ 6,299',
    description: 'Maximize your bathroom space with the Zen Wall Hung Basin. Its minimalist, floating design creates an illusion of a larger room while providing completely accessible floor space cleaning. Built with superior glaze for long-lasting shine.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&auto=format',
    rating: 4.6,
    reviews: 89,
    specs: ['Dimensions: 550x430x200 mm', 'Material: Ceramic', 'Installation: Wall Mount', 'Color: Matte Black / White']
  },
  'integrated-basin': {
    title: 'Seamless Integrated Basin',
    price: '₹ 15,999',
    description: 'Experience the pinnacle of contemporary design with our integrated basin and countertop. Crafted from a single, continuous piece of premium material, there are no joints or seams, offering the ultimate easy-to-clean hygienic surface.',
    image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=500&auto=format',
    rating: 4.9,
    reviews: 76,
    specs: ['Dimensions: 800x460x160 mm', 'Material: Solid Surface', 'Installation: Vanity Top', 'Color: Matte White']
  },
  'countertop-basin': {
    title: 'Regal Countertop Basin',
    price: '₹ 10,999',
    description: 'The Regal Counter Top Basin is a statement piece. Its striking rectangular design with subtly rounded corners creates a sophisticated geometry. The premium finish not only looks stunning but provides an anti-bacterial coating.',
    image: 'https://loremflickr.com/800/800/countertop,ceramic,basin/all?lock=101',
    rating: 4.7,
    reviews: 156,
    specs: ['Dimensions: 600x400x140 mm', 'Material: Fine Fireclay', 'Installation: Counter Top', 'Color: Ivory / White']
  },
  'below-counter-basin': {
    title: 'Discreet Below Counter Basin',
    price: '₹ 5,899',
    description: 'Designed to be integrated smoothly underneath your bathroom vanity, this basin offers a clean, ultra-modern aesthetic. By removing the lip of the sink from the counter surface, wiping water straight into the bowl becomes effortless.',
    image: 'https://loremflickr.com/800/800/undermount,ceramic,basin/all?lock=102',
    rating: 4.8,
    reviews: 210,
    specs: ['Dimensions: 500x380x180 mm', 'Material: High-grade Ceramic', 'Installation: Under Counter', 'Color: Classic White']
  },
  'pedestals': {
    title: 'Pedestals',
    price: '₹ 3,499',
    description: 'Upgrade your existing basin setup with our premium standalone universal pedestals. Designed to fit most standard wall-hung basins, providing unyielding support and hiding unsightly plumbing works behind a beautiful ceramic pillar.',
    image: 'https://loremflickr.com/800/800/pedestal,ceramic,sink/all?lock=103',
    rating: 4.4,
    reviews: 65,
    specs: ['Dimensions: 180x170x680 mm', 'Material: Ceramic', 'Installation: Floor Mount', 'Color: White']
  },
  'lab-sink': {
    title: 'Lab Sink',
    price: '₹ 12,499',
    description: 'Built for extreme durability and heavy usage. This deep, utilitarian lab sink is forged from chemical-resistant fireclay, making it perfect for utility rooms, professional spaces, or industrial-chic bathroom designs.',
    image: 'https://loremflickr.com/800/800/utility,ceramic,sink/all?lock=104',
    rating: 4.9,
    reviews: 42,
    specs: ['Dimensions: 600x450x250 mm', 'Material: Chemical-resistant Fireclay', 'Installation: Drop-in / Undermount', 'Color: White']
  },
  'freestanding-basin': {
    title: 'Monolith Freestanding Basin',
    price: '₹ 28,999',
    description: 'Make an unforgettable architectural statement with the Monolith. A completely freestanding basin carved with striking vertical lines, designed to be the undisputed centerpiece of a luxury master bathroom.',
    image: 'https://loremflickr.com/800/800/freestanding,ceramic,basin/all?lock=105',
    rating: 5.0,
    reviews: 31,
    specs: ['Dimensions: 450x450x900 mm', 'Material: Solid Core Composite', 'Installation: Floor Standing', 'Color: Charcoal / Matte White']
  },
  'faucet-cardinal': {
    title: 'Cardinal Faucet',
    price: '₹ 4,499',
    description: 'A striking minimalist faucet featuring a high arc and sleek profile. Cardinal offers exceptional reach and precise temperature control. Finished in brilliant chrome that resists scratching and tarnishing.',
    image: '/images/faucets/faucet_cardinal_1774835577142.png',
    rating: 4.6,
    reviews: 112,
    specs: ['Material: Solid Brass', 'Finish: Polished Chrome', 'Installation: Deck Mount']
  },
  'faucet-praseo': {
    title: 'Praseo',
    price: '₹ 3,899',
    description: 'Defined by elegant curves and a timeless chrome finish, Praseo adds a touch of classic sophistication to any modern basin. Its smooth operating ceramic cartridge ensures a lifetime of drip-free performance.',
    image: '/images/faucets/faucet_praseo_1774835616136.png',
    rating: 4.8,
    reviews: 245,
    specs: ['Material: Brass Structure', 'Finish: Chrome', 'Flow Rate: 1.2 GPM']
  },
  'faucet-quattro': {
    title: 'Quattro',
    price: '₹ 5,299',
    description: 'Distinctive right-angled luxury. The Quattro series boasts an ultra-modern geometric design with absolute water efficiency. Built with premium materials to become the defining feature of your modern vanity.',
    image: '/images/faucets/faucet_quattro_1774835852581.png',
    rating: 4.7,
    reviews: 89,
    specs: ['Material: High-end Brass', 'Finish: Matte Black', 'Design: Angular']
  },
  'faucet-sensor': {
    title: 'sensor Faucet',
    price: '₹ 8,999',
    description: 'Touchless, hygienic, and extremely smart. The Sensor Faucet activates instantly upon detecting absolute proximity for supreme convenience. Perfect for maintaining peak hygiene and minimizing water waste.',
    image: '/images/faucets/faucet_sensor_1774835921942.png',
    rating: 4.9,
    reviews: 410,
    specs: ['Power: Battery/AC Operated', 'Sensor Range: 10-15 cm', 'Feature: Touchless Hygiene']
  },
  'faucet-espirion': {
    title: 'Espirion',
    price: '₹ 6,499',
    description: 'Flowing, organic lines inspired by nature. Espirion provides a gentle, aerated water flow mimicking a natural spring. The ergonomic handle design allows for incredibly smooth water manipulation.',
    image: '/images/faucets/faucet_espirion_1774835952503.png',
    rating: 4.8,
    reviews: 134,
    specs: ['Material: Brass', 'Finish: Brushed Nickel', 'Style: Organic Curve']
  },
  'faucet-thermostatic': {
    title: 'Thermostatic Diverter',
    price: '₹ 12,499',
    description: 'Ensure exact, unwavering temperature control. Automatically mixes water to eliminate scalds and provide consistent luxury. A must-have for high-end shower systems and master bathrooms.',
    image: '/images/faucets/faucet_thermostatic_1774836019478.png',
    rating: 4.9,
    reviews: 77,
    specs: ['Control: Precision Dial', 'Safety: Anti-scald Lock', 'Installation: Wall Mount']
  },
  'faucet-crust': {
    title: 'crust',
    price: '₹ 5,899',
    description: 'Crust – a tall modern kitchen faucet with a curved spout and side lever handle, designed for smooth water flow and a clean minimal look.',
    image: '/images/faucets/faucet_quattro_1774835852581.png',
    rating: 4.5,
    reviews: 92,
    specs: ['Material: Forged Brass', 'Design: Tall Modern Kitchen', 'Style: Clean Minimal']
  },
  'faucet-agate-pro': {
    title: 'agate pro',
    price: '₹ 9,999',
    description: 'Agate Pro – a premium faucet with a high-arc curved spout and ergonomic side handle, offering a refined design for modern kitchens.',
    image: '/images/faucets/faucet_espirion_1774835952503.png',
    rating: 4.8,
    reviews: 320,
    specs: ['Feature: Ergonomic Handle', 'Design: High-Arc Spout', 'Use: Modern Kitchens']
  },
  'faucet-aqua': {
    title: 'aqua',
    price: '₹ 7,299',
    description: 'Aqua – a wall-mounted faucet with a sleek flat spout design, ideal for compact spaces with a simple and functional style.',
    image: '/images/faucets/faucet_sensor_1774835921942.png',
    rating: 4.7,
    reviews: 145,
    specs: ['Spout: Sleek Flat Spout', 'Installation: Wall-mounted', 'Design: Simple & Functional']
  },
  'faucet-uno': {
    title: 'uno',
    price: '₹ 3,499',
    description: 'Uno – a compact single-lever faucet with a minimal cylindrical body, perfect for small basins and modern interiors.',
    image: '/images/faucets/faucet_praseo_1774835616136.png',
    rating: 4.4,
    reviews: 210,
    specs: ['Operation: Single Lever', 'Design: Minimal Cylindrical', 'Perfect For: Small Basins']
  },
  'heater-storage': {
    title: 'Storage Tank Heater',
    price: '₹ 15,499',
    description: 'Traditional and extremely reliable. A heavy-duty insulated storage tank that keeps a vast reserve of hot water ready for immediate luxury use. Advanced foam insulation ensures absolute minimal standby heat loss.',
    image: 'https://m.media-amazon.com/images/I/31X4m1a4sxL._AC_SR290%2C290_.jpg',
    rating: 4.7,
    reviews: 312,
    specs: ['Capacity: 50 Gallons', 'Energy Source: Electric/Gas', 'Warranty: 12 Years']
  },
  'heater-tankless': {
    title: 'Tankless Heater',
    price: '₹ 32,899',
    description: 'Instant, limitless hot water on demand. The tankless design saves massive amounts of space while providing incredible energy efficiency by only heating water exactly when you need it.',
    image: 'https://m.media-amazon.com/images/I/51oYAh5Te8L._AC_UF1000%2C1000_QL80_.jpg',
    rating: 4.8,
    reviews: 420,
    specs: ['Flow Rate: 7.5 GPM', 'Efficiency: 99%', 'Size: Ultra Compact']
  },
  'heater-heat-pump': {
    title: 'Heat Pump Heater',
    price: '₹ 45,299',
    description: 'Highly advanced technology that moves heat from the air to the water instead of generating heat directly. Incredibly eco-friendly, offering massive savings on heating bills over its exceptionally long lifespan.',
    image: 'https://m.media-amazon.com/images/I/51z-LKwnMpL.jpg',
    rating: 4.9,
    reviews: 128,
    specs: ['Energy Factor: 3.4 UEF', 'Capacity: 65 Gallons', 'Grid Feature: Demand Response']
  },
  'heater-solar': {
    title: 'Solar Heater System',
    price: '₹ 85,999',
    description: 'Harness the absolute infinite power of the sun. Roof-integrated solar thermal panels provide a completely renewable, zero-emission way to heat your massive bathroom water reserves.',
    image: 'https://irp.cdn-website.com/7f3e26cd/dms3rep/multi/Solar.jpg',
    rating: 4.6,
    reviews: 64,
    specs: ['Panels: 2x High-Efficiency', 'Backup System: Included Electric', 'Certifications: Energy Star']
  },
  'heater-condensing': {
    title: 'Condensing Boiler',
    price: '₹ 62,499',
    description: 'Capture exhausting gases to precisely pre-heat cold water entering the boiler, achieving absolutely unmatched energy transfer efficiency for massive homes demanding extreme heat loads.',
    image: 'https://img.edilportale.com/product-thumbs/h_Fondital_ITACA-CH-KR_3KzeWN5JD5.jpeg',
    rating: 4.8,
    reviews: 95,
    specs: ['Efficiency: 95% AFUE', 'Application: Whole House Radiant + Domestic', 'Fuel: Natural Gas']
  },
  'heater-electric-pump': {
    title: 'Electric Heat Pump Hybrid',
    price: '₹ 48,499',
    description: 'Combines the absolute best of standard electric heating with high-tech pump mechanics. Enjoy ultra-fast recovery times during peak usage and hyper-efficient operation during normal loads.',
    image: 'https://www.schusterboilers.com/upload/blocchi/X1635foto3-1X_bwaf-100-115-ap-min_fondo-grigio.jpg',
    rating: 4.7,
    reviews: 215,
    specs: ['Modes: Efficiency / Hybrid / Electric', 'Sound Level: 49 dBA', 'Capacity: 80 Gallons']
  },
  'heater-gas': {
    title: 'High-Capacity Gas Water Heater',
    price: '₹ 18,899',
    description: 'Powered cleanly by natural gas, offering extremely fast heating and perfectly reliable operation—even during catastrophic electrical power outages. The true golden standard for large families.',
    image: 'https://www.jaquar.com/images/thumbs/0051911_The%20Ultimate%20Guide%20to%20Selecting%20Water%20Heaters%20for%20Indian%20Homes.jpeg',
    rating: 4.5,
    reviews: 512,
    specs: ['Recovery Rate: 40 Gallons/Hour', 'Ignition: Electronic Piezo', 'Venting: Atmospheric']
  },
  'heater-point-of-use': {
    title: 'Point-of-Use Mini Heater',
    price: '₹ 8,999',
    description: 'A luxurious, compact, and rapid heating unit installed perfectly directly at the fixture under the sink. Eliminates agonizing waits for hot water and saves incredible amounts of wasted water.',
    image: 'https://m.media-amazon.com/images/I/41TDmGKwzAL._AC_UF1000%2C1000_QL80_.jpg',
    rating: 4.8,
    reviews: 340,
    specs: ['Capacity: 2.5 Gallons', 'Voltage: 120V', 'Mounting: Wall/Floor Bracket']
  },
  'heater-smart': {
    title: 'Smart Tech Water Heater',
    price: '₹ 24,299',
    description: 'Wi-Fi enabled absolute luxury. Monitor your exact energy usage, adjust temperatures remotely via smartphone, and set intelligent schedules perfectly tailored to your unique lifestyle routines.',
    image: 'https://image.made-in-china.com/202f0j00TYUokRJWJqrv/High-Technology-Energy-Saving-3500W-Indoor-Small-Size-Digital-Display-Electric-Tankless-Water-Heater.jpg',
    rating: 4.9,
    reviews: 188,
    specs: ['Connectivity: Wi-Fi / App Integration', 'Sensors: Leak Detection Auto-Shutoff', 'Analytics: Monthly Reports']
  },
  'heater-hydrolic-boiler': {
    title: 'Water Heater with Hydrolic Boiler',
    price: '₹ 110,999',
    description: 'The absolute undisputed pinnacle of heavy-duty hybrid engineering. A massive hydraulic boiler system seamlessly integrated for enormous estates needing continuous, extreme, unyielding hot water capacity.',
    image: 'https://cdn2.hubspot.net/hubfs/2004318/indirectwaterheater.jpg',
    rating: 5.0,
    reviews: 42,
    specs: ['System: Commercial-grade Hydraulic Loop', 'Output: 200,000 BTU', 'Build: Titanium Glass-lined']
  },
  'chimney-wall-mounted': {
    title: 'Wall Mounted Chimney',
    price: '₹ 14,999',
    description: 'A classic and versatile choice. Mounted flush against the wall to provide powerful, immediate extraction of smoke and odors directly above your premium cooktop.',
    image: 'https://loremflickr.com/800/800/kitchen,chimney/all?lock=536',
    rating: 4.6,
    reviews: 320,
    specs: ['Suction: 1200 m³/hr', 'Filter: Baffle Filter', 'Control: Touch Panel']
  },
  'chimney-island': {
    title: 'Island Chimney',
    price: '₹ 28,499',
    description: 'Suspended from the ceiling over your kitchen island. A stunning architectural centerpiece that provides massive extraction power for open-concept culinary spaces.',
    image: 'https://loremflickr.com/800/800/island,chimney/all?lock=893',
    rating: 4.8,
    reviews: 145,
    specs: ['Suction: 1400 m³/hr', 'Mount: Ceiling/Island', 'Lighting: LED Strip']
  },
  'chimney-built-in': {
    title: 'Built-in Chimney',
    price: '₹ 18,299',
    description: 'Concealed perfectly within your cabinetry. Offers an utterly seamless, minimalist kitchen aesthetic while maintaining uncompromising high-velocity suction.',
    image: 'https://loremflickr.com/800/800/built,in,chimney/all?lock=406',
    rating: 4.5,
    reviews: 210,
    specs: ['Design: Concealed inside Cabinet', 'Suction: 1000 m³/hr', 'Finish: Stainless Steel']
  },
  'chimney-corner': {
    title: 'Corner Chimney',
    price: '₹ 21,999',
    description: 'Intelligently designed to fit into angular spaces. Maximizes your kitchen layout efficiency without sacrificing an ounce of performance or visual elegance.',
    image: 'https://loremflickr.com/800/800/corner,kitchen/all?lock=231',
    rating: 4.7,
    reviews: 98,
    specs: ['Shape: Angular/Corner', 'Filter: Cassette Filter', 'Noise: < 58 dB']
  },
  'chimney-auto-clean': {
    title: 'Auto Clean Chimney',
    price: '₹ 19,499',
    description: 'Equipped with absolute state-of-the-art thermal technology to automatically melt and collect grease, virtually eliminating manual cleaning and maintenance.',
    image: 'https://loremflickr.com/800/800/modern,chimney/all?lock=410',
    rating: 4.9,
    reviews: 450,
    specs: ['Technology: Thermal Auto-Clean', 'Suction: 1250 m³/hr', 'Accessory: Oil Collector Tray']
  },
  'chimney-filterless': {
    title: 'Filterless Chimney',
    price: '₹ 22,999',
    description: 'Zero filters to wash. Advanced aerodynamic motor positioning ensures heavy oil and smoke are expelled cleanly, ensuring a lifetime of zero clogging.',
    image: 'https://loremflickr.com/800/800/filterless,chimney/all?lock=754',
    rating: 4.8,
    reviews: 312,
    specs: ['Filter: None (Filterless)', 'Motor: Sealed Copper', 'Maintenance: Ultra Low']
  },
  'chimney-ducted': {
    title: 'Ducted Chimney',
    price: '₹ 16,899',
    description: 'The absolute professional standard. Expels all smoke, moisture, and heat completely out of your home through heavy-duty ductwork for the freshest air.',
    image: 'https://loremflickr.com/800/800/kitchen,duct/all?lock=272',
    rating: 4.7,
    reviews: 280,
    specs: ['Exhaust: Ducted Outside', 'Suction: 1300 m³/hr', 'Efficiency: High Ventilation']
  },
  'chimney-ductless': {
    title: 'Ductless Chimney',
    price: '₹ 17,499',
    description: 'Complete freedom of installation. Utilizes supreme carbon filtration to purify and recirculate flawless, clean air back into your living space.',
    image: 'https://loremflickr.com/800/800/recirculating,chimney/all?lock=910',
    rating: 4.5,
    reviews: 195,
    specs: ['Filtration: Charcoal/Carbon Filter', 'Installation: Recirculating Mode', 'Flexibility: High']
  },
  'chimney-smart': {
    title: 'Smart Tech Chimney',
    price: '₹ 26,999',
    description: 'Voice-controlled, gesture-enabled luxury. Features intelligent auto-suction that adjusts powerfully to the exact volume of smoke detecting in real-time.',
    image: 'https://loremflickr.com/800/800/smart,kitchen/all?lock=773',
    rating: 4.9,
    reviews: 155,
    specs: ['Sensors: Smoke & Heat Sensing', 'Control: App / Voice / Gesture', 'Suction: Variable up to 1500 m³/hr']
  },
  'chimney-slim': {
    title: 'Slim & Compact Chimney',
    price: '₹ 13,499',
    description: 'Incredibly thin and sleek. Engineered to bring uncompromising extraction power to modern apartments and compact high-end studio kitchens.',
    image: 'https://loremflickr.com/800/800/small,kitchen,chimney/all?lock=841',
    rating: 4.6,
    reviews: 410,
    specs: ['Profile: Ultra-Slim', 'Suction: 900 m³/hr', 'Fit: Compact Kitchens']
  },
  'tiles-floor': {
    title: 'Heavy Duty Floor Tiles',
    price: '₹ 1,299 per sq.ft',
    description: 'Ultra-durable, slip-resistant floor tiles offering incredible resilience to heavy foot traffic without ever compromising on supreme aesthetic beauty. Perfect for grand entryways and luxury bathrooms.',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    reviews: 215,
    specs: ['Material: Ceramic/Porcelain', 'Finish: Matte / Anti-slip', 'Use: High Traffic Areas']
  },
  'tiles-wall': {
    title: 'Decorative Wall Tiles',
    price: '₹ 899 per sq.ft',
    description: 'Transform dull vertical spaces into captivating works of art. Highly decorative wall tiles engineered perfectly to resist moisture and stains, ideal for shower enclosures and kitchen backsplashes.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    reviews: 180,
    specs: ['Material: Glazed Ceramic', 'Finish: High Gloss / Textured', 'Application: Walls Only']
  },
  'tiles-vitrified': {
    title: 'Double Charge Vitrified Tiles',
    price: '₹ 1,499 per sq.ft',
    description: 'Non-porous luxury. Exceptionally dense vitrified tiles provide absolute zero water absorption and a stunning, uniform crystal-clear finish that remains flawlessly brilliant for decades.',
    image: 'https://images.unsplash.com/photo-1596767677764-ee09b691ec55?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 322,
    specs: ['Process: Double Charge', 'Porosity: < 0.05%', 'Thickness: 10mm']
  },
  'tiles-ceramic': {
    title: 'Classic Ceramic Tiles',
    price: '₹ 599 per sq.ft',
    description: 'A classic staple of high-end home design. Versatile, colorful, incredibly hygienic ceramic tiles perfect for any bespoke modern kitchen or bathroom wanting a pop of tailored color.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
    rating: 4.5,
    reviews: 410,
    specs: ['Material: Clay Baked', 'Glaze: Premium Custom Colors', 'Durability: Moderate to High']
  },
  'tiles-porcelain': {
    title: 'Premium Porcelain Tiles',
    price: '₹ 1,899 per sq.ft',
    description: 'The absolute pinnacle of clay baking technology. Porcelain offers unmatched strength, making it perfectly suitable for both lush indoors and tough outdoors, handling freezing conditions flawlessly.',
    image: 'https://images.unsplash.com/photo-1574691458021-3965fcbd7ad5?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    reviews: 195,
    specs: ['Material: Fine Porcelain Clay', 'Density: Extremely High', 'Usage: Indoor / Outdoor']
  },
  'tiles-mosaic': {
    title: 'Artisan Mosaic Tiles',
    price: '₹ 2,499 per sq.ft',
    description: 'Intricate, mesmerizing small-format tiles designed to create stunning feature walls and breathtaking shower niches with intricate geometric and organic patterns. Pure artistic expression.',
    image: 'https://images.unsplash.com/photo-1600494603980-362f8319f07a?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 145,
    specs: ['Format: 1x1 or 2x2 Sheets', 'Material: Glass/Stone/Ceramic', 'Application: Accents & Niches']
  },
  'surface-marble': {
    title: 'Italian Marble Surface',
    price: '₹ 4,599 per sq.ft',
    description: 'The golden standard of absolute luxury. Natural, deeply veined marble slabs providing unmatched opulence and a cool, smooth timeless touch that completely defines any room it inhabits.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    reviews: 88,
    specs: ['Material: 100% Natural Stone', 'Finish: Polished / Honed', 'Maintenance:Requires Sealing']
  },
  'surface-granite': {
    title: 'Premium Granite Surface',
    price: '₹ 2,899 per sq.ft',
    description: 'Nature\'s toughest beautiful stone. Granite delivers immense scratch and heat resistance while boasting deep, rich earthy tones for any high-end countertop or outdoor luxury kitchen.',
    image: 'https://images.unsplash.com/photo-1593368297059-4fefdbd5c64c?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    reviews: 156,
    specs: ['Material: Natural Igneous Rock', 'Durability: Extremely Scratch Resistant', 'Heat Tolerance: High']
  },
  'surface-quartz': {
    title: 'Engineered Quartz Surface',
    price: '₹ 3,299 per sq.ft',
    description: 'Engineered stone perfection. Quartz combines the breathtaking beauty of natural stone with completely non-porous, maintenance-free futuristic durability that never requires secondary sealing.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 310,
    specs: ['Composition: 90% Quartz / 10% Resin', 'Porosity: Completely Non-Porous', 'Maintenance: Zero Maintenance']
  },
  'surface-wooden-finish': {
    title: 'Wooden Finish Surface',
    price: '₹ 1,599 per sq.ft',
    description: 'The warming comfort of rich natural hardwood, masterfully crafted into highly durable surface material that completely resists water and warping. Bring the spa feeling into the wettest bathroom areas.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    rating: 4.6,
    reviews: 240,
    specs: ['Look: Natural Wood Grain', 'Property: 100% Waterproof', 'Application: Wet Areas / Floors']
  },
  'closet-one-piece': {
    title: 'Luxury One Piece Closet',
    price: '₹ 18,499',
    description: 'Experience supreme hygiene with our masterfully crafted one-piece closet. Featuring a completely seamless, gapless design that integrates the tank and bowl into a single, beautiful flowing porcelain sculpture, eliminating hiding spots for bacteria.',
    image: 'https://loremflickr.com/800/800/one,piece,toilet/all?lock=144',
    rating: 4.8,
    reviews: 312,
    specs: ['Design: Seamless One Piece', 'Flush System: Tornado Dual Flush', 'Seat Cover: Soft Close Ultra-Thin']
  },
  'closet-two-piece': {
    title: 'Classic Two Piece Closet',
    price: '₹ 9,999',
    description: 'The traditional classic reborn with modern engineering. Extremely reliable and robust two-piece construction offering timeless bathroom aesthetic combined with highly accessible internal mechanisms for effortless maintenance.',
    image: 'https://loremflickr.com/800/800/two,piece,toilet/all?lock=179',
    rating: 4.5,
    reviews: 420,
    specs: ['Design: Floor Mount Two Piece', 'Flush Type: Siphonic Washdown', 'Warranty: 10 Years Ceramic Warranty']
  },
  'closet-wall-hung': {
    title: 'Designer Wall Hung Closet',
    price: '₹ 14,999',
    description: 'A floating masterpiece that creates the ultimate illusion of space. By suspending the bowl off the ground, it makes floor cleaning incredibly effortless while lending a minimalist, stunningly modern aesthetic to any luxury bathroom.',
    image: 'https://loremflickr.com/800/800/wall,hung,toilet/all?lock=300',
    rating: 4.9,
    reviews: 245,
    specs: ['Mounting: Wall Suspended', 'Support Structure: Requires Concealed Frame', 'Load Capacity: Withstands up to 400kg']
  },
  'closet-floor-mounted': {
    title: 'Sturdy Floor Mounted Closet',
    price: '₹ 11,299',
    description: 'A rock-solid foundation anchored securely to the floor. Provides immense physical stability combined with gorgeous sweeping ceramic curves. Designed for heavy daily usage while maintaining a pristine, elegant profile.',
    image: 'https://loremflickr.com/800/800/floor,mounted,toilet/all?lock=51',
    rating: 4.6,
    reviews: 188,
    specs: ['Type: Extended Floor Mount', 'Trap: S-Trap / P-Trap Compatible', 'Hygiene: Anti-Bacterial Glaze']
  },
  'closet-smart': {
    title: 'Intelligent Smart Toilet',
    price: '₹ 85,999',
    description: 'The absolute pinnacle of luxury bathroom technology. Features automatic proximity lid opening, heated ergonomic seating, self-cleansing bidet wands, warm air drying, and automatic ambient night-lighting for pure, uncontested luxury.',
    image: 'https://loremflickr.com/800/800/smart,toilet/all?lock=604',
    rating: 5.0,
    reviews: 95,
    specs: ['Features: Heated Seat, Bidet, Warm Dryer', 'Control: Wireless Remote & App', 'Self-Cleaning: UV Sterilization Wash']
  },
  'closet-western': {
    title: 'Ergonomic Western Closet',
    price: '₹ 12,599',
    description: 'The contemporary European standard, refined. Ergonomically designed to perfectly cradle and support human posture for extended comfort. The bowl architecture is optimized for absolute premium hygiene and minimal splash-back.',
    image: 'https://loremflickr.com/800/800/western,toilet/all?lock=448',
    rating: 4.7,
    reviews: 310,
    specs: ['Design Standard: Euro Profile', 'Seat Height: Universal Comfort Height', 'Water Consumption: 3L / 6L Dual Flush']
  },
  'closet-indian': {
    title: 'Premium Indian Squat Pan',
    price: '₹ 4,299',
    description: 'The traditional heavy-duty hygienic footprint favoring natural ergonomic posture. Constructed from highly durable ceramic formulated for intense scratch resistance, longevity, and exceptionally rapid cleaning.',
    image: 'https://loremflickr.com/800/800/indian,toilet/all?lock=421',
    rating: 4.4,
    reviews: 540,
    specs: ['Style: Asian/Indian Squat Pan', 'Material: Extra Thick Fireclay', 'Footrests: Anti-Slip Molded Grooves']
  },
  'closet-rimless': {
    title: 'Ultra-Hygienic Rimless Closet',
    price: '₹ 16,499',
    description: 'The definitive future of bathroom hygiene. Completely eliminates the hidden rim where bacteria and lime-scale usually hide, offering a flawlessly smooth inner bowl and a powerful, dynamic 360-degree washdown flush.',
    image: 'https://loremflickr.com/800/800/rimless,toilet/all?lock=353',
    rating: 4.9,
    reviews: 215,
    specs: ['Bowl Architecture: True Rimless', 'Flush Dynamics: 360° Vortex Cyclone', 'Cleaning Efficiency: 99.9% Bacteria Removal']
  },
  'closet-compact': {
    title: 'Spacesaver Compact Closet',
    price: '₹ 10,899',
    description: 'Intelligently scaled down to maximize extremely tight floor plans without ever compromising on flush intensity, seating space comfort, or the high-end designer aesthetics you expect from premium fixtures.',
    image: 'https://loremflickr.com/800/800/small,toilet/all?lock=272',
    rating: 4.6,
    reviews: 175,
    specs: ['Profile: Short Projection (Space Saving)', 'Ideal For: Studio Apartments & Powder Rooms', 'Design: Sleek Minimalist Profile']
  },
  'closet-concealed': {
    title: 'Concealed Cistern Closet',
    price: '₹ 22,999',
    description: 'Absolute minimalist architectural excellence. The entire water tank plumbing is perfectly hidden behind your finished wall, leaving absolutely nothing visible except a beautiful dual-flush push plate and a sleek wall-mounted bowl.',
    image: 'https://loremflickr.com/800/800/concealed,toilet/all?lock=87',
    rating: 4.8,
    reviews: 132,
    specs: ['Requirement: In-Wall Geberit/Concealed Tank', 'Aesthetic: Invisible Plumbing', 'Operation: Pneumatic Dual Flush Plate']
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = productsData[id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cozy-50">
        <h2 className="text-2xl text-cozy-900 font-serif">Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cozy-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cozy-600 hover:text-cozy-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium tracking-wide">Back to Categories</span>
        </button>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row">
          {/* Image Gallery Side */}
          <div className="w-full lg:w-1/2 bg-cozy-100 p-8 flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
            <h1 className="text-3xl md:text-5xl font-serif text-cozy-900 mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-[#8c7462]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-cozy-500 text-sm font-medium">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-light text-[#8c7462] mb-8">{product.price}</p>
            
            <div className="prose prose-cozy mb-10 text-cozy-600 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            {/* Specifications Box */}
            <div className="bg-cozy-50 rounded-xl p-6 mb-10 border border-cozy-100">
              <h3 className="text-lg font-medium text-cozy-900 mb-4 uppercase tracking-wider text-sm">Specifications</h3>
              <ul className="space-y-3">
                {product.specs.map((spec, index) => {
                  const [key, val] = spec.split(':');
                  return (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-center text-sm">
                      <span className="text-cozy-500 w-32 font-medium">{key}:</span>
                      <span className="text-cozy-800">{val}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-auto pt-6 border-t border-cozy-100">
              <div className="flex items-center gap-2 text-cozy-600">
                <ShieldCheck size={20} className="text-[#8c7462]" />
                <span className="text-xs font-medium uppercase tracking-wider">10 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-cozy-600">
                <Truck size={20} className="text-[#8c7462]" />
                <span className="text-xs font-medium uppercase tracking-wider">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-cozy-600">
                <Droplets size={20} className="text-[#8c7462]" />
                <span className="text-xs font-medium uppercase tracking-wider">Easy Clean</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
