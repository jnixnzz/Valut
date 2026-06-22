const items = [
  { 
    id: 1,
    name: 'Canon EOS R5 Camera',
    category: 'cameras',
    price: 45,
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 128,
    description: 'Professional mirrorless camera with 4K video',
    image: 'linear-gradient(135deg, #C4A5D7 0%, #9B7FBB 100%)'
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
    image: 'linear-gradient(135deg, #FFB6D9 0%, #FF69B4 100%)'
  },
  {
    id: 3,
    name: 'Camping Tent Set',
    category: 'camping',
    price: 25,
    location: 'Denver, CO',
    rating: 4.7,
    reviews: 62,
    description: '4-person tent with sleeping bags included',
    image: 'linear-gradient(135deg, #D4A5D9 0%, #E8BDE4 100%)'
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
    image: 'linear-gradient(135deg, #FFD9E6 0%, #FFB6D9 100%)'
  },
  {
    id: 5,
    name: 'Mountain Bike Pro',
    category: 'sports',
    price: 30,
    location: 'Boulder, CO',
    rating: 4.8,
    reviews: 87,
    description: 'Full suspension mountain bike, excellent condition',
    image: 'linear-gradient(135deg, #C4A5D7 0%, #FFB6D9 100%)'
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
    image: 'linear-gradient(135deg, #FFD9E6 0%, #E8BDE4 100%)'
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

// ============================================
// 5. DISPLAY ITEMS DYNAMICALLY
// ============================================
function displayItems(itemsToDisplay) {
  const itemsGrid = document.querySelector('.items-grid');
  if (!itemsGrid) return;

  itemsGrid.innerHTML = itemsToDisplay.map(item => `
    <div class="item-card" data-item-id="${item.id}">
      <div class="item-image" style="background: ${item.image};"></div>
      <div class="item-info">
        <h3>${item.name}</h3>
        <p class="item-location">📍 ${item.location}</p>
        <p class="item-description">${item.description}</p>
        <div class="item-footer">
          <span class="price">$${item.price}<span class="per-day">/day</span></span>
          <div class="rating">⭐ ${item.rating} (${item.reviews} reviews)</div>
        </div>
        <div class="item-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <button class="btn-small" onclick="viewItemDetails(${item.id})" style="flex: 1; padding: 0.5rem; background: #FFB6D9; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">View Details</button>
          <button class="btn-favorite" onclick="toggleFavorite(${item.id})" style="padding: 0.5rem 1rem; background: transparent; border: 1px solid #FFB6D9; color: #FFB6D9; border-radius: 5px; cursor: pointer;">❤️</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 6. ITEM DETAILS MODAL
// ============================================
function viewItemDetails(itemId) {
  const item = items.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 20px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
      <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: #FFB6D9; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">×</button>
      
      <div style="background: ${item.image}; height: 250px; border-radius: 15px; margin-bottom: 1rem;"></div>
      
      <h2 style="color: #9B7FBB; margin-bottom: 0.5rem;">${item.name}</h2>
      <p style="color: #666666; margin-bottom: 1rem;">📍 ${item.location}</p>
      
      <p style="color: #2D1B2E; margin-bottom: 1.5rem;">${item.description}</p>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #FFE8F5;">
        <div>
          <p style="color: #999;">Rating</p>
          <p style="color: #9B7FBB; font-size: 1.2rem;">⭐ ${item.rating} (${item.reviews})</p>
        </div>
        <div>
          <p style="color: #999;">Price</p>
          <p style="color: #FF69B4; font-size: 1.5rem; font-weight: bold;">$${item.price}<span style="font-size: 0.8rem; color: #999;">/day</span></p>
        </div>
      </div>
      
      <button onclick="bookItem(${item.id})" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #9B7FBB, #FF69B4); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1rem; margin-bottom: 0.5rem;">Book Now</button>
      <button onclick="this.parentElement.parentElement.remove()" style="width: 100%; padding: 1rem; background: transparent; color: #9B7FBB; border: 2px solid #9B7FBB; border-radius: 10px; cursor: pointer; font-weight: 600;">Close</button>
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ============================================
// 7. BOOKING SYSTEM
// ============================================
function bookItem(itemId) {
  const item = items.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.createElement('div');
  modal.className = 'booking-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 20px; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
      <h2 style="color: #9B7FBB; margin-bottom: 1rem;">Book ${item.name}</h2>
      
      <form onsubmit="submitBooking(event, ${item.id})">
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Your Name *</label>
          <input type="text" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
          <input type="email" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Start Date *</label>
          <input type="date" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">End Date *</label>
          <input type="date" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="background: #FFF5F9; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; border-left: 4px solid #FFB6D9;">
          <p style="color: #666666; margin-bottom: 0.5rem;">Estimated Total:</p>
          <p style="color: #FF69B4; font-size: 1.5rem; font-weight: bold;">$${item.price} per day</p>
        </div>
        
        <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #9B7FBB, #FF69B4); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1rem; margin-bottom: 0.5rem;">Confirm Booking</button>
        <button type="button" onclick="this.closest('.booking-modal').remove()" style="width: 100%; padding: 1rem; background: transparent; color: #9B7FBB; border: 2px solid #9B7FBB; border-radius: 10px; cursor: pointer; font-weight: 600;">Cancel</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function submitBooking(event, itemId) {
  event.preventDefault();
  const item = items.find(i => i.id === itemId);
  
  alert(`✅ Booking confirmed!\n\nItem: ${item.name}\nTotal: $${item.price}/day\n\nYou'll receive a confirmation email shortly.`);
  event.target.closest('.booking-modal').remove();
}

// ============================================
// 8. FAVORITES/WISHLIST
// ============================================
function toggleFavorite(itemId) {
  if (favorites.includes(itemId)) {
    favorites = favorites.filter(id => id !== itemId);
  } else {
    favorites.push(itemId);
  }
  updateFavoritesUI();
  alert(favorites.includes(itemId) ? '❤️ Added to favorites!' : '💔 Removed from favorites');
}

function updateFavoritesUI() {
  document.querySelectorAll('.btn-favorite').forEach(btn => {
    const itemCard = btn.closest('.item-card');
    const itemId = parseInt(itemCard.dataset.itemId);
    btn.style.color = favorites.includes(itemId) ? '#FF69B4' : '#FFB6D9';
    btn.style.borderColor = favorites.includes(itemId) ? '#FF69B4' : '#FFB6D9';
  });
}

// ============================================
// 9. SIGN UP FORM
// ============================================
function openSignUp() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 20px; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
      <h2 style="color: #9B7FBB; margin-bottom: 1rem;">Create Your Account</h2>
      
      <form onsubmit="submitSignUp(event)">
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name *</label>
          <input type="text" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
          <input type="email" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block; margin-bottom: 0.5rem; font-weight: 600;">Password *</label>
          <input type="password" required style="width: 100%; padding: 0.75rem; background: #FFF5F9; border: 2px solid #FFB6D9; color: #2D1B2E; border-radius: 8px; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="color: #2D1B2E; display: block;">
            <input type="checkbox" required style="margin-right: 0.5rem;"> I agree to the Terms of Service
          </label>
        </div>
        
        <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #9B7FBB, #FF69B4); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1rem; margin-bottom: 0.5rem;">Create Account</button>
        <button type="button" onclick="this.closest('div').parentElement.remove()" style="width: 100%; padding: 1rem; background: transparent; color: #9B7FBB; border: 2px solid #9B7FBB; border-radius: 10px; cursor: pointer; font-weight: 600;">Cancel</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
}

function submitSignUp(event) {
  event.preventDefault();
  alert('✅ Account created successfully!\n\nWelcome to Valut! You can now start browsing and booking gear.');
  event.target.closest('div').parentElement.remove();
}

// ============================================
// 10. BUTTON EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Sign up buttons
  document.querySelectorAll('.btn-signup, .btn-primary-large:first-of-type').forEach(btn => {
    btn.addEventListener('click', openSignUp);
  });

  // Start browsing button
  const startBrowsingBtn = document.querySelector('.btn-primary');
  if (startBrowsingBtn) {
    startBrowsingBtn.addEventListener('click', () => {
      document.querySelector('#browse').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // List items button
  const listItemsBtn = document.querySelector('.btn-secondary-large');
  if (listItemsBtn) {
    listItemsBtn.addEventListener('click', () => {
      alert('📝 Ready to list your gear?\n\nWe\'ll help you create a listing in just a few minutes!\n\nFeature coming soon...');
    });
  }

  // Initialize items display
  displayItems(items);
});

// ============================================
// 11. ADD ANIMATIONS
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .item-card {
    animation: slideIn 0.5s ease-out;
  }

  .category-card:hover {
    animation: slideIn 0.3s ease-out;
  }

  .modal, .booking-modal {
    animation: fadeIn 0.3s ease-out;
  }

  button {
    transition: all 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
  }

  input, textarea {
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #FFB6D9 !important;
  }
`;
document.head.appendChild(style);

// ============================================
// 12. CART FUNCTIONALITY
// ============================================
function addToCart(itemId) {
  const item = items.find(i => i.id === itemId);
  if (item) {
    cart.push(item);
    alert(`✅ ${item.name} added to cart!`);
  }
}

// ============================================
// 13. RESPONSIVE DESIGN HELPER
// ============================================
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.style.display = 'flex';
  }
});

console.log('✅ Valut Interactive Features Loaded!');
console.log('Available functions: searchItems(), filterByCategory(), viewItemDetails(), bookItem(), toggleFavorite(), openSignUp()');