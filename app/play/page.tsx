// play/page.tsx
"use client"; // Jika kamu menggunakan Next.js 13 dengan App Router
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Result from "@/components/Result"; // Sesuaikan dengan path yang benar
import BackgroundMusic from "./BackgroundMusic"; // Import komponen audio
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

type ResultProps = {
    message: boolean,
    expression: string
}

// Styling tombol khusus
const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '50px',
    padding: '10px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.05)',
    },
}));

export default function Play() {
    const [data, setData] = useState({ nums: [1, 2, 3, 4] });
    const [isLoading, setLoading] = useState(true);
    const [guess, setGuess] = useState<string | boolean>("playing");
    const [result, setResult] = useState<ResultProps>({ message: false, expression: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const randomDataRes = await fetch("/api/random", {
                    method: "POST",
                });
                const randomData = await randomDataRes.json();
                setData(randomData);
                setLoading(false);

                const isPossibleRes = await fetch("/api/is_possible", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nums: randomData.nums,
                        target: 24,
                    }),
                });
                const isPossibleResult = await isPossibleRes.json();
                setResult(isPossibleResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold">
                <div className='block text-center'>
                    <Image
                        src="https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif"
                        alt="Loading"
                        width={100}
                        height={100}
                    />
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (guess !== "playing") {
        return <Result result={result.message === guess} expression={result.expression} nums={data.nums} />
    } else {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold p-5">
                <BackgroundMusic /> {/* Komponen audio tetap ditambahkan di sini */}
                <div className='block text-center'>
                    <p className="mb-3 text-2xl">
                        Apakah 4 angka tersebut bisa menjadi 24???
                    </p>
                    <p className="mb-5 text-2xl">
                        [{data.nums[0]},{data.nums[1]},{data.nums[2]},{data.nums[3]}]
                    </p>
                    <div className="flex items-center justify-center mb-8">
                        <CustomButton variant="contained" color="success" onClick={() => setGuess(true)}>
                            Bisa ✅
                        </CustomButton>
                        <div style={{ margin: '0 10px' }} /> {/* Spacer */}
                        <CustomButton variant="contained" color="error" onClick={() => setGuess(false)}>
                            Gabisa ❌
                        </CustomButton>
                    </div>
                    <CustomButton href="/" variant="contained" color="secondary">
                        MENU
                    </CustomButton>
                </div>
            </div>
        );
    }
}
