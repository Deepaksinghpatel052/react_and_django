from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from dashifyproject.tokens import CsrfExemptSessionAuthentication
from .serializear import RemoveOneSocialcMediaSerializers,OneSocialcMediaSerializers,AddSocialcMediaSerializers,GetSocialMediaSerializers
from accounts.models import DfUser
from rest_framework.response import Response
from rest_framework import  exceptions
from .models import DfSocialMedia
# Create your views here.


# ==========================================AddSocialcMedia START =================
class AddSocialMedia(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    def post(self,request):
        data = {}
        if request.method == "POST":
            request.data["user_id"]=self.request.user.id
            serializer = AddSocialcMediaSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            print(request.data["location_id"])
            data['social_platfrom_id'] =  serializer.validated_data['social_platfrom_id']
            data['conect_to_location_id'] =  serializer.validated_data['conect_to_location_id']
            message = "Social Media info Add"
        return Response({"message": message,"data":data}, status=200)
# ==========================================AddSocialcMedia END =================

# ==========================================AllSocialPlatforms START =================
class AllSocialPlatforms(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self,request):
        Social_platform = {}
        if DfUser.objects.filter(user=self.request.user).exists():
            get_Dfuser_ins = get_object_or_404(DfUser,user=self.request.user)
            if DfSocialMedia.objects.filter(DfUser=get_Dfuser_ins).exists():
                get_all_DfSocialMedia = DfSocialMedia.objects.filter(DfUser=get_Dfuser_ins)
                get_all_DfSocialMedia_sri = GetSocialMediaSerializers(get_all_DfSocialMedia, many=True)
                Social_platform = get_all_DfSocialMedia_sri.data
        else:
            msg = "Login User is not exists"
            raise exceptions.ValidationError(msg)
        return Response({"social_platforms":Social_platform},status=200)
# ==========================================AllSocialPlatforms END ===================

# ==========================================OneSocialPlatforms START ===================
class OneSocialPlatforms(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.method == "POST":
            Social_platform = {}
            request.data["user_id"] = self.request.user.id
            serializer = OneSocialcMediaSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_data = serializer.validated_data
            get_one_DfSocialMedia_sri = GetSocialMediaSerializers(get_data)
            Social_platform = get_one_DfSocialMedia_sri.data
        return Response({"social_platforms": Social_platform}, status=200)
# ==========================================OneSocialPlatforms END =====================

# ==========================================RemoveSocialPlatforms END =====================

class RemoveSocialPlatforms(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.method == "POST":
            Social_platform = {}
            request.data["user_id"] = self.request.user.id
            serializer = RemoveOneSocialcMediaSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_data = serializer.validated_data
        return Response({"message": get_data}, status=200)
# ==========================================RemoveSocialPlatforms END =====================