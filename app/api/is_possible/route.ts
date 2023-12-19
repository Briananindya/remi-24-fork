import { NextResponse } from "next/server";

export async function POST(request) {
    request = await request.json()
    // Validate the input and handle errors
    if (!request.nums || !request.target) {
        return NextResponse.json({ error: "Missing nums or target" }, { status: 400 });
    }
    if (!Array.isArray(request.nums) || typeof request.target !== "number") {
        return NextResponse.json({ error: "Invalid nums or target" }, { status: 400 });
    }
    if (request.nums.length === 0) {
        return NextResponse.json({ error: "Empty nums array" }, { status: 400 });
    }

    // Call the helper function and get the result
    const result = generateCombinations(request.nums, request.target);

    // Return a descriptive message and a status code
    return NextResponse.json(
        { message: result},
        { status: 200 }
    );
}

function generateCombinations(
    nums: number[],
    target: number,
    current_index: number = 0,
    current_result: number = 0,
    memo: Map<number, boolean> = new Map() // Use a map to store the intermediate results
): boolean {
    // Base case: reached the end of the array
    if (current_index === nums.length) {
        return current_result === target;
    }

    // Check if the result is already computed and return it
    const key = current_index * 1000 + current_result; // Use a unique key for each pair of index and result
    if (memo.has(key)) {
        return memo.get(key);
    }

    // Try addition
    if (
        generateCombinations(nums, target, current_index + 1, current_result + nums[current_index], memo)
    ) {
        memo.set(key, true); // Store the result in the map
        return true;
    }

    // Try subtraction
    if (
        generateCombinations(nums, target, current_index + 1, current_result - nums[current_index], memo)
    ) {
        memo.set(key, true); // Store the result in the map
        return true;
    }

    // Try multiplication
    if (
        generateCombinations(nums, target, current_index + 1, current_result * nums[current_index], memo)
    ) {
        memo.set(key, true); // Store the result in the map
        return true;
    }

    // Try division (avoid division by zero)
    if (
        nums[current_index] !== 0 &&
        current_result % nums[current_index] === 0 &&
        generateCombinations(nums, target, current_index + 1, current_result / nums[current_index], memo)
    ) {
        memo.set(key, true); // Store the result in the map
        return true;
    }

    // No combination found
    memo.set(key, false); // Store the result in the map
    return false;
}
