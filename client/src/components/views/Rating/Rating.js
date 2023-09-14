import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { useSelector } from 'react-redux';
import axios from 'axios';


// function Rating(props){


// 	useEffect(()=>{

// 		const variable ={
// 			userId:props._id
// 		}
// 		axios.post('/api/rating/ratingNumber', variable)
// 		.then(response=> {
// 			if(response.data.success){

// 			}
// 			else{
// 				alert("failed to get ratingNumber")
// 			}
// 		})
// 	})
// }








const Rate = (props) => {
	const [rate, setRate] = useState(0);
	const [ratingsdata, setRating] = useState([]);
	// let ratingsdata=[]
	const user = useSelector(state => state.user);
	const userID = props.userFrom
	const movieID = props.movieId



	// let movieRating  = -1

	// fetch('/api/users/${userID}')
	// .then(async response => {
	// 	const user = await response.json();

	// const userinfo=axios.get('/api/users/${userID}');
	// console.log(userinfo);

	useEffect(() => {
		const userinfo = async () => {
			const res = await axios.get("/api/users/"+userID)
			// ratingsdata = res.data
			setRating(res.data)
			// console.log(ratingsdata)
			for(let i = 0; i<res.data.length; i++) {
				if (res.data[i][0] === movieID ) {
					// movieRating = res.data[i][1]
					setRate(res.data[i][1])
				}
			}
			// console.log('movie rating ' + movieRating)
		}

		userinfo()
		
	}, [])
	
	const rateMovie = async (givenRating) => {
		// ratingsdata.push([movieID, givenRating] );
		setRating(ratingsdata.push([movieID, givenRating]))
		// console.log(ratingsdata.length);
		const updatedUser = await axios.post("/api/users/update", {userID, "updateField":"ratings" , "updatedValues":ratingsdata})
		console.log("updated user = ",  updatedUser )
    }


	return (
		<Container>
		{[...Array(5)].map((item, index) => {
			const givenRating = index + 1;
			return (
			<label>
				<Radio
				type="radio"
				value={givenRating}
				
				onClick={() => {
					if (user.userData && !user.userData.isAuth) {
						return alert('Please Log in first');
					}
					else{
						if(rate === 0) {
							setRate(givenRating);

							alert(`Are you sure you want to give ${givenRating} stars ?`);
							rateMovie(givenRating)
						}
						else {
							alert(`Movie already rated to ${rate} stars`)
						}
						
					}
				}}
				/>
				<Rating>
				<FaStar
					color={
					givenRating < rate || givenRating === rate
						? "rgb(0,0,0)"
						: "rgb(192,192,192)"
					}
				/>
				</Rating>
			</label>
			);
		})}
		</Container>
	);
	
};

export default Rate;
