import React from "react";
import { motion } from "framer-motion";
import category from "../categoryData";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

function Category() {
  return (
    <>
      <div className="flex overflow-x-scroll space-x-6 scroll-smooth scrollbar-thin mt-5 shadow-lg pt-8 scrollbar-hide">
        {category.map(({ item, image, link }) => (
          <motion.div
            key={nanoid()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Link to={link}>
              <div>
                <img
                  src={image}
                  alt={item}
                  className=" min-w-[100px] sm:min-w-[100px] md:min-w-[100px] lg:min-w-[120px] min-h-[100px] sm:min-h-[100px] md:min-h-[100px] lg:min-h-[120px] rounded-full w-fit"
                />
                <div className="font-extrabold text-white w-auto text-xl">
                  {item}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Category;
