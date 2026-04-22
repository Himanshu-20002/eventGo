const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const props = [
  {
    name: "Pastel Balloon Decor",
    price: 1500,
    rating: 4.5,
    available: true,
    theme: "birthday",
    color: "pastel",
    category: "decor",
    tags: ["birthday", "pastel", "balloon", "kids"],
  },
  {
    name: "Wedding Floral Stage",
    price: 8000,
    rating: 4.8,
    available: true,
    theme: "wedding",
    color: "floral",
    category: "stage",
    tags: ["wedding", "flowers", "stage", "luxury"],
  },
  {
    name: "LED String Lights",
    price: 700,
    rating: 4.2,
    available: true,
    theme: "general",
    color: "warm",
    category: "lighting",
    tags: ["lights", "warm", "indoor", "decor"],
  },
  {
    name: "Birthday Cartoon Backdrop",
    price: 1200,
    rating: 4.6,
    available: true,
    theme: "birthday",
    color: "colorful",
    category: "backdrop",
    tags: ["birthday", "kids", "cartoon"],
  },
  {
    name: "Baby Shower Setup",
    price: 3000,
    rating: 4.7,
    available: true,
    theme: "baby shower",
    color: "pastel",
    category: "decor",
    tags: ["baby", "shower", "pastel"],
  }
];

// 🔥 auto-generate more data
for (let i = 0; i < 20; i++) {
  props.push({
    name: `Decor Item ${i}`,
    price: Math.floor(Math.random() * 5000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1),
    available: true,
    theme: ["wedding", "birthday", "baby shower"][i % 3],
    color: ["pastel", "gold", "floral"][i % 3],
    category: "decor",
    tags: ["event", "decor", "party"],
  });
}

const upload = async () => {
  for (let item of props) {
    await db.collection("props").add(item);
    console.log("Uploaded:", item.name);
  }

  console.log("🔥 ALL DATA UPLOADED");
};

upload();