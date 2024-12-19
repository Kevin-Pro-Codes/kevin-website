document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email-container');
    const suggestionsContainer = document.getElementById('suggestions');

    const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com", "icloud.com"];

    emailInput.addEventListener('input', function () {
        const value = emailInput.value;
        const atPosition = value.indexOf('@');

        if (atPosition > -1) {
            const query = value.slice(atPosition + 1);
            const matchingDomains = commonDomains.filter(domain => domain.startsWith(query));

            suggestionsContainer.innerHTML = '';
            if (matchingDomains.length > 0 && query.length > 0) {
                matchingDomains.forEach(domain => {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = value.slice(0, atPosition + 1) + domain;
                    suggestion.addEventListener('click', function () {
                        emailInput.value = suggestion.textContent;
                        suggestionsContainer.innerHTML = '';
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.autocomplete')) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
