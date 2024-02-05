document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.member__slider-track');
    const originalSlides = Array.from(track.children);
    const totalOriginalSlides = originalSlides.length;
    const indicator = document.querySelector('.member__slider-indicator');
    let currentSlideIndex = 0;
    let interval;


    originalSlides.forEach(slide => {
        const cloneSlide = slide.cloneNode(true);
        track.appendChild(cloneSlide);
    });
    const allSlides = Array.from(track.children);

    function updateIndicator() {
        const displayIndex = currentSlideIndex % totalOriginalSlides;
        indicator.textContent = `${displayIndex + 1}/${totalOriginalSlides}`;
    }

    function moveToSlide(slideIndex, animate = true) {
        if (!animate) {
            track.classList.add('no-animation');
        }

        let effectiveSlideIndex = slideIndex % totalOriginalSlides;
        if (slideIndex < 0) {
            effectiveSlideIndex += totalOriginalSlides;
        }

        const slideWidth = allSlides[0].clientWidth;
        const newLeft = -(slideWidth * effectiveSlideIndex);
        track.style.transform = `translateX(${newLeft}px)`;

        if (!animate) {
            track.offsetHeight;
            track.classList.remove('no-animation');
        }

        currentSlideIndex = slideIndex;
        updateIndicator();
    }

    function resetSlidePositionIfNeeded() {
        if (currentSlideIndex >= totalOriginalSlides) {
            moveToSlide(currentSlideIndex % totalOriginalSlides, false);
        } else if (currentSlideIndex < 0) {
            moveToSlide(currentSlideIndex + totalOriginalSlides, false);
        }
    }

    function nextSlide() {
        moveToSlide(currentSlideIndex + 1);
        resetSlidePositionIfNeeded();
    }

    function prevSlide() {
        moveToSlide(currentSlideIndex - 1);
        resetSlidePositionIfNeeded();
    }

    document.querySelector('.member__slider-btn_prev').addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    document.querySelector('.member__slider-btn_next').addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    function startAutoSlide() {
        interval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    updateIndicator();
    startAutoSlide();




    let currentIndex = 0;
    const slides = document.querySelectorAll(".grid-item");
    const totalSlides = slides.length;
    const prevButton = document.querySelector(".slider-control_prev");
    const nextButton = document.querySelector(".slider-control_next");
    const indicatorsContainer = document.querySelector(".slider__indicators");

    function updateSlider() {
        const sliderWidth = document.querySelector(".slider").offsetWidth;
        const newTransformValue = -(sliderWidth * currentIndex);
        document.querySelector(".grid-block").style.transform = `translateX(${newTransformValue}px)`;
    }

    function updateIndicators() {
        document.querySelectorAll(".indicator").forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    function createIndicators() {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement("span");
            indicator.classList.add("indicator");
            if (i === currentIndex) indicator.classList.add("active");
            indicatorsContainer.appendChild(indicator);
        }
    }

    prevButton.addEventListener("click", function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
        updateIndicators()
    });

    nextButton.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        updateIndicators()
    });

    createIndicators();

});
