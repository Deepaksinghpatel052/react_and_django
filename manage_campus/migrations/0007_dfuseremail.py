# Generated by Django 3.0.6 on 2020-08-11 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20200806_1201'),
        ('manage_campus', '0006_auto_20200811_1123'),
    ]

    operations = [
        migrations.CreateModel(
            name='DfUseremail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email', models.CharField(blank=True, max_length=500, null=True)),
                ('Name', models.CharField(blank=True, max_length=500, null=True)),
                ('mail_sent_status', models.BooleanField(default=False)),
                ('Sent_date', models.DateTimeField(blank=True, null=True)),
                ('Campign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='manage_campus.DfCampaign')),
                ('DfUser', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.DfUser')),
            ],
            options={
                'verbose_name_plural': 'DF User Email',
            },
        ),
    ]
