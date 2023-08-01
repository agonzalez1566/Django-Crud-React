from django.db import models
from django.utils import timezone


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    # Nuevos campos que deseas agregar
    created = models.DateTimeField(
        default=timezone.now
    )  # Fecha de creación automáticamente establecida al guardar el objeto
    datecomplete = models.DateTimeField(
        null=True, blank=True
    )  # Fecha de finalización (puede ser nula y no es requerida para el admin)
    important = models.BooleanField(
        default=False
    )  # Campo booleano que indica si es importante o no (valor predeterminado es False)


def __str__(self):
    return self.title
