import Image from "next/image";
import Container from "../Container";
import Temp from "./Temp";

const Frequents = () => {
  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="flex flex-col gap-3 md:flex md:justify-start md:w-1/2">
            <div className="text-3xl font-bold">Frequently Asked Questions</div>
            <div className="text-md">
              If you have any more questions about Nova, please don’t hesitate
              to contact us.
            </div>
            <div className="mt-2">
              <button className="bg-orange-500 text-white py-2 px-4 rounded-tl-xl rounded-br-xl hover:opacity-80 transition">
                Contact Us
              </button>
            </div>
            <div className="mt-2">
              <Image src="/faq.svg" alt="FAQs" width={500} height={500} />
            </div>
          </div>
          <div className="md:flex md:justify-start md:w-1/2">
            <Temp />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Frequents;
