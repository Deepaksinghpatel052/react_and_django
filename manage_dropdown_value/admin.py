from django.contrib import admin
from .models import DfBusinessCategory,DfCountry,DfState
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class DfBusinessCategoryAdmin(ImportExportModelAdmin):
    search_fields = ['Category_Name']
    list_display = ('Category_Name','Status','Create_by','Create_date')
    list_filter = ('Status','Create_by','Create_date',)

class DfCountryAdmin(ImportExportModelAdmin):
    search_fields = ['Country_Name']
    list_display = ('Country_Name','Status','Create_by','Create_date')
    list_filter = ('Status','Create_by','Create_date',)

class DfStateAdmin(ImportExportModelAdmin):
    search_fields = ['State_name']
    list_display = ('State_name','Country_Name','Status','Create_by','Create_date')
    list_filter = ('Country_Name','Status','Create_by','Create_date',)



admin.site.register(DfBusinessCategory,DfBusinessCategoryAdmin)
admin.site.register(DfCountry,DfCountryAdmin)
admin.site.register(DfState,DfStateAdmin)
