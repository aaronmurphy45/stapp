import React from 'react'
import { useParams } from 'react-router';



var currentStock = "Stock Market";


const PageDecider = () => {
  const data = useParams();

  currentStock = data
}

export {PageDecider, currentStock};