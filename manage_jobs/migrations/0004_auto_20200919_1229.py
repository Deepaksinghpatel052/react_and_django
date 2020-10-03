# Generated by Django 3.0.6 on 2020-09-19 12:29

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('manage_jobs', '0003_auto_20200919_1225'),
    ]

    operations = [
        migrations.CreateModel(
            name='DfJobApplaicationSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=120)),
                ('contact_no', models.BigIntegerField()),
                ('Application_Date', models.DateTimeField(default=django.utils.timezone.now)),
                ('Job_title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Job_DfJobs', to='manage_jobs.DfJobs')),
                ('job_cate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='AwWineType_DfApplay', to='manage_jobs.DfJobCategory')),
            ],
            options={
                'verbose_name_plural': 'DF Job Applaication',
            },
        ),
        migrations.DeleteModel(
            name='DfJobApplaication',
        ),
    ]
