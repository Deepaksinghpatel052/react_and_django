from django.db import models
from accounts.models import DfUser
from manage_locations.models import DfBusinessLocation
import django
from datetime import date
# Create your models here.

class DfVoiceFaqs(models.Model):
    DfUser = models.ForeignKey(DfUser, on_delete=models.SET_NULL, null=True, blank=True)
    Location = models.ForeignKey(DfBusinessLocation, on_delete=models.SET_NULL, null=True, blank=True)
    question = models.CharField(max_length=500)
    answer = models.TextField(null=True,blank=True)
    Craete_Date = models.DateTimeField(default=django.utils.timezone.now)


    def __str__(self):
        return self.question
    class Meta:
        verbose_name_plural = "DF Voice Faqs"