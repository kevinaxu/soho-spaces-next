## Task List

- Shared Components
- Home page
  - Hero section
    - [] Change this to a static image with transparent overlay (https://amberinteriordesign.com/)
  - Feature Projects section
    - [] Mobile - add a different set of photos for these (square)
- About page
  - Travel Inspiration
    - [] Mobile - display all 9 photos in viewport (like kwinmade)
- Project page
  - Horizontal Gallery
    - [] Desktop - 2 1/2 photos in view by default (do this AFTER new photos uploaded)
  - Before & Afters
    - [] Styling - change the background color of the section
    - [] Desktop - add arrows on left / right of the content to replace dots
    - [] Mobile - add arrows as controls for left and right switching
- Production readiness
  - [] Update Umamimk to point to production site
  - [] Update constants.ts - Prod base URL, updated image preview, etc
  - [] Update Netlify form to forward email to soho spaces email
  - [] Update Nav links
  - [] Verify all the page titles, favicons, metadata (preview image), SEO
  - [] Verify image responsiveness works correctly on different devices

## CUT LINE

- About page
  - CrossFade
    - [] Update this so that it fades on scroll
  - Timeline
    - [] Add icon highlighting when container is centered
- Explore page
  - [] Implement this using React Photo Gallery
- Refactor
  - [] Extract Image with Trim into separate component (Portfolio page, Team section)
  - [] Extract all the Layout constants and move them into the FullWidthSection, if possible
  - [] Extract all the 2-column layout with StickyBox into a separate component
  - [] Move all mockData into a separate /data directory (/data/mockData/about.json). This can be the output of `sanity dataset export production`
    - Does this need to be pushed? Really only needs to be used for local development

## Done

- About page
  - Timeline
    - [x] Remove extra padding from left side: https://github.com/mui/material-ui/issues/46639
- Shared components
  - Header
    - [x] Desktop - make this thinner. Update padding on desktop
  - Footer
    - [x] Logo should be transparent and slightly overflow on the top of the footer, creating a watermark effect
  - Drawer
    - [x] Mobile - update drawer styling (background color, shrink the horizontal size)
- Project page
  - Hero
    - [x] Make this horizontally scrollable on mobile
  - Materials component
    - [x] Update this so that details show up as tooltip
- Home page
  - Explore section
    - [x] Instead of using quilted, use separate ImageList option which will allow top / bottom images to align instead of custom calculation
  - Hero
    - [x] Hook up hero video dynamically when video is passed.
    - [x] Fix bug where page reload does not load the video again
  - Services
    - [x] Make mobile responsive
  - [x] Stacked deck - change this to 3
  - [x] Testimonial section - make this scrollable with multiple testimonials
- 404 Page
  - [x] Create a 404 page
- Contact page
  - [x] Hook up Netlify form to forward email to soho spaces email
- Production readiness
  - [x] Add analytics (https://umami.is/)
- Refactor
  - [x] "See the project" CTA links should be extracted into shared component
  - [x] Extract Image responsiveness into a shared component which handles viewport checks, `srcset`, etc
  - [x] Create an adapter that converts Sanity API into minimal mockData format
