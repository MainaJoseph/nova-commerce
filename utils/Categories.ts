import { AiFillPhone } from "react-icons/ai";
import {
  MdStorefront,
  MdOutlineHomeWork,
  MdLaptopChromebook,
  MdWifiTetheringError,
} from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { VscTools } from "react-icons/vsc";
import { GiLipstick } from "react-icons/gi";
import { FaTshirt, FaCarAlt } from "react-icons/fa";
import { CiApple, CiDumbbell } from "react-icons/ci";

export const Categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phone & Tablets",
    icon: AiFillPhone,
  },
  {
    label: "TVs & Audio",
    icon: PiTelevisionBold,
  },
  {
    label: "Appliances",
    icon: VscTools,
  },
  {
    label: "Heath and Beuty",
    icon: GiLipstick,
  },
  {
    label: "Home and Office",
    icon: MdOutlineHomeWork,
  },
  {
    label: "Fashion",
    icon: FaTshirt,
  },
  {
    label: "Computing",
    icon: MdLaptopChromebook,
  },
  {
    label: "SuperMarket",
    icon: CiApple,
  },
  {
    label: "Sporting",
    icon: CiDumbbell,
  },
  {
    label: "AutoMobile",
    icon: FaCarAlt,
  },
  {
    label: "Other",
    icon: MdWifiTetheringError,
  },
];
