from .models import DfFaqs
from .serializers import DfFaqsSerializer
from rest_framework import generics,filters
from manage_orders_and_payments.models import DfOrders
from .api_pagination import ProductLimitOffsetPagination , PrtoductPageNumberPagination
# Create your views here.


class GetFaqs(generics.ListCreateAPIView):
    serializer_class = DfFaqsSerializer
    agination_class = PrtoductPageNumberPagination

    def get_queryset(self, *args, **kwargs):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        DfOrders.objects.all().delete()
        result_ = DfFaqs.objects.all().order_by("-id")
        if 'category' in self.request.GET:
            result_ = None
            category_get = self.request.GET['category']
            if DfFaqs.objects.filter(Category__Category=category_get).exists():
                result_ = DfFaqs.objects.filter(Category__Category=category_get).order_by("-id")
        return result_

class GetOneFaq(generics.RetrieveAPIView):
    queryset = DfFaqs.objects.all()
    serializer_class = DfFaqsSerializer

