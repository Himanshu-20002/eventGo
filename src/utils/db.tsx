export const menuData = [
    { name: 'Kart', iconUri: require('../assets/icons/shopping.png') },
    { name: 'Grocery', iconUri: require('../assets/icons/grocery.png') },
    { name: 'Travel', iconUri: require('../assets/icons/travel.png') },
    { name: 'Pay', iconUri: require('../assets/icons/pay.png') }
]

export const slipData = ['PREMIUM FINDS', "100% GENUINE BRAND", "FREE SHIPPING", "EASY RETURNS", "24/7 CUSTOMER SUPPORT"]

export const searchItems: string[] = ['Watches', 'Laptops', 'T-shirts', 'Shoes', 'Bags', 'Headphones', 'Sunglasses']

export const categoriesData = [
    { id: 1, name: "Organizer", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/121/121/image/18a00dd8cb47884d.jpg?q=60' },
    { id: 2, name: "Events", image_uri: 'https://res.cloudinary.com/da41fzsmk/image/upload/v1763997122/Screenshot_2025-11-24_203352_1_1_pgs5vi.png' },
    { id: 3, name: "PropRental", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/121/121/image/18a00dd8cb47884d.jpg?q=60' },


]

export const dynamicDashboardData = [
    {
        type: "ad_carousal",
        data: [
            { id: 1, image_uri: require('@assets/images/banner1.png'), path: "/ad1" },
            { id: 2, image_uri: require('@assets/images/banner2.png'), path: "/ad2" },
            { id: 3, image_uri: require('@assets/images/banner3.png'), path: "/ad2" },
            { id: 4, image_uri: require('@assets/images/banner5.png'), path: "/ad2" },
        ],
    },
    {
        type: "categories",
        data: categoriesData,
    },

    {
        type: "sponser",
        data: [{
            id: 2,
            image_uri: "https://res.cloudinary.com/da41fzsmk/image/upload/v1763993992/comingSoon_wibtjk.png",
            path: '/sponser1'
        }]
    },

    {
        type: "horizontal_list",
        title: "Organizers",
        data: [
            { id: 1, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/4d790d95eab9b756.jpg?q=20' },
            { id: 2, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/d269de10795cd29e.jpg?q=20' },
            { id: 3, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/4ce286f7b3ddd5db.jpg?q=20' },
            { id: 4, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/7723bd9e53937442.jpg?q=20' },
            { id: 5, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/e6a8222e73b47590.jpg?q=20' },
        ]
    },
    {
        type: "vertical_list",
        title: "BEST OF BRAND OFFERS",
        bgColor: '#CDDEDA',
        btnColor: "#2F4D4B",
        data: [
            { id: 1, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/t-shirt/m/9/u/l-tsrt-catalog-14-kajaru-original-imah4qtagcpkxxzs.jpeg?q=60&crop=false', title: "T-shirts", subTitle: "Upto 50% off" },
            { id: 3, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/jean/q/z/g/32-t-baggy-light-blue-tidda-original-imah3ztwwzsvtfax.jpeg?q=60&crop=false', title: "Jeans", subTitle: "Upto 40% off" },
            { id: 4, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/jacket/i/l/p/xl-1-no-heavy-upar-0-futse-peno-original-imah6hzhet6zpyaa.jpeg?q=60&crop=false', title: "Jackets", subTitle: "Upto 60% off" },
            { id: 5, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/kurta/x/f/y/l-kurta1513-bellstone-original-imah7nywnygwdqhv.jpeg?q=60&crop=false', title: "Kurtas", subTitle: "Upto 50% off" },
        ]
    },
    {
        type: "sponser",
        data: [{
            id: 3,
            image_uri: "https://res.cloudinary.com/da41fzsmk/image/upload/v1763995096/White_And_Black_Gradient_Coming_Soon_Email_Header_cxevsz.png",
            path: '/sponser2'
        }]
    },
    {
        type: "animated_horizontal_list",
        title: "TOP PICKS GEN-Z",
        data: [
            { id: 1, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/shirt/k/2/n/xxl-box01-jackbella-original-imah4hhhse4gzghk.jpeg?q=60&crop=false' },
            { id: 3, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/shirt/e/i/h/xxl-men-regular-slim-fit-solid-button-down-collar-formal-shirt-original-imaggvvnywmgthyq.jpeg?q=60&crop=false' },
            { id: 4, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/shirt/w/0/a/s-0721-sh95-08-the-indian-garage-co-original-imagmhjgdyr4zeaq.jpeg?q=60&crop=false' },
            { id: 5, path: "", image_uri: 'https://rukminim2.flixcart.com/image/536/644/xif0q/trouser/r/k/5/30-phtr000026-highlander-original-imagua3nckfuzzgw.jpeg?q=60&crop=false' },
        ]
    },
    // {
    //     type: "horizontal_list",
    //     title: "Featured on Kart",
    //     data: [
    //         { id: 1, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/a346fdef9457ab5e.jpg?q=20' },
    //         { id: 2, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/1bd8d123afe6cd26.jpg?q=20' },
    //         { id: 3, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/725a60752b6ac21d.jpg?q=20' },
    //         { id: 4, path: "", image_uri: 'https://rukminim2.flixcart.com/fk-p-flap/480/720/image/2b990fef244e3d2f.jpg?q=20' },
    //     ]
    // },
    {
        type: "vertical_list",
        title: "BEST OF BRAND OFFERS",
        bgColor: "#DCD2A2",
        btnColor: "#5C5037",
        data: [
            { id: 1, path: "", image_uri: 'https://m.media-amazon.com/images/I/71tGtBuo0yL._AC_UY436_FMwebp_QL65_.jpg', title: "Wireless Mouse", subTitle: "Top Picks" },
            { id: 3, path: "", image_uri: 'https://m.media-amazon.com/images/I/81CwAlYjJ4L.__AC_SX300_SY300_QL70_FMwebp_.jpg', title: "Sofa", subTitle: "Wildest Range" },
            { id: 4, path: "", image_uri: 'https://m.media-amazon.com/images/I/71EWAUphg2L._AC_UY436_FMwebp_QL65_.jpg', title: "Laptop", subTitle: "In Focus Now" },
            { id: 5, path: "", image_uri: 'https://media.istockphoto.com/id/1408099652/photo/xbox.jpg?s=612x612&w=0&k=20&c=U35tDYndjlTUebitLvkqE1_xbzCihjRhlGaE9mmD7ck=', title: "Gaming Console", subTitle: "Genuine" },
        ]
    },
]

export const productData = [
    {
        "id": 1,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Google Pixel 4",
        "desc": "The Google phone with MotionSense, an evolved camera, and the new Google Assistant.",
        "price": 799,
        "ar_uri": null
    },
    {
        "id": 2,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Apple MacBook Pro",
        "desc": "16-inch MacBook Pro with Touch Bar, 16GB RAM, and 512GB SSD storage.",
        "price": 2399,
        "ar_uri": "https://example.com/ar/apple_macbook_pro"
    },
    {
        "id": 3,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Sony WH-1000XM4",
        "desc": "Industry-leading noise-canceling over-ear headphones with up to 30 hours of battery life.",
        "price": 349,
        "ar_uri": null
    },
    {
        "id": 4,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Nike Air Max 270",
        "desc": "Breathable mesh sneakers with a large Air unit for all-day comfort.",
        "price": 150,
        "ar_uri": "https://example.com/ar/nike_air_max_270"
    },
    {
        "id": 5,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Samsung Galaxy Watch",
        "desc": "Smartwatch with fitness tracking, GPS, and long-lasting battery life.",
        "price": 299,
        "ar_uri": null
    },
    {
        "id": 6,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Dyson V11 Vacuum Cleaner",
        "desc": "Cordless vacuum cleaner with powerful suction and intelligent cleaning modes.",
        "price": 599,
        "ar_uri": "https://example.com/ar/dyson_v11_vacuum"
    },
    {
        "id": 7,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Fitbit Charge 4",
        "desc": "Advanced fitness tracker with built-in GPS, heart rate monitoring, and sleep tracking.",
        "price": 149,
        "ar_uri": null
    },
    {
        "id": 8,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Instant Pot Duo 7-in-1",
        "desc": "Multi-use programmable pressure cooker with 7 cooking functions.",
        "price": 89,
        "ar_uri": "https://example.com/ar/instant_pot_duo"
    },
    {
        "id": 9,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "LEGO Star Wars Millennium Falcon",
        "desc": "Detailed LEGO model of the Millennium Falcon with 1,351 pieces.",
        "price": 159,
        "ar_uri": null
    },
    {
        "id": 10,
        "image_uri": "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/g/v/l-126703706-jack-jones-original-imagt4rhgg6ehhct.jpeg?q=70",
        "name": "Bose SoundLink Revolve",
        "desc": "Portable Bluetooth speaker with 360-degree sound and water-resistant design.",
        "price": 199,
        "ar_uri": "https://example.com/ar/bose_soundlink_revolve"
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
