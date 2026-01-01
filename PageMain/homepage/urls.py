from django.urls import path
from . import views
from . import api

app_name = 'homepage'

urlpatterns = [
    path('', views.index, name='index'),
    # API endpoints
    path('api/companies/', api.get_companies, name='api-companies'),
    path('api/newsletter/', api.newsletter_signup, name='api-newsletter'),
]

