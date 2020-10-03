from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from accounts.models import DfUser
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializear import AddVoiceFaqs,GetAllFaqSerializersValidate,GetAllFaqSerializers,GetAllFaqSerializersLocationValidate,GetAllFaqSerializersByIdValidate,EditFaqSerializers
from .models import DfVoiceFaqs
from manage_locations.models import DfBusinessLocation
from dashifyproject.tokens import CsrfExemptSessionAuthentication
# Create your views here.

class AddVoiceFaqView(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = "This is test data"
        request.data["DfUser"] = self.request.user.id
        serializer = AddVoiceFaqs(data=request.data)
        data_response = {}
        if serializer.is_valid():
            if DfUser.objects.filter(user_id=request.data['DfUser']).exists():
                get_user_ins = get_object_or_404(DfUser,user_id=request.data['DfUser'])
                if DfBusinessLocation.objects.filter(id=request.data['Location']).filter(DfUser=get_user_ins).exists():
                    get_location_ins = get_object_or_404(DfBusinessLocation,id=request.data['Location'],DfUser=get_user_ins)
                    if DfVoiceFaqs.objects.filter(DfUser=get_user_ins).filter(Location=get_location_ins).filter(question=request.data['question']).exists():
                        msg = "This question is alerady exists."
                        raise exceptions.ValidationError(msg)
                    else:
                        add_data = DfVoiceFaqs(DfUser=get_user_ins,Location=get_location_ins,question=request.data['question'],answer=request.data['answer'])
                        add_data.save()
                        data_response["message"] = "Voice FAQ Add successfully"
                        data_response["question_id"] = add_data.id
                        data_response["question"] = add_data.question
                else:
                    msg = "Location is invalue."
                    raise exceptions.ValidationError(msg)
            else:
                msg = "User_id is invalue."
                raise exceptions.ValidationError(msg)
        else:
            message = "not validate"
            data_response = serializer.errors
        return Response(data_response)



class GetAllFaqByUserIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    # GetAllLocationSerializers
    def get(self,request):
        all_faq = {}
        request.data["user_id"] = request.user.id
        serializer = GetAllFaqSerializersValidate(data=request.data)
        serializer.is_valid(raise_exception=True)
        if DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data).exists():
            all_faqs = DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data).order_by("-id")
            # all_faqsSerializer = GetAllFaqSerializers(all_faqs, many=True, context={"request":request})
            all_faqsSerializer = GetAllFaqSerializers(all_faqs, many=True)
            all_faq = all_faqsSerializer.data
        return Response({"all_faqs":all_faq},status=200)




class GetAllFaqByLocationIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    # GetAllLocationSerializers
    def post(self,request):
        all_faq = {}
        request.data["user_id"] = request.user.id
        serializer = GetAllFaqSerializersLocationValidate(data=request.data)
        serializer.is_valid(raise_exception=True)
        if DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data['get_user_instance']).filter(Location=serializer.validated_data['get_location_instance']).exists():
            all_faqs = DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data['get_user_instance'],Location=serializer.validated_data['get_location_instance']).order_by("-id")
            # all_faqsSerializer = GetAllFaqSerializers(all_faqs, many=True, context={"request":request})
            all_faqsSerializer = GetAllFaqSerializers(all_faqs, many=True)
            all_faq = all_faqsSerializer.data
        return Response({"all_faqs":all_faq},status=200)


class GetAllFaqByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    # GetAllLocationSerializers
    def post(self,request):
        all_faq = {}
        request.data["user_id"] = request.user.id
        serializer = GetAllFaqSerializersByIdValidate(data=request.data)
        serializer.is_valid(raise_exception=True)
        if DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data['get_user_instance']).filter(id=request.data['faq_id']).exists():
            all_faqs = get_object_or_404(DfVoiceFaqs,DfUser=serializer.validated_data['get_user_instance'],id=request.data['faq_id'])
            # all_faqsSerializer = GetAllFaqSerializers(all_faqs,context={"request":request})
            all_faqsSerializer = GetAllFaqSerializers(all_faqs)
            all_faq = all_faqsSerializer.data
        else:
            mes = "faq_id is incorrecyt."
            raise exceptions.ValidationError(mes)
        return Response({"all_faqs":all_faq},status=200)


# ================================EDIT FAQ ===============
class EditFaqByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = ""
        if request.method == "POST":
            request.data["user_id"] = request.user.id
            serializer = EditFaqSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            message = serializer.validated_data
        return Response({"message": message}, status=200)
# ================================EDIT FAQ ===============





class DeleteFaqByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    # GetAllLocationSerializers
    def post(self,request):
        all_faq = {}
        request.data["user_id"] = request.user.id
        serializer = GetAllFaqSerializersByIdValidate(data=request.data)
        message = ""
        serializer.is_valid(raise_exception=True)
        if DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data['get_user_instance']).filter(id=request.data['faq_id']).exists():
            DfVoiceFaqs.objects.filter(DfUser=serializer.validated_data['get_user_instance']).filter(id=request.data['faq_id']).delete()
            message = "Faq Delete successfully."
        else:
            mes = "faq_id is incorrecyt."
            raise exceptions.ValidationError(mes)
        return Response({"message": message}, status=200)