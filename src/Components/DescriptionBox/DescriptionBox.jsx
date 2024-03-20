import React from 'react' //6.9k (gzipped: 2.7k)
import'./DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commerce website is an online plataform that facilitate buying and selling of products or services over the internet
                    serves as a virtual marketplace where businesses and individuals showcase their products</p>
                    <p>
                        E-commerce websites typically display products or services a detailed descriptions, images, prices and any available variants
                        (e.g., sizes, colors).
                    </p>
            </div>

        </div>
    )
}

export default DescriptionBox