(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW({ mobile: false }).init();


    // Sticky header shadow
    var $header = $('.site-header');
    function toggleHeader() {
        $header.toggleClass('scrolled', $(window).scrollTop() > 40);
    }
    $(window).on('scroll', toggleHeader);
    toggleHeader();


    // Highlight the nav link of the section in view
    var $navLinks = $('.navbar-nav .nav-link');
    var sections = $navLinks.map(function () {
        var target = $($(this).attr('href'));
        return target.length ? target[0] : null;
    }).get();

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $navLinks.removeClass('active');
                    $navLinks.filter('[href="#' + entry.target.id + '"]').addClass('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (section) { observer.observe(section); });
    }


    // Close the mobile menu after choosing a link
    $navLinks.add('.nav-cta').on('click', function () {
        var collapse = document.getElementById('navbarCollapse');
        if (collapse.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
    });


    // Contact form: open the visitor's email client with the message prefilled
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();

        var body = message + '\n\n--\n' + name + '\n' + email;

        window.location.href = 'mailto:comercial@imaraholdngs.com' +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);
    });


    // Current year in the footer
    $('#year').text(new Date().getFullYear());


    /* ===============================
       CHATBOT
    =============================== */

    var chatbotToggle = document.getElementById("chatbotToggle");
    var chatbotWindow = document.getElementById("chatbotWindow");
    var chatbotClose = document.getElementById("chatbotClose");

    var chatbotInput = document.getElementById("chatbotInput");
    var chatbotSend = document.getElementById("chatbotSend");
    var chatbotBody = document.getElementById("chatbotBody");

    chatbotToggle.addEventListener("click", function () {
        chatbotWindow.classList.toggle("active");

        if (chatbotWindow.classList.contains("active")) {
            chatbotInput.focus();
        }
    });

    chatbotClose.addEventListener("click", function () {
        chatbotWindow.classList.remove("active");
    });

    function sendMessage() {
        var message = chatbotInput.value.trim();

        if (!message) return;

        var userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = message;
        chatbotBody.appendChild(userMessage);

        chatbotInput.value = "";
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        setTimeout(function () {
            var botResponse = document.createElement("div");
            botResponse.className = "bot-response";
            botResponse.textContent = getBotResponse(message);
            chatbotBody.appendChild(botResponse);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 600);
    }

    chatbotSend.addEventListener("click", sendMessage);

    chatbotInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    var isPortuguese = document.documentElement.lang.indexOf('pt') === 0;

    var replies = {
        en: {
            services: "Imara Holdings provides strategic procurement, mining support, construction and infrastructure support, corporate consulting, supply chain & logistics, and fuel supply solutions.",
            quote: "We would be happy to assist with your quotation. Please email comercial@imaraholdngs.com or contact our team through WhatsApp with the details of your requirements.",
            fuel: "Imara Holdings provides fuel sourcing and supply solutions, including commercial and bulk fuel supply. Contact our team for your requirements.",
            contact: "You can reach the Imara Holdings team on +258 84 020 2005, by email at comercial@imaraholdngs.com, or through WhatsApp for faster assistance.",
            hello: "Hello! 👋 Welcome to Imara Holdings. How can we assist you today?",
            fallback: "Thank you for contacting Imara Holdings. For detailed assistance, please contact our team through WhatsApp."
        },
        pt: {
            services: "A Imara Holdings oferece procurement estratégico, apoio à mineração, apoio à construção e infra-estruturas, consultoria empresarial, cadeia de abastecimento e logística, e fornecimento de combustível.",
            quote: "Teremos todo o gosto em preparar a sua cotação. Envie os detalhes do que precisa para comercial@imaraholdngs.com ou fale com a nossa equipa pelo WhatsApp.",
            fuel: "A Imara Holdings oferece sourcing e fornecimento de combustível, incluindo combustível comercial e a granel. Contacte a nossa equipa com as suas necessidades.",
            contact: "Pode contactar a equipa da Imara Holdings pelo +258 84 020 2005, pelo email comercial@imaraholdngs.com, ou pelo WhatsApp para uma resposta mais rápida.",
            hello: "Olá! 👋 Bem-vindo à Imara Holdings. Como podemos ajudar hoje?",
            fallback: "Obrigado por contactar a Imara Holdings. Para uma assistência detalhada, fale com a nossa equipa pelo WhatsApp."
        }
    };

    function getBotResponse(message) {
        var text = message.toLowerCase();
        var r = isPortuguese ? replies.pt : replies.en;

        if (/servi[cç]/.test(text)) return r.services;
        if (/quot|quote|or[cç]amento|cota[cç]/.test(text)) return r.quote;
        if (/fuel|diesel|petrol|gas[oó]leo|gasolina|combust/.test(text)) return r.fuel;
        if (/contact|team|equipa|equipe/.test(text)) return r.contact;
        if (/(^|[^a-z])(hello|hi|hey|ol[aá]|bom dia|boa tarde|boa noite)(?![a-z])/.test(text)) return r.hello;

        return r.fallback;
    }

    window.sendBotMessage = function (message) {
        chatbotInput.value = message;
        sendMessage();
    };

})(jQuery);
