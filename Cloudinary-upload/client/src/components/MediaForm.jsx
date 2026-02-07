import { useState } from "react";
import { createPost } from "../api/postApi";

const MediaForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) return alert("Select a file");

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("file", form.file);

    try {
      setLoading(true);
      await createPost(data);
      setForm({ name: "", description: "", file: null });
      onSuccess();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Media</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label className="flex items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
          <input
            type="file"
            hidden
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
          <span className="text-gray-500">
            {form.file ? form.file.name : "Click to upload image/video"}
          </span>
        </label>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default MediaForm;
