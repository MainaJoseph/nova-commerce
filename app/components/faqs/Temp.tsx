import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Temp = () => {
  return (
    <div className="text-md md:mt-20">
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            How can I contact Nova Customer Support?
          </AccordionTrigger>
          <AccordionContent>
            You can contact customer support by calling or messaging on WhatsApp
            at (+254) XXX XXX XXX, or by emailing info@nova.com.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">
            Is creating a NOVA account necessary for making a purchase?
          </AccordionTrigger>
          <AccordionContent>
            Yes, creating a Nova account is necessary. It allows you to track
            your orders online, access carts and products, and make future
            orders through the app.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">
            How do I place an order on NOVA’s Website?
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
          <AccordionTrigger className="font-semibold">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent>
            We accept a variety of payment methods, including credit cards,
            Mpesa and cash on delivery. Choose the one that suits you best
            during the checkout process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="font-semibold">
            How long does delivery take?
          </AccordionTrigger>
          <AccordionContent>
            Delivery times may vary depending on your location and the product.
            We strive to deliver your orders as quickly as possible, and you can
            check the estimated delivery time during the checkout process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="font-semibold">
            Is my personal information safe?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. We take data security seriously and have robust measures
            in place to protect your personal information. Your data is safe
            with us.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="font-semibold">
            Do you offer refunds or returns?
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
