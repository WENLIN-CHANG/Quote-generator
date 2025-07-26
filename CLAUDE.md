# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple client-side quote generator web application written in vanilla HTML, CSS, and JavaScript. The app displays inspirational quotes in Traditional Chinese and allows users to save their favorite quotes to localStorage.

## Development Commands

This is a static web application with no build process. To run:
- Open `index.html` directly in a browser
- Or serve via any local HTTP server (e.g., `python -m http.server 8000`)

## Architecture

### Core Components
- `index.html`: Main HTML structure with quote display area and favorite quotes list
- `app.js`: Main application logic handling quote display, favorites management, and localStorage
- `quote.json`: JSON array containing 51 inspirational quotes in Traditional Chinese
- `style.css`: Styling with warm color scheme and responsive design

### Key Functionality
- **Quote Display**: Fetches quotes from `quote.json` and displays random quotes
- **Favorites System**: Users can save quotes to favorites with localStorage persistence
- **Delete Functionality**: Event delegation pattern for removing favorites with emoji delete buttons
- **Error Handling**: Graceful fallback when quote loading fails

### Data Flow
1. App loads and fetches `quote.json` via fetch API
2. Initial random quote displayed on page load
3. User interactions trigger new quotes or save to favorites
4. Favorites stored in localStorage as JSON array
5. Favorites list dynamically updated in DOM

### Code Patterns
- Uses vanilla JavaScript with DOM manipulation
- Event listeners for user interactions
- localStorage for data persistence
- Async/await not used - relies on Promise chains
- Chinese comments throughout the codebase