# Quenchmark Website

A modern, interactive website for Quenchmark built with Django.

## Features

- Interactive homepage with GSAP animations
- Infinite carousel for company ecosystem
- Newsletter signup
- Responsive design
- Background video support

## Local Development

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
cd PageMain
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Collect static files:
```bash
python manage.py collectstatic
```

6. Run the development server:
```bash
python manage.py runserver
```

## Deployment to Render

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Create a new Web Service on Render:
   - Connect your repository
   - Set the following:
     - **Build Command**: `cd PageMain && pip install -r requirements.txt && python manage.py collectstatic --noinput`
     - **Start Command**: `cd PageMain && gunicorn PageMain.wsgi:application`
     - **Environment**: Python 3

3. Set Environment Variables:
   - `SECRET_KEY`: Generate a new secret key
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `your-app-name.onrender.com` (your Render URL)
   - `DJANGO_SETTINGS_MODULE`: `PageMain.settings`

4. Deploy!

## Project Structure

```
PageMain/
├── homepage/          # Main app
├── PageMain/          # Project settings
├── static/            # Static files (CSS, JS, images)
├── manage.py
├── requirements.txt
└── Procfile
```

## Technologies Used

- Django 5.2.9
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth Scroll)
- WhiteNoise (Static file serving)
- Gunicorn (WSGI server)

