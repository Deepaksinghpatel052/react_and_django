from django.db import models
import django
from autoslug import AutoSlugField
from datetime import date
# Create your models here.


def user_directory_path_for_banner(instance, filename):
    project_id_in_list = instance.Blog_Title.split(" ")
    today_date = date.today()
    project_id_in_string = '_'.join([str(elem) for elem in project_id_in_list])
    return '{0}/{1}'.format("blogs/"+project_id_in_string+"/banner/"+str(today_date.year)+"/"+str(today_date.month)+"/"+str(today_date.day),filename)


class DfBlogs(models.Model):
    Blog_Title = models.CharField(max_length=120)
    Blog_slug = AutoSlugField(populate_from='Blog_Title', always_update=True,unique_with='Create_date__month',null=True, blank=True)
    Blog_Image = models.ImageField(upload_to=user_directory_path_for_banner)
    Message = models.TextField()
    Create_date = models.DateTimeField(default=django.utils.timezone.now)

    def __str__(self):
        return self.Blog_Title

    class Meta:
        verbose_name_plural = "DF Blogs"