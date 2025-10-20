"use client";

import Image from "next/image";
import Container from "../Container";
import FAQAccordion from "./FAQAccordion";
import { usePathname } from "next/navigation";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";

const Frequents = () => {
  const pathname = usePathname();

  // Check if the current route is the homepage
  const isHomePage = pathname === "/";

  // Render the component only if on the homepage
  if (!isHomePage) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Info & Image */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 p-2">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Support Center
                </span>
              </div>
              <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                If you have any more questions about Nova, please don&apos;t
                hesitate to contact us.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <MessageCircle className="h-5 w-5" />
                <span>Contact Us</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Illustration */}
            <div className="relative mt-8 hidden md:block">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-100 to-orange-50 blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                <Image
                  src="/faq.svg"
                  alt="FAQs"
                  width={500}
                  height={500}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div className="flex items-center">
            <FAQAccordion />
          </div>
        </div>

        {/* Bottom Stats/Info */}
        <div className="mt-16 grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">24/7</div>
            <p className="text-sm text-gray-600">Customer Support</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">2hrs</div>
            <p className="text-sm text-gray-600">Average Response Time</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">98%</div>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Frequents;
