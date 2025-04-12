// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const contentDisplay = document.getElementById('content-display');
const contentTitle = document.getElementById('content-title');
const contentText = document.getElementById('content-text');
const closeContent = document.getElementById('close-content');
const loginBtn = document.getElementById('login-btn');
const getStartedBtn = document.getElementById('get-started-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');
const startPackingBtn = document.getElementById('start-packing-btn');
const footerContentDisplay = document.getElementById('footer-content-display');
const footerContentText = document.getElementById('footer-content-text');
const closeFooterContent = document.getElementById('close-footer-content');
const requestDemoBtn = document.getElementById('request-demo-btn');

// Content information
const contentInfo = {
  'how-it-works': {
    title: "How It Works",
    description: "Create lists, invite members, assign tasks, and track progress together.",
  },
  'pricing': {
    title: "Pricing Plans",
    description: "Free: 1 trip, Basic: $4.99/month, Premium: $9.99/month, Team: $19.99/month.",
  },
  'about': {
    title: "About PackPal",
    description: "Founded in 2024, we help over 10,000 travelers coordinate their group trips.",
  }
};

// Social media info
const socialInfo = {
  "Instagram": "Follow us @PackPal_App for travel tips and user stories.",
  "Twitter": "Join the conversation @PackPal for travel hacks and updates.",
  "Facebook": "Like our Facebook page for exclusive promotions and community events.",
  "GitHub": "Check our open source components and contribute to our ecosystem."
};

// Link content
const linkContent = {
  "Pricing": "Free: 1 trip (up to 5 members), Basic: $4.99/month (unlimited trips, up to 10 members), Premium: $9.99/month (unlimited trips, up to 25 members), Team: $19.99/month (unlimited everything)",
  "Support": "Email: help@packpal.app, Phone: +1 (555) 123-4567, Hours: 24/7 for Premium users, 9-5 EST for others",
  "Blog": "Latest articles: 'Top 10 Packing Hacks', 'Group Travel Coordination Tips', 'Best Travel Apps 2025'",
  "Privacy Policy": "We collect minimal data required for app functionality. Your data is never sold to third parties.",
  "Terms of Service": "By using PackPal you agree to our service terms. See full details in Account Settings."
};

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    menuIcon.className = mobileMenu.style.display === 'block' ? 'fas fa-times' : 'fas fa-bars';
  });
}

// Show content function
function showContent(key) {
  if (contentInfo[key]) {
    contentTitle.textContent = contentInfo[key].title;
    contentText.textContent = contentInfo[key].description;
    contentDisplay.style.display = 'block';
  }
}

// Close content
if (closeContent) {
  closeContent.addEventListener('click', () => {
    contentDisplay.style.display = 'none';
  });
}

// Close footer content
if (closeFooterContent) {
  closeFooterContent.addEventListener('click', () => {
    footerContentDisplay.style.display = 'none';
  });
}

// Nav link click handlers
document.querySelectorAll('[data-content]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const contentKey = link.getAttribute('data-content');
    showContent(contentKey);
    if (mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
      menuIcon.className = 'fas fa-bars';
    }
  });
});

// Social link click handlers
document.querySelectorAll('[data-platform]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = link.getAttribute('data-platform');
    footerContentText.textContent = `${platform}: ${socialInfo[platform]}`;
    footerContentDisplay.style.display = 'block';
  });
});

// Footer link click handlers
document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const linkName = link.getAttribute('data-link');
    footerContentText.textContent = `${linkName}: ${linkContent[linkName]}`;
    footerContentDisplay.style.display = 'block';
  });
});

// Request demo button
if (requestDemoBtn) {
  requestDemoBtn.addEventListener('click', () => {
    footerContentText.textContent = "Demo Request: Schedule your demo: Available Mon-Fri 9AM-5PM EST. Average demo time: 20 minutes.";
    footerContentDisplay.style.display = 'block';
  });
}

// Scroll to login section
function scrollToLogin() {
  const loginSection = document.getElementById('login-section');
  if (loginSection) {
    loginSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Scroll to features section
function scrollToFeatures() {
  const featuresSection = document.getElementById('features-section');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Button click handlers
if (loginBtn) loginBtn.addEventListener('click', scrollToLogin);
if (getStartedBtn) getStartedBtn.addEventListener('click', scrollToLogin);
if (learnMoreBtn) learnMoreBtn.addEventListener('click', scrollToFeatures);
if (startPackingBtn) startPackingBtn.addEventListener('click', scrollToLogin);

// Scroll animation for elements
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  const items = document.querySelectorAll('.scroll-trigger-item');
  items.forEach((item) => observer.observe(item));
});
