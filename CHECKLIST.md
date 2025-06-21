# ✅ Quick Setup Checklist

## 1. Appwrite Setup (5 minutes)

### Create Account & Project
- [ ] Go to https://cloud.appwrite.io
- [ ] Create free account
- [ ] Create new project
- [ ] Copy Project ID: `_________________`

### Create Database
- [ ] Go to Databases → Create Database
- [ ] Name: `birthday-website`
- [ ] Copy Database ID: `_________________`

### Create Collection
- [ ] Create Collection → Name: `birthday-messages`
- [ ] Copy Collection ID: `_________________`

### Add Attributes
- [ ] `name` (String, 100, Required)
- [ ] `message` (String, 1000, Required)  
- [ ] `approved` (Boolean, Required, Default: false)
- [ ] `timestamp` (DateTime, Required, Default: Now)

### Set Permissions
- [ ] Create: Any
- [ ] Read: Any  
- [ ] Update: Admins only
- [ ] Delete: Admins only

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill these:

```bash
# REQUIRED - From your Appwrite console
NEXT_PUBLIC_APPWRITE_PROJECT_ID=_________________
NEXT_PUBLIC_APPWRITE_DATABASE_ID=_________________  
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=_________________

# CUSTOMIZE - Change to your birthday
NEXT_PUBLIC_TARGET_DATE=2025-06-26T00:00:00.000Z

# OPTIONAL - Customize name
NEXT_PUBLIC_SITE_NAME=Birthday Magic
```

## 3. Install & Run

```bash
# Install dependencies
bun install
# OR
npm install

# Start development server
bun run dev
# OR  
npm run dev
```

## 4. Test Everything

- [ ] Visit http://localhost:3000
- [ ] Countdown appears (if date is in future)
- [ ] Go to /wish page
- [ ] Submit a test message
- [ ] Check Appwrite console for the message
- [ ] Approve message in Appwrite (set approved: true)
- [ ] Refresh main page to see message appear

## 🎉 Done!

Your birthday website is ready! 

**To approve messages:** Go to Appwrite Console → Your Database → Messages Collection → Edit message → Set `approved: true`
