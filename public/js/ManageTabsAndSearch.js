document.addEventListener('DOMContentLoaded', function () {
    var lastContentVisible = 'about-content';
    var lastSubtabSelected = null;

    // Function to be used in order to translate the title
    function getTranslation(key) {
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        const translations = {
            pt: {
                search_result_label: "ESTE É O ",
                search_result_message: " RESULTADO DA PESQUISA:"
            },
            en: {
                search_result_label: "THIS IS THE ",
                search_result_message: " SEARCH RESULT:"
            }
        };
        return translations[lang][key] || key; // Retorna a tradução ou a chave caso não encontre
    }

    // Function to get the ordinals to be used in the title
    function getOrdinals() {
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        const ordinals = {
            pt: [
                "Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto",
                "Sexto", "Sétimo", "Oitavo", "Nono", "Décimo"
            ],
            en: [
                "First", "Second", "Third", "Fourth", "Fifth",
                "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"
            ]
        };
        return ordinals[lang] || ordinals.pt;
    }

    function hideContent(contentClass) {
        console.log('Hiding content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'none';
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    function showContent(contentClass) {
        console.log('Showing content:', contentClass);
        var content = document.querySelector('.' + contentClass);
        if (content) {
            content.style.display = 'block';
        } else {
            console.error('Content not found:', contentClass);
        }
    }

    function hideAllContent() {
        const allContent = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allContent.forEach(content => {
            content.style.display = 'none';
        });
    }

    function setupSubtab(tabId, contentClass) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.addEventListener('click', function () {
                hideAllContent();
                if (lastSubtabSelected) {
                    lastSubtabSelected.classList.remove('highlight');
                }

                showContent(contentClass);

                lastSubtabSelected = tab;
                lastSubtabSelected.classList.add('highlight');
            });
        } else {
            console.error(`Tab with ID ${tabId} not found.`);
        }
    }

    hideContent('projects-content');

    setupSubtab('about-tab', 'about-content');
    setupSubtab('copyright-tab', 'copyright-content');
    setupSubtab('articles-tab', 'articles-content');
    setupSubtab('images-tab', 'images-content');
    setupSubtab('projects-tab', 'projects-content');
    setupSubtab('coop-tab', 'coop-content');
    setupSubtab('tradingbot-tab', 'tradingbot-content');
    setupSubtab('languages-tab', 'languages-content');
    setupSubtab('contact-tab', 'contact-content');

    showContent('about-content');

    const searchBar = document.getElementById('search-bar');
    const sbuttons = document.querySelectorAll('.sbutton');
    const sbuttons2 = document.querySelectorAll('.sbutton2');

    let searchQuery = '';
    let searchResultLabels = [];
    let lastFoundMatch = false; // Track if the last search had a match
    let searchExecuted = false; // Track if a search has ever been executed

    searchBar.addEventListener('input', function () {
        searchQuery = searchBar.value.trim();
        searchExecuted = true;
        if (searchQuery) {
            searchWebsite(searchQuery);
        } else {
            resetSearchResults();
        }
    });

    sbuttons.forEach(button => {
        button.addEventListener('click', function () {
             searchExecuted = true;
            searchQuery = button.innerText.trim();
            if (searchQuery) {
                searchWebsite(searchQuery);
            }
        });
    });

    sbuttons2.forEach(button => {
        button.addEventListener('click', function () {
            searchExecuted = true;
            searchQuery = button.innerText.trim();
            if (searchQuery) {
                searchWebsite(searchQuery);
            }
        });
    });

    function searchWebsite(query) {
        hideAllContent();
        searchResultLabels = [];

        const elementsToSearch = document.querySelectorAll(
            '.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content'
        );

        let foundMatch = false;
        let matchCounter = 0;

        const ordinals = getOrdinals(); // Use the ordinals based on the selected language

        elementsToSearch.forEach(element => {
            const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
            element.innerHTML = originalHTML;

            if (!element.getAttribute('data-original-html')) {
                element.setAttribute('data-original-html', originalHTML);
            }

            const isMatchFound = highlightMatches(element, query);

            if (isMatchFound) {
                if (matchCounter < ordinals.length) {
                    matchCounter++;
                    foundMatch = true;

                    showContent(element.classList[0]);

                    const label = document.createElement('div');
                    const ordinalSpan = document.createElement('span');
                    ordinalSpan.textContent = `${ordinals[matchCounter - 1]}`.toUpperCase();
                    ordinalSpan.style.color = 'blue';
                    ordinalSpan.style.fontWeight = 'bold';

                    label.textContent = getTranslation('search_result_label');  // Usa a tradução aqui
                    label.style.fontWeight = 'bold';
                    label.style.fontSize = '45px';
                    label.style.color = 'black';
                    label.style.textAlign = 'left';
                    label.style.paddingLeft = '3.7%';
                    label.appendChild(ordinalSpan);
                    label.appendChild(document.createTextNode(getTranslation('search_result_message')));

                    const wrapper = document.createElement('div');
                    wrapper.style.textAlign = 'center';
                    wrapper.appendChild(label);

                    for (let i = 0; i < 6; i++) {
                        const brTag = document.createElement('br');
                        wrapper.appendChild(brTag);
                    }

                    element.prepend(wrapper);
                    searchResultLabels.push({ element, label });
                }
            }
        });


        // Update "not found" message based on search results
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        const notFoundMessagePt = document.getElementById(`not-found-message-pt`);
        const notFoundMessageEn = document.getElementById(`not-found-message-en`);


        if (lang === 'pt') {
            if (notFoundMessagePt) {
                notFoundMessagePt.style.display = foundMatch ? 'none' : 'block';
            }
            if (notFoundMessageEn) notFoundMessageEn.style.display = 'none';
        }
        else {
            if (notFoundMessageEn) {
                notFoundMessageEn.style.display = foundMatch ? 'none' : 'block';
            }
            if (notFoundMessagePt) notFoundMessagePt.style.display = 'none';
        }
        lastFoundMatch = foundMatch;
    }

    function highlightMatches(element, query) {
        const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const regex = new RegExp(escapedQuery, 'gi');
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

        const nodesToReplace = [];
        let isMatchFound = false;

        while (walker.nextNode()) {
            const currentNode = walker.currentNode;

            if (regex.test(currentNode.nodeValue)) {
                nodesToReplace.push(currentNode);
                isMatchFound = true;
            }
        }

        nodesToReplace.forEach(node => {
            const parent = node.parentNode;

            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = node.nodeValue.replace(regex, match => `<span class="highlight">${match}</span>`);

            const fragments = document.createDocumentFragment();
            Array.from(tempContainer.childNodes).forEach(child => fragments.appendChild(child));
            parent.replaceChild(fragments, node);
        });

        return isMatchFound;
    }

    function resetSearchResults() {
        const allTextElements = document.querySelectorAll('.about-content, .extra-text, .copyright-content, .articles-content, .images-content, .projects-content, .coop-content, .tradingbot-content, .languages-content, .contact-content');
        allTextElements.forEach(content => {
            showContent(content.classList[0]);
        });
        // Hide both "not found" messages when resetting
        const notFoundMessagePt = document.getElementById('not-found-message-pt');
        const notFoundMessageEn = document.getElementById('not-found-message-en');
        if (notFoundMessagePt) notFoundMessagePt.style.display = 'none';
        if (notFoundMessageEn) notFoundMessageEn.style.display = 'none';
        lastFoundMatch = false;
    }

    function updateLabelTranslations() {
        searchResultLabels.forEach(({ label }) => {
            const ordinalSpan = label.querySelector('span');
            const ordinals = getOrdinals();
            let index = searchResultLabels.indexOf(searchResultLabels.find(result => result.label === label));
            ordinalSpan.textContent = `${ordinals[index]}`.toUpperCase();
            label.textContent = getTranslation('search_result_label');
            label.appendChild(ordinalSpan);
            label.appendChild(document.createTextNode(getTranslation('search_result_message')));
        });
        // Update "not found" message based on the tracked last search results
        if(searchExecuted){
          const lang = localStorage.getItem('selectedLanguage') || 'pt';
          const notFoundMessagePt = document.getElementById(`not-found-message-pt`);
          const notFoundMessageEn = document.getElementById(`not-found-message-en`);
         if (lang === 'pt') {
           if (notFoundMessagePt) {
             notFoundMessagePt.style.display = lastFoundMatch ? 'none' : 'block';
           }
           if (notFoundMessageEn) notFoundMessageEn.style.display = 'none';
         }
         else{
            if (notFoundMessageEn) {
                notFoundMessageEn.style.display = lastFoundMatch ? 'none' : 'block';
             }
           if (notFoundMessagePt) notFoundMessagePt.style.display = 'none';
         }
       }
    }

    // Hide both "not found" messages on initial load
    const notFoundMessagePt = document.getElementById('not-found-message-pt');
    const notFoundMessageEn = document.getElementById('not-found-message-en');
    if (notFoundMessagePt) notFoundMessagePt.style.display = 'none';
    if (notFoundMessageEn) notFoundMessageEn.style.display = 'none';

    document.addEventListener('languageChanged', (event) => {
        updateLabelTranslations();
    });
});