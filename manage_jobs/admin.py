from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfJobCategory,DfJobs,DfJobApplaicationSet
# Register your models here.

class DfJobCategoryAdmin(ImportExportModelAdmin):
    list_display = ('CategoryName','Create_date')
admin.site.register(DfJobCategory,DfJobCategoryAdmin)

class DfJobsAdmin(ImportExportModelAdmin):
    list_display = ('Category_name','Job_Title','Job_slug','Job_Description','Create_date')
admin.site.register(DfJobs,DfJobsAdmin)

class DfJobApplaicationAdmin(ImportExportModelAdmin):
    list_display = ('Job_title','job_cate','Name','email','contact_no','Application_Date')
admin.site.register(DfJobApplaicationSet,DfJobApplaicationAdmin)