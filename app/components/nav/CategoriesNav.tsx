"use client";

import Container from "../Container";
import { Categories } from "@/utils/Categories";
import CategoryNav from "./CategoryNav";
import { useState } from "react";
import Modal from "./Modal"; // Assuming you have a Modal component
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
    <div className="bg-white">
      <Container>
        <div className="pt-4">
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
            <CategoryNav key={item.label} label={item.label} icon={item.icon} />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesNav;
