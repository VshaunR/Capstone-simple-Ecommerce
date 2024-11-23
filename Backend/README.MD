# Name
Capstone - Basic Fantasy Ecomerce Backend
## Installation
1:git clone https://github.com/VshaunR/Capstone-simple-Ecommerce.git
there are two folders A Backend and a Frontend
2:npm i to install all the dependancies
3: In the BACKEND there is a seend route in server.mjs
its commented out by default, to seed the data base
uncooment it and go to localhost:3000/seed 

### Dependancies on Backend
Express,Mongoose,dotenv,jwtwebtoken,bodyparser,cors,bcrypyjs

#### Usage
npm start to initialise the backend


##### Routes
# Auth
router.get('/auth')
-Gets info on authorized user except the password
router.post('/auth')
-User to verify authorized user to login

# User
router.get('/user/:id')
-user to get a specific user based on _id
router.post('/user')
-used to create a new user, needs a name,email and password
router.post('/user/cart')
-used to post a users items to mongodb
router.post('/user/history/:id')
-used to get a users order history

router.patch('/user/:id')
-used to edit a users name and email 