import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievefeaturedProducts,
  retrieveProducts,
} from "../slices/ProductSlice";
import { Sidebar } from "./Sidebar";

const ProductPage = () => {
  const [colorFilterData, setColorFilterData] = useState(null);
  const [materialFilterData, setMaterailFilterData] = useState(null);

  const dispatch = useDispatch();
  const productdData = useSelector((state) => state.product.products);
  const featuredProductdData = useSelector(
    (state) => state.product.featuredProducts
  );
  const featuredProductdDataLoading = useSelector(
    (state) => state.product.featuredProductsLoading
  );

  const [isFeatured, setIsFeatured] = useState(false);
  const [colorClikedTrue, setColorClikedTrue] = useState(false);
  const [materialClickedTrue, setMaterialClickedTrue] = useState(false);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []);

  useEffect(() => {
    dispatch(retrievefeaturedProducts());
  }, [isFeatured]);

  const getColorFilter = (data, colorClicked) => {
    setColorFilterData(data);
    setColorClikedTrue(colorClicked);
  };

  const getMaterialFilter = (data, matClicked) => {
    setMaterailFilterData(data);
    setMaterialClickedTrue(matClicked);
  };

  const addToCart = () => {
    setCartValue((prev) => prev + 1);
    console.log("add");
  };
  const headerTab = () => {
    return (
      <nav className="w-full flex items-center justify-around text-white px-2 py-2 bg-gray-500 mb-3 ">
        <div className={"lg:flex flex-grow items-center"}>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <span
                  onClick={() => setIsFeatured(false)}
                  className={
                    "ml-2 cursor-pointer hover:text-black hover:font-semibold" +
                    (!isFeatured ? " text-black font-semibold" : "text-white")
                  }
                >
                  All Products
                </span>
              </li>
              <li className="nav-item">
                <span
                  onClick={() => {
                    setIsFeatured(true);
                    // showFeaturedProduct();
                  }}
                  className={
                    "ml-2 cursor-pointer hover:text-black hover:font-semibold" +
                    (isFeatured ? " text-black font-semibold" : "text-white")
                  }
                >
                  Featured Products
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mr-4">
          <i class="fa fa-shopping-cart"></i>
          <span className="absolute align-middle text-center w-4 h-4 text-sm bg-red-500 rounded-lg">
            {cartValue}
          </span>
        </div>
      </nav>
    );
  };

  const SingleProduct = ({ product }) => {
    return (
      <>
        <div class="group relative">
          <div class="min-h-80 w-full   rounded-md   lg:aspect-none lg:h-80">
            <img
              src={product.image}
              alt="Basic Tee in black."
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            <div class="absolute z-1 top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-black opacity-0 group-hover:h-80 group-hover:opacity-70 duration-500">
              <h1
                onClick={addToCart}
                class="text-2xl text-white cursor-pointer"
              >
                Add to cart
              </h1>
            </div>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a>
                  <span></span>
                  {product.name}
                </a>
              </h3>

              <p class="text-sm font-medium text-gray-500">
                <span className="text-black">BLACK</span> COTTON
              </p>

              <p class="mt-1 text-sm text-gray-900">${product.price}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (featuredProductdDataLoading) {
    <div>.....Loading</div>;
  }

  return (
    <div>
      {headerTab()}
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Sidebar
            filteredColor={getColorFilter}
            filterdMaterial={getMaterialFilter}
          />
        </div>

        {!isFeatured ? (
          <div className="col-span-10">
            {productdData.length === 0 ? (
              <span>No Data found</span>
            ) : (
              <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 px-10">
                {colorClikedTrue
                  ? productdData &&
                    productdData.products
                      .filter((pro) => pro.colorId === colorFilterData)
                      .map((product) => <SingleProduct product={product} />)
                  : materialClickedTrue
                  ? productdData &&
                    productdData.products
                      .filter((pro) => pro.materialId === materialFilterData)
                      .map((product) => <SingleProduct product={product} />)
                  : productdData.products.map((product) => (
                      <SingleProduct product={product} />
                    ))}
              </div>
            )}
          </div>
        ) : (
          <div className="col-span-10">
            {featuredProductdData.length === 0 ? (
              <span>No FeaturedProduct is available</span>
            ) : (
              <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 px-10">
                {productdData &&
                  productdData.products.map(
                    (product) =>
                      featuredProductdData &&
                      featuredProductdData?.featured
                        .filter((pro) => pro.id == product.id)
                        .map((pro) => <SingleProduct product={product} />)
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
