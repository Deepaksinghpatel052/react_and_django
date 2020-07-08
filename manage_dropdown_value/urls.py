from django.urls import path
from . import views


urlpatterns = [
    path('business-categoryes', views.BusinessCategoryesView.as_view()),
    path('counrty', views.CounrtyView.as_view()),
    path('states', views.StatesView.as_view()),

]