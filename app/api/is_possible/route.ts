import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!data.nums || !data.target) {
        return NextResponse.json({ error: "Missing nums or target" }, { status: 400 });
    }

    if (!Array.isArray(data.nums) || typeof data.target !== "number") {
        return NextResponse.json({ error: "Invalid nums or target" }, { status: 400 });
    }

    if (data.nums.length === 0) {
        return NextResponse.json({ error: "Empty nums array" }, { status: 400 });
    }

    const result = findCombination(data.nums);

    return NextResponse.json(
        result,
        { status: 200 }
    );
}

function shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleOperations(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function calculateWithPriority(arr: number[], ops: string[]): number {
    let result = arr[0];
    let currentOperation = ops[0];

    for (let i = 1; i < arr.length; i++) {
        switch (currentOperation) {
            case '+':
                result += arr[i];
                break;
            case '-':
                result -= arr[i];
                break;
            case '*':
                result *= arr[i];
                break;
            case '/':
                result /= arr[i];
                break;
            default:
                break;
        }

        if (i < ops.length) {
            currentOperation = ops[i];
        }
    }

    return result;
}

interface CombinationResult {
    message: boolean;
    expression?: string;
}

function buildExpression(nums: number[], ops: string[]): string {
    let expression = nums[0].toString();

    for (let i = 1; i < nums.length; i++) {
        expression += ops[i - 1] + nums[i];
    }

    return expression;
}

function findCombination(arr: number[]): CombinationResult {
    const operations = ['+', '-', '*', '/'];

    for (let i = 0; i < 6912; i++) {
        const shuffledArray = [...arr];
        const shuffledOperations = [...operations];

        shuffleArray(shuffledArray);
        shuffleOperations(shuffledOperations);

        const result = calculateWithPriority(shuffledArray, shuffledOperations);

        if (result === 24) {
            const expression = buildExpression(shuffledArray, shuffledOperations);
            return { message: true, expression };
        }
    }

    return { message: false };
}



