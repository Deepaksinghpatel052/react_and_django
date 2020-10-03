from .models import DfOrders,DfOrdersAndPayment
from .serializers import DfOrderSerializer,DfOrdersAndPaymentSerializer
from rest_framework import generics,viewsets
# from .api_pagination import ProductLimitOffsetPagination , PrtoductPageNumberPagination
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from dashifyproject.tokens import CsrfExemptSessionAuthentication
from accounts.models import DfUser
from django.db.models import Q
from django.shortcuts import get_object_or_404
# Create your views here.




class GetOrderList(generics.ListCreateAPIView):
    serializer_class = DfOrdersAndPaymentSerializer
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        ds_user_ins = None
        if DfUser.objects.filter(user=self.request.user).exists():
            ds_user_ins = get_object_or_404(DfUser, user=self.request.user)
        result_ = None
        if DfOrdersAndPayment.objects.filter(DfUser=ds_user_ins).exists():
            if 'active' in self.request.GET:
                result_ = DfOrdersAndPayment.objects.filter(DfUser=ds_user_ins).filter(Active=self.request.GET['active']).order_by("-id")
            else:
                result_ = DfOrdersAndPayment.objects.filter(DfUser=ds_user_ins).order_by("-id")
        return result_


class UpdateOrder(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    queryset = DfOrdersAndPayment.objects.all().order_by("-id")
    loockup_field = 'id'
    serializer_class = DfOrdersAndPaymentSerializer


    def update(self, request, *args, **kwargs):
        response = super(UpdateOrder, self).update(request,*args, **kwargs)
        ds_user_ins = None
        if DfUser.objects.filter(user=request.user).exists():
            ds_user_ins  = get_object_or_404(DfUser,user=request.user)
        DfOrdersAndPayment.objects.filter(~Q(id=kwargs['pk'])).filter(DfUser=ds_user_ins).update(Active=False)
        if response.status_code ==200:
            mydata = response.data
            from django.core.cache import cache
            cache.set("ID:{}".format(mydata.get('id',None)),{'Payment':mydata['Payment'],'Payment_Type':mydata['Payment_Type'],
            'Transaction_id':mydata['Transaction_id'],'Payment_Date':mydata['Payment_Date'],'Active':mydata['Active'],
            'Start_Date':mydata['Start_Date'],'End_Date':mydata['End_Date']})
        return response

class CreateNewOrder(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication, CsrfExemptSessionAuthentication, BasicAuthentication,)
    permission_classes = [IsAuthenticated]
    queryset = DfOrdersAndPayment.objects.all().order_by("-id")
    serializer_class = DfOrdersAndPaymentSerializer

