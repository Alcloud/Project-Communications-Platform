# Application definition
from .settings import *


INSTALLED_APPS += [
    'django_jenkins',
]

JENKINS_TASKS = (
    'django_jenkins.tasks.run_pep8',
    'django_jenkins.tasks.run_pyflakes',
)

PEP8_RCFILE = 'pkp_project/settings-pep8.py'

PROJECT_APPS = [
    'chats',
    'project_messages',
    'web',
    'rest_framework',
    'project',
]


# use: python manage.py jenkins --settings=pkp_project.settings-jenkins
# pip install  django_jenkins 
# pip install pep8
# pip install pyflakes
# pip install coverage
# pip install pylint
# python manage.py jenkins --settings=pkp_project.settings-jenkins --enable-coverage
