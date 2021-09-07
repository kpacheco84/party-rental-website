import React from 'react'
import { Row, Col } from 'antd'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import Link from 'next/link'

//import girls from '../assets/images/girls.svg'

const Hero = (props) => {
  return (
    <div id="hero" className="hero">
      <div className="hero-left">
        <div className="hero-icons">
          <ul>
            <li>
              <div className="hero-icon-img">
                <FaFacebookF />
              </div>
            </li>
            <li>
              <div className="hero-icon-img">
                <FaPinterestP />
              </div>
            </li>
            <li>
              <div className="hero-icon-img">
                <FaInstagram />
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2>
            <span>
              All your party rental needs in one place! Ready to book all
              online!
            </span>
          </h2>
          <button className="btns wiggle">
            <Link href="/productsearch">Book Now</Link>
          </button>
        </div>
      </div>
      <div className="hero-right">
        <img src="/pink_blob.svg"></img>
      </div>
    </div>
  )
}

export default Hero
