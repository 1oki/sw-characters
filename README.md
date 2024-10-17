# Star Wars Characters App

This is a **React** and **Redux** based application that fetches and displays a list of Star Wars characters. Users can filter characters by gender, search by name, and mark characters as favorites. It also includes pagination for better navigation through large datasets.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Character Listing**: Fetches and displays a list of Star Wars characters.
- **Search**: Search characters by name.
- **Gender Filter**: Filter characters by gender.
- **Favorites**: Mark characters as favorite and view them in a separate section.
- **Pagination**: Navigate through large lists of characters using pagination.
- **Responsive UI**: Mobile-friendly design using TailwindCSS.

## Tech Stack

- **React** — Frontend JavaScript library
- **Redux Toolkit** — State management
- **TailwindCSS** — Utility-first CSS framework
- **REST API** — Fetch data from external Star Wars API
- **PostCSS** — CSS transformations

## Installation

Follow these steps to get a local copy of the project up and running:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/1oki/sw-characters.git
    cd sw-characters
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

4. **Open the app**:
    Navigate to `http://localhost:3000` to view the application in the browser.

## Usage

1. **Search Characters**: Use the search bar at the top to find characters by name.
2. **Filter by Gender**: Select a gender from the dropdown to filter the characters.
3. **Add to Favorites**: Click the heart icon on a character's card to add them to your favorites.
4. **View Favorites**: Click on the "Favorites" section to view all the characters you've marked as favorite.
5. **Pagination**: Use the pagination controls at the bottom to navigate through the list of characters.

## Folder Structure

```bash
sw-characters/
│
├── public/                     # Public assets and static files
│   └── index.html              # Main HTML file
│
├── src/                        # Source files
│   ├── components/             # Reusable UI components
│   │   ├── app/                # Main app component
│   │   ├── character-card/     # Character card component
│   │   ├── characters-page/    # Characters listing page
│   │   ├── favorite-characters-page/ # Favorite characters page
│   │   ├── gender-filter-select-form/ # Gender filter form
│   │   ├── header/             # App header component
│   │   ├── pagination/         # Pagination component
│   │   ├── search-panel/       # Search panel
│   │   ├── spinner/            # Loading spinner
│   ├── store/                  # Redux slices and store configuration
│   ├── index.js                # Main entry point
│   ├── index.css               # Global styles
│
├── package.json                # Project metadata and dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation (you are here)


