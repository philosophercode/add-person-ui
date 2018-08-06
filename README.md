# **Add Person**

Add a person to the database!

<!-- ![Add Person](https://thumb.ibb.co/gMdFpS/screenshot.png) -->
![Add Person](https://image.ibb.co/jAORw7/screenshot.png)

#### Table of Contents

- [Overview](#overview)
- [Build/Run](#build/run)
- [Interact](#interact)

- [Other](#other)
- [Citations](#citations)



##Overview
- Add a new person using the schema, Name(string), Age(integer), Date-of-Birth(date), Email(string)

- Tech Stack
   - API (deployed to heroku)
       - Flask
       - Gunicorn
       - PostgreSQL

   - Client (deployed to heroku)
       - React.js
           - create-react-app
           - reactstrap (Bootstrap 4 for react.js)


##Build/Run
- Client
   - Initialize a git inside the app directory
   - Add the heroku buildpack
   - Remove the production build from .gitignore
   - Build react.js app for production
   - Push code to Heroku
   - Run on Heroku


```
cd add_person
git init
heroku create -b https://github.com/heroku/heroku-buildpack-static.git
echo '{ "root": "build/" }' > static.json
sed '/build/d' .gitignore > .gitignore.new && mv .gitignore.new .gitignore
npm run build
git add .
git commit -m "create-react-app on Heroku deploy"
git push heroku master
heroku open
```



- API/DB
   - Initialize a git inside the app directory
   - Push code to Heroku
   - Add PostgreSQL Heroku addon
   - Run on Heroku
   - On Heroku console run python and import the database schema
   - On Heroku console run psql and add the case-insensitive text type extension to the 'email' column


```
cd add_person_api
git init
git add .
git commit -m "flask / pSQL Heroku deploy"
heroku create add-person-api
git push heroku master
heroku addons:create heroku-postgresql:hobby-dev
heroku open

heroku run python
>>> from app import db
>>> db.create_all()
>>> exit()

heroku psql
add-person-api::DATABASE=> CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
add-person-api::DATABASE=> ALTER TABLE person ALTER COLUMN email TYPE citext;
add-person-api::DATABASE=> \q

```



##Interact
- Open app url: [http://add-person-reactjs.herokuapp.com/](http://add-person-reactjs.herokuapp.com/)
- Fill form
- Click Preview
   - Person fields are displayed read-only
   - Click 'Edit' if incorrect
   - Click 'Add Person' if Correct
- If successfully committed to database
   - Database commit is displayed
       - Can create new person
- If not committed to database
   - Form with last state is redisplayed
   - Email field is highlighted red with error message above

- View all database entries with the API: [https://add-person-api.herokuapp.com/person](https://add-person-api.herokuapp.com/person)



##Citations
- DB
   - [https://devcenter.heroku.com/articles/heroku-postgresql](https://devcenter.heroku.com/articles/heroku-postgresql)
   - [https://nandovieira.com/using-insensitive-case-columns-in-postgresql-with-citext](https://nandovieira.com/using-insensitive-case-columns-in-postgresql-with-citext)

- Deployment
   - [http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku](http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku)
   - [https://gist.github.com/mars/5e01bb2a074594b44870cb087f54fe2f](https://gist.github.com/mars/5e01bb2a074594b44870cb087f54fe2f)


Isaac Steinberg 2018 ©
steinbergisaac@gmail.com