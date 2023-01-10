import { useState } from "react";
import { Layout } from "./component/Layout";
import ProductPage from "./component/ProductPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Layout>
        <ProductPage />
      </Layout>
    </div>
  );
}

export default App;
