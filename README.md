# Trivia-Discord-Bot
A real-time Discord trivia bot built with **Node.js**, backed by **PostgreSQL**, containerized with **Docker**, and deployed to **Fly.io**.

---

## Features

- Real-time trivia games
- Persistent leaderboards (PostgreSQL)
- Dockerized for easy deployment
- Hosted on Fly.io

---

## Tech Stack

- Node.js (Discord.js)
- PostgreSQL
- Docker
- Fly.io

---

## Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/discord-trivia-bot.git
   cd discord-trivia-bot
   ```
2. **Install depencies:**
   ```bash
   npm install
   ```
3. **Create .env file:**
   ```bash
   DISCORD_TOKEN=your-discord-bot-token
   DATABASE_URL=your-postgresql-database-url
   ```
4. **Run locally:**
   ```bash
   npm start
   ```
5. **Or run with Docker:**
   ```bash
   docker build -t discord-trivia-bot .
   docker run --env-file .env discord-trivia-bot
   ```

