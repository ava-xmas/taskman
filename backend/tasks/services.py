from django.utils import timezone
from datetime import date, datetime, timedelta
from .models import Task

# fn to get tasks that are due today
def get_due_today(user):
    today = date.today()
    return Task.objects.filter(owner=user, deadline_date = today)

# fn to get tasks that are overdue
def get_overdue_tasks(user):
    today = date.today()
    return Task.objects.filter(owner=user, deadline_date__lt = today)
    # can't directly use comparison operator

# fn to get tasks that are due this week (starting today)
def get_due_this_week(user):
    today = date.today()
    start_of_week = today - timedelta(days = today.weekday())
    end_of_week = start_of_week + timedelta(days = 6)
    return Task.objects.filter(owner=user, deadline_date__range = [today, end_of_week])

# fn to get tasks that are due after this week
def get_due_later(user):
    today = date.today()
    start_of_week = today - timedelta(days = today.weekday())
    end_of_week = start_of_week + timedelta(days = 6)
    return Task.objects.filter(owner=user, deadline_date__gt = end_of_week)