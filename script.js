document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.style.scrollBehavior = 'smooth';

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function () {
            const text = this.querySelector('span').textContent;
            if (text.includes('@') || text.includes('+')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalBg = this.style.background;
                    this.style.background = 'rgba(46, 204, 113, 0.3)';
                    setTimeout(() => {
                        this.style.background = originalBg;
                    }, 1000);
                });
            }
        });
    });

    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        setInterval(() => {
            profileImage.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                profileImage.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }

    const languageItems = document.querySelectorAll('.language-item');
    languageItems.forEach(item => {
        const level = item.querySelector('.level');
        const levelText = level.textContent.toLowerCase();

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: #ecf0f1;
            border-radius: 2px;
            margin-top: 8px;
            overflow: hidden;
        `;

        const progress = document.createElement('div');
        progress.style.cssText = `
            height: 100%;
            border-radius: 2px;
            transition: width 2s ease;
            width: 0;
        `;

        let width = '0%';
        let color = '#95a5a6';

        if (levelText.includes('fluent')) {
            width = '100%';
            color = '#27ae60';
        } else if (levelText.includes('intermediate')) {
            width = '70%';
            color = '#f39c12';
        } else if (levelText.includes('basic')) {
            width = '40%';
            color = '#95a5a6';
        }

        progress.style.background = color;
        progressBar.appendChild(progress);
        item.appendChild(progressBar);

        setTimeout(() => {
            progress.style.width = width;
        }, 1000);
    });

    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    printBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
    });

    printBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.3)';
    });

    printBtn.addEventListener('click', function () {
        window.print();
    });

    document.body.appendChild(printBtn);

    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
    downloadBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 180px;
        background: linear-gradient(135deg, #27ae60, #229954);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(39, 174, 96, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    downloadBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(39, 174, 96, 0.4)';
    });

    downloadBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(39, 174, 96, 0.3)';
    });

    downloadBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = './resume_oga.docx';
        link.download = 'resume_oga.docx'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    document.body.appendChild(downloadBtn);

    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        padding: 15px;
        border-radius: 50%;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 1000;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    let isDarkMode = false;

    themeBtn.addEventListener('click', function () {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    document.body.appendChild(themeBtn);
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(style);

createParticles();
