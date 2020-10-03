from django.urls import path
from . import views

urlpatterns = [
    path('add', views.AddVoiceFaqView.as_view()),
    path('get-all-faqs', views.GetAllFaqByUserIdView.as_view()),
    path('get-all-faqs-by-location-id', views.GetAllFaqByLocationIdView.as_view()),
    path('get-faqs-by-id', views.GetAllFaqByIdView.as_view()),
    path('edit-faq', views.EditFaqByIdView.as_view()),
    path('delete-faq', views.DeleteFaqByIdView.as_view()),
]