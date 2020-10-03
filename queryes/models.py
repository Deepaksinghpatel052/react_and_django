from django.db import models
import django
# Create your models here.
# class DfQuery(models.Model):
#     Name  = models.CharField(max_length=20)
#     Your_Email  = models.CharField(max_length=20)
#     Message = models.TextField()
#     Other_Data = models.TextField(default="",null=True,blank=True)
#     Create_date = models.DateTimeField(default=django.utils.timezone.now)
#
#
#     def __str__(self):
#         return self.Name
#
#     class Meta:
#         verbose_name_plural = "DF Query"


class DfQueryInfo(models.Model):
    Name = models.CharField(max_length=120)
    Your_Email = models.CharField(max_length=120)
    Message = models.TextField()
    Other_Data = models.TextField(default="", null=True, blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Name

    class Meta:
        verbose_name_plural = "DF Query"