// =====================
// Theme Toggle Logic
// =====================
const themeKey = 'resourceHubTheme';
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(themeKey, theme);
  // Update icon
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
window.addEventListener('DOMContentLoaded', () => {
  // Set initial theme
  setTheme(localStorage.getItem(themeKey) || 'dark');
  // Add toggle event
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
});
// =====================
// Resources Hub Logic
// =====================

const resourceCategories = [
  "All", "Guides", "Courses", "Tools", "Communities", "Research", "Videos", "Blogs", "Templates", "Other"
];

// Comprehensive prompt engineering resources
let resources = [
  // Guides
  {
    title: "Prompt Engineering Guide",
    desc: "Comprehensive guide to prompt engineering techniques and best practices.",
    link: "https://www.promptingguide.ai/",
    cat: "Guides",
    featured: true
  },
  {
    title: "Learn Prompting",
    desc: "Open-source curriculum for learning prompt engineering from scratch.",
    link: "https://learnprompting.org/",
    cat: "Guides"
  },
  {
    title: "OpenAI Cookbook",
    desc: "Practical recipes and guides for using LLMs and prompt engineering.",
    link: "https://github.com/openai/openai-cookbook",
    cat: "Guides"
  },
  {
    title: "Prompt Engineering 101 (Vercel)",
    desc: "A beginner-friendly introduction to prompt engineering.",
    link: "https://vercel.com/guides/prompt-engineering-101",
    cat: "Guides"
  },
  // Courses
  {
    title: "Prompt Engineering for Developers (DeepLearning.AI)",
    desc: "Free course on prompt engineering for developers.",
    link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-eng/",
    cat: "Courses",
    featured: true
  },
  {
    title: "Prompt Engineering with OpenAI API (Coursera)",
    desc: "Coursera course on prompt engineering with OpenAI API.",
    link: "https://www.coursera.org/learn/prompt-engineering-openai-api",
    cat: "Courses"
  },
  {
    title: "Prompt Engineering (DataCamp)",
    desc: "DataCamp course on prompt engineering for LLMs.",
    link: "https://www.datacamp.com/courses/prompt-engineering-for-llms",
    cat: "Courses"
  },
  // Tools
  {
    title: "OpenAI Playground",
    desc: "Experiment with prompts and models in real time.",
    link: "https://platform.openai.com/playground",
    cat: "Tools"
  },
  {
    title: "PromptHero",
    desc: "Community and marketplace for prompt sharing and discovery.",
    link: "https://prompthero.com/",
    cat: "Tools"
  },
  {
    title: "FlowGPT",
    desc: "Community-shared prompts for ChatGPT and others.",
    link: "https://flowgpt.com/",
    cat: "Tools"
  },
  {
    title: "Promptist (by Cohere)",
    desc: "Prompt generator and optimizer for LLMs.",
    link: "https://promptist.ai/",
    cat: "Tools"
  },
  // Communities
  {
    title: "Prompt Engineering Discord (Learn Prompting)",
    desc: "Active Discord community for prompt engineers.",
    link: "https://discord.gg/learnprompting",
    cat: "Communities"
  },
  {
    title: "Reddit: r/PromptEngineering",
    desc: "Subreddit for prompt engineering discussions and resources.",
    link: "https://www.reddit.com/r/PromptEngineering/",
    cat: "Communities"
  },
  // Research
  {
    title: "Prompt Engineering Papers (Papers With Code)",
    desc: "Latest research papers on prompt engineering.",
    link: "https://paperswithcode.com/task/prompt-engineering",
    cat: "Research"
  },
  {
    title: "Awesome Prompt Engineering (GitHub)",
    desc: "Curated list of prompt engineering resources and research.",
    link: "https://github.com/promptslab/awesome-prompt-engineering",
    cat: "Research"
  },
  // Videos
  {
    title: "Prompt Engineering YouTube Playlist",
    desc: "Handpicked videos on prompt engineering concepts and demos.",
    link: "https://www.youtube.com/playlist?list=PL5TJqBvpXQv5b8l0lHh6d6lQb6QeQ5a8U",
    cat: "Videos"
  },
  {
    title: "DeepLearning.AI YouTube: Prompt Engineering",
    desc: "Video lectures and tutorials on prompt engineering.",
    link: "https://www.youtube.com/@DeepLearningAI/playlists",
    cat: "Videos"
  },
  // Blogs
  {
    title: "Prompt Engineering Blog (OpenAI)",
    desc: "Official OpenAI blog posts on prompt engineering.",
    link: "https://openai.com/blog/tags/prompt-engineering/",
    cat: "Blogs"
  },
  {
    title: "Prompt Engineering Blog (Prompting Guide)",
    desc: "Blog posts and updates from Prompting Guide.",
    link: "https://www.promptingguide.ai/blog",
    cat: "Blogs"
  },
  // Templates
  {
    title: "Awesome ChatGPT Prompts",
    desc: "Curated list of useful ChatGPT prompts and templates.",
    link: "https://github.com/f/awesome-chatgpt-prompts",
    cat: "Templates"
  },
  {
    title: "Prompt Templates (PromptHero)",
    desc: "Prompt templates for various AI models and tasks.",
    link: "https://prompthero.com/prompts",
    cat: "Templates"
  },
  // Other
  {
    title: "Prompt Engineering Glossary (Learn Prompting)",
    desc: "Glossary of prompt engineering terms and concepts.",
    link: "https://learnprompting.org/glossary",
    cat: "Other"
  },
  {
    title: "Prompt Engineering Tools (Prompting Guide)",
    desc: "Directory of prompt engineering tools and utilities.",
    link: "https://www.promptingguide.ai/tools",
    cat: "Other"
  }
];

// Load user-submitted resources from localStorage
function loadUserResources() {
  const userRes = JSON.parse(localStorage.getItem('userResources') || '[]');
  if (Array.isArray(userRes)) {
    resources = [...resources, ...userRes];
  }
}
loadUserResources();

// Render resource categories
function renderResourceCategories() {
  const catBar = document.getElementById('resourceCategories');
  if (!catBar) return;
  catBar.innerHTML = '';
  resourceCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'resource-cat-btn';
    btn.textContent = cat;
    btn.setAttribute('data-cat', cat);
    btn.onclick = () => filterResources(cat);
    catBar.appendChild(btn);
  });
  // Set 'All' as active by default
  setTimeout(() => {
    const allBtn = catBar.querySelector('[data-cat="All"]');
    if (allBtn) allBtn.classList.add('active');
  }, 10);
}

// Render resources grid
function renderResourcesGrid(filterCat = 'All', searchTerm = '') {
  const grid = document.getElementById('resourcesGrid');
  if (!grid) return;
  let filtered = resources;
  if (filterCat && filterCat !== 'All') {
    filtered = filtered.filter(r => r.cat === filterCat);
  }
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.desc.toLowerCase().includes(term) ||
      r.cat.toLowerCase().includes(term)
    );
  }
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="color:#00e6ff;text-align:center;">No resources found.</div>';
    return;
  }
  filtered.forEach(res => {
    const card = document.createElement('div');
    card.className = 'resource-card' + (res.featured ? ' featured' : '');
    card.innerHTML = `
      <div class="resource-cat">${res.cat}</div>
      <div class="resource-title">${res.title}
        ${res.featured ? '<span class="resource-badge">Featured</span>' : ''}
      </div>
      <div class="resource-desc">${res.desc}</div>
      <a class="resource-link" href="${res.link}" target="_blank" rel="noopener">Visit Resource</a>
    `;
    grid.appendChild(card);
  });
}

// Filter resources by category
function filterResources(cat) {
  const catBar = document.getElementById('resourceCategories');
  if (!catBar) return;
  catBar.querySelectorAll('.resource-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });
  renderResourcesGrid(cat, document.getElementById('resourceSearch')?.value || '');
}

// Search resources
function setupResourceSearch() {
  const search = document.getElementById('resourceSearch');
  if (!search) return;
  search.addEventListener('input', () => {
    const cat = document.querySelector('.resource-cat-btn.active')?.getAttribute('data-cat') || 'All';
    renderResourcesGrid(cat, search.value);
  });
}

// Handle resource submission
function setupResourceSubmit() {
  const form = document.getElementById('resourceSubmitForm');
  if (!form) return;
  form.onsubmit = function(e) {
    e.preventDefault();
    const title = form.resourceTitle.value.trim();
    const desc = form.resourceDesc.value.trim();
    const link = form.resourceLink.value.trim();
    const cat = form.resourceCat.value;
    const msg = document.getElementById('resourceSubmitMsg');
    // Validation
    if (!title || !desc || !link || !cat) {
      msg.textContent = 'Please fill in all fields.';
      msg.style.color = '#ff9800';
      return;
    }
    if (title.length < 3 || desc.length < 8) {
      msg.textContent = 'Title or description is too short.';
      msg.style.color = '#ff9800';
      return;
    }
    // URL validation
    try {
      const url = new URL(link);
      if (!/^https?:$/.test(url.protocol)) throw new Error();
    } catch {
      msg.textContent = 'Please enter a valid URL (starting with http or https).';
      msg.style.color = '#ff9800';
      return;
    }
    // Prevent duplicate links
    if (resources.some(r => r.link === link)) {
      msg.textContent = 'This resource is already listed.';
      msg.style.color = '#ff9800';
      return;
    }
    // Save to localStorage
    const userRes = JSON.parse(localStorage.getItem('userResources') || '[]');
    userRes.push({ title, desc, link, cat });
    localStorage.setItem('userResources', JSON.stringify(userRes));
    // Add to resources and re-render
    resources.push({ title, desc, link, cat });
    msg.textContent = 'Resource submitted!';
    msg.style.color = '#00e6ff';
    form.reset();
    // Re-render grid
    const activeCat = document.querySelector('.resource-cat-btn.active')?.getAttribute('data-cat') || 'All';
    renderResourcesGrid(activeCat, document.getElementById('resourceSearch')?.value || '');
    setTimeout(() => { msg.textContent = ''; }, 2500);
  };
}

// Initialize resources section
function initResourcesSection() {
  renderResourceCategories();
  renderResourcesGrid();
  setupResourceSearch();
  setupResourceSubmit();
}

// Always show resources grid on page load
window.addEventListener('DOMContentLoaded', () => {
  initResourcesSection();
});
