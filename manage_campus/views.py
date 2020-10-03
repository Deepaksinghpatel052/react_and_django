from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializear import AddCampaignSerializers,GetAllCampaignSerializers,GetAllCampaignSerializersData,GetAllCampaignSerializersCheckCampaignid
from .serializear import RemovecampaignByIdSerializers,UploadImageViewSerializers,GetAllEmailSerializersCheckCampaignid,GetAllEmailSerializersData
from dashifyproject.tokens import CsrfExemptSessionAuthentication
from accounts.models import DfUser
from manage_locations.models import DfBusinessLocation
from .models import DfCampaign,DfUseremail,DfUploadImage
from datetime import date
from datetime import datetime
import base64
from django.core.files.base import ContentFile
from manage_dropdown_value.models import DfBusinessCategory,DfCountry,DfState
import email.message
from django.template.loader import render_to_string
import smtplib
from django.conf import settings




class RemoveEmailByCampaignIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        all_connection_set = {}
        if request.method == "POST":
            message = ""
            request.data["user_id"] = self.request.user.id
            serializer = GetAllEmailSerializersCheckCampaignid(data=request.data)
            serializer.is_valid(raise_exception=True)
            email_ids = request.data["email_ids"]
            if email_ids:
                email_ids_in_list =  email_ids.split(",")
                DfUseremail.objects.filter(Campign=serializer.validated_data).filter(id__in=email_ids_in_list).delete()
                message = "Emails removed"
            else:
                data_response = "please provide email_ids"
                raise exceptions.ValidationError(mes)
        return Response({"messgae":message}, status=200)



class GetEmailByIdView(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        all_Email_data = {}
        request.data["user_id"] = self.request.user.id
        serializer = GetAllEmailSerializersCheckCampaignid(data=request.data)
        serializer.is_valid(raise_exception=True)
        if DfUseremail.objects.filter(Campign=serializer.validated_data).exists():
            get_emails = DfUseremail.objects.filter(Campign=serializer.validated_data)
            all_EmailSerializer = GetAllEmailSerializersData(get_emails,many=True)
            all_Email_data = all_EmailSerializer.data
        return Response({"emails": all_Email_data}, status=200)

class UploadImageView(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        data_response = {}
        request.data["user_id"] = self.request.user.id
        serializer = UploadImageViewSerializers(data=request.data)
        if serializer.is_valid():
            user_id = self.request.user.id
            if DfUser.objects.filter(user__id=user_id).exists():
                get_Dfuser_ins = get_object_or_404(DfUser, user__id=user_id)
                # add image start
                image_file_get_cover = request.data["UploadFile"]
                format_cover, imgstr_cover = image_file_get_cover.split(';base64,')
                ext_cover = format_cover.split('/')[-1]
                today_date = date.today()
                set_file_name_cover = str(today_date.day) + "_" + str(today_date.month) + "_" + str(
                    today_date.year)
                file_name_cover = set_file_name_cover + "." + ext_cover
                upload_image_get = ContentFile(base64.b64decode(imgstr_cover), name=file_name_cover)
                upload_image = upload_image_get

                upload_imaage_ins = DfUploadImage(
                    DfUser=get_Dfuser_ins,
                    UploadFile=upload_image
                )
                upload_imaage_ins.save()
                data_response["message"] = "Image Upload successfully."
                data_response["image_id"] = upload_imaage_ins.id
                data_response["image_url"] = upload_imaage_ins.UploadFile.url
                get_data = "Campaign create successfully."
                # add image end
            else:
                mes = "Your user_id is incorrect."
                data_response = "Your user_id is incorrect."
                raise exceptions.ValidationError(mes)
        else:
            data_response = serializer.errors
        return Response(data_response)

class AddCampaignView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        data_response = {}
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = AddCampaignSerializers(data=request.data)
            # serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                user_id = request.data["user_id"]
                campaign__id = ""
                if "campaign__id" in request.data:
                    campaign__id = request.data["campaign__id"]
                Title = request.data["Title"]
                Sent_from = request.data["Sent_from"]
                replay_to = request.data["replay_to"]
                message = request.data["message"]
                sms_message = request.data["sms_message"]
                location_id = request.data["location_id"]
                Image = request.data["Image"]
                Extera_data = request.data["Extera_data"]
                Head = request.data["Head"]
                Subject = request.data["Subject"]
                upload_image = ""
                if DfUser.objects.filter(user__id=user_id).exists():
                    get_Dfuser_ins = get_object_or_404(DfUser, user__id=user_id)
                    get_DfBusinessLocation_ins = None
                    Status_set = True
                    if location_id:
                        if DfBusinessLocation.objects.filter(id=location_id).filter(DfUser=get_Dfuser_ins).exists():
                            get_DfBusinessLocation_ins = get_object_or_404(DfBusinessLocation, id=location_id,
                                                                           DfUser=get_Dfuser_ins)
                        else:
                            Status_set = False
                            mes = "Your location_id is incorrect."
                            data_response = "Your location_id is incorrect."
                            raise exceptions.ValidationError(mes)
                    if Image:
                        image_file_get_cover = Image
                        format_cover, imgstr_cover = image_file_get_cover.split(';base64,')
                        ext_cover = format_cover.split('/')[-1]
                        today_date = date.today()
                        set_file_name_cover = str(today_date.day) + "_" + str(today_date.month) + "_" + str(
                            today_date.year)
                        file_name_cover = set_file_name_cover + "." + ext_cover
                        upload_image_get = ContentFile(base64.b64decode(imgstr_cover), name=file_name_cover)
                        upload_image = upload_image_get
                    if Status_set:
                        if  campaign__id:
                            get_Campaign_INS = get_object_or_404(DfCampaign,id=campaign__id)
                            DfCampaign.objects.filter(id=get_Campaign_INS.id).update(
                                DfUser=get_Dfuser_ins,
                                BusinessLocation=get_DfBusinessLocation_ins,
                                Head=Head,
                                Subject=Subject,
                                Title=Title,
                                Sent_from=Sent_from,
                                replay_to=replay_to,
                                message=message,
                                sms_message=sms_message,
                                Extera_data=Extera_data
                            )
                            get_Campaign_INS.Image.delete(save=False)
                            get_Campaign_INS.Image = upload_image
                            get_Campaign_INS.save()
                            # data_response = "Campaign Update successfully."
                            data_response["message"] = "Campaign Update successfully."
                            data_response["campain_id"] = get_Campaign_INS.id
                            get_data = "Campaign Update successfully."
                        else:
                            connect_plat = DfCampaign(
                                DfUser=get_Dfuser_ins,
                                BusinessLocation=get_DfBusinessLocation_ins,
                                Head=Head,
                                Subject=Subject,
                                Title=Title,
                                Sent_from=Sent_from,
                                replay_to=replay_to,
                                message=message,
                                Image=upload_image,
                                sms_message=sms_message,
                                Extera_data=Extera_data
                            )
                            connect_plat.save()
                            data_response["message"] = "Campaign create successfully."
                            data_response["campain_id"] = connect_plat.id
                            get_data = "Campaign create successfully."
                            
                else:
                    mes = "Your user_id is incorrect."
                    data_response = "Your user_id is incorrect."
                    raise exceptions.ValidationError(mes)
            else:
                data_response = serializer.errors
        return Response(data_response)

class GetAllCampaignView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self,request):
        all_Campaign_data = {}
        request.data["user_id"] = self.request.user.id
        serializer = GetAllCampaignSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        all_Campaign = DfCampaign.objects.filter(DfUser=serializer.validated_data).order_by("-id")
        # all_CampaignSerializer = GetAllCampaignSerializersData(all_Campaign, many=True, context={"request":request})
        all_CampaignSerializer = GetAllCampaignSerializersData(all_Campaign, many=True)
        all_Campaign_data = all_CampaignSerializer.data
        return Response({"all_campaign":all_Campaign_data},status=200)

class GetCampaignByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        all_Campaign_data = {}
        request.data["user_id"] = self.request.user.id
        serializer = GetAllCampaignSerializersCheckCampaignid(data=request.data)
        serializer.is_valid(raise_exception=True)
        all_CampaignSerializer = GetAllCampaignSerializersData(serializer.validated_data)
        all_Campaign_data = all_CampaignSerializer.data
        return Response({"campaign": all_Campaign_data}, status=200)

class RemoveCampaignByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        all_connection_set = {}
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = RemovecampaignByIdSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
        return Response({"messgae": serializer.validated_data}, status=200)

class AddCampaignEmailView(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = self.request.user.id
        message_set = ""
        # request.data["user_id"] = self.request.user.id
        # serializer = AddCampaignEmailSerializers(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # if 'camp_id' in self.request.POST and 'emails' in self.request.POST and  'names' in self.request.POST:
        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
                if request.data['camp_id']:
                    if DfCampaign.objects.filter(id=request.data['camp_id'], DfUser=get_user_instance).exists():
                        get_campaign_ins = get_object_or_404(DfCampaign, id=request.data['camp_id'], DfUser=get_user_instance)
                        for i in range(0, len(request.data["emails"])):
                            if request.data["emails"][str(i)]:
                                ass_emails = DfUseremail(DfUser=get_user_instance, Campign=get_campaign_ins,Email=request.data["emails"][str(i)], Name=request.data["names"][str(i)],Contact=request.data["contact"][str(i)])
                                ass_emails.save()
                        message_set = "Email add in database successfully."
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
        # else:
        #     mes = "camp_id , emails ,names  is required."
        #     raise exceptions.ValidationError(mes)
        return Response({"messgae": message_set}, status=200)


def send_email_content(subject,message_content,send_email):
    email_content = message_content
    msg = email.message.Message()
    msg['Subject'] = subject
    msg['From'] = settings.EMAIL_HOST_USER
    msg['To'] = send_email
    password = settings.EMAIL_HOST_PASSWORD
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(email_content)
    s = smtplib.SMTP(settings.EMAIL_HOST + ':' + str(settings.EMAIL_PORT))
    s.starttls()
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string())
    return "True"

class SendEmailsView(APIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message_set = ""
        user_id = self.request.user.id
        if user_id:
            if DfUser.objects.filter(user__id=user_id).exists():
                get_user_instance = get_object_or_404(DfUser, user__id=user_id)
                if request.data['camp_id']:
                    if DfCampaign.objects.filter(id=request.data['camp_id'], DfUser=get_user_instance).exists():
                        get_campaign_ins = get_object_or_404(DfCampaign, id=request.data['camp_id'], DfUser=get_user_instance)
                        limit = 5
                        if request.data['send_limit']:
                            limit = request.data['send_limit']
                        if DfUseremail.objects.filter(Campign=get_campaign_ins).exists():
                            get_emails = DfUseremail.objects.filter(Campign=get_campaign_ins)[:limit]
                            for item in get_emails:
                                mail_content_content = str(get_campaign_ins.message).replace('{name}',item.Name)
                                status = send_email_content(get_campaign_ins.Subject, mail_content_content,item.Email)
                                DfUseremail.objects.filter(id=item.id).update(mail_sent_status=True,Sent_date=datetime.now())
                                # message_set += "||"+item.Name+"=="+str(status)
                            message_set = "Send All Email."
                        else:
                            message_set = "All email is sent."
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
        return Response({"messgae": message_set}, status=200)