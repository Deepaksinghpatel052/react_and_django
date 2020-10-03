from rest_framework import serializers
from .models import DfBlogs

class DfBlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DfBlogs
        fields = ['id', 'Blog_Title', 'Blog_slug', 'Blog_Image', 'Message','Create_date']