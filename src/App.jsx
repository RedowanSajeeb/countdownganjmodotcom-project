import React from "react";
import posterImg from "./assets/media/ganjmoEidProfile24-01.jpg";
import logoGanjmo from "./assets/media/ganjmo_web_logo-01.png";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // reset
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <img className="h-14 mx-auto" src={logoGanjmo} alt="" />
      <div>
        <div className="border-2 shadow mb-3 rounded-2xl border-t-0 rounded-t-none">
          <h1 className="text-center  text-gray-100  text-xl p-5 pt-0 b md:text-2xl ">
            {"গঞ্জমো শুভেচ্ছা সালামি,ঈদে গঞ্জমোর সাথে আনন্দ ভাগ করে নিন!"}
          </h1>
          <p className="text-center p-2 text-gray-100 text-sm">{`গঞ্জমোর "শুভেচ্ছা সালামি" ক্যাম্পেইনে অংশগ্রহণ করুন এবং আকর্ষণীয় পুরষ্কার জিতুন!`}</p>
        </div>
        {/* form submit  */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-2">
          <div className="card border-2 border-gray-700 md:w-96 mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="space-y-5">
                <p className="text-gray-500 text-sm font-semibold">{`"CHOOSE FIFLE" এ ক্লিক করে আপনার ছবি সিলেক্ট করে দিন`}</p>
                <input
                  {...register("photo_file", { required: true })}
                  type="file"
                  className="file-input w-full file-input-bordered  max-w-xs"
                />
                {errors.photo_file && (
                  <span className="text-red-600 text-xs font-semibold">
                    {"আপনার ফটো প্রয়োজন"}
                  </span>
                )}
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="এখানে আপনার নাম লিখুন"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.photo_file && (
                  <span className="text-red-600 text-xs font-semibold">
                    {"আপনার নাম প্রয়োজন"}
                  </span>
                )}
                <button className="btn btn-outline w-full text-white bg-[#f56b0c]">
                  আপনার পোস্টার তৈরি করুন
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="p-4">
          <div className="card  mx-auto md:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-center text-[#f56b0c]">
                উদাহরণ: নিম্নলিখিত নকশা সহ পোস্টার
              </p>
              <img src={posterImg} alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto  pt-1 ps-5 mb-5 pe-5 m w-full">
          <button className="btn w-full bg-[#fcfbfa] text-[#f56b0c] btn-outline">
            ক্যাম্পেইন সম্পর্কে বিস্তারিত
          </button>
        </div>

        <footer>
          <p className="text-center text-sm text-white pb-5">
            © 2024 Ganjmo.com Limited. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
