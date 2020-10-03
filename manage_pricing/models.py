from django.db import models
import django

# Create your models here.
PACKAGE_CHOICES = (
    ('S','Start'),
    ('B', 'Business'),
    ('P', 'Professional'),
    ('M', 'Max'),
)


DURATION_CHOICES = (
    ('D','Days'),
    ('M', 'Month'),
    ('Y', 'Year'),
)


class DfPackageName(models.Model):
    name =  models.CharField(max_length=120,unique=True)
    keyword = models.CharField(max_length=120,unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "DF Package"

class DfPrice(models.Model):
    Package_Type = models.OneToOneField(DfPackageName, on_delete=models.SET_NULL,unique=True,null=True)
    Price = models.FloatField(default=0)
    Duration_Type = models.CharField(max_length=120,choices=DURATION_CHOICES,null=True, blank=True)
    Duration_time = models.IntegerField(default=0)
    Start = models.BooleanField(default=True)
    Orders_set = models.IntegerField(default=0,unique=True)
    Create_Date = models.DateTimeField(default=django.utils.timezone.now)


    def __str__(self):
        return str(self.Package_Type)

    class Meta:
        verbose_name_plural = "DF Price"
