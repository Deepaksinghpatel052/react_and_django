from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfPrice,DfPackageName
# Register your models here.

class DfPackageNameAdmin(ImportExportModelAdmin):
    list_display = ('name','keyword')
admin.site.register(DfPackageName,DfPackageNameAdmin)

class DfPriceAdmin(ImportExportModelAdmin):
    list_display = ('Package_Type','Price','Duration_Type','Duration_time','Start','Create_Date','Orders_set')
admin.site.register(DfPrice,DfPriceAdmin)
