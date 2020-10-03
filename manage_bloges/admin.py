from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfBlogs
# Register your models here.

class DfBlogsAdmin(ImportExportModelAdmin):
    list_display = ('Blog_Title','Blog_slug','Blog_Image','Create_date')
admin.site.register(DfBlogs,DfBlogsAdmin)