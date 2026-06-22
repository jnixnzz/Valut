const items = [
  { 
   id: 1,
   name: 'Canon e0S R5 Camera',
    category: 'cameras'
    price: 45,
  location: 'San Francisco, CA',
  rating: 4.9,
reviews: 128,
        description: 'Professional mirrorless camera with 4K video',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 2,
        name: 'DJI Air 2S Drone',
        category: 'drones',
        price: 35,
        location: 'New York, NY',
        rating: 4.8,
        reviews: 95,
        description: '4K camera drone with 31 min flight time',
        image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
 {
        id: 3,
        name: 'Camping Tent Set',
        category: 'camping',
        price: 25,
        location: 'Denver, CO',
        rating: 4.7,
        reviews: 62,
        description: '4-person tent with sleeping bags included',
        image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
{
        id: 4,
        name: 'Makita Power Drill Kit',
        category: 'tools',
        price: 15,
        location: 'Austin, TX',
        rating: 4.9,
        reviews: 156,
        description: 'Professional drill set with all accessories',
        image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },

        id: 5,
        name: 'Mountain Bike Pro',
        category: 'sports',
        price: 30,
        location: 'Boulder, CO',
        rating: 4.8,
        reviews: 87,
        description: 'Full suspension mountain bike, excellent condition',
        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        id: 6,
        name: 'Electric Keyboard',
        category: 'instruments',
        price: 20,
        location: 'Los Angeles, CA',
        rating: 4.6,
        reviews: 44,
        description: '88-key weighted keyboard with stand',
        image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
];
let cart = [];
let favorites = [];
 
// ============================================
// 1. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
 
// ============================================
// 2. MOBILE MENU TOGGLE
// ============================================
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
    }
}
 
// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth < 768) {
            navMenu.style.display = 'none';
        }
    });
});
 
// ============================================
// 3. CATEGORY FILTERING
// ============================================
function filterByCategory(category) {
    const itemsGrid = document.querySelector('.items-grid');
    
    if (category === 'all') {
        displayItems(items);
    } else {
        const filtered = items.filter(item => item.category === category);
        displayItems(filtered);
    }
}
 
// ============================================
// 4. SEARCH FUNCTIONALITY
// ============================================
function searchItems(query) {
    const filtered = items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    displayItems(filtered);
}
 
// Add search input listener
const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchItems(e.target.value);
    });
}
