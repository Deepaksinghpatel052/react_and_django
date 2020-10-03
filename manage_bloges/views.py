from .models import DfBlogs
from .serializers import DfBlogsSerializer
from rest_framework import generics
from .api_pagination import ProductLimitOffsetPagination , PrtoductPageNumberPagination
# Create your views here.


class GetBloges(generics.ListCreateAPIView):
    queryset = DfBlogs.objects.all().order_by("-id")
    serializer_class = DfBlogsSerializer
    agination_class = PrtoductPageNumberPagination

class GetOneBloge(generics.RetrieveAPIView):
    queryset = DfBlogs.objects.all()
    serializer_class = DfBlogsSerializer
