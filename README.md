# Welcome to BlogIt 

BlogIt is an application where you can make post about whatever you want (even upload photos!)

* Create an account to start: you only need a username and a password!

* Start publishing: you can post anything! 

* Don't like your post? Just delete it!

## Stack used: 
This application was made with: 

* ⚛️ ReactJS for the UI.
* 🎯 React Router DOM for the client side routing.
* 🍀 NodeJS and Express for the backend.
* 💾 SQLite3 for the database where the users and the posts are saved.
* 🧊 Sequelize as an ORM 
* 📋 Passport for the user authentication
* 👀 [Check the full dependency list](https://github.com/jjuannn/BlogIt/blob/d912b8904a5f695d08f21aa37129339ffb7fc805/package.json#L5)

## Instalation: 
Follow the following steps for a correct installation:

* Run `npm install` to install the dependencies (this could take a while!) 

* Create a file called `.env` in the root directory and past the `.env.dist` content

* Run `npm run dev` to start the app in development mode, and `npm run prod to start in production mode`

* Open your browser and go to `http://localhost:3000` to use the app ( the backend server will be running at `http://localhost:8080` )

* Have fun! 

## TO-DO: 
Features pending to be added

* - [ ] Improve authentication implementation
* - [x] User profiles pages
* - [ ] Add a functionality to mark posts as `favorite`
* - [ ] Testing for front and backend

