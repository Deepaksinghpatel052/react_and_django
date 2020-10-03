from rest_framework.views import APIView
from django.shortcuts import redirect,get_object_or_404
from rest_framework.response import Response
from datetime import datetime
from .serializear import PaswordResetSerializers,EmailSerializers,AccountActivateSerializers,UserSerializers,RegistrationSerializers,LoginSerializers,DfUserSerializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import login as django_login ,logout as django_logout
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import DfUser
from django.contrib.auth.models import User
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import exceptions
from django.template.loader import render_to_string
import email.message
import smtplib
from  dashifyproject.tokens  import account_activation_token,CsrfExemptSessionAuthentication
from django.utils.encoding import force_bytes, force_text
from django.views.decorators.csrf import csrf_exempt
# Create your views here.



class Testdata(APIView):

    def get(self,request):
        return Response("skdjncdj")



def open_admin(request):
    return redirect(settings.BASE_URL+"admin")



def send_forget_pasword_link(user_id,yourname,user_email_set):
# ====================================== SEND MAIL ===============
        user_id = user_id
        uid = urlsafe_base64_encode(force_bytes(user_id))
        get_user_instant = User.objects.get(email=user_email_set)
        token_get = account_activation_token.make_token(get_user_instant)
        forget_password_linki = settings.BASE_URL_OTHER_SITE + "password-reset/" + uid + "/" + token_get
        logo_image = settings.BASE_URL + 'static/logo.png'
        yourname = yourname
        user_email = user_email_set
        data_content = {"BASE_URL_other_site": settings.BASE_URL_OTHER_SITE, "BASE_URL": settings.BASE_URL,
                        "yourname": yourname, "user_email": user_email,
                        "logo_image": logo_image, "forget_password_linki": forget_password_linki}
        email_content = render_to_string('email_template/email_send_for_forget_password.html', data_content)
        msg = email.message.Message()
        msg['Subject'] = 'Password Reset Link'
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = user_email
        password = settings.EMAIL_HOST_PASSWORD
        msg.add_header('Content-Type', 'text/html')
        msg.set_payload(email_content)
        s = smtplib.SMTP(settings.EMAIL_HOST + ':' + str(settings.EMAIL_PORT))
        s.starttls()
        s.login(msg['From'], password)
        s.sendmail(msg['From'], [msg['To']], msg.as_string())
        return "True"    
        # ====================================== SEND MAIL ===============




def send_varification_link(user_id,yourname,user_email_set):
    # ====================================== SEND MAIL ===============
        user_id = user_id
        uid = urlsafe_base64_encode(force_bytes(user_id))
        get_user_instant = User.objects.get(email=user_email_set)
        token_get = account_activation_token.make_token(get_user_instant)
        varification_link = settings.BASE_URL_OTHER_SITE + "Login/" + uid + "/" + token_get
        logo_image = settings.BASE_URL + 'static/logo.png'
        yourname = yourname
        user_email = user_email_set
        data_content = {"BASE_URL_other_site": settings.BASE_URL_OTHER_SITE, "BASE_URL": settings.BASE_URL,
                        "yourname": yourname, "user_email": user_email,
                        "logo_image": logo_image, "varification_link": varification_link}
        email_content = render_to_string('email_template/email_send_for_create_new_account.html', data_content)
        msg = email.message.Message()
        msg['Subject'] = 'Account Create successfully'
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = user_email
        password = settings.EMAIL_HOST_PASSWORD
        msg.add_header('Content-Type', 'text/html')
        msg.set_payload(email_content)
        s = smtplib.SMTP(settings.EMAIL_HOST + ':' + str(settings.EMAIL_PORT))
        s.starttls()
        s.login(msg['From'], password)
        s.sendmail(msg['From'], [msg['To']], msg.as_string())
        return "True"    
        # ====================================== SEND MAIL ===============





# ======================================Forgate password send link start=====================================================

class GetLinkOfForgetPassword(APIView):

    def post(self,request):
        if request.method == "POST":
            UserSerializer = EmailSerializers(data=request.data)
            UserSerializer.is_valid(raise_exception=True)
            user = UserSerializer.validated_data['user']
            send_forget_pasword_link(user.id,user.first_name+" "+user.last_name,user.email)
            message = "Pasword reset link is sent to your register email."
        return Response( {"message":message})         
# ======================================Forgate password send link end=====================================================

class SendVarificationLink(APIView):
    
    def post(self,request):
        if request.method == "POST":
            UserSerializer = EmailSerializers(data=request.data)
            UserSerializer.is_valid(raise_exception=True)
            user = UserSerializer.validated_data['user']
            send_varification_link(user.id,user.first_name+" "+user.last_name,user.email)
            message = "Account varification link is send to your mail." 
        return Response( {"message":message})       


class UserList(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    def get(self,request):
        users = DfUser.objects.all()
        UserSerializer = DfUserSerializers(users,many=True)
        return Response(UserSerializer.data)


class ResetPasswordView(APIView):

    def post(self,request):
        if request.method == "POST":
            serializer = PaswordResetSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
        return Response({"messgae": serializer.validated_data}, status=200)    

class ActivateYoutAccount(APIView):


    def post(self,request):
        if request.method == "POST":
            serializer = AccountActivateSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
        return Response({"messgae": serializer.validated_data}, status=200)        

class UserRegistration(APIView):
    def post(self,request):
        if request.method == "POST":
            serializer = RegistrationSerializers(data=request.data)
            data = {}
            if serializer.is_valid():
                user = serializer.save()
                data['response'] = "Account create successfuly"
                data['email'] = user.email
                data['username'] = user.username
                token = Token.objects.get(user=user).key
                data['Token'] = token
                send_varification_link(user.id,user.first_name+" "+user.last_name,user.email)
            else:
                data = serializer.errors
            return Response(data)


class LoginView(APIView):
	
	
    @csrf_exempt
    def post(self,request):
        serializer = LoginSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        django_login(request,user)
        token ,create = Token.objects.get_or_create(user=user)
        DfUser.objects.filter(user=user).update(Last_login=datetime.now())
        get_user_info = DfUser.objects.filter(user=user)
        get_user_info_seri = DfUserSerializers(get_user_info,many=True)
        return Response({"message":"Login successfully", "Token":token.key,"user_info":get_user_info_seri.data},status=200)


class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)

    def post(self,request):
        django_logout(request)
        return Response(status=204)



class LoginUserInfoView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]    

    def get(self,request):
        user_data = {}
        if DfUser.objects.filter(user=self.request.user).exists():
            get_Dfuser_ins = get_object_or_404(DfUser,user=self.request.user)
            get_user_info_seri = DfUserSerializers(get_Dfuser_ins)
            user_data = get_user_info_seri.data
        else:
            message = "User not found."
            raise exceptions.ValidationError(message)    
        return Response({"user_info":user_data},status=200)    



class GgetAllUser(APIView):

    def get(self,request):
        user_data = []
        if User.objects.all().exists():
            get_Dfuser_ins = User.objects.all().order_by('username')
            if get_Dfuser_ins:
                for item in get_Dfuser_ins:
                    user_data.append(item.username)
        return Response({"user_info":user_data},status=200)

