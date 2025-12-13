"use client";

import { useState, ChangeEvent } from 'react';

export default function AddConcert() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <section className="py-20 min-h-screen w-full">
            <div className="p-8 flex flex-col gap-2 items-center justify-center text-center mb-10">
                <h1 className="font-bold text-3xl">Add New Concert</h1>
                <p className="text-gray-400">Fill in the details to create a new concert</p>
            </div>

            <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-20 lg:px-32 max-w-7xl mx-auto">

                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                    <label className="text-gray-400 font-medium">Concert Banner / Poster</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer hover:bg-indigo-600/25 transition duration-300 ease-in-out relative overflow-hidden ${imagePreview ? 'border-indigo-600' : 'border-indigo-300'}`}
                        >
                            {imagePreview ? (
                                <div className="w-full h-full relative group">
                                    <img
                                        src={imagePreview}
                                        alt="Concert Preview"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white font-medium">Click to change image</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                            )}

                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="concert_title" className="text-gray-400 font-medium">Concert Title</label>
                    <input title="concert_title" type="text" name="concert_title" id="concert_title" placeholder="e.g., Coldplay World Tour" className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="artist" className="text-gray-400 font-medium">Concert Artist / Band</label>
                    <input title="artist" type="text" name="artist" id="artist" placeholder="e.g., Coldplay" className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                </div>

                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                    <label htmlFor="description" className="text-gray-400 font-medium">Description</label>
                    <textarea title="description" name="description" id="description" rows={4} placeholder="Tell people what this concert is about..." className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="concert_date" className="text-gray-400 font-medium">Date & Time</label>
                    <input title="concert_date" type="datetime-local" name="concert_date" id="concert_date" className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-400" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="venue" className="text-gray-400 font-medium">Venue</label>
                    <input title="venue" type="text" name="venue" id="venue" placeholder="e.g., GBK Stadium" className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="quota" className="text-gray-400 font-medium">Total Quota</label>
                    <input title="quota" type="number" name="quota" id="quota" placeholder="0" className="px-4 py-3 rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="ticket_price" className="text-gray-400 font-medium">Ticket Price</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                        <input title="ticket_price" type="number" name="ticket_price" id="ticket_price" placeholder="0" className="pl-12 pr-4 py-3 w-full rounded-xl border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 mt-4">
                    <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                        Create Concert
                    </button>
                </div>
            </form>
        </section>
    );
}