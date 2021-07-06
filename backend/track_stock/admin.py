from django.contrib import admin

from .models import Urun

class TrackStockAdmin(admin.ModelAdmin):
    list = ("title", "code", "brand", "price")

admin.site.register(Urun, TrackStockAdmin)
