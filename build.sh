#!/bin/bash

# Build script for Render deployment
# Note: Render automatically installs Python dependencies from requirements.txt in root

set -e  # Exit on error

echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Collecting Django static files..."
cd PageMain
python manage.py collectstatic --noinput
cd ..

echo "Build complete!"

