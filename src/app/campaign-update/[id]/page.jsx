"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useStateContext } from "@/context";
import { FormField, Loader } from "@/components";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/lib/ipfs";

export default function UpdateCampaign() {
  const { id } = useParams();
  const router = useRouter();
  const { updateCampaign, getCampaigns, contract } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [uris, setUris] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const all = await getCampaigns();
      const c = all.find((x) => String(x.pId) === String(id));
      if (c) {
        setForm({
          id: String(c.pId), title: c.title, description: c.description,
          target: c.target, deadline: c.deadline, image: c.image,
          name: c.name ?? "", category: c.category, email: c.email,
          faqs: c.faqs ?? [], packages: c.packages ?? [],
        });
      }
      setIsLoading(false);
    })();
  }, [contract, id]);

  const onDrop = useCallback(async (files) => {
    try {
      const _uris = await uploadFiles(files);
      setUris(_uris);
      toast.success("File uploaded successfully");
    } catch { toast.error("Failed to upload"); }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (isLoading || !form) return <Loader />;

  const field = (name, e) => setForm((f) => ({ ...f, [name]: e.target.value }));
  const addFAQ = () => setForm((f) => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
  const removeFAQ = (i) => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));
  const changeFAQ = (i, k, v) => setForm((f) => { const faqs = [...f.faqs]; faqs[i][k] = v; return { ...f, faqs }; });
  const addPkg = () => setForm((f) => ({ ...f, packages: [...f.packages, { amount: "", discount: "" }] }));
  const removePkg = (i) => setForm((f) => ({ ...f, packages: f.packages.filter((_, idx) => idx !== i) }));
  const changePkg = (i, k, v) => setForm((f) => { const packages = [...f.packages]; packages[i][k] = v; return { ...f, packages }; });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18), image: uris.length ? uris : form.image });
      router.push("/");
    } catch (err) { console.error(err); toast.error("Error updating campaign."); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 mt-8 p-4 bg-white dark:bg-[#1c1c24]">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#8c6dfd] rounded-[10px] mb-8">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Update Campaign</h1>
      </div>
      {uris.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {uris.map((u) => (
            <img key={u} src={u} alt="Campaign preview" width={150} height={150} className="object-cover rounded-md" />
          ))}
        </div>
      )}
      <div className="m-2 bg-[#8c6dfd] flex items-center justify-center p-3 rounded-md cursor-pointer text-white">
        <div {...getRootProps()}><input {...getInputProps()} /><span>Drop new images here (optional)</span></div>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[40px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Your Name *" placeholder="John Doe" inputType="text" value={form.name} handleChange={(e) => field("name", e)} />
          <FormField labelName="Campaign Title *" placeholder="Write a title" inputType="text" value={form.title} handleChange={(e) => field("title", e)} />
          <FormField labelName="Select Category *" isCategory value={form.category} handleChange={(e) => field("category", e)} />
          <FormField labelName="Email" placeholder="example@example.com" inputType="email" value={form.email} handleChange={(e) => field("email", e)} />
        </div>
        <FormField labelName="Story *" placeholder="Write your story" isTextArea value={form.description} handleChange={(e) => field("description", e)} />
        <div className="flex flex-col gap-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="flex flex-wrap gap-[40px]">
              <FormField labelName={`FAQ ${i + 1} — Question`} placeholder="Question" inputType="text" value={faq.question} handleChange={(e) => changeFAQ(i, "question", e.target.value)} />
              <FormField labelName="Answer" placeholder="Answer" inputType="text" value={faq.answer} handleChange={(e) => changeFAQ(i, "answer", e.target.value)} />
              <button type="button" onClick={() => removeFAQ(i)} className="px-3 py-2 rounded-md bg-red-100 text-red-700">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addFAQ} className="self-start px-4 py-2 rounded-md bg-gray-100 dark:bg-dark-800">Add FAQ</button>
        </div>
        <div className="flex flex-col gap-4">
          {form.packages.map((pkg, i) => (
            <div key={i} className="flex flex-wrap gap-[40px]">
              <FormField labelName={`Package ${i + 1} — Amount (ETH)`} placeholder="0.05" inputType="number" value={pkg.amount} handleChange={(e) => changePkg(i, "amount", e.target.value)} />
              <FormField labelName="Discount %" placeholder="10" inputType="number" value={pkg.discount} handleChange={(e) => changePkg(i, "discount", e.target.value)} />
              <button type="button" onClick={() => removePkg(i)} className="px-3 py-2 rounded-md bg-red-100 text-red-700">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addPkg} className="self-start px-4 py-2 rounded-md bg-gray-100 dark:bg-dark-800">Add Package</button>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Goal *" placeholder="ETH 0.50" inputType="number" value={form.target} handleChange={(e) => field("target", e)} />
          <FormField labelName="End Date *" inputType="date" value={form.deadline} handleChange={(e) => field("deadline", e)} />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <button type="submit" className="w-full font-semibold h-[50px] text-[18px] text-white bg-[#8c6dfd] rounded-[10px]">Update Campaign</button>
        </div>
      </form>
    </div>
  );
}
