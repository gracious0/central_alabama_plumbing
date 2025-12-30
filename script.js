// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 10) {
        header.classList.add('shadow-lg');
        header.classList.remove('shadow-sm');
    } else {
        header.classList.remove('shadow-lg');
        header.classList.add('shadow-sm');
    }
});

// Reviews Carousel
const reviews = [
    {
        id: 1,
        name: 'John Smith',
        image: 'images/reviews/reviewer1.jpg',
        rating: 5,
        text: 'Excellent service! The team was professional and fixed our water heater quickly. Highly recommended!',
        title: 'Water Heater Install',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        image: 'images/reviews/reviewer2.jpg',
        rating: 5,
        text: 'Very responsive and fair pricing. They arrived on time and solved our drain issue in minutes.',
        title: 'Emergency Drain Cleaning',
    },
    {
        id: 3,
        name: 'Mike Davis',
        image: 'images/reviews/reviewer3.jpg',
        rating: 5,
        text: '24/7 service is a lifesaver! Called at midnight, and they came right away. Great work!',
        title: 'Midnight Emergency Repair',
    },
];

let currentReviewIndex = 0;
const carouselContainer = document.getElementById('reviews-carousel');
const dotsContainer = document.getElementById('review-dots');

function renderReviews() {
    carouselContainer.innerHTML = `
        <div class="flex transition-transform duration-500 ease-out" style="transform: translateX(-${currentReviewIndex * 100}%)">
            ${reviews.map(review => `
                <div class="w-full flex-shrink-0 p-4">
                    <div class="bg-white p-8 md:p-12 rounded-2xl shadow">
                         <div class="flex items-center gap-6 mb-6">
                            <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                                ${review.name.charAt(0)}
                            </div>
                            <div>
                                <h3 class="font-bold text-xl text-gray-900">${review.name}</h3>
                                <p class="text-sm text-gray-500 mb-2">${review.title}</p>
                                <div class="text-yellow-400">★★★★★</div>
                            </div>
                         </div>
                         <p class="text-gray-700 text-lg leading-relaxed italic">"${review.text}"</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    dotsContainer.innerHTML = reviews.map((_, i) => `
        <button onclick="goToReview(${i})" class="h-3 rounded-full transition-all duration-300 ${i === currentReviewIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'}" aria-label="Go to review ${i + 1}"></button>
    `).join('');
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    renderReviews();
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    renderReviews();
}

function goToReview(index) {
    currentReviewIndex = index;
    renderReviews();
}

renderReviews();

// Services Tabs
function switchTab(index) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-content-${index}`).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            btn.classList.remove('text-gray-600', 'hover:text-gray-900');
        } else {
            btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            btn.classList.add('text-gray-600', 'hover:text-gray-900');
        }
    });
}

// Gallery Lightbox
const galleryItems = [
    { id: 1, src: 'images/heater.jpeg', alt: 'Water Heater Installation' },
    { id: 2, src: 'images/shower.jpeg', alt: 'Shower Installation' },
    { id: 3, src: 'images/pipe.jpg', alt: 'Pipe Repair Work' },
    { id: 4, src: 'images/zink.jpeg', alt: 'Sink Installation' },
    { id: 5, src: 'images/bathroom.jpg', alt: 'Bathroom Plumbing' },
    { id: 6, src: 'images/inside.jpg', alt: 'Interior Plumbing Work' },
    { id: 7, src: 'images/360 view.jpg', alt: '360 View of Installation' },
    { id: 8, src: 'images/by owner.jpg', alt: 'Customer Project' },
];

const galleryGrid = document.getElementById('gallery-grid');
galleryGrid.innerHTML = galleryItems.map(item => `
    <div class="animate-slideUp group cursor-pointer" onclick="openLightbox('${item.src}')">
        <div class="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
            <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                 <span class="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
            </div>
        </div>
        <p class="text-sm text-gray-600 mt-3 text-center font-medium">${item.alt}</p>
    </div>
`).join('');

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

// Contact Form
function handleContactSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const ogText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.disabled = true;
    
    // Simulate send
    setTimeout(() => {
        btn.innerText = '✓ Message Sent!';
        btn.classList.add('bg-green-600');
        e.target.reset();
        
        setTimeout(() => {
            btn.innerText = ogText;
            btn.disabled = false;
            btn.classList.remove('bg-green-600');
        }, 3000);
        
        // Use mailto as fallback
        const formData = new FormData(e.target);
        const subject = `New Website Contact from ${formData.get('name')}`;
        const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}\n\nMessage:\n${formData.get('message')}`;
        window.location.href = `mailto:chuck@centralalplumbing.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 1500);
}
