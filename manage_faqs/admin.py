from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfFaqs,DfFaqCategory
# Register your models here.

admin.site.register(DfFaqCategory)

class DfFaqsAdmin(ImportExportModelAdmin):
    list_display = ('Question','Category','Question_slug','Ansews','Create_date')
admin.site.register(DfFaqs,DfFaqsAdmin)