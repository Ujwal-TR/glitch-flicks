# GLITCH-FLICKS 🌐

Live at: https://glitch-flicks.vercel.app/

A world-class, futuristic social media marketing agency website built as an immersive 3D operating system.

## The Experience
Glitch-Flicks is not a traditional agency website. It is an interactive WebGL experience that feels like diving into a living, breathing algorithm. It features:

- **Cinematic Boot Sequence**: A buttery-smooth, 60fps terminal bootloader.
- **Continuous 3D Narrative**: Scroll-driven journey through a neon Data Sphere, Time Tunnel, Holographic Team, and Testimonial Galaxy.
- **Advanced Micro-interactions**: Custom glowing spotlight cards, glitch typography, and immersive custom cursors.
- **Functional Mission Control**: Working contact forms hooked up via EmailJS to initiate launch sequences.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Engine**: Three.js + React Three Fiber (R3F)
- **Animations**: Framer Motion
- **Scroll Physics**: Lenis
- **Typography**: Google Fonts (Orbitron & Share Tech Mono)

## Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up your environment variables (`.env.local`):
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```
4. Start the dev server:
```bash
npm run dev
```

## Deployment
This project is optimized for deployment on Vercel. 
```bash
npx vercel --prod
```

---
*We manufacture internet attention. The algorithm is ours.*
