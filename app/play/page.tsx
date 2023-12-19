"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default async function Play() {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/random", {method: "POST"});
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    console.log(data)
    
    return (
        <div className="min-h-screen flex items-center justify-center font-bold">
            <div className='block text-center'>
                <p className="mb-5">Hey this is from play</p>
                <Button href="/" variant="contained" color="secondary" style={{
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    display: 'block'
                }} className='font-bold'
                >
                    Back
                </Button>
            </div>
        </div>
    )
}