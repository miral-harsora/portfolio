//
const sections = document.querySelectorAll('.slide-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function () {

    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;
    const navHeight = document.querySelector('#nav-div').getBoundingClientRect().height
    console.log(windowHeight);

    console.log(navHeight)
    const carousel = document.querySelector("#carouselExampleAutoplaying")
    carousel.style.marginTop = navHeight + "px";
  

    $("#contact-btn").click(function () {
        $('html,body').animate({
            scrollTop: $("#contact-section").offset().top
        },
            800);
    });

    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && result.success !== false) {
            contactForm.reset();
            formStatus.classList.add('success');
            formStatus.textContent = 'Message sent successfully!';
        } else {
            throw new Error(result.message || 'Unable to send your message.');
        }
        } catch (error) {
        formStatus.classList.add('error');
        formStatus.textContent = error.message || 'Something went wrong. Please try again.';
        } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
        }
    });
   
    $(".nav-link").bind("click", function (event) {
        event.preventDefault();
        var clickedItem = $(this);
        $(" .nav-link").each(function () {
            $(this).removeClass("active");
        });
        clickedItem.addClass("active");
        var offset = 80;
        switch (this.text) {
            case "About":
                $('html,body').animate({
                    scrollTop: $("#about-section").offset().top - offset
                },
                    800);
                break;
            case "Skills":
                $('html,body').animate({
                    scrollTop: $("#skills-section").offset().top - offset
                },
                    800);
                break;
            case "Projects":
                $('html,body').animate({
                    scrollTop: $("#projects-section").offset().top - offset
                },
                    800);
                break;
            case "Contact":
                $('html,body').animate({
                    scrollTop: $("#contact-section").offset().top - offset
                },
                    800);
                break;
            default:
                $('html,body').animate({
                    scrollTop: $("header").offset().top - offset
                },
                    800);
                break

        }
    });
});
