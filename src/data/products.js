import sparklersImg from '../assets/crackers/sparklers.jpg';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';
import groundChakkarsImg from '../assets/crackers/ground-chakkars.jpg';
import skyShotsImg from '../assets/crackers/sky-shots.jpg';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

// Unsplash high quality Diwali celebration & fireworks images
const soundCrackersImg = 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200';
const rocketsImg = 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=1200';
const kidsNoveltiesImg = 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=1200';
const giftBoxesImg = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200';

export const categories = [
    {
        id: 'sparklers',
        title: 'Sparklers (Phuljhadi)',
        slug: 'sparklers',
        description: 'Dazzling electric, color, and crackling sparklers with safe low-smoke formulations for all age groups.',
        image: sparklersImg,
        color: '#f59e0b',
        gradient: 'from-amber-600 to-amber-900',
    },
    {
        id: 'ground-chakkars',
        title: 'Ground Chakkars',
        slug: 'ground-chakkars',
        description: 'Mesmerizing spinning fire wheels that swirl in vibrant golden and ruby halos on the floor.',
        image: groundChakkarsImg,
        color: '#dc2626',
        gradient: 'from-red-600 to-red-900',
    },
    {
        id: 'flower-pots',
        title: 'Flower Pots (Anar)',
        slug: 'flower-pots',
        description: 'Towering volcanic fountains erupting into fountains of gold, silver, and multi-colored starry sparks.',
        image: flowerPotsImg,
        color: '#d97706',
        gradient: 'from-orange-600 to-amber-900',
    },
    {
        id: 'sky-shots',
        title: 'Aerial & Sky Shots',
        slug: 'sky-shots',
        description: 'Spectacular multi-shot aerial cakes illuminating the night sky with cascading brocades and glittering palms.',
        image: skyShotsImg,
        color: '#7c3aed',
        gradient: 'from-purple-700 to-indigo-950',
    },
    {
        id: 'sound-crackers',
        title: 'Sound Crackers & Garlands',
        slug: 'sound-crackers',
        description: 'Authentic Sivakasi red crackers, 100 to 5000 wala lad garlands, and thunderous hydro bombs.',
        image: soundCrackersImg,
        color: '#b91c1c',
        gradient: 'from-rose-700 to-rose-950',
    },
    {
        id: 'rockets-missiles',
        title: 'Rockets & Missiles',
        slug: 'rockets-missiles',
        description: 'Whistling sky rockets that zoom into high altitude before bursting into glittering starbursts.',
        image: rocketsImg,
        color: '#0284c7',
        gradient: 'from-blue-700 to-slate-900',
    },
    {
        id: 'kids-novelties',
        title: 'Kids Specials & Novelties',
        slug: 'kids-novelties',
        description: 'Ultra-safe, colorful, fun novelties including roll caps, pop-pops, magic whistles, and color smoke.',
        image: kidsNoveltiesImg,
        color: '#059669',
        gradient: 'from-emerald-600 to-teal-950',
    },
    {
        id: 'diwali-gift-boxes',
        title: 'Diwali Festive Gift Boxes',
        slug: 'diwali-gift-boxes',
        description: 'Complete family celebration hampers packed with assorted crackers at unbeatable Sivakasi wholesale rates.',
        image: giftBoxesImg,
        color: '#ea580c',
        gradient: 'from-amber-600 to-red-950',
    },
];

export const products = [
    // ── SPARKLERS ─────────────────────────────────────────────────────────
    {
        id: 'electric-sparklers-15cm',
        title: '15cm Electric Sparklers',
        order: 1,
        category: 'Sparklers (Phuljhadi)',
        categorySlug: 'sparklers',
        image: sparklersImg,
        price: '₹95',
        originalPrice: '₹320',
        discount: '70% OFF',
        description: 'Traditional golden sparkling phuljhadi. Smooth, long-lasting and safe handheld fireworks.',
        badgeNote: 'Best Seller',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Sticks per Box' },
            { label: 'Length', value: '15 cm' },
            { label: 'Burning Duration', value: '60 – 70 Seconds per Stick' },
            { label: 'Cracker Type', value: 'Green Cracker (CSIR-NEERI Certified)' },
            { label: 'Sound Level', value: 'Silent / Gentle Crackle' },
            { label: 'Safe Distance', value: 'Handheld at arm’s length' },
            { label: 'Origin', value: 'Sivakasi, Tamil Nadu' },
            { label: 'PESO License', value: 'Compliant & Certified' },
        ],
        types: ['15cm Gold', '15cm Green', '15cm Crackling', '15cm Tri-Color'],
        minimumOrder: '5 Boxes',
        varieties: [
            { title: 'Golden Glory', desc: 'Long-running golden shower with dense sparkling embers.', img: sparklersImg },
            { title: 'Silver Mist', desc: 'Silvery white brilliant sparks ideal for family photography.', img: sparklersImg }
        ]
    },
    {
        id: 'mega-sparklers-50cm',
        title: '50cm Giant Deluxe Sparklers',
        order: 2,
        category: 'Sparklers (Phuljhadi)',
        categorySlug: 'sparklers',
        image: sparklersImg,
        price: '₹220',
        originalPrice: '₹750',
        discount: '70% OFF',
        description: 'Extra-long giant sparklers lasting over 3 minutes of brilliant illumination.',
        badgeNote: 'Party Special',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '5 Giant Sticks per Box' },
            { label: 'Length', value: '50 cm (Giant Size)' },
            { label: 'Burning Duration', value: '180+ Seconds (3 Minutes)' },
            { label: 'Cracker Type', value: 'Green Cracker (CSIR-NEERI Certified)' },
            { label: 'Sound Level', value: 'Silent Glow' },
            { label: 'Safe Distance', value: 'Handheld at arm’s length' },
            { label: 'Origin', value: 'Sivakasi, Tamil Nadu' }
        ],
        types: ['50cm Gold', '50cm Multi-Color Flame'],
        minimumOrder: '3 Boxes',
    },
    {
        id: 'color-sparklers-30cm',
        title: '30cm Color & Crackling Sparklers',
        order: 3,
        category: 'Sparklers (Phuljhadi)',
        categorySlug: 'sparklers',
        image: sparklersImg,
        price: '₹140',
        originalPrice: '₹480',
        discount: '70% OFF',
        description: 'Vivid color-changing sparks transitioning from ruby red to emerald green with crackles.',
        badgeNote: 'Festive Favorite',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Sticks per Box' },
            { label: 'Length', value: '30 cm' },
            { label: 'Burning Duration', value: '90 Seconds' },
            { label: 'Cracker Type', value: 'Green Cracker' },
            { label: 'Effect', value: 'Color change with micro-crackles' }
        ],
        types: ['Ruby Red', 'Emerald Green', 'Golden Crackle'],
        minimumOrder: '5 Boxes',
    },

    // ── GROUND CHAKKARS ───────────────────────────────────────────────────
    {
        id: 'deluxe-ground-chakkar',
        title: 'Deluxe Ground Chakkar (Special)',
        order: 10,
        category: 'Ground Chakkars',
        categorySlug: 'ground-chakkars',
        image: groundChakkarsImg,
        price: '₹165',
        originalPrice: '₹550',
        discount: '70% OFF',
        description: 'High-speed spinning wheel that creates a glowing concentric ring of golden and red sparks.',
        badgeNote: 'Top Rated',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Pieces per Box' },
            { label: 'Spin Duration', value: '30 – 40 Seconds per piece' },
            { label: 'Cracker Type', value: 'Green Cracker' },
            { label: 'Safety Distance', value: 'Maintain 5 Meters distance' },
            { label: 'Origin', value: 'Sivakasi Factory Direct' }
        ],
        types: ['Special', 'Deluxe', 'Big', 'Super Giant'],
        minimumOrder: '4 Boxes',
        varieties: [
            { title: 'Gold Spin', desc: 'Fast rotary action with thick golden ring.', img: groundChakkarsImg },
            { title: 'Red Wheel', desc: 'Fiery crimson sparks with steady rotary motion.', img: groundChakkarsImg }
        ]
    },
    {
        id: 'disco-chakkar-spinning-wheel',
        title: 'Disco 4x4 Multi-Color Chakkar',
        order: 11,
        category: 'Ground Chakkars',
        categorySlug: 'ground-chakkars',
        image: groundChakkarsImg,
        price: '₹240',
        originalPrice: '₹800',
        discount: '70% OFF',
        description: 'Innovative multi-stage spinning wheel that changes color 4 times with bright strobe flash.',
        badgeNote: 'New Arrival',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Pieces per Box' },
            { label: 'Special Effect', value: 'Color shifts + Strobe Flash' },
            { label: 'Spin Duration', value: '45 Seconds' },
            { label: 'Safe Distance', value: '5 Meters' }
        ],
        types: ['4-in-1 Color Shift', 'Disco Strobe Edition'],
        minimumOrder: '3 Boxes',
    },

    // ── FLOWER POTS ───────────────────────────────────────────────────────
    {
        id: 'flower-pots-special-anar',
        title: 'Special Flower Pots (Anar)',
        order: 20,
        category: 'Flower Pots (Anar)',
        categorySlug: 'flower-pots',
        image: flowerPotsImg,
        price: '₹180',
        originalPrice: '₹600',
        discount: '70% OFF',
        description: 'Classic conical Anar fountain soaring up to 15 feet in height with dense golden sparks.',
        badgeNote: 'Diwali Essential',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Pieces per Box' },
            { label: 'Fountain Height', value: '12 – 15 Feet' },
            { label: 'Duration', value: '45 Seconds' },
            { label: 'Cracker Type', value: 'Green Cracker (Low Smoke)' },
            { label: 'Safe Distance', value: '6 Meters away' }
        ],
        types: ['Special', 'Ashoka', 'Big', 'Giant Tri-Color'],
        minimumOrder: '3 Boxes',
        varieties: [
            { title: 'Golden Shower', desc: 'Dense golden fountain with crackling stars.', img: flowerPotsImg },
            { title: 'Silver Ashoka', desc: 'Pure silver volcanic eruption with long sparks.', img: flowerPotsImg }
        ]
    },
    {
        id: 'tri-color-color-fountain',
        title: 'Tri-Color Deluxe Flower Pots',
        order: 21,
        category: 'Flower Pots (Anar)',
        categorySlug: 'flower-pots',
        image: flowerPotsImg,
        price: '₹290',
        originalPrice: '₹950',
        discount: '70% OFF',
        description: 'Spectacular 3-phase fountain shifting from saffron gold to brilliant white and emerald green.',
        badgeNote: 'Premium Quality',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '5 Pieces per Box' },
            { label: 'Fountain Height', value: '18 – 20 Feet' },
            { label: 'Duration', value: '60 Seconds' },
            { label: 'Effect', value: 'Tri-Color patriotic display' }
        ],
        types: ['Tri-Color 3-in-1', 'Color Waterfall'],
        minimumOrder: '2 Boxes',
    },

    // ── SKY SHOTS ─────────────────────────────────────────────────────────
    {
        id: 'multi-sky-shots-12',
        title: '12 Multi-Color Sky Shots Cake',
        order: 30,
        category: 'Aerial & Sky Shots',
        categorySlug: 'sky-shots',
        image: skyShotsImg,
        price: '₹420',
        originalPrice: '₹1400',
        discount: '70% OFF',
        description: '12 consecutive high-altitude aerial shells exploding with palm trees, peonies, and golden brocades.',
        badgeNote: 'Celebration Hit',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Shot Count', value: '12 Consecutive Aerial Bursts' },
            { label: 'Burst Height', value: '120 – 150 Feet in Sky' },
            { label: 'Effects', value: 'Peony, Brocade, Strobe, Willow' },
            { label: 'Safety Distance', value: 'Open ground (Minimum 15 Meters)' },
            { label: 'Ignition', value: 'Single fuse continuous firing' }
        ],
        types: ['12 Shots Cake', '30 Shots Cake', '60 Shots Cake', '120 Shots Finale'],
        minimumOrder: '1 Piece',
        varieties: [
            { title: 'Golden Brocade', desc: 'Deep golden willow branches draping across the night.', img: skyShotsImg },
            { title: 'Ruby & Emerald Peony', desc: 'Vibrant dual-color spherical starbursts.', img: skyShotsImg }
        ]
    },
    {
        id: 'mega-sky-shots-60',
        title: '60 Shots Grand Finale Aerial Cake',
        order: 31,
        category: 'Aerial & Sky Shots',
        categorySlug: 'sky-shots',
        image: heroFireworksImg,
        price: '₹1850',
        originalPrice: '₹5500',
        discount: '66% OFF',
        description: 'Unmatched visual extravaganza! 60 rapid-fire aerial mortars covering the sky with dazzling colors.',
        badgeNote: 'Grand Finale',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Shot Count', value: '60 Aerial Shots' },
            { label: 'Duration', value: 'Approx. 90 Seconds continuous' },
            { label: 'Burst Altitude', value: '180+ Feet' },
            { label: 'Finish', value: 'Titanium salute crackle finale' },
            { label: 'Safe Distance', value: 'Open terrace or ground (25 Meters)' }
        ],
        types: ['60 Shots Symphony', '120 Shots Royal Extravaganza'],
        minimumOrder: '1 Piece',
    },
    {
        id: 'single-sky-shot-pipe',
        title: 'Single Sky Shot (Pack of 5)',
        order: 32,
        category: 'Aerial & Sky Shots',
        categorySlug: 'sky-shots',
        image: skyShotsImg,
        price: '₹220',
        originalPrice: '₹750',
        discount: '70% OFF',
        description: 'Powerful single mortars launching high up into the clouds with thunderous boom and color stars.',
        badgeNote: 'Loud & High',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '5 Heavy Mortar Pipes' },
            { label: 'Altitude', value: '150 Feet' },
            { label: 'Sound Level', value: 'Loud Thunder Burst' },
            { label: 'Colors', value: 'Assorted Red, Green, Gold, Silver' }
        ],
        types: ['Chilli Sky Shot', '7-Color Single Shot'],
        minimumOrder: '2 Packs',
    },

    // ── SOUND CRACKERS ────────────────────────────────────────────────────
    {
        id: '1000-wala-red-garland',
        title: '1000 Wala Deluxe Red Garland (Lad)',
        order: 40,
        category: 'Sound Crackers & Garlands',
        categorySlug: 'sound-crackers',
        image: soundCrackersImg,
        price: '₹380',
        originalPrice: '₹1200',
        discount: '68% OFF',
        description: 'Traditional long red firecracker chain delivering rhythmic, thunderous, festive celebration bursts.',
        badgeNote: 'Diwali Classic',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '1 Long Garland Chain Roll' },
            { label: 'Cracker Count', value: '1000 Red Crackers' },
            { label: 'Sound Level', value: 'Crisp, festive decibel within PESO limit' },
            { label: 'Safe Distance', value: '10 Meters' },
            { label: 'Fuse', value: 'Reliable safety braided fuse' }
        ],
        types: ['100 Wala', '1000 Wala', '2000 Wala', '5000 Wala Jumbo'],
        minimumOrder: '2 Rolls',
    },
    {
        id: 'hydro-bomb-sound-cracker',
        title: 'Hydro Bomb / Atom Bomb (Green Formula)',
        order: 41,
        category: 'Sound Crackers & Garlands',
        categorySlug: 'sound-crackers',
        image: soundCrackersImg,
        price: '₹140',
        originalPrice: '₹450',
        discount: '69% OFF',
        description: 'Compact green atom bomb producing a crisp, thunderous sound that resonates through the neighborhood.',
        badgeNote: 'High Sound',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Bombs per Box' },
            { label: 'Sound Level', value: 'High intensity within legal limit' },
            { label: 'Safe Distance', value: '15 Meters' },
            { label: 'Emission', value: 'Reduced smoke green formulation' }
        ],
        types: ['Classic Hydro Bomb', 'Green Atom Bomb', 'King Kong Mega Bomb'],
        minimumOrder: '3 Boxes',
    },

    // ── ROCKETS & MISSILES ────────────────────────────────────────────────
    {
        id: 'whistling-rocket',
        title: 'Whistling Sky Rockets (Pack of 10)',
        order: 50,
        category: 'Rockets & Missiles',
        categorySlug: 'rockets-missiles',
        image: rocketsImg,
        price: '₹260',
        originalPrice: '₹850',
        discount: '70% OFF',
        description: 'Soars straight into the sky with a high-pitched siren whistle before bursting into a sparkling shower.',
        badgeNote: 'Exciting',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '10 Rockets per Box' },
            { label: 'Altitude', value: '150 – 200 Feet' },
            { label: 'Sound', value: 'Whistling siren + aerial report' },
            { label: 'Launching Method', value: 'Use sturdy upright launcher bottle/stand' }
        ],
        types: ['Baby Rocket', 'Whistling Rocket', 'Lunik Multi-Burst Rocket'],
        minimumOrder: '2 Boxes',
    },

    // ── KIDS NOVELTIES ────────────────────────────────────────────────────
    {
        id: 'kids-party-sparkle-box',
        title: 'Kids Fun Novelty Box (Assorted 8 Items)',
        order: 60,
        category: 'Kids Specials & Novelties',
        categorySlug: 'kids-novelties',
        image: kidsNoveltiesImg,
        price: '₹280',
        originalPrice: '₹850',
        discount: '67% OFF',
        description: 'Specially created for young kids: Pop-pops, snake tablets, magic pencils, color smoke, and flash torches.',
        badgeNote: 'Kids Favorite',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Pack Quantity', value: '8 Diverse Fun Novelty Packs' },
            { label: 'Contents', value: 'Roll Caps, Pop Pops, Magic Whistle, Serpent Eggs, Color Smoke' },
            { label: 'Safety Level', value: 'Zero burst hazard / Child friendly' },
            { label: 'Smoke Emission', value: 'Minimal / Eco formulation' }
        ],
        types: ['Junior Fun Kit', 'Super Star Novelty Kit'],
        minimumOrder: '2 Boxes',
    },

    // ── DIWALI GIFT BOXES ─────────────────────────────────────────────────
    {
        id: 'family-deluxe-gift-box',
        title: 'Vinayaga Family Delight Gift Box (35 Items)',
        order: 70,
        category: 'Diwali Festive Gift Boxes',
        categorySlug: 'diwali-gift-boxes',
        image: giftBoxesImg,
        price: '₹1450',
        originalPrice: '₹4800',
        discount: '70% OFF',
        description: 'Complete family package with a balanced assortment of Sparklers, Flower Pots, Chakkars, Sky Shots & Sound Crackers.',
        badgeNote: 'Most Popular',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Total Items', value: '35 Assorted Cracker Varieties' },
            { label: 'Box Weight', value: 'Approx. 5.5 KG' },
            { label: 'Packaging', value: 'Heavy festive printed gift suitcase box' },
            { label: 'Family Size', value: 'Ideal for 3 – 5 Persons' },
            { label: 'Savings', value: 'Save over ₹3,350 from market retail' }
        ],
        types: ['Economy Box (25 Items)', 'Deluxe Box (35 Items)', 'VIP Jumbo Box (55 Items)', 'Royal Sivakasi Box (75 Items)'],
        minimumOrder: '1 Box',
        varieties: [
            { title: 'Deluxe 35 Items Box', desc: '10 Sparklers, 6 Flower Pots, 6 Chakkars, 4 Sky Shots, 4 Sound Crackers, 5 Kids items.', img: giftBoxesImg },
            { title: 'Royal 75 Items Hamper', desc: 'Grandest box featuring premium multi-shot cakes, giant sparklers, and mega fountains.', img: giftBoxesImg }
        ]
    },
    {
        id: 'royal-vip-hamper-75',
        title: 'Royal Sivakasi VIP Fireworks Hamper (75 Items)',
        order: 71,
        category: 'Diwali Festive Gift Boxes',
        categorySlug: 'diwali-gift-boxes',
        image: heroFireworksImg,
        price: '₹3490',
        originalPrice: '₹11500',
        discount: '70% OFF',
        description: 'The ultimate royal celebration box! Packed with 75 luxury crackers, multi-shot sky cakes, giant flower pots, and spinners.',
        badgeNote: 'Luxury VIP',
        safetyRating: '100% Green Cracker',
        specifications: [
            { label: 'Total Items', value: '75 Grand Varieties' },
            { label: 'Box Weight', value: 'Approx. 12 KG' },
            { label: 'Packaging', value: 'Premium rigid cardboard gift suitcase with carry handle' },
            { label: 'Delivery', value: 'Direct dispatch with safe transport packing' }
        ],
        types: ['Royal VIP Hamper (75 Items)'],
        minimumOrder: '1 Box',
    }
];
