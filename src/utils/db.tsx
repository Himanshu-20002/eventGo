export const menuData = [
    { name: 'Kart', iconUri: require('../assets/icons/shopping.png') },
    { name: 'Grocery', iconUri: require('../assets/icons/grocery.png') },
    { name: 'Travel', iconUri: require('../assets/icons/travel.png') },
    { name: 'Pay', iconUri: require('../assets/icons/pay.png') }
]

export const slipData = ['PREMIUM FINDS', "100% GENUINE BRAND", "FREE SHIPPING", "EASY RETURNS", "24/7 CUSTOMER SUPPORT"]

export const searchItems: string[] = ['Watches', 'Laptops', 'T-shirts', 'Shoes', 'Bags', 'Headphones', 'Sunglasses']

export const categoriesData = [
    { id: 1, name: "Events", image_uri: 'https://res.cloudinary.com/dniebxelj/image/upload/v1776837828/ChatGPT_Image_Apr_22_2026_11_17_01_AM_w3cx3a.png' },
    { id: 2, name: "Organizer", image_uri: 'https://res.cloudinary.com/dniebxelj/image/upload/v1776837854/ChatGPT_Image_Apr_22_2026_11_32_25_AM_crziee.png' },
    { id: 3, name: "PropRental", image_uri: 'https://res.cloudinary.com/dniebxelj/image/upload/v1776836670/ChatGPT_Image_Apr_22_2026_11_12_52_AM_eq6zvn.png' },
    { id: 4, name: "Stall", image_uri: 'https://res.cloudinary.com/dniebxelj/image/upload/v1776836988/ChatGPT_Image_Apr_22_2026_11_16_43_AM_ziuzqs.png' },


]

export const dynamicDashboardData = [
    {
        type: "categories",
        category: "all",
        data: categoriesData,
    },
    {
        type: "ad_carousal",
        category: "all",
        data: [
            { id: 1, image_uri: require('@assets/images/banner1.png'), path: "/ad1" },
            { id: 2, image_uri: require('@assets/images/banner2.png'), path: "/ad2" },
            { id: 3, image_uri: require('@assets/images/banner3.png'), path: "/ad2" },
        ],
    },
    // EVENTS CATEGORY
    {
        type: "horizontal_list",
        category: "Events",
        title: "🔴 Happening Now: LIVE",
        data: [
            { id: 1, path: "", image_uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600', isLive: true },
            { id: 2, path: "", image_uri: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=600', isLive: true },
            { id: 3, path: "", image_uri: 'https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=600', isLive: true },
        ]
    },
    {
        type: "vertical_list",
        category: "Events",
        title: "Most Anticipated Concerts",
        bgColor: '#1a0b2e',
        btnColor: "#FFC201",
        data: [
            { id: 10, path: "", image_uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400', title: "Summer Beats 2026", subTitle: "Early Bird Open" },
            { id: 11, path: "", image_uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400', title: "Electronic Sky", subTitle: "Selling Fast" },
        ]
    },
    // ORGANIZER CATEGORY
    {
        type: "horizontal_list",
        category: "Organizer",
        title: "Elite Wedding Planners",
        data: [
            { id: 20, path: "", image_uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600' },
            { id: 21, path: "", image_uri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600' },
        ]
    },
    {
        type: "vertical_list",
        category: "Organizer",
        title: "Corporate Event Experts",
        bgColor: '#1a0b2e',
        btnColor: "#8941e7",
        data: [
            { id: 22, path: "", image_uri: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400', title: "Nexus Tech Sumit", subTitle: "B2B Specialist" },
            { id: 23, path: "", image_uri: 'https://images.unsplash.com/photo-1475721027187-40227459a6fe?q=80&w=400', title: "Global Gala Hub", subTitle: "Luxury Branding" },
        ]
    },
    // PROP RENTAL CATEGORY
    {
        type: "product_list",
        category: "PropRental",
        title: "Rent Premium Props",
        data: [
            { id: 'p1', title: "Neon Butterfly Sign", price: "$25/day", availability: "In Stock", image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400' },
            { id: 'p2', title: "Vintage Edison Tree", price: "$120/day", availability: "2 Left", image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c7?q=80&w=400' },
            { id: 'p3', title: "Cyberpunk Smoke Machine", price: "$55/day", availability: "In Stock", image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400' },
        ]
    },
    {
        type: "vertical_list",
        category: "PropRental",
        title: "Stage & Lighting setup",
        bgColor: '#1a0b2e',
        btnColor: "#FFC201",
        data: [
            { id: 32, path: "", image_uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400', title: "Pro Audio Stack", subTitle: "Crystal Clear" },
            { id: 33, path: "", image_uri: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400', title: "Intelligent Moving Heads", subTitle: "DMX Ready" },
        ]
    },
    {
        type: "product_list",
        category: "PropRental",
        title: "Prop Specialty Collection",
        data: [
            { id: 'ps1', title: "Live Acoustic Set", price: "$120/day", availability: "In Stock", image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=400' },
            { id: 'ps2', title: "Vintage Cinema Kit", price: "$85/day", availability: "Limited", image: 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=400' },
        ]
    },
    // STALL CATEGORY
    {
        type: "horizontal_list",
        category: "Stall",
        title: "Popular Food Truck Zones",
        data: [
            { id: 40, path: "", image_uri: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=600' },
            { id: 41, path: "", image_uri: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=600' },
        ]
    },
    {
        type: "vertical_list",
        category: "Stall",
        title: "Expo Stall Fabricators",
        bgColor: '#1a0b2e',
        btnColor: "#D2B48C",
        data: [
            { id: 42, path: "", image_uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400', title: "Modular Booth Pro", subTitle: "Eco-Friendly" },
            { id: 43, path: "", image_uri: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400', title: "Tech Exhibit Pods", subTitle: "Interactive AR" },
        ]
    },
]

export const productData = [
    {
        "id": 1,
        "image_uri": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=400",
        "name": "Live Acoustic Set",
        "desc": "Premium hand-crafted acoustic guitar for unplugged sessions.",
        "price": 120,
        "ar_uri": null
    },
    {
        "id": 2,
        "image_uri": "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=400",
        "name": "Vintage Cinema Projector",
        "desc": "1940s style functional film projector for retro screenings.",
        "price": 85,
        "ar_uri": null
    },
    {
        "id": 3,
        "image_uri": "https://images.unsplash.com/photo-1540932239986-30128078f3c7?q=80&w=400",
        "name": "Modular Edison Chandelier",
        "desc": "Industrial cage lighting with dimmable warm filaments.",
        "price": 45,
        "ar_uri": null
    },
    {
        "id": 4,
        "image_uri": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400",
        "name": "Haze & Fog Machine",
        "desc": "High-output smoke machine for dramatic volumetric lighting.",
        "price": 30,
        "ar_uri": null
    }
]

export const orderData = [
    {
        id: "1",
        deliveryDate: "2025-01-18",
        items: [
            {
                name: "TShirt",
                quantity: 2,
                price: 512,
                imageUri: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70"
            },
            {
                name: "Shocks",
                quantity: 1,
                price: 123,
                imageUri: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70"
            }
        ]
    },
    {
        id: "2",
        deliveryDate: "2025-01-20",
        items: [
            {
                name: "Mouse",
                quantity: 3,
                price: 345,
                imageUri: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70"
            }
        ]
    }
];
