"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useStateContext } from "@/context";
import { CustomButton, FormField, Loader } from "@/components";
import { checkIfImage } from "@/utils";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/lib/ipfs";

export default function CreateCampaign() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [uris, setUris] = useState([]);
  const [form, setForm] = useState({
    name: "", title: "", category: "Fundraiser", email: "",
    description: "", target: "", deadline: "",
    image: [], faqs: [], packages: [],
  });

  const onDrop = useCallback(async (files) => {
    try {
      const _uris = await uploadFiles(files);
      setUris(_uris);
      toast.success("File uploaded successfully");
    } catch { toast.error("Failed to upload file"); }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const field = (name, e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  /* FAQs */
  const addFAQ = () => setForm((f) => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
  const removeFAQ = (i) => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));
  const changeFAQ = (i, k, v) => setForm((f) => { const faqs = [...f.faqs]; faqs[i][k] = v; return { ...f, faqs }; });

  /* Packages */
  const addPkg = () => setForm((f) => ({ ...f, packages: [...f.packages, { amount: "", discount: "" }] }));
  const removePkg = (i) => setForm((f) => ({ ...f, packages: f.packages.filter((_, idx) => idx !== i) }));
  const changePkg = (i, k, v) => setForm((f) => { const packages = [...f.packages]; packages[i][k] = v; return { ...f, packages }; });

  const validate = () => {
    if (!form.name.trim()) { toast.error("Your name is required."); return false; }
    if (!form.title.trim()) { toast.error("Campaign title is required."); return false; }
    if (form.title.trim().length < 5) { toast.error("Campaign title must be at least 5 characters."); return false; }
    if (!form.description.trim()) { toast.error("Campaign story is required."); return false; }
    if (form.description.trim().length < 20) { toast.error("Story must be at least 20 characters."); return false; }
    if (!form.target || isNaN(Number(form.target)) || Number(form.target) <= 0) {
      toast.error("Goal must be a positive number (ETH)."); return false;
    }
    if (!form.deadline) { toast.error("End date is required."); return false; }
    if (new Date(form.deadline) <= new Date()) { toast.error("End date must be in the future."); return false; }
    if (uris.length === 0) { toast.error("Please upload at least one campaign image."); return false; }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address."); return false;
    }
    for (const [i, faq] of form.faqs.entries()) {
      if (!faq.question.trim() || !faq.answer.trim()) {
        toast.error(`FAQ ${i + 1} is incomplete — both question and answer are required.`); return false;
      }
    }
    for (const [i, pkg] of form.packages.entries()) {
      if (!pkg.amount || isNaN(Number(pkg.amount)) || Number(pkg.amount) <= 0) {
        toast.error(`Package ${i + 1} amount must be a positive number.`); return false;
      }
      if (!pkg.discount || isNaN(Number(pkg.discount)) || Number(pkg.discount) < 0 || Number(pkg.discount) > 100) {
        toast.error(`Package ${i + 1} discount must be between 0 and 100.`); return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18), image: uris });
      toast.success("Campaign created successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Error creating campaign. Please try again.");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 mt-8 p-4 bg-white dark:bg-[#1c1c24]">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#8c6dfd] rounded-[10px] mb-8">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      {/* Image preview */}
      {uris.length > 0 && (
        <div className="flex flex-row p-2 m-2 flex-wrap gap-2">
          {uris.map((uri) => (
            <img key={uri} src={uri} alt="Campaign preview" width={150} height={150} className="object-cover rounded-md" />
          ))}
        </div>
      )}

      {/* Dropzone */}
      <div className="m-2 font-bold text-white bg-[#8c6dfd] flex items-center justify-center border-dotted border-white p-3 rounded-md cursor-pointer">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <span>Drop campaign images here</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[40px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Your Name *" placeholder="John Doe" inputType="text" value={form.name} handleChange={(e) => field("name", e)} />
          <FormField labelName="Campaign Title *" placeholder="Write a title" inputType="text" value={form.title} handleChange={(e) => field("title", e)} />
          <FormField labelName="Select Category *" isCategory value={form.category} handleChange={(e) => field("category", e)} />
          <FormField labelName="Email" placeholder="example@example.com" inputType="email" value={form.email} handleChange={(e) => field("email", e)} />
        </div>

        <FormField labelName="Story * (Markdown supported)" placeholder="Write your story" isTextArea value={form.description} handleChange={(e) => field("description", e)} />

        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <h4 className="font-bold text-[25px] text-white">You will get 100% of the raised amount</h4>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">FAQs</h3>
          {form.faqs.map((faq, i) => (
            <div key={i} className="flex flex-wrap gap-[40px]">
              <FormField labelName={`FAQ ${i + 1} — Question *`} placeholder="Question" inputType="text" value={faq.question} handleChange={(e) => changeFAQ(i, "question", e.target.value)} />
              <FormField labelName="Answer *" placeholder="Answer" inputType="text" value={faq.answer} handleChange={(e) => changeFAQ(i, "answer", e.target.value)} />
              <button type="button" onClick={() => removeFAQ(i)} className="px-3 py-2 rounded-md bg-red-100 text-red-700">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addFAQ} className="self-start px-4 py-2 rounded-md bg-gray-100 dark:bg-dark-800">Add FAQ</button>
        </div>

        {/* Packages */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Funding Packages</h3>
          {form.packages.map((pkg, i) => (
            <div key={i} className="flex flex-wrap gap-[40px]">
              <FormField labelName={`Package ${i + 1} — Amount (ETH) *`} placeholder="0.05" inputType="number" value={pkg.amount} handleChange={(e) => changePkg(i, "amount", e.target.value)} />
              <FormField labelName="Discount % *" placeholder="10" inputType="number" value={pkg.discount} handleChange={(e) => changePkg(i, "discount", e.target.value)} />
              <button type="button" onClick={() => removePkg(i)} className="px-3 py-2 rounded-md bg-red-100 text-red-700">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addPkg} className="self-start px-4 py-2 rounded-md bg-gray-100 dark:bg-dark-800">Add Package</button>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Goal *" placeholder="ETH 0.50" inputType="number" value={form.target} handleChange={(e) => field("target", e)} />
          <FormField
            labelName="End Date *"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => field("deadline", e)}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <button type="submit" className="w-full font-semibold h-[50px] text-[18px] text-white bg-[#8c6dfd] rounded-[10px]">
            Submit new campaign
          </button>
        </div>
      </form>
    </div>
  );
}
