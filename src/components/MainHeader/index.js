import React from "react"
import UserMe from "../UserMe"
import "./styles.css"
import Particles from "react-particles-js";

//TODO: skew and image next to black div
const MainHeader = () => (
  <div>
    <div className="header">
      <Particles
        className="header__particles"
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: true,
                value_area: 1500,
              },
            },            
            line_linked: {
              enable: true,
              opacity: 0.05,
            },
            move: {
              speed: 1.05,
            },
          },
        }}
      />
      <div className="div__userMe">
        <UserMe
          src={require("./../../images/P1433186.jpg")}
          name="Jasiel Guillen"
          title="Psychedelic Developer | SDET Engineer"
          email="darkensses@gmail.com"
          urlGitHub="https://github.com/Darkensses"
          urlFB="https://www.facebook.com/Darkensses"
          urlTW="https://www.twitter.com/Darkensses"
          urlLinkedin="https://www.linkedin.com/in/jasielguillen"
        />
      </div>
    </div>
  </div>
)

export default MainHeader
