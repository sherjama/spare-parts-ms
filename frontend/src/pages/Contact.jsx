// icons :loader
import { ThreeCircles } from "react-loader-spinner";
// react
import React, { useState } from "react";
// index file
import { Input, Button } from "../index.js";
// hook-form
import { useForm } from "react-hook-form";
// for emailJS
import emailjs from "@emailjs/browser";
import conf from "../conf/conf.js";

const Contact = () => {
  // states
  const [loading, setLoading] = useState(false);

  // hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // functions
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      // Send the email
      const sent = await emailjs.send(
        conf.serviceId,
        conf.templateId,
        data,
        conf.userId
      );
      if (sent) {
        alert("Email sent successfully!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }

    reset();
  };

  return (
    <div className="flex flex-col md:flex-row w-2/3 ">
      <div className="flex-1 p-10">
        <h1 className="text-9xl font-bold">SK</h1>
        <div className="mt-10 space-y-4">
          <div>
            <p>+91 8769214377</p>
            <p>sherjama8769214377@gmail.com</p>
          </div>
          <div>
            <p>Banswara 327001</p>
            <p>Rajasthan, India</p>
          </div>
        </div>
        <div className="mt-10 flex space-x-4">
          <a href="https://github.com/sherjama" className="underline">
            Github
          </a>
          <a
            href="https://www.instagram.com/_sher.khan__01/?next=%2F"
            className="underline"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/sher-jama-khan-90a080305/"
            className="underline"
          >
            Linkedin
          </a>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-lg p-10">
        <h2 className="text-3xl font-bold font-Secondary mt-10">
          Share your Experience
        </h2>
        <p className="mt-4">feedback ...</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Input
              className={`${
                errors.name ? "border-red-500" : "border-gray-300"
              } `}
              type="text"
              label="name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div>
            <Input
              className={`${
                errors.email ? "border-red-500" : "border-gray-300"
              } `}
              type="email"
              label="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div>
            <Input
              className={`${
                errors.message ? "border-red-500" : "border-gray-300"
              } `}
              type="textarea"
              label="Message"
              {...register("message", { required: "Message is required" })}
            />
          </div>

          <Button
            type="submit"
            className="m-auto relative"
            text={loading ? " " : "Submit"}
          >
            {loading && (
              <ThreeCircles
                visible={true}
                height="30"
                width="30"
                color="#000000"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
