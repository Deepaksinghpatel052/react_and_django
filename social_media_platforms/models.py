from django.db import models
from accounts.models import DfUser
import django
# Create your models here.

class DfSocialMedia(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Platform = models.CharField(max_length=50)
    Token = models.CharField(max_length=120,null=True,blank=True)
    Username = models.CharField(max_length=120,null=True,blank=True)
    Email = models.CharField(max_length=120,null=True,blank=True)
    Password = models.CharField(max_length=120,null=True,blank=True)
    Connect_status = models.CharField(max_length=120,null=True,blank=True)
    Other_info = models.TextField(null=True,blank=True)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)
    Update_Date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Platform
    class Meta:
        verbose_name_plural = "DF Social Media"