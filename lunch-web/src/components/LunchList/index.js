import React from 'react';

import Grid from '@material-ui/core/Grid';

import { PADDING_TOP } from '../../constants';
import LunchCard from '../LunchCard';
import LunchMap from '../LunchMap';

import './index.css';


const NoLunches = () => (
  <div>No lunches</div>
);


const getLatLng = (position, { defaultValue } = {}) => {
  if (position && position.coords) {
    return [position.coords.latitude, position.coords.longitude];
  }
  return defaultValue;
};


const LunchList = ({ lunches, isLoading, currentPosition }) => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingTop: PADDING_TOP['16x9'],
        }}
      >
        <LunchMap
          center={getLatLng(currentPosition, { defaultValue: [34.048569, -118.2528917] })}
          zoom={16}
          lunches={lunches}
        />
      </div>
    </Grid>
    {
      lunches.length < 1 && !isLoading
        ? <Grid item xs={12}><NoLunches /></Grid>
        : lunches.map(lunch => (
          <Grid
            key={lunch.id}
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
          >
            <LunchCard key={lunch.id} lunch={lunch} />
          </Grid>
        ))
    }
  </Grid>
);


export default LunchList;
