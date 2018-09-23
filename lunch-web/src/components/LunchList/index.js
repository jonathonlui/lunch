import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import placeholderImage4x3 from '../../assets/placeholder4x3.png';

import './index.css';


const styles = theme => ({
  Card: {
  },
  CardHeader: {
  },
  CardContent: {
  },
  Description: {
    marginBottom: 1.5 * theme.spacing.unit,
  },
  image4x3: {
    height: 0,
    paddingTop: '75%',
  },
  // image16x9: {
  //   height: 0,
  //   paddingTop: '56.25%',
  // },
  // image1x1: {
  //   height: 0,
  //   paddingTop: '100%',
  // },
});


function toCurrency(value, defaultValue, { locale = 'en-US', currency = 'USD' } = {}) {
  if (!Number.isFinite(value)) {
    return defaultValue;
  }
  return value.toLocaleString(locale, { style: 'currency', currency });
}


const MealItem = ({ meal: { name, price } }) => (
  <li className="MealItem">
    <span className="MealItemName">{name}</span>
    <span className="MealItemPrice">{toCurrency(price)}</span>
  </li>
);


const MealList = ({ meals }) => (
  meals && meals.length
    ? (
      <ul className="LunchItemMealList">
        {meals.map(meal => <MealItem key={meal.id || meal.name} meal={meal} />)}
      </ul>
    ) : null
);


const getPriceRangeString = (meals) => {
  const prices = meals.map(({ price }) => price).sort((a, b) => a - b);
  const low = prices[0];
  const high = prices.slice(-1)[0];
  return low === high
    ? toCurrency(low)
    : `${toCurrency(low)} - ${toCurrency(high)}`;
};


const LunchCard = withStyles(styles)(({
  lunch: {
    id,
    name,
    description,
    meals,
    address,
    yelpLink,
    imageUrl = placeholderImage4x3,
  },
  classes,
}) => (
  <Card className={classes.Card}>
    <CardHeader
      className={classes.CardHeader}
      title={name || id}
      subheader={getPriceRangeString(meals)}
    />
    <CardMedia className={classes.image4x3} image={imageUrl} />
    <CardContent className={classes.CardContent}>
      {description && (
        <Typography variant="body1" className={classes.Description}>
          {description}
        </Typography>
      )}
      <MealList meals={meals} />
      <div className="LunchItemFooter">
        {address && <div className="LunchItemFooterAddress">{address}</div>}
        <div className="LunchItemFooterLinks">
          {address && (
            <span>
              <a href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${encodeURIComponent(address)}`}>Google Maps</a>
              {' '}
              <a href={`https://maps.apple.com/?dirflg=w&daddr=${encodeURIComponent(address)}`}>Apple Maps</a>
            </span>
          )}
          {' '}
          {yelpLink && <a href={yelpLink}>Yelp</a>}
        </div>
      </div>
    </CardContent>
  </Card>
));


const NoLunches = () => (
  <div>No lunches</div>
);


const LunchList = ({ lunches, isLoading }) => (
  <Grid container spacing={16}>
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


export default withStyles(styles)(LunchList);
