import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Generate an array of 4 random integers
    let randomArray: number[] = [];
    for (let i = 0; i < 4; i++) {
        randomArray.push(randomInt());
    }

    return NextResponse.json({nums: randomArray}, {status:200})
}

function randomInt(): number {
    return Math.floor(Math.random() * 9) + 1;
}