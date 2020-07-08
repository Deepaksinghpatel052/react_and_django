from django.contrib import admin
from .models import DfSocialMedia
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class DfSocialMediaAdmin(ImportExportModelAdmin):
    search_fields = ['Platform']
    list_display = ('DfUser','Platform','Token','Username','Email','Password','Connect_status','Other_info','Craete_Date','Update_Date')
    list_filter = ('Connect_status','DfUser','Craete_Date',)


admin.site.register(DfSocialMedia, DfSocialMediaAdmin)