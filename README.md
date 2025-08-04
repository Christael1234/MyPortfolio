# Modern Portfolio Website

A beautiful, responsive portfolio website built with HTML, CSS, and JavaScript. Features a modern design with smooth animations, mobile-first approach, and interactive elements.

## Features

- ✨ **Modern Design**: Clean and professional layout with gradient accents
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🎨 **Smooth Animations**: CSS animations and JavaScript interactions
- 📧 **Contact Form**: Functional contact form with validation
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML
- ⚡ **Fast Loading**: Optimized for performance
- 🌙 **Interactive Elements**: Hover effects, ripple buttons, and more

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information with statistics
3. **Projects Section**: Showcase of your work with technology tags
4. **Skills Section**: Organized display of your technical skills
5. **Contact Section**: Contact form and social media links
6. **Footer**: Copyright and additional information

## Customization Guide

### Personal Information

1. **Update the title and meta description** in `index.html`:
   ```html
   <title>Your Name - Portfolio</title>
   <meta name="description" content="Your custom description">
   ```

2. **Change your name and title** in the hero section:
   ```html
   <h1 class="hero-title">Hi, I'm <span class="highlight">Your Name</span></h1>
   <p class="hero-subtitle">Your Title</p>
   ```

3. **Update the about section** with your personal information:
   ```html
   <p>Your personal description here...</p>
   ```

4. **Modify statistics** in the about section:
   ```html
   <div class="stat">
       <h3>Your Number</h3>
       <p>Your Stat</p>
   </div>
   ```

### Projects

Replace the sample projects with your own:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" class="project-link"><i class="fab fa-github"></i> Code</a>
            <a href="your-live-link" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
        </div>
    </div>
</div>
```

### Skills

Update the skills section with your actual skills:

```html
<div class="skill-item">
    <i class="fab fa-html5"></i>
    <span>HTML5</span>
</div>
```

### Contact Information

Update your contact details:

```html
<div class="contact-method">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>
<div class="contact-method">
    <i class="fas fa-phone"></i>
    <span>Your Phone Number</span>
</div>
<div class="contact-method">
    <i class="fas fa-map-marker-alt"></i>
    <span>Your Location</span>
</div>
```

### Social Media Links

Update the social media links with your profiles:

```html
<div class="social-links">
    <a href="your-github" class="social-link"><i class="fab fa-github"></i></a>
    <a href="your-linkedin" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="your-twitter" class="social-link"><i class="fab fa-twitter"></i></a>
    <a href="your-instagram" class="social-link"><i class="fab fa-instagram"></i></a>
</div>
```

## Color Scheme

The current color scheme uses:
- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Text: `#2d3748` (Dark Gray)
- Background: `#f7fafc` (Light Gray)

To change colors, update the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2d3748;
    --background-color: #f7fafc;
}
```

## Adding Images

To add your own images:

1. Create an `images` folder in your project
2. Add your images to the folder
3. Replace the placeholder divs with actual images:

```html
<!-- Instead of this: -->
<div class="profile-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- Use this: -->
<img src="images/your-photo.jpg" alt="Your Name" class="profile-image">
```

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your branch and save

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be live instantly

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize images**: Use WebP format and compress images
2. **Minify CSS/JS**: Use tools like UglifyJS and CSSNano
3. **Enable Gzip**: Configure your server for compression
4. **Use CDN**: Host Font Awesome and Google Fonts via CDN

## Customization Examples

### Dark Theme
Add this CSS to create a dark theme:

```css
body {
    background-color: #1a202c;
    color: #e2e8f0;
}

.navbar {
    background: rgba(26, 32, 44, 0.95);
}

.project-card {
    background: #2d3748;
    color: #e2e8f0;
}
```

### Different Font
Replace the Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update the CSS:

```css
body {
    font-family: 'Poppins', sans-serif;
}
```

## Support

If you need help customizing your portfolio:

1. Check the HTML structure in `index.html`
2. Modify styles in `styles.css`
3. Add functionality in `script.js`
4. Test on different devices and browsers

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀** 