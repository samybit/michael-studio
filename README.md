# Michael Medhat — Architect Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://michael-studio.vercel.app/)
![Next.js 15](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

A premium, interactive portfolio web application built for Michael Medhat, a lead spatial architect specializing in structural schemes and brutalist orchestrations. This project showcases a high-fidelity, interactive design experience intended to reflect the aesthetic precision and raw structural honesty of his work.

## Features

- **Brutalist Mobile-First Layout**: Engineered to be flawless and performant on mobile devices with compressed viewpoints, seamlessly scaling out to a horizontal split-pane configuration for desktop users.
- **Dynamic WebGL Background**: Integrated custom WebGL ray-tracing (`SideRays`) to create an interactive, dynamic canvas that shines through the transparent layout layer.
- **Fluid Shared Layout Animations**: Utilized Framer Motion for elegant, app-like transitions. Project cards smoothly scale into full-screen takeover modal galleries without visual disruption, resolving complex edge cases like iOS Safari fixed-scroll rendering.
- **Intelligent Asset Fallbacks**: Built custom React component wrappers (`SafeImage`) to monitor pre-hydration image load errors dynamically. Missing assets automatically fallback to beautiful brutalist inline SVG graphics (e.g. Le Corbusier style glasses for missing profile pictures).
- **Responsive Navigation**: Leverages custom interactive components like `StaggeredMenu` for mobile fly-out and `GooeyNav` for desktop hash-routing synchronization.
- **Next.js & Tailwind CSS**: Fully typed modern frontend stack leveraging strict Typescript configuration, Next.js Image Optimization (`next/image`), and custom layout/theme tokens defined via Tailwind v4.

## Tech Stack

- Next.js (App Router)
- React 18
- Tailwind CSS v4
- Framer Motion
- React Bits & Shadcn Components

## Author

Developed by Samy.
