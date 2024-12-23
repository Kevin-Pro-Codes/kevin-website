document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            commentLimit: 'You have submitted 3 comments recently. Please wait for {minutes} minutes before submitting more comments.',
            commentSuccess: 'Your comment has been submitted!',
            commentError: 'Error! Invalid comment or email!',
            subscriptionLimit: 'You have subscribed 3 times recently. Please wait for {minutes} minutes before subscribing again.',
            subscriptionSuccess: 'Email subscription successful!',
            subscriptionError: 'Error! Invalid email address!'
        },
        pt: {
            commentLimit: 'Você enviou 3 comentários recentemente. Por favor, aguarde {minutes} minutos antes de enviar mais comentários.',
            commentSuccess: 'Seu comentário foi enviado!',
            commentError: 'Erro! Comentário ou e-mail inválido!',
            subscriptionLimit: 'Você se inscreveu 3 vezes recentemente. Por favor, aguarde {minutes} minutos antes de enviar mais e-mails.',
            subscriptionSuccess: 'Inscrição de e-mail bem-sucedida!',
            subscriptionError: 'Erro! Endereço de e-mail inválido!'
        }
    };

    function getTranslation(key, params = {}) {
        const lang = localStorage.getItem('selectedLanguage') || 'pt'; 
        let translation = translations[lang]?.[key] || key; 
        Object.entries(params).forEach(([param, value]) => { 
            translation = translation.replace(`{${param}}`, value);
        });
        return translation;
    }

    const validEmailRegex = /(aol\.com|att\.net|comcast\.net|facebook\.com|gmail\.com|gmx\.com|googlemail\.com|google\.com|hotmail\.com|hotmail\.co\.uk|mac\.com|me\.com|mail\.com|msn\.com|live\.com|sbcglobal\.net|verizon\.net|yahoo\.com|yahoo\.co\.uk|email\.com|fastmail\.fm|games\.com|gmx\.net|hush\.com|hushmail\.com|icloud\.com|iname\.com|inbox\.com|lavabit\.com|love\.com|outlook\.com|pobox\.com|protonmail\.ch|protonmail\.com|tutanota\.de|tutanota\.com|tutamail\.com|tuta\.io|keemail\.me|rocketmail\.com|safe\-mail\.net|wow\.com|ygm\.com|ymail\.com|zoho\.com|yandex\.com|bellsouth\.net|charter\.net|cox\.net|earthlink\.net|juno\.com|btinternet\.com|virginmedia\.com|blueyonder\.co\.uk|freeserve\.co\.uk|live\.co\.uk|ntlworld\.com|o2\.co\.uk|orange\.net|sky\.com|talktalk\.co\.uk|tiscali\.co\.uk|virgin\.net|wanadoo\.co\.uk|bt\.com|sina\.com|sina\.cn|qq\.com|naver\.com|hanmail\.net|daum\.net|nate\.com|yahoo\.co\.jp|yahoo\.co\.kr|yahoo\.co\.id|yahoo\.co\.in|yahoo\.com\.sg|yahoo\.com\.ph|163\.com|yeah\.net|126\.com|21cn\.com|aliyun\.com|foxmail\.com|hotmail\.fr|live\.fr|laposte\.net|yahoo\.fr|wanadoo\.fr|orange\.fr|gmx\.fr|sfr\.fr|neuf\.fr|free\.fr|gmx\.de|hotmail\.de|live\.de|online\.de|t\-online\.de|web\.de|yahoo\.de|libero\.it|virgilio\.it|hotmail\.it|aol\.it|tiscali\.it|alice\.it|live\.it|yahoo\.it|email\.it|tin\.it|poste\.it|teletu\.it|mail\.ru|rambler\.ru|yandex\.ru|ya\.ru|list\.ru|hotmail\.be|live\.be|skynet\.be|voo\.be|tvcablenet\.be|telenet\.be|hotmail\.com\.ar|live\.com\.ar|yahoo\.com\.ar|fibertel\.com\.ar|speedy\.com\.ar|arnet\.com\.ar|yahoo\.com\.mx|live\.com\.mx|hotmail\.es|hotmail\.com\.mx|prodigy\.net\.mx|yahoo\.ca|hotmail\.ca|bell\.net|shaw\.ca|sympatico\.ca|rogers\.com|yahoo\.com\.br|hotmail\.com\.br|outlook\.com\.br|uol\.com\.br|bol\.com\.br|terra\.com\.br|ig\.com\.br|itelefonica\.com\.br|r7\.com|zipmail\.com\.br|globo\.com|globomail\.com|oi\.com\.br)/;

    let emailTimestamps = JSON.parse(localStorage.getItem('emailTimestamps')) || []; 
    let commentTimestamps = JSON.parse(localStorage.getItem('commentTimestamps')) || []; 
    const cooldownTime = 30 * 60 * 1000; 
    const timeWindow = 15 * 60 * 1000; 

    function validateComment() {
        const commentText = document.querySelector('.comment-container').value.trim();
        const cmailContainer = document.querySelector('.cmail-container').value.trim();

        if (commentText !== '' && validEmailRegex.test(cmailContainer)) {
            const now = Date.now();
            commentTimestamps = commentTimestamps.filter(timestamp => now - timestamp <= timeWindow);

            if (commentTimestamps.length >= 3) {
                const timeLeft = Math.max(0, cooldownTime - (now - commentTimestamps[0]));
                alert(getTranslation('commentLimit', { minutes: Math.ceil(timeLeft / 60000) }));
            } else {
                commentTimestamps.push(now);
                localStorage.setItem('commentTimestamps', JSON.stringify(commentTimestamps)); 
                alert(getTranslation('commentSuccess'));
            }
        } else {
            alert(getTranslation('commentError'));
        }
    }

    function validateSubscription() {
        const emailContainer = document.querySelector('.email-container').value.trim();

        if (validEmailRegex.test(emailContainer)) {
            const now = Date.now();
            emailTimestamps = emailTimestamps.filter(timestamp => now - timestamp <= timeWindow);

            if (emailTimestamps.length >= 3) {
                const timeLeft = Math.max(0, cooldownTime - (now - emailTimestamps[0]));
                alert(getTranslation('subscriptionLimit', { minutes: Math.ceil(timeLeft / 60000) }));
            } else {
                emailTimestamps.push(now);
                localStorage.setItem('emailTimestamps', JSON.stringify(emailTimestamps)); 
                alert(getTranslation('subscriptionSuccess'));
            }
        } else {
            alert(getTranslation('subscriptionError'));
        }
    }

    document.querySelector('.comment-send').addEventListener('click', validateComment);
    document.querySelector('.email-sub').addEventListener('click', validateSubscription);
});
