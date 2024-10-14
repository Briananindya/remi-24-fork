import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { Button } from "@mui/material";

const notoSansJP = Noto_Sans_JP({
    weight: '600',
    subsets: ['latin'],
    variable: '--font-noto-sans-jp',
});

// GIF data
const guessedRight = {
    gifs: [
        "https://media.tenor.com/mHXNv7TSCLMAAAAi/detective-conan.gif",
        "https://media.tenor.com/8KYu56w12M4AAAAi/detective-conan-okay.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/8KYu56w12M4AAAAi/detective-conan-okay.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/mHXNv7TSCLMAAAAi/detective-conan.gif"
    ],
    kanji: [
        "There is always only one truth",
        "There's not a mystery in the world that can't be solved!!!",
        "The strong one doesn't win, the one that wins is strong",
        "How come you did that?",
        "The power of deduction is not limited by age. It’s the mind that solves cases, not the body..",
        "A man who can only think about mysteries isn’t capable of doing things like this",
        "When you have eliminated the impossible, whatever remains, must be the truth",
        "Every mystery is a puzzle waiting to be solved",
        "Using too much of your brain can make you bald like Professor Agasa!",
        "In the smallest details lie the keys to solving the grandest mysteries",
    ],
    romaji: [
        "(Kebenaran selalu hanya ada satu)",
        "(Tidak ada misteri di dunia ini yang tidak bisa dipecahkan!!!)",
        "(Bukan yang kuatlah yang menang, yang menanglah yang kuat)",
        "(Kok kamu bisa melakukan itu?)",
        "(Kekuatan deduksi tidak dibatasi oleh usia. Pikiranlah yang memecahkan kasus, bukan tubuh..)",
        "(Seorang yang hanya bisa memikirkan misteri, tidak akan mampu melakukan hal seperti ini)",
        "(Ketika Anda telah menghilangkan hal yang mustahil, apa pun yang tersisa, pasti adalah kebenaran)",
        "(Setiap misteri adalah teka-teki yang menunggu untuk dipecahkan)",
        "(Berpikir terlalu keras dapat membuatmu botak seperti Profesor Agasa!)",
        "(Dalam detail terkecil terdapat kunci untuk memecahkan misteri yang paling besar)"
    ]
};

const guessedWrong = {
    gifs: [
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif"
    ],
    kanji: [
        "Ah-Le-Le?",
        "Although this mirror can show a reflection, it cannot show you the truth",
        "There’re no such things as a perfect person in this world",
        "There are things that shall remain a mystery",
        "Sometimes feelings get tangled together with deductions, forming a veil that hides the truth",
        "There is no deduction that is superior or inferior... because there is only one truth..",
        "So long... great detective",
        "It’s the unexpected twists that make life truly intriguing",
        "The only ones who can miss a kick draw are those who have the courage to kick it",
        "The pursuit of truth is never in vain"
    ],
    romaji: [
        "(Ah-Le-Le?)",
        "(Meskipun cermin ini dapat menunjukkan pantulan, namun tidak dapat menunjukkan kebenaran)",
        "(Tidak ada yang namanya orang yang sempurna di dunia ini)",
        "(Ada beberapa hal yang akan tetap menjadi misteri)",
        "(Terkadang perasaan bercampur bersama dengan deduksi, membentuk tirai yang menyembunyikan kebenaran)",
        "(Tidak ada deduksi yang lebih tinggi atau lebih rendah... karena hanya ada satu kebenaran.)",
        "(Selamat tinggal... detektif hebat)",
        "(Hal-hal yang tidak terdugalah yang membuat hidup ini menarik)",
        "(Satu-satunya orang yang bisa gagal melakukan tendangan adalah mereka yang punya keberanian untuk menendangnya)",
        "(pengejaran kebenaran tidak pernah sia-sia)"
    ]
};

const popupGifs = {
    correct: [
        "https://media.tenor.com/mHXNv7TSCLMAAAAi/detective-conan.gif",
        "https://media.tenor.com/8KYu56w12M4AAAAi/detective-conan-okay.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/8KYu56w12M4AAAAi/detective-conan-okay.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/sPwy8pSrnXQAAAAi/detective-conan.gif",
        "https://media.tenor.com/mHXNv7TSCLMAAAAi/detective-conan.gif"
    ],
    incorrect: [
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/FEf8AzUTwOAAAAAi/detective-conan-what.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif"
    ],

};

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addParentheses(expression: string): string {
    let nums: string[] = expression.split(/[+\-*/]/);
    let operators: string[] = expression.match(/[+\-*/]/g) || [];
    return `((${nums[0]}${operators[0]}${nums[1]})${operators[1]}${nums[2]})${operators[2]}${nums[3]}`;
}

type ResultProps = {
    result: boolean,
    expression: string,
    nums: number[]
};

export default function Result({ result, expression, nums }: ResultProps) {
    const correctAudio = useRef<HTMLAudioElement>(null);
    const wrongAudio = useRef<HTMLAudioElement>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupGif, setPopupGif] = useState("");
    const [guessGif, setGuessGif] = useState("");
    const [kanji, setKanji] = useState("");
    const [romaji, setRomaji] = useState("");

    useEffect(() => {
        const getRandomElement = (array: string[]) => array[randomInt(0, array.length - 1)];
        
        // Set GIFs based on the result
        const selectedGif = result ? getRandomElement(guessedRight.gifs) : getRandomElement(guessedWrong.gifs);
        setGuessGif(selectedGif);
    
        // Set kanji and romaji texts
        const kanjiIndex = randomInt(0, result ? guessedRight.kanji.length - 1 : guessedWrong.kanji.length - 1);
        const kanjiText = result ? guessedRight.kanji[kanjiIndex] : guessedWrong.kanji[kanjiIndex];
        const romajiText = result ? guessedRight.romaji[kanjiIndex] : guessedWrong.romaji[kanjiIndex];
        setKanji(kanjiText);
        setRomaji(romajiText);
    
        setPopupGif(result ? getRandomElement(popupGifs.correct) : getRandomElement(popupGifs.incorrect));
    
        // Play corresponding audio
        result ? correctAudio.current?.play() : wrongAudio.current?.play();
    
        // Show popup
        setShowPopup(true);
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, [result]);
    

    return (
        <div className="min-h-screen flex items-center justify-center font-bold p-5">
            <audio ref={correctAudio} src="/Case solved- detectiveconan Sound Effect.mp3" preload="auto" />
            <audio ref={wrongAudio} src="/Detective Conan Anime Sound Effect_ Shock  Revelation  Surprise.mp3" preload="auto" />
            <div className="block text-center">
                <div className="flex items-center justify-center">
                    <Image
                        src={guessGif}
                        alt="Result gif"
                        width={250}
                        height={250}
                        className="rounded-xl"
                    />
                </div>
                <div className="mt-5"></div>
                <p className={notoSansJP.className}>
                    {kanji}
                    <br />
                    <span className="opacity-75">
                        {romaji}
                    </span>
                </p>
                <div className="mb-3 mt-3">
                    [{nums.join(',')}]
                    {expression ? (
                        <p>
                            Solution: {addParentheses(expression)}
                        </p>
                    ) : "" }
                </div>
                <Button href="/play" variant="contained" color="primary" style={{
                    marginTop: 20,
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: 'block'
                }} className='font-bold'>
                    {result ? "Main Lagi 😆✨ " : "Coba Lagi 😡💢"}
                </Button>
                <Button href="/" variant="contained" color="secondary" style={{
                    marginTop: 20,
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: 'block'
                }} className='font-bold'>
                    Menu
                </Button>
            </div>

            {/* Pop-up GIF */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="flex flex-col items-center">
                        <Image
                            src={popupGif}
                            alt="Popup gif"
                            width={300}
                            height={300}
                            className="rounded-xl transition-opacity duration-300 opacity-100"
                            style={{ animation: "fadeOut 3s forwards" }}
                        />
                        <div className={`text-3xl font-bold text-white mt-4 animate__animated ${result ? "animate__bounceIn" : "animate__bounceOut"}`}>
                            {result ? "Kamu Benar!! ✅" : "Kamu Salah!! ❌"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
