import React from 'react';

import Grid from '@material-ui/core/Grid';

import LunchCard from '../LunchCard';

import './index.css';


const NoLunches = () => (
  <div>No lunches</div>
);


interface Props {
  isVisible: boolean;
  isLoading: boolean;
  lunches: Lunch[];
}


const LunchList = ({ lunches, isLoading, isVisible }: Props) => (isVisible ? (
  <Grid container spacing={16}>
    {lunches.length < 1 && !isLoading ? (
      <Grid item xs={12}><NoLunches /></Grid>
    ) : lunches.map(lunch => (
      <Grid
        key={lunch.id}
        item
        xs={12}
      >
        <LunchCard key={lunch.id} lunch={lunch} />
      </Grid>
    ))}
  </Grid>
) : null);


export default LunchList;
