from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', views.GetFaqs.as_view()),
    path('one-faq/<int:pk>', views.GetOneFaq.as_view()),
]