from django.db import models
import django
from autoslug import AutoSlugField
from datetime import date
# Create your models here.

class DfJobCategory(models.Model):
    CategoryName = models.CharField(max_length=120,unique=True)
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.CategoryName

    class Meta:
        verbose_name_plural = "DF Job Category"

class DfJobs(models.Model):
    Category_name = models.ForeignKey(DfJobCategory, on_delete=models.SET_NULL, null=True, blank=True,related_name='AwWineType_DfJobs')
    Job_Title = models.CharField(max_length=120)
    Job_slug = AutoSlugField(populate_from='Job_Title', always_update=True, unique_with='Create_date__month',null=True, blank=True)
    Job_Description = models.TextField()
    Create_date = models.DateTimeField(default=django.utils.timezone.now)


    def __str__(self):
        return self.Job_Title

    class Meta:
        verbose_name_plural = "DF Jobs"

class DfJobApplaicationSet(models.Model):
    Job_title = models.ForeignKey(DfJobs, on_delete=models.CASCADE, related_name='Job_DfJobs')
    job_cate = models.ForeignKey(DfJobCategory, on_delete=models.CASCADE,related_name='AwWineType_DfApplay' )
    Name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    contact_no = models.BigIntegerField()
    Application_Date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return str(self.Job_title)

    class Meta:
        verbose_name_plural = "DF Job Applaication"
