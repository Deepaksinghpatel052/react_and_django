from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import DfVoiceFaqs
from rest_framework import  exceptions
from rest_framework.response import Response
from accounts.models import DfUser
from manage_locations.models import DfBusinessLocation
from django.db.models import Q




class AddVoiceFaqs(serializers.Serializer):
    DfUser = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Location = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    question = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    answer = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    class Meta:
        model = DfVoiceFaqs
        fields = ['DfUser','Location','question','answer','Craete_Date']

class GetAllFaqSerializersValidate(serializers.Serializer):
    user_id = serializers.CharField()
    def validate(self, data):
        user_id = data.get("user_id", "")
        get_user_instance = {}
        if user_id:
            if DfUser.objects.filter(user_id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user_id=user_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        return get_user_instance

class GetAllFaqSerializersLocationValidate(serializers.Serializer):
    user_id = serializers.CharField()
    location_id = serializers.CharField()
    def validate(self, data):
        user_id = data.get("user_id", "")
        location_id = data.get("location_id", "")
        data_set = {}
        get_user_instance = {}
        if user_id:
            if DfUser.objects.filter(user_id=user_id).exists():
                data_set["get_user_instance"] = get_object_or_404(DfUser, user_id=user_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        if location_id:
            if DfBusinessLocation.objects.filter(id=location_id).exists():
                data_set["get_location_instance"] = get_object_or_404(DfBusinessLocation, id=location_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return data_set



class GetAllFaqSerializersByIdValidate(serializers.Serializer):
    user_id = serializers.CharField()
    faq_id = serializers.CharField()
    def validate(self, data):
        user_id = data.get("user_id", "")
        faq_id = data.get("faq_id", "")
        data_set = {}
        get_user_instance = {}
        if user_id:
            if DfUser.objects.filter(user_id=user_id).exists():
                data_set["get_user_instance"] = get_object_or_404(DfUser, user_id=user_id)
            else:
                mes = "user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide user_id."
            raise exceptions.ValidationError(mes)
        if faq_id:
            if DfVoiceFaqs.objects.filter(id=faq_id).exists():
                data_set["get_faq_instance"] = get_object_or_404(DfVoiceFaqs, id=faq_id)
            else:
                mes = "faq_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide faq_id."
            raise exceptions.ValidationError(mes)
        return data_set




# ====================EditLocationBusinessSerializers ========

class EditFaqSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    question = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    answer = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    faq_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    def validate(self, data):
        user_id = data.get("user_id", "")
        Location_id = data.get("Location_id", "")
        question = data.get("question", "")
        answer = data.get("answer", "")
        faq_id = data.get("faq_id", "")
        if Location_id:
            if DfBusinessLocation.objects.filter(id=Location_id).exists():
                location_ins = get_object_or_404(DfBusinessLocation,id=Location_id)
                if faq_id:
                    if DfVoiceFaqs.objects.filter(id=faq_id).exists():
                        if DfVoiceFaqs.objects.filter(DfUser__id=user_id).filter(Location=location_ins).filter(~Q(id =faq_id)).exists():
                            msg = "This question is alerady exists."
                            raise exceptions.ValidationError(msg)
                        else:
                            DfVoiceFaqs.objects.filter(id=faq_id).update(
                                Location=location_ins,
                                question=question,
                                answer=answer
                            )
                            update_info = "Faq info update successfully"
                    else:
                        mes = "faq_id is incorrect."
                        raise exceptions.ValidationError(mes)
                else:
                    mes = "faq_id provide location_id."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "location_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Location_id provide location_id."
            raise exceptions.ValidationError(mes)

        return update_info
# ====================EditLocationBusinessSerializers ========


class GetAllFaqSerializers(serializers.ModelSerializer):


    class Meta:
        model = DfVoiceFaqs
        fields = ['id','DfUser', 'Location', 'question', 'answer', 'Craete_Date']
        depth = 1
