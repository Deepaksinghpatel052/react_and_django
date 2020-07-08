from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfBusinessLocation,DfLocationImage,DfLocationPaymentMethod,DfLocationConnectPlatform,DfLocationOpenHours
# Register your models here.

class DfBusinessLocationAdmin(ImportExportModelAdmin):
    search_fields = ['Store_Code']
    list_display = ('Store_Code','Business_category','Country','State','City','Zipcode','Phone_no','Business_Owner_Name','Craete_Date')
    list_filter = ('Location_name','Business_category','Country','State','City','Zipcode','Craete_Date',)

class DfLocationImageAdmin(ImportExportModelAdmin):
    search_fields = ['Business_Location']
    list_display = ('Business_Location','Image','Craete_Date')
    list_filter = ('Craete_Date',)

class DfLocationPaymentMethodAdmin(ImportExportModelAdmin):
    search_fields = ['Business_Location']
    list_display = ('Business_Location','Payment_Method')

class DfLocationConnectPlatforAdmin(ImportExportModelAdmin):
    list_display = ('DfUser','Business_Location','Social_Platform','Connection_Status','Craete_Date','Update_Date')
    list_filter = ('DfUser','Business_Location','Social_Platform','Connection_Status','Craete_Date',)

class DfLocationOpenHoursAdmin(ImportExportModelAdmin):
    list_display = ('Business_Location','date','Day','Type','Open_status','start_time_1','end_time_1','start_time_2','end_time_2')
    list_filter = ('Type','Open_status','Business_Location',)

admin.site.register(DfBusinessLocation,DfBusinessLocationAdmin)
admin.site.register(DfLocationImage,DfLocationImageAdmin)
admin.site.register(DfLocationPaymentMethod,DfLocationPaymentMethodAdmin)
admin.site.register(DfLocationConnectPlatform,DfLocationConnectPlatforAdmin)

admin.site.register(DfLocationOpenHours,DfLocationOpenHoursAdmin)