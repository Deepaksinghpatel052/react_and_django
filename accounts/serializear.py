from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import testUser,DfUser
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import exceptions
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from  dashifyproject.tokens  import account_activation_token
import django


class PaswordResetSerializers(serializers.Serializer):
    pera_1 = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    pera_2 = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    password = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        pera_1 = data.get("pera_1", "")
        pera_2 = data.get("pera_2", "")
        password = data.get("password", "")

        message = ""
        try:
            uid = force_text(urlsafe_base64_decode(pera_1))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, pera_2):    
            user.set_password(password)
            user.save()
            message = "Your password is set successfuly."
        else:
            mes = "Link is invalide"
            raise exceptions.ValidationError(mes)  
        return  message


class EmailSerializers(serializers.Serializer):
    email_id = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        email_id = data.get("email_id", "")
        if User.objects.filter(email=email_id).exists():
            data["user"] =  User.objects.get(email=email_id)
        else:
            mes = "email_id is incorrcet."
            raise exceptions.ValidationError(mes)    
        return data 
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        medel = User
    fields = '__all__'


class AccountActivateSerializers(serializers.Serializer):
    pera_1 = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)
    pera_2 = serializers.CharField(style={"inpupt_type": "text"}, write_only=True)

    def validate(self, data):
        pera_1 = data.get("pera_1", "")
        pera_2 = data.get("pera_2", "")
        message = ""
        try:
            uid = force_text(urlsafe_base64_decode(pera_1))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, pera_2):
            user.is_active = True
            user.save()
            message = "Account is activated. please login."
        else:
            message = "Varification link is invalide."
        return message            


class RegistrationSerializers(serializers.ModelSerializer):
    first_name = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    last_name = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Company_name = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Country = serializers.CharField(style={"inpupt_type":"text"},write_only=True)
    Phone = serializers.CharField(style={"inpupt_type":"number"},write_only=True)
    Zip = serializers.CharField(style={"inpupt_type":"email"},write_only=True)
    class Meta:
        model  = User
        fields = ['first_name','last_name','username','password','Company_name','Country','Phone','Zip']
        eextra_kwargs = {
            'password':{'write_only':True}
        }



    def save(self):
        Userset  = User(
            username = self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email = self.validated_data['username'],
            is_active = False,
        )
        password = self.validated_data['password']
        Userset.set_password(password)
        Userset.save()

        DfUser_set  = DfUser(
            user = Userset,
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            Company_name = self.validated_data['Company_name'],
            Country = self.validated_data['Country'],
            Phone = self.validated_data['Phone'],
            Zip = self.validated_data['Zip']
        )

        DfUser_set.save()
        return Userset
# ===========================================

class LoginSerializers(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username","")
        password = data.get("password","")

        if username and password:
            user = authenticate(username=username,password=password)
            if user:
                if user.is_active:
                    data["user"] = user

                else:
                    mes = "User is not activate."
                    raise exceptions.ValidationError(mes)
            else:
                mes = "Username and pasword is incorrect & may be your account is not activate."
                raise exceptions.ValidationError(mes)
        else:
            mes = "Must provide username and password"
            raise exceptions.ValidationError(mes)
        return data


class DfUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = DfUser
        fields = ('id', 'first_name','last_name','Company_name','Country','Phone','Zip','Last_login','user')
        depth = 2

# ===========================================