from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import DfCampaign,DfUseremail,DfUploadImage
from rest_framework import  exceptions
from rest_framework.response import Response
from manage_locations.models import DfBusinessLocation
from accounts.models import DfUser
import base64
from django.core.files.base import ContentFile
from datetime import date



class GetAllEmailSerializersData(serializers.ModelSerializer):


    class Meta:
        model = DfUseremail
        fields = ['id','DfUser', 'Campign', 'Email', 'Contact', 'Name', 'mail_sent_status','Sent_date']



class GetAllEmailSerializersCheckCampaignid(serializers.Serializer):
    user_id = serializers.CharField()
    camp_id = serializers.CharField()

    def validate(self, data):
        user_id = data.get("user_id", "")
        campaign_id = data.get("camp_id", "")
        get_campaign_ins = {}

        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
                if campaign_id:
                    if DfCampaign.objects.filter(id=campaign_id, DfUser=get_user_instance).exists():
                        get_campaign_ins = get_object_or_404(DfCampaign, id=campaign_id, DfUser=get_user_instance)
                    else:
                        mes = "campaign_id is incorrect."
                        raise exceptions.ValidationError(mes)
                else:
                    mes = "Must provide campaign_id."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_campaign_ins




class UploadImageViewSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    UploadFile = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)

    class Meta:
        model = DfUploadImage
        fields = ['user_id','UploadFile']


class AddCampaignSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Title  = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Sent_from  = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    replay_to  = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    message  = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    sms_message  = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)
    location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)
    Image = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)
    Extera_data = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)
    Head = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)
    Subject = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=True,allow_blank=True)


    class Meta:
        model = DfCampaign
        fields = ['user_id','Title','Head','Subject', 'Sent_from', 'replay_to', 'message','Image','sms_message','Extera_data']



class GetAllCampaignSerializers(serializers.Serializer):
    user_id = serializers.CharField()

    def validate(self, data):
        user_id = data.get("user_id", "")
        get_user_instance = {}
        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_user_instance


class GetAllCampaignSerializersData(serializers.ModelSerializer):


    class Meta:
        model = DfCampaign
        fields = ['id','DfUser', 'BusinessLocation', 'Title', 'Sent_from', 'replay_to', 'message','Image','sms_message','Extera_data','Create_date']




class AddCampaignEmailSerializers(serializers.Serializer):
    user_id = serializers.CharField()
    camp_id = serializers.CharField()
    emails = serializers.CharField()
    names = serializers.CharField()

    def validate(self, data):
        user_id = data.get("user_id", "")
        camp_id = data.get("camp_id", "")
        emails = data.get("emails", "")
        names = data.get("names", "")
        message = ""
        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
                if campaign_id:
                    if DfCampaign.objects.filter(id=campaign_id,DfUser=get_user_instance).exists():
                        get_campaign_ins = get_object_or_404(DfCampaign,id=campaign_id,DfUser=get_user_instance)
                        for i in range(0, len(emails)):
                            ass_emails = DfUseremail(DfUser=get_user_instance,Campign=get_campaign_ins,Email=emails[i],Name=names[i])
                            ass_emails.save()
                        message = "Email add in database successfully."
                    else:
                        mes = "campaign_id is incorrect."
                        raise exceptions.ValidationError(mes)
                else:
                    mes = "Must provide campaign_id."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_campaign_ins



class GetAllCampaignSerializersCheckCampaignid(serializers.Serializer):
    user_id = serializers.CharField()
    camp_id = serializers.CharField()

    def validate(self, data):
        user_id = data.get("user_id", "")
        campaign_id = data.get("camp_id", "")
        get_campaign_ins = {}
       
        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
                if campaign_id:
                    if DfCampaign.objects.filter(id=campaign_id,DfUser=get_user_instance).exists():
                        get_campaign_ins = get_object_or_404(DfCampaign,id=campaign_id,DfUser=get_user_instance)
                    else:
                        mes = "campaign_id is incorrect."
                        raise exceptions.ValidationError(mes)
                else:
                    mes = "Must provide campaign_id."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_campaign_ins



class RemovecampaignByIdSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    campaign_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        campaign_id = data.get("campaign_id", "")
        message = ""
        if DfUser.objects.filter(user_id=user_id).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if DfCampaign.objects.filter(id=campaign_id).exists():
                get_campaign_ins = get_object_or_404(DfCampaign,id=campaign_id)
                if get_campaign_ins.DfUser.id == get_Dfuser_ins.id:
                    DfCampaign.objects.filter(id=campaign_id).delete()
                    message = "Campaign remove successfully."
                else:
                    mes = "This campaign_id is not related to current login user."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "campaign_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Your user_id is incorrect."
            raise exceptions.ValidationError(mes)
        return  message
