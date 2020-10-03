from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfCampaign,DfUseremail
# Register your models here.

class DfCampaignAdmin(ImportExportModelAdmin):
    list_display = ('DfUser','BusinessLocation','Title','Head','Subject','Sent_from','replay_to','message','sms_message','Create_date')
    list_filter = ('DfUser','Create_date',)
admin.site.register(DfCampaign,DfCampaignAdmin)



class DfUseremailAdmin(ImportExportModelAdmin):
    list_display = ('DfUser','Campign','Email','Name','mail_sent_status','Sent_date')
    list_filter = ('DfUser','Campign','Sent_date',)
admin.site.register(DfUseremail,DfUseremailAdmin)