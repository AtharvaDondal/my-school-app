"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted!", data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("School added successfully!");
        router.push("/showSchools");
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  return (
<div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-8">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
    🏫 Add a New School
  </h1>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        School Name
      </label>
      <input
        {...register("name", { required: "Name required" })}
        placeholder="Enter school name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address
      </label>
      <textarea
        {...register("address", { required: "Address required" })}
        placeholder="Enter full address"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
      />
      {errors.address && (
        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
      )}
    </div>

    {/* City / State / Contact */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          {...register("city", { required: "City required" })}
          placeholder="City"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <input
          {...register("state", { required: "State required" })}
          placeholder="State"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact
        </label>
        <input
          {...register("contact", {
            required: "Contact required",
            pattern: { value: /^[0-9]{7,15}$/, message: "Invalid contact" },
          })}
          placeholder="Phone number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contact.message}
          </p>
        )}
      </div>
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        {...register("email_id", {
          required: "Email required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
        placeholder="Email address"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.email_id && (
        <p className="text-red-500 text-sm mt-1">
          {errors.email_id.message}
        </p>
      )}
    </div>

    {/* School Image */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload School Image
      </label>
      <input
        type="file"
        className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register("image")}
        accept="image/*"
      />
    </div>

    {/* Submit Button with Loading */}
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full mt-4 px-6 py-3 rounded-lg font-medium text-white 
        ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } 
        transition flex items-center justify-center gap-2`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Saving...
        </>
      ) : (
        "Save School"
      )}
    </button>
  </form>
</div>

  );
}
