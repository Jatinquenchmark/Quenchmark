#!/bin/bash

# Build script for Render deployment
# This script builds the React frontend and collects Django static files

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

