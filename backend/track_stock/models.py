from django.db import models

class Urun(models.Model):
    #id = models.IntegerField()
    title = models.CharField(max_length=250)
    code = models.CharField(max_length=250)
    brand = models.CharField(max_length=250)
    price = models.FloatField()

    def _str_(self) -> str:
        return f"{self.title} : {self.code}"
