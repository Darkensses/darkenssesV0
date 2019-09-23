import React from "react"
import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

class UserMe extends React.Component {
  render() {
    let {
      className,
      src,
      name,
      title,
      email,
      urlGitHub,
      urlFB,
      urlTW,
      urlLinkedin,
    } = this.props
    return (
      <div className="userMe__wrapper">
        <div className="userMe__div__circle">
          <img src={src} alt="avatar_photo"/>
        </div>
        <div className="userMe__info">
          <h1>{name}</h1>
          <h2>{title}</h2>
          <div className="userMe__info__contact">
            <a href={`mailto:${email}`}>
              <FontAwesomeIcon icon={faEnvelope} size="lg" color="#FFF" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={urlGitHub}>
              <FontAwesomeIcon icon={faGithub} size="lg" color="#FFF" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={urlFB}>
              <FontAwesomeIcon icon={faFacebook} size="lg" color="#FFF" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={urlTW}>
              <FontAwesomeIcon icon={faTwitter} size="lg" color="#FFF" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={urlLinkedin}>
              <FontAwesomeIcon icon={faLinkedin} size="lg" color="#FFF" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default UserMe
