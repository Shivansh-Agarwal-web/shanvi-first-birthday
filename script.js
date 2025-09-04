document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const galleryImages = [
        "shanvi-birthday-01.jpg",
        "shanvi-birthday-02.jpg",
        "shanvi-birthday-03.jpg",
        // Add more image file names here
    ];
    const eventDate = new Date(2025, 8, 17, 11, 0, 0).getTime(); // September 17, 2025, 11:00 AM
    const numberOfPetals = 30;
    // --- END OF CONFIGURATION ---


    // Get Elements
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
    const petalContainer = document.getElementById('petal-container');
    
    // --- ENVELOPE & CARD REVEAL LOGIC (Restored) ---
    openButton.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.classList.add('disappear');
            setTimeout(() => {
                envelope.style.display = 'none'; // Use style.display to fully remove it
                card.classList.remove('hidden');
                card.classList.add('visible');
            }, 500);
        }, 500);
    });

    // --- CREATE FALLING PETALS ---
    function createPetals() {
        for (let i = 0; i < numberOfPetals; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${Math.random() * 5 + 8}s`;
            petal.style.animationDelay = `${Math.random() * 10}s`;
            petal.style.width = `${Math.random() * 10 + 10}px`;
            petal.style.height = petal.style.width;
            petal.style.opacity = Math.random();
            petalContainer.appendChild(petal);
        }
    }


    // --- COUNTDOWN TIMER LOGIC ---
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "<h2>The celebration has begun!</h2>";
            triggerConfetti();
            return;
        }
        countdownElements.days.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        countdownElements.hours.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        countdownElements.minutes.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        countdownElements.seconds.innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
    
    
    // --- PARTY POPPER (CONFETTI) LOGIC ---
    function triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
        myConfetti({ particleCount: 150, spread: 180, origin: { y: 0.6 } });
    }


    // --- GALLERY MODAL LOGIC (Verified) ---
    const openGallery = () => {
        galleryModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
    const closeGallery = () => {
        galleryModal.classList.add('hidden');
        document.body.style.overflow = '';
    };
    function populateGallery() {
        galleryGrid.innerHTML = '';
        galleryImages.forEach(imageName => {
            const img = document.createElement('img');
            img.src = `images/${imageName}`;
            img.alt = "Shanvi's birthday photo";
            galleryGrid.appendChild(img);
        });
    }

    galleryButton.addEventListener('click', openGallery);
    closeModalButton.addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal) closeGallery();
    });

    // --- INITIALIZE EVERYTHING ---
    populateGallery();
    createPetals();
});
