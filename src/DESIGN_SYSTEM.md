# Warm & Cozy Design System

A complete design system for building warm, inviting developer portfolio experiences with rounded typography and earthy tones.

## Overview

This design system powers a multi-page portfolio website built with React Router, featuring smooth animations, responsive layouts, and thoughtful interactions that create a cozy, approachable feel while maintaining professionalism.

## Color Palette

### Primary Colors
- **Warm Cream** `#FFF8F0` - Primary background color
- **Sage Green** `#7BA05B` - Primary actions, links, accents
- **Forest Green** `#4A6741` - Gradient overlays, hover states
- **Warm Yellow** `#FFD166` - Accent highlights
- **Maple Wood** `#C77B58` - Secondary accent for variety
- **Warm Brown** `#8B6F47` - Muted text, borders
- **Soft Beige** `#F5E6D3` - Subtle backgrounds, dividers

### Text Colors
- **Primary Text** `#2C2416` - Headings and body text
- **Secondary Text** `#8B6F47` - Muted text, captions

### Semantic Colors
All colors are defined as CSS custom properties in `/styles/globals.css` using Tailwind CSS v4 theming system.

## Typography

**Font Family:** Quicksand (rounded, friendly, highly legible)

**Font Weights:**
- Normal: 500 (`--font-weight-normal`)
- Medium: 600 (`--font-weight-medium`)
- Bold: 700

**Implementation:**
- Loaded via Google Fonts CDN in `/styles/globals.css`
- Default font weights are applied at the base layer to h1-h4, labels, buttons, and inputs
- Maintains warm, cozy feel while ensuring excellent readability

## Architecture

### Routing
The app uses **React Router v7** with Data mode for multi-page navigation:

```tsx
// /App.tsx - Entry point
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

```tsx
// /routes.ts - Route configuration
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
    ],
  },
]);
```

### Folder Structure

```
/
├── App.tsx                 # Router entry point
├── routes.ts               # Route configuration
├── pages/                  # Page components
│   ├── Layout.tsx         # Shared layout wrapper
│   ├── Home.tsx           # Homepage
│   └── About.tsx          # About page
├── components/
│   ├── /ui/               # Foundational UI components
│   │   ├── CursorGlow.tsx # Custom cursor effect
│   │   └── [shadcn components]
│   ├── /common/           # Reusable custom components
│   │   ├── WarmButton.tsx
│   │   ├── WarmCard.tsx
│   │   ├── WarmBadge.tsx
│   │   └── IconButton.tsx
│   ├── /layout/           # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Section.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Container.tsx
│   │   ├── Grid.tsx
│   │   └── Footer.tsx
│   ├── /features/         # Feature-specific components
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillCard.tsx
│   │   └── ContactSection.tsx
│   ├── /figma/            # Figma-specific utilities
│   │   └── ImageWithFallback.tsx
│   └── index.ts           # Barrel export
└── styles/
    └── globals.css        # Global styles, tokens, theming
```

## Interactive Features

### Cursor Glow Effect
A subtle, warm glow that follows the cursor on desktop devices when hovering over interactive elements.

**Component:** `/components/ui/CursorGlow.tsx`

**Features:**
- Only appears on desktop (pointer: fine)
- Activates when hovering over buttons and links
- Smooth spring animation with dual-layer glow (yellow/green)
- Automatically hidden on mobile/touch devices

**Usage:**
```tsx
import { CursorGlow } from '../components';

// Add to Layout or App component
<CursorGlow />
```

### Responsive Navigation

**Component:** `/components/layout/Navigation.tsx`

**Desktop Behavior:**
- Fixed at top of viewport
- Shows logo initials + full name
- Displays full navigation text with icons
- Animates on scroll: shrinks width, fades out logo name and nav text
- Active section indicator (underline animation)

**Mobile Behavior:**
- Starts fixed at top
- After scrolling 100px, transitions to bottom of viewport
- Compact pill design with icons only
- Automatically adjusts position to avoid footer overlap
- Uses `fit-content` for adaptive width

**Key Features:**
- Scroll-based animations using Motion (Framer Motion)
- Route-aware active states
- Backdrop blur with warm cream background
- Staggered fade-in animations on mount
- Responsive breakpoint at 768px

## Components

### UI Components (Foundational)

#### CursorGlow
Warm, subtle cursor effect for desktop.

```tsx
import { CursorGlow } from './components';

<CursorGlow />
```

**No props** - Auto-detects hover states and device type.

#### WarmButton
Rounded buttons with cozy hover effects.

```tsx
import { WarmButton } from './components';

<WarmButton variant="primary" size="md" href="#link">
  Click Me
</WarmButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `href`: Optional link
- `onClick`: Optional click handler

#### WarmCard
Flexible card component with warm styling.

```tsx
import { WarmCard } from './components';

<WarmCard variant="elevated" padding="lg" rounded="3xl" hover>
  Card content
</WarmCard>
```

**Props:**
- `variant`: 'default' | 'muted' | 'elevated'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `rounded`: 'md' | 'lg' | 'xl' | '2xl' | '3xl'
- `hover`: boolean - Adds hover lift effect

#### WarmBadge
Small labels for tags and categories.

```tsx
import { WarmBadge } from './components';

<WarmBadge variant="accent" size="md">
  New
</WarmBadge>
```

**Props:**
- `variant`: 'default' | 'accent' | 'muted' | 'success' | 'maple'
- `size`: 'sm' | 'md' | 'lg'

#### IconButton
Circular icon buttons for social links.

```tsx
import { IconButton } from './components';
import { Mail } from 'lucide-react';

<IconButton 
  icon={Mail} 
  variant="green" 
  size="md"
  href="mailto:hello@example.com"
  label="Send email"
/>
```

**Props:**
- `icon`: LucideIcon component
- `variant`: 'green' | 'maple' | 'yellow' | 'brown'
- `size`: 'sm' | 'md' | 'lg'
- `href`: Optional link
- `onClick`: Optional click handler
- `label`: Accessibility label

### Layout Components

#### Navigation
Responsive navigation bar with advanced scroll behavior.

```tsx
import { Navigation } from './components';

<Navigation
  logo={{ initials: 'AB', name: 'Alex Brown' }}
  links={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' }
  ]}
  activeSection="home"
  onSectionChange={(section) => console.log(section)}
/>
```

**Props:**
- `logo`: Object with `initials` and `name`
- `links`: Array of navigation items
- `activeSection`: Currently active section ID
- `onSectionChange`: Callback when section changes

**Built-in Icons:**
- Home → Home icon
- About → User icon
- Projects → Briefcase icon
- Contact → Mail icon

#### Section
Container for page sections with consistent spacing.

```tsx
import { Section } from './components';

<Section id="about" background="cream" padding="lg" animate>
  Section content
</Section>
```

**Props:**
- `id`: Section ID for navigation anchors
- `background`: 'cream' | 'white' | 'dark'
- `padding`: 'sm' | 'md' | 'lg'
- `animate`: boolean - Scroll-triggered fade animations

#### SectionHeader
Standardized section headers.

```tsx
import { SectionHeader } from './components';

<SectionHeader 
  title="About Me" 
  subtitle="Learn more about my journey"
  align="center"
/>
```

**Props:**
- `title`: Section title
- `subtitle`: Optional subtitle
- `align`: 'left' | 'center'

#### Container
Max-width container for content.

```tsx
import { Container } from './components';

<Container size="lg">
  Content
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

#### Grid
Responsive grid layout.

```tsx
import { Grid } from './components';

<Grid cols={{ md: 2, lg: 3 }} gap="lg">
  {items.map(item => <div key={item.id}>{item}</div>)}
</Grid>
```

**Props:**
- `cols`: Object with breakpoint-specific column counts
- `gap`: 'sm' | 'md' | 'lg' | 'xl'

#### Footer
Simple footer component.

```tsx
import { Footer } from './components';

<Footer text="© 2026 Your Name. Built with care and lots of ☕" />
```

### Feature Components

#### Hero
Full hero section with gradient background.

```tsx
import { Hero } from './components';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<Hero
  greeting="👋 Hello, I'm a developer"
  title="Building beautiful experiences"
  subtitle="I create thoughtful applications..."
  primaryButton={{ text: 'View Work', href: '#projects' }}
  secondaryButton={{ text: 'Contact', href: '#contact' }}
  imageComponent={
    <ImageWithFallback
      src="image-url.jpg"
      alt="Hero image"
      className="w-full h-[400px] object-cover"
    />
  }
/>
```

**Props:**
- `greeting`: Optional greeting text
- `title`: Main heading
- `subtitle`: Subheading text
- `primaryButton`: Object with `text` and `href`
- `secondaryButton`: Object with `text` and `href`
- `imageComponent`: React component for hero image

#### ProjectCard
Card for showcasing portfolio projects.

```tsx
import { ProjectCard } from './components';

<ProjectCard
  title="Project Name"
  description="Project description"
  image="url-to-image.jpg"
  tags={['React', 'TypeScript']}
  link="#"
  delay={0.1}
/>
```

**Props:**
- `title`: Project title
- `description`: Project description
- `image`: Image URL
- `tags`: Array of technology tags
- `link`: Project link
- `delay`: Animation delay for staggering

#### SkillCard
Card for displaying skills with icons.

```tsx
import { SkillCard } from './components';
import { Code2 } from 'lucide-react';

<SkillCard
  name="Frontend Development"
  icon={Code2}
  color="green"
  delay={0.1}
/>
```

**Props:**
- `name`: Skill name
- `icon`: Lucide icon component
- `color`: 'green' | 'maple' | 'yellow' | 'brown'
- `delay`: Animation delay

#### ContactSection
Pre-built contact section with social links.

```tsx
import { ContactSection } from './components';

<ContactSection
  title="Let's Work Together"
  subtitle="Get in touch with me"
  email="hello@example.com"
  githubUrl="https://github.com/username"
  linkedinUrl="https://linkedin.com/in/username"
/>
```

**Props:**
- `title`: Section title
- `subtitle`: Section subtitle
- `email`: Email address
- `githubUrl`: GitHub profile URL
- `linkedinUrl`: LinkedIn profile URL

## Animation

### Motion (Framer Motion)

All animations use the `motion` package (formerly Framer Motion). Import as:

```tsx
import { motion } from 'motion/react';
```

**Animation Patterns:**

1. **Scroll-triggered fade-ins** - Sections fade in as they enter viewport
2. **Hover lift effects** - Cards rise on hover with smooth transitions
3. **Scale animations** - Buttons scale on hover/press
4. **Staggered animations** - Lists animate in sequence using `delay` prop
5. **Navigation transitions** - Smooth width/opacity changes on scroll
6. **Spring physics** - Cursor glow uses spring animations

**Performance:**
- Uses `transform` and `opacity` for hardware acceleration
- Conditional animations (no animations on mobile nav pill deformation)
- `ease-in` timing for navigation scroll effects

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Desktop**: ≥ 768px

### Mobile-First Patterns

**Navigation:**
- Pill design with icons only
- Moves to bottom after scroll
- Avoids footer overlap with dynamic offset

**Spacing:**
- Extra bottom padding on pages (`pb-24 md:pb-0`) to account for bottom nav

**Images:**
- Responsive sizing with object-fit
- Appropriate aspect ratios per device

**Grids:**
- 1 column on mobile
- 2-3 columns on desktop

## Usage

### Setting Up a New Page

```tsx
// /pages/NewPage.tsx
import { Section, SectionHeader } from '../components';

export default function NewPage() {
  return (
    <>
      {/* Hero section with gradient */}
      <div className="pt-32 pb-20 px-6 bg-gradient-to-b from-white via-[#F5E6D3] to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2416] mb-6">
            Page Title
          </h1>
          <p className="text-xl text-[#8B6F47]">
            Subtitle text
          </p>
        </div>
      </div>

      <Section id="section-id" background="white">
        <SectionHeader title="Section Title" />
        {/* Content */}
      </Section>

      {/* Bottom spacing for mobile nav */}
      <div className="pb-24 md:pb-0"></div>
    </>
  );
}
```

### Adding to Routes

```tsx
// /routes.ts
import NewPage from "./pages/NewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "new-page", Component: NewPage }, // Add here
    ],
  },
]);
```

### Updating Navigation

```tsx
// /pages/Layout.tsx
const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'New Page', href: '/new-page' }, // Add link
];
```

### Import Components

Use the barrel export for convenience:

```tsx
import {
  WarmButton,
  WarmCard,
  WarmBadge,
  IconButton,
  Navigation,
  Section,
  SectionHeader,
  Hero,
  ProjectCard,
  SkillCard,
  ContactSection,
  Footer,
  CursorGlow,
} from './components';
```

## Best Practices

### 1. Consistency
- Use design system components instead of creating one-off styles
- Reference semantic color variables rather than hardcoding hex values
- Maintain consistent spacing using defined padding/gap options

### 2. Component Organization
- **`/ui/`** - Basic building blocks (atoms)
- **`/common/`** - Custom reusable components
- **`/layout/`** - Structural components
- **`/features/`** - Composed, feature-specific components (molecules/organisms)
- **`/pages/`** - Full page components

### 3. Routing & Navigation
- Use React Router's Link component for internal navigation
- Hash links (`#section-id`) for same-page scrolling
- Update `activeSection` state for proper nav indicators

### 4. Responsive Development
- Design mobile-first, enhance for desktop
- Test both mobile pill nav and desktop nav behaviors
- Remember bottom spacing on mobile pages

### 5. Animation Guidelines
- Use `delay` prop to stagger list animations (0.1s increments)
- Keep animations subtle and purposeful
- Disable or simplify animations on mobile when necessary

### 6. Accessibility
- All interactive components include proper ARIA labels
- IconButton requires `label` prop for screen readers
- Maintain keyboard navigation support
- Ensure sufficient color contrast

### 7. Performance
- Use Motion's hardware-accelerated properties
- Lazy load images when appropriate
- Minimize layout shifts with proper aspect ratios

### 8. Images
- Use `ImageWithFallback` for new images
- Import images from Unsplash or appropriate sources
- Provide meaningful alt text

## Customization

### Modifying Colors

Edit `/styles/globals.css`:

```css
:root {
  --sage-green: #7BA05B; /* Change primary color */
  --warm-cream: #FFF8F0; /* Change background */
  /* etc. */
}
```

### Adjusting Typography

```css
:root {
  --font-size: 16px; /* Base font size */
  --font-weight-medium: 600;
  --font-weight-normal: 500;
}
```

### Component Variants

Extend existing components with className:

```tsx
<WarmButton 
  variant="primary" 
  className="shadow-2xl custom-class"
>
  Custom Button
</WarmButton>
```

## Examples

### Complete Layout Pattern

See `/pages/Layout.tsx` for the standard page wrapper:
- Navigation at top
- Outlet for page content
- Footer at bottom
- CursorGlow overlay
- Active section tracking

### Homepage

See `/pages/Home.tsx` for:
- Hero section with image
- Project grid
- Contact section
- Mobile spacing

### About Page

See `/pages/About.tsx` for:
- Gradient hero banner
- Two-column layout (story + skills)
- Timeline/experience cards
- Proper typography hierarchy

---

**Built with:** React, React Router, TypeScript, Tailwind CSS v4, Motion (Framer Motion)

**Design Philosophy:** Warm, cozy, approachable, professional
