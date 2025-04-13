// Function to determine element type based on attributes
function getElementType(element) {
    const tag = element.tagName.toLowerCase();
    const id = element.id;
    const classList = element.classList;

    // Check specific elements by ID
    if (id === 'about') return 'about_section';
    if (id === 'journey') return 'journey_section';
    if (id === 'skills') return 'skills_section';
    if (id === 'diary') return 'visual_diary_section';

    // Check specific elements by class
    if (classList.contains('tech-item')) return 'tech_skill';
    if (classList.contains('image-card')) return 'gallery_image';
    if (classList.contains('subsection-content')) return 'content_subsection';
    if (classList.contains('profile-image')) return 'profile_image';
    if (classList.contains('cv-button')) return 'cv_button';

    // Generic element types
    if (tag === 'img') return 'image';
    if (tag === 'a') return 'hyperlink';
    if (tag === 'button') return 'button';
    if (tag === 'section') return 'page_section';

    return tag;
}

// Track click events
document.addEventListener('click', (event) => {
    const target = event.target;
    const elementType = getElementType(target);
    console.log(`${new Date().toISOString()}, click, ${elementType}`);
});

// Track view events with Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const elementType = getElementType(element);
            console.log(`${new Date().toISOString()}, view, ${elementType}`);
            observer.unobserve(element); // Log only once per session
        }
    });
}, { threshold: 0.5 });

// Observe relevant elements
const elementsToTrack = [
    '#about', '#journey', '#skills', '#diary',
    '.tech-item', '.image-card', '.subsection-content',
    '.profile-image', '.image-cycle', '.cv-button',
    '.about-text', 'nav a'
];

elementsToTrack.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
});