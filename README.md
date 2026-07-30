# QA Challenge App

A React + TypeScript web application built with Vite, designed to host QA testing challenges.

## Prerequisites

You need **Node.js** (v18 or higher) and **npm** installed before running this project.

### Installing Node.js

**Windows**
1. Go to https://nodejs.org and download the **LTS** installer (`.msi`)
2. Run the installer and follow the steps — npm is included
3. Open a new Command Prompt or PowerShell and verify:
   ```
   node --version
   npm --version
   ```

**macOS**
1. Go to https://nodejs.org and download the **LTS** installer (`.pkg`)
2. Run the installer — npm is included
3. Open a new Terminal and verify:
   ```
   node --version
   npm --version
   ```

> **Alternative (macOS):** If you use Homebrew, you can run `brew install node` instead.

---

## Setup

Clone or download this repository, then open a terminal in the project root folder.

**Windows — Command Prompt or PowerShell**
```
cd path\to\qa-challenge
npm install
```

**macOS — Terminal**
```
cd path/to/qa-challenge
npm install
```

This installs all dependencies listed in `package.json` into a local `node_modules` folder.

---

## Running the App

```
npm run dev
```

Vite will start a local development server. You should see output like:

```
  VITE v5.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser. The app hot-reloads automatically when you save changes.

---

## Building for Production

```
npm run build
```

The compiled output will be in the `dist/` folder. To preview it locally:

```
npm run preview
```

---

## Project Structure

```
qa-challenge/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Landing page with challenge links
│   │   ├── Home.module.css
│   │   ├── Challenge1.tsx        # Astrological sign challenge
│   │   └── Challenge1.module.css
│   ├── utils/
│   │   └── astrology.ts          # Date parsing and sign calculation logic
│   ├── App.tsx                   # Route definitions
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles and background
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Challenges

### Challenge 1 — Astrological Sign

Navigate to **Challenge 1** from the home page.

- Enter a **name** and a **birthday date**
- The **Find Astrological Sign** button becomes active once both fields have content
- The date field accepts any input, but the expected format is `dd-mm-yyyy` (e.g. `15-03-1990`)
- Submitting a date in any other format will return an error message
- On a valid date, the page displays the person's astrological sign



# Test Notes

## Covered scenarios

### Core functionality

- `User can find astrological sign with valid birthday`

### Form validation

- `Button is disabled until both name and birthday are entered`
- `Button becomes disabled when a field is cleared`

### Date validation

- `User sees error when birthday format is invalid`
- `User sees error when birthday is not a valid date`
- `Leap year date is accepted`
- `Non leap year February 29 is rejected`

### Zodiac boundary testing

- `Zodiac boundary dates`
  - Verifies zodiac sign calculation at the transition dates between zodiac signs.

## Known issue found

Invalid calendar dates and invalid date formats display the same validation message:

 "Invalid date. Please use the format dd-mm-yyyy."

This message is misleading because dates such as `31-02-2000` or `29-02-2001` use the correct format but represent invalid calendar dates.

A clearer validation message would distinguish between:
- invalid birthday format
- invalid calendar date