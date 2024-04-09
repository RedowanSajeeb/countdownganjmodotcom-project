import React, { useRef, useState } from "react";
import posterImg from "./assets/media/bannarframeganjmo-01.jpg";
import logoGanjmo from "./assets/media/ganjmo_web_logo-01.png";
import { useForm } from "react-hook-form";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

const App = () => {
  const {
    register,
    reset, // Destructure reset function
    formState: { errors },
  } = useForm();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [enteredName, setEnteredName] = useState("");
  // State to store the entered name
  const posterRef = useRef(null);

  console.log(photoFile);

  const downloadPoster = () => {
    html2canvas(posterRef.current, { scale: 2 })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = `${
          enteredName ? enteredName + "ganjmo" : "ganjmo"
        }.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        // Show success message
        Swal.fire({
          position: "top-center",
          icon: "success",
          title:
            "আপনার পোস্টারটি ডাউনলোড হয়ে গেছে, এখন গঞ্জমোর নিয়মাবলি অনুযায়ী পরবর্তী কাজ সম্পূর্ণ করুন। ধন্যবাদ",
          showConfirmButton: false,
          timer: 4500,
        });
        reset();
      })
      .catch((err) => {
        console.error("Error downloading the poster:", err);
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ছবিটি ডাউনলোড করতে অনুগ্রহ পূর্বক গুগল ক্রোম , সাফারি অথবা মজিলা ফায়ারফক্স ব্যবহার করুন!",
        });
        reset();
      });
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
        <form className="p-4 md:p-2">
          <div className="card border-2 border-gray-700 md:w-96 mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="space-y-5">
                <p className="text-gray-500 text-sm font-semibold">
                  {`"CHOOSE FILE" এ ক্লিক করে আপনার ছবি সিলেক্ট করে দিন`}
                </p>

                <input
                  {...register("photo_file", {
                    required: "আপনার ফটো প্রয়োজন",
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPhotoFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPhotoPreviewUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    },
                  })}
                  type="file"
                  className="file-input w-full file-input-bordered max-w-xs"
                />
                {errors.photo_file && (
                  <span className="text-red-600 text-xs font-semibold">
                    {errors.photo_file.message}
                  </span>
                )}
                <input
                  {...register("name", { required: "আপনার নাম প্রয়োজন" })}
                  type="text"
                  placeholder="এখানে আপনার নাম লিখুন"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEnteredName(e.target.value)}
                  //
                />

                {errors.name && (
                  <span className="text-red-600 text-xs font-semibold">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="p-2 relative">
          <div className="card mx-auto md:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="text-center text-[#f56b0c]">
                নিম্নলিখিত নকশা সহ পোস্টার
              </p>
              <div ref={posterRef} className="relative w-[268px] h-[268px]">
                <img className="relative" src={posterImg} alt="" />
                <div className="flex mx-auto w-1/2 items-center">
                  {photoPreviewUrl && (
                    <img
                      src={photoPreviewUrl}
                      alt="Preview"
                      className="absolute h-[115px] md:h-[115px]   border-4 border-white -mt-[315px] md:-mt-[320px] rounded-full"
                    />
                  )}
                </div>
                {/* Display the entered name */}
                {enteredName && (
                  <p className="absolute banglaNameFont -mt-[62px] md:-mt-[60px] font-medium text-2xl text-white text-center w-full">
                    {enteredName}
                  </p>
                )}
              </div>
              <button
                onClick={downloadPoster}
                className="btn btn-outline w-52 mx-auto text-white bg-[#f56b0c]"
              >
                পোস্টার ডাউনলোড করুন
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto  pt-1 ps-5 mb-5 pe-5 m w-full">
          <button
            onClick={downloadPoster}
            className="btn w-full bg-[#fcfbfa] text-[#f56b0c] btn-outline"
          >
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
