from rest_framework import serializers
from .models import DfQueryInfo

class QuerysetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DfQueryInfo
        fields = ['id', 'Name', 'Your_Email', 'Message', 'Other_Data','Create_date']