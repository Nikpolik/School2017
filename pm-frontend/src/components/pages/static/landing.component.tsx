import * as React from 'react';
import { Grid } from 'semantic-ui-react';


const gearIcon = require('../../../images/gear-check.png'); 

const style: React.CSSProperties = {
    position: 'absolute',
    top: '10%',
    left: '40%',
    transform: 'scale(2) zoom: 0.5 translateX(-50%) translateY(-50%)',
};

const imageStyle: React.CSSProperties = {
    width:'25%',
    height: '25%'
}

const Landing: React.StatelessComponent = () => (
    <Grid style={style}>
        <img src={gearIcon} alt="" style={imageStyle}/>
    </Grid>
);

export default Landing;