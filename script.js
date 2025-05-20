document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonial-dots');
    const testimonials = slider.querySelectorAll('.snap-start');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    // Create dots dynamically
    dotsContainer.innerHTML = ''; // Clear existing dots if any
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.classList.add('w-3', 'h-3', 'rounded-full', 'mx-1');
        if (i === 0) {
            dot.classList.add('bg-red-700');
        } else {
            dot.classList.add('bg-gray-300');
        }
        dot.addEventListener('click', () => {
            scrollToTestimonial(i);
        });
        dotsContainer.appendChild(dot);
    }

    const updateDots = () => {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-red-700');
            } else {
                dot.classList.remove('bg-red-700');
                dot.classList.add('bg-gray-300');
            }
        });
    };

    const scrollToTestimonial = (index) => {
        if (index >= 0 && index < totalTestimonials) {
            currentIndex = index;
            slider.scrollLeft = testimonials[currentIndex].offsetLeft;
            updateDots();
        }
    };

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToTestimonial(currentIndex - 1);
        } else {
            // Loop to the last testimonial if at the beginning
            scrollToTestimonial(totalTestimonials - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalTestimonials - 1) {
            scrollToTestimonial(currentIndex + 1);
        } else {
            // Loop to the first testimonial if at the end
            scrollToTestimonial(0);
        }
    });

    // Optional: Update dots on manual scroll
    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const scrollWidth = slider.scrollWidth - slider.clientWidth;
        const itemWidth = testimonials[0].offsetWidth;

        if (scrollWidth > 0) {
            // Calculate approximate current index based on scroll position
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots();
            }
        }
    });
});