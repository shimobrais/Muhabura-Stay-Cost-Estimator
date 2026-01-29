function showApp() {
    const phoneInput = document.getElementById('phone').value;
    
    if(phoneInput.length >= 10) {
        // Engineering Touch: Send the lead to the DB using a background request
        const formData = new FormData();
        formData.append('phone', phoneInput);

        fetch('index.php', { // Sending to itself to handle the PHP logic
            method: 'POST',
            body: formData
        }).then(() => {
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.remove('hidden');
        });
    } else {
        alert("Please enter a valid phone number.");
    }
}