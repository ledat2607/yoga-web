import React, { useState } from "react";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useUser from "../../../../hook/useUser";
import { toast } from "react-toastify";
const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Uploading the image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yoga-website"); // Replace with your upload preset

    try {
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/degfccw8e/image/upload`, // Replace with your Cloudinary cloud name
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

      // Preparing the class data
      const formElements = e.target.elements;
      const newData = {
        name: formElements.name.value,
        instructorName: formElements.instructorName.value,
        instructorEmail: formElements.instructorEmail.value,
        availableSeats: formElements.availableSeats.value,
        price: formElements.price.value,
        status: "pending",
        submitted: new Date(),
        videoLink: formElements.videoLink.value,
        description: formElements.description.value,
        image: cloudinaryData.secure_url,
        totalEnrolled: 0, // Use the Cloudinary image URL
      };
      axiosSecure
        .post("/new-class", newData)
        .then((res) => {
          toast.success("Đã thêm mới khóa học thành công");
        })
        .catch((err) => console.log(err));

      // Make an API call to save the class data
      console.log(newData);
    } catch (error) {
      console.error("Error uploading image or saving class:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Thêm mới khóa học</h1>
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
                placeholder="Tên khóa học của bạn..."
                name="name"
                id="name"
                className="w-full px-4 py-2 border rounded-2xl"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-grey-700 font-bold mt-2"
              >
                Ảnh bìa
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                required
                placeholder="Tên khóa học của bạn..."
                name="image"
                className="block mt-[2px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-2 file:px-4"
              />
            </div>
          </div>

          <div>
            <h1 className="text-[12px] text-secondary">
              Bạn sẽ không thể thay đổi tên hoặc email đăng ký
            </h1>
            <div className="grid gap-3 grid-cols-2">
              <div className="mb-6">
                <label
                  htmlFor="instructorName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Tên huấn luyện viên
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                  value={currentUser?.name}
                  readOnly
                  disabled
                  name="instructorName"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="instructorEmail"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email đăng ký
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                  value={currentUser?.email}
                  readOnly
                  disabled
                  name="instructorEmail"
                />
              </div>
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
                placeholder="Số lượng học viên..."
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
                placeholder="Giá tham gia khóa học..."
                name="price"
                className="w-full px-4 py-2 border rounded-2xl"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Đường link video
            </label>
            <p className="text-[12px] my-2 mt-2 text-secondary">
              Chỉ hỗ trợ đường link Youtube
            </p>
            <input
              required
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Đường link giới thiệu khóa học..."
              name="videoLink"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Mô tả về khóa học
            </label>
            <textarea
              name="description"
              placeholder="Mô tả về khóa học...."
              rows={5}
              className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
            ></textarea>
          </div>

          <div className="text-center w-full">
            <button
              type="submit"
              className="bg-secondary w-[25%] hover:bg-rose-500 duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Thêm khóa học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
