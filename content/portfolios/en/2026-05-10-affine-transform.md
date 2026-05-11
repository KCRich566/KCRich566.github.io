---
layout: default
title: "Affine Transform Viewer"
description: "Browser-base image viewer with mouse-driven panm cursor-centered zoom, and interative ROI selection with a live preview panel."
excerpt: "Interactive image viewer supporting affine pan/zoom and ROI cropping - fully client-side, no upload required."
data: 2025-05-10 10:00:00 +0800
feature: true
tool: affine-transform
image: /assets/images/logo180.png
---

### Project Overview
a brower-based image inspection tool that applies affine transformations (transplation and scaling) interactively with mouse input. Users can also draw a Region of Interest(ROI) rectangle and view a live magnified crop in a floating preview panel.

### Key Features
- **Pan**: Click and drag to translate the image freely.
- **Cursor-Centered Zoom**: Scroll wheel zooms in/out anchored to the cursor position (up to x 100 magnification)
- **ROI Selection**: Switch to ROI mode and frag to draw a selection rectangle over the image.
- **Live ROI Preview**: A floating canvas in the bottom-right corner shows the cropped region at full resolution
- **Reset View**: One-click to restore the fitted intitial view
- **Private first**: All processing is done locally in the browser - no image is uploaded.

### Technical Implementation
- **Affine Transform Math**: Zoom anchored at the mouse cursor via `newTx = mx - ( mx - tx ) x (newScale / scale)`
- **Canvas API**: All rendering(image, checkerboard background, ROI overlay, preview crop) is done on HTML5 Canvas.
- **Ref0based state**: Transform and drag state are stroed in `useRef` to avoid re-renders during continuous mouse wheel events
- **Non-passive wheel listener**: Manually attached via `addEventListener` with `{passive: false}` to support `preventDefault`

### Technical Stack
- **Framework**: React(Vite)
- **APIs**: Canvas 2D, FilemAPI, Blob/Boject URL
- **Language**: JavaScript(JSX)