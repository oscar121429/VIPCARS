import React from 'react'
import "./About.css"

const AboutPage = () => {
  return (
    <div className="about">

      <section className="about__block">
        <div className="about__img about__img--1"></div>

        <div className="about__text">
          <h2>Nuestra historia</h2>
          <p>
            Más que una colección, los coches clásicos
            y de lujo son historia sobre ruedas.
            Nuestra comunidad nace para reunir a apasionados
            que entienden que cada vehículo tiene
            un alma, una ingeniería única y una historia
            que merece ser contada.
            Desde iconos atemporales hasta piezas exclusivas,
            celebramos el arte, el diseño y la innovación
            que han marcado generaciones.
          </p>
        </div>
      </section>

      <section className="about__block about__block--reverse">
        <div className="about__img about__img--2"></div>

        <div className="about__text">
          <h2>Nuestra comunidad</h2>
          <p>
            Este espacio está diseñado para conectar coleccionistas,
            compartir conocimiento y descubrir auténticas
            joyas del automovilismo.
            Aquí podrás explorar vehículos únicos,
            intercambiar experiencias
            y formar parte de una red donde la elegancia,
            la mecánica y la pasión se encuentran.
            Porque coleccionar no es solo poseer, es preservar legado.
          </p>
        </div>
      </section>

    </div>
  )
}

export default AboutPage