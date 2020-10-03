from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication,BasicAuthentication
from dashifyproject.tokens import CsrfExemptSessionAuthentication
from rest_framework.permissions import IsAuthenticated
from accounts.models import DfUser
from .serializear import SaveReviewsSerializers,GetReviewsSerializers,GetLocationserializer
from rest_framework import  exceptions
from .models import DfLocationReviews
from django.db.models import Count
from rest_framework import generics
# Create your views here.

class SaveReviewsView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        message = ""
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = SaveReviewsSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            message = serializer.validated_data
        return Response({"message": message}, status=200)


class GetAllReviewView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        reviews = {}
        request.data["user_id"] = self.request.user.id
        serializer = GetLocationserializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        location_ins = serializer.validated_data
        if DfUser.objects.filter(user=self.request.user).exists():
            get_Dfuser_ins = get_object_or_404(DfUser, user=self.request.user)
            if DfLocationReviews.objects.filter(Df_User=get_Dfuser_ins).filter(Business_Location=location_ins).exists():
                get_social_platfrom = DfLocationReviews.objects.values_list('Social_Plateform', flat=True).annotate(dcount=Count('Social_Plateform')).filter(Df_User=get_Dfuser_ins).filter(Business_Location=location_ins)
                if get_social_platfrom is not None:
                    for item in get_social_platfrom:
                        get_all_review = DfLocationReviews.objects.filter(Df_User=get_Dfuser_ins).filter(Business_Location=location_ins).filter(Social_Plateform=item).order_by('-id')
                        # get_all_review_sri = GetReviewsSerializers(get_all_review, many=True , context={"request":request})
                        get_all_review_sri = GetReviewsSerializers(get_all_review, many=True)
                        get_data = get_all_review_sri.data
                        reviews[item] = get_data

        else:
            msg = "Login User is not exists"
            raise exceptions.ValidationError(msg)
        return Response({"reviews": reviews}, status=200)

