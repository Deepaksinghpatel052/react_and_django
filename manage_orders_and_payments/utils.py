import random
import string
from django.utils.text import slugify


def random_string_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))




def unique_id_generator_for_order_id_for_Df_order(instance):
    order_new_id= random_string_generator()
    Klass= instance.__class__
    qs_exists= Klass.objects.filter(Order_id= order_new_id).exists()
    if qs_exists:
        return unique_id_generator_for_order_id_for_Df_order(instance)
    return order_new_id