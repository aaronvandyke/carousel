// ***** VARIABLES ***** //
const slidesData = document.querySelectorAll('.slideHref');

const slides = Array.from(document.querySelectorAll('.slide'));
const slideTotal = slides.length;
const caption = Array.from(document.querySelectorAll('.art-info'));

const articleImages = document.getElementsByClassName('article-images');
const carouselOverlay = document.getElementById('carousel-overlay');

const figureCurrent = document.getElementById('figure-current');
const carouselFigcaptionCurrent = document.getElementById('carousel-caption');

const currentSlide = document.getElementById('current-slide');
const nextSlide = document.getElementById('next-slide');
const prevSlide = document.getElementById('prev-slide');

const nextButton = document.getElementById('carousel-button-next');
const prevButton = document.getElementById('carousel-button-prev');
const closeButton = document.getElementById('carousel-button-close');

let targetIndex = 0;
// ***** End of VARIABLES ***** //

//  Set event listeners on all figures. //
for (let i = 0; i < articleImages.length; i++) {
  articleImages[i].addEventListener('click', e => {
    //  Prevents image from opening (as a new page).
    e.preventDefault();
    let targetImage = e.target.closest('figure');

    //  Do nothing on click outside of targets.
    if (!targetImage) return;

    //  Disable scrolling on the main page while the carousel is open.
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    //  Change carousel overlay display from 'none' to 'grid' making it visible.
    carouselOverlay.style.display = "grid";

    //  Find the index of the figure that gets clicked.
    targetIndex = slides.findIndex(index => index === targetImage);

    //  Get 'current' figcaption texts
    let captionCurrent = caption[targetIndex].innerHTML;
    //  Insert 'current' figcaption text
    carouselFigcaptionCurrent.innerHTML = captionCurrent;

    //  Insert 'current' img src
    currentSlide.src = slideHrefs[targetIndex];
    if (targetIndex === 0) {
      //      Hide PREVIOUS arrow if the current image is also the first image.
      prevButton.style = 'visibility:hidden';
      nextSlide.src = slideHrefs[targetIndex + 1];
    } else if (targetIndex === slideTotal - 1) {
      //        Hide NEXT arrow if the current image is also the last image.
      nextButton.style = 'visibility:hidden';
      prevSlide.src = slideHrefs[targetIndex - 1];
    } else {
      //        Insert 'next' img src
      nextSlide.src = slideHrefs[targetIndex + 1];
      //        Insert 'prev' img source
      prevSlide.src = slideHrefs[targetIndex - 1];
    }
  });
}

// ***** Get relative href's for images *****
let slideHrefs = [];
for (let i = 0; i < slidesData.length; i++) {
  slideHrefs.push(slidesData[i].getAttribute('href'));
}

//  Add event listeners to PREVIOUS, NEXT, and CLOSE buttons.
//  I.e., This line calls 'moveToNextSlide' function when user clicks NEXT arrow.
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);
closeButton.addEventListener('click', close);

//  This is the function that gets calles when user clicks NEXT arrow.
function moveToNextSlide() {

  //  Slides current image in from the right and changes opacity to 1.
  figureCurrent.setAttribute(
    "style", "opacity: 0; transform: translateX(100vw)"
  );
  //  Makes sure PREVIOUS arrow is visible.
  prevButton.style = 'visibility:visible';
  targetIndex++;
  //  Inserts 'current' img src
  currentSlide.src = slideHrefs[targetIndex];
  //  Inserts 'prev' img source
  prevSlide.src = slideHrefs[targetIndex - 1];
  if (targetIndex === slideTotal - 1) {
    //  Hides NEXT arrow if user is on last slide.
    nextButton.style = 'visibility:hidden';
  } else {
    //  Inserts 'next' img src
    nextSlide.src = slideHrefs[targetIndex + 1];
  }
  //  Inserts figure caption for current image.
  carouselFigcaptionCurrent.innerHTML = caption[targetIndex].innerHTML;
  //  This waits for slide immage to load. There is a small delay built in (0.1 sec.) which usually makes the user experience a bit better.
  currentSlide.onload = function () {
    setTimeout(fadeIn, 100);
  };
}
// END of moveToNextSlide function. //

//  This is the function that gets called when user clicks PREVIOUS arrow.
function moveToPrevSlide() {

  //  Slides current image in from the left and changes opacity to 1.
  figureCurrent.setAttribute(
    "style", "opacity: 0; transform: translateX(-100vw)"
  );
  //  Makes sure NEXT arrow is visible.
  nextButton.style = 'visibility:visible';
  targetIndex--;
  //  Inserts 'current' img src
  currentSlide.src = slideHrefs[targetIndex];
  //  Inserts 'next' img src
  nextSlide.src = slideHrefs[targetIndex + 1];
  if (targetIndex < 1) {
    //  Hides PREVIOUS arrow if user is on first slide.
    prevButton.style = 'visibility:hidden';
  } else {
    //  Inserts 'previous' image source.
    prevSlide.src = slideHrefs[targetIndex - 1];
  }

  //  Inserts figure caption for current image.
  carouselFigcaptionCurrent.innerHTML = caption[targetIndex].innerHTML;
  //  This waits for slide immage to load. There is a small delay built in (0.1 sec.) which usually makes the user experience a bit better.
  currentSlide.onload = function () {
    setTimeout(fadeIn, 100);
  };
}
//  END of moveToPrevSlide function. //

//  This function slides image and caption in (while changing opacity from 0 to 1).
function fadeIn() {
  figureCurrent.setAttribute(
    "style", "opacity: 1;transform: translateX(0); transition: opacity .2s, transform .2s"
  );
}

// This function closes carousel.
function close() {
  // Hides carousel overlay when user clicks CLOSE button.
  carouselOverlay.style.display = "none";
  //  Next two lines return normal scrolling to main body of page when user clicks CLOSE button.
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
  //  These set PREVIOUS and NEXT arrows to visible so they are visible the nest time user clicks on an image.
  prevButton.style = 'visibility:visible';
  nextButton.style = 'visibility:visible';
  //  ***** Reset img src on close, otherwise old image temporarily shows
  currentSlide.src = "#";
  prevSlide.src = "#";
  nextSlide.src = "#";
}
//  END of close function.

// This function closes carousel when user hit the escape key (by calling the 'close' function).
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    close();
  }
});