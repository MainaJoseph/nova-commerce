"use client";

import Image from "next/image";
import Container from "./components/Container";
import { motion } from "framer-motion";

export default function Notfound() {
  return (
    <div className="">
      <Container>
        <div className="flex flex-row md:flex-row justify-between mt-3">
          <div className="flex flex-col gap-4 md:flex md:justify-start md:w-1/2">
            <div className="font-bold text-3xl md:text-7xl mt-7 md:mt-14">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: 0.5,
                }}
              >
                404-error
              </motion.span>
            </div>
            <div className="md:ml-10 font-semibold text-md md:text-3xl">
              PAGE NOT FOUND
            </div>
            <div className="text-slate-800">
              Your search has ventures beyound the known universe
            </div>
            <div className="mt-4 md:mt-10 items-center">
              <button className="bg-orange-500 text-white py-2 md:py-3 px-4 md:w-full rounded-tl-xl rounded-br-xl hover:opacity-80 transition">
                Go Back Home
              </button>
            </div>
          </div>
          {/* ////////////////////////////////// */}
          <div className="w-full mb-3 md:mt-4 md:mb-[-50px] md:z-10">
            <Image
              className="mx-auto max-w-full h-auto"
              src="/astro.png"
              alt="Nova app"
              width={400}
              height={500}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
