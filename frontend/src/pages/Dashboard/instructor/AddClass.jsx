import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateClass = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state; // Lấy dữ liệu lớp học từ state
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu người dùng có upload ảnh mới
    let imageUrl = item.image; // Sử dụng ảnh hiện tại nếu không upload ảnh mới
    if (image) {
      // Upload ảnh mới lên Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "yoga-website"); // Thay bằng upload preset của bạn

      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/degfccw8e/image/upload`, // Thay bằng Cloudinary cloud name của bạn
          {
            method: "POST",
            body: formData,
          }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        if (!cloudinaryData.secure_url) {
          alert("Image upload failed. Please try again.");
          return;
        }
        imageUrl = cloudinaryData.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Something went wrong. Please try again.");
        return;
      }
    }

    // Chuẩn bị dữ liệu cập nhật
    const formElements = e.target.elements;
    const updatedData = {
      name: formElements.name.value,
      availableSeats: formElements.availableSeats.value,
      price: formElements.price.value,
      videoLink: formElements.videoLink.value,
      description: formElements.description.value,
      image: imageUrl,
    };

    try {
      // Gửi yêu cầu cập nhật tới backend
      await axiosSecure.put(`/update-class/${item._id}`, updatedData);
      toast.success("Đã cập nhật khóa học thành công");
      navigate("/dashboard/my-classese"); // Điều hướng lại danh sách lớp học
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Cập nhật khóa học</h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-6 bg-white shadow-lg"
        >
          <div className="grid grid-cols-2 w-full gap-3">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-grey-700 font-bold mt-2"
              >
                Tên khóa học
              </label>
              <input
                type="text"
                required
                defaultValue={item.name}
                name="name"
                id="name"
                className="w-full px-4 py-2 border rounded-2xl"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-grey-700 font-bold mt-2"
              >
                Ảnh bìa
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                name="image"
                className="block mt-[2px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-2 file:px-4"
              />
              <p className="text-sm text-gray-500 mt-1">
                Hình hiện tại:{" "}
                <a href={item.image} target="_blank" rel="noopener noreferrer">
                  Xem ảnh
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-3 items-center">
            <div className="mb-6">
              <label
                htmlFor="availableSeats"
                className="block text-gray-700 font-bold mb-2"
              >
                Số lượng học viên
              </label>
              <input
                type="number"
                required
                defaultValue={item.availableSeats}
                name="availableSeats"
                className="w-full px-4 py-2 border rounded-2xl"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Giá
              </label>
              <input
                type="number"
                required
                defaultValue={item.price}
                name="price"
                className="w-full px-4 py-2 border rounded-2xl"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Đường link video
            </label>
            <input
              required
              defaultValue={item.videoLink}
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              name="videoLink"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Mô tả về khóa học
            </label>
            <textarea
              name="description"
              defaultValue={item.description}
              rows={5}
              className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
            ></textarea>
          </div>

          <div className="text-center w-full">
            <button
              type="submit"
              className="bg-secondary w-[25%] hover:bg-rose-500 duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Cập nhật khóa học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;