import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import t from '../../assets/profil/teklit.jpeg'
import o from '../../assets/profil/outhmane.jpeg'
import b from '../../assets/profil/benjamin.jpeg'
import r from '../../assets/profil/roland.jpeg'



const testimonials = [
  {
    name: "Teklit",
    text: "This is an amazing service! Highly recommended.",
    image: t
  },
  {
    name: "Outhmane",
    text: "Absolutely wonderful experience, I loved it!",
    image: o
  },
  {
    name: "Benjamin",
    text: "I couldn't be happier with the results. Fantastic!",
    image: b
  },
  {
    name: "Roland",
    text: "I couldn't be happier with the results. Fantastic!",
    image: r
  }
];

const Testimonials = () => {
    return (
        <Carousel>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block mx-auto" // Utilisez Bootstrap pour centrer l'image
              style={{ width: '20%', borderRadius:'180px' }} // Réduisez la largeur de l'image
              src={testimonial.image}
              alt={`Slide ${index}`}
            />
            <Carousel.Caption>
              <h3 style={{ color: "#2DB7FF" }}>{testimonial.name}</h3>
              <p>{testimonial.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      );
}

export default Testimonials