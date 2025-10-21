"use client";

import Image from "next/image";
import Container from "../Container";
import { usePathname } from "next/navigation";
import {
  Smartphone,
  Zap,
  Bell,
  MapPin,
  Gift,
  Download,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const Playstore = () => {
  const pathname = usePathname();

  // Check if the current route is the homepage
  const isHomePage = pathname === "/";

  // Render the component only if on the homepage
  if (!isHomePage) {
    return null;
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Effortless Shopping",
      description: "Complete your purchase with just a few taps",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Real-Time Updates",
      description: "Get instant notifications on orders and deals",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Shop Anywhere",
      description: "Access our services anytime, anywhere",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Exclusive Offers",
      description: "Special app-only deals and discounts",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <Container>
        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-orange-500/20 p-2 backdrop-blur-sm">
                <Smartphone className="h-5 w-5 text-orange-400" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Mobile App
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Unleash the power of Shopping at your{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  fingertips
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Download the Nova app and experience seamless shopping on the go
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Google Play Button */}
              <a
                href="#"
                className="group flex items-center gap-4 rounded-xl bg-white px-6 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="rounded-full bg-gray-100 p-2">
                  <FaGooglePlay className="h-6 w-6 text-gray-800" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">GET IT ON</div>
                  <div className="text-lg font-bold text-gray-900">
                    Google Play
                  </div>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#"
                className="group flex items-center gap-4 rounded-xl bg-white px-6 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="rounded-full bg-gray-100 p-2">
                  <FaApple className="h-6 w-6 text-gray-800" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">DOWNLOAD ON THE</div>
                  <div className="text-lg font-bold text-gray-900">
                    App Store
                  </div>
                </div>
              </a>
            </div>

            {/* Features Section */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-400" />
                <h3 className="text-2xl font-bold text-white">
                  Why Download Our App
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 rounded-xl border border-gray-600/50 bg-gray-800/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-gray-700/50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - App Preview */}
          <div className="relative flex items-center justify-center">
            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>
            </div>

            {/* Phone Mockup */}
            <div className="relative z-10 transition-transform duration-500 hover:scale-105">
              <Image
                src="/scrop.png"
                alt="Nova app preview"
                width={400}
                height={500}
                className="drop-shadow-2xl"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute left-0 top-1/4 hidden animate-pulse rounded-full bg-orange-500 p-3 shadow-lg lg:block">
              <Download className="h-6 w-6 text-white" />
            </div>
            <div className="absolute bottom-1/4 right-0 hidden animate-pulse rounded-full bg-green-500 p-3 shadow-lg lg:block">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid gap-6 rounded-2xl border border-gray-600/50 bg-gray-800/50 p-8 backdrop-blur-sm md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-orange-400">10K+</div>
            <p className="text-sm text-gray-400">Downloads</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-orange-400">4.8★</div>
            <p className="text-sm text-gray-400">User Rating</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-orange-400">24/7</div>
            <p className="text-sm text-gray-400">Support</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Playstore;
