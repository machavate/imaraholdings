(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    document.addEventListener("DOMContentLoaded", function () {

    const chatbotToggle = document.getElementById("chatbotToggle");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotClose = document.getElementById("chatbotClose");

    const chatbotInput = document.getElementById("chatbotInput");
    const chatbotSend = document.getElementById("chatbotSend");
    const chatbotBody = document.getElementById("chatbotBody");


    /* ===============================
       OPEN CHATBOT
    =============================== */

    chatbotToggle.addEventListener("click", function () {

        chatbotWindow.classList.toggle("active");

        if (chatbotWindow.classList.contains("active")) {
            chatbotInput.focus();
        }

    });


    /* ===============================
       CLOSE CHATBOT
    =============================== */

    chatbotClose.addEventListener("click", function () {

        chatbotWindow.classList.remove("active");

    });


    /* ===============================
       SEND MESSAGE
    =============================== */

    function sendMessage() {

        const message = chatbotInput.value.trim();

        if (!message) return;


        /* User message */

        const userMessage = document.createElement("div");

        userMessage.className = "user-message";

        userMessage.textContent = message;

        chatbotBody.appendChild(userMessage);


        chatbotInput.value = "";


        chatbotBody.scrollTop = chatbotBody.scrollHeight;


        /* Bot response */

        setTimeout(function () {

            const botResponse = document.createElement("div");

            botResponse.className = "bot-response";

            botResponse.textContent = getBotResponse(message);

            chatbotBody.appendChild(botResponse);

            chatbotBody.scrollTop = chatbotBody.scrollHeight;

        }, 600);

    }


    /* ===============================
       SEND BUTTON
    =============================== */

    chatbotSend.addEventListener("click", sendMessage);


    /* ===============================
       ENTER KEY
    =============================== */

    chatbotInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    });


    /* ===============================
       BOT RESPONSES
    =============================== */

    function getBotResponse(message) {

        const text = message.toLowerCase();


        if (
            text.includes("service") ||
            text.includes("services")
        ) {

            return "Imara Holdings provides strategic procurement, mining support, construction and infrastructure support, corporate consulting, supply chain & logistics, and fuel supply solutions.";

        }


        if (
            text.includes("quotation") ||
            text.includes("quote") ||
            text.includes("orçamento")
        ) {

            return "We would be happy to assist with your quotation. Please contact our team through WhatsApp and share the details of your requirements.";

        }


        if (
            text.includes("fuel") ||
            text.includes("diesel") ||
            text.includes("petrol")
        ) {

            return "Imara Holdings provides fuel sourcing and supply solutions, including commercial and bulk fuel supply. Contact our team for your requirements.";

        }


        if (
            text.includes("contact") ||
            text.includes("team")
        ) {

            return "You can contact the Imara Holdings team directly through WhatsApp for faster assistance.";

        }


        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return "Hello! 👋 Welcome to Imara Holdings. How can we assist you today?";

        }


        return "Thank you for contacting Imara Holdings. For detailed assistance, please contact our team through WhatsApp.";

    }


    /* ===============================
       QUICK BUTTONS
    =============================== */

    window.sendBotMessage = function (message) {

        chatbotInput.value = message;

        sendMessage();

    };

});

    
})(jQuery);

