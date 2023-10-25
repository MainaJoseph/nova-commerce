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
    return ( <footer className="bg-slate-700 text-slate-200 text-xs mt-0" style={{ fontSize: '11px' }}>
       <Container>
        <div className="flex flex-row justify-between pt-16 pb-8 ">

            <FooterList>
                <h3 className="font-bold mb-2 text-sm">
                    Need Help?</h3>
                    <Link href='#' className="hover:underline"> Chat with Us</Link>
                    <Link href='#'className="hover:underline"> Help Center</Link>
                    <Link href='#'className="hover:underline"> Contact Us</Link>

                    <h3 className="text-sm font-bold mb-2 mt-2">
                    USEFUL LINKS</h3>
                    <Link href='#'className="hover:underline">Track Your Order </Link>
                    <Link href='#'className="hover:underline">Shipping and delivery</Link>
                    <Link href='#'className="hover:underline"> Return Policy</Link>
                    <Link href='#'className="hover:underline"> How to Order?</Link>
                    <Link href='#'className="hover:underline"> Dispute Resolution Policy</Link>
                    <Link href='#'className="hover:underline"> Corporate and Bulk Purchase</Link>
                    <Link href='#'className="hover:underline"> Advertise with Nova</Link>
                    <Link href='#'className="hover:underline"> Report a Product</Link>
                    <Link href='#'className="hover:underline"> Jumia Payment Information Guidelines</Link>
                    
            </FooterList>
            <FooterList>
                <h3 className="text-sm font-bold mb-2">
                    About Nova</h3>
                    <Link href='#'className="hover:underline"> About us</Link>
                    <Link href='#'className="hover:underline"> Returns and Refunds Policy</Link>
                    <Link href='#'className="hover:underline"> Nova Careers</Link>
                    <Link href='#'className="hover:underline"> Nova Express</Link>
                    <Link href='#'className="hover:underline"> Terms and Conditions</Link>
                    <Link href='#'className="hover:underline"> Store Credit Terms and Conditions</Link>
                    <Link href='#'className="hover:underline"> Privacy Notice</Link>
                    <Link href='#'className="hover:underline"> Cookies Notice</Link>
                    <Link href='#'className="hover:underline"> Flash Sales</Link>
                    <Link href='#'className="hover:underline"> Black Friday 2023</Link>
                   
            </FooterList>

            <FooterList>
                <h3 className="text-sm font-bold mb-2">
                    Make Money with Nova</h3>
                    <Link href='#'className="hover:underline"> Sell on Nova</Link>
                    <Link href='#'className="hover:underline"> Vendor Hub</Link>
                    <Link href='#'className="hover:underline"> Become a Sales Consultant</Link>
                    <Link href='#'className="hover:underline"> Become a Logistics Service Partner</Link>
                    <Link href='#'className="hover:underline"> Nova City Partner Program</Link>

                    <p className="mt-4 hover:text-orange-500 sm:hidden md:block">&copy; {new Date().getFullYear()} Nova. All rights reserved</p>
            </FooterList>
           
            <FooterListCol>
  <h3 className="text-sm font-bold mb-2 ">NOVA INTERNATIONAL</h3>
  <div className="flex flex-wrap">
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Algeria</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Tanzania</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Uganda</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Tunisia</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Morocco</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Ivory Coast</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Zando</Link>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mb-2">
      <Link href='#'className="hover:underline">Sudan</Link>
    </div>
  </div>
</FooterListCol>
   


        </div>

        {/* lower div */}
          
        <div className="flex flex-row  justify-between   pt-0 pb-8 ">
         
            <FooterList >
            <h3 className="text-sm font-bold mb-2">
                    Join Us</h3>
                    <div className="flex gap-3">
                    <Link href='#'>
                      <FiFacebook size={19} className="mt-1 hover:text-orange-500" />
                    </Link>
                    <Link href='#'>
                      <RiTwitterXFill size={19} className="mt-1 hover:text-orange-500" />
                    </Link>
                    <Link href='#' className="hover:text-orange-500">
                      <AiFillInstagram size={24} />
                    </Link>
                    <Link href='#' className="hover:text-orange-500">
                      <AiFillYoutube size={24} />
                    </Link>
                    </div>
                    
            </FooterList>



            <FooterList>
            <h3 className="text-sm font-bold mb-2">
                    Payment Methods</h3>
                    <div className="flex gap-3 ">
                    <Link href='#'>
                      <GiReceiveMoney size={24} className="hover:text-orange-500"/>
                    </Link>
                    <Link href='#'>
                      <RiVisaLine size={24} className="hover:text-orange-500" />
                    </Link>
                    <Link href='#'>
                      <FaCcMastercard size={24} className="hover:text-orange-500" />
                    </Link>
                    <Link href='#' style={{fontSize: "12px"}} className="mt-1 flex flex-row hover:text-orange-500">
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
                    <p className="mt-4 hover:text-orange-500 md:hidden">&copy; {new Date().getFullYear()} Nova. All rights reserved</p>
                    </div>
            </FooterList>

{/* ............................................................................ end*/}


            
        </div>
     

        <div className="flex flex-row  justify-between   pt-0 pb-8 ">
        <FooterList>
                    <Link href='#'className="hover:underline"> Adidas</Link>
                    <Link href='#'className="hover:underline"> AILYONS</Link>
                    <Link href='#'className="hover:underline"> Apple</Link>
                    <Link href='#'className="hover:underline"> Asus</Link>
                    <Link href='#'className="hover:underline"> Bruhm</Link>
                    <Link href='#'className="hover:underline"> Canon</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> Cantu</Link>
                    <Link href='#'className="hover:underline"> Coke</Link>
                    <Link href='#'className="hover:underline"> Dell</Link>
                    <Link href='#'className="hover:underline"> Dove</Link>
                    <Link href='#'className="hover:underline"> Dr.Rashel</Link>
                    
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> Epson</Link>
                    <Link href='#'className="hover:underline"> Garnier</Link>
                    <Link href='#'className="hover:underline"> Hisense</Link>
                    <Link href='#'className="hover:underline"> HP</Link>
                    <Link href='#'className="hover:underline"> Infinix</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> itel</Link>
                    <Link href='#'className="hover:underline"> Jameson</Link>
                    <Link href='#'className="hover:underline"> L Oréal Paris</Link>
                    <Link href='#'className="hover:underline"> Lenovo</Link>
                    <Link href='#'className="hover:underline"> Logitech</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> Maybeline</Link>
                    <Link href='#'className="hover:underline"> Mika</Link>
                    <Link href='#'className="hover:underline"> NIVEA</Link>
                    <Link href='#'className="hover:underline"> Nunix</Link>
                    <Link href='#'className="hover:underline"> Oppo</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> Ramtons</Link>
                    <Link href='#'className="hover:underline"> Roch</Link>
                    <Link href='#'className="hover:underline"> Samsung</Link>
                    <Link href='#'className="hover:underline"> Sandisk</Link>
                    <Link href='#'className="hover:underline"> Skyworth</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> Sony</Link>
                    <Link href='#'className="hover:underline"> TCL</Link>
                    <Link href='#'className="hover:underline"> Tecno</Link>
                    <Link href='#'className="hover:underline"> Transcend</Link>
                    <Link href='#'className="hover:underline"> Tusker</Link>
            </FooterList>
        <FooterList>
                    <Link href='#'className="hover:underline"> USN</Link>
                    <Link href='#'className="hover:underline"> Vision Plus</Link>
                    <Link href='#'className="hover:underline"> Vitron</Link>
                    <Link href='#'className="hover:underline"> VON</Link>
                    <Link href='#'className="hover:underline"> XIAOMI</Link>
            </FooterList>
        </div>

        <div className="border-b border-gray-300 my-1"></div>


        <div className="flex flex-row justify-center pt-3 pb-8 gap-6 ">

        <Link href='#' style={{fontSize: "13px"}} className=" flex flex-row hover:text-sky-600">
                     <AiOutlineSlack size={23} /><span className="mt-1">Party</span>
                    </Link>

                    <Link href='#' style={{fontSize: "13px"}} className=" flex flex-row hover:text-orange-500">
                     <span className="mt-1">Nova</span><AiOutlineSlack size={23} /><span className="mt-1">Pay</span>
                    </Link>
        </div>


       </Container>
    </footer> );
}
 
export default Footer;