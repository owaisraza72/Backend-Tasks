import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/product/ProductCard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products/getAllProducts");
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/products/deleteProduct/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Loading products...</div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
        {/* Search or Filter could go here */}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              // Check ownership: backend User adds with `userId`. Frontend User has `_id`.
              isOwner={user && user._id === product.userId}
              isAdmin={user && user.role === "admin"}
              onDelete={handleDelete}
              onEdit={(p) => {
                if (user && user.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
