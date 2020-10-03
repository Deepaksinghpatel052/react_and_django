from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', views.GetPriceList.as_view()),
    path('one-package/<int:pk>', views.GetOnePackage.as_view()),
    # path('job-application', views.AddJobsApplication.as_view()),
]