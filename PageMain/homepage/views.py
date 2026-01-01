from django.shortcuts import render
from django.conf import settings
import json
import os
from pathlib import Path

def index(request):
    """
    Homepage view for Quenchmark
    Serves React app in production, allows both React and vanilla JS in development
    """
    context = {}
    
    # In production, load React manifest to get correct file paths
    if not settings.DEBUG:
        manifest_path = Path(settings.BASE_DIR) / 'static' / 'react' / 'manifest.json'
        if manifest_path.exists():
            try:
                with open(manifest_path, 'r') as f:
                    manifest = json.load(f)
                    # Get the main entry point
                    if 'index.html' in manifest:
                        main_js = manifest['index.html']['file']
                        css_files = manifest['index.html'].get('css', [])
                        context['react_main_js'] = f'react/{main_js}'
                        context['react_css'] = [f'react/{css}' for css in css_files] if css_files else []
            except (json.JSONDecodeError, KeyError):
                pass
    
    return render(request, 'homepage/index.html', context)
