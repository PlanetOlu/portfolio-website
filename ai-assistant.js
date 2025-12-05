// AI Assistant Interactive Avatar
class AIAssistant {
  constructor() {
    this.assistant = document.querySelector('.ai-assistant');
    this.avatar = document.querySelector('.ai-avatar');
    this.message = document.querySelector('.ai-message');
    this.actions = document.querySelectorAll('.ai-action');
    this.isVisible = false;
    this.idleTimer = null;
    this.interactionTimer = null;
    this.hints = [
      "Check out my front-end projects for web development examples!",
      "Explore my graphic design work for creative visuals.",
      "Read my technical writing about Web3 and blockchain.",
      "Looking for my copywriting samples? Filter by category!",
      "Visit the About page to learn my transition story.",
      "Need to contact me? Check the Contact page.",
      "I'm currently learning fullstack development and MarTech!"
    ];
    
    this.init();
  }
  
  init() {
    // Add event listeners
    this.avatar.addEventListener('click', () => this.toggleMessage());
    this.actions.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAction(e));
    });
    
    // Mouse following effect
    document.addEventListener('mousemove', (e) => this.followMouse(e));
    
    // Hide/show on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll + 50) {
        this.assistant.style.transform = 'translateY(100px)';
        this.assistant.style.opacity = '0';
      } else if (currentScroll < lastScroll - 10) {
        this.assistant.style.transform = 'translateY(0)';
        this.assistant.style.opacity = '1';
      }
      lastScroll = currentScroll;
    });
    
    // Idle hints
    this.startIdleTimer();
    document.addEventListener('mousemove', () => this.resetIdleTimer());
    document.addEventListener('click', () => this.resetIdleTimer());
    document.addEventListener('keypress', () => this.resetIdleTimer());
    
    // Random movement when idle
    this.startRandomMovement();
  }
  
  toggleMessage() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.message.classList.add('show');
      this.changeHint();
      clearTimeout(this.interactionTimer);
      this.interactionTimer = setTimeout(() => {
        this.message.classList.remove('show');
        this.isVisible = false;
      }, 10000); // Auto-hide after 10 seconds
    } else {
      this.message.classList.remove('show');
    }
  }
  
  changeHint() {
    const hintText = this.message.querySelector('p');
    const randomHint = this.hints[Math.floor(Math.random() * this.hints.length)];
    hintText.textContent = randomHint;
  }
  
  handleAction(e) {
    const action = e.target.dataset.action;
    
    switch(action) {
      case 'frontend':
        // Filter to frontend projects
        const frontendBtn = document.querySelector('.filter-btn[data-filter="frontend"]');
        if (frontendBtn) frontendBtn.click();
        this.message.classList.remove('show');
        this.isVisible = false;
        break;
        
      case 'about':
        // Navigate to about page
        window.location.href = 'about.html';
        break;
        
      case 'close':
        this.message.classList.remove('show');
        this.isVisible = false;
        break;
    }
  }
  
  followMouse(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Subtle eye movement
    const eyes = document.querySelectorAll('.ai-eye');
    const eyeMovement = 2;
    
    eyes.forEach(eye => {
      eye.style.transform = `translate(${(x - 0.5) * eyeMovement}px, ${(y - 0.5) * eyeMovement}px)`;
    });
    
    // Slight avatar movement
    const moveX = (x - 0.5) * 10;
    const moveY = (y - 0.5) * 10;
    this.avatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
  
  startIdleTimer() {
    this.idleTimer = setTimeout(() => {
      if (!this.isVisible) {
        this.message.classList.add('show');
        this.isVisible = true;
        this.changeHint();
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
          this.message.classList.remove('show');
          this.isVisible = false;
        }, 8000);
      }
      this.startIdleTimer(); // Restart timer
    }, 30000); // Show hint after 30 seconds of inactivity
  }
  
  resetIdleTimer() {
    clearTimeout(this.idleTimer);
    this.startIdleTimer();
  }
  
  startRandomMovement() {
    setInterval(() => {
      if (!this.isVisible) {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        
        this.avatar.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Reset after 2 seconds
        setTimeout(() => {
          this.avatar.style.transform = 'translate(0, 0)';
        }, 2000);
      }
    }, 15000); // Every 15 seconds
  }
}

// Initialize AI Assistant when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.ai-assistant')) {
    new AIAssistant();
  }
});