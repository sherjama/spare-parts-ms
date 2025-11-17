import React from "react";
import { MapPin } from "lucide-react";
import { Heading } from "..";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/loadSlice";
import conf from "@/conf/conf";
import emailjs from "emailjs-com";

const Support = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      // Send the email
      const sent = await emailjs.send(
        conf.serviceId,
        conf.templateId,
        data,
        conf.userId
      );
      if (sent) {
        console.log(sent);

        alert("Email sent successfully!");
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error(error);
      dispatch(setLoading(false));
    }

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ToastContainer />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r dark:from-gray-900 from-white dark:via-indigo-900 via-indigo-400 to-indigo-800 py-20 overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 10 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 20 + 10}
                  cy={row * 20 + 10}
                  r="3"
                  fill="#6366f1"
                  opacity={0.3 + row * 0.07}
                />
              ))
            )}
          </svg>
        </div>
        <Heading title={"Contact Us"} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Get In Touch */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-8">
            We’re here to help! Whether you have a question, need support, or
            just want to share feedback, don’t hesitate to reach out.Our team is
            ready to assist you with anything you need.
          </p>

          {/* Location Cards */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Banswara, Rajasthan
                </h3>
                <p className="text-gray-400 text-sm">
                  Kandharwadi, Banswara - 327001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gradient-to-br from-gray-800 to-indigo-900 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Your Detail</h3>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-gray-600 py-2 focus:outline-none focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-gray-600 py-2 focus:outline-none focus:border-indigo-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                type="text"
                placeholder="Message Subject"
                className="w-full bg-transparent border-b border-gray-600 py-2 focus:outline-none focus:border-indigo-500"
              />
              {errors.subject && (
                <p className="text-red-500 text-xs">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">
                Comments / Questions <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Your Message"
                rows={4}
                className="w-full bg-transparent border-b border-gray-600 py-2 focus:outline-none focus:border-indigo-500 resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
