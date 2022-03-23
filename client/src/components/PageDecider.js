import React from 'react'
import { useParams } from 'react-router';



var currentStock = "Stock Market";


const PageDecider = () => {
  const data = useParams();
  console.log(data);
  currentStock = data
}

export {PageDecider, currentStock};