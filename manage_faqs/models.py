from django.db import models
import django
from autoslug import AutoSlugField
from datetime import date
# Create your models here.


class DfFaqCategory(models.Model):
    Category = models.CharField(max_length=120)

    def __str__(self):
        return self.Category

    class Meta:
        verbose_name_plural = "Df Faq Category"




class DfFaqs(models.Model):
    Category = models.ForeignKey(DfFaqCategory, on_delete=models.SET_NULL, null=True, blank=True,related_name='DfFaqs_Category')
    Question = models.CharField(max_length=120)
    Question_slug = AutoSlugField(populate_from='Question', always_update=True,unique_with='Create_date__month',null=True, blank=True)
    Ansews = models.TextField()
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Question

    class Meta:
        verbose_name_plural = "DF Question"
