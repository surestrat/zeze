# 🎂 Birthday Website Setup Guide

This guide will walk you through setting up your beautiful birthday website with all the necessary configurations.

## 📋 Prerequisites

- Node.js 18+ or Bun
- An Appwrite account (free at [appwrite.io](https://appwrite.io))
- A code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Environment Variables Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

### 2. Appwrite Setup (Database for Birthday Messages)

#### Step 1: Create Appwrite Account
1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Sign up for a free account
3. Create a new project

#### Step 2: Get Project Configuration
1. In your Appwrite console, go to **Settings** > **General**
2. Copy your **Project ID**
3. Your endpoint will be: `https://cloud.appwrite.io/v1`

#### Step 3: Create Database and Collection
1. Go to **Databases** in the sidebar
2. Click **Create Database**
3. Name it: `birthday-website`
4. Copy the **Database ID**

#### Step 4: Create Messages Collection
1. Inside your database, click **Create Collection**
2. Name it: `birthday-messages`
3. Copy the **Collection ID**

#### Step 5: Configure Collection Schema
Add these attributes to your collection:

| Attribute Key | Type     | Size | Required | Default |
|---------------|----------|------|----------|---------|
| `name`        | String   | 100  | ✅ Yes   | -       |
| `message`     | String   | 1000 | ✅ Yes   | -       |
| `approved`    | Boolean  | -    | ✅ Yes   | `false` |
| `timestamp`   | DateTime | -    | ✅ Yes   | Now     |

#### Step 6: Set Collection Permissions
1. Go to **Settings** tab in your collection
2. Add these permissions:
   - **Create**: Any (so visitors can submit messages)
   - **Read**: Any (so messages can be displayed)
   - **Update**: Admins only (for approval)
   - **Delete**: Admins only

### 3. Configure Environment Variables

Edit your `.env.local` file with your actual values:

```bash
# Appwrite Configuration (REQUIRED)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-actual-database-id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your-actual-collection-id

# Application Configuration (CUSTOMIZABLE)
NEXT_PUBLIC_TARGET_DATE=2025-06-26T00:00:00.000Z  # Change to your birthday
NEXT_PUBLIC_SITE_NAME=Birthday Magic               # Change to your preferred name
NEXT_PUBLIC_MUSIC_ENABLED=true                     # Enable/disable background music

# Development Configuration (KEEP AS IS)
NODE_ENV=development

# Security (GENERATE NEW VALUES)
NEXTAUTH_SECRET=your-random-secret-key-here        # Generate a random string
NEXTAUTH_URL=http://localhost:3000                 # Your local dev URL
```

### 4. Install Dependencies

```bash
# Using npm
npm install

# OR using bun (faster)
bun install
```

### 5. Run the Development Server

```bash
# Using npm
npm run dev

# OR using bun
bun run dev
```

Your site will be available at: http://localhost:3000

## 🎨 Customization Options

### Change Birthday Date
```bash
NEXT_PUBLIC_TARGET_DATE=2025-12-25T00:00:00.000Z  # Christmas example
```

### Change Site Name
```bash
NEXT_PUBLIC_SITE_NAME=Sarah's Special Day
```

### Disable Background Music
```bash
NEXT_PUBLIC_MUSIC_ENABLED=false
```

## 🔧 Advanced Configuration

### Adding Background Music
1. Place your music file in `public/music/birthday-ambience.mp3`
2. Supported formats: MP3, WAV, OGG
3. Recommended: Soft, ambient music under 5MB

### Moderating Messages
1. Go to your Appwrite console
2. Navigate to your messages collection
3. Find messages with `approved: false`
4. Edit and set `approved: true` to make them visible

### Custom Domain (Production)
1. Deploy to Vercel, Netlify, or your preferred platform
2. Update `NEXTAUTH_URL` to your domain
3. Update Appwrite allowed origins in project settings

## 🛠️ Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint | ✅ | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID | ✅ | `64f7d8e123abc456` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Your database ID | ✅ | `birthday-db-id` |
| `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` | Your collection ID | ✅ | `messages-collection-id` |
| `NEXT_PUBLIC_TARGET_DATE` | Birthday countdown date | ✅ | `2025-06-26T00:00:00.000Z` |
| `NEXT_PUBLIC_SITE_NAME` | Website title | ❌ | `Birthday Magic` |
| `NEXT_PUBLIC_MUSIC_ENABLED` | Enable background music | ❌ | `true` |
| `NEXTAUTH_SECRET` | Security secret | ❌ | Random string |
| `NEXTAUTH_URL` | Application URL | ❌ | `http://localhost:3000` |

## 🎯 Features Included

- ⏰ **Countdown Timer**: Counts down to the special day
- 🎂 **Birthday Message Board**: Visitors can leave messages
- 💕 **Compliments Carousel**: Beautiful rotating compliments
- 🎵 **Background Music**: Optional ambient music
- 🌙 **Dark/Light Mode**: Theme toggle for user preference
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ♿ **Accessible**: Built with accessibility in mind
- 🚀 **Performance Optimized**: Fast loading and smooth animations

## 🐛 Troubleshooting

### Issue: "Failed to connect to Appwrite"
- Check your `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct
- Verify your Appwrite project is active
- Ensure your domain is in allowed origins (Appwrite Settings > General)

### Issue: "Messages not appearing"
- Check collection permissions allow "Read" for "Any"
- Verify messages are approved (`approved: true`)
- Check your `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` is correct

### Issue: "Countdown not working"
- Verify `NEXT_PUBLIC_TARGET_DATE` format is correct
- Date should be in future
- Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

### Issue: "Build errors"
- Delete `.next` folder and run `npm run build` again
- Check all environment variables are set
- Ensure no syntax errors in `.env.local`

## 📞 Support

If you need help:
1. Check this guide first
2. Verify all environment variables are correct
3. Check the browser console for error messages
4. Ensure Appwrite is properly configured

## 🎉 You're Ready!

Your beautiful birthday website should now be running! The countdown will show until the target date, then reveal the full birthday experience with messages, compliments, and all the love! 💕
