window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

// Core idea comparison slider
var CORE_IDEA_BASE = "./static/images/core_idea";
var CORE_IDEA_FRAME_NAMES = ['interp_0066', 'interp_0067', 'interp_0068', 'interp_0069', 'interp_0070', 'interp_0071', 'interp_0072'];
var NUM_CORE_IDEA_FRAMES = CORE_IDEA_FRAME_NAMES.length;

var core_idea_ours_images = [];
var core_idea_4d_images = [];
var core_idea_deform_images = [];

function preloadCoreIdeaImages() {
  for (var i = 0; i < NUM_CORE_IDEA_FRAMES; i++) {
    var fname = CORE_IDEA_FRAME_NAMES[i] + '.png';
    core_idea_ours_images[i] = new Image();
    core_idea_ours_images[i].src = CORE_IDEA_BASE + '/ours/' + fname;
    core_idea_4d_images[i] = new Image();
    core_idea_4d_images[i].src = CORE_IDEA_BASE + '/4d/' + fname;
    core_idea_deform_images[i] = new Image();
    core_idea_deform_images[i].src = CORE_IDEA_BASE + '/deform/' + fname;
  }
}

function setCoreIdeaFrame(i) {
  var oursImg = core_idea_ours_images[i];
  oursImg.ondragstart = function() { return false; };
  oursImg.oncontextmenu = function() { return false; };
  oursImg.style.width = '100%';
  $('#core-idea-ours-wrapper').empty().append(oursImg);

  var fdImg = core_idea_4d_images[i];
  fdImg.ondragstart = function() { return false; };
  fdImg.oncontextmenu = function() { return false; };
  fdImg.style.width = '100%';
  $('#core-idea-4d-wrapper').empty().append(fdImg);

  var defImg = core_idea_deform_images[i];
  defImg.ondragstart = function() { return false; };
  defImg.oncontextmenu = function() { return false; };
  defImg.style.width = '100%';
  $('#core-idea-deform-wrapper').empty().append(defImg);
}

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

function alignCarouselArrowsToVideo(carouselSelector) {
  var root = document.querySelector(carouselSelector);
  if (!root) {
    return;
  }

  var slider = root.querySelector('.slider');
  var prev = root.querySelector('.slider-navigation-previous');
  var next = root.querySelector('.slider-navigation-next');
  if (!slider || !prev || !next) {
    return;
  }

  var activeSlide = root.querySelector('.slider-item.is-active') || root.querySelector('.slider-item');
  if (!activeSlide) {
    return;
  }

  var mediaElements = activeSlide.querySelectorAll('.carousel-media video, .carousel-media .ablation-figure, .carousel-media img');
  if (!mediaElements.length) {
    return;
  }

  var sliderRect = slider.getBoundingClientRect();
  var top = Number.POSITIVE_INFINITY;
  var bottom = Number.NEGATIVE_INFINITY;

  mediaElements.forEach(function(mediaElement) {
    var rect = mediaElement.getBoundingClientRect();
    top = Math.min(top, rect.top);
    bottom = Math.max(bottom, rect.bottom);
  });

  if (!isFinite(top) || !isFinite(bottom)) {
    return;
  }

  var centerY = (top + bottom) / 2 - sliderRect.top;

  prev.style.top = centerY + 'px';
  next.style.top = centerY + 'px';
  prev.style.marginTop = '0';
  next.style.marginTop = '0';
  prev.style.transform = 'translateY(-50%)';
  next.style.transform = 'translateY(-50%)';
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    // Initialize all div with carousel class except applications/ablation/comparisons/more carousels
    var carousels = bulmaCarousel.attach('.carousel:not(#applications-carousel):not(#ablation-carousel):not(#comparisons-carousel):not(#more-carousel)', options);

    // Initialize applications carousel with different settings
    var applicationsOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    }
    var applicationsCarousel = bulmaCarousel.attach('#applications-carousel', applicationsOptions);

    // Initialize ablation carousel with the same settings as applications
    var ablationOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    }
    var ablationCarousel = bulmaCarousel.attach('#ablation-carousel', ablationOptions);

    // Initialize comparisons carousel with the same settings as applications
    var comparisonsOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    }
    var comparisonsCarousel = bulmaCarousel.attach('#comparisons-carousel', comparisonsOptions);

    // Initialize more carousel with the same settings as applications
    var moreOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    }
    var moreCarousel = bulmaCarousel.attach('#more-carousel', moreOptions);

    function alignAllVideoCarousels() {
      alignCarouselArrowsToVideo('#applications-carousel');
      alignCarouselArrowsToVideo('#ablation-carousel');
      alignCarouselArrowsToVideo('#comparisons-carousel');
      alignCarouselArrowsToVideo('#more-carousel');
    }

    // Loop on each carousel initialized
    var allCarousels = carousels.concat(applicationsCarousel, ablationCarousel, comparisonsCarousel, moreCarousel);
    for(var i = 0; i < allCarousels.length; i++) {
    	// Add listener to  event
    	allCarousels[i].on('before:show', state => {
    		console.log(state);
    setTimeout(alignAllVideoCarousels, 0);
    	});
    }

    setTimeout(alignAllVideoCarousels, 0);
    window.addEventListener('resize', alignAllVideoCarousels);

    // Add auto-advance functionality for applications carousel
    var applicationsItems = document.querySelectorAll('#applications-carousel .item');
    applicationsItems.forEach(function(item) {
      var video = item.querySelector('video');
      if (video) {
        video.addEventListener('loadedmetadata', alignAllVideoCarousels);
        video.addEventListener('ended', function() {
          if (applicationsCarousel && applicationsCarousel.next) {
            applicationsCarousel.next();
          }
        });
      }
    });

    // Add auto-advance functionality for ablation carousel
    var ablationItems = document.querySelectorAll('#ablation-carousel .item');
    ablationItems.forEach(function(item) {
      var video = item.querySelector('video');
      if (video) {
        video.addEventListener('loadedmetadata', alignAllVideoCarousels);
        video.addEventListener('ended', function() {
          if (ablationCarousel && ablationCarousel.next) {
            ablationCarousel.next();
          }
        });
      }
    });

    // Add auto-advance functionality for comparisons carousel
    var comparisonsItems = document.querySelectorAll('#comparisons-carousel .item');
    comparisonsItems.forEach(function(item) {
      var video = item.querySelector('video');
      if (video) {
        video.addEventListener('loadedmetadata', alignAllVideoCarousels);
        video.addEventListener('ended', function() {
          if (comparisonsCarousel && comparisonsCarousel.next) {
            comparisonsCarousel.next();
          }
        });
      }
    });

    // Add auto-advance functionality for more carousel
    var moreItems = document.querySelectorAll('#more-carousel .item');
    moreItems.forEach(function(item) {
      var video = item.querySelector('video');
      if (video) {
        video.addEventListener('loadedmetadata', alignAllVideoCarousels);
        video.addEventListener('ended', function() {
          if (moreCarousel && moreCarousel.next) {
            moreCarousel.next();
          }
        });
      }
    });

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    preloadCoreIdeaImages();
    setCoreIdeaFrame(0);
    $('#core-idea-slider').on('input', function(event) {
      setCoreIdeaFrame(parseInt(this.value));
    });

    bulmaSlider.attach();

})
