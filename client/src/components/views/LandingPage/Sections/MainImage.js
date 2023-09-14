import React from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

function MainImage(props) {
    return (
        <div
            style={{
                background:`linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0) 41%,rgba(0,0,0,0.65) 100%),
                            url('${props.image}'), #1c1c1c`,
                height: '600px',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative'
            }}
        >
            <div>
                <div style={{ padding: '10px', position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem', backgroundColor: 'rgba(7, 34, 39, 0.3)', borderRadius: '15px' }} >
                    <Title style={{ color: 'white' }} level={2} > {props.title} </Title>
                    <p style={{ color: 'white', fontSize: '1rem' }}  >{props.text} </p>
                </div>
            </div>
        </div>
    )
}

export default MainImage