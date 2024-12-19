document.addEventListener('DOMContentLoaded', function () {
    let lastContentVisible = null;
    let lastSubtabSelected = null;

    // Function to hide the selected subtab and content
    function hideSelectedSubtab() {
        if (lastSubtabSelected) {
            lastSubtabSelected.classList.remove('highlight'); // Remove highlight from the last selected subtab
        }
        if (lastContentVisible) {
            lastContentVisible.classList.add('hidden'); // Hide the current content
        }
    }

    // Function to show content based on a search query
    function searchWebsite(query) {
        hideAllContent(); // Hide all content when a search is active
        const allTextElements = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
    
        let foundMatch = false;
    
        allTextElements.forEach(content => {
            if (content.textContent.toLowerCase().includes(query.toLowerCase())) {
                showContent(content.classList[0]); // Ensure the content is shown
                highlightText(content, query); // Highlight the matching text
                foundMatch = true;
            }
        });
    
        const notFoundMessage = document.getElementById('not-found-message');
        if (!foundMatch && notFoundMessage) {
            notFoundMessage.style.display = 'block'; // Show 'Not Found' message if no match
        } else if (notFoundMessage) {
            notFoundMessage.style.display = 'none'; // Hide if a match is found
        }
    }

    // Search bar logic
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        if (query) {
            searchWebsite(query); // Trigger search and highlight if there’s a query
        } else {
            location.reload(); // Optional: reset the page if the search bar is empty
        }
    });

    // Function to show content for a specific subtab
    function showSubtabContent(subtabId, contentClass) {
        const subtab = document.getElementById(subtabId);
        if (subtab) {
            subtab.addEventListener('click', function () {
                hideSelectedSubtab(); // Hide previous content and subtab

                // Show the new content
                lastSubtabSelected = subtab;
                lastSubtabSelected.classList.add('highlight'); // Highlight the selected subtab

                const content = document.querySelector('.' + contentClass);
                if (content) {
                    content.classList.remove('hidden'); // Show the content corresponding to the subtab
                    lastContentVisible = content;
                }

                // Apply search query if available
                const query = searchBar.value.trim();
                if (query) {
                    searchWebsite(query);
                }

                // Save state to localStorage
                localStorage.setItem('lastVisitedSubtab', subtabId);
                localStorage.setItem('lastVisitedContent', contentClass);
            });
        } else {
            console.error(`Subtab with ID ${subtabId} not found.`);
        }
    }

    // Setup default subtab and content
    showSubtabContent('about-tab', 'about-content');

    // Restore last visited subtab and content from localStorage
    const lastVisitedSubtab = localStorage.getItem('lastVisitedSubtab');
    const lastVisitedContent = localStorage.getItem('lastVisitedContent');

    if (lastVisitedSubtab && lastVisitedContent) {
        const lastSubtab = document.getElementById(lastVisitedSubtab);
        const content = document.querySelector('.' + lastVisitedContent);

        if (lastSubtab && content) {
            lastSubtab.classList.add('highlight');
            lastSubtabSelected = lastSubtab;

            content.classList.remove('hidden');
            lastContentVisible = content;
        }
    } else {
        // Fallback to default 'about' tab
        const defaultContent = document.querySelector('.about-content');
        const defaultSubtab = document.getElementById('about-tab');
        if (defaultContent && defaultSubtab) {
            defaultContent.classList.remove('hidden');
            defaultSubtab.classList.add('highlight');
            lastContentVisible = defaultContent;
            lastSubtabSelected = defaultSubtab;
        }
    }

    // Initially hide the search results
    const searchResults = document.getElementById('SearchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
});
