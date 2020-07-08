from django.db import models
from accounts.models import DfUser
from manage_locations.models import DfBusinessLocation
import django
# Create your models here.

class DfLocationReviews(models.Model):
    Df_User = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Business_Location = models.ForeignKey(DfBusinessLocation, on_delete=models.SET_NULL, null=True, blank=True)
    Social_Plateform = models.CharField(max_length=50,null=True,blank=True)
    User_Name = models.CharField(max_length=50,null=True,blank=True)
    Reating = models.CharField(max_length=50,null=True,blank=True)
    Review = models.TextField(null=True,blank=True)
    User_Image_URL = models.TextField(max_length=50, null=True, blank=True)
    Review_dateTime = models.CharField(max_length=50, null=True, blank=True)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.User_Name
    class Meta:
        verbose_name_plural = "DF Business Reviews"
