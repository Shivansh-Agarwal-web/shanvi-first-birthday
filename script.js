document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    // Add the filenames of all your gallery images here
    const galleryImages = [
        "shanvi-birthday-01.jpg",
        "shanvi-birthday-02.jpg",
        "shanvi-birthday-03.jpg",
        // Add more image file names like this:
        // "shanvi-birthday-04.jpg",
        // "shanvi-birthday-05.jpg",
    ];

    // Set the date of the event (Year, Month (0-11 for Jan-Dec), Day, Hour, Minute, Second)
    // Month is 0-indexed: January is 0, September is 8.
    const eventDate = new Date(2025, 8, 17, 11, 0, 0).getTime(); // September 17, 2025, 11:00 AM
    // --- END OF CONFIGURATION ---


    // Get all the necessary elements from the HTML
    const envelope = document.getElementById('envelope');
    const openButton = document.getElementById('open-button');
    const card = document.getElementById('card');
    
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    const galleryModal = document.getElementById('gallery-modal');
    const galleryButton = document.getElementById('gallery-button');
    const closeModalButton = document.getElementById('close-modal');
    const galleryGrid = document.getElementById('gallery-grid');

    // --- ENVELOPE OPENING LOGIC ---
    openButton.addEventListener('click', () => {
        // Play a simple click sound (optional, if you have an audio file)
        // const clickSound = new Audio('sounds/click.mp3'); 
        // clickSound.play();

        envelope.classList.add('open');
        
        // After the flap animation finishes (0.5s), pull out the letter
        setTimeout(() => {
            envelope.classList.add('disappear');
            // After the envelope disappears, show the card
            setTimeout(() => {
                envelope.classList.add('hidden');
                card.classList.remove('hidden');
                card.classList.add('visible');
                // Trigger initial animations if any
            }, 500); // This should match the envelope.disappear transition time
        }, 500); // This should match the envelope.open transition time
    });


    // --- COUNTDOWN TIMER LOGIC ---
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            Object.values(countdownElements).forEach(el => el.innerText = "0");
            document.getElementById('countdown').innerHTML = "<h2>The celebration has begun!</h2>";
            triggerConfetti(); // Trigger confetti when timer ends
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElements.days.innerText = days;
        countdownElements.hours.innerText = hours;
        countdownElements.minutes.innerText = minutes;
        countdownElements.seconds.innerText = seconds;

    }, 1000);
    
    
    // --- PARTY POPPER (CONFETTI) LOGIC ---
    function triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        // Ensure canvas is visible for confetti
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });
        myConfetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
        // Optionally, make confetti disappear after some time
        setTimeout(() => {
            canvas.style.display = 'none'; // Hide canvas after confetti
        }, 5000); 
    }


    // --- GALLERY MODAL LOGIC ---
    // Function to open the gallery
    const openGallery = () => {
        galleryModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open
    };

    // Function to close the gallery
    const closeGallery = () => {
        galleryModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore body scrolling
    };
    
    // Populate the gallery grid with images from the config
    function populateGallery() {
        galleryGrid.innerHTML = ''; // Clear existing images
        galleryImages.forEach(imageName => {
            const img = document.createElement('img');
            img.src = `images/${imageName}`; // Ensure correct path
            img.alt = "Shanvi's birthday photo";
            galleryGrid.appendChild(img);
        });
    }

    // Add event listeners for the gallery
    galleryButton.addEventListener('click', openGallery);
    closeModalButton.addEventListener('click', closeGallery);
    // Also close gallery if user clicks on the dark background
    galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            closeGallery();
        }
    });

    // Populate the gallery when the page loads
    populateGallery();
});
