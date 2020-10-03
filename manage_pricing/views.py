from .models import DfPrice
from .serializers import DfPriceSerializer
from rest_framework import generics,viewsets
from .api_pagination import ProductLimitOffsetPagination , PrtoductPageNumberPagination
# Create your views here.


class GetPriceList(generics.ListCreateAPIView):
    queryset = DfPrice.objects.all().order_by("Orders_set")
    serializer_class = DfPriceSerializer
    agination_class = PrtoductPageNumberPagination


# class AddJobsApplication(generics.ListCreateAPIView):
#     queryset = DfJobApplaicationSet.objects.all().order_by("-id")
#     serializer_class = DfJobsApplicationSerializer
#     agination_class = PrtoductPageNumberPagination
#
#
#
#
class GetOnePackage(generics.RetrieveAPIView):
    queryset = DfPrice.objects.all()
    serializer_class = DfPriceSerializer
