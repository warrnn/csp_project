"use client";

import { ErrorResponse } from '@/lib/responseAlert';
import axios from 'axios';
import { ChangeEvent, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';

export default function EditConcert() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        description: "",
        venue: "",
        concert_date: "",
        price: "",
        total_tickets: "",
    });

    useEffect(() => {
        const fetchConcert = async () => {
             try {
                const response = await axios.get(`/api/concerts/${id}`);
                const data = response.data;
                setFormData({
                    title: data.title,
                    artist: data.artist,
                    description: data.description,
                    venue: data.venue,
                    concert_date: data.concert_date ? new Date(data.concert_date).toISOString().slice(0, 16) : "",
                    price: data.price,
                    total_tickets: data.total_tickets,
                });
                if (data.poster_url) {
                    setImagePreview(data.poster_url);
                }
             } catch (error) {
                 console.error(error);
                 Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch concert details',
                    color: '#fff',
        background: '#0a0a14',
                });
             } finally {
                 setIsLoading(false);
             }
        }
        if (id) {
            fetchConcert();
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('artist', formData.artist);
            data.append('description', formData.description);
            data.append('venue', formData.venue);
            data.append('concert_date', formData.concert_date);
            data.append('price', formData.price);
            data.append('total_tickets', formData.total_tickets);

            if (selectedFile) data.append('poster', selectedFile);

            await axios.patch(`/api/concerts/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Concert updated successfully!',
                showConfirmButton: false,
                color: '#fff',
        background: '#0a0a14',
                timer: 1500
            }).then(() => {
                 router.push("/admin/manage");
            });
           
        } catch (error) {
            console.error("Error:", error);
            ErrorResponse({ message: "An error occurred while updating the concert." });
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading && !formData.title) {
         return (
            <section className="py-20 min-h-screen w-full bg-gray-950 text-white flex justify-center items-center">
                <div className="animate-pulse text-xl font-semibold">Loading...</div>
            </section>
         )
    }

    return (
        <section className="py-20 min-h-screen w-full bg-gray-950 text-white">
            <div className="max-w-4xl mx-auto px-6 mt-16 mb-10 text-center">
                <h1 className="font-bold text-3xl mb-2">Edit Concert</h1>
                <p className="text-gray-400">Update the details below</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-5xl mx-auto">
                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2 text-gray-400 font-medium">Concert Banner / Poster</label>
                    <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-800/50 transition relative overflow-hidden ${imagePreview ? 'border-indigo-500' : 'border-gray-700 bg-gray-900'}`}>
                        {imagePreview ? (
                            <div className="w-full h-full relative group">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <span className="text-white font-medium">Change Image</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <span className="text-indigo-400 font-semibold block mb-1">Click to Upload</span>
                                <span className="text-sm text-gray-500">or drag and drop file here</span>
                            </div>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Concert Name" className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Artist</label>
                    <input type="text" name="artist" value={formData.artist} onChange={handleChange} placeholder="Artist Name" className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition" required />
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Concert details..." className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition resize-none" required></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Date & Time</label>
                    <input title='concert date' type="datetime-local" name="concert_date" value={formData.concert_date} onChange={handleChange} className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition [color-scheme:dark]" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Venue</label>
                    <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Location" className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Quota</label>
                    <input type="number" name="total_tickets" value={formData.total_tickets} onChange={handleChange} placeholder="0" className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-400 font-medium">Price</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition" required />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 mt-4">
                    <button type="submit" disabled={isLoading} className={`w-full font-bold py-3.5 px-4 rounded-lg shadow-lg transition transform ${isLoading ? 'bg-indigo-900 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-0.5'}`}>
                        {isLoading ? 'Processing...' : 'Update Concert'}
                    </button>
                </div>
            </form>
        </section>
    );
}
