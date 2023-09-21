import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Carousel from '../Components/Carousel';

export default function Home() {
  return (
    <div>
      <div><NavBar /></div>
      <div><Carousel/></div>
      <div className='m-3'>
        <Card />
      </div>
      <div><Footer /></div>
    </div>
  );
}
