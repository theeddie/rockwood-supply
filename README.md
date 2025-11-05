# RockWood Supply Co. Website

Quality firewood delivery and pickup service in Bulverde, TX and surrounding San Antonio areas.

## Project Structure

```
rockwood-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Stylesheet
├── js/
│   ├── map.js         # Interactive coverage map
│   └── main.js        # Main JavaScript functionality
├── images/            # Product and logo images
├── Dockerfile         # Docker configuration for local testing
└── README.md          # This file
```

## Features

- Responsive design (mobile-friendly)
- Interactive coverage map showing delivery areas
- Contact form for quote requests
- Click-to-call functionality
- Product showcase with images
- SEO optimized

## Local Development with Docker

Build and run the Docker container:

```bash
docker build -t rockwood-website .
docker run -d -p 8080:80 --name rockwood-site rockwood-website
```

Visit http://localhost:8080 in your browser.

Stop the container:

```bash
docker stop rockwood-site
docker rm rockwood-site
```

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push this code to the repository:

```bash
git init
git add .
git commit -m "Initial commit: RockWood Supply Co. website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js (interactive maps)
- OpenStreetMap tiles
- Nginx (Docker web server)

## Contact Information

**RockWood Supply Co.**
4070 FM 1863, Bulverde, TX
Phone: (210) 854-1362

## License

Copyright 2024 RockWood Supply Co. All rights reserved.
