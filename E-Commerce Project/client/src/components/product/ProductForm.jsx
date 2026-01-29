import { useState, useEffect } from "react";

const ProductForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    inStock: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
        imageUrl: initialData.imageUrl || "",
        inStock: initialData.inStock !== undefined ? initialData.inStock : true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        inStock: true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        name="name"
        className="input-field"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        className="input-field"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        className="input-field"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        className="input-field"
        placeholder="Image URL (http...)"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <div className="md:col-span-2">
        <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>In Stock</span>
        </label>
      </div>

      <textarea
        name="description"
        className="input-field md:col-span-2"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        required
      />

      <div className="md:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Product"
              : "Submit Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
