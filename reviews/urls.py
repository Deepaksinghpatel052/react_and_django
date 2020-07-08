from django.urls import path
from . import views

urlpatterns = [
    path('save-review', views.SaveReviewsView.as_view()),
    path('get-all-review', views.GetAllReviewView.as_view()),
    ]