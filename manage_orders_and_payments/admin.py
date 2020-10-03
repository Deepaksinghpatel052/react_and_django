from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import DfOrders ,DfOrdersAndPayment
# Register your models here.

class DfOrdersAdmin(ImportExportModelAdmin):
    list_display = ('Order_id','DfUser','Package','Final_Amount','Duration_Time','Duration_Type','Create_Date','Payment','Payment_Type','Transaction_id','Payment_Date','Active','Start_Date','End_Date')
    readonly_fields = ["Order_id"]
admin.site.register(DfOrders,DfOrdersAdmin)

class DfOrdersAndPaymentAdmin(ImportExportModelAdmin):
    list_display = ('Order_id','DfUser','Package','Final_Amount','Duration_Time','Duration_Type','Create_Date','Payment','Payment_Type','Transaction_id','Payment_Date','Active','Start_Date','End_Date')
    readonly_fields = ["Order_id"]
admin.site.register(DfOrdersAndPayment,DfOrdersAndPaymentAdmin)