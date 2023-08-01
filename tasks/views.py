from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task
from django.contrib.auth.models import Permission


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    http_method_names = ["get", "post", "patch", "put", "delete"]
