from rest_framework import serializers
from .models import DfFaqs

class DfFaqsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DfFaqs
        fields = ['id','Category', 'Question', 'Question_slug', 'Ansews', 'Create_date']
        depth = 2
