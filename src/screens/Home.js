import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
//import Carousel from "../Components/Carousel";
import Burger from "../Components/burger.jpg";
import Pizza from "../Components/pizza.jpg";
import Biryani from "../Components/biryani.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setfoodItem(response[0]);
      setfoodCat(response[1]);
      //console.log(response[0],response[1]);
    } catch (error) {
      console.error("Error Loading data: ", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>

      {/* Div for Navbar */}
      <div>
        <NavBar />
      </div>

      {/* Div for Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
              />
              {/* <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={Burger}
              className="d-block w-100"
              alt="Burger"
              style={{ filter: "brightness(40%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Pizza}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(40%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Biryani}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(40%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Div for Card */}
      <div className="container">
        {foodCat && foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="fs-3 m-3 row mb-3">
              {data.CategoryName}
              <hr />
              {foodItem && foodItem.length !== 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="m-4 col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem = {filterItems}
                        //foodName={filterItems.name}
                        options={filterItems.options[0]}
                        //imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No Categories Found</div>
        )}
      </div>

      {/* Div for footer */}
      <div>
        <Footer />
      </div>

    </div>
  );
}
