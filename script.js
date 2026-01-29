// MODAL CONTROLS (Login, Signup, Booking)
function openLoginModal() { document.getElementById("loginModal").style.display = "block"; }
function closeLoginModal() { document.getElementById("loginModal").style.display = "none"; }
function openSignupModal() { document.getElementById("signupModal").style.display = "block"; }
function closeSignupModal() { document.getElementById("signupModal").style.display = "none"; }
function closeBookingModal() { document.getElementById("bookingModal").style.display = "none"; }

// CLOSE MODALS ON OUTSIDE CLICK
window.onclick = function(event) {
    const modals = ["loginModal", "signupModal", "bookingModal"];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) modal.style.display = "none";
    });
}

// TOGGLE SERVICE CARDS
function toggleService(card) {
    const checkbox = card.querySelector('.service-checkbox');
    checkbox.checked = !checkbox.checked;
    card.classList.toggle('selected');
    calculate(); // Trigger calculation when selected
}

// THE MAIN CALCULATION LOGIC
function calculate() {
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const roomSelect = document.getElementById("roomType");
    const selectedRoom = roomSelect.options[roomSelect.selectedIndex];

    // 1. Calculate Nights
    let nights = 0;
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = end - start;
        nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
    document.getElementById("displayNights").innerText = nights;

    // 2. Get Prices from Database Attributes (set in index.php)
    // If no room is selected yet, default to 0
    let minRoomPrice = selectedRoom ? parseInt(selectedRoom.getAttribute('data-min')) : 0;
    let maxRoomPrice = selectedRoom ? parseInt(selectedRoom.getAttribute('data-max')) : 0;

    let totalMin = minRoomPrice * nights;
    let totalMax = maxRoomPrice * nights;

    // 3. Add Additional Services (Fetched from DB cards)
    const checkboxes = document.querySelectorAll(".service-checkbox:checked");
    checkboxes.forEach(cb => {
        totalMin += parseInt(cb.getAttribute('data-min'));
        totalMax += parseInt(cb.getAttribute('data-max'));
    });

    // 4. Update the Display
    document.getElementById("totalRange").innerText = 
        totalMin.toLocaleString() + " - " + totalMax.toLocaleString() + " RWF";
}

// BOOKING MODAL LOGIC (Shows the final summary before confirming)
function openBookingModal() {
    const totalRange = document.getElementById("totalRange").innerText;
    if (totalRange === "0 - 0 RWF") {
        alert("Please select dates and a room first!");
        return;
    }
    document.getElementById("bookingModal").style.display = "block";
}