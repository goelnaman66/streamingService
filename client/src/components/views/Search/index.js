import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Row, Button } from 'antd';

import { Card, Input, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import GridCard from '../../commons/GridCards'
const { Title } = Typography;

const image = 'https://image.tmdb.org/t/p/original';

const Search = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios(url);
                setData(result.data.results);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    const truncate = (description, n) => {
        return description.length > n
            ? description.substr(0, n - 1) + '...'
            : description;
    };

    const movieDetails = (movie) => {
        localStorage.setItem('selectedMovie', movie);
    };

    return (
        <Fragment>
            <>
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <form class="example" onSubmit={(e) => {
                        setUrl(
                            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
                        );
                        e.preventDefault();
                    }}>
                        <input type="text"  name="search" onChange={(event) => setQuery(event.target.value)} style={{ width: '90%', height:'3rem ' }} />
                        <button type="submit" style={{
                            float: "right",
                            width: '9%',
                            height:'3rem ',
                            background: 'rgba(255,255,255,0.5)',
                            color: 'white',
                            border: 'none', /* Prevent double borders */
                            cursor: 'pointer',
                            
                            }}>Search</button>
                </form>
                </div>
            

            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div style={{ width: '85%', margin: '1rem auto' }}>

                    {/* <Title level={2} > Movies by latest </Title> */}
                    <hr />
                    <Row gutter={[16, 16]}>
                        {data && data.map((movie, index) => (
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


            )}
        </>
        </Fragment >
    );
}

export default Search