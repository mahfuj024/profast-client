import banner1 from "../../../assets/banner/banner1.png"
import banner2 from "../../../assets/banner/banner2.png"
import banner3 from "../../../assets/banner/banner3.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className="mt-6 md:mt-10 lg:mt-15">
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showStatus={false} showIndicators={false} showThumbs={false} stopOnHover={true}>
            <img src={banner1} alt="" />
            <img src={banner2} alt="" />
            <img src={banner3} alt="" />
        </Carousel>
    </div>
  )
}

export default Banner