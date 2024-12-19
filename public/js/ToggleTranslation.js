//TOGGLE TRANSLATION BUTTON THROUGH JSON


document.addEventListener('DOMContentLoaded', function() {
    const flagButton = document.querySelector('.flag-button');
    const flagText = document.querySelector('.flag-text');
    const flagImages = flagButton.querySelectorAll('img');
    const lowIcons = document.querySelector('.low-icons');
    const lockIcon = document.querySelector('.lock-icon i'); // Lock icon element

    let isLocked = false; // Track if the lock is active

    // Flag image sources for English
    const englishFlags = [
        { src: '/images/united-kingdom.png', class: 'uk' },
        { src: '/images/united-states.png', class: 'us' },
        { src: '/images/canada.png', class: 'can' }
    ];

    // Flag image sources for Portuguese-speaking countries
    const portugueseFlags = [
        { src: '/images/portugal.png', class: 'pt' },
        { src: '/images/brazil.png', class: 'br' },
        { src: '/images/angola.png', class: 'an' }
    ];

    async function setLanguage(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error('Language file not found');
            }
            const translations = await response.json();
    
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                el.innerHTML = translations[key] || el.innerHTML;
            });
    
            // Handle placeholders
            document.querySelectorAll('[data-placeholder]').forEach(el => {
                const key = el.getAttribute('data-placeholder');
                if (translations[key]) {
                    el.placeholder = translations[key];
                }
            });
    
            if (lang === 'pt') {
                setPortuguese();
            } else {
                setEnglish();
            }
    
            localStorage.setItem('selectedLanguage', lang);
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }
    
    function setPortuguese() {
        flagText.innerHTML = 'Língua: Português';
        flagText.classList.add('portuguese-text');
        flagText.classList.remove('english-text');
        lowIcons.classList.add('portuguese-icons');
        lowIcons.classList.remove('english-icons');
    
        // Reset the brazil-icons class to ensure it doesn't persist when switching languages
        lowIcons.classList.remove('brazil-icons');
    
        flagImages.forEach((img, index) => {
            img.src = portugueseFlags[index].src;
            img.classList.add(portugueseFlags[index].class);
            img.classList.remove('uk', 'us', 'can'); // Remove English classes
    
            // Add the brazil-icons class when the Brazil flag is selected
            if (img.classList.contains('br')) {
                lowIcons.classList.add('brazil-icons');
            }
        });
    }

    
    function setEnglish() {
        flagText.innerHTML = 'Language: English';
        flagText.classList.add('english-text');
        flagText.classList.remove('portuguese-text');
        lowIcons.classList.add('english-icons');
        lowIcons.classList.remove('portuguese-icons');

        flagImages.forEach((img, index) => {
            img.src = englishFlags[index].src;
            img.classList.add(englishFlags[index].class);
            img.classList.remove('pt', 'br', 'an'); // Remove Portuguese classes
        });
    }

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const defaultLanguage = savedLanguage || 'pt'; // Default to 'pt' if no language is saved
    setLanguage(defaultLanguage);

    // Toggle language on button click
    flagButton.addEventListener('click', function(event) {
        if (isLocked) {
            console.log("Translation functionality is disabled because the lock is active");
            return; // Exit if locked
        }

        event.preventDefault(); // Prevent default anchor click behavior

        const isPortuguese = flagText.innerHTML.includes('Português');

        if (isPortuguese) {
            setLanguage('en');
        } else {
            setLanguage('pt');
        }
    });

    // Handle lock icon toggle
    document.querySelector('.lock-icon').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from propagating to parent elements

        const iconElement = this.querySelector('i');

        // Toggle the lock state
        if (iconElement.classList.contains('fa-lock-open')) {
            iconElement.className = 'fa-solid fa-lock'; // Closed lock icon
            isLocked = true; // Set lock state to locked
        } else if (iconElement.classList.contains('fa-lock')) {
            iconElement.className = 'fa-solid fa-lock-open'; // Open lock icon
            isLocked = false; // Set lock state to unlocked
        }
    });
});

