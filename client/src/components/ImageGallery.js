import React from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const ImageGallery = (props) => {
    const {photos} = props;
    // const images = []
    console.log(photos)    
    // const images = [
    //     "https://picsum.photos/2000/3000",
    //     //...
    //     "https://picsum.photos/3000/2000",
    //     "https://picsum.photos/300/300",
    // ]
    

    return (
        <>
        <div className='image-gallery'>
            <h2>Your Uploaded Images Are</h2>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry gutter='20px'>
                    {photos.map((image, i) => (
                        <img
                            key={i}
                            src={image.photoUrl}
                            style={{width: "100%", display: "block"}}
                            alt=""
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
        </>
    )
}

export default ImageGallery