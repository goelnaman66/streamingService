import './Recommend.css'
import React, { useEffect, useState } from 'react'
import { Typography, Popover, Row, Button } from 'antd';
import GridCard from '../../commons/GridCards'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
const { Title } = Typography;

function RecommendationPage() {

    const [ratingsdata, setRating] = useState([]);
	const userID = localStorage.getItem('userId');
    const [recommendations, setRecommendations] = useState([])
    const user = useSelector(state => state.user);

    useEffect(() => {
		const userinfo = async () => {
			const res = await axios.get("/api/users/"+userID)
			setRating(res.data)
		}

		userinfo()
		
	}, [])





    const generateCollaborativeFilteringRecommendations = async(event) => {

        try {
            console.log("target.value = ", event.target.value)
            const recommender_type = event.target.value
            let userRatings = ratingsdata;
            console.log(ratingsdata)
            let data = {
                    recommender_type: await JSON.stringify(recommender_type),
                    userID: await JSON.stringify(userID),
                    ratings: await JSON.stringify(ratingsdata)
                }
                // console.log("params = ", params)

            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                }
                console.log("userID = ", data.userID);
                console.log("Ratings = ", data.ratings)
                data = await JSON.stringify(data)

                let res = []
                if (recommender_type === "userBasedCF") {
                    console.log("making pst request to 'https://finalmoviebackend.herokuapp.com/recommendations/usercolaborativefiltering'")
                    res = await axios.post('https://finalmoviebackend.herokuapp.com/recommendations/usercolaborativefiltering', data, config)
                } else if(recommender_type === "itemBasedCF") {
                    console.log("making pst request to 'http://127.0.0.1:5001/recommendations/itemcolaborativefiltering'")
                    res = await axios.post('http://127.0.0.1:5001/recommendations/itemcolaborativefiltering', data, config)
                }
                else if(recommender_type === "newitemBasedCF"){
                    console.log("making pst request to 'http://127.0.0.1:5001/newrecommendations/itemcolaborativefiltering'")
                    res = await axios.post('http://127.0.0.1:5001/recommendations/newitemcolaborativefiltering', data, config)
                }
                else if(recommender_type === "Analysis"){
                    window.location.assign('https://streamlit-movie.herokuapp.com/')
                }
                else {
                    console.log("making pst request to 'https://finalmoviebackend.herokuapp.com/newrecommendations/itemcolaborativefiltering'")
                    res = await axios.post('https://finalmoviebackend.herokuapp.com/recommendations/nmfitemcolaborativefiltering', data, config)
                }
                console.log("recommendations = ", res.data)

                console.log("Recommendations id recieved --->  making the tmdb api calls")
                    let recommended_movies = []
                    try{
                        for (let i = 0; i<res.data.length; i++){
                            let id = res.data[i]
                            const endpoint = `${API_URL}movie/${id}?api_key=${API_KEY}`
                            const result = await ( await fetch(endpoint) ).json()
                            console.log("results after the movie call = ", result)
                            recommended_movies.push(result)
                        }
                        console.log(recommended_movies)
                    }catch(err){
                        console.log("some error in the for loop in the recommendations.jsx")
                    }

                    setRecommendations(recommended_movies)
                    console.log("All the api calls success : - setting loading to false")
                    console.log(recommended_movies.length)
                    return 

                }
            
            catch (error) {
                
                console.log("error in the catch block of the attempt to fetch recommendations block in the recommendations.jsx")
                console.log("error = ", error.message)
            }

        }
        catch(error){
            console.log(error.message)
        }
    }


    if (user.userData && !user.userData.isAuth) {
        return alert('Please Log in first');
    }

    if(recommendations.length!=0){
        
    }

    console.log(recommendations.length)

    if (recommendations.length  === 0 ){ 
        return(
            <div>
                <div>
                    <p>This is the recommendations page</p>
                </div>
                
                
                    <div className="btn-recommend">
                        <button onClick={ generateCollaborativeFilteringRecommendations } value = "itemBasedCF" className="generateRecBtn">Item Based Collaborative Filtering Recommendations</button>
                        <button onClick={ generateCollaborativeFilteringRecommendations }  value = "userBasedCF" className="generateRecBtn">User Based Collaborative Filtering Recommendations</button>
                        <button onClick={ generateCollaborativeFilteringRecommendations } value = "newitemBasedCF" className="generateRecBtn">KNN Based Collaborative Filtering Recommendations</button>
                        <button onClick={ generateCollaborativeFilteringRecommendations } value = "knnitemBasedCF" className="generateRecBtn">NMF Based Collaborative Filtering Recommendations</button>
                        <button onClick={ generateCollaborativeFilteringRecommendations } value="Analysis" className="generateRecBtn">Show Analysis of all Algorithms</button>
                    </div>
                
                
                </div>
            )
        }

        if(recommendations.length!=0){
            return(
                <div>
                    <p>This is after the recommendations are generated...</p>
                    <div style={{ width: '85%', margin: '1rem auto' }}>

                        <Title level={2} > Movies by latest </Title>
                        <hr />
                        <Row gutter={[16, 16]}>
                            {recommendations && recommendations.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <GridCard
                                        image={movie.poster_path ?
                                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                            : null}
                                        movieId={movie.id}
                                        movieName={movie.original_title}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                </div>
            )
        }
        
    }

export default RecommendationPage
