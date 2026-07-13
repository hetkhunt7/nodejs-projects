# Unit Converter

A simple web app built with pure Node.js (no frameworks, no external packages) that converts between different units of measurement. Supports length, weight, and temperature conversions.

## Features

- Convert between units of length, weight, and temperature
- Clean card-based UI with tab navigation
- Form submissions handled server-side
- Result displayed with a Reset button to convert again
- No external dependencies — only built-in Node.js modules

## Requirements

- Node.js v14 or higher

## Installation

Clone or download the project, then navigate to the folder:

```bash
cd unit-converter
```

## Usage

```bash
node server.js
```

Then open your browser and visit:

```
http://localhost:3000
```

## Supported Units

**Length**
- Millimeter, Centimeter, Meter, Kilometer
- Inch, Foot, Yard, Mile

**Weight**
- Milligram, Gram, Kilogram
- Ounce, Pound

**Temperature**
- Celsius, Fahrenheit, Kelvin

## How It Works

1. Open the app in your browser
2. Click the tab for the unit type you want to convert
3. Enter a value and select the units to convert from and to
4. Click **Convert** to see the result
5. Click **Reset** to convert again

## Pages

| URL | Description |
|---|---|
| `/` or `/length` | Length conversion |
| `/weight` | Weight conversion |
| `/temperature` | Temperature conversion |

## How Conversion Works

**Length & Weight** — Everything is converted to a base unit first (meters for length, grams for weight), then converted to the target unit. This keeps the logic simple with just one lookup table.

**Temperature** — Uses standard formulas with Celsius as the middle step:
- Fahrenheit → Celsius: `(F - 32) × 5/9`
- Celsius → Kelvin: `C + 273.15`

## Project Structure

```
unit-converter/
├── server.js              # HTTP server and routing
├── pages/
│   ├── length.js          # Length conversion logic
│   ├── weight.js          # Weight conversion logic
│   ├── temperature.js     # Temperature conversion logic
│   └── templates.js       # HTML templates for all pages
├── package.json
└── README.md              # This file
```

## Project URL

```
https://roadmap.sh/projects/unit-converter
```