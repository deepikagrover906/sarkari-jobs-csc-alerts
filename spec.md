# Sarkari Jobs & CSC Alerts

## Current State
New project with empty backend and frontend scaffold.

## Requested Changes (Diff)

### Add
- Home page with hero banner for Government Jobs & CSC Alerts
- Jobs listing section showing government job postings (title, department, last date, vacancy count, qualification, apply link)
- CSC Alerts section for Common Service Centre news and updates
- Latest Notifications ticker/marquee at top
- Category filters: All, Central Govt, State Govt, CSC, Railway, Banking, Defence
- Job detail cards with key info
- Footer with WhatsApp channel link (https://whatsapp.com/channel/0029Vadt7Lc0G0XqA5g4Om3v) and contact details (Mr. Ankush Gulia, 9588301143)
- Admin panel to add/edit/delete jobs and alerts (password protected)

### Modify
- Nothing existing to modify

### Remove
- Nothing to remove

## Implementation Plan
1. Backend: Store job postings (id, title, department, category, vacancies, lastDate, qualification, applyLink, isActive, postedDate) and alerts (id, title, description, date, isActive)
2. Backend: CRUD operations for jobs and alerts; public read, admin write (simple password gate)
3. Frontend: Header with site name and nav
4. Frontend: Notification ticker marquee
5. Frontend: Hero section
6. Frontend: Category filter tabs
7. Frontend: Job cards grid
8. Frontend: CSC Alerts section
9. Frontend: Footer with WhatsApp channel button and contact info
10. Frontend: Admin panel (add/edit/delete jobs & alerts)
