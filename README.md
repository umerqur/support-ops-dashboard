# Support Operations Dashboard

A professional React dashboard for analyzing support ticket data with interactive visualizations and real-time insights.

![Dashboard Preview](https://img.shields.io/badge/React-Dashboard-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Live Demo

🚀 [View Live Dashboard](https://umerqur.github.io/support-ops-dashboard/)

## Features

### Key Performance Indicators
- 📊 **Total Tickets** - Complete ticket volume
- ⚠️ **Escalation Rate** - Percentage of escalated tickets
- 👎 **Negative Sentiment** - Customer dissatisfaction rate
- ⏱️ **Avg Resolution Time** - Average hours to resolve tickets

### Interactive Visualizations
- 📈 **The 4-Hour Tipping Point** - Line chart showing how negative sentiment increases after 4 hours
- 📊 **Top 5 Service Areas** - Bar chart of most common support categories
- 📋 **Segment Comparison** - Table comparing Enterprise vs SMB vs Startup metrics

### Smart Features
- 🔍 **Filters** - Filter by Customer Segment and Service Area
- 💾 **Download Data** - Export raw Excel data
- 🎨 **Professional Design** - Ingram Micro blue theme (#0D6EFD)

## Tech Stack

- **React + Vite + TypeScript** - Modern React development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Beautiful data visualizations
- **XLSX** - Excel file parsing
- **Lucide React** - Clean, consistent icons
- **GitHub Pages** - Automated deployment

## Quick Start

```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Data Source

The dashboard reads from `ticket_data_clean.xlsx` containing 156 support tickets with columns:
- Ticket ID
- Customer Segment (Enterprise/SMB/Startup)
- Service Area
- Priority
- First Response Time (hours)
- Resolution Time (hours)
- Escalated (Yes/No)
- Sentiment (Positive/Neutral/Negative)
- Created Date

## Deployment

Automatically deploys to GitHub Pages on push to main/master branch via GitHub Actions.

### Setup GitHub Pages
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main/master branch to deploy

## Project Structure

```
support-ops-dashboard/
├── dashboard/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── types.ts       # TypeScript types
│   │   └── utils.ts       # Data utilities
│   ├── public/
│   │   └── ticket_data_clean.xlsx
│   └── vite.config.ts
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── ticket_data_clean.xlsx # Original data
└── README.md
```

## License

MIT

## Contributing

Issues and pull requests are welcome!

## Author

Created for Ingram Micro Support Operations