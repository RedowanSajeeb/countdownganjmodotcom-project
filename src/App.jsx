import React, { useRef, useState } from "react";
import posterImg from "./assets/media/doneframe-01.jpg";
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

  const downloadPoster = async () => {
    html2canvas(posterRef.current, { scale: 2 })
      .then(async (canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.download = `${
          enteredName
            ? enteredName + `ganjmo${new Date().toISOString()}`
            : "ganjmo"
        }.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Prepare form data for Cloudinary upload
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", dataUrl);
        cloudinaryFormData.append(
          "upload_preset",
          "GanjmoImgUploadCouldPreset0"
        );
        cloudinaryFormData.append("cloud_name", "dytex5ajq");
        cloudinaryFormData.append("folder", "Eid_Gift_folder24");

        try {
          // Upload file to Cloudinary
          const cloudinaryResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dytex5ajq/image/upload",
            {
              method: "POST",
              body: cloudinaryFormData,
            }
          );
          const cloudinaryData = await cloudinaryResponse.json();

          if (cloudinaryData.url) {
            // If upload successful, send data to server
            const serverResponse = await fetch(
              "https://eidwishes.ganjmo.com/eid-gift24",

              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  imageUrl: cloudinaryData.url,
                  imageName: enteredName,
                  uploaded_Time: new Date().toISOString(),
                }),
              }
            );

            if (serverResponse.ok) {
              // Show success message
              Swal.fire({
                position: "top-center",
                icon: "success",
                title:
                  "আপনার পোস্টারটি ডাউনলোড হয়ে গেছে, এখন গঞ্জমোর নিয়মাবলি অনুযায়ী পরবর্তী কাজ সম্পূর্ণ করুন। ধন্যবাদ",
                showConfirmButton: false,
                timer: 4500,
              });
            }
          }
        } catch (error) {
          console.error("Error:", error);
          // Show error message
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ছবিটি ডাউনলোড করতে অনুগ্রহ পূর্বক গুগল ক্রোম, সাফারি অথবা মজিলা ফায়ারফক্স ব্যবহার করুন",
          });
          reset();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ছবিটি ডাউনলোড করতে অনুগ্রহ পূর্বক গুগল ক্রোম, সাফারি অথবা মজিলা ফায়ারফক্স ব্যবহার করুন । অথবা Google এ গিয়ে সার্চ করুন eid.ganjmo.com",
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
              <p className="text-center text-[#221308]">
                নিম্নলিখিত নকশা সহ পোস্টার
              </p>
              <div ref={posterRef} className="relative w-[268px] h-[268px]">
                <img className="relative" src={posterImg} alt="" />
                <div className="flex mx-auto w-1/2 items-center">
                  {photoPreviewUrl && (
                    <img
                      src={photoPreviewUrl}
                      alt="Preview"
                      className="absolute h-[110px] md:h-[110px] w-[110px]    border-4 border-white -mt-[315px] md:-mt-[320px] rounded-full"
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
              {enteredName && photoPreviewUrl ? (
                <>
                  {" "}
                  <button
                    onClick={downloadPoster}
                    className="btn btn-outline w-52 mx-auto text-white bg-[#f56b0c]"
                  >
                    পোস্টার ডাউনলোড করুন
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-900 bg-white  text-sm border p-2 rounded">
                    আপনার ছবি এবং নাম দিলে অটোমেটিক পোস্টার জেনারেট হয়ে ডাউনলোড
                    অপশন আসবে। চাইলে আপনি শেয়ার করতে পারেন আপনার গ্যালারিতে থাকা
                    স্বরণীয় ছবি
                  </p>
                </>
              )}

              <p className="text-gray-500 text-sm border p-2 rounded-2xl">
                ডাউনলোড করতে অনুগ্রহ পূর্বক গুগল ক্রোম , সাফারি অথবা মজিলা
                ফায়ারফক্স ব্যবহার করুন । অথবা Google এ গিয়ে সার্চ করুন
                <span className="font-semibold"> eid.ganjmo.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div
            tabIndex={0}
            className="collapse  collapse-arrow border border-base-300 bg-base-200"
          >
            <div className="collapse-title text-xl font-medium p-3 mb-5">
              ক্যাম্পেইন সম্পর্কে বিস্তারিত
            </div>
            <div className="collapse-content space-y-2 ">
              <p className="text-xs space-y-3 text-gray-500 tex">{`
পোস্ট করতে পারেন আপনার গ্যালারিতে থাকা স্বরণীয় ছবি। জিতে নিতে পারেন সিলেকশন বোর্ড কতৃক বিজয়ী  ৩ জন ইদ সালামি। 

গঞ্জমোর সাথে যুক্ত কোনো কর্মকর্তা, কর্মচারী এ সিলেকশন এর অন্তর্ভুক্ত নয়।`}</p>
              <p className="text-xs space-y-3 text-gray-500 tex">{`
পোস্ট করতে পারেন আপনার গ্যালারিতে থাকা স্বরণীয় ছবি। জিতে নিতে পারেন সিলেকশন বোর্ড কতৃক বিজয়ী  ৩ জন ইদ সালামি। 

গঞ্জমোর সাথে যুক্ত কোনো কর্মকর্তা, কর্মচারী এ সিলেকশন এর অন্তর্ভুক্ত নয়।`}</p>
              <p>
                <span className="pointer">&#10148;</span> আপনার নাম এবং ছবি
                দিয়ে তৈরি করুন: আকর্ষণীয় পোস্টার। চাইলে আপনি শেয়ার করতে পারেন
                আপনার গ্যালারিতে থাকা স্বরণীয় ছবি
                <br />
                <span className="pointer">&#10148;</span> আপনার টাইমলাইনে পোস্ট
                করুন: পোস্টারটি, ক্যাপশনে লিখুন: আপনি কি গঞ্জমোর পাশে আছেন?
                পরবর্তী বছরগুলোতে গঞ্জমোকে কোন জায়গায় দেখতে চান? (আপনার নিজস্ব
                আঙ্গিকে লিখুন) অবশ্যই গঞ্জমোর পেজ মেনশন করুন। পোস্টের ক্যাপশনে
                ব্যবহার করুন: #ganjmoeid24 হ্যাশট্যাগ।
              </p>
              <p>
                <span className="pointer">&#10148;</span> গঞ্জমোর অফিসিয়াল
                পেইজের ক্যাম্পেইন পোস্টের কমেন্ট বক্সে আপনার পরিচিত মোরেলগঞ্জের
                ৫ জনকে ম্যানশোন করুন।
              </p>
              <div>
                <p>
                  পোস্টের স্ক্রীনশট ফেসবুকে সার্চ বক্সে সার্চ করুন Ganjmo Online
                  Shopping তাহলে পেজ পাবেন
                </p>
                <img
                  src="https://scontent.xx.fbcdn.net/v/t1.15752-9/434062073_248285705032115_2502951056969592860_n.png?stp=dst-png_s206x206&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7P8PDTMpFAc0o6zAALxcUoJYjgbGVUz6gliOBsZVTPidZDowgNPAbcHUmXxqx_ZP1cfRGa-wrs1Jo9zrmM1JW&_nc_ohc=GJ2NXcEDaAIAb6XXS5G&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdXxO8FKFxSCaCl2cSfDyp_XW-UFRu8_16EjXBKOTeREvA&oe=663CE28C"
                  alt=""
                />
              </div>

              <p>
                <span className="pointer">&#10148;</span> পুরস্কার:
                <ul>
                  <li>প্রথম পুরস্কার: ৫০০ টাকা + গঞ্জমো টি-শার্ট</li>
                  <li>দ্বিতীয় পুরস্কার: ৩০০ টাকা</li>
                  <li>তৃতীয় পুরস্কার: ২০০ টাকা</li>
                </ul>
              </p>
              <p>
                <span className="pointer">&#10148;</span> ক্যাম্পেইন সময়কাল:
                <ul>
                  <li>ফলাফল ঘোষণা:</li>
                  <li>ঈদের দিন সন্ধার পরে বিজয়ীদের নাম ঘোষণা করা হবে।</li>
                  <li>
                    বিজয়ীদের পুরস্কার মোবাইল ব্যাংকিং-এর মাধ্যমে দিয়ে দেওয়া
                    হবে।
                  </li>
                  <li>
                    এই ক্যাম্পেইনে অংশগ্রহণের জন্য, অংশগ্রহণকারীদের অবশ্যই
                    মোরেলগঞ্জে গঞ্জভূমি হতে হবে অথবা মোরেলগঞ্জে বেড়ে উঠছে এরকম।
                  </li>
                </ul>
              </p>
              <p>
                <span className="pointer">&#10148;</span> বিজয়ী নির্ধারণ:
                <ul>
                  <li>
                    যে পোস্টে সর্বাধিক মন্তব্য থাকবে, সেই পোস্টের গঞ্জমোর
                    শুভাকাঙ্ক্ষী বিজয়ী।
                  </li>
                  <li>একজন ব্যক্তির একাধিক মন্তব্য কাউন্ট করা হবে না।</li>
                </ul>
              </p>
              <span className="text-xs">
                {` বিশেষ সতর্কতা : আপনার ফেসবুক প্রোফাইল লগ করা থাকলে, বিজয়ী ঘোষণার
                আগ পযন্ত খুলে রাখার অনুরোধ করছি। "রেজাল্ট বোর্ড" আপনার
                পোস্ট কাউন্ট করতে সমস্যায় পড়তে পারে।`}
              </span>
              <p>
                <span className="pointer">&#10148;</span> আমরা আশা করি এই
                ক্যাম্পেইনটি আপনাদের ঈদের আনন্দকে আরও বর্ধিত করবে।
              </p>
            </div>
          </div>
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
