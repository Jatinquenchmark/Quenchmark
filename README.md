# Quenchmark Website

A modern, interactive website for Quenchmark built with Django backend and React frontend.

## Features

- Interactive homepage with GSAP animations
- Infinite carousel for company ecosystem
- Newsletter signup
- Responsive design
- Background video support
- React frontend (coexists with vanilla JS)
- REST API endpoints

## Tech Stack

- **Backend**: Django 5.2.9
- **Frontend**: React 18 with Vite
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis
- **Deployment**: Render

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Setup

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

3. Install Python dependencies:
```bash
cd PageMain
pip install -r requirements.txt
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Run migrations:
```bash
cd ../PageMain
python manage.py migrate
```

6. Run the development servers:

**Terminal 1 - Django:**
```bash
cd PageMain
python manage.py runserver
```

**Terminal 2 - React:**
```bash
cd frontend
npm run dev
```

The Django server will be available at `http://127.0.0.1:8000/`
The React dev server will be available at `http://localhost:3000/`

In development, React runs on a separate dev server and proxies API calls to Django.

## Production Build

To build for production:

```bash
# From project root
npm run build
```

This will:
1. Build the React frontend
2. Collect Django static files

The built React files will be in `PageMain/static/react/`

## Project Structure

```
QuenchMark/
├── frontend/              # React frontend
│   ├── src/              # React source files
│   ├── index.html        # React entry HTML
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
├── PageMain/             # Django backend
│   ├── homepage/        # Main app
│   │   ├── api.py       # REST API endpoints
│   │   ├── views.py     # Django views
│   │   └── templates/   # Django templates
│   ├── PageMain/        # Project settings
│   ├── static/          # Static files (CSS, JS, images)
│   └── manage.py
├── build.sh              # Production build script
├── render.yaml           # Render deployment config
└── package.json          # Root build scripts
```

## API Endpoints

- `GET /api/companies/` - Returns companies data
- `POST /api/newsletter/` - Newsletter signup endpoint

## Deployment on Render

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Create a new Web Service on Render

3. Connect your repository

4. Configure the service:
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `cd PageMain && gunicorn PageMain.wsgi:application`

5. Set environment variables in Render dashboard:
   - `SECRET_KEY`: Generate a secure secret key
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: Your Render service URL (e.g., `your-app.onrender.com`)

6. Deploy!

The `render.yaml` file is included for infrastructure-as-code deployment.

## Technologies Used

- Django 5.2.9
- Django REST Framework
- React 18
- Vite
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth Scroll)
- WhiteNoise (Static file serving)
- Gunicorn (WSGI server)

## Development Notes

- React and vanilla JavaScript can coexist during migration
- React components mount to `#react-root` div
- Existing vanilla JS continues to work independently
- API endpoints are available at `/api/`
