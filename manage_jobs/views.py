from .models import DfJobs,DfJobApplaicationSet
from .serializers import DfJobsSerializer,DfJobsApplicationSerializer
from rest_framework import generics,viewsets
from .api_pagination import ProductLimitOffsetPagination , PrtoductPageNumberPagination
# Create your views here.


class GetJobs(generics.ListCreateAPIView):
    queryset = DfJobs.objects.all().order_by("-id")
    serializer_class = DfJobsSerializer
    agination_class = PrtoductPageNumberPagination


class AddJobsApplication(generics.ListCreateAPIView):
    queryset = DfJobApplaicationSet.objects.all().order_by("-id")
    serializer_class = DfJobsApplicationSerializer
    agination_class = PrtoductPageNumberPagination




class GetOneJob(generics.RetrieveAPIView):
    queryset = DfJobs.objects.all()
    serializer_class = DfJobsSerializer
