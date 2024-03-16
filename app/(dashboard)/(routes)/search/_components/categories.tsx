"use client";

import { LMSCategory } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcCloseUpMode,
  FcAdvertising,
  FcBiomass,
  FcBiotech,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: LMSCategory[];
}

const iconMap: Record<LMSCategory["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Anatomy: FcBiotech,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Psychology: FcCloseUpMode,
  Communications: FcAdvertising,
  Chemistry: FcBiomass,
};
const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
