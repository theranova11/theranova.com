// Toggle Btn to open Navbar List
document.querySelector('.toggle-btn').addEventListener('click', function() {
    const navBarList = document.getElementById('nav-bar-list');
    const toggleBtn = this;

    toggleBtn.classList.toggle('change');
    navBarList.classList.toggle('open');
});

document.querySelectorAll('#nav-bar-list a').forEach(link => {
    link.addEventListener('click', function() {
        const navBarList = document.getElementById('nav-bar-list');
        const toggleBtn = document.querySelector('.toggle-btn');

        navBarList.classList.remove('open');
        toggleBtn.classList.remove('change');
    });
});

// Handle navbar links activation
function handleLinkClick(event) {
    event.stopPropagation();

    document.querySelectorAll('#nav-bar-list a').forEach(link => {
        link.classList.remove('active');
    });

    this.classList.add('active');
}

document.querySelectorAll('#nav-bar-list a').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

document.addEventListener('click', function() {
    document.querySelectorAll('#nav-bar-list a').forEach(link => {
        link.classList.remove('active');
    });
});

document.querySelector('#nav-bar-list').addEventListener('click', function(event) {
    event.stopPropagation();
});


// Semi-transparent Navbar Background when Scrolling
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");

    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.innerWidth <= 768) {
        navbar.classList.remove("scrolled")
    }
});


//Scroll trigger
document.addEventListener("DOMContentLoaded", function() {
    new WOW({
        offset: 290
    }).init();

    function replaceClassByValue(element, oldClassName, newClassName) {
        if (element.classList.contains(oldClassName)) {
            element.classList.remove(oldClassName);   // Remove the old class
            element.classList.add(newClassName);      // Add the new class
        }
    }

    if (window.innerWidth <= 768) {
      document.querySelectorAll('#services').forEach(function(element) {
        element.setAttribute('data-wow-delay', '0.5s');
      });

      document.querySelectorAll('.card').forEach(function(element) {
        element.setAttribute('data-wow-delay', '0.7s');
      });

      document.querySelectorAll('#about').forEach(function(element) {
        element.setAttribute('data-wow-delay', '0.9s');
      });

      document.querySelectorAll('.about-text').forEach(function(element) {
        element.setAttribute('data-wow-delay', '1.1s');
        replaceClassByValue(element, 'bounceInRight', 'fadeInUpBig');
      });

      document.querySelectorAll('.about-img').forEach(function(element) {
        element.setAttribute('data-wow-delay', '1.1s');
        replaceClassByValue(element, 'bounceInLeft', 'fadeInUpBig');
      });

      document.querySelectorAll('#team').forEach(function(element) {
        element.setAttribute('data-wow-delay', '1.3s');
        replaceClassByValue(element, 'bounceInLeft', 'fadeInUpBig');
      });

      document.querySelectorAll('.slider').forEach(function(element) {
        element.setAttribute('data-wow-delay', '1.5s');
        replaceClassByValue(element, 'bounceInLeft', 'fadeInUpBig');
      });

      document.querySelectorAll('#contact').forEach(function(element) {
        element.setAttribute('data-wow-delay', '1.7s');
        replaceClassByValue(element, 'bounceInRight', 'fadeInUp');
      });

      new WOW({
        offset: 100
      }).init();
    }
  });
  
// Send the form data to the email by EmailJS
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("wwqCehTmV38NbWc5E");

    const contactForm = document.getElementById("contact-form");

    // Check if the form has been submitted before
    if (localStorage.getItem("formSubmitted")) {
        contactForm.innerHTML = "<p style='color: #dbf8ff; font-weight: bold; font-style: italic; text-shadow: 2px 2px 0 #056060; padding: 2rem;'>لقد قمت بإرسال نموذج بالفعل. <i class='fa fa-check' style='font-size:25px'></i></p>";
        return;
    }

    // Form validation function
    function validateForm() {
        const firstName = document.getElementById("first-name").value.trim();
        const familyName = document.getElementById("family-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trimStart().trimEnd();

        let isValid = true;
        let errorMessage = "";
        const emailPattern = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

        if (!firstName && !familyName && !email && !message) {
            errorMessage = "يرجى ملء جميع الحقول!";
            isValid = false;
        } else if (firstName === "") {
            errorMessage = "يرجى إدخال الاسم الأول!";
            isValid = false;
        } else if (familyName === "") {
            errorMessage = "يرجى إدخال الاسم الأخير!";
            isValid = false;
        } else if (email === "") {
            errorMessage = "يرجى إدخال البريد الإلكتروني!";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            errorMessage = "يرجى إدخال بريد إلكتروني صحيح!";
            isValid = false;
        } else if (message === "") {
            errorMessage = "يرجى إدخال رسالة.";
            isValid = false;
        } else if (message.length < 10 || message.length > 1000) {
            errorMessage = "يرجى كتابة رسالة بين 10 و 1000 حرف!"
            isValid = false;
        } else {
            errorMessage = "يوجد خطأ ما حاول مرة أخرى!"
        }

        if (!isValid) {
            alert(errorMessage);
        }

        return isValid;
    }

    // Handle form submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (validateForm()) {
            const firstName = document.getElementById("first-name").value;
            const familyName = document.getElementById("family-name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            emailjs.send("service_gy6jbeu", "template_ip9vgo4", {
                firstName: firstName,
                familyName: familyName,
                email: email,
                message: message
            }).then(function(response) {
                localStorage.setItem("formSubmitted", "true");

                alert("تم إرسال رسالتك بنجاح!", response.status, response.text);

                contactForm.innerHTML = "<p style='color: #dbf8ff; font-weight: bold; font-style: italic; text-shadow: 2px 2px 0 #056060; padding: 2rem;'>شكراً لتواصلكم معنا. لقد تم إرسال رسالتك بنجاح. <i class='fa fa-check' style='font-size:25px'></i></p>";

            }, function(error) {
                alert("فشل في إرسال الرسالة، حاول مرة أخرى.");
            });
        }
    });
});



// Back To Top Button
let backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}