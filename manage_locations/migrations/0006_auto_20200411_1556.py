# Generated by Django 3.0.4 on 2020-04-11 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manage_locations', '0005_auto_20200410_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dflocationimage',
            name='Business_Location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Df_location_image', to='manage_locations.DfBusinessLocation'),
        ),
    ]
