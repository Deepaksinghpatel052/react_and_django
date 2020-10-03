from rest_framework import serializers
from .models import DfPrice


class DfPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DfPrice
        fields = ['id', 'Package_Type', 'Price','Duration_Type','Duration_time','Start','Orders_set','Create_Date']
        depth = 2