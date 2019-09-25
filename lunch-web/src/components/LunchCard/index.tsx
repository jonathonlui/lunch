import React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import placeholderImage4x3 from '../../assets/placeholder4x3.png';
import { PADDING_TOP } from '../../constants';


const styles = (theme: Theme) => createStyles({
  Card: {
  },
  CardHeader: {
  },
  CardContent: {
  },
  Description: {
    marginBottom: theme.spacing(1.5),
  },
  image4x3: {
    height: 0,
    paddingTop: PADDING_TOP['4x3'],
  },
});


function toCurrency(value: number, defaultValue?: string, { locale = 'en-US', currency = 'USD' } = {}) {
  if (!Number.isFinite(value)) {
    return defaultValue;
  }
  return value.toLocaleString(locale, { style: 'currency', currency });
}


const MealItem = ({ meal: { name, price } }: { meal: Meal }) => (
  <li className="MealItem">
    <span className="MealItemName">{name}</span>
    <span className="MealItemPrice">{toCurrency(price)}</span>
  </li>
);


export const MealList = ({ meals }: { meals: Meal[]}) => (
  meals && meals.length
    ? (
      <ul className="LunchItemMealList">
        {meals.map(meal => <MealItem key={meal.name} meal={meal} />)}
      </ul>
    ) : null
);


export const getPriceRangeString = (meals: Meal[]) => {
  const prices = meals.map(({ price }) => price).sort((a, b) => a - b);
  const low = prices[0];
  const high = prices.slice(-1)[0];
  return low === high
    ? toCurrency(low)
    : `${toCurrency(low)} - ${toCurrency(high)}`;
};


interface Props extends WithStyles<typeof styles> {
  lunch: Lunch;
  style?: React.CSSProperties; 
}


const LunchCard = ({
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
  style,
}: Props) => (
  <Card className={classes.Card} style={style}>
    <CardHeader
      className={classes.CardHeader}
      title={name || id}
      subheader={getPriceRangeString(meals)}
    />
    <CardMedia className={classes.image4x3} image={imageUrl} />
    <CardContent className={classes.CardContent}>
      {description && (
        <Typography variant="body2" className={classes.Description}>
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
);


export default withStyles(styles)(LunchCard);
