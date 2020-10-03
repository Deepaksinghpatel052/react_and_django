"""dashify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from django.conf import settings
from django.conf.urls.static import static
from accounts import views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    # path('', TemplateView.as_view(template_name="index.html")),

    path('api/account', include('accounts.urls')),
    path('api/account/', include('accounts.urls')),

    path('api/dropdown-values', include('manage_dropdown_value.urls')),
    path('api/dropdown-values/', include('manage_dropdown_value.urls')),

    path('api/locations', include('manage_locations.urls')),
    path('api/locations/', include('manage_locations.urls')),

    path('api/social-platforms', include('social_media_platforms.urls')),
    path('api/social-platforms/', include('social_media_platforms.urls')),

    path('api/voice-faq', include('manage_voice_faqs.urls')),
    path('api/voice-faq/', include('manage_voice_faqs.urls')),

    path('api/reviews', include('reviews.urls')),
    path('api/reviews/', include('reviews.urls')),

    path('api/campaign', include('manage_campus.urls')),
    path('api/campaign/', include('manage_campus.urls')),

    path('api/queryes', include('queryes.urls')),
    path('api/queryes/', include('queryes.urls')),

    path('api/bloges', include('manage_bloges.urls')),
    path('api/bloges/', include('manage_bloges.urls')),

    path('api/faqs', include('manage_faqs.urls')),
    path('api/faqs/', include('manage_faqs.urls')),

    path('api/jobs', include('manage_jobs.urls')),
    path('api/jobs/', include('manage_jobs.urls')),

    path('api/package-pricing', include('manage_pricing.urls')),
    path('api/package-pricing/', include('manage_pricing.urls')),

    path('api/order-and-payments', include('manage_orders_and_payments.urls')),
    path('api/order-and-payments/', include('manage_orders_and_payments.urls')),

    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")	)

]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
