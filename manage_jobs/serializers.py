from rest_framework import serializers
from .models import DfJobCategory,DfJobs,DfJobApplaicationSet

class DfJobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DfJobCategory
        fields = ['id', 'CategoryName', 'Create_date']

class DfJobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DfJobs
        fields = ['id', 'Category_name', 'Job_Title','Job_slug','Job_Description','Create_date']
        depth = 2

class DfJobsApplicationSerializer(serializers.ModelSerializer):
    # Job_DfJobs = DfJobsSerializer(read_only=True,many=True)
    Job_title = serializers.PrimaryKeyRelatedField(many=False,queryset=DfJobs.objects.all())
    job_cate = serializers.PrimaryKeyRelatedField(many=False,queryset=DfJobCategory.objects.all())
    class Meta:
        model = DfJobApplaicationSet
        fields = ['id', 'Job_title', 'job_cate','Name','email','contact_no','Application_Date']
        depth = 2