function analyzeText() {
    const text = document.getElementById('text-input').value;
    
    // Basic counts calculation
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const words = text.trim().split(/\s+/).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;

    // Linguistic categories
    const pronouns = [
        "i", "me", "my", "mine", "myself",
        "you", "your", "yours", "yourself", 
        "he", "him", "his", "himself",
        "she", "her", "hers", "herself",
        "it", "its", "itself",
        "we", "us", "our", "ours", "ourselves",
        "they", "them", "their", "theirs", "themselves"
    ];

    const prepositions = [
        "aboard", "about", "above", "across", "after", "against", "along",
        "amid", "among", "around", "as", "at", "before", "behind", "below",
        "beneath", "beside", "between", "beyond", "by", "concerning", "considering",
        "despite", "down", "during", "except", "for", "from", "in", "inside", "into",
        "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past",
        "regarding", "round", "since", "through", "throughout", "to", "toward", "under",
        "underneath", "until", "unto", "up", "upon", "with", "within", "without"
    ];

    const articles = ["a", "an", "the"];

    // Count occurrences with proper tokenization
    const counts = {
        pronouns: countGroup(text, pronouns),
        prepositions: countGroup(text, prepositions),
        articles: countGroup(text, articles)
    };

    displayResults({
        letters, words, spaces, newlines, specialSymbols
    }, counts);
}

function countGroup(text, wordList) {
    return text.split(/\s+/) // Split by whitespace
        .reduce((acc, token) => {
            // Clean each token: remove non-letters from start/end and lowercase
            const cleaned = token
                .replace(/^[^a-zA-Z]*/, '')
                .replace(/[^a-zA-Z]*$/, '')
                .toLowerCase();

            if (wordList.includes(cleaned)) {
                acc[cleaned] = (acc[cleaned] || 0) + 1;
            }
            return acc;
        }, {});
}

function displayResults(basicStats, linguisticStats) {
    const basicHTML = `
        <h3>Basic Statistics</h3>
        ${Object.entries(basicStats).map(([key, value]) => `
            <div class="stat-item">
                <span>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                <span>${value}</span>
            </div>
        `).join('')}
    `;

    const sections = [
        {id: 'pronouns', title: 'Pronouns', data: linguisticStats.pronouns},
        {id: 'prepositions', title: 'Prepositions', data: linguisticStats.prepositions},
        {id: 'articles', title: 'Articles', data: linguisticStats.articles}
    ];

    sections.forEach(({id, title, data}) => {
        const html = `
            <h3>${title}</h3>
            ${Object.keys(data).length ? 
                Object.entries(data).map(([word, count]) => `
                    <div class="stat-item">
                        <span>${word}:</span>
                        <span>${count}</span>
                    </div>
                `).join('') : 
                `<p class="no-results">No ${title.toLowerCase()} found</p>`
            }
        `;
        document.getElementById(id).innerHTML = html;
    });

    document.getElementById('basic-stats').innerHTML = basicHTML;
    document.addEventListener('DOMContentLoaded', () => {
        class Butterfly {
            constructor() {
                this.element = document.createElement('div');
                this.element.className = 'butterfly';
                this.element.textContent = '🦋';
                this.reset();
                document.querySelector('.butterflies-container').appendChild(this.element);
            }

            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.opacity = 0.7;
                this.element.style.fontSize = `${15 + Math.random() * 20}px`;
                this.element.style.opacity = this.opacity;
            }

            update() {
                // Check collisions with content elements
                const elements = document.querySelectorAll('.subsection-content, .image-card, .tech-item, .gallery-container, nav, h2');
                let collision = false;
                
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (this.x > rect.left && this.x < rect.right && 
                        this.y > rect.top && this.y < rect.bottom) {
                        collision = true;
                    }
                });

                if (collision) {
                    this.vx *= -0.8;
                    this.vy *= -0.8;
                    this.opacity *= 0.7;
                    this.element.style.opacity = this.opacity;
                    
                    if (this.opacity < 0.1) {
                        this.reset();
                    }
                }

                // Boundary checks
                if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
                if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;

                this.x += this.vx;
                this.y += this.vy;

                this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            }
        }

        const butterflies = [];
        for (let i = 0; i < 15; i++) {
            butterflies.push(new Butterfly());
        }

        function animate() {
            butterflies.forEach(butterfly => butterfly.update());
            requestAnimationFrame(animate);
        }

        animate();
    });
}