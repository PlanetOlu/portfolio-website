document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Update aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change icon
            mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.textContent = '☰';
                }
            }
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.textContent = '☰';
            }
        });
    });
    
   // Update the project filtering section in script.js

// Project Filtering (Enhanced)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-grid .project-card');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.dataset.filter;
      
      // Animate cards out
      projectCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
      });
      
      // After a short delay, show/hide cards
      setTimeout(() => {
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      }, 300);
      
      // Update URL without page reload
      const url = new URL(window.location);
      if (filter === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', filter);
      }
      window.history.pushState({}, '', url);
      
      // Scroll to top of projects
      document.querySelector('.projects-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Initial filter from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const initialButton = document.querySelector(`.filter-btn[data-filter="${categoryParam}"]`);
    if (initialButton) {
      initialButton.click();
    }
  } else {
    // Set 'All' as active by default
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
      allButton.classList.add('active');
    }
  }
}

// Add card hover effects
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Add staggered animation on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 500);
});
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        mobileMenuToggle.textContent = '☰';
                    }
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add subtle animations to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.highlight-card, .project-card, .skill-category').forEach(card => {
        observer.observe(card);
    });
});