# Generated by Django 3.0.6 on 2020-09-05 06:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DfQuery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(blank=True, max_length=20, null=True)),
                ('Your_Email', models.CharField(blank=True, max_length=20, null=True)),
                ('Message', models.TextField(blank=True, default='', null=True)),
                ('Other_Data', models.TextField(blank=True, default='', null=True)),
                ('Create_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name_plural': 'DF Query',
            },
        ),
    ]
