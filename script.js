document.addEventListener('DOMContentLoaded', () => {

    // Update this mockProjects array with your actual project details and image file paths
    const mockProjects = [
        {
            image_url: "barberqueue.png", // Replace with your image file path
            name: "Full-Stack Web App",
            description: "A comprehensive project showcasing skills in Python/Django backend and a modern JavaScript frontend.",
            link: "#"
        },
        {
            image_url: "yisakor2.png", // Replace with your image file path
            name: "Graphics Design Collection",
            description: "A curated gallery of my best graphic design work, including logos, branding, and digital art.",
            link: "#"
        },
        {
            image_url: "live.jpg", // Replace with your image file path
            name: "Live Session Site",
            description: "A platform built for hosting and managing live streaming sessions, demonstrating media handling skills.",
            link: "https://t.me/yisakor_design"
        }
    ];

    const mockCertificates = [
        {
            image_url: "web.jpg",
            name: "Web Development Course",
            issuer: "Coursera",
            link: "https://via.placeholder.com/1200x800"
        },
        {
            image_url: "python.jpg",
            name: "Python for Beginners",
            issuer: "Udemy",
            link: "https://via.placeholder.com/1200x800"
        },
        {
            image_url: "graphic.jpg",
            name: "Graphic Design Fundamentals",
            issuer: "Google",
            link: "https://via.placeholder.com/1200x800"
        }
    ];

    function loadContent() {
        // Load Projects
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = '';
        mockProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <img src="${project.image_url}" alt="${project.name}">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="project-link">View Project</a>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });

        // Load Certificates
        const certificatesGrid = document.querySelector('.certificates-grid');
        certificatesGrid.innerHTML = '';
        mockCertificates.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card';
            certCard.innerHTML = `
                <a href="${cert.link}" target="_blank">
                    <img src="${cert.image_url}" alt="${cert.name}">
                </a>
                <h3>${cert.name}</h3>
                <p>Issued by ${cert.issuer}</p>
            `;
            certificatesGrid.appendChild(certCard);
        });
    }

    loadContent();

    // Get the modal, image, and close button elements
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const profilePic = document.querySelector(".profile-picture");
    const closeBtn = document.querySelector(".close-button");

    // When the user clicks the profile picture, open the modal
    profilePic.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = profilePic.getAttribute('data-src');
    });

    // When the user clicks on the close button (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Work Experience Animation
    const workExperienceSection = document.querySelector('#work-experience');
    const timelineItems = document.querySelectorAll('.timeline-item');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    function animateTimelineItems() {
        if (isElementInViewport(workExperienceSection)) {
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animated');
                }, index * 200); // Staggered delay for each item
            });
            // Remove the scroll event listener once animation is triggered
            window.removeEventListener('scroll', animateTimelineItems);
        }
    }

    // Check on scroll and initially
    window.addEventListener('scroll', animateTimelineItems);
    animateTimelineItems();

    // NEW: Chatbot Functionality
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    // Handle user input
    function sendMessage() {
        const userInput = chatbotInput.value.trim().toLowerCase();
        if (!userInput) return;

        // Add user message to chat
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = userInput;
        chatbotMessages.appendChild(userMessage);

        // Generate bot response
        let botResponse = "Sorry, I didn't understand that. Try typing 'about' or 'contact' for more info!";
        if (userInput.includes('about')) {
            botResponse = "Yisakor Markos is a third-year IT student at Wolaitta Sodo University, passionate about web development and graphic design. Check out the <a href='#about'>About</a> section for more details!";
        } else if (userInput.includes('contact')) {
            botResponse = "You can reach Yisakor at <a href='mailto:happymark13345@gmail.com'>happymark13345@gmail.com</a> or call +251 968787561. Visit the <a href='#contact'>Contact</a> section for social media links!";
        } else if (userInput.includes('hi') || userInput.includes('hello')) {
            botResponse = "Hey there! I'm here to guide you. Want to know about Yisakor? Type 'about'. Need to get in touch? Type 'contact'.";
        }

        // Add bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.innerHTML = botResponse;
            chatbotMessages.appendChild(botMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to bottom
        }, 500);

        // Clear input
        chatbotInput.value = '';
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});