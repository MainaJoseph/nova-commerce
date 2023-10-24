import Container from "../Container";
import NavyList from "./NavyList";
import {FcDoughnutChart} from "react-icons/fc"
import {FaGooglePlay} from "react-icons/fa"
import {AiOutlineApple} from "react-icons/ai"
import Link from "next/link";
import { Redressed } from "next/font/google";
import EmailInput from "./EmailInput";


const redressed = Redressed({subsets: ['latin'], weight: ['400']})

const Navy = () => {
    return ( <div className="bg-gray-600 text-white mt-16">
        <Container>
        <div className="flex flex-row sm:justify-betweem md:justify-evenly pt-4 pb-8 ">
            <div className="hidden md:block">
            <NavyList>
            <Link  href='/' className={`${redressed.className} font-bold text-3xl flex flex-row`}>Nova<span className="mt-2"><FcDoughnutChart size={24} /></span></Link> 
            </NavyList>
            </div>
           
           

            <NavyList>
  <h3 className="text-sm font-bold mb-2" style={{ fontSize: '12px' }}>
    New to Nova?
  </h3>
  <p style={{ fontSize: '11px' }}>Subscribe</p>
  <div className="flex flex-col sm:flex-row gap-2">
    <EmailInput />
    <button className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 text-sm ">
      MALE
    </button>
    <button className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 text-sm ">
      FEMALE
    </button>
  </div>
</NavyList>






            <NavyList>


  <div className="flex flex-row">

    <Link href='/' className={`${redressed.className} `}>
      <FcDoughnutChart size={60} />
    </Link>



    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px' }} className="whitespace-nowrap mt-1 font-bold">DOWNLOAD NOVA FREE APP</p>
      <p style={{ fontSize: '11px' }} className="mt-2">Get access to exclusive offers!</p>


      <div className="flex flex-row gap-3 mt-3">

{/* Google Play Button*/}
      <button style={{ fontSize: '8px', display: 'flex', alignItems: 'center', textAlign: 'center' }} className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 w-25 h-9">
  <div style={{ marginRight: '5px' }}>
    <FaGooglePlay size={12} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span>Get it on</span>
    <span className="whitespace-nowrap">GOOGLE PLAY</span>
  </div>
</button>


{/* Apple Store Button*/}
   <button style={{ fontSize: '8px', display: 'flex', alignItems: 'center', textAlign: 'center' }} className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 w-22 h-9">
  <div style={{ marginRight: '5px' }}>
    <AiOutlineApple size={20} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span className="whitespace-nowrap">Download on</span>
    <span className="whitespace-nowrap">APP STORE</span>
  </div>
</button>




      </div>

    </div>
  </div>
</NavyList>


      
        </div>
        </Container>
    </div> );
}
 
export default Navy;