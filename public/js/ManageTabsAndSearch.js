document.addEventListener('DOMContentLoaded', function () {
    var lastContentVisible = 'about-content'; // Initialize with the about content as the last visible
    var lastSubtabSelected = null; // Track the last selected tab for highlighting

    // Function to hide content (for both navbar and search system)
    function hideContent(contentClass) {
        console.log('Hiding content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'none'; // Hide the content
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    // Function to show content (for both navbar and search system)
    function showContent(contentClass) {
        console.log('Showing content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'block'; // Ensure content is visible
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    // Function to hide all content (for both navbar and search system)
    function hideAllContent() {
        const allContent = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allContent.forEach(content => {
            content.style.display = 'none';
        });
    }

    // Setup subtabs
    function setupSubtab(tabId, contentClass) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.addEventListener('click', function () {
                // Hide all content and remove highlights
                hideAllContent();
                if (lastSubtabSelected) {
                    lastSubtabSelected.classList.remove('highlight');
                }

                // Show the content for the selected tab
                showContent(contentClass);

                // Highlight the selected subtab
                lastSubtabSelected = tab;
                lastSubtabSelected.classList.add('highlight');
            });
        } else {
            console.error(`Tab with ID ${tabId} not found.`);
        }
    }

    // Initially hide the 'projects-content' and setup all other subtabs
    hideContent('projects-content');  // Hide the projects content initially

    // Setup each subtab
    setupSubtab('about-tab', 'about-content');
    setupSubtab('copyright-tab', 'copyright-content');
    setupSubtab('articles-tab', 'articles-content');
    setupSubtab('images-tab', 'images-content');
    setupSubtab('projects-tab', 'projects-content');
    setupSubtab('coop-tab', 'coop-content');
    setupSubtab('tradingbot-tab', 'tradingbot-content');
    setupSubtab('languages-tab', 'languages-content');
    setupSubtab('contact-tab', 'contact-content');

    // Initially display the 'about-content' (managed by navbar)
    showContent('about-content');

    // --- Search System Integration ---
const searchBar = document.getElementById('search-bar');

// Select all buttons with class 'sbutton'
const sbuttons = document.querySelectorAll('.sbutton'); // Select all buttons with 'sbutton' class
const sbuttons2 = document.querySelectorAll('.sbutton2'); // Select all buttons with 'sbutton' class

// Event listener for input in the search bar
searchBar.addEventListener('input', function () {
    const query = searchBar.value.trim();
    if (query) {
        searchWebsite(query); // Trigger search when there's input
    } else {
        resetSearchResults(); // Reset the page when the search bar is cleared
    }
});

// Event listener for clicking the search button (like sbutton)
sbuttons.forEach(button => {
    button.addEventListener('click', function () {
        const query = button.innerText.trim(); // Get the text of the button
        if (query) {
            searchWebsite(query); // Trigger search when the button is clicked
        }
    });
});

// Event listener for clicking the search button (like sbutton)
sbuttons2.forEach(button => {
    button.addEventListener('click', function () {
        const query = button.innerText.trim(); // Get the text of the button
        if (query) {
            searchWebsite(query); // Trigger search when the button is clicked
        }
    });
});



    function searchWebsite(query) {
        hideAllContent();
    
        const elementsToSearch = document.querySelectorAll(
            '.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content'
        );
    
        let foundMatch = false;
        let matchCounter = 0; // Track the order of matching results
    
        const ordinals = [
            "Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto",
            "Sexto", "Sétimo", "Oitavo", "Nono", "Décimo"
        ];
    
        elementsToSearch.forEach(element => {
            // Restore original content if already altered
            const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
            element.innerHTML = originalHTML;
    
            // Save the original HTML if it's not already saved
            if (!element.getAttribute('data-original-html')) {
                element.setAttribute('data-original-html', originalHTML);
            }
    
            // Highlight matches
            const isMatchFound = highlightMatches(element, query);
    
            if (isMatchFound) {
                if (matchCounter < ordinals.length) {
                    matchCounter++; // Increment match counter
                    foundMatch = true;
    
                    // Show matching content
                    showContent(element.classList[0]);
    
                    const label = document.createElement('div');
    
                    // Create a span for the ordinal word with uppercase and blue styling
                    const ordinalSpan = document.createElement('span');
                    ordinalSpan.textContent = `${ordinals[matchCounter - 1]}`.toUpperCase(); // Convert to uppercase
                    ordinalSpan.style.color = 'blue'; // Set text color to blue
                    ordinalSpan.style.fontWeight = 'bold'; // Optional: make it bold
    
                    // Add text before and after the ordinal word
                    label.textContent = 'ESTE É O ';
                    label.style.fontWeight = 'bold';
                    label.style.fontSize = '50px'; // Sets the font size to 16 pixels
                    label.style.color = 'black';
                    label.style.textAlign = 'left'; // Align text inside the label to the left
                    label.style.paddingLeft = '4.5%'; // Adds 10% padding to the left side
                    label.appendChild(ordinalSpan); // Add the styled ordinal word
                    label.appendChild(document.createTextNode(' RESULTADO DA PESQUISA: ')); // Add closing parenthesis
    
                    // Create a wrapper for the line breaks and the message
                    const wrapper = document.createElement('div');
                    wrapper.style.textAlign = 'center'; // Center the content
                    wrapper.appendChild(label); // Add the label
    
                    // Add line breaks for better spacing
                    for (let i = 0; i < 6; i++) {
                        const brTag = document.createElement('br');
                        wrapper.appendChild(brTag); // Append <br> to the wrapper
                    }
    
                    element.prepend(wrapper); // Add the wrapper to the top of the element
                }
            }
        });
    
        // Handle 'not found' message
        const notFoundMessage = document.getElementById('not-found-message');
        notFoundMessage.style.display = foundMatch ? 'none' : 'block';
    }
    
        
    
    function highlightMatches(element, query) {
        const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape special regex characters
        const regex = new RegExp(escapedQuery, 'gi'); // Case-insensitive match with escaped query
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    
        const nodesToReplace = [];
        let isMatchFound = false; // Flag to determine if this element has matches
    
        // Find and store matches in text nodes
        while (walker.nextNode()) {
            const currentNode = walker.currentNode;
    
            // If there's a match, save the node for replacement
            if (regex.test(currentNode.nodeValue)) {
                nodesToReplace.push(currentNode);
                isMatchFound = true; // Mark this element as a match
            }
        }
    
        // Replace text in all matching nodes
        nodesToReplace.forEach(node => {
            const parent = node.parentNode;
    
            // Create a container to hold the new HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = node.nodeValue.replace(regex, match => `<span class="highlight">${match}</span>`);
    
            // Replace the text node with the new fragments
            const fragments = document.createDocumentFragment();
            Array.from(tempContainer.childNodes).forEach(child => fragments.appendChild(child));
            parent.replaceChild(fragments, node);
        });
    
        return isMatchFound;
    }
        
    
    // Function to reset search results
    function resetSearchResults() {
        const allTextElements = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allTextElements.forEach(content => {
            showContent(content.classList[0]); // Show all content
        });

        const notFoundMessage = document.getElementById('not-found-message');
        if (notFoundMessage) {
            notFoundMessage.style.display = 'none'; // Hide the not found message
        }
    }
});

