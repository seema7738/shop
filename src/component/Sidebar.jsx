import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterials } from "../slices/MaterialSlice";
import { getColor } from "../slices/SidebarSlice";

export const Sidebar = ({
  filteredColor,
  filterdMaterial,
  colorTrue,
  materialTrue,
}) => {
  const dispatch = useDispatch();
  const colorName = useSelector((state) => state.color.productColor);
  const [colorClikedTrue, setColorClikedTrue] = useState(false);
  const [materialClickedTrue, setMaterialClickedTrue] = useState(false);

  const materialName = useSelector((state) => state.material.productMaterial);
  const productdData = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getColor());
    dispatch(getMaterials());
  }, []);
  const filterColor = (colorId) => {
    filteredColor(colorId, colorClikedTrue);
    setColorClikedTrue(true);
    setMaterialClickedTrue(false);
  };

  const filterMaterial = (materialId) => {
    filterdMaterial(materialId, materialClickedTrue);
    setColorClikedTrue(false);
    setMaterialClickedTrue(true);
  };
  return (
    <div className="m-4 py-2 black">
      <ul className="pb-5">
        <h3>Color</h3>
        <p className="font-semibold">All</p>
        {colorName?.colors?.map((color, i) => (
          <li
            key={i}
            onClick={(id) => filterColor(color.id, id)}
            className="text-black font-sm capitalize cursor-pointer"
          >
            {color.name}
          </li>
        ))}
      </ul>
      <ul className="pb-5">
        <h3>Material's</h3>
        <p className="font-semibold">All</p>
        {materialName?.material?.map((mat, i) => (
          <li
            onClick={(id) => filterMaterial(mat.id, id)}
            className="text-black font-sm capitalize cursor-pointer"
          >
            {mat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
