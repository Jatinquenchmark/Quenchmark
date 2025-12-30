# Render Deployment Guide

## Prerequisites

All required files have been created:
- ✅ `requirements.txt` - Python dependencies
- ✅ `Procfile` - Process file for Render
- ✅ `settings.py` - Updated for production with environment variables

## Step-by-Step Deployment

### 1. Push to Git Repository

First, commit and push your code to GitHub, GitLab, or Bitbucket:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Render Account

1. Go to https://render.com
2. Sign up or log in
3. Connect your Git provider (GitHub/GitLab/Bitbucket)

### 3. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your repository
3. Select the repository and branch (usually `main` or `master`)

### 4. Configure the Service

Fill in the following settings:

- **Name**: `quenchmark` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (or set to `PageMain` if needed)
- **Build Command**: 
  ```
  cd PageMain && pip install -r requirements.txt && python manage.py collectstatic --noinput
  ```
- **Start Command**: 
  ```
  cd PageMain && gunicorn PageMain.wsgi:application
  ```

### 5. Set Environment Variables

Click on **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | Generate using: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `your-app-name.onrender.com` (Replace with your actual Render URL) |
| `DJANGO_SETTINGS_MODULE` | `PageMain.settings` |

**Note**: After deployment, Render will provide your app URL. Update `ALLOWED_HOSTS` with that URL.

### 6. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Run collectstatic
   - Start your application
3. Wait for deployment to complete (usually 2-5 minutes)

### 7. Update ALLOWED_HOSTS

After first deployment:
1. Copy your Render URL (e.g., `quenchmark-xyz.onrender.com`)
2. Go to **Environment** tab
3. Update `ALLOWED_HOSTS` with your actual URL
4. Save and redeploy

## Troubleshooting

### Static Files Not Loading

- Ensure `collectstatic` runs in build command
- Check that `STATIC_ROOT` is set correctly
- Verify WhiteNoise middleware is in `MIDDLEWARE`

### Application Crashes

- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure `SECRET_KEY` is set (not using default)

### Database Issues

- SQLite works for small projects
- For production, consider PostgreSQL (available on Render)

## Post-Deployment

1. Test all pages and functionality
2. Verify static files (CSS, JS, images) load correctly
3. Check background video plays
4. Test newsletter signup form
5. Monitor logs for any errors

## Free Tier Limitations

- App spins down after 15 minutes of inactivity
- Cold starts may take 30-60 seconds
- Limited to 750 hours/month
- For production, consider paid plans

## Support

For issues, check:
- Render logs in dashboard
- Django error pages
- Browser console for frontend errors

