document.addEventListener('DOMContentLoaded', () => {
    // Regex for email validation (contains domains)
    const validEmailRegex = /(aol\.com|att\.net|comcast\.net|facebook\.com|gmail\.com|gmx\.com|googlemail\.com|google\.com|hotmail\.com|hotmail\.co\.uk|mac\.com|me\.com|mail\.com|msn\.com|live\.com|sbcglobal\.net|verizon\.net|yahoo\.com|yahoo\.co\.uk|email\.com|fastmail\.fm|games\.com|gmx\.net|hush\.com|hushmail\.com|icloud\.com|iname\.com|inbox\.com|lavabit\.com|love\.com|outlook\.com|pobox\.com|protonmail\.ch|protonmail\.com|tutanota\.de|tutanota\.com|tutamail\.com|tuta\.io|keemail\.me|rocketmail\.com|safe\-mail\.net|wow\.com|ygm\.com|ymail\.com|zoho\.com|yandex\.com|bellsouth\.net|charter\.net|cox\.net|earthlink\.net|juno\.com|btinternet\.com|virginmedia\.com|blueyonder\.co\.uk|freeserve\.co\.uk|live\.co\.uk|ntlworld\.com|o2\.co\.uk|orange\.net|sky\.com|talktalk\.co\.uk|tiscali\.co\.uk|virgin\.net|wanadoo\.co\.uk|bt\.com|sina\.com|sina\.cn|qq\.com|naver\.com|hanmail\.net|daum\.net|nate\.com|yahoo\.co\.jp|yahoo\.co\.kr|yahoo\.co\.id|yahoo\.co\.in|yahoo\.com\.sg|yahoo\.com\.ph|163\.com|yeah\.net|126\.com|21cn\.com|aliyun\.com|foxmail\.com|hotmail\.fr|live\.fr|laposte\.net|yahoo\.fr|wanadoo\.fr|orange\.fr|gmx\.fr|sfr\.fr|neuf\.fr|free\.fr|gmx\.de|hotmail\.de|live\.de|online\.de|t\-online\.de|web\.de|yahoo\.de|libero\.it|virgilio\.it|hotmail\.it|aol\.it|tiscali\.it|alice\.it|live\.it|yahoo\.it|email\.it|tin\.it|poste\.it|teletu\.it|mail\.ru|rambler\.ru|yandex\.ru|ya\.ru|list\.ru|hotmail\.be|live\.be|skynet\.be|voo\.be|tvcablenet\.be|telenet\.be|hotmail\.com\.ar|live\.com\.ar|yahoo\.com\.ar|fibertel\.com\.ar|speedy\.com\.ar|arnet\.com\.ar|yahoo\.com\.mx|live\.com\.mx|hotmail\.es|hotmail\.com\.mx|prodigy\.net\.mx|yahoo\.ca|hotmail\.ca|bell\.net|shaw\.ca|sympatico\.ca|rogers\.com|yahoo\.com\.br|hotmail\.com\.br|outlook\.com\.br|uol\.com\.br|bol\.com\.br|terra\.com\.br|ig\.com\.br|itelefonica\.com\.br|r7\.com|zipmail\.com\.br|globo\.com|globomail\.com|oi\.com\.br)/;

    let emailTimestamps = JSON.parse(localStorage.getItem('emailTimestamps')) || []; // Load timestamps from localStorage
    let commentTimestamps = JSON.parse(localStorage.getItem('commentTimestamps')) || []; // Load timestamps from localStorage
    const cooldownTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    const timeWindow = 15 * 60 * 1000; // 15 minutes in milliseconds

    // Function to validate comment section
    function validateComment() {
        const commentText = document.querySelector('.comment-container').value.trim();
        const cmailContainer = document.querySelector('.cmail-container').value.trim();

        if (commentText !== '' && validEmailRegex.test(cmailContainer)) {
            const now = Date.now();
            commentTimestamps = commentTimestamps.filter(timestamp => now - timestamp <= timeWindow);

            if (commentTimestamps.length >= 3) {
                const timeLeft = Math.max(0, cooldownTime - (now - commentTimestamps[0]));
                alert(`Você enviou 3 comentários recentemente. Por favor, aguarde ${Math.ceil(timeLeft / 60000)} minutos antes de enviar mais comentários.`);
            } else {
                // Add current timestamp to the list and allow comment submission
                commentTimestamps.push(now);
                localStorage.setItem('commentTimestamps', JSON.stringify(commentTimestamps)); // Save to localStorage
                alert('Seu comentário foi enviado!');
            }
        } else {
            alert('Erro! Comentário ou e-mail inválido!');
        }
    }

    // Function to validate email subscription
    function validateSubscription() {
        const emailContainer = document.querySelector('.email-container').value.trim();

        if (validEmailRegex.test(emailContainer)) {
            // Check the number of emails sent in the past 15 minutes
            const now = Date.now();
            emailTimestamps = emailTimestamps.filter(timestamp => now - timestamp <= timeWindow);

            if (emailTimestamps.length >= 3) {
                const timeLeft = Math.max(0, cooldownTime - (now - emailTimestamps[0]));
                alert(`Você se inscreveu 3 vezes recentemente. Por favor, aguarde ${Math.ceil(timeLeft / 60000)} minutos antes de enviar mais e-mails.`);
            } else {
                // Add current timestamp to the list and allow email sending
                emailTimestamps.push(now);
                localStorage.setItem('emailTimestamps', JSON.stringify(emailTimestamps)); // Save to localStorage
                alert('Inscrição de e-mail bem-sucedida!');
            }
        } else {
            alert('Erro! Endereço de e-mail inválido!');
        }
    }

    // Event listeners for buttons
    document.querySelector('.comment-send').addEventListener('click', validateComment);
    document.querySelector('.email-sub').addEventListener('click', validateSubscription);
});
