from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_companies(request):
    """API endpoint to get companies data"""
    companies = [
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
    return Response(companies)

@api_view(['POST'])
def newsletter_signup(request):
    """API endpoint for newsletter signup"""
    email = request.data.get('email')
    if email:
        # Add your newsletter signup logic here
        # For now, just return success message
        return Response({'message': 'Thank you for signing up! You will receive updates from Quenchmark.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

