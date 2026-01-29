import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/product/ProductCard";
import ProductForm from "../components/product/ProductForm";
import toast from "react-hot-toast";

const Profile = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMyProducts = async () => {
    try {
      const response = await api.get("/products/myProducts");
      setMyProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to fetch your products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/deleteProduct/${id}`);
      toast.success("Product deleted");
      fetchMyProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await api.patch(`/products/updateProduct/${editingProduct._id}`, {
          ...formData,
          price: Number(formData.price),
        });
        toast.success("Product updated successfully!");
      } else {
        await api.post("/products/addProduct", {
          ...formData,
          price: Number(formData.price),
        });
        toast.success("Product added successfully!");
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchMyProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your products</p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
            }}
            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            + Add Product
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : myProducts.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              isOwner={true}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
