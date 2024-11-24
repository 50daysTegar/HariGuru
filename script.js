$(document).ready(function () {
    const messages = [
        "Terima kasih {title} {name} yang telah mendidik kami dengan penuh kesabaran 🙏",
        "Anda adalah inspirasi bagi kami semua ✨",
        "Selamat Hari Guru! 🎉",
        "Semoga {title} {name} selalu dalam lindungan-Nya 🤲",
        "Terima kasih atas dedikasi dan pengorbanan {title} {name} 💖"
    ];

    const emojis = ['👩‍🏫', '👨‍🏫', '🎉', '✨', '💖', '🙏', '📚', '🎨', '🌟'];

    function createFloatingEmoji() {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const $emoji = $('<div>').text(emoji).addClass('emoji-float');

        const startPos = Math.random() * $(window).width();

        $emoji.css({
            left: startPos,
            top: $(window).height()
        });

        $('body').append($emoji);

        $emoji.animate({
            top: -100,
            left: startPos + (Math.random() * 200 - 100)
        }, 7000, 'linear', function () {
            $(this).remove();
        });
    }

    setInterval(createFloatingEmoji, 2000);

    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.html(element.html() + text.charAt(i));
            setTimeout(() => typeWriter(element, text, i + 1), 50);
        } else {
            element.append('<br><br>');
        }
    }

    async function showMessages(title, name) {
        $('.typewriter').empty();

        for (let message of messages) {
            message = message.replace('{title}', title).replace('{name}', name);
            await new Promise(resolve => {
                typeWriter($('.typewriter'), message);
                setTimeout(resolve, message.length * 50 + 1000);
            });
        }
    }

    $('#teacherForm').on('submit', function (e) {
        e.preventDefault();

        const name = $('#teacherName').val();
        const title = $('#teacherTitle').val();

        if (name && title) {
            $('.welcome-page').fadeOut(1000, function () {
                $('.greeting-page').fadeIn(1000, function () {
                    showMessages(title, name);
                });
            });
        }
    });
});