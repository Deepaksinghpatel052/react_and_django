# Generated by Django 3.0.6 on 2020-09-22 09:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manage_faqs', '0002_auto_20200910_1121'),
    ]

    operations = [
        migrations.CreateModel(
            name='DfFaqCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Category', models.CharField(max_length=120)),
            ],
            options={
                'verbose_name_plural': 'Df Faq Category',
            },
        ),
        migrations.AddField(
            model_name='dffaqs',
            name='Category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='DfFaqs_Category', to='manage_faqs.DfFaqCategory'),
        ),
    ]
