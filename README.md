# Movie Recommendation App

This is a movie recommendation app build using React for the front-end, express for the back-end, flask for handelling the recommendations and mongoDB for the database and tmdb api to fetch the movie details. It showcases many features such as recommendation engine, search bar, add to favourites functionality, like or dislike movie, commenting, etc.
<br/>

***
SurpriseLib is used in this project to generate recommendations using a Cosine similarity-based nearest neighbours method. Dummy users are built using the moviewlens 100K dataset for testing purposes. There are at least 20 movie ratings for each user.
![image](https://user-images.githubusercontent.com/56230034/170880146-461fc98e-477d-4240-844a-cb3e029080b7.png)

# Link for the flask backend server: 
```https://github.com/goelnaman66/flask-server```
***
# Link for the streamlit app:
```https://github.com/goelnaman66/streamlit-movie-app```



# Features of the App
```In today's hectic society, recommendation systems are becoming increasingly vital. People are constantly on the lookout for products and services that are tailored to their specific needs. As a result, recommendation systems are critical since they assist them in making the best decisions without having to use their cognitive resources.```
<br/>
<br/>
Recommendations are based on similar users(UserBased Collaborative Filtering),similar movies (itemBased colaborative filtering), KNN Baseline( A basic collaborative filtering algorithm taking into account a baseline rating), and NMF (A collaborative filtering algorithm based on Non-negative Matrix Factorization)
<br/>
<br/>
#<b>(in deployment of the flask server the item based model and knn baseline exceeds the available memory limit on the free tier of Heroku so this has not been included)
</b>
***![image](https://user-images.githubusercontent.com/56230034/170880769-72d93c59-258f-4ebb-b4da-2774ddcda642.png)***
<br/>

## 1. User Based Collaborative Filtering
<br/>
User-Based Collaborative Filtering is a technique used to predict the items that a user might like on the basis of ratings given to that item by the other users who have similar taste with that of the target user.

***![image](https://user-images.githubusercontent.com/56230034/170883704-4126e84f-48a5-4c89-8d22-52ceffb27a55.png)***

## 2. Item Based Collaborative Filtering
<br/>
<b>It can take few minutes to show recommendation</b>
The fundamental assumption for this method is that a user gives similar ratings to similar movies Here, we explore the relationship between the pair of items (the user who liked Y, also liked Z).

***![image](https://user-images.githubusercontent.com/56230034/170884106-54c7ba77-3292-4836-b519-1b27df9c7aed.png)***

## 3. Knn Baseline Collaborative Filtering
<br/>
<b>It can take few minutes to show recommendation</b>

A basic collaborative filtering algorithm taking into account a baseline rating.

***![image](https://user-images.githubusercontent.com/56230034/170884187-75f2656d-b226-4f21-b51a-172e0ef2107b.png)***

## 4. NMF Based Collaborative Filtering
<br/>
A collaborative filtering algorithm based on Non-negative Matrix Factorization.

***![image](https://user-images.githubusercontent.com/56230034/170884221-658b2d60-69f9-43a7-8006-a1d598c4a649.png)***

## 5. Analysis of Different Recommendation Algorithms

***![image](https://user-images.githubusercontent.com/56230034/170883990-5f90cc6f-6795-4ce9-a98f-a18aaedf6e60.png)***

## Signin And Signup
<br/>

Dummy User<br/>
email: goelnaman66@gmail.com<br/>
password: 123456<br/>
<br/>
![Screenshot](https://user-images.githubusercontent.com/56230034/170882348-05fbefdf-0843-4e30-8f88-4e5c03382049.png)

## Movie Details Page

It contains features like ratings, add to favourites movie description, comments section, like and dislike, movie info, etc.
![image](https://user-images.githubusercontent.com/56230034/170882617-411e72cf-78ce-452c-bfaa-c926c9470bfb.png)

## Search Feature

User can search for different movies in the search bar provided on the search page.
![image](https://user-images.githubusercontent.com/56230034/170882675-4ab2dc74-a20a-4d7f-b1c7-bbcb65a4d475.png)


## Favourite Page

 User can add or remove movies to his/her favourite list.
 ![image](https://user-images.githubusercontent.com/56230034/170882729-c237cb40-e261-4905-8f2f-ec26d90d0290.png)


## How to use the app

Clone the repo or download and unzip it<br/>
Use command propmt to navigate to the extracted folder
Run

```npm install```

navigate to the Client folder and run

```npm install```
***
run the client and server seperately
<br/>


in the root folder run<br/>

```npm start```

in another command prompt in the client folder run
<br/>

```npm start```
<br/>
***

## How to use the flask server
1. Clone the repo or download and unzip it ```https://github.com/goelnaman66/flask-server```
2. Create a virtual environment with <b> Python version 3.7.13 </b>
3. Run command
  ```pip install -r requirements.txt``` 
  in the anaconda prompt or cmd
  <br/>
  
