import { Grid, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Heading as="h2" mb="8" fontSize="xl">
        Latest Products
      </Heading>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap="8">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
