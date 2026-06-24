// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch profile data
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const profile = data.data;
            document.getElementById('profileName').textContent = profile.name || 'Welcome to My Portfolio';
            document.getElementById('profileBio').textContent = profile.bio || 'Full-Stack Developer';
            document.getElementById('profileLocation').textContent = profile.location || '';
            document.getElementById('contactEmailValue').textContent = profile.email || '';
            document.getElementById('contactPhoneValue').textContent = profile.phone || 'Not provided';
            document.getElementById('contactLocationValue').textContent = profile.location || 'Not provided';
            
            // Social links
            if (profile.socialLinks) {
                if (profile.socialLinks.github) {
                    document.getElementById('githubLink').href = profile.socialLinks.github;
                }
                if (profile.socialLinks.linkedin) {
                    document.getElementById('linkedinLink').href = profile.socialLinks.linkedin;
                }
                if (profile.socialLinks.twitter) {
                    document.getElementById('twitterLink').href = profile.socialLinks.twitter;
                }
            }
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Fetch and display projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const projectsContainer = document.getElementById('projectsContainer');
            projectsContainer.innerHTML = '';
            
            data.data.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <div class="project-image">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '📱'}
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank">Live Demo</a>` : ''}
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank">GitHub</a>` : ''}
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Fetch and display skills
async function loadSkills() {
    try {
        const response = await fetch(`${API_BASE_URL}/skills`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const skillsContainer = document.getElementById('skillsContainer');
            skillsContainer.innerHTML = '';
            
            // Group skills by category
            const skillsByCategory = {};
            data.data.forEach(skill => {
                if (!skillsByCategory[skill.category]) {
                    skillsByCategory[skill.category] = [];
                }
                skillsByCategory[skill.category].push(skill);
            });
            
            // Display each category
            Object.entries(skillsByCategory).forEach(([category, skills]) => {
                skills.forEach(skill => {
                    const skillCard = document.createElement('div');
                    skillCard.className = 'skill-card';
                    skillCard.innerHTML = `
                        <h3>${skill.name}</h3>
                        <span class="skill-category">${skill.category}</span>
                        <div class="skill-proficiency">
                            <div class="proficiency-label">
                                <span>Proficiency</span>
                                <span>${skill.proficiency}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${skill.proficiency}%"></div>
                            </div>
                            <small style="color: var(--text-light);">${skill.yearsOfExperience} year(s) experience</small>
                        </div>
                    `;
                    skillsContainer.appendChild(skillCard);
                });
            });
        }
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        phone: document.getElementById('phone')?.value || ''
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Message sent successfully! Thank you for contacting me.');
            document.getElementById('contactForm').reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadProjects();
    loadSkills();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
