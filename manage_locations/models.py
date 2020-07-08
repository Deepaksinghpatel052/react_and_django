from django.db import models
from accounts.models import DfUser
import django
from datetime import date
from manage_dropdown_value.models import DfBusinessCategory,DfCountry,DfState
from social_media_platforms.models import DfSocialMedia
# Create your models here.
def user_directory_path(instance, filename):
    project_id_in_list = instance.Store_Code.split(" ")
    today_date = date.today()
    project_id_in_string = '_'.join([str(elem) for elem in project_id_in_list])
    return '{0}/{1}'.format(project_id_in_string+"/locations/logo/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)

def user_directory_path_for_banner(instance, filename):
    project_id_in_list = instance.Store_Code.split(" ")
    today_date = date.today()
    project_id_in_string = '_'.join([str(elem) for elem in project_id_in_list])
    return '{0}/{1}'.format(project_id_in_string+"/locations/banner/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)

class DfBusinessLocation(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Store_Code = models.CharField(max_length=50)
    Business_Logo = models.ImageField(upload_to=user_directory_path,null=True,blank=True)
    Location_name = models.CharField(max_length=120,null=True,blank=True)
    Business_category = models.ForeignKey(DfBusinessCategory, on_delete=models.SET_NULL, null=True, blank=True)
    Additional_catugory = models.TextField(null=True,blank=True)
    Address_1 = models.TextField(max_length=120,null=True,blank=True)
    Address_2 = models.TextField(max_length=120,null=True,blank=True)
    Country = models.ForeignKey(DfCountry, on_delete=models.SET_NULL, null=True, blank=True)
    State = models.ForeignKey(DfState, on_delete=models.SET_NULL, null=True, blank=True)
    City = models.CharField(max_length=120, null=True, blank=True)
    Zipcode = models.IntegerField(null=True, blank=True)
    Phone_no = models.IntegerField(null=True , blank=True)
    Website = models.URLField(null=True,blank=True)
    Franchise_Location = models.BooleanField(default=True)
    Do_not_publish_my_address = models.BooleanField(default=True)
    Business_Owner_Name = models.CharField(max_length=120,null=True,blank=True)
    Owner_Email = models.EmailField(null=True,blank=True)
    Business_Tagline = models.CharField(max_length=120,null=True,blank=True)
    Year_Of_Incorporation = models.IntegerField()
    About_Business = models.TextField(null=True,blank=True)
    Facebook_Profile = models.CharField(max_length=120,null=True,blank=True)
    Instagram_Profile = models.CharField(max_length=120,null=True,blank=True)
    Twitter_Profile = models.CharField(max_length=120,null=True,blank=True)
    Business_Cover_Image = models.ImageField(upload_to=user_directory_path_for_banner)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)
    Update_Date = models.DateTimeField(default=django.utils.timezone.now)
    def __str__(self):
        return self.Store_Code
    class Meta:
        verbose_name_plural = "DF Business Location"


def user_directory_path_for_other_image(instance, filename):
    project_id_in_list = instance.Business_Location.Store_Code.split(" ")
    project_id_in_string = '_'.join([str(elem) for elem in project_id_in_list])
    today_date = date.today()
    return '{0}/{1}'.format(project_id_in_string+"/locations/other/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)

class DfLocationImage(models.Model):
    Business_Location = models.ForeignKey(DfBusinessLocation, related_name="Df_location_image", on_delete=models.SET_NULL, null=True, blank=True)
    Image = models.ImageField(upload_to=user_directory_path_for_other_image)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)
    Update_Date = models.DateTimeField(default=django.utils.timezone.now)
    def __str__(self):
        return str(self.Image)
    class Meta:
        verbose_name_plural = "DF Location Other Image"



class DfLocationOpenHours(models.Model):
    Business_Location = models.ForeignKey(DfBusinessLocation, related_name="Df_location_poen_hour",on_delete=models.SET_NULL, null=True, blank=True)
    date = models.CharField(max_length=20,null=True,blank=True)
    Day = models.CharField(max_length=20,null=True,blank=True)
    Type = models.CharField(max_length=20,null=True,blank=True)
    Open_status = models.CharField(max_length=20,null=True,blank=True)
    start_time_1 = models.CharField(max_length=20,null=True,blank=True)
    end_time_1 = models.CharField(max_length=20,null=True,blank=True)
    start_time_2 = models.CharField(max_length=20,null=True,blank=True)
    end_time_2 = models.CharField(max_length=20,null=True,blank=True)
    Update_Date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return str(self.Day)
    class Meta:
        verbose_name_plural = "DF Location Open Hours"



class DfLocationPaymentMethod(models.Model):
    Business_Location = models.ForeignKey(DfBusinessLocation, related_name="Df_location_payments",on_delete=models.SET_NULL, null=True, blank=True)
    Payment_Method = models.CharField(max_length=20, null=True,blank=True)

    def __str__(self):
        return str(self.Payment_Method)

    class Meta:
        verbose_name_plural = "DF Location Payment Method"


class DfLocationConnectPlatform(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Business_Location = models.ForeignKey(DfBusinessLocation, related_name="Df_location_connectWith",on_delete=models.SET_NULL, null=True, blank=True)
    Social_Platform = models.ForeignKey(DfSocialMedia, related_name="Df_location_connectWith",on_delete=models.SET_NULL, null=True, blank=True)
    Connection_Status = models.CharField(max_length=20,null=True,blank=True)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)
    Update_Date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return str(self.DfUser)
    class Meta:
        verbose_name_plural = "DF Business_Location Connect With Social Media"