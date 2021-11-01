import React, { useState, useEffect } from 'react'

const ProductImages = (props) => {
  const [imgPreview, setImgPreview] = useState(null)
  const [error, setError] = useState(false)
  const [imgsPreview, setimgsPreview] = useState([
    { id: 0, url: null },
    { id: 1, url: null },
    { id: 2, url: null },
  ])

  const handleImageChange = (e) => {
    const selected = e.target.files[0]

    setError(false)

    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()

      reader.onloadend = () => {
        setImgPreview(reader.result)
        //
      }
      reader.readAsDataURL(selected)
    } else {
      //

      setError(true)
    }
  }

  return (
    <div className="imagesSection">
      {imgsPreview.map((imgs) => (
        <div className="imgPreview">
          {error && <p> File not supported</p>}
          <div
            className="imgPreview"
            style={{
              background: imgPreview
                ? `url("${imgPreview}") no-repeat center/cover`
                : '#131313',
              color: 'white',
            }}
          >
            {!imgPreview && (
              <>
                <p> Add and Image</p>
                <label htmlFor="fileUpload" className="customFileUpload">
                  Choose File
                </label>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="fileUpload"
                  onChange={handleImageChange}
                />
                <span>(jpg,jpeg or png)</span>
              </>
            )}
          </div>
          {imgPreview ? (
            <button type="button" onClick={() => setImgPreview(null)}>
              Remove
            </button>
          ) : (
            //end of imgsPreview map
            ''
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductImages
