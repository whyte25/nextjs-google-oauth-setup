import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { GoogleLogin } from "@react-oauth/google";

const CreateAcc = () => {
  const formOptions = { resolver: yupResolver(schema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const submitSignupForm = (data) => {
    mutate(data);
  };

  const googleSuccess = async (credentialResponse) => {
    googleMutate({ token: credentialResponse?.credential });
  };

  const googleError = () => {
    toast.error("Google auth failed", { toastId: toastID });
  };

  return (
    <div style={{ backgroundColor: "#051E68" }} className="auth px-8 lg:px-0">
      <div className="pt-8">
        <form
          onSubmit={handleSubmit(submitSignupForm)}
          method="post"
          className="text-left py-20"
        >
          <span className="flex justify-center text-white my-10">
            <span className="border border-white rounded-xl cursor-pointer p-4">
              {/* <FaGoogle onClick={() => login()} size={20} /> */}
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
              {/* ; */}
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;
