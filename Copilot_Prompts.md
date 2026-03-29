# GitHub Copilot Prompts for Building Your Portfolio (BrandFolio)

This guide contains step-by-step prompts you can use with GitHub Copilot (either in Copilot Chat or inline) to build your personal portfolio website. Since your `README.md` mentions experience with React, these prompts are tailored for a modern React stack.

## Step 1: Project Setup and Foundation

**Prompt 1 (In Copilot Chat):**
> "I want to build my personal portfolio website using React, Vite, and Tailwind CSS. What are the terminal commands to initialize this project and install the necessary dependencies?"

**Prompt 2 (In `App.jsx`):**
> "Generate a basic App layout with a sticky navigation bar at the top, a main content area for rendering sections, and a simple footer at the bottom."

## Step 2: Hero Section

**Prompt 3 (In a new file `components/Hero.jsx`):**
> "Create a Hero component for a software developer named Debjit Majumdar. It should include a catchy headline, a short subtitle mentioning my passion for building scalable applications, a 'View Projects' prominent call-to-action button, and a placeholder for my profile picture. Style it with Tailwind CSS for a modern, responsive look."

## Step 3: About Me & Education Sections

**Prompt 4 (In a new file `components/About.jsx`):**
> "Create an 'About Me' section component. The text should say: 'I'm Debjit Majumdar, a dedicated software engineer committed to creating efficient and user-friendly solutions. I enjoy collaborating with teams, learning new technologies, and contributing to impactful projects.' Add a side-by-side layout on desktop with a placeholder for a graphic on one side and the text on the other."

**Prompt 5 (In a new file `components/Education.jsx`):**
> "Create an Education section component. Display my education at 'KIIT (Kalinga Institute of Industrial Technology)' with a focus on Computer Science and Software Development. Style it as a neat, modern card using Tailwind CSS."

## Step 4: Skills Section

**Prompt 6 (In a new file `components/Skills.jsx`):**
> "Create a Skills section component. I want to display the following skills categorized into groups using professional looking badges or cards: 
> - Languages: JavaScript, Python, Java, C++ 
> - Web Development: HTML, CSS, React, Node.js 
> - Tools/Tech: Git, Docker, REST APIs 
> - Database: SQL, MongoDB. 
> Make the layout responsive using CSS grid or flexbox."

## Step 5: Professional Experience

**Prompt 7 (In a new file `components/Experience.jsx`):**
> "Create a Professional Experience section. I want to list my experience in full-stack web development, software engineering best practices, and team collaboration. Design it as a vertical timeline component using Tailwind CSS."

## Step 6: Projects Showcase

**Prompt 8 (In a new file `components/Projects.jsx`):**
> "Create a Projects section component displaying a responsive grid of project cards. Each card should have a placeholder image, a project title, a short description, tag badges for the technologies used, and functional 'GitHub' and 'Live Demo' link buttons. Generate dummy JSON data for 3 filler projects for now."

## Step 7: Contact Section & Footer

**Prompt 9 (In a new file `components/Contact.jsx`):**
> "Create a Contact section component with a simple contact form (Name, Email, Message fields and a Submit button) and my social links (LinkedIn and GitHub). Style the inputs nicely with focus states."

**Prompt 10 (In `components/Footer.jsx`):**
> "Create a Footer component that includes a copyright notice, 'Designed by Debjit Majumdar', and small social media icon links centered at the bottom."

## Step 8: Assembly and Polish (In Copilot Chat)

**Prompt 11 (Assembly):**
> "How do I import and arrange all these newly created components (`Hero`, `About`, `Education`, `Skills`, `Experience`, `Projects`, `Contact`) sequentially in my `App.jsx`?"

**Prompt 12 (Smooth Scrolling):**
> "How can I add smooth scroll behavior to my Navbar links so that clicking on a link smoothly scrolls the page down to the corresponding section ID?"

**Prompt 13 (Animations - Optional):**
> "Suggest how I can use Framer Motion to add subtle fade-in and slide-up animations to my portfolio components as they scroll into view."
