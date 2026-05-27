# 😂 Random Joke Generator

A fun, interactive web application that fetches random jokes from external APIs and displays them with a beautiful, responsive user interface.

## 🌟 Features

- ✨ **Get Random Jokes** - Fetch jokes with a single click
- 🎭 **Multiple Categories** - Choose from Programming, Knock-knock, General, or Spooky jokes
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔄 **Multiple API Support** - Uses reliable external joke APIs
- 📋 **Copy to Clipboard** - Easily copy jokes to share
- 🌐 **Social Sharing** - Share jokes on Twitter, Facebook, WhatsApp, and LinkedIn
- 💾 **Joke Counter** - Tracks total jokes fetched in your session
- ⌨️ **Keyboard Support** - Press Enter to get a new joke
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations

## 🎯 Live Demo

Visit the app here: **[Joke Generator](https://9akshay8.github.io/joke-generator/)**

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/9akshay8/joke-generator.git
   cd joke-generator
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

3. **Visit**
   - Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
joke-generator/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript logic and API calls
└── README.md       # Documentation
```

## 🔌 APIs Used

### 1. Official Joke API
- **URL**: `https://official-joke-api.appspot.com/`
- **Endpoint**: `/random_joke`
- **No authentication needed**
- Returns random jokes with setup and punchline

### 2. JokeAPI
- **URL**: `https://v2.jokeapi.dev/`
- **Endpoint**: `/joke/{category}`
- **No authentication needed**
- Supports multiple categories

## 🎮 How to Use

1. **Select a Category** (optional)
   - Choose from: Any, Programming, Knock-Knock, General, or Spooky

2. **Get a Joke**
   - Click the **"Get Joke"** button
   - Or press **Enter** on your keyboard

3. **Copy or Share**
   - **Copy Joke**: Click to copy to clipboard
   - **Share Joke**: Share on social media platforms

4. **Track Progress**
   - Check the joke counter at the bottom

## 💻 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and animations
- **Vanilla JavaScript (ES6+)** - Logic and API integration
- **Fetch API** - HTTP requests
- **Local Storage** - Persistence

## 🎨 Design Features

- **Modern Gradient Background** - Purple to pink gradient
- **Smooth Animations** - Slide-in and spin effects
- **Responsive Grid Layout** - Adapts to all screen sizes
- **Accessibility** - Proper semantic HTML and keyboard support
- **Dark Mode Friendly** - Works in all light/dark environments

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy on GitHub Pages (Recommended)

1. Fork/Clone this repository
2. Go to repository **Settings** → **Pages**
3. Select **Branch**: `main`
4. Your site will be live at: `https://your-username.github.io/joke-generator/`

### Deploy on Netlify

1. Connect your GitHub repository to Netlify
2. Netlify automatically detects the build settings
3. Your site goes live automatically

### Deploy on Vercel

1. Connect your GitHub repository to Vercel
2. Vercel handles deployment automatically
3. Your site is live!

## 📊 Features Breakdown

### Get Joke
- Fetches random joke from selected category
- Shows loading indicator during fetch
- Displays joke with smooth animation
- Handles errors gracefully

### Share Joke
- Share on 5 different platforms:
  - Twitter
  - Facebook
  - WhatsApp
  - LinkedIn
  - Copy Link

### Copy Joke
- Copies entire joke to clipboard
- Shows success notification
- Works in all modern browsers

### Joke Counter
- Tracks total jokes fetched
- Stored in browser's localStorage
- Persists across sessions

## 🐛 Troubleshooting

### Jokes not loading?
- Check your internet connection
- Verify APIs are not blocked by firewall
- Try refreshing the page

### Copy not working?
- Ensure JavaScript is enabled
- Check browser permissions for clipboard access
- Use a modern browser (IE not supported)

### Share not working?
- Ensure you have social media accounts
- Check if pop-ups are blocked in browser settings

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Add favorite jokes feature
- [ ] Dark mode toggle
- [ ] Custom API integration
- [ ] Joke history/archive
- [ ] Multiple languages support
- [ ] Progressive Web App (PWA)
- [ ] Rating system for jokes
- [ ] Search functionality

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👨‍💻 Author

Created by **[9akshay8](https://github.com/9akshay8)**

## 🙏 Acknowledgments

- Thanks to [Official Joke API](https://official-joke-api.appspot.com/) for the API
- Thanks to [JokeAPI](https://jokeapi.dev/) for category support
- Inspired by the spirit of good humor! 😄

## 📞 Support

If you have any questions or issues, please:
1. Check the [Issues](https://github.com/9akshay8/joke-generator/issues) page
2. Create a new issue with detailed information
3. Or reach out via GitHub discussions

---

**Enjoy the laughs! 😂**

**Give it a ⭐ if you like the project!**
