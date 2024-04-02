"use client";

import Container from "../Container";
import { Categories } from "@/utils/Categories";
import CategoryNav from "./CategoryNav";
import PageTracker from "./PageTracker";
import { useState } from "react";
import Modal from "./Modal";
import { MdMenu } from "react-icons/md";

const CategoriesNav = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white flex">
      <div className="flex-grow">
        {" "}
        {/* Added flex-grow */}
        <Container>
          <div className="pt-4 items-start">
            <button
              className="text-slate-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MdMenu size={25} />
            </button>
          </div>
        </Container>
        <Modal
          showModal={showModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-4">
            {Categories.map((item) => (
              <CategoryNav
                key={item.label}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </div>
        </Modal>
      </div>

      <Container>
        <div className="mt-4">
          <div className="flex justify-end flex-grow ">
            {" "}
            {/* Added flex-grow */}
            <PageTracker />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoriesNav;
