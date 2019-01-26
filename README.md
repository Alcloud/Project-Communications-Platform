## Getting started
### Basic requirements
Python, git, pip, node.js, npm

### Install Project requirements
```sh
pip install -r requirements.txt
```
Be sure to update `requirements.txt` when adding new dependencies.

Create db and [migrate](https://docs.djangoproject.com/en/2.1/topics/migrations/#migration-files) scheme:
```sh
python manage.py migrate
```
Create admin user ([more info](https://docs.djangoproject.com/en/2.1/intro/tutorial02/#introducing-the-django-admin)):
```sh
python manage.py createsuperuser
```

Start the development server:
```sh
python manage.py runserver
```

Open admin page http://127.0.0.1:8000/admin/

## Structure

Every part of the project has its own app ([what are apps for?](https://docs.djangoproject.com/en/2.1/ref/applications/)). For example the meeting part should be created as following ([more info](https://docs.djangoproject.com/en/2.1/intro/tutorial01/#creating-the-polls-app)):
```sh
python manage.py startapp meeteing
```
Do not forget to add a route.

`web` app is an entry point for the single page application. It consists of only one action `index` which will response with a html and all the scripts and css. All other apps should contain only [REST API](https://www.django-rest-framework.org/).

## Unit Tests for Django

```sh
python manage.py tests -v2
```

## Jenkins Tests

For all JenkisTests you must install the follow modules.

```sh
pip install django_jenkins 
pip install pep8
pip install pyflakes
pip install coverage
pip install pylint
```
And than run the follow command, this will create an report-directory with the output of the tests.

```sh
python manage.py jenkins --settings=pkp_project.settings-jenkins --enable-coverage

```

## Single Page Application
Install [angular](https://angular.io/guide/quickstart)

Angular build tool may be required:
```sh
npm install --save-dev @angular-devkit/build-angular
```

Check the source by ng-lint (static code analyze):
```sh
ng lint
```

The source code is in `web/frontend/` folder. The source should be built:
```sh
cd web/frontend/
ng build --watch
```
Where `--watch` means that angular will track files changing and will rebuild project automatically. 

## Angular apps
Angular, like django, consists of apps called components.
[Generating](https://github.com/angular/angular-cli/wiki/generate-component) component:
```sh
ng generate component meeting
```
After this a route into `/web/frontend/src/app/app-routing.module.ts` under `children` should be added.

## CSS and responsive
[Angular flex layout](https://github.com/angular/flex-layout/wiki) - framework for building responsive layout. [Demo](https://tburleson-layouts-demos.firebaseapp.com/#/docs)

[Material design](https://material.angular.io/components/categories) - UI tools such as forms, buttons, etc...

[Tutorial](https://medium.com/letsboot/quick-start-with-angular-material-and-flex-layout-1b065aa1476c)
