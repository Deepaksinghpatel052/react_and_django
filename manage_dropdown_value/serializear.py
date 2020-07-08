from rest_framework import serializers
from django.contrib.auth.models import User
from .models import DfBusinessCategory,DfCountry, DfState
from django.contrib.auth import authenticate
from rest_framework import exceptions

class DfBusinessCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = DfBusinessCategory
        fields = ('id','Category_Name','Status')

class DfCountrySerializers(serializers.ModelSerializer):
    class Meta:
        model = DfCountry
        fields = ('id','Country_Name','Status')

class DfStateSerializers(serializers.ModelSerializer):
    class Meta:
        model = DfState
        fields = ('id','Country_Name','State_name','Status')
