from django.db import models
from django.contrib.auth.models import User
import django
# Create your models here.

class DfBusinessCategory(models.Model):
    Category_Name = models.CharField(max_length=50)
    Status = models.BooleanField(default=True)
    Create_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Category_Name
    class Meta:
        verbose_name_plural = "DF Business Category"

class DfCountry(models.Model):
    Country_Name = models.CharField(max_length=20)
    Status = models.BooleanField(default=True)
    Create_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Country_Name
    class Meta:
        verbose_name_plural = "DF Country"

class DfState(models.Model):
    Country_Name = models.ForeignKey(DfCountry, on_delete=models.SET_NULL, null=True, blank=True)
    State_name = models.CharField(max_length=20)
    Status = models.BooleanField(default=True)
    Create_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.State_name
    class Meta:
        verbose_name_plural = "DF State"

