from django.db import models
from django.contrib.auth.models import User
import django
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.
class testUser(models.Model):
    user_name = models.CharField(max_length=20)
    date = models.DateField()

    def __str__(self):
        return self.user_name
class DfUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    first_name = models.CharField(max_length=20,null=True,blank=True)
    last_name = models.CharField(max_length=20,null=True,blank=True)
    Company_name = models.CharField(max_length=20,null=True,blank=True)
    Country = models.CharField(max_length=20,null=True,blank=True)
    Phone = models.IntegerField(null=True,blank=True)
    Zip = models.IntegerField(null=True,blank=True)
    UserType = models.CharField(max_length=20,default="User")
    Last_login = models.DateTimeField(null=True,blank=True)
    Create_date =models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.first_name
    class Meta:
        verbose_name_plural = "DF User"

@receiver(post_save,sender=User)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)