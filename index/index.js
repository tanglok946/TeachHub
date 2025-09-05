document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add animations on scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));

  // Features section zoom animation
  const featuresSection = document.getElementById('features');
  const featuresObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featuresSection.classList.add('zoom-in');
          featuresSection.classList.remove('zoom-out');
        } else {
          featuresSection.classList.add('zoom-out');
          featuresSection.classList.remove('zoom-in');
        }
      });
    },
    { threshold: 0.2 }
  );
  featuresObserver.observe(featuresSection);

  // Nav link hover bounce effect
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', function () {
      this.classList.add('bounce-once');
      this.addEventListener(
        'animationend',
        () => this.classList.remove('bounce-once'),
        { once: true }
      );
    });
  });

  // Theme toggle logic
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Cookie popup logic
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  const declineCookiesButton = document.getElementById('decline-cookies');

  // Check if the user has already made a choice about cookies
  const userChoice = localStorage.getItem('cookieChoice');

  // If no choice has been made, show the pop-up
  if (!userChoice) {
    cookiePopup.style.display = 'block';
    setTimeout(() => cookiePopup.classList.add('show'), 100);
  }

  // Set default theme to dark (if cookies are declined or no choice is made)
  const defaultTheme = 'dark';
  body.setAttribute('data-theme', defaultTheme);

  // Update the icon based on the default theme
  if (defaultTheme === 'dark') {
    icon.classList.remove('ri-moon-line');
    icon.classList.add('ri-sun-line');
  } else {
    icon.classList.remove('ri-sun-line');
    icon.classList.add('ri-moon-line');
  }

  // Handle the "Accept" button click
  acceptCookiesButton.addEventListener('click', function () {
    // Hide the pop-up
    cookiePopup.style.display = 'none';

    // Save the user's choice in localStorage
    localStorage.setItem('cookieChoice', 'accepted');

    // Enable cookies or tracking mechanisms
    enableCookies();

    // Save the current theme in localStorage (if cookies are accepted)
    const currentTheme = body.getAttribute('data-theme');
    localStorage.setItem('theme', currentTheme);
  });

  // Handle the "Decline" button click
  declineCookiesButton.addEventListener('click', function () {
    // Hide the pop-up
    cookiePopup.style.display = 'none';

    // Save the user's choice in localStorage
    localStorage.setItem('cookieChoice', 'declined');

    // Disable cookies or tracking mechanisms
    disableCookies();

    // Clear the saved theme from localStorage (if cookies are declined)
    localStorage.removeItem('theme');
  });

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // Show alert when switching from dark to light mode
    if (isDark) {
      const confirmChange = confirm('Light mode may lose the cyberpunk vibe. Are you sure?');
      if (!confirmChange) return;
    }

    // Update theme
    body.setAttribute('data-theme', newTheme);

    // Save the theme in localStorage only if cookies are accepted
    if (localStorage.getItem('cookieChoice') === 'accepted') {
      localStorage.setItem('theme', newTheme);
    }

    // Save the theme in sessionStorage only if cookies are declined
    if (localStorage.getItem('cookieChoice') === 'declined') {
      sessionStorage.setItem('theme', newTheme);
    } 

    if (!localStorage.getItem('cookieChoice')) {
      sessionStorage.setItem('theme', newTheme);
    }

    // Add rotation effect
    themeToggle.classList.add('rotate');
    setTimeout(() => themeToggle.classList.remove('rotate'), 500);

    // Toggle icons
    icon.classList.toggle('ri-sun-line');
    icon.classList.toggle('ri-moon-line');
  });

  // Apply saved theme (if cookies are accepted)
  if (localStorage.getItem('cookieChoice') === 'accepted') {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);

    // Update the icon based on the saved theme
    if (savedTheme === 'dark') {
      icon.classList.remove('ri-moon-line');
      icon.classList.add('ri-sun-line');
    } else {
      icon.classList.remove('ri-sun-line');
      icon.classList.add('ri-moon-line');
    }
  }

  // Apply saved theme in session (if cookies are declined)
  if (localStorage.getItem('cookieChoice') === 'declined') {
    const savedTheme = sessionStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
  
    // Update the icon based on the saved theme
    if (savedTheme === 'dark') {
      icon.classList.remove('ri-moon-line');
      icon.classList.add('ri-sun-line');
    } else {
      icon.classList.remove('ri-sun-line');
      icon.classList.add('ri-moon-line');
    }
  }

  if (!localStorage.getItem('cookieChoice') ) {
    const savedTheme = sessionStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
  
    // Update the icon based on the saved theme
    if (savedTheme === 'dark') {
      icon.classList.remove('ri-moon-line');
      icon.classList.add('ri-sun-line');
    } else {
      icon.classList.remove('ri-sun-line');
      icon.classList.add('ri-moon-line');
    }
  }
});

// Function to enable cookies or tracking
function enableCookies() {
  console.log('Cookies are enabled.');
  // Add your cookie-setting logic here
}

// Function to disable cookies or tracking
function disableCookies() {
  console.log('Cookies are disabled.');
  // Add your logic to block cookies or tracking here
}

console.log('Main page script running');

const isLoggedIn = localStorage.getItem('isLoggedIn');
const username = localStorage.getItem('username'); // Retrieve the username

if (isLoggedIn === 'true' && username) {
  console.log('User is logged in');

  // Update the header to welcome the user
  const welcomeHeader = document.getElementById('welcomeHeader');
  if (welcomeHeader) {
    welcomeHeader.textContent = `Hi, ${username}!`;
  } else {
    console.error('welcomeHeader element not found');
  }

  // Update the "Sign Up" link to "Logout"
  const authLink = document.getElementById('authLink');
  if (authLink) {
    authLink.textContent = 'Logout';
    authLink.href = '#';

    // Add logout functionality
    authLink.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('isLoggedIn', 'false'); // Set isLoggedIn to false
      localStorage.removeItem('username'); // Clear username

      alert('You have been logged out.');
      window.location.href = 'index.html'; // Redirect to the home page
    });
  } else {
    console.error('authLink element not found');
  }
} else {
  console.log('User is not logged in');

  // User is not logged in, so clear the welcome header
  const welcomeHeader = document.getElementById('welcomeHeader');
  if (welcomeHeader) {
    welcomeHeader.textContent = ''; // Set the header to empty
  } else {
    console.error('welcomeHeader element not found');
  }

  // User is not logged in
  const authLink = document.getElementById('authLink');
  if (authLink) {
    authLink.textContent = 'Sign Up';
    authLink.href = '../Sign Up/signup.html';
  } else {
    console.error('authLink element not found');
  }
}


const menuButton = document.querySelector('.group');
const dropdownMenu = document.querySelector('.dropdown-menu');

menuButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});

document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typing-text");
  const fullText = `The best way to create value in the 21st century
 is to connect creativity with technology.`; // Use template literals for line breaks
  let isTypingDone = false; 

  // Typing Animation Function
    function typeText(text, element, speed = 50) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        // Add a line break if the character is a newline
        if (text.charAt(i) === "\n") {
          element.innerHTML += "<br>"; // Use innerHTML to render line breaks
        } else {
          element.textContent += text.charAt(i);
        }
        i++;
      } else {
        clearInterval(interval);
        isTypingDone = true;
      }
    }, speed);
  } 

  // Trigger Typing Animation on Scroll
  const inspirationSection = document.getElementById("inspiration");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isTypingDone) {
          typingText.textContent = ""; // Clear text before typing
          typeText(fullText, typingText);
          observer.unobserve(inspirationSection); // Stop observing after animation
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
  );

  observer.observe(inspirationSection);

  
});



document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".arrow-prev");
  const nextButton = document.querySelector(".arrow-next");
  const dotsContainer = document.getElementById("dotsContainer");
  let currentIndex = 0;
  let autoScroll;
  const totalItems = items.length;
  const totalDots = Math.min(4, totalItems); // Only 4 dots for first 4 items

  function isMobile() {
    return window.innerWidth <= 768; // Check if the device width is ≤768px
  }

  function initializeCarousel() {
    if (isMobile()) {
      disableCarousel();
    } else {
      enableCarousel();
    }
  }

  function disableCarousel() {
    track.style.transform = "translateX(0)"; // Reset position
    track.style.transition = "none"; // Disable animation
    dotsContainer.innerHTML = ""; // Remove dots
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    stopAutoScroll();
  }

  function enableCarousel() {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    createDots();
    updateCarousel();
    startAutoScroll();
  }

  // Create only 4 dots for first 4 items
  function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        stopAutoScroll();
        goToIndex(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Update carousel position
  function updateCarousel() {
    if (isMobile()) return; // Prevent updates on mobile
    const itemWidth = items[0].offsetWidth + 32; // Include gap (2rem = 32px)
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    updateDots();
  }

  // Update active dot (only affects first 4 items)
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    let dotIndex = currentIndex % totalDots;

    // If carousel moves past the first 4 items, keep the last dot active
    if (currentIndex >= totalDots) {
      dotIndex = totalDots - 1; // Keep the 4th dot active
    }

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  // Go to a specific index (only within first 4 items)
  function goToIndex(index) {
    if (isMobile()) return;
    currentIndex = index;
    updateCarousel();
  }

  // Previous button click (infinite loop)
  prevButton.addEventListener("click", () => {
    if (isMobile()) return;
    stopAutoScroll();
    currentIndex = (currentIndex === 0) ? 3 : currentIndex - 1;
    updateCarousel();
  });

  // Next button click (smoothly transition after 4th dot)
  nextButton.addEventListener("click", () => {
    if (isMobile()) return;
    stopAutoScroll();
    if (currentIndex < 3) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to first item
    }
    updateCarousel();
  });

  // Auto-scroll function
  function startAutoScroll() {
    if (isMobile()) return;
    autoScroll = setInterval(() => {
      if (currentIndex < 3) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  // Pause auto-scroll on hover
  track.addEventListener("mouseenter", stopAutoScroll);
  track.addEventListener("mouseleave", startAutoScroll);

  // Handle window resize
  window.addEventListener("resize", initializeCarousel);

  // Initialize carousel
  initializeCarousel();
});

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

// Function to highlight matches
function highlightMatches(query) {
    // Remove previous highlights
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach((element) => {
        const parent = element.parentNode;
        parent.replaceChild(document.createTextNode(element.textContent), element);
    });

    if (!query) return; // Exit if the search query is empty

    // Create a regex to match the exact characters or words
    const regex = new RegExp(`(${query})`, 'gi');

    // Function to recursively highlight text in a node
    function highlightText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const matches = node.textContent.match(regex);
            if (matches) {
                // Create a document fragment to hold the highlighted text
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;

                // Loop through matches and wrap them in a span
                matches.forEach((match) => {
                    const matchIndex = node.textContent.toLowerCase().indexOf(match.toLowerCase(), lastIndex);
                    if (matchIndex >= lastIndex) {
                        // Add text before the match
                        fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex, matchIndex)));

                        // Add the highlighted match
                        const span = document.createElement('span');
                        span.className = 'highlight';
                        span.textContent = match;
                        fragment.appendChild(span);

                        // Update lastIndex to continue searching
                        lastIndex = matchIndex + match.length;
                    }
                });

                // Add remaining text after the last match
                fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex)));

                // Replace the text node with the fragment
                node.replaceWith(fragment);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
            Array.from(node.childNodes).forEach(highlightText);
        }
    }

    // Start highlighting from the body
    highlightText(document.body);

    // Scroll to the first match
    const firstMatch = document.querySelector('.highlight');
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Search on button click
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    highlightMatches(query);
});

// Search on pressing Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        highlightMatches(query);
    }
});

// Fade-in and Slide-up Effect on Scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = 1;
                  entry.target.style.transform = "translateY(0)";
              } else {
                  entry.target.style.opacity = 0;
                  entry.target.style.transform = "translateY(50px)";
              }
          });
      },
      {
          threshold: 0.1,
      }
  );

  sections.forEach((section) => {
      section.style.opacity = 0;
      section.style.transform = "translateY(50px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(section);
  });
});

// SMOOTH SCROLL IMPLEMENTATION ===============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Disable default anchor jump
    // Animate scroll to target element
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth", // Native smooth scrolling
    });
  });
});

// SCROLL-ACTIVATED ANIMATIONS ================================================
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // All content sections

  // Intersection Observer configuration
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { // When section enters viewport
          entry.target.classList.add("visible"); // Trigger animation
        }
      });
    },
    { threshold: 0.1 } // 10% visibility required to trigger
  );

  // Activate observer for all sections
  sections.forEach((section) => {
    observer.observe(section); // Start watching each section
  });
});

// MAIN CONTENT LOAD HANDLER ==================================================
document.addEventListener('DOMContentLoaded', () => {
  // BACKGROUND MUSIC SYSTEM ==================================================
  const backgroundMusic = document.getElementById('background-music'); // Get audio element
  const allVideos = document.querySelectorAll('video'); // Find all video elements

  // Autoplay workaround (browsers require user interaction for audio)
  document.addEventListener('click', () => {
    // Attempt playback on first user click
    backgroundMusic.play().catch(error => {
      console.log('Audio playback prevented:', error); // Handle browser restrictions
    });
  }, { once: true }); // Only trigger once to prevent music restart on subsequent clicks

  // VIDEO PLAYBACK MANAGEMENT ================================================
  allVideos.forEach(video => {
    // Silence background music when video starts
    video.addEventListener('play', () => {
      backgroundMusic.pause(); // Immediate pause on video play
    });

    // Restore music when video pauses (if no others playing)
    video.addEventListener('pause', () => {
      if(!isAnyVideoPlaying()) { // Check other videos first
        backgroundMusic.play(); // Resume playback
      }
    });

    // Restore music when video ends
    video.addEventListener('ended', () => {
      if(!isAnyVideoPlaying()) { // Verify no active videos
        backgroundMusic.play(); // Restart background track
      }
    });
  });

  // VIDEO STATE CHECKER ======================================================
  function isAnyVideoPlaying() {
    return Array.from(allVideos).some(video => !video.paused); // Check all video elements
  }
});
// Optional: Autoplay on page load if allowed by the browser
window.addEventListener('load', () => {
  const backgroundMusic = document.getElementById('background-music');
  // Attempt to play the background music automatically
  backgroundMusic.play()
      .then(() => {
          console.log('Background music started playing automatically.');
      })
      .catch((error) => {
          console.error('Autoplay on load failed:', error);
      });
});

document.addEventListener('DOMContentLoaded', () => {
  const backgroundMusic = document.getElementById('background-music'); // Get background music element
  const musicToggle = document.getElementById('music-toggle'); // Get the toggle button
  const musicIcon = musicToggle.querySelector('i'); // Get the icon inside the button

  // Function to update the mute state and UI
  const updateMuteState = (muted) => {
    backgroundMusic.muted = muted;

    // Update the icon and animation based on the mute state
    if (muted) {
      musicIcon.classList.remove('ri-volume-up-line');
      musicIcon.classList.add('ri-volume-mute-line');
      musicToggle.classList.remove('playing'); // Remove animation when muted
    } else {
      musicIcon.classList.remove('ri-volume-mute-line');
      musicIcon.classList.add('ri-volume-up-line');
      musicToggle.classList.add('playing'); // Add animation when unmuted
    }

    // Save the mute state based on cookie choice
    if (localStorage.getItem('cookieChoice') === 'accepted') {
      localStorage.setItem('muteState', muted); // Save in localStorage if cookies are accepted
    } else {
      sessionStorage.setItem('muteState', muted); // Save in sessionStorage if cookies are declined or no choice
    }
  };

  // Check saved mute state on page load
  let savedMuteState;
  if (localStorage.getItem('cookieChoice') === 'accepted') {
    savedMuteState = localStorage.getItem('muteState'); // Get from localStorage if cookies are accepted
  } else {
    savedMuteState = sessionStorage.getItem('muteState'); // Get from sessionStorage if cookies are declined or no choice
  }

  // Apply saved mute state or default to unmuted
  if (savedMuteState === 'true') {
    updateMuteState(true);
  } else {
    updateMuteState(false);
  }

  // Toggle mute/unmute on button click
  musicToggle.addEventListener('click', () => {
    const newMutedState = !backgroundMusic.muted;
    updateMuteState(newMutedState);
  });

  // Add animation when music starts playing
  backgroundMusic.addEventListener('play', () => {
    if (!backgroundMusic.muted) {
      musicToggle.classList.add('playing'); // Add animation when music plays
    }
  });

  // Remove animation when music is paused
  backgroundMusic.addEventListener('pause', () => {
    musicToggle.classList.remove('playing'); // Remove animation when music pauses
  });
});