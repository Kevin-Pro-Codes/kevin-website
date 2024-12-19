//SAVING OF THE SELECTED STATE OF TABS


document.addEventListener('DOMContentLoaded', function() {
    // Function to remove active class from all sub-tabs
    function removeActiveFromAllSubTabs() {
        const allSubTabs = document.querySelectorAll('.subtab');
        allSubTabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    // Function to handle sub-tab click
    function handleSubTabClick(event) {
        event.preventDefault(); // Prevent default action (navigation)

        const clickedTab = event.currentTarget; // Get the current clicked sub-tab

        // Remove active class from all sub-tabs
        removeActiveFromAllSubTabs();

        // Add active class to the clicked sub-tab
        clickedTab.classList.add('active');

        // Optionally, save the last clicked sub-tab in local storage
        const subTabId = clickedTab.getAttribute('href');
        localStorage.setItem('lastClickedSubTab', subTabId);
    }

    // Add click event listener to each sub-tab link
    const subTabLinks = document.querySelectorAll('.subtab');
    subTabLinks.forEach(link => {
        link.addEventListener('click', handleSubTabClick);
    });

    // Load the last clicked sub-tab state on page load
    function loadSubTabState() {
        const savedId = localStorage.getItem('lastClickedSubTab');
        if (savedId) {
            const savedTab = document.querySelector(`a[href="${savedId}"]`);
            if (savedTab) {
                // Remove active class from all sub-tabs and add it to the saved tab
                removeActiveFromAllSubTabs();
                savedTab.classList.add('active');
            }
        }
    }

    // Call function to restore the saved state
    loadSubTabState();
});
