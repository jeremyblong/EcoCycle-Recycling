# ♻️ EcoCycle Recycling — E-Waste Logistics & Profit Optimization Platform

**EcoCycle** is a full-stack logistics and inventory platform that simplifies and streamlines the **collection, categorization, distribution, and monetization** of electronic waste (e-waste), with a focus on recovering precious metals like **gold, silver, platinum, and palladium**.

🎥 [Watch Platform Demo](https://youtu.be/3VObhdueeEU)  
🔗 [GitHub Repo](https://github.com/jeremyblong/EcoCycle-Recycling)

---

## 🌍 Why This Matters

E-waste is the fastest-growing waste stream globally — yet it contains **highly valuable materials** that go underutilized. EcoCycle empowers individuals, recyclers, and logistics partners to **capture value from electronics** while improving sustainability.

---

## 🚀 What EcoCycle Does

- 🗺 **Geo-tagged Pickup Listings**  
  Users post e-waste for pickup. Drivers and shippers see nearby loads via a live map system.

- 🚚 **Shipper Coordination**  
  Transporters can claim, sort, or organize pickups and drop-offs, optimizing logistics flow.

- 🧮 **Material Breakdown Tracking**  
  Items are categorized with estimated **metal yield**, total weight, and recycling potential.

- 📊 **Analytics + Forecasting**  
  Real-time charts and dashboards display projected gold/silver/palladium recovery & profits.

- 💰 **Monetization Module**  
  Tracks gold, silver, and palladium market rates — **shows estimated ROI** for each load.

- 🔄 **Crate + Tag System**  
  NFC and key-tag integration allows tracking of crates from drop-off to processing site.

---

## 🛠 Tech Stack

| Layer        | Tech Used                        |
|--------------|----------------------------------|
| Frontend     | React.js                         |
| Backend      | Node.js + Express.js             |
| Database     | MongoDB + Mongoose               |
| Mapping      | Google Maps API / Mapbox         |
| Real-time    | Socket.io                        |
| Data Parsing | Gold & silver price feeds (API)  |

---

## 📦 Key Features

- **Map-Driven Logistics** — Live freight listings, viewable by drivers & processors
- **Shipper Profiles** — Includes reliability rating, load capacity, service area
- **Precious Metal Recovery Tracking** — Estimate valuable metal return per crate
- **Admin Dashboard** — Monitor active listings, track site-wide yield, payouts
- **Crate NFC Tracking** — Container-specific tag system for scalable batch processing

---

## 📺 Demo Video

[![Watch on YouTube](https://blockchainsocialmedia.s3.us-east-1.amazonaws.com/Screenshot+2025-05-27+130644.png)](https://youtu.be/3VObhdueeEU)

> Walkthrough includes user roles (donors, shippers, recyclers), the map interface, and backend logic for value estimation and crate tracking.

---

## 🔮 Planned Enhancements

- Ethereum-based payout system for donors and drivers  
- On-chain logging of crate flow for transparency  
- AI-based sorting recommendations based on historical loads  
- Smart contract-based freight claims  
- Industrial integration: scanners + automated bin input

---

## 🧪 Run Locally

```bash
git clone https://github.com/jeremyblong/EcoCycle-Recycling.git
cd EcoCycle-Recycling

# Install dependencies
npm install

# Start backend
cd server && npm install (you might need to append --legacy-peer-deps) && npm run dev

# Start frontend
cd ../client && npm install (you might need to append --legacy-peer-deps) && npm start
