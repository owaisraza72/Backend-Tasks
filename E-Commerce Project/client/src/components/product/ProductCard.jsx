import { Trash2, Edit } from "lucide-react";

const ProductCard = ({ product, isOwner, isAdmin, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 h-48 w-full object-cover relative">
        <img
          src={product.imageUrl || "https://placehold.co/600x400"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {product.inStock === false && ( // Assuming boolean or string check, backend schema type? Boolean usu.
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-indigo-600 font-medium">
              {product.category}
            </p>
          </div>
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {(isOwner || isAdmin) && (
          <div className="pt-4 mt-auto border-t border-gray-100 flex gap-2 justify-end">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              title="Edit Product"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Product"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
