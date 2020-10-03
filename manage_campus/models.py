from django.db import models
from accounts.models import DfUser
import django
from datetime import date
from manage_locations.models import DfBusinessLocation



def user_directory_path_for_banner(instance, filename):
    project_id_in_list = instance.Title.split(" ")
    today_date = date.today()
    project_id_in_string = '_'.join([str(elem) for elem in project_id_in_list])
    return '{0}/{1}'.format(project_id_in_string+"/campus/banner/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)


class DfCampaign(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    BusinessLocation = models.ForeignKey(DfBusinessLocation, on_delete=models.SET_NULL, null=True, blank=True)
    Head  = models.CharField(max_length=500, null=True, blank=True)
    Subject  = models.CharField(max_length=500, null=True, blank=True)
    Title  = models.CharField(max_length=500)
    Sent_from = models.CharField(max_length=500)
    replay_to = models.CharField(max_length=500)
    message = models.TextField(null=True,blank=True)
    Image = models.ImageField(upload_to=user_directory_path_for_banner,null=True,blank=True)
    sms_message = models.TextField(null=True,blank=True)
    Extera_data = models.TextField(null=True, blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)


    def __str__(self):
        return self.Title

    class Meta:
        verbose_name_plural = "DF Campaign"



class DfUseremail(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Campign = models.ForeignKey(DfCampaign, on_delete=models.SET_NULL, null=True, blank=True)
    Email = models.CharField(max_length=500, null=True, blank=True)
    Contact = models.CharField(max_length=500, null=True, blank=True)
    Name = models.CharField(max_length=500, null=True, blank=True)
    mail_sent_status = models.BooleanField(default=False)
    Sent_date = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.Email

    class Meta:
        verbose_name_plural = "DF User Email"


def upload_image_path_for_banner(instance, filename):
    project_id_in_list = "upload_image_for_url"
    today_date = date.today()
    project_id_in_string = project_id_in_list
    return '{0}/{1}'.format(project_id_in_string+"/image/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)



class DfUploadImage(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    UploadFile = models.ImageField(upload_to=upload_image_path_for_banner,null=True,blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)


    def __str__(self):
        return str(self.DfUser)

    class Meta:
        verbose_name_plural = "DF Upload Image"