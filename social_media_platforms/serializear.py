from rest_framework import serializers
from django.shortcuts import get_object_or_404
from rest_framework import  exceptions
from accounts.models import DfUser
from .models import DfSocialMedia
from manage_locations.models import DfLocationConnectPlatform,DfBusinessLocation


class GetSocialMediaSerializers(serializers.ModelSerializer):
    class Meta:
        model = DfSocialMedia
        fields = ['id', 'Platform', 'Token', 'Username', 'Email', 'Password',
                  'Connect_status', 'Other_info', 'Craete_Date', 'Update_Date','DfUser']
        depth = 2




class AddSocialcMediaSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Platform = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Token = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Username = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Email = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Password = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Connect_status = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Other_info = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        Platform = data.get("Platform", "")
        Token = data.get("Token", "")
        Username = data.get("Username", "")
        Email = data.get("Email", "")
        Password = data.get("Password", "")
        Connect_status = data.get("Connect_status", "")
        Other_info = data.get("Other_info", "")
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser,user_id=user_id)
            
            if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,DfUser=get_Dfuser_ins)
                add_social_media = DfSocialMedia(
                        DfUser = get_Dfuser_ins,
                        Platform=Platform,
                        Token=Token,
                        Username=Username,
                        Email=Email,
                        Password=Password,
                        Connect_status=Connect_status,
                        Other_info=Other_info
                    )
                add_social_media.save()

                Connection_Status = Connect_status
                connect_plat = DfLocationConnectPlatform(
                            DfUser = get_Dfuser_ins,
                            Business_Location = get_DfBusinessLocation_ins,
                            Social_Platform = add_social_media,
                            Connection_Status = Connection_Status
                        )
                connect_plat.save()
                data["social_platfrom_id"] = add_social_media.id
                data["conect_to_location_id"] = connect_plat.id
            else:
                mes = "Your location_id is incorrect"
                raise exceptions.ValidationError(mes)             
        else:
            mes = "Your user id is incorrect"
            raise exceptions.ValidationError(mes)
        return data

class OneSocialcMediaSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    platform_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        platform_id = data.get("platform_id", "")
        get_data = None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfSocialMedia.objects.filter(id=platform_id).exists():
                get_one_SM_platform = get_object_or_404(DfSocialMedia,id=platform_id)
                if get_one_SM_platform.DfUser.id == get_Dfuser_ins.id:
                    get_data = get_one_SM_platform
                else:
                    msg = "This platform_id is not related to currend login user"
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Platform_id is not exists"
                raise exceptions.ValidationError(msg)
        else:
            mes = "Your user id is incorrect"
            raise exceptions.ValidationError(mes)
        return get_data


class RemoveOneSocialcMediaSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    platform_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        platform_id = data.get("platform_id", "")
        get_data = None
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfSocialMedia.objects.filter(id=platform_id).exists():
                get_one_SM_platform = get_object_or_404(DfSocialMedia,id=platform_id)
                if get_one_SM_platform.DfUser.id == get_Dfuser_ins.id:
                    DfSocialMedia.objects.filter(id=platform_id).delete()
                    get_data = "Platform removed successfully"
                else:
                    msg = "This platform_id is not related to currend login user"
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Platform_id is not exists"
                raise exceptions.ValidationError(msg)
        else:
            mes = "Your user id is incorrect"
            raise exceptions.ValidationError(mes)
        return get_data


