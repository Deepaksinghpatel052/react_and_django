from django.db import models
from accounts.models import DfUser
from manage_pricing.models import DfPrice
from .utils import  unique_id_generator_for_order_id_for_Df_order
from django.db.models.signals import pre_save
import django

# Create your models here.


DURATION_CHOICES = (
    ('D','Days'),
    ('M', 'Month'),
    ('Y', 'Year'),
)


class DfOrders(models.Model):
    Order_id = models.CharField(max_length=120, unique=True,null=True, blank=True)
    DfUser = models.ForeignKey(DfUser, on_delete=models.CASCADE,null=True, blank=True)
    Package = models.ForeignKey(DfPrice, on_delete=models.CASCADE,null=True, blank=True)
    Final_Amount = models.FloatField(default=0)
    Duration_Type = models.CharField(max_length=120,choices=DURATION_CHOICES,null=True, blank=True)
    Duration_Time = models.IntegerField(default=0)
    Create_Date = models.DateTimeField(default=django.utils.timezone.now)
    Payment = models.BooleanField(default=False)
    Payment_Type = models.CharField(max_length=120,null=True, blank=True)
    Transaction_id = models.CharField(max_length=120,null=True, blank=True)
    Payment_Date = models.DateTimeField(null=True, blank=True)
    Active = models.BooleanField(default=False)
    Start_Date = models.DateField(null=True, blank=True)
    End_Date = models.DateField(null=True, blank=True)


    def __str__(self):
        return self.Order_id

    class Meta:
        verbose_name_plural = "DF Orders"


def pre_save_create_Order_id(sender, instance, *args, **kwargs):
    if not instance.Order_id:
        instance.Order_id= unique_id_generator_for_order_id_for_Df_order(instance)
pre_save.connect(pre_save_create_Order_id, sender=DfOrders)




class DfOrdersAndPayment(models.Model):
    Order_id = models.CharField(max_length=120, unique=True,null=True, blank=True)
    DfUser = models.ForeignKey(DfUser, on_delete=models.CASCADE)
    Package = models.ForeignKey(DfPrice, on_delete=models.CASCADE)
    Final_Amount = models.FloatField()
    Duration_Type = models.CharField(max_length=120,choices=DURATION_CHOICES)
    Duration_Time = models.IntegerField()
    Create_Date = models.DateTimeField(default=django.utils.timezone.now)
    Payment = models.BooleanField(default=False)
    Payment_Type = models.CharField(max_length=120,null=True, blank=True)
    Transaction_id = models.CharField(max_length=120,null=True, blank=True)
    Payment_Date = models.DateTimeField(null=True, blank=True)
    Active = models.BooleanField(default=False)
    Start_Date = models.DateField(null=True, blank=True)
    End_Date = models.DateField(null=True, blank=True)


    def __str__(self):
        return self.Order_id

    class Meta:
        verbose_name_plural = "DF Orders And Payment"


def pre_save_create_Order_id(sender, instance, *args, **kwargs):
    if not instance.Order_id:
        instance.Order_id= unique_id_generator_for_order_id_for_Df_order(instance)
pre_save.connect(pre_save_create_Order_id, sender=DfOrdersAndPayment)