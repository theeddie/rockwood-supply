// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Build email body
    const emailBody = `
New Quote Request from RockWood Supply Website

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Delivery Address: ${data.address || 'N/A'}
Product: ${data.product}
Service Type: ${data.service}

Additional Details:
${data.message || 'None'}

---
Sent from rockwoodsupply.com
    `.trim();

    // Use FormSubmit.co to send email (free, no backend needed)
    try {
        const response = await fetch('https://formsubmit.co/ajax/firewood@mailtoyou.org', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: emailBody,
                _subject: `New Quote Request from ${data.name}`,
                _captcha: 'false'
            })
        });

        if (response.ok) {
            alert('Thank you for your request! We will contact you shortly at ' + data.phone);
            this.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        // Fallback: open email client
        const mailtoLink = `mailto:firewood@mailtoyou.org?subject=Quote Request from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    }
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
