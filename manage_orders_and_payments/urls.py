from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('create-new-order', views.CreateNewOrder.as_view()),
    path('update-order/<int:pk>', views.UpdateOrder.as_view()),
    path('order-list', views.GetOrderList.as_view()),
    # path('job-application', views.AddJobsApplication.as_view()),
]