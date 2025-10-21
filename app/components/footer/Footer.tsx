import Link from "next/link";
import Container from "../Container";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        {/* Main Footer Content */}
        <div className="grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
              Nova
            </h3>
            <p className="text-sm leading-relaxed">
              Your trusted online shopping destination. Shop the latest products
              with fast delivery and excellent customer service.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>info@nova.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span>+254 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-400"
                >
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </div>

          {/* Download & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Download App
              </h4>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 transition-all hover:border-orange-500 hover:bg-gray-700"
                >
                  <Smartphone className="h-6 w-6 text-orange-400" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold text-white">
                      Google Play
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 transition-all hover:border-orange-500 hover:bg-gray-700"
                >
                  <Smartphone className="h-6 w-6 text-orange-400" />
                  <div>
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold text-white">
                      App Store
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-orange-500"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-orange-500"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-orange-500"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-orange-500"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-white">We Accept:</span>
            </div>
            <div className="flex items-center gap-4">
              <FaCcVisa className="h-8 w-12 text-gray-400 transition-colors hover:text-white" />
              <FaCcMastercard className="h-8 w-12 text-gray-400 transition-colors hover:text-white" />
              <div className="flex h-8 w-12 items-center justify-center rounded bg-green-600 transition-colors hover:bg-green-500">
                <span className="text-xs font-bold text-white">M-PESA</span>
              </div>
              <div className="flex items-center gap-1 rounded bg-gray-800 px-3 py-1">
                <span className="text-xs font-semibold text-orange-400">
                  Nova
                </span>
                <Wallet className="h-3 w-3 text-orange-400" />
                <span className="text-xs text-gray-400">Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-center text-gray-400">
              © {currentYear} Nova. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#"
                className="transition-colors hover:text-orange-400"
              >
                Privacy
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="#"
                className="transition-colors hover:text-orange-400"
              >
                Terms
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="#"
                className="transition-colors hover:text-orange-400"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
