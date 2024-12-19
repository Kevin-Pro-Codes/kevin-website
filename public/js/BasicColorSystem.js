document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar'); // Navbar element
  const flagbutton = document.querySelector('.flag-button'); // Flag button
  const flagbuttontxt = document.querySelector('.flag-text'); // Flag text
  const lockicon = document.querySelector('.lock-icon'); // Lock icon
  const changeicon = document.querySelector('.change-icon'); // Change icon
  const coloricon = document.querySelector('.color-icon'); // Color icon button
  const homeTabButton = document.querySelector('.home-tab'); // Home tab button
  const portfolioTabButton = document.querySelector('.portfolio-tab'); // Home tab button
  const extrasTabButton = document.querySelector('.extras-tab'); // Home tab button
  const contactTabButton = document.querySelector('.contact-tab'); // Home tab button

  // Select all sub-tab lists (instead of navbar links)
  const subTabBoxes = document.querySelectorAll('.sub-tabs-box ul, .sub-tabs-box2 ul, .sub-tabs-box3 ul');

  let isWhite = false; // Track color state (default is black theme)
  let isLocked = false; // Track lock state

  // Set default styles (black background and blue sub-tab links)
  subTabBoxes.forEach(box => {
      box.style.backgroundColor = 'black';
      box.style.color = 'white';
  });

  // Set the home tab button to be blue by default
  homeTabButton.style.backgroundColor = 'blue';
  homeTabButton.style.color = 'white';

  // Set the home tab button to be blue by default
  portfolioTabButton.style.backgroundColor = 'blue';
  portfolioTabButton.style.color = 'white';

    // Set the home tab button to be blue by default
    extrasTabButton.style.backgroundColor = 'blue';
    extrasTabButton.style.color = 'white';

// Set the home tab button to be blue by default
contactTabButton.style.backgroundColor = 'blue';
contactTabButton.style.color = 'white';


  // Function to apply styles to elements (excluding sub-tabs)
  function applyTheme(elements, backgroundColor, color) {
      elements.forEach(element => {
          element.style.backgroundColor = backgroundColor;
          element.style.color = color;
      });
  }

  // Toggle lock icon functionality
  lockicon.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent click event from propagating to parent elements

      // Toggle the lock state
      isLocked = !isLocked;
      
      // Change lock icon state
      const iconElement = this.querySelector('i');
      if (isLocked) {
          iconElement.className = 'fa-solid fa-lock'; // Closed lock icon
      } else {
          iconElement.className = 'fa-solid fa-lock-open'; // Open lock icon
      }
  });

  // Prevent color button from functioning when locked
  coloricon.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click event from bubbling up to the flag button

      if (isLocked) {
          console.log("Coloring functionality is disabled because the lock is active");
          return; // Exit if locked, preventing color change
      }

      // Toggle navbar color (only navbar and navbar links will change, not the sub-tabs)
      if (isWhite) {
          // Change styles to black theme
          navbar.style.backgroundColor = 'black';
          navbar.style.color = 'white';

          // Apply the black theme to the selected elements (exclude sub-tabs)
          applyTheme([flagbutton, flagbuttontxt, lockicon, changeicon, coloricon], 'black', 'white');

          // Apply the black background and white text to the sub-tab boxes
          subTabBoxes.forEach(box => {
              box.style.backgroundColor = 'black';
              box.style.color = 'white';
          });

          // Set home-tab button to blue
          homeTabButton.style.backgroundColor = 'blue';
          homeTabButton.style.color = 'white';

      } else {
          // Change styles to white theme
          navbar.style.backgroundColor = 'white';
          navbar.style.color = 'black';

          // Apply the white theme to the selected elements (exclude sub-tabs)
          applyTheme([flagbutton, flagbuttontxt, lockicon, changeicon, coloricon], 'white', 'black');

          // Apply the white background and black text to the sub-tab boxes
          subTabBoxes.forEach(box => {
              box.style.backgroundColor = 'white';
              box.style.color = 'black';
          });

          // Set home-tab button to blue
          homeTabButton.style.backgroundColor = 'blue';
          homeTabButton.style.color = 'white';
      }

      // Toggle state
      isWhite = !isWhite;
  });
});
