from django.shortcuts import render

def index(request):
    """
    Homepage view for Quenchmark
    """
    context = {
        'companies': [
            {
                'name': 'TripSoul',
                'tagline': 'Smart Travel. Real Experiences.',
                'description': 'TripSoul is our travel solutions brand that delivers intelligent, end-to-end trip experiences.',
            },
            {
                'name': 'ParameterX',
                'tagline': 'Cybersecurity That Protects What Matters',
                'description': 'ParameterX is Quenchmark\'s cybersecurity division, built to secure businesses in a digital-first world.',
            },
            {
                'name': 'QuantMentor',
                'tagline': 'Where Data Meets Market Intelligence',
                'description': 'QuantMentor is Quenchmark\'s financial research and market intelligence company.',
            },
        ]
    }
    return render(request, 'homepage/index.html', context)
