from django.urls import path
from . import views


urlpatterns = [
    path('add-location', views.AddLocationView.as_view()),
    path('get-all-locations', views.GetAllLocationView.as_view()),
    path('get-location-by-id', views.GetLocationByIdView.as_view()),
    path('remove-location-by-id', views.RemoveLocationByIdView.as_view()),
    path('edit-Location-Business-by-id', views.EditLocationBusinessView.as_view()),
    path('edit-Location-operations-hours-by-id', views.EditLocationHoursView.as_view()),
    path('edit-Location-payment-method-by-id', views.EditLocationPaymentMethodView.as_view()),
    path('location-connect-with-social-media', views.LocationConnectWithSocialSedia.as_view()),
    path('location-connect-remove-with-social-media', views.LocationConnectRemoveWithSocialSedia.as_view()),
    path('get-all-connection-of-one-location', views.GetAllConnectionOfOneLocation.as_view()),
    path('get-all-connection-of-business-locationn-to-platfrom', views.GetAllConnectionOfBusinessLocationnToPlatfrom.as_view()),
    path('update-images-files-by-location-id', views.UpdateImagesFilesByLocationIdView.as_view()),

    path('add-other-images-files-by-location-id', views.AddOtherImagesFilesByLocationIdView.as_view()),

    path('update-other-images-files-by-location-id-image-id', views.UpdateOtherImagesFilesByLocationIdImageIdView.as_view()),

    path('remove-other-images-files-by-location-id-image-id', views.RemoveOtherImagesFilesByLocationIdImageIdView.as_view()),
    path('remove-all-other-images-files-by-location-id', views.RemoveAllOtherImagesFilesByLocationIdView.as_view()),

    path('get-open-hours-by-location-id', views.GetOpenHourByLocationIdView.as_view()),
    # path('register', views.UserRegistration.as_view()),
    # path('login', views.LoginView.as_view(),name="login"),
    # path('logout', views.LogoutView.as_view(),name="Logout"),
]