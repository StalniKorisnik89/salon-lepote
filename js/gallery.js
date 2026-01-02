// Gallery JavaScript with lightbox functionality

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // Generate placeholder gallery items (12 items)
    const galleryItems = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Nail Design ${i + 1}`
    }));

    // Create gallery items
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        // Create placeholder image
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-placeholder';
        placeholder.innerHTML = '💅';
        placeholder.style.background = `linear-gradient(135deg, 
            ${getGradientColor(index, 0)} 0%, 
            ${getGradientColor(index, 1)} 100%)`;
        
        galleryItem.appendChild(placeholder);
        galleryItem.addEventListener('click', () => openLightbox(index));
        
        galleryGrid.appendChild(galleryItem);
    });

    // Gradient colors for placeholders
    function getGradientColor(index, position) {
        const colors = [
            ['#FFD6E8', '#FFB6D9'], // rose
            ['#E8D5FF', '#D4B5FF'], // lavender
            ['#F5E6E0', '#FFD6E8'], // nude to rose
            ['#FFB6D9', '#E8D5FF'], // pink to lavender
            ['#FFF8F3', '#FFD6E8'], // cream to rose
            ['#E8D5FF', '#F5E6E0'], // lavender to nude
        ];
        const colorSet = colors[index % colors.length];
        return colorSet[position];
    }

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        // Since we're using placeholders, we'll create an image element
        // In real scenario, you would use actual image URLs
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-placeholder';
        placeholder.style.width = '600px';
        placeholder.style.height = '600px';
        placeholder.style.fontSize = '8rem';
        placeholder.innerHTML = '💅';
        placeholder.style.background = `linear-gradient(135deg, 
            ${getGradientColor(currentIndex, 0)} 0%, 
            ${getGradientColor(currentIndex, 1)} 100%)`;
        
        // Clear previous content
        lightboxImage.innerHTML = '';
        lightboxImage.appendChild(placeholder);
        lightboxImage.alt = galleryItems[currentIndex].title;
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxImage();
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevious();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevious();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });
});
