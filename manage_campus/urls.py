from django.urls import path
from . import views

urlpatterns= [
    path('add-campaign', views.AddCampaignView.as_view()),
    path('get-all-campaign', views.GetAllCampaignView.as_view()),
    path('get-campaign-by-id', views.GetCampaignByIdView.as_view()),
    path('remove-campaign-by-id', views.RemoveCampaignByIdView.as_view()),
    path('remove-email-from-campaign-by-id', views.RemoveEmailByCampaignIdView.as_view()),
    path('add-emails-in-campaign', views.AddCampaignEmailView.as_view()),
    path('get-emails-by-campaign', views.GetEmailByIdView.as_view()),
    path('send-emaills', views.SendEmailsView.as_view()),
    path('upload-image-get-url', views.UploadImageView.as_view()),

]