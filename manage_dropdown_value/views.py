from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from .models import DfBusinessCategory,DfCountry,DfState
from .serializear import DfBusinessCategorySerializers,DfCountrySerializers,DfStateSerializers
# Create your views here.

class BusinessCategoryesView(APIView):
    authentication_classes = (TokenAuthentication,SessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self,request):
        businessCategory = {}
        if DfBusinessCategory.objects.filter(Status=True).exists():
            businessCategory = DfBusinessCategory.objects.filter(Status=True)
            businessCategory_si = DfBusinessCategorySerializers(businessCategory,many=True)
            businessCategory = businessCategory_si.data
        return Response({'BusinessCategory':businessCategory},status=200)

class CounrtyView(APIView):
    authentication_classes = (TokenAuthentication,SessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    def get(self,request):
        dfCountry = {}
        if DfCountry.objects.filter(Status=True).exists():
            dfCountry = DfCountry.objects.filter(Status=True)
            dfCountry_si = DfCountrySerializers(dfCountry,many=True)
            dfCountry = dfCountry_si.data
        return Response({'counrty':dfCountry},status=200)

class CounrtyView(APIView):
    authentication_classes = (TokenAuthentication,SessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    def get(self,request):
        dfCountry = {}
        if DfCountry.objects.filter(Status=True).exists():
            dfCountry = DfCountry.objects.filter(Status=True)
            dfCountry_si = DfCountrySerializers(dfCountry,many=True)
            dfCountry = dfCountry_si.data
        return Response({'counrty':dfCountry},status=200)

class StatesView(APIView):
    authentication_classes = (TokenAuthentication,SessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    def get(self,request):
        dfState = {}
        if DfState.objects.filter(Status=True).exists():
            dfState = DfState.objects.filter(Status=True)
            dfState_si = DfStateSerializers(dfState,many=True)
            dfState = dfState_si.data
        return Response({'status':dfState},status=200)