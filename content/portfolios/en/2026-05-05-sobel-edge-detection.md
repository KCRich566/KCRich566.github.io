---
layout: default
title: "Edge Detection App"
description: "Browser-based edge detection app supporting Sobel, Canny, Prewitt, Scharr, and Laplacian methods with adjustable thresholds and preprocessing."
date: 2026-05-05 11:00:00 +0800
excerpt: "Interactive edge detection app supporting Sobel, Canny, Prewitt, Scharr, and Laplacian processing directly in the browser."
featured: true
tool: edge-detector
image: /assets/images/logo180.png
---

## Edge Detection App

{% include edge-detector.html %}

### Project Overview
Implemented a browser-based edge detection application for comparing common computer vision edge operators without a backend. The app loads an image locally, converts it to grayscale, applies optional blur preprocessing, and renders the selected edge map on Canvas.

### Technical Implementation

#### Supported Methods
- **Sobel**: Gradient-based edge detection using horizontal and vertical convolution kernels
- **Canny**: Multi-stage edge detection with blur, gradient magnitude, non-maximum suppression, double thresholding, and hysteresis
- **Prewitt**: Lightweight gradient operator for general edge extraction
- **Scharr**: Gradient operator with stronger rotational symmetry than Sobel
- **Laplacian**: Second-derivative edge response for rapid intensity transitions

#### Core Features
1. **Image Processing Pipeline**
   - Local image loading through the browser
   - Grayscale conversion
   - Optional blur preprocessing
   - Method-specific edge computation
   - Threshold-based output rendering

2. **Advanced Processing Options**
   - Adjustable high threshold
   - Adjustable Canny low threshold
   - Optional inverted output
   - Canvas result export

3. **Visualization & Output**
   - Side-by-side original and processed image
   - Instant method switching and parameter tuning
   - PNG download for the processed result

### Technical Stack
- **Languages**: JavaScript, HTML, CSS
- **APIs**: Canvas, File API, Blob/Object URL
- **Architecture**: Reusable Jekyll include with standalone CSS and JavaScript assets

### Performance Metrics
- **Processing**: Runs fully in the browser
- **Privacy**: Images remain local and are not uploaded
- **Input Size**: Large images are scaled for responsive browser processing

### Applications
- **Machine Vision Systems**: Quality inspection in manufacturing
- **Optical Character Recognition (OCR)**: Text boundary detection
- **Object Detection**: Pre-processing for deep learning models
- **Medical Imaging**: Anatomical structure boundary identification
- **Autonomous Vehicles**: Road lane and obstacle detection
- **Document Analysis**: Text region extraction

### Key Achievements
- Implemented multiple edge operators in one UI
- Added a practical Canny-style pipeline for browser use
- Built parameter controls for threshold, blur, and display mode
- Kept the app client-side for privacy and easy GitHub Pages deployment

### Result
A reusable edge detection tool that demonstrates core computer vision techniques directly inside a static portfolio page, while remaining easy to extend with additional filters or visualization modes.
