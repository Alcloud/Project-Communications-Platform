# Generated by Django 2.1.2 on 2019-01-12 23:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='last_message',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chats.ChatMessage'),
        ),
        migrations.AddField(
            model_name='chat',
            name='last_update',
            field=models.DateTimeField(auto_now=True),
        ),
    ]