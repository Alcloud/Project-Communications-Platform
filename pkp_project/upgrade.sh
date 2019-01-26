#!/bin/sh
#
# !! Do not run this local, only for server installation !!
# 
# This update-script needs an npm-angular and django requirement
# and sudo rights to upgrade the project files.
# Use this script with the pkp-project-phat, like
# > sh pkp_project/upgrade /srv/pkp_project

PRJPATH=${1}

if [ -d $PRJPATH/pkp_project ]; then 
        echo "Pkp project found.."
        echo "Ugrade start."
else
        echo "No pkp_project found!"
        echo "Use from pkp-project folder"
        exit 1
fi

# git checkout
cd  $PRJPATH
git reset --hard
git pull

# python activate, install dep's
if [ -e ./pkpenv/bin/activate ]; then 
	. ./pkpenv/bin/activate
else 
	echo "pkpenv in $PRJPATH not found"
	exit 1
fi

pip install -r requirements.txt

# save old db
if [ -e db.sqlite3 ]; then 
	cp db.sqlite3 db.sqlite3.bk
fi

# migrate the db
python manage.py makemigrations
python manage.py migrate

# angular deploy
cd $PRJPATH/web/frontend
npm install .
#ng build --prod
ng build --prod --deployUrl './static/'
#ng build --prod --deployUrl './static/frontend/'

cd $PRJPATH/web 
cp templates/index.html templates/index.html.org
cp static/frontend/index.html templates/index.html


# fix permissions
cd  $PRJPATH
sudo chown :www-data -R ./*
sudo chmod g+w ./db.sqlite3

# apache2 reload
sudo service apache2 reload

