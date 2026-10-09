import bundleTablePhoto from '../assets/crackers/bundle-60-items-photo.jpg';
import bundle70TablePhoto from '../assets/crackers/bundle-70-items-photo.jpg';
import { oneSoundProducts } from './oneSoundProducts';
import { groundChakkarsProducts } from './groundChakkarsProducts';
import { flowerPotsProducts } from './flowerPotsProducts';
import { twinklingStarProducts } from './twinklingStarProducts';
import { pencilCrackersProducts } from './pencilCrackersProducts';
import { childrenFountainProducts } from './childrenFountainProducts';
import { peacockFountainProducts } from './peacockFountainProducts';
import { bombProducts } from './bombProducts';
import { rocketProducts } from './rocketProducts';
import { bijiliProducts } from './bijiliProducts';
import { chorsaDeluxeProducts } from './chorsaDeluxeProducts';
import { walaProducts } from './walaProducts';
import { arialNightShotProducts } from './arialNightShotProducts';
import { fancySkyShotProducts } from './fancySkyShotProducts';
import { repeaterShotProducts } from './repeaterShotProducts';
import { rollcapMatchesProducts } from './rollcapMatchesProducts';
import { sparklersProducts } from './sparklersProducts';
import { newCrackers2025Products } from './newCrackers2025Products';

export const priceListCategories = [
    {
        id: 'mega-bundles',
        titleEn: 'MEGA SPECIAL COMBO PACKS',
        titleTa: 'தீபாவளி மெகா ஸ்பெஷல் காம்போ பேக்',
        slug: 'mega-combo-packs',
        badge: '🔥 64% Discount Hamper',
        itemCount: 2,
        color: '#E11D48'
    },
    {
        id: 'one-sound',
        titleEn: 'ONE SOUND CRACKERS',
        titleTa: 'ஒற்றை வெடிகள்',
        slug: 'one-sound-crackers',
        badge: 'High Decibel',
        itemCount: 9,
        color: '#DC2626'
    },
    {
        id: 'ground-chakkars',
        titleEn: 'GROUND CHAKKARS',
        titleTa: 'தரைச்சக்கரம் வகைகள்',
        slug: 'ground-chakkars',
        badge: 'Spinning Sparklers',
        itemCount: 11,
        color: '#D97706'
    },
    {
        id: 'flower-pots',
        titleEn: 'FLOWER POTS',
        titleTa: 'பூச்சட்டி வகைகள்',
        slug: 'flower-pots',
        badge: 'Color Fountains',
        itemCount: 7,
        color: '#EA580C'
    },
    {
        id: 'twinkling-star',
        titleEn: 'TWINKLING STAR',
        titleTa: 'சாட்டை வகைகள்',
        slug: 'twinkling-star',
        badge: 'Sparkling Whips',
        itemCount: 2,
        color: '#8B5CF6'
    },
    {
        id: 'pencil-crackers',
        titleEn: 'PENCIL CRACKERS',
        titleTa: 'பென்சில் வகைகள்',
        slug: 'pencil-crackers',
        badge: 'Pencil & Stone Crackers',
        itemCount: 9,
        color: '#2563EB'
    },
    {
        id: 'childrens-special-fountains',
        titleEn: "CHILDREN'S SPECIAL FOUNTAINS",
        titleTa: 'குழந்தைகள் சிறப்பு பவுண்டைன்ஸ்',
        slug: 'childrens-special-fountains',
        badge: 'Special Fountains',
        itemCount: 20,
        color: '#0891B2'
    },
    {
        id: 'peacock-fountains',
        titleEn: 'PEACOCK FOUNTAINS',
        titleTa: 'பீக்காக் பவுண்டைன்',
        slug: 'peacock-fountains',
        badge: 'Peacock Fountains',
        itemCount: 6,
        color: '#059669'
    },
    {
        id: 'bomb-crackers',
        titleEn: 'BOMB CRACKERS',
        titleTa: 'பாம் வகைகள்',
        slug: 'bomb-crackers',
        badge: 'High Decibel Bombs',
        itemCount: 7,
        color: '#DC2626'
    },
    {
        id: 'rockets',
        titleEn: 'ROCKETS',
        titleTa: 'ராக்கெட் வகைகள்',
        slug: 'rockets',
        badge: 'Sky Rockets',
        itemCount: 6,
        color: '#7C3AED'
    },
    {
        id: 'bijili-crackers',
        titleEn: 'BIJILI CRACKERS',
        titleTa: 'பிஜிலி வகைகள்',
        slug: 'bijili-crackers',
        badge: 'Bijili Crackers',
        itemCount: 4,
        color: '#EA580C'
    },
    {
        id: 'chorsa-deluxe-crackers',
        titleEn: 'CHORSA & DELUXE CRACKERS',
        titleTa: 'சோர்சா & டீலக்ஸ் கிராக்கர்ஸ்',
        slug: 'chorsa-deluxe-crackers',
        badge: 'Deluxe Crackers',
        itemCount: 5,
        color: '#E11D48'
    },
    {
        id: 'wala-crackers',
        titleEn: 'WALA',
        titleTa: 'சரவெடிகள்',
        slug: 'wala-crackers',
        badge: 'Continuous Burst Garland',
        itemCount: 7,
        color: '#DC2626'
    },
    {
        id: 'arial-night-shots',
        titleEn: 'ARIAL NIGHT SHOTS',
        titleTa: 'ஏரியல் நைட் சாட்ஸ்',
        slug: 'arial-night-shots',
        badge: 'Sky Night Shots',
        itemCount: 4,
        color: '#2563EB'
    },
    {
        id: 'fancy-sky-shots',
        titleEn: 'FANCY SKY SHOTS',
        titleTa: 'பேன்சி ஸ்கை சாட்ஸ்',
        slug: 'fancy-sky-shots',
        badge: 'Pipe Sky Shots',
        itemCount: 12,
        color: '#8B5CF6'
    },
    {
        id: 'repeater-shots',
        titleEn: 'MULTI SKY SHOTS',
        titleTa: 'மல்டி ஸ்கை சாட்ஸ்',
        slug: 'repeater-shots',
        badge: 'Multi-Shot Cakes',
        itemCount: 10,
        color: '#D97706'
    },
    {
        id: 'rollcap-matches',
        titleEn: 'ROLLCAP & COLOUR MATCHES',
        titleTa: 'ரோல் கேப்ஸ் & கலர் மத்தப்புகள்',
        slug: 'rollcap-matches',
        badge: 'Rollcap & Matches',
        itemCount: 6,
        color: '#EA580C'
    },
    {
        id: 'sparklers',
        titleEn: 'SPARKLERS',
        titleTa: 'கம்பிமத்தாப்புகள்',
        slug: 'sparklers',
        badge: 'Sparklers',
        itemCount: 23,
        color: '#F59E0B'
    },
    {
        id: 'new-crackers-2025',
        titleEn: '2025 NEW CRACKERS',
        titleTa: 'புதிய வரவுகள்',
        slug: 'new-crackers-2025',
        badge: '2025 Novelties & Gift Boxes',
        itemCount: 42,
        color: '#E11D48'
    }
];

export const priceListProducts = [
    // ── MEGA SPECIAL COMBO PACKS - மெகா ஸ்பெஷல் காம்போ பேக் ──
    {
        sno: 'MEGA-1',
        id: 'p-bundle-60',
        nameEn: 'Vinayaga Family Pack - 60 Items Special Combo',
        nameTa: 'வினாயகா ஃபேமிலி பேக் - 60 பொருட்கள் (ரூ.7000 மதிப்பு)',
        categoryKey: 'mega-bundles',
        categoryEn: 'MEGA SPECIAL COMBO PACKS',
        categoryTa: 'தீபாவளி மெகா ஸ்பெஷல் காம்போ பேக்',
        price: 7000,
        discountPrice: 2499,
        per: '1 Mega Family Hamper',
        image: bundleTablePhoto,
        badge: '🔥 64% Discount Combo',
        tagTa: '60 ரகங்கள் மெகா பேக்'
    },
    {
        sno: 'MEGA-2',
        id: 'p-bundle-70',
        nameEn: 'VIP Special Family Pack - 70 Items Mega Set',
        nameTa: 'வி.ஐ.பி ஸ்பெஷல் ஃபேமிலி பேக் - 70 பொருட்கள் (ரூ.10999 மதிப்பு)',
        categoryKey: 'mega-bundles',
        categoryEn: 'MEGA SPECIAL COMBO PACKS',
        categoryTa: 'தீபாவளி மெகா ஸ்பெஷல் காம்போ பேக்',
        price: 10999,
        discountPrice: 3999,
        per: '1 VIP Mega Hamper',
        image: bundle70TablePhoto,
        badge: '👑 VIP Royal Pack',
        tagTa: '70 ரகங்கள் வி.ஐ.பி பேக்'
    },

    // ── ONE SOUND CRACKERS - ஒற்றை வெடிகள் (S.No 1 - 9) ──
    ...oneSoundProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image, badge, tagTa }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'one-sound',
        categoryEn: 'ONE SOUND CRACKERS',
        categoryTa: 'ஒற்றை வெடிகள்',
        price,
        discountPrice,
        per: per || '1 Pkt',
        image,
        badge: badge || 'Classic Best Seller',
        tagTa: tagTa || 'பாரம்பரிய வெடி'
    })),

    // ── GROUND CHAKKARS - தரைச்சக்கரம் வகைகள் (S.No 10 - 20) ──
    ...groundChakkarsProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image, badge, tagTa }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'ground-chakkars',
        categoryEn: 'GROUND CHAKKARS',
        categoryTa: 'தரைச்சக்கரம் வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: badge || 'Spinning Sparklers',
        tagTa: tagTa || 'தரைச்சக்கரம்'
    })),

    // ── FLOWER POTS - பூச்சட்டி வகைகள் (S.No 21 - 27) ──
    ...flowerPotsProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image, badge, tagTa }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'flower-pots',
        categoryEn: 'FLOWER POTS',
        categoryTa: 'பூச்சட்டி வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: badge || 'Color Fountains',
        tagTa: tagTa || 'பூச்சட்டி'
    })),

    // ── TWINKLING STAR - சாட்டை வகைகள் (S.No 28 - 29) ──
    ...twinklingStarProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image, badge, tagTa }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'twinkling-star',
        categoryEn: 'TWINKLING STAR',
        categoryTa: 'சாட்டை வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: badge || 'Sparkling Whips',
        tagTa: tagTa || 'சாட்டை'
    })),

    // ── PENCIL CRACKERS - பென்சில் வகைகள் (S.No 30 - 38) ──
    ...pencilCrackersProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image, badge, tagTa }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'pencil-crackers',
        categoryEn: 'PENCIL CRACKERS',
        categoryTa: 'பென்சில் வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: badge || 'Pencil & Stone',
        tagTa: tagTa || 'பென்சில்'
    })),
    ...childrenFountainProducts.map(({ sno, nameEn, nameTa, price, discountPrice, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'childrens-special-fountains',
        categoryEn: "CHILDREN'S SPECIAL FOUNTAINS",
        categoryTa: 'குழந்தைகள் சிறப்பு பவுண்டைன்ஸ்',
        price,
        discountPrice,
        per: '1 Box',
        image,
        badge: 'Special Fountain',
        tagTa: 'சிறப்பு பவுண்டைன்'
    })),
    ...peacockFountainProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'peacock-fountains',
        categoryEn: 'PEACOCK FOUNTAINS',
        categoryTa: 'பீக்காக் பவுண்டைன்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Peacock Fountain',
        tagTa: 'மயில் பவுண்டைன்'
    })),
    ...bombProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'bomb-crackers',
        categoryEn: 'BOMB CRACKERS',
        categoryTa: 'பாம் வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Bomb Cracker',
        tagTa: 'அதிரடி பாம்'
    })),
    ...rocketProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'rockets',
        categoryEn: 'ROCKETS',
        categoryTa: 'ராக்கெட் வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Sky Rocket',
        tagTa: 'வான்வெடி ராக்கெட்'
    })),
    ...bijiliProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'bijili-crackers',
        categoryEn: 'BIJILI CRACKERS',
        categoryTa: 'பிஜிலி வகைகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Bijili Cracker',
        tagTa: 'பிஜிலி வெடி'
    })),
    ...chorsaDeluxeProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'chorsa-deluxe-crackers',
        categoryEn: 'CHORSA & DELUXE CRACKERS',
        categoryTa: 'சோர்சா & டீலக்ஸ் கிராக்கர்ஸ்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Deluxe Cracker',
        tagTa: 'டீலக்ஸ் வெடி'
    })),
    ...walaProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'wala-crackers',
        categoryEn: 'WALA',
        categoryTa: 'சரவெடிகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Sara Vedi',
        tagTa: 'சரவெடி'
    })),
    ...arialNightShotProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'arial-night-shots',
        categoryEn: 'ARIAL NIGHT SHOTS',
        categoryTa: 'ஏரியல் நைட் சாட்ஸ்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Arial Night Shot',
        tagTa: 'நைட் ஷாட்'
    })),
    ...fancySkyShotProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'fancy-sky-shots',
        categoryEn: 'FANCY SKY SHOTS',
        categoryTa: 'பேன்சி ஸ்கை சாட்ஸ்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Fancy Sky Shot',
        tagTa: 'பேன்சி ஸ்கை சாட்'
    })),
    ...repeaterShotProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'repeater-shots',
        categoryEn: 'MULTI SKY SHOTS',
        categoryTa: 'மல்டி ஸ்கை சாட்ஸ்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Multi-Shot Cake',
        tagTa: 'மல்டி ஷாட்ஸ்'
    })),
    ...rollcapMatchesProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'rollcap-matches',
        categoryEn: 'ROLLCAP & COLOUR MATCHES',
        categoryTa: 'ரோல் கேப்ஸ் & கலர் மத்தப்புகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Roll Cap & Match',
        tagTa: 'ரோல் கேப்'
    })),
    ...sparklersProducts.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'sparklers',
        categoryEn: 'SPARKLERS',
        categoryTa: 'கம்பிமத்தாப்புகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: 'Sparklers',
        tagTa: 'கம்பிமத்தாப்பு'
    })),
    ...newCrackers2025Products.map(({ sno, nameEn, nameTa, price, discountPrice, per, image }) => ({
        sno,
        id: `p-${sno}`,
        nameEn,
        nameTa,
        categoryKey: 'new-crackers-2025',
        categoryEn: '2025 NEW CRACKERS',
        categoryTa: 'புதிய வரவுகள்',
        price,
        discountPrice,
        per: per || '1 Box',
        image,
        badge: '2025 New Arrival',
        tagTa: 'புதிய வரவு'
    }))
];
