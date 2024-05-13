"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Temp = () => {
  const [openItem, setOpenItem] = useState<string | null>(null); // State to track open accordion item

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? null : value); // Toggle accordion item
  };
  return (
    <div className="text-md md:mt-20 w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-1")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              How can I contact Nova Customer Support?
            </span>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-1" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            You can contact customer support by calling or messaging on WhatsApp
            at (+254) XXX XXX XXX, or by emailing info@nova.com.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-2")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline text-start">
              Is creating a NOVA account necessary for making a purchase?
            </span>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 font-normal">
              {openItem === "item-2" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            Yes, creating a Nova account is necessary. It allows you to track
            your orders online, access carts and products, and make future
            orders through the app.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-3")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              How do I place an order on NOVA’s Website?{" "}
            </span>

            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-3" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            First, access your account by logging in. Then, carefully select the
            items you require and add them to your cart. Once your selections
            are complete, proceed to checkout. From there, choose your preferred
            payment option and follow the prompts to finalize your order,
            ensuring a smooth and efficient shopping experience
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-4")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              What payment methods do you accept?
            </span>

            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-4" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            We accept a variety of payment methods, including credit cards,
            Mpesa and cash on delivery. Choose the one that suits you best
            during the checkout process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-5")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              How long does delivery take?
            </span>

            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-5" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            Delivery times may vary depending on your location and the product.
            We strive to deliver your orders as quickly as possible, and you can
            check the estimated delivery time during the checkout process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-6")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              Is my personal information safe?
            </span>

            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-6" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. We take data security seriously and have robust measures
            in place to protect your personal information. Your data is safe
            with us.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger
            className="font-semibold text-orange-400 no-underline hover:no-underline relative"
            onClick={() => handleItemClick("item-7")}
          >
            <span className="text-slate-600 hover:text-slate-800 hover:underline">
              Do you offer refunds or returns?
            </span>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400">
              {openItem === "item-7" ? (
                <FaMinus size={18} />
              ) : (
                <FaPlus size={18} />
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            Yes, we have a hassle-free return and refund policy. If you are not
            satisfied with your purchase, you can initiate a return request, and
            we will guide you through the process.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Temp;
