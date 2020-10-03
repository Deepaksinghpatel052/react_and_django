from django.shortcuts import render
from .models import DfQueryInfo
from .serializers import QuerysetSerializer
from rest_framework import mixins
from rest_framework import generics

# Create your views here.

class AddQuery(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = DfQueryInfo.objects.all()
    serializer_class = QuerysetSerializer


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)