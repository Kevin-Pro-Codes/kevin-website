document.addEventListener('DOMContentLoaded', function () {
    var lastContentVisible = 'about-content'; 
    var lastSubtabSelected = null; 

    // Traduções para diferentes idiomas
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

    // Ordinais em português e inglês
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

    // Função para obter a tradução com base no idioma selecionado
    function getTranslation(key) {
        const lang = getLanguage(); // Obtém o idioma selecionado
        return translations[lang][key] || key; // Retorna a tradução ou a chave caso não encontre
    }

    // Função para obter os ordinais com base no idioma selecionado
    function getOrdinals() {
        const lang = getLanguage(); // Obtém o idioma selecionado
        return ordinals[lang] || ordinals.pt; // Retorna os ordinais do idioma selecionado ou os em português como padrão
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

    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        if (query) {
            searchWebsite(query); 
        } else {
            resetSearchResults(); 
        }
    });

    sbuttons.forEach(button => {
        button.addEventListener('click', function () {
            const query = button.innerText.trim(); 
            if (query) {
                searchWebsite(query); 
            }
        });
    });

    sbuttons2.forEach(button => {
        button.addEventListener('click', function () {
            const query = button.innerText.trim(); 
            if (query) {
                searchWebsite(query); 
            }
        });
    });

    function searchWebsite(query) {
        hideAllContent();

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
                    label.appendChild(document.createTextNode(getTranslation('search_result_message'))); // E aqui

                    const wrapper = document.createElement('div');
                    wrapper.style.textAlign = 'center'; 
                    wrapper.appendChild(label); 

                    for (let i = 0; i < 6; i++) {
                        const brTag = document.createElement('br');
                        wrapper.appendChild(brTag); 
                    }

                    element.prepend(wrapper); 
                }
            }
        });

        const lang = getLanguage();
        const notFoundMessage = document.getElementById(`not-found-message-${lang}`);
        if(notFoundMessage){ 
            notFoundMessage.style.display = foundMatch ? 'none' : 'block';
        }
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

        const notFoundMessagePt = document.getElementById('not-found-message-pt');
        const notFoundMessageEn = document.getElementById('not-found-message-en');

        if (notFoundMessagePt) {
            notFoundMessagePt.style.display = 'none'; 
        }
        if (notFoundMessageEn) {
            notFoundMessageEn.style.display = 'none'; 
        }
    }

    function getLanguage() {
        return localStorage.getItem('selectedLanguage') || 'pt'; // Default to Portuguese
    }
});
