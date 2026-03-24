# Illuminate Client Console

**Live:** [preview--illuminate-console-ruler.lovable.app](https://preview--illuminate-console-ruler.lovable.app)

A client-facing reporting dashboard for Illuminate Global's B2B LinkedIn growth campaigns. Clients log in and see exactly where their campaign stands - weekly performance numbers, pipeline progression, phase status, and historical check-ins. No email reports, no manual updates, no waiting.

---

## Screens

**Weekly Brief** - the homepage. Shows the current week's content and engagement overview (posts made, impressions, engagement touchpoints) alongside a live pipeline snapshot (prospects engaged, contacted, accepted, replied, calls booked). A phase progress indicator shows where the client sits in the 4-phase workflow.

**Pipeline Preview** - a stepped funnel view of the outreach pipeline. Each stage shows the current count alongside a weekly delta (e.g. +12 this week), so clients can see momentum at every stage from first engagement to booked call.

**Phase Map** - a visual of the 4-phase Illuminate workflow (Offer Building, Profile Optimization, Content + Engagement, Engagement + Outbound), with each phase marked as Complete, Current, or upcoming. Clients always know what phase they're in and what's next.

**Weekly Check-ins** - historical performance by week, expandable per week. Clients can scroll back through every week of their engagement and see both content metrics and pipeline numbers in one place.

---

## How data flows

Campaign data lives in Google Sheets (managed by the Illuminate team). The dashboard reads from Sheets via the backend integration and renders it for the client in real time. No manual copy-paste, no static PDFs - the client console stays current as the team updates the sheet.

> Note: Google Sheets integration is built and wired up. Currently running on mock data while final connection is being completed.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| UI | shadcn/ui + Tailwind CSS |
| Data source | Google Sheets (via backend integration) |
| Testing | Vitest |
| Deployment | Lovable / Netlify |

---

## Local setup

```bash
# 1. Clone the repo
git clone https://github.com/lavaGlacier/illuminate-console-ruler.git
cd illuminate-console-ruler

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# Add your Google Sheets API credentials and sheet ID

# 4. Start the dev server
npm run dev
```

App runs at `http://localhost:8080` by default.

---

## Roadmap

- [ ] Complete Google Sheets live data connection
- [ ] Per-client authentication (each client sees only their data)
- [ ] Email digest - weekly summary sent automatically from dashboard data
- [ ] Mobile-optimised layout
- [ ] Exportable weekly report PDF

---

## Built by

[Sparsh Agarwal](https://www.linkedin.com/in/sparsh-illuminate/) - [illuminate.global](https://illuminate.global)
