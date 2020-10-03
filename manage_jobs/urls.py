from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', views.GetJobs.as_view()),
    path('one-job/<int:pk>', views.GetOneJob.as_view()),
    path('job-application', views.AddJobsApplication.as_view()),
]