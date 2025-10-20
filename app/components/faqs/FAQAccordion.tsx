"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQAccordion = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  const faqs = [
    {
      id: "item-1",
      question: "How can I contact Nova Customer Support?",
      answer:
        "You can contact customer support by calling or messaging on WhatsApp at (+254) XXX XXX XXX, or by emailing info@nova.com.",
    },
    {
      id: "item-2",
      question: "Is creating a NOVA account necessary for making a purchase?",
      answer:
        "Yes, creating a Nova account is necessary. It allows you to track your orders online, access carts and products, and make future orders through the app.",
    },
    {
      id: "item-3",
      question: "How do I place an order on NOVA's Website?",
      answer:
        "First, access your account by logging in. Then, carefully select the items you require and add them to your cart. Once your selections are complete, proceed to checkout. From there, choose your preferred payment option and follow the prompts to finalize your order, ensuring a smooth and efficient shopping experience.",
    },
    {
      id: "item-4",
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit cards, Mpesa and cash on delivery. Choose the one that suits you best during the checkout process.",
    },
    {
      id: "item-5",
      question: "How long does delivery take?",
      answer:
        "Delivery times may vary depending on your location and the product. We strive to deliver your orders as quickly as possible, and you can check the estimated delivery time during the checkout process.",
    },
    {
      id: "item-6",
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We take data security seriously and have robust measures in place to protect your personal information. Your data is safe with us.",
    },
    {
      id: "item-7",
      question: "Do you offer refunds or returns?",
      answer:
        "Yes, we have a hassle-free return and refund policy. If you are not satisfied with your purchase, you can initiate a return request, and we will guide you through the process.",
    },
  ];

  return (
    <div className="w-full space-y-3">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md data-[state=open]:border-orange-500 data-[state=open]:shadow-lg"
          >
            <AccordionTrigger
              className="group px-6 py-4 text-left no-underline hover:no-underline [&[data-state=open]>div]:text-orange-600"
              onClick={() => handleItemClick(faq.id)}
            >
              <div className="flex items-start gap-4 pr-8">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 transition-colors group-hover:bg-orange-200 group-data-[state=open]:bg-orange-500">
                  <HelpCircle className="h-4 w-4 text-orange-600 transition-colors group-data-[state=open]:text-white" />
                </div>
                <span className="flex-1 font-semibold text-gray-800 transition-colors group-hover:text-gray-900 group-data-[state=open]:text-orange-600">
                  {faq.question}
                </span>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 transition-all">
                {openItem === faq.id ? (
                  <div className="rounded-full bg-orange-500 p-1.5">
                    <Minus className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="rounded-full bg-gray-200 p-1.5 transition-colors group-hover:bg-orange-100">
                    <Plus className="h-4 w-4 text-gray-600 transition-colors group-hover:text-orange-600" />
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-gray-100 bg-gradient-to-b from-orange-50/30 to-white px-6 pb-6 pt-4">
              <p className="pl-12 leading-relaxed text-gray-700">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
