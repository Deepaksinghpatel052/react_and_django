from django.contrib import admin
from .models import DfLocationReviews
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class DfLocationReviewsAdmin(ImportExportModelAdmin):
    search_fields = ['Store_Code']
    list_display = ('Df_User','Business_Location','Social_Plateform','User_Name','Reating','Review','Review_dateTime','Craete_Date')
    list_filter = ('Business_Location','Social_Plateform','Craete_Date',)

admin.site.register(DfLocationReviews,DfLocationReviewsAdmin)


