import React from "react"
import UserMe from "../UserMe"
import Rattlesnake from "../Rattlesnake";
import "./styles.css"

//TODO: skew and image next to black div
const MainHeader = () => (
  <div>
    <div className="header">
      <div className="header__rattlesnake">
        <Rattlesnake />
      </div>
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
