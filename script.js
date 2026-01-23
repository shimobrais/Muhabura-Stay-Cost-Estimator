// LOGIN & SIGNUP FUNCTIONALITY
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

function openSignupModal() {
  document.getElementById("signupModal").style.display = "block";
}

function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === signupModal) {
    signupModal.style.display = "none";
  }
}

// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = this.elements[0].value;
  const password = this.elements[1].value;
  alert(`Welcome back, ${email}!`);
  this.reset();
  closeLoginModal();
});

// Handle Signup Form
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.elements[0].value;
  const email = this.elements[1].value;
  const password = this.elements[2].value;
  const confirmPassword = this.elements[3].value;
  
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
  alert(`Account created successfully for ${name}!`);
  this.reset();
  closeSignupModal();
});

const DATA = {
  rooms: {
    standard: 50000,
    deluxe: 80000,
    suite: 120000
  },
  services: {
    breakfast: 10000,
    airport: 20000,
    spa: 30000,
    gym: 5000,
    meeting: 40000,
    dining: 25000
  },
  taxRate: 0.18
};

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");
const serviceCheckboxes = document.querySelectorAll(".services input");

const nightsEl = document.getElementById("nights");
const roomCostEl = document.getElementById("roomCost");
const serviceCostEl = document.getElementById("serviceCost");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

function calculate() {
  let nights = 0;

  if (checkIn.value && checkOut.value) {
    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);
    nights = Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
  }

  const roomPrice = DATA.rooms[roomType.value] || 0;
  const roomCost = nights * roomPrice;

  let serviceCost = 0;
  serviceCheckboxes.forEach(cb => {
    if (cb.checked) {
      serviceCost += DATA.services[cb.value];
    }
  });

  const subtotal = roomCost + serviceCost;
  const tax = subtotal * DATA.taxRate;
  const total = subtotal + tax;

  nightsEl.textContent = nights;
  roomCostEl.textContent = roomCost.toLocaleString();
  serviceCostEl.textContent = serviceCost.toLocaleString();
  taxEl.textContent = tax.toLocaleString();
  totalEl.textContent = total.toLocaleString();
}

document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("change", calculate)
);
