from django.shortcuts import render
from .serializers import UrunSerializer
from rest_framework import viewsets
from .models import Urun

class UrunView(viewsets.ModelViewSet):
    serializer_class = UrunSerializer
    queryset = Urun.objects.all()
