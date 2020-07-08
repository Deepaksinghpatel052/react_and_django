from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import DfBusinessLocation,DfLocationImage,DfLocationPaymentMethod,DfLocationConnectPlatform,DfLocationOpenHours
from rest_framework import  exceptions
from rest_framework.response import Response
from accounts.models import DfUser
from social_media_platforms.models import DfSocialMedia



class GetOneLocationSerializersValidate(serializers.Serializer):
    location_id = serializers.CharField()

    def validate(self, data):
        location_id = data.get("location_id", "")
        location_data = {}
        if location_id:
            if DfBusinessLocation.objects.filter(id=location_id).exists():
                # location_data = get_object_or_404(DfBusinessLocation, id=location_id)
                location_data = get_object_or_404(DfBusinessLocation, id=location_id)
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return location_data

class GetAllLocationSerializersValidate(serializers.Serializer):
    user_id = serializers.CharField()

    def validate(self, data):
        user_id = data.get("user_id", "")
        get_user_instance = {}
        if user_id:
            if DfUser.objects.filter(id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, id=user_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_user_instance


class GetDfBusinessLocationSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = DfLocationImage
        fields = ['id','Image']

class GetDfLocationPaymentSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = DfLocationPaymentMethod
        fields = ['id','Payment_Method']


class GetOpenhourSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = DfLocationOpenHours
        fields = ['id','date','Day','Type','Open_status','start_time_1','end_time_1','start_time_2','end_time_2']


class GetAllLocationSerializers(serializers.ModelSerializer):
    Df_location_image = GetDfBusinessLocationSerializers(many=True)
    Df_location_payments = GetDfLocationPaymentSerializers(many=True)
    Df_location_poen_hour = GetOpenhourSerializers(many=True)    

    class Meta:
        model = DfBusinessLocation
        fields = ['id','DfUser', 'Store_Code', 'Business_Logo', 'Location_name', 'Business_category', 'Additional_catugory',
                  'Address_1', 'Address_2', 'Country', 'State', 'City', 'Zipcode', 'Phone_no', 'Website','Franchise_Location','Do_not_publish_my_address',
                  'Business_Owner_Name', 'Owner_Email', 'Business_Tagline', 'Year_Of_Incorporation', 'About_Business',
                  'Facebook_Profile', 'Instagram_Profile', 'Twitter_Profile','Business_Cover_Image', 'Craete_Date', 'Update_Date','Df_location_payments','Df_location_image','Df_location_poen_hour']


class AddLocationSerializers(serializers.Serializer):
    user_id  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Business_Logo  = serializers.CharField(style={"inpupt_type":"text"},write_only=True,required=False,allow_blank=True)
    Business_Cover_Image  = serializers.CharField(style={"inpupt_type":"text"},write_only=True,required=False,allow_blank=True)
    Location_name  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Business_category  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Additional_catugory  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Address_1  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Address_2  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Country  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    State  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    City  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Zipcode  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Phone_no  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Franchise_Location  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Do_not_publish_my_address  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Website  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Business_Owner_Name  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Owner_Email  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Business_Tagline  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Year_Of_Incorporation  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    About_Business  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Facebook_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Instagram_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Twitter_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)

    class Meta:
        model = DfBusinessLocation
        fields = ['user_id','Store_Code','Business_Logo','Location_name','Business_category','Additional_catugory','Address_1','Address_2','Country','State','City','Zipcode','Phone_no','Website','Business_Owner_Name','Owner_Email','Business_Tagline','Year_Of_Incorporation','About_Business','Facebook_Profile','Instagram_Profile','Twitter_Profile','Business_Cover_Image','Craete_Date','Update_Date']

# ====================EditLocationHoursSerializers ========

class EditLocationHoursSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)


    def validate(self, data):
        Location_id = data.get("Location_id", "")
        user_id = data.get("user_id", "")
        update_info = None
        if Location_id:
            if DfUser.objects.filter(user_id=user_id).exists():
                get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
                if DfBusinessLocation.objects.filter(id=Location_id).exists():
                    get_bus_loca_ins = get_object_or_404(DfBusinessLocation, id=Location_id)
                    if get_bus_loca_ins.DfUser.id == get_Dfuser_ins.id:
                        update_info = get_bus_loca_ins
                    else:
                        mes = "Location_id is not related to current login user."
                        raise exceptions.ValidationError(mes)
                else:
                    mes = "Location_id is incorrect."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "user is not login."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return update_info
# ====================EditLocationHoursSerializers ========



# ====================EditLocationBusinessSerializers ========

class EditLocationBusinessSerializers(serializers.Serializer):
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Business_Owner_Name = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Owner_Email = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Business_Tagline = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Year_Of_Incorporation = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    About_Business = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Facebook_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Instagram_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Twitter_Profile  = serializers.CharField(style={"inpupt_type":"text"},write_only=True)

    def validate(self, data):
        Location_id = data.get("Location_id", "")
        Business_Owner_Name = data.get("Business_Owner_Name", "")
        Owner_Email = data.get("Owner_Email", "")
        Business_Tagline = data.get("Business_Tagline", "")
        Year_Of_Incorporation = data.get("Year_Of_Incorporation", "")
        About_Business = data.get("About_Business", "")
        Facebook_Profile = data.get("Facebook_Profile", "")
        Instagram_Profile = data.get("Instagram_Profile", "")
        Twitter_Profile = data.get("Twitter_Profile", "")
        update_info = ""
        if Location_id:
            if DfBusinessLocation.objects.filter(id=Location_id).exists():
                DfBusinessLocation.objects.filter(id=Location_id).update(
                    Business_Owner_Name = Business_Owner_Name,
                    Owner_Email = Owner_Email,
                    Business_Tagline = Business_Tagline,
                    Year_Of_Incorporation = Year_Of_Incorporation,
                    About_Business = About_Business,
                    Facebook_Profile=Facebook_Profile,
                    Instagram_Profile=Twitter_Profile,
                    Twitter_Profile=Twitter_Profile
                )
                update_info = "Business info update successfully"
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return update_info
# ====================EditLocationBusinessSerializers ========






# ====================EditLocationpaymentMethodSerializers ========

class EditLocationpaymentMethodSerializers(serializers.Serializer):
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        Location_id = data.get("Location_id", "")
        Location_instance = ""
        if Location_id:
            if DfBusinessLocation.objects.filter(id=Location_id).exists():
                Location_instance = DfBusinessLocation.objects.filter(id=Location_id)
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return Location_instance
# ====================EditLocationBusinessSerializers ========

class LocationWithSocialMediaSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    platform_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Connection_Status = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        platform_id = data.get("platform_id", "")
        Connection_Status = data.get("Connection_Status", "")
        message = ""
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                if DfSocialMedia.objects.filter(id=platform_id).filter(DfUser=get_Dfuser_ins).exists():
                    get_DfSocialMedia_ins = get_object_or_404(DfSocialMedia, id=platform_id,DfUser=get_Dfuser_ins)
                    if DfLocationConnectPlatform.objects.filter(Business_Location=get_DfBusinessLocation_ins).filter(Social_Platform=get_DfSocialMedia_ins).exists():
                        get_LCP_INS = get_object_or_404(DfLocationConnectPlatform , Business_Location=get_DfBusinessLocation_ins,Social_Platform=get_DfSocialMedia_ins)
                        DfLocationConnectPlatform.objects.filter(id=get_LCP_INS.id).update(
                            DfUser=get_Dfuser_ins,
                            Business_Location=get_DfBusinessLocation_ins,
                            Social_Platform=get_DfSocialMedia_ins,
                            Connection_Status=Connection_Status
                        )
                        message = "Location connection update."
                    else:
                        connect_plat = DfLocationConnectPlatform(
                            DfUser = get_Dfuser_ins,
                            Business_Location = get_DfBusinessLocation_ins,
                            Social_Platform = get_DfSocialMedia_ins,
                            Connection_Status = Connection_Status
                        )
                        connect_plat.save()
                        message = "Location connect with social media."
                else:
                    mes = "Your platform_id is incorrect."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "Your location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes)
        return message

class LocationRemoveWithSocialMediaSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_connect_social_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_connect_social_id = data.get("location_connect_social_id", "")
        message = ""
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfLocationConnectPlatform.objects.filter(id=location_connect_social_id).exists():
                get_CMC_ins = get_object_or_404(DfLocationConnectPlatform, id=location_connect_social_id)
                if get_CMC_ins.DfUser.id == get_Dfuser_ins.id:
                    DfLocationConnectPlatform.objects.filter(id=location_connect_social_id).delete()
                    message = "Connection remove with social media platform."
                else:
                    mes = "This location_connect_social_id is not related to current login user."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "Your platform_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Your location_connect_social_id is incorrect."
            raise exceptions.ValidationError(mes)
        return message



class RemoveLocationByIdSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        message = ""
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).exists():
                get_BL_ins = get_object_or_404(DfBusinessLocation,id=location_id)
                if get_BL_ins.DfUser.id == get_Dfuser_ins.id:
                    get_ins = DfBusinessLocation.objects.get(id=location_id)
                    DfLocationConnectPlatform.objects.filter(Business_Location=get_ins).delete()
                    DfLocationImage.objects.filter(Business_Location=get_ins).delete()
                    DfLocationOpenHours.objects.filter(Business_Location=get_ins).delete()
                    DfLocationPaymentMethod.objects.filter(Business_Location=get_ins).delete()
                    DfBusinessLocation.objects.filter(id=location_id).delete()     
                    message = "Business Location remove successfully."
                else:
                    mes = "This location_id is not related to current login user."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Your location_connect_social_id is incorrect."
            raise exceptions.ValidationError(mes)
        return  message



class GetAllConnectionOfOneLocationSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        get_data = None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).exists():
                get_BL_ins = get_object_or_404(DfBusinessLocation,id=location_id)
                if get_BL_ins.DfUser.id == get_Dfuser_ins.id:
                    if DfLocationConnectPlatform.objects.filter(Business_Location=get_BL_ins).exists():

                        get_data = DfLocationConnectPlatform.objects.filter(Business_Location=get_BL_ins)
                        
                else:
                    mes = "This location_id is not related to current login user."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Your location_connect_social_id is incorrect."
            raise exceptions.ValidationError(mes)
        return  get_data

class GetConnectionWithCocialMediaSerializers(serializers.ModelSerializer):
    class Meta:
        model = DfLocationConnectPlatform
        fields = ['id', 'Connection_Status', 'Craete_Date', 'Update_Date', 'Business_Location',
                  'Social_Platform', 'DfUser']
        depth = 1

class UpdateImagesFilesByLocationIdSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Business_Logo  = serializers.CharField(style={"inpupt_type":"text"},write_only=True,required=False,allow_blank=True)
    Business_Cover_Image  = serializers.CharField(style={"inpupt_type":"text"},write_only=True,required=False,allow_blank=True)
    Other_Image  = serializers.CharField(style={"inpupt_type":"text"},write_only=True,required=False,allow_blank=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        location_id_get =None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                df_bl_dta= DfBusinessLocation.objects.get(id=location_id)
                location_id_get = df_bl_dta
            else:
                mes = "Your location_id is incorrect."
                raise exceptions.ValidationError(mes)            
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes) 
        return  location_id_get  



class UpdateImagesFilesByLocationIdImageIdSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    image_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    image = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        image_id = data.get("image_id", "")
        image = data.get("image", "")
        location_id_get =None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                df_bl_dta= DfBusinessLocation.objects.get(id=location_id)
                location_id_get = df_bl_dta
            else:
                mes = "Your location_id is incorrect."
                raise exceptions.ValidationError(mes)            
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes) 
        return  location_id_get  


class RemoveImagesFilesByLocationIdImageIdSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    image_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)


    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        image_id = data.get("image_id", "")
        location_id_get =None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                df_bl_dta= DfBusinessLocation.objects.get(id=location_id)
                location_id_get = df_bl_dta
            else:
                mes = "Your location_id is incorrect."
                raise exceptions.ValidationError(mes)            
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes) 
        return  location_id_get          


class GetOpneHourByLocationIdViewSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    set_type = serializers.CharField(style={"inpupt_type": "text"}, write_only=True) 

    def validate(self, data):
        location_id_get = None
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        set_type = data.get("set_type", "")    
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                df_bl_dta= DfBusinessLocation.objects.get(id=location_id)
                location_id_get = df_bl_dta
            else:
                mes = "Your location_id is incorrect."
                raise exceptions.ValidationError(mes) 
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes)
        return  location_id_get