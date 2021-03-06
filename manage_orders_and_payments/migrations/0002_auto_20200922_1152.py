# Generated by Django 3.0.6 on 2020-09-22 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manage_pricing', '0004_auto_20200922_1146'),
        ('manage_orders_and_payments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dforders',
            name='Duration_Type',
            field=models.CharField(blank=True, choices=[('D', 'Days'), ('M', 'Month'), ('Y', 'Year')], max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='dforders',
            name='Package',
            field=models.ForeignKey(blank=True, choices=[('S', 'Start'), ('B', 'Business'), ('P', 'Professional'), ('M', 'Max')], null=True, on_delete=django.db.models.deletion.SET_NULL, to='manage_pricing.DfPrice'),
        ),
    ]
