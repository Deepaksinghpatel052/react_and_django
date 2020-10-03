from rest_framework import serializers
from .models import DfOrders,DfOrdersAndPayment
from manage_pricing.models import DfPrice
from accounts.models import DfUser



class DfOrderSerializer(serializers.ModelSerializer):
    # Job_DfJobs = DfJobsSerializer(read_only=True,many=True)
    DfUser = serializers.PrimaryKeyRelatedField(many=False,queryset=DfUser.objects.all())
    Package = serializers.PrimaryKeyRelatedField(many=False,queryset=DfPrice.objects.all())
    class Meta:
        model = DfOrders
        fields = ['id', 'Order_id', 'DfUser','Package','Final_Amount','Duration_Type','Duration_Time','Create_Date','Payment','Payment_Type','Transaction_id','Payment_Date','Active','Start_Date','End_Date']
        depth = 2


class DfOrdersAndPaymentSerializer(serializers.ModelSerializer):
    # Job_DfJobs = DfJobsSerializer(read_only=True,many=True)
    DfUser = serializers.PrimaryKeyRelatedField(many=False,queryset=DfUser.objects.all())
    Package = serializers.PrimaryKeyRelatedField(many=False,queryset=DfPrice.objects.all())
    class Meta:
        model = DfOrdersAndPayment
        fields = ['id', 'Order_id', 'DfUser','Package','Final_Amount','Duration_Type','Duration_Time','Create_Date','Payment','Payment_Type','Transaction_id','Payment_Date','Active','Start_Date','End_Date']
        depth = 2