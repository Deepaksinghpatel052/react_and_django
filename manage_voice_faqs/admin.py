from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfVoiceFaqs
# Register your models here.

class DfVoiceFaqsAdmin(ImportExportModelAdmin):
    list_display = ('DfUser','Location','question','Craete_Date')
admin.site.register(DfVoiceFaqs,DfVoiceFaqsAdmin)