from django.urls import path
from . import views


urlpatterns = [
    path('add-account', views.AddSocialMedia.as_view()),
    path('get-all-social-platforms', views.AllSocialPlatforms.as_view()),
    path('get-one-social-platforms', views.OneSocialPlatforms.as_view()),
    path('remove-one-social-platforms', views.RemoveSocialPlatforms.as_view()),
]