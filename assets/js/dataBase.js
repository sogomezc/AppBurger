const usuarios = [
  { nombre: "admin", password: "1234" },
  { nombre: "cliente", password: "abcd" }
];

// Para poder usarlo en otros scripts
window.usuarios = usuarios;

// --- BASE DE DATOS DE PRODUCTOS --- 🍔
const productosDB = [
    // --- Combos ---
    {
        id: 1,
        nombre: 'Combo Clásica',
        categoria: 'Combos',
        precio: 7990,
        descripcion: 'Hamburguesa 120g, doble chedar, pepinillos, salsa Golden, tomate, lechuga, cebolla morada y pepinillos.',
        stock: 5,
        imagen: '/assets/images/ComboClasica.JPG'
    },
    // --- Burgers ---
    {
        id: 2,
        nombre: 'Clásica',
        categoria: 'Burgers',
        precio: 6990,
        descripcion: 'Hamburguesa 120g, doble chedar, pepinillos, salsa Golden, tomate, lechuga, cebolla morada y pepinillos.',
        stock: 5,
        imagen: '/assets/images/Clasica.PNG'
    },
    {
        id: 3,
        nombre: 'Champiñon',
        categoria: 'Burgers',
        precio: 8790,
        descripcion: 'Hamburguesa 120g, queso mantecoso, champiñones, cebolla caramelizada y Mayonesa.',
        stock: 5,
        imagen: '/assets/images/Champiñon.JPG'
    },
    {
        id: 4,
        nombre: 'Triple Queso',
        categoria: 'Burgers',
        precio: 9990,
        descripcion: 'Hamburguesa 120g, triple cheddar, ketchup y pepinillos.',
        stock: 5,
        imagen: '/assets/images/TripleQueso.PNG'
    },
    {
        id: 5,
        nombre: 'Golden',
        categoria: 'Burgers',
        precio: 7990,
        descripcion: 'Hamburguesa 120g, doble cheddar, pepinillos, tocino, salsa golden.',
        stock: 5,
        imagen: '/assets/images/Golden.PNG'
    },
    {
        id: 6,
        nombre: 'Bacon BBQ',
        categoria: 'Burgers',
        precio: 8990,
        descripcion: 'Hamburguesa premium 120gr, doble cheddar, doble bacon, salsa BBQ y cebolla crispy.',
        stock: 5,
        imagen: '/assets/images/BaconBBQ.PNG'
    },
    {
        id: 7,
        nombre: 'Italiana',
        categoria: 'Burgers',
        precio: 6290,
        descripcion: 'Hamburguesa 120g, Palta, tomate y mayonesa.',
        stock: 5,
        imagen: '/assets/images/Italiana.PNG'
    },
    {
        id: 8,
        nombre: 'Spicy',
        categoria: 'Burgers',
        precio: 7790,
        descripcion: 'Hamburguesa premium 120g, cheddar, jalapeños, bacon, cebolla crispy y salsa spicy.',
        stock: 5,
        imagen: '/assets/images/Spicy.JPG'
    },
    {
        id: 9,
        nombre: 'Bacon Cheeseburger',
        categoria: 'Burgers',
        precio: 6990,
        descripcion: 'Hamburguesa 120g, doble cheddar, pepinillos, cebolla, tocino y salsa Golden.',
        stock: 5,
        imagen: '/assets/images/BaconCheese.PNG'
    },
    {
        id: 10,
        nombre: 'Cheeseburger',
        categoria: 'Burgers',
        precio: 7890,
        descripcion: 'Hamburguesa 120g, doble cheddar, pepinillos, cebolla y salsa Golden.',
        stock: 5,
        imagen: '/assets/images/Cheeseburger.PNG'
    },
    // --- Acompañamientos ---
    {
        id: 11,
        nombre: 'Papas Golden',
        categoria: 'Acompañamientos',
        precio: 6990,
        descripcion: 'Papas fritas cubiertas de cheddar y topping de tocino crispy.',
        stock: 5,
        imagen: '/assets/images/papasGolden.JPG'
    },
    {
        id: 12,
        nombre: 'Chicken Pop',
        categoria: 'Acompañamientos',
        precio: 6990,
        descripcion: 'Bolitas crujientes de pollo.',
        stock: 5,
        imagen: '/assets/images/ChickenPop.PNG'
    },
    // --- Refrescos ---
    {
        id: 13,
        nombre: 'Coca-Cola',
        categoria: 'Refrescos',
        precio: 1490,
        descripcion: 'Coca-Cola original 350 ml.',
        stock: 5,
        imagen: '/assets/images/CocaCola.PNG'
    },
    {
        id: 14,
        nombre: 'Coca-Cola Zero',
        categoria: 'Refrescos',
        precio: 1490,
        descripcion: 'Coca-Cola sin azucar 350 ml.',
        stock: 5,
        imagen: '/assets/images/CocaZero.JPG'
    },
    {
        id: 15,
        nombre: 'Fanta',
        categoria: 'Refrescos',
        precio: 1490,
        descripcion: 'Fanta Original 350 ml.',
        stock: 5,
        imagen: '/assets/images/Fanta.JPG'
    },
    {
        id: 16,
        nombre: 'Sprite',
        categoria: 'Refrescos',
        precio: 1490,
        descripcion: 'Bebida refresacnte sabor lima 350 ml.',
        stock: 5,
        imagen: '/assets/images/Sprite.JPG'
    },
    {
        id: 17,
        nombre: 'Jumex',
        categoria: 'Refrescos',
        precio: 1490,
        descripcion: 'Nectar de frutas sabor durazno 350 ml.',
        stock: 5,
        imagen: '/assets/images/Jumex.JPG'
    },
    // --- Kids ---
    {
        id: 18,
        nombre: 'Avocado Kids',
        categoria: 'Kids',
        precio: 3890,
        descripcion: 'Hamburguesa con Palta.',
        stock: 5,
        imagen: '/assets/images/AvocadoKids.PNG'
    },
    {
        id: 19,
        nombre: 'Play Queso',
        categoria: 'Kids',
        precio: 3890,
        descripcion: 'Hamburguesa con queso.',
        stock: 5,
        imagen: '/assets/images/Playqueso.PNG'
    }
];

// Para poder usar los productos en otros scripts
window.productosDB = productosDB;