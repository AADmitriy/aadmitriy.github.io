function setupCarousel(carouselContainer) {
  const slides = carouselContainer.querySelectorAll(".carousel-slide")
  const navDots = carouselContainer.querySelectorAll(".nav-dot")
  let activeIndex = 0
  
  function goToSlide(index) {
    activeIndex = (index + slides.length) % slides.length
  
    slides.forEach((slide, idx) =>
      slide.classList.toggle("active", idx === activeIndex)
    )
  
    navDots.forEach((dot, idx) =>
      dot.classList.toggle("active", idx === activeIndex)
    )
  }
  
  function goToNextSlide() {
    goToSlide(activeIndex + 1)
  }
  
  function goToPrevSlide() {
    goToSlide(activeIndex - 1)
  }
  
  navDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx))
  })
  
  
  const viewpoint = carouselContainer.querySelector(".carousel-viewpoint")
  let touchStartX = 0
  
  viewpoint.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX
  })
  
  viewpoint.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX
  
    if (Math.abs(delta) < 50) return
  
    if (delta > 0) {
      goToNextSlide()
    }
    else {
      goToPrevSlide()
    }
  })
  
  
  const navButtons = carouselContainer.querySelectorAll(".carousel-buttons button")
  
  navButtons[0].addEventListener('click', goToPrevSlide)
  navButtons[1].addEventListener('click', goToNextSlide)
}

const carouselContainers = document.querySelectorAll(".carousel-container")

carouselContainers.forEach((carouselContainer) => {
  setupCarousel(carouselContainer)
})
