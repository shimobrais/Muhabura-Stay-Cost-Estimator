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
    dining: 25000,
    lunch: 15000,
    musanze: 50000
  },
  taxRate: 0.18
};

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");
const serviceCheckboxes = document.querySelectorAll(".services input");

// Add interactive card selection
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach(card => {
  const checkbox = card.querySelector("input[type='checkbox']");
  
  card.addEventListener("click", function(e) {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
      updateCardSelection();
      calculate();
    }
  });
  
  checkbox.addEventListener("change", function() {
    updateCardSelection();
    calculate();
  });
});

function updateCardSelection() {
  serviceCards.forEach(card => {
    const checkbox = card.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
}

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

// BOOKING FUNCTIONALITY
function openBookingModal() {
  const checkInDate = checkIn.value;
  const checkOutDate = checkOut.value;
  const roomValue = roomType.value;
  const guestCount = guests.value;
  
  if (!checkInDate || !checkOutDate) {
    alert("Please select check-in and check-out dates!");
    return;
  }
  
  // Update booking summary
  document.getElementById("bookingSummaryCheckIn").textContent = checkInDate;
  document.getElementById("bookingSummaryCheckOut").textContent = checkOutDate;
  document.getElementById("bookingSummaryRoom").textContent = roomValue.charAt(0).toUpperCase() + roomValue.slice(1) + " Room";
  document.getElementById("bookingSummaryGuests").textContent = guestCount;
  
  // Update selected services
  const servicesList = document.getElementById("bookingSummaryServices");
  servicesList.innerHTML = "";
  
  const serviceNames = {
    breakfast: "Breakfast",
    airport: "Airport Pickup",
    spa: "Spa & Wellness",
    gym: "Gym Access",
    meeting: "Meeting Room",
    dining: "Fine Dining",
    lunch: "Lunch Package",
    musanze: "Musanze Tour"
  };
  
  serviceCheckboxes.forEach(cb => {
    if (cb.checked) {
      const div = document.createElement("div");
      div.textContent = "✓ " + serviceNames[cb.value];
      div.style.color = "#27ae60";
      servicesList.appendChild(div);
    }
  });
  
  // Calculate with 5% discount
  const subtotal = parseFloat(totalEl.textContent.replace(/,/g, ''));
  const discount = subtotal * 0.05;
  const finalAmount = subtotal - discount;
  const halfAmount = finalAmount / 2;
  
  // Update totals
  document.getElementById("bookingSummarySubtotal").textContent = subtotal.toLocaleString();
  document.getElementById("bookingSummaryDiscount").textContent = discount.toLocaleString();
  document.getElementById("bookingSummaryTotal").textContent = finalAmount.toLocaleString();
  document.getElementById("halfAmount").textContent = halfAmount.toLocaleString();
  document.getElementById("fullAmount").textContent = finalAmount.toLocaleString();
  
  // Reset payment options
  document.querySelectorAll("input[name='paymentAmount']").forEach(el => el.checked = false);
  document.querySelectorAll("input[name='paymentMethod']").forEach(el => el.checked = false);
  
  document.getElementById("bookingModal").style.display = "block";
}

function closeBookingModal() {
  document.getElementById("bookingModal").style.display = "none";
}

// Handle Booking Form Submit
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("bookingName").value;
  const email = document.getElementById("bookingEmail").value;
  const phone = document.getElementById("bookingPhone").value;
  const paymentAmount = document.querySelector("input[name='paymentAmount']:checked").value;
  const paymentMethod = document.querySelector("input[name='paymentMethod']:checked").value;
  
  const subtotal = parseFloat(document.getElementById("bookingSummarySubtotal").textContent.replace(/,/g, ''));
  const discount = subtotal * 0.05;
  const finalAmount = subtotal - discount;
  const amountToPay = paymentAmount === "half" ? finalAmount / 2 : finalAmount;
  
  // Collect selected services
  const selectedServices = [];
  serviceCheckboxes.forEach(cb => {
    if (cb.checked) {
      selectedServices.push(cb.value);
    }
  });
  
  const paymentMethodNames = {
    bank: "Bank Transfer",
    mtn: "MTN Money (MoMo)",
    airtel: "Airtel Money"
  };
  
  // Create booking object
  const booking = {
    name: name,
    email: email,
    phone: phone,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    roomType: roomType.value,
    guests: guests.value,
    services: selectedServices,
    subtotal: subtotal,
    discount: discount,
    finalAmount: finalAmount,
    paymentAmount: paymentAmount === "half" ? "Half (50%)" : "Full",
    amountToPay: amountToPay,
    paymentMethod: paymentMethodNames[paymentMethod],
    bookingDate: new Date().toLocaleString()
  };
  
  // Save booking to localStorage
  let bookings = JSON.parse(localStorage.getItem("muhaburaBookings")) || [];
  bookings.push(booking);
  localStorage.setItem("muhaburaBookings", JSON.stringify(bookings));
  
  // Generate booking reference
  const bookingRef = "MH" + new Date().getTime() + Math.floor(Math.random() * 1000);
  
  // Show confirmation
  alert(`✓ Booking Confirmed!\n\nBooking Reference: ${bookingRef}\nName: ${name}\nPayment: ${amountToPay.toLocaleString()} RWF via ${paymentMethodNames[paymentMethod]}\nPayment Type: ${paymentAmount === "half" ? "Half Payment (50%)" : "Full Payment"}\n\nA confirmation email will be sent to ${email}`);
  
  // Reset form
  this.reset();
  closeBookingModal();
  
  // Reset main form
  checkIn.value = "";
  checkOut.value = "";
  roomType.value = "standard";
  guests.value = "1";
  serviceCheckboxes.forEach(cb => cb.checked = false);
  serviceCards.forEach(card => card.classList.remove("selected"));
  calculate();
});

// Close booking modal when clicking outside
document.addEventListener("click", function(event) {
  const bookingModal = document.getElementById("bookingModal");
  
  if (event.target === bookingModal) {
    bookingModal.style.display = "none";
  }
});
