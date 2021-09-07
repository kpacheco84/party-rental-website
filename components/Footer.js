import React from 'react'
import { Row, Col } from 'antd'

const Footer = (props) => {
  return (
    <div className="container ">
      <div className="site-footer">
        <div>
          <img src="/logo.svg" />
          <h3>305-555-8899</h3>
        </div>

        <div>
          <h3>Links</h3>
        </div>

        <div>
          <h3>Corporate</h3>
        </div>
      </div>
      <div className="footer-end">
        <p>Web design by: Genesis, LLC</p>
      </div>
    </div>
  )
}

export default Footer
