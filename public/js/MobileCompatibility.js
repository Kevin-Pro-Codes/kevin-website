//SET BROWSER TO WORK WITH ON MOBILE: CALL CSS chrome-mobile body {} FOR EXAMPLE

document.addEventListener('DOMContentLoaded', function() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
        if (userAgent.indexOf('pluma') > -1) {
            document.body.classList.add('pluma-mobile'); // Add class for Pluma
        }
        
        if (userAgent.indexOf('chrome') > -1) {
            document.body.classList.add('chrome-mobile');
        }
        
        if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
            document.body.classList.add('opera-mobile');
        }
        
        if (userAgent.indexOf('edg') > -1) {
            document.body.classList.add('edge-mobile');
        }
        
        if (userAgent.indexOf('firefox') > -1) {
            document.body.classList.add('firefox-mobile');
        }
    }
});

