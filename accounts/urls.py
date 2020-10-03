from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', views.UserList.as_view()),
    path('register', views.UserRegistration.as_view()),
    path('get-all-user', views.GgetAllUser.as_view()),
    path('login', csrf_exempt(views.LoginView.as_view()),name="login"),
    path('logout', views.LogoutView.as_view(),name="Logout"),
    path('get-login-user-info', views.LoginUserInfoView.as_view(),name="login_user_info"),
    path('account-activate', views.ActivateYoutAccount.as_view(),name="Testdata"),
    path('send-varification-link', views.SendVarificationLink.as_view(),name="Testdata"),
    path('get-link-of-forget-password', views.GetLinkOfForgetPassword.as_view(),name="Forget_password_link"),
    path('reset-password', views.ResetPasswordView.as_view(),name="Reset_password"),
    path('Testdata', views.Testdata.as_view(),name="Testdata"),
]