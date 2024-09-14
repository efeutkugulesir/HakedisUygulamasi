import React from 'react'
import Card from '../Card/Card'

interface Props{

}
const CardList : React.FC<Props> = (_props: Props): JSX.Element => {
  return (
    <div>
        <Card companyName="Apple" ticker = "AAPL" price ={100} />
        <Card companyName="Microsoft" ticker = "MSFT" price ={200} />
        <Card companyName="Tesla" ticker = "TLSA" price ={300} />
    </div>
  );
};

export default CardList