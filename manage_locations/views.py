from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializear import GetOpenhourSerializers,GetOpneHourByLocationIdViewSerializers,RemoveImagesFilesByLocationIdImageIdSerializers,UpdateImagesFilesByLocationIdImageIdSerializers,UpdateImagesFilesByLocationIdSerializers,RemoveLocationByIdSerializers,GetConnectionWithCocialMediaSerializers,GetAllConnectionOfOneLocationSerializers,LocationRemoveWithSocialMediaSerializers,LocationWithSocialMediaSerializers,EditLocationpaymentMethodSerializers,EditLocationHoursSerializers,EditLocationBusinessSerializers, GetOneLocationSerializersValidate, AddLocationSerializers,GetAllLocationSerializers,GetAllLocationSerializersValidate
from dashifyproject.tokens import CsrfExemptSessionAuthentication
from accounts.models import DfUser
from .models import DfBusinessLocation,DfLocationImage,DfLocationPaymentMethod,DfLocationConnectPlatform,DfLocationOpenHours
from datetime import date
import base64
from django.core.files.base import ContentFile
from manage_dropdown_value.models import DfBusinessCategory,DfCountry,DfState

# Create your views here.



class GetOpenHourByLocationIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {}
        message = ""
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = GetOpneHourByLocationIdViewSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_bus_loca_ins = serializer.validated_data
            if DfLocationOpenHours.objects.filter(Business_Location=get_bus_loca_ins).filter(Type=request.data['set_type']).exists():
                get_open_houre = DfLocationOpenHours.objects.filter(Business_Location=get_bus_loca_ins).filter(Type=request.data['set_type'])
                get_open_houre_ins = GetOpenhourSerializers(get_open_houre,many=True)
                data = get_open_houre_ins.data
        return Response({"data":data},status=200)

# ================================EDIT Location payment_method ===============
class EditLocationPaymentMethodView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = ""
        if request.method == "POST":
            serializer = EditLocationpaymentMethodSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            if DfBusinessLocation.objects.filter(id=request.data['Location_id']).exists():
                get_user_instance = get_object_or_404(DfBusinessLocation, id=request.data['Location_id'])
            if DfLocationPaymentMethod.objects.filter(Business_Location=get_user_instance).exists():

                DfLocationPaymentMethod.objects.filter(Business_Location=get_user_instance).delete()
                #  ===============================================================
            for i in range(0, len(request.data["payment_method"])):
                if request.data["payment_method"][str(i)]:
                    add_payment = DfLocationPaymentMethod(Business_Location=get_user_instance,
                                                              Payment_Method=request.data["payment_method"][str(i)])
                    add_payment.save()
            #  ===============================================================
            message = "Payment method update succesfully."
        return Response({"message": message}, status=200)
# ================================EDIT Location payment_method ===============



# ================================EDIT Location Operations Hours ===============
class EditLocationHoursView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = ""
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = EditLocationHoursSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_bus_loca_ins = serializer.validated_data
            try:
                if request.data["open_houre"]["0"]["Type"] == "":
                    message = "column 'Type' is required in every row."
                    raise exceptions.ValidationError(message)
                else:
                    if DfLocationOpenHours.objects.filter(Business_Location=get_bus_loca_ins).filter(Type=request.data["open_houre"]["0"]["Type"]).exists():
                        DfLocationOpenHours.objects.filter(Business_Location=get_bus_loca_ins).filter(Type=request.data["open_houre"]["0"]["Type"]).delete()
            except:
                message = "column 'Type' is required in every row."
                raise exceptions.ValidationError(message)
            for i in range(0,len(request.data["open_houre"])):
                if request.data["open_houre"][str(i)]["Day"]:
                    add_hover  = DfLocationOpenHours(
                            Business_Location = get_bus_loca_ins,
                            date = request.data["open_houre"][str(i)]["date"], 
                            Day = request.data["open_houre"][str(i)]["Day"],
                            Type = request.data["open_houre"][str(i)]["Type"],
                            Open_status = request.data["open_houre"][str(i)]["Open_status"],
                            start_time_1 = request.data["open_houre"][str(i)]["start_time_1"],
                            end_time_1 = request.data["open_houre"][str(i)]["end_time_1"],
                            start_time_2 = request.data["open_houre"][str(i)]["start_time_2"],
                            end_time_2 = request.data["open_houre"][str(i)]["end_time_2"]
                        )
                    add_hover.save()
            message = "Location open hour is update."        
        return Response({"message": message}, status=200)
# ================================EDIT Location Operations Hours ===============


# ================================EDIT Location Business ===============
class EditLocationBusinessView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = ""
        if request.method == "POST":
            serializer = EditLocationBusinessSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            message = serializer.validated_data
        return Response({"message": message}, status=200)
# ================================EDIT Location Business ===============





class GetLocationByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        location = {}
        if request.method == "POST":
            serializer = GetOneLocationSerializersValidate(data=request.data)
            serializer.is_valid(raise_exception=True)
            location_seri = GetAllLocationSerializers(serializer.validated_data)
            location = location_seri.data
        return Response({"location": location}, status=200)

class GetAllLocationView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    # GetAllLocationSerializers
    def post(self,request):
        all_businessLocation = {}
        if request.method == "POST":
            serializer = GetAllLocationSerializersValidate(data=request.data)
            serializer.is_valid(raise_exception=True)
            all_location = DfBusinessLocation.objects.filter(DfUser=serializer.validated_data).order_by("-id")
            all_locationSerializer = GetAllLocationSerializers(all_location, many=True)
            all_businessLocation = all_locationSerializer.data
        else:
            msg = "Something wae wrong with API."
            raise exceptions.ValidationError(msg)
        return Response({"all_location":all_businessLocation},status=200)


class AddLocationView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.method == "POST":
            test = ""
            serializer = AddLocationSerializers(data=request.data)
            data_response = {}
            if serializer.is_valid():
                if DfUser.objects.filter(id=request.data['user_id']).exists():
                    get_user_instance = get_object_or_404(DfUser, id=request.data['user_id'])
                    # try:
                    set_Franchise_Location = False
                    if request.data['Franchise_Location'] == "true":
                        set_Franchise_Location = True
                    set_Do_not_publish_my_address = False
                    if request.data['Do_not_publish_my_address'] == "true":
                        set_Do_not_publish_my_address = True    
                    add_location = DfBusinessLocation(
                            DfUser=get_user_instance,
                            Store_Code = request.data['Store_Code'],
                            Location_name=request.data['Location_name'],
                            Additional_catugory=request.data['Additional_catugory'],
                            Address_1=request.data['Address_1'],
                            Address_2=request.data['Address_2'],
                            City=request.data['City'],
                            Zipcode=request.data['Zipcode'],
                            Phone_no=request.data['Phone_no'],
                            Website=request.data['Website'],
                            Franchise_Location = set_Franchise_Location,
                            Do_not_publish_my_address = set_Do_not_publish_my_address,
                            Business_Owner_Name=request.data['Business_Owner_Name'],
                            Owner_Email=request.data['Owner_Email'],
                            Business_Tagline=request.data['Business_Tagline'],
                            Year_Of_Incorporation=request.data['Year_Of_Incorporation'],
                            About_Business=request.data['About_Business'],
                            Facebook_Profile=request.data['Facebook_Profile'],
                            Instagram_Profile=request.data['Instagram_Profile'],
                            Twitter_Profile=request.data['Twitter_Profile']
                        )

                    set_category_ins = None
                    if DfBusinessCategory.objects.filter(id=request.data['Business_category']).exists():
                        set_category_ins = get_object_or_404(DfBusinessCategory, id=request.data['Business_category'])
                    add_location.Business_category = set_category_ins

                    set_country_ins = None
                    if DfCountry.objects.filter(id=request.data['Country']).exists():
                        set_country_ins = get_object_or_404(DfCountry, id=request.data['Country'])
                    add_location.Country = set_country_ins

                    set_state_ins = None
                    if DfState.objects.filter(id=request.data['State']).exists():
                        set_state_ins = get_object_or_404(DfState, id=request.data['State'])
                    add_location.State = set_state_ins

                    image_data_logo = None
                    if request.data['Business_Logo']:
                        image_file_get = request.data['Business_Logo']
                        format, imgstr = image_file_get.split(';base64,')
                        ext = format.split('/')[-1]
                        today_date = date.today()
                        set_file_name = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                        file_name = set_file_name + "." + ext
                        data = ContentFile(base64.b64decode(imgstr), name=file_name)
                        image_data_logo = data
                        print(image_data_logo)
                    add_location.Business_Logo = image_data_logo

                    image_data_banner = None
                    if request.data['Business_Cover_Image']:
                        image_file_get_cover = request.data['Business_Cover_Image']
                        format_cover, imgstr_cover = image_file_get_cover.split(';base64,')
                        ext_cover = format_cover.split('/')[-1]
                        today_date = date.today()
                        set_file_name_cover = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                        file_name_cover = set_file_name_cover + "." + ext_cover
                        data_cover = ContentFile(base64.b64decode(imgstr_cover), name=file_name_cover)
                        image_data_banner = data_cover
                    add_location.Business_Cover_Image = image_data_banner
                    add_location.save()

                    for i in range(0,len(request.data["other_image"])):
                        if request.data["other_image"][str(i)]:
                            image_file_get_other = request.data["other_image"][str(i)]
                            format_other, imgstr_other = image_file_get_other.split(';base64,')
                            ext_other = format_other.split('/')[-1]
                            today_date = date.today()
                            set_file_name_other = str(today_date.day) + "_" + str(today_date.month) + "_" + str(
                                    today_date.year)
                            file_name_other = set_file_name_other + "." + ext_other
                            data_other = ContentFile(base64.b64decode(imgstr_other), name=file_name_other)
                            image_data_other = data_other
                            add_other_image  = DfLocationImage(
                                Business_Location = add_location,
                                Image = image_data_other
                                )
                            add_other_image.save()
                    #  ===============================================================
                    for i in range(0,len(request.data["payment_method"])):
                        if request.data["payment_method"][str(i)]:
                            add_payment  = DfLocationPaymentMethod(
                                Business_Location = add_location,
                                Payment_Method = request.data["payment_method"][str(i)]
                                )
                            add_payment.save()
                        #  ===============================================================
                         #  ===============================================================
                    for i in range(0,len(request.data["open_houre"])):
                        if request.data["open_houre"][str(i)]["Day"]:
                            add_hover  = DfLocationOpenHours(
                                    Business_Location = add_location,
                                    Day = request.data["open_houre"][str(i)]["Day"],
                                    Type = request.data["open_houre"][str(i)]["Type"],
                                    Open_status = request.data["open_houre"][str(i)]["Open_status"],
                                    start_time_1 = request.data["open_houre"][str(i)]["start_time_1"],
                                    end_time_1 = request.data["open_houre"][str(i)]["end_time_1"],
                                    start_time_2 = request.data["open_houre"][str(i)]["start_time_2"],
                                    end_time_2 = request.data["open_houre"][str(i)]["end_time_2"]
                                )
                            add_hover.save()
                    #  ===============================================================
                        
                    data_response["message"] = "Location Add successfully"
                    data_response["Location_id"] = add_location.id
                    data_response["Store_Code"] = add_location.Store_Code
                    # except:
                    #     msg = "Something wae wrong with API."
                    #     raise exceptions.ValidationError(msg)

                else:
                    msg = "User_id is invalue."
                    raise exceptions.ValidationError(msg)
            else:
                data_response = serializer.errors
        return Response(data_response)

class LocationConnectWithSocialSedia(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = LocationWithSocialMediaSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_data = serializer.validated_data
        return Response({"message": get_data}, status=200)

class LocationConnectRemoveWithSocialSedia(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self,request):
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = LocationRemoveWithSocialMediaSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_data = serializer.validated_data
        return Response({"message": get_data}, status=200)


class GetAllConnectionOfOneLocation(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        all_connection_set = {}
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = GetAllConnectionOfOneLocationSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            get_all_connection=serializer.validated_data
            get_all_connection_sri = GetConnectionWithCocialMediaSerializers(get_all_connection, many=True)
            all_connection_set = get_all_connection_sri.data
        return Response({"data": all_connection_set}, status=200)

class GetAllConnectionOfBusinessLocationnToPlatfrom(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self,request):
        if DfUser.objects.filter(user=self.request.user).exists():
            get_Dfuser_ins = get_object_or_404(DfUser,user=self.request.user)
            if DfLocationConnectPlatform.objects.filter(DfUser=get_Dfuser_ins).exists():
                get_data = DfLocationConnectPlatform.objects.filter(DfUser=get_Dfuser_ins)
                get_all_connection_sri = GetConnectionWithCocialMediaSerializers(get_data, many=True)
                all_connection_set = get_all_connection_sri.data
            else:
                all_connection_set = {}    
        else:
            msg = "Login User is not exists"
            raise exceptions.ValidationError(msg)            
        return Response({"data":all_connection_set},status=200)


class RemoveLocationByIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        all_connection_set = {}
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id
            serializer = RemoveLocationByIdSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
        return Response({"messgae": serializer.validated_data}, status=200)    

class UpdateImagesFilesByLocationIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        messsage = "Image updated successfuly."
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = UpdateImagesFilesByLocationIdSerializers(data=request.data)            
            data_response = {}
            serializer.is_valid(raise_exception=True)
            ls_busloc_ins=serializer.validated_data
            Business_Logo_set = None
            add_location = get_object_or_404(DfBusinessLocation,id=request.data['location_id'])
            if "Business_Logo" in request.data:
                if request.data['Business_Logo']:
                    image_file_get = request.data['Business_Logo']
                    format, imgstr = image_file_get.split(';base64,')
                    ext = format.split('/')[-1]
                    today_date = date.today()
                    set_file_name = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                    file_name = set_file_name + "." + ext
                    data = ContentFile(base64.b64decode(imgstr), name=file_name)
                    image_data_logo = data
                    add_location.Business_Logo.delete(save=False)   
                    add_location.Business_Logo =  image_data_logo
                    add_location.save()          
                    messsage = "Business Logo "
            if "Business_Cover_Image" in request.data:
                if request.data['Business_Cover_Image']:
                    image_file_get_cover = request.data['Business_Cover_Image']
                    format_cover, imgstr_cover = image_file_get_cover.split(';base64,')
                    ext_cover = format_cover.split('/')[-1]
                    today_date = date.today()
                    set_file_name_cover = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                    file_name_cover = set_file_name_cover + "." + ext_cover
                    data_cover = ContentFile(base64.b64decode(imgstr_cover), name=file_name_cover)
                    image_data_banner = data_cover
                    add_location.Business_Cover_Image.delete(save=False)   
                    add_location.Business_Cover_Image =  image_data_banner
                    add_location.save()
                    messsage += "Business cover image "       
            messsage +=  "update successfully."   
        return Response({"message":messsage},status=200)

class AddOtherImagesFilesByLocationIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messsage = "Other image add successfully."
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = UpdateImagesFilesByLocationIdSerializers(data=request.data)            
            data_response = {}
            serializer.is_valid(raise_exception=True)
            ls_busloc_ins=serializer.validated_data
            Business_Logo_set = None
            add_location = get_object_or_404(DfBusinessLocation,id=request.data['location_id'])
            if "other_image" in request.data:
                for i in range(0,len(request.data["other_image"])):
                    if request.data["other_image"][str(i)]:
                        image_file_get_other = request.data["other_image"][str(i)]
                        format_other, imgstr_other = image_file_get_other.split(';base64,')
                        ext_other = format_other.split('/')[-1]
                        today_date = date.today()
                        set_file_name_other = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                        file_name_other = set_file_name_other + "." + ext_other
                        data_other = ContentFile(base64.b64decode(imgstr_other), name=file_name_other)
                        image_data_other = data_other
                        add_other_image  = DfLocationImage(
                                    Business_Location = add_location,
                                    Image = image_data_other
                            )
                        add_other_image.save() 
                messsage = "Other image add successfully."
        return Response({"message":messsage},status=200)


class UpdateOtherImagesFilesByLocationIdImageIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messsage = "Other image updated successfully."
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = UpdateImagesFilesByLocationIdImageIdSerializers(data=request.data)            
            data_response = {}
            serializer.is_valid(raise_exception=True)
            ls_busloc_ins=serializer.validated_data
            Business_Logo_set = None
            add_location = get_object_or_404(DfBusinessLocation,id=request.data['location_id'])
            if DfLocationImage.objects.filter(id=request.data['image_id']).exists():
                get_image_ins = get_object_or_404(DfLocationImage,Business_Location=add_location,id=request.data['image_id'])
                if request.data["image"]:
                    image_file_get_other = request.data["image"]
                    format_other, imgstr_other = image_file_get_other.split(';base64,')
                    ext_other = format_other.split('/')[-1]
                    today_date = date.today()
                    set_file_name_other = str(today_date.day) + "_" + str(today_date.month) + "_" + str(today_date.year)
                    file_name_other = set_file_name_other + "." + ext_other
                    data_other = ContentFile(base64.b64decode(imgstr_other), name=file_name_other)
                    image_data_other = data_other
                    get_image_ins.Image.delete(save=False)
                    get_image_ins.Image = image_data_other
                    get_image_ins.save()
                    messsage = "Other image updated successfully."
            else:
                msg = "image_id is incorrect."
                raise exceptions.ValidationError(msg)   
        return Response({"message":messsage},status=200)


class RemoveOtherImagesFilesByLocationIdImageIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messsage = "Other image removes successfully."
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = RemoveImagesFilesByLocationIdImageIdSerializers(data=request.data)            
            data_response = {}
            serializer.is_valid(raise_exception=True)
            ls_busloc_ins=serializer.validated_data
            Business_Logo_set = None
            add_location = get_object_or_404(DfBusinessLocation,id=request.data['location_id'])
            if DfLocationImage.objects.filter(id=request.data['image_id']).filter(Business_Location=add_location).exists():
                DfLocationImage.objects.filter(id=request.data['image_id']).filter(Business_Location=add_location).delete()
                messsage = "Other image removes successfully."
            else:
                msg = "image_id is incorrect."
                raise exceptions.ValidationError(msg)   
        return Response({"message":messsage},status=200)

class RemoveAllOtherImagesFilesByLocationIdView(APIView):
    authentication_classes = (TokenAuthentication,CsrfExemptSessionAuthentication,BasicAuthentication,)
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        messsage = "Other image removes successfully."
        if request.method == "POST":
            request.data["user_id"] = self.request.user.id 
            serializer = UpdateImagesFilesByLocationIdSerializers(data=request.data)               
            data_response = {}
            serializer.is_valid(raise_exception=True)
            ls_busloc_ins=serializer.validated_data
            Business_Logo_set = None
            add_location = get_object_or_404(DfBusinessLocation,id=request.data['location_id'])
            if DfLocationImage.objects.filter(Business_Location=add_location).exists():
                DfLocationImage.objects.filter(Business_Location=add_location).delete()
                messsage = "Other image removes successfully."
        return Response({"message":messsage},status=200)      