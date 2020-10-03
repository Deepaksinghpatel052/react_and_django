from django.contrib import admin
from .models import DfUser
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class DfUserAdmin(ImportExportModelAdmin):
    search_fields = ['first_name']
    list_display = ('user','first_name','Company_name','Country','Phone','Zip','Last_login','Create_date')
    list_filter = ('Country','Create_date',)

admin.site.register(DfUser,DfUserAdmin)
