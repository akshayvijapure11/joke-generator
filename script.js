// ===============================================
// JOKE GENERATOR v1.0 - Professional Edition
// ===============================================
// Features: Multiple APIs, Categories, Favorites
// ===============================================

// Global Variables
let jokeCount = 0;
let currentJoke = '';
let favoriteJokes = [];
let darkModeEnabled = false;

// API endpoints
const APIs = {
    officialJokeAPI: 'https://official-joke-api.appspot.com/random_joke',
    jokeAPIBase: 'https://v2.jokeapi.dev/joke',
};

// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const jokeText = document.getElementById('jokeText');
const loading = document.getElementById('loading');
const loadingText = document.getElementById('loadingText');
const notification = document.getElementById('notification');
const categorySelect = document.getElementById('category');
const jokeCountSpan = document.getElementById('jokeCount');
const favoriteCountSpan = document.getElementById('favoriteCount');
const toggleAdvancedBtn = document.getElementById('toggleAdvanced');
const advancedPanel = document.getElementById('advancedPanel');
const toggleFavoritesBtn = document.getElementById('toggleFavorites');
const favoritesList = document.getElementById('favoritesList');
const darkModeCheckbox = document.getElementById('darkMode');
const soundCheckbox = document.getElementById('soundEnabled');

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
shareBtn.addEventListener('click', shareJoke);
copyBtn.addEventListener('click', copyJoke);
favoriteBtn.addEventListener('click', addToFavorites);

// Advanced Options Toggle
toggleAdvancedBtn.addEventListener('click', () => {
    advancedPanel.style.display = advancedPanel.style.display === 'none' ? 'block' : 'none';
});

// Dark Mode Toggle
darkModeCheckbox.addEventListener('change', toggleDarkMode);

// Favorites Toggle
toggleFavoritesBtn.addEventListener('click', () => {
    favoritesList.style.display = favoritesList.style.display === 'none' ? 'block' : 'none';
    displayFavorites();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadJokeCount();
    loadFavorites();
    loadDarkModePreference();
});

/**
 * Fetch a random joke from API
 */
async function fetchJoke() {
    const category = categorySelect.value;
    
    try {
        showLoading(true);
        
        let jokeData;
        
        if (category === 'any') {
            jokeData = await fetchFromOfficialAPI();
        } else {
            jokeData = await fetchFromJokeAPI(category);
        }
        
        if (jokeData) {
            displayJoke(jokeData);
            incrementJokeCount();
            playSound('success');
        }
        
        showLoading(false);
    } catch (error) {
        console.error('Error fetching joke:', error);
        showNotification('⚠️ Failed to fetch joke. Please try again!', 'error');
        showLoading(false);
    }
}

/**
 * Fetch from Official Joke API
 */
async function fetchFromOfficialAPI() {
    try {
        const response = await fetch(APIs.officialJokeAPI);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            setup: data.setup,
            punchline: data.punchline
        };
    } catch (error) {
        console.error('Official API Error:', error);
        throw error;
    }
}

/**
 * Fetch from JokeAPI with category
 */
async function fetchFromJokeAPI(category) {
    try {
        const categoryMap = {
            'programming': 'Programming',
            'knock-knock': 'Knock-knock',
            'general': 'General',
            'spooky': 'Spooky'
        };
        
        const categoryValue = categoryMap[category] || 'Any';
        const url = `${APIs.jokeAPIBase}/${categoryValue}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            return await fetchFromOfficialAPI();
        }
        
        return {
            setup: data.setup || data.joke,
            punchline: data.delivery || ''
        };
    } catch (error) {
        console.error('JokeAPI Error:', error);
        return await fetchFromOfficialAPI();
    }
}

/**
 * Display the joke
 */
function displayJoke(jokeData) {
    if (jokeData.punchline) {
        currentJoke = `${jokeData.setup}\n\n${jokeData.punchline}`;
        jokeText.textContent = currentJoke;
    } else {
        currentJoke = jokeData.setup || jokeData.joke;
        jokeText.textContent = currentJoke;
    }
    
    jokeText.style.animation = 'none';
    setTimeout(() => {
        jokeText.style.animation = 'slideIn 0.5s ease-out';
    }, 10);
}

/**
 * Add joke to favorites
 */
function addToFavorites() {
    if (!currentJoke) {
        showNotification('❌ No joke to add!', 'error');
        return;
    }
    
    if (!favoriteJokes.includes(currentJoke)) {
        favoriteJokes.push(currentJoke);
        saveFavorites();
        favoriteCountSpan.textContent = favoriteJokes.length;
        showNotification('❤️ Added to favorites!', 'success');
        playSound('success');
    } else {
        showNotification('⚠️ Already in favorites!', 'info');
    }
}

/**
 * Display favorites
 */
function displayFavorites() {
    favoritesList.innerHTML = '';
    
    if (favoriteJokes.length === 0) {
        favoritesList.innerHTML = '<p style="text-align:center; color: #999;">No favorite jokes yet</p>';
        return;
    }
    
    favoriteJokes.forEach((joke, index) => {
        const jokeItem = document.createElement('div');
        jokeItem.className = 'favorite-item';
        jokeItem.innerHTML = `
            <p>${joke.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            <div class="favorite-actions">
                <button onclick="copyToClipboard('${joke.replace(/'/g, "\\'")}')">Copy</button>
                <button onclick="removeFavorite(${index})">Remove</button>
            </div>
        `;
        favoritesList.appendChild(jokeItem);
    });
}

/**
 * Remove favorite
 */
function removeFavorite(index) {
    favoriteJokes.splice(index, 1);
    saveFavorites();
    favoriteCountSpan.textContent = favoriteJokes.length;
    displayFavorites();
    showNotification('❌ Removed from favorites', 'info');
}

/**
 * Share joke on social media
 */
function shareJoke() {
    if (!currentJoke) {
        showNotification('❌ No joke to share! Get a joke first.', 'error');
        return;
    }
    
    const text = encodeURIComponent(currentJoke + '\n\n😂 Generated by Joke Generator');
    const url = window.location.href;
    
    const shareOptions = {
        'twitter': `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
        'facebook': `https://www.facebook.com/sharer/sharer.php?quote=${text}&href=${encodeURIComponent(url)}`,
        'whatsapp': `https://wa.me/?text=${text}`,
        'linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    
    const platform = prompt('Share on:\n1. Twitter\n2. Facebook\n3. WhatsApp\n4. LinkedIn\n5. Copy Link\n\nEnter number (1-5):');
    
    switch(platform) {
        case '1':
            window.open(shareOptions.twitter, '_blank', 'width=600,height=400');
            showNotification('📱 Opening Twitter...', 'success');
            break;
        case '2':
            window.open(shareOptions.facebook, '_blank', 'width=600,height=400');
            showNotification('📱 Opening Facebook...', 'success');
            break;
        case '3':
            window.open(shareOptions.whatsapp, '_blank');
            showNotification('📱 Opening WhatsApp...', 'success');
            break;
        case '4':
            window.open(shareOptions.linkedin, '_blank');
            showNotification('📱 Opening LinkedIn...', 'success');
            break;
        case '5':
            copyToClipboard(currentJoke + '\n\n' + url);
            showNotification('📋 Share link copied!', 'success');
            break;
        default:
            if (platform !== null) {
                showNotification('❌ Invalid option', 'error');
            }
    }
    
    playSound('share');
}

/**
 * Copy joke to clipboard
 */
function copyJoke() {
    if (!currentJoke) {
        showNotification('❌ No joke to copy!', 'error');
        return;
    }
    
    copyToClipboard(currentJoke);
    showNotification('📋 Joke copied to clipboard!', 'success');
    playSound('copy');
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * Show/hide loading spinner
 */
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
    getJokeBtn.disabled = show;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Increment and save joke count
 */
function incrementJokeCount() {
    jokeCount++;
    jokeCountSpan.textContent = jokeCount;
    localStorage.setItem('jokeCount', jokeCount);
}

/**
 * Load joke count from localStorage
 */
function loadJokeCount() {
    const saved = localStorage.getItem('jokeCount');
    if (saved) {
        jokeCount = parseInt(saved);
        jokeCountSpan.textContent = jokeCount;
    }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes));
}

/**
 * Load favorites from localStorage
 */
function loadFavorites() {
    const saved = localStorage.getItem('favoriteJokes');
    if (saved) {
        try {
            favoriteJokes = JSON.parse(saved);
            favoriteCountSpan.textContent = favoriteJokes.length;
        } catch (e) {
            console.error('Error loading favorites:', e);
        }
    }
}

/**
 * Toggle Dark Mode
 */
function toggleDarkMode() {
    darkModeEnabled = document.getElementById('darkMode').checked;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
    localStorage.setItem('darkMode', darkModeEnabled);
}

/**
 * Load dark mode preference
 */
function loadDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.getElementById('darkMode').checked = true;
        toggleDarkMode();
    }
}

/**
 * Play sound effect
 */
function playSound(type) {
    if (!document.getElementById('soundEnabled').checked) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'success':
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'error':
                oscillator.frequency.value = 400;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'copy':
            case 'share':
                oscillator.frequency.value = 600;
                gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
        }
    } catch (e) {
        console.error('Error playing sound:', e);
    }
}

/**
 * Show About Modal
 */
function showAbout() {
    document.getElementById('aboutModal').style.display = 'block';
}

/**
 * Show Help Modal
 */
function showHelp() {
    document.getElementById('helpModal').style.display = 'block';
}

/**
 * Close Modal
 */
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement !== categorySelect) {
        fetchJoke();
    }
    if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        copyJoke();
    }
    if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        addToFavorites();
    }
});
