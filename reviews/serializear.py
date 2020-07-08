from rest_framework import serializers
from django.shortcuts import get_object_or_404
from rest_framework import  exceptions
from accounts.models import DfUser
from .models import DfLocationReviews
from manage_locations.models import DfBusinessLocation




class SaveReviewsSerializers(serializers.Serializer):
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Social_Plateform = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    User_Name = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Reating = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    Review = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    User_Image_URL = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)
    Review_dateTime = serializers.CharField(style={"inpupt_type": "text"}, write_only=True,required=False,allow_blank=True)

    def validate(self, data):
        user_id = data.get("user_id", "")
        Location_id = data.get("Location_id", "")
        Social_Plateform = data.get("Social_Plateform", "")
        User_Name = data.get("User_Name", "")
        Reating = data.get("Reating", "")
        Review = data.get("Review", "")
        User_Image_URL = data.get("User_Image_URL", "")
        Review_dateTime = data.get("Review_dateTime", "")
        message = ""
        if Location_id:
            if DfBusinessLocation.objects.filter(id=Location_id).exists():
                get_bl_ins = get_object_or_404(DfBusinessLocation,id=Location_id)
                get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
                if get_bl_ins.DfUser.id == get_Dfuser_ins.id:
                    add_review = DfLocationReviews(
                        Df_User = get_Dfuser_ins,
                        Business_Location = get_bl_ins,
                        Social_Plateform = Social_Plateform,
                        User_Name = User_Name,
                        Reating = Reating,
                        Review = Review,
                        User_Image_URL = User_Image_URL,
                        Review_dateTime = Review_dateTime
                    )
                    add_review.save()
                    message = "Review inserted successfully."
                else:
                    msg = "This Location_id is not related to current login user."
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Location_id is not exists."
                raise exceptions.ValidationError(msg)
        else:
            mes = "Must provide location_id."
            raise exceptions.ValidationError(mes)
        return message




class GetLocationserializer(serializers.Serializer):
    Location_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    user_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        Location_id = data.get("Location_id", "")
        user_id = data.get("user_id", "")
        location_ins = None
        if DfBusinessLocation.objects.filter(id=Location_id).exists():
            get_bl_ins = get_object_or_404(DfBusinessLocation, id=Location_id)
            get_Dfuser_ins = get_object_or_404(DfUser, user_id=user_id)
            if get_bl_ins.DfUser.id == get_Dfuser_ins.id:
                location_ins = get_bl_ins
            else:
                msg = "This Location_id is not related to current login user."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Location_id is not exists."
            raise exceptions.ValidationError(msg)
        return location_ins


class GetReviewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = DfLocationReviews
        fields = ['id', 'Social_Plateform', 'User_Name', 'Reating', 'Review', 'User_Image_URL',
                  'Review_dateTime', 'Craete_Date','Business_Location','Df_User']
        depth = 2