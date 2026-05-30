// DOM Elements
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const classTrigger = document.getElementById('classTrigger');
const classSubmenu = document.getElementById('classSubmenu');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const searchBtn = document.getElementById('searchBtn');
const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const searchPanel = document.getElementById('searchResultsPanel');
const searchContent = document.getElementById('searchResultsContent');
const closeSearch = document.getElementById('closeSearchResults');

// Helper: Show section by ID
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    const activeSection = document.getElementById(`${sectionId}-section`);
    if (activeSection) activeSection.classList.add('active-section');

    // Update active nav link style
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    // Update class dropdown link (optional)
    if (sectionId === 'class9' || sectionId === 'class10') {
        // keep highlight on Class dropdown parent? just UI
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        if (section) showSection(section);
        // close mobile menu if open
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
        // close dropdown submenu
        classSubmenu.classList.remove('show');
    });
});

// Class dropdown trigger
classTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    classSubmenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!classTrigger.contains(e.target) && !classSubmenu.contains(e.target)) {
        classSubmenu.classList.remove('show');
    }
});

// Dropdown items (class 9 & 10)
document.querySelectorAll('#classSubmenu a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        if (section) showSection(section);
        classSubmenu.classList.remove('show');
        if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
    });
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// ---------- SEARCH FUNCTIONALITY ----------
function performSearch(query) {
    if (!query.trim()) {
        searchPanel.style.display = 'none';
        return;
    }
    const lowerQuery = query.toLowerCase();
    const searchableElements = document.querySelectorAll('.feature-card, .subject-card, .question-card, .hero p, .hero h2, .extra-resources p, .topic-list li');
    const results = [];
    searchableElements.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (text.includes(lowerQuery)) {
            let clone = el.cloneNode(true);
            // limit size
            if (clone.innerText.length > 200) clone.innerText = clone.innerText.substring(0, 200) + '...';
            results.push(clone);
        }
    });
    if (results.length === 0) {
        searchContent.innerHTML = '<p>No results found. Try "website", "DBMS", "HTML" etc.</p>';
    } else {
        searchContent.innerHTML = '';
        results.forEach(res => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.padding = '12px';
            resultItem.style.borderBottom = '1px solid #e2e8f0';
            resultItem.appendChild(res);
            searchContent.appendChild(resultItem);
        });
    }
    searchPanel.style.display = 'block';
}

// Close search panel
closeSearch.addEventListener('click', () => {
    searchPanel.style.display = 'none';
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
});

// Search handlers
function handleSearch() {
    const query = searchInput ? searchInput.value : '';
    performSearch(query);
}
function handleMobileSearch() {
    const query = mobileSearchInput ? mobileSearchInput.value : '';
    performSearch(query);
}
searchBtn.addEventListener('click', handleSearch);
mobileSearchBtn.addEventListener('click', handleMobileSearch);
searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
mobileSearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleMobileSearch(); });

// ---------- LOGIN & SIGNUP (Frontend Demo) ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        if (user.trim() === '') alert('Please enter email/username');
        else alert(`Welcome back, ${user}! (Demo login)`);
    });
}
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const pass = document.getElementById('signupPass').value;
        const confirm = document.getElementById('signupConfirm').value;
        if (!name || !email) {
            alert('Please fill all fields');
            return;
        }
        if (pass !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        alert(`Account created for ${name}! You can now login.`);
        signupForm.reset();
        showSection('login');
    });
}

// Extra: Ensure contact section phone/email are displayed correctly.
// Also close search on section change
document.querySelectorAll('[data-section]').forEach(trigger => {
    trigger.addEventListener('click', () => {
        if (searchPanel.style.display === 'block') searchPanel.style.display = 'none';
    });
});

// Responsive: close mobile menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
    }
});