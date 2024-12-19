//CLICK OUT AND UNSELECT SUBTABS


document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('home-tab');
    var subTabsBox = document.getElementById('sub-tabs-box');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('portfolio-tab');
    var subTabsBox = document.getElementById('sub-tabs-box2');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var homeTab = document.getElementById('extras-tab');
    var subTabsBox = document.getElementById('sub-tabs-box3');

    function activateHomeTab() {
        homeTab.classList.add('active');
    }

    function deactivateHomeTab() {
        homeTab.classList.remove('active');
    }

    homeTab.addEventListener('click', function(event) {
        event.preventDefault();
        if (subTabsBox.style.display === 'block') {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        } else {
            subTabsBox.style.display = 'block';
            activateHomeTab();
        }
    });

    // Optional: Hide the sub-tabs box if clicked outside and deactivate Home tab
    document.addEventListener('click', function(event) {
        if (!subTabsBox.contains(event.target) && event.target !== homeTab) {
            subTabsBox.style.display = 'none';
            deactivateHomeTab();
        }
    });
});

