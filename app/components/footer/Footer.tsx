import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import FooterListCol from "./FooterListCol";
import {RiVisaLine, RiTwitterXFill} from "react-icons/ri"
import {GiReceiveMoney} from "react-icons/gi"
import {FaCcMastercard} from "react-icons/fa"
import {FiFacebook} from "react-icons/fi"
import {AiFillInstagram, AiFillYoutube, AiOutlineSlack} from "react-icons/ai"

const Footer = () => {
    return ( <footer className="bg-slate-700 text-slate-200 text-xs mt-16" style={{ fontSize: '11px' }}>
       <Container>
        <div className="flex flex-row justify-between pt-16 pb-8 ">

            <FooterList>
                <h3 className="text-base font-bold mb-2">
                    Need Help?</h3>
                    <Link href='#'> Chat with Us</Link>
                    <Link href='#'> Help Center</Link>
                    <Link href='#'> Contact Us</Link>

                    <h3 className="text-base font-bold mb-2 mt-2">
                    USEFUL LINKS</h3>
                    <Link href='#'>Track Your Order </Link>
                    <Link href='#'>Shipping and delivery</Link>
                    <Link href='#'> Return Policy</Link>
                    <Link href='#'> How to Order?</Link>
                    <Link href='#'> Dispute Resolution Policy</Link>
                    <Link href='#'> Corporate and Bulk Purchase</Link>
                    <Link href='#'> Advertise with Nova</Link>
                    <Link href='#'> Report a Product</Link>
                    <Link href='#'> Jumia Payment Information Guidelines</Link>
                    
            </FooterList>
            <FooterList>
                <h3 className="text-base font-bold mb-2">
                    About Nova</h3>
                    <Link href='#'> About us</Link>
                    <Link href='#'> Returns and Refunds Policy</Link>
                    <Link href='#'> Nova Careers</Link>
                    <Link href='#'> Nova Express</Link>
                    <Link href='#'> Terms and Conditions</Link>
                    <Link href='#'> Store Credit Terms and Conditions</Link>
                    <Link href='#'> Privacy Notice</Link>
                    <Link href='#'> Cookies Notice</Link>
                    <Link href='#'> Flash Sales</Link>
                    <Link href='#'> Black Friday 2023</Link>
                   
            </FooterList>

            <FooterList>
                <h3 className="text-base font-bold mb-2">
                    Make Money with Nova</h3>
                    <Link href='#'> Sell on Nova</Link>
                    <Link href='#'> Vendor Hub</Link>
                    <Link href='#'> Become a Sales Consultant</Link>
                    <Link href='#'> Become a Logistics Service Partner</Link>
                    <Link href='#'> Nova City Partner Program</Link>

                    <p className="mt-4">&copy; {new Date().getFullYear()} Nova. All rights reserved</p>
            </FooterList>
           
            <FooterListCol>
  <h3 className="text-base font-bold mb-2">NOVA INTERNATIONAL</h3>
  <div className="flex flex-wrap">
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Algeria</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Tanzania</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Uganda</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Tunisia</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Morocco</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Ivory Coast</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Zando</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'>Sudan</Link>
    </div>
  </div>
</FooterListCol>
   


        </div>

        {/* lower div */}
          
        <div className="flex flex-row  justify-between   pt-0 pb-8 ">
         
            <FooterList >
            <h3 className="text-base font-bold mb-2">
                    Join Us</h3>
                    <div className="flex gap-3">
                    <Link href='#'>
                      <FiFacebook size={19} className="mt-1" />
                    </Link>
                    <Link href='#'>
                      <RiTwitterXFill size={19} className="mt-1" />
                    </Link>
                    <Link href='#'>
                      <AiFillInstagram size={24} />
                    </Link>
                    <Link href='#'>
                      <AiFillYoutube size={24} />
                    </Link>
                    </div>
                    
            </FooterList>



            <FooterList>
            <h3 className="text-base font-bold mb-2">
                    Payment Methods</h3>
                    <div className="flex gap-3">
                    <Link href='#'>
                      <GiReceiveMoney size={24} />
                    </Link>
                    <Link href='#'>
                      <RiVisaLine size={24} />
                    </Link>
                    <Link href='#'>
                      <FaCcMastercard size={24} />
                    </Link>
                    <Link href='#' style={{fontSize: "12px"}} className="mt-1 flex flex-row">
                      Nova <AiOutlineSlack size={19} /> Pay
                    </Link>
                    
                    </div>
                    
            </FooterList>

{/* ..................................................................  for Formating*/}
            <FooterList>
                    <div className="flex gap-2">
                    </div>
            </FooterList>
            <FooterList>
                    <div className="flex gap-2">
                    </div>
            </FooterList>

{/* ............................................................................ end*/}


            
        </div>
     
       
       </Container>
    </footer> );
}
 
export default Footer;