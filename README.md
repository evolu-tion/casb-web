# CASB Profile Website Instructions
Welcome to the documentation for the CASB Profile Website!

This website is built using the [Astro.build](https://astro.build/) framework v4.2.6 and the [AstroWind](https://astrowind.vercel.app) template from [onwidget](https://onwidget.com/). This document provides instructions on how to set up and maintain the website.

## Prerequisites
- Basic understanding of Markdown syntax
- Familiarity with Git (optional, but recommended for version control)

## Getting Started
1. Clone the repository: If you haven't already, clone the website repository to your local machine.
2. Install dependencies: Run `npm install` in the project directory to install all necessary dependencies.
3. Start the development server: Run `npm run dev` to start the development server. The website will be available at http://localhost:4321 .

## Content Management
- All website content is located in the `content` directory.
- Each section of the website corresponds to a separate Markdown file within the `content` directory. For example, the homepage content is located in `content/home.md`.
- You can modify the content and structure of the website by editing the relevant Markdown files.
- AstroWind uses components for page layout and structure. You can customize these components by editing the files in the src/components directory.

## Deployment
There are several ways to deploy the website:

- Astro Deploy: You can use Astro Deploy to easily deploy your website to a variety of platforms. More information on Astro Deploy can be found here: https://docs.astro.build/en/guides/deploy/
- Manual Deployment: You can manually build the website and deploy it to your own server. To do this, run npm run build to create a production build of the website. The build outputs will be located in the build directory.

## Additional Resources
- Astro.build documentation: https://docs.astro.build/en/getting-started/
- AstroWind repository: https://github.com/onwidget/astrowind
