import Image from "next/image"
import { Noto_Sans_JP } from "next/font/google"
import { Button } from "@mui/material";

const notoSansJP = Noto_Sans_JP({
    weight: '600', 
    subsets: ['latin'], 
    variable: '--font-noto-sans-jp',
})

const guessedRight = {
    gifs: [
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
        "https://media.tenor.com/_1BGjzDAvnkAAAAi/detective-conan.gif",
    ],
    kanji: [
        "There is always only one truth",
        "There's not a mystery in the world that can't be solved!!!",
        "The strong one doesn't win, the one that win is strong",
        "A trick is nothing but a puzzle mankind came up with. If you use your head, you can uncover the logical answer",
        "The power of deduction is not limited by age. It’s the mind that solves cases, not the body..",
        "A man who can only think about mysteries isn’t capable of doing things like this",
        "In the world of deductions, there are no shortcuts. It’s about meticulous observation, connecting the dots, and uncovering the truth",
        "Every mystery is a puzzle waiting to be solved. My passion for deduction burns brighter with each case",
        "In the pursuit of truth, I’ve learned that inspiration can be found in the most unexpected places. Life itself is the greatest teacher",
        "Observation isn’t just about seeing; it’s about truly understanding. In the smallest details lie the keys to solving the grandest mysteries",
    ],
    romaji: [
        "(Kebenaran selalu hanya ada satu)",
        "(Tidak ada misteri di dunia ini yang tidak bisa dipecahkan!!!)",
        "(Bukan yang kuatlah yang menang, yang menanglah yang kuat)",
        "(Trik tidak lain adalah teka-teki yang dibuat oleh manusia. Jika Anda menggunakan akal sehat, Anda bisa menemukan jawaban yang logis)",
        "(Kekuatan deduksi tidak dibatasi oleh usia. Pikiranlah yang memecahkan kasus, bukan tubuh..)",
        "(Seorang yang hanya bisa memikirkan misteri, tidak akan mampu melakukan hal seperti ini)",
        "(Dalam dunia deduksi, tidak ada jalan pintas. Ini adalah tentang pengamatan yang cermat, menghubungkan titik-titik, dan mengungkap kebenaran)",
        "(Setiap misteri adalah teka-teki yang menunggu untuk dipecahkan. Semangat saya untuk melakukan deduksi semakin membara dengan setiap kasus)",
        "(Dalam mengejar kebenaran, aku telah belajar bahwa inspirasi dapat ditemukan di tempat yang paling tidak terduga. Kehidupan itu sendiri adalah guru terbaik.)",
        "(Pengamatan bukan hanya tentang melihat; ini tentang pemahaman yang sesungguhnya. Dalam detail terkecil terdapat kunci untuk memecahkan misteri yang paling besar)"
    ]
}

const guessedWrong = {
    gifs: [
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif",
        "https://media.tenor.com/nFJ7oJf2WKEAAAAi/detective-conan-no.gif"
    ],
    kanji: [
        "Ah-Le-Le?",
        "Although this mirror can show a reflection, it cannot show you the truth",
        "There’re no such things as a perfect person in this world",
        "There are things that shall remain a mystery",
        "Sometimes feelings get tangled together with deductions, forming a veil that hides the truth",
        "Unsolvable cases are a challenge I embrace. They remind me that even in defeat, I grow stronger, wiser, and more determined.",
        "In the world of mysteries, nothing is as it seems. It’s the unexpected twists that make life truly intriguing",
        "In the shadow of mystery, truth hides, and deception thrives. It’s the thrill of the chase that keeps us going",
        "Some mysteries are meant to remain unsolved, but that doesn’t deter my pursuit of truth. The journey itself is worth the effort",
        "An unsolvable case is an enigma that fuels my passion for deduction. It’s a reminder that the pursuit of truth is never in vain"
    ],
    romaji: [
        "(Ah-Le-Le?)",
        "(Meskipun cermin ini bisa menunjukkan pantulan, namun tidak bisa menunjukkanmu kebenaran)",
        "(Tidak ada yang namanya orang yang sempurna di dunia ini)",
        "(Ada beberapa hal yang akan tetap menjadi misteri)",
        "(Terkadang perasaan menjadi kusut bersama dengan deduksi, membentuk tirai yang menyembunyikan kebenaran)",
        "(Kasus-kasus yang tidak terpecahkan adalah tantangan yang saya hadapi.Kasus-kasus tersebut mengingatkan saya bahwa bahkan dalam kekalahan, saya menjadi lebih kuat, lebih bijaksana, dan lebih bertekad.)",
        "(Dalam dunia misteri, tidak ada yang seperti yang terlihat. Hal-hal yang tidak terduga yang membuat hidup ini benar-benar menarik)",
        "(Dalam bayang-bayang misteri, kebenaran bersembunyi, dan penipuan semakin merajalela. Sensasi dari pengejaran inilah yang membuat kita terus maju)",
        "(Beberapa misteri memang ditakdirkan untuk tetap tidak terpecahkan, namun hal itu tidak menghalangiku untuk mengejar kebenaran. Perjalanan itu sendiri sepadan dengan usaha yang dibutuhkan)",
        "(Kasus yang tidak terpecahkan adalah sebuah teka-teki yang memicu hasrat saya untuk melakukan deduksi. Ini adalah pengingat bahwa pengejaran kebenaran tidak pernah sia-siaKasus yang tidak terpecahkan adalah sebuah teka-teki yang memicu hasrat untuk melakukan deduksi. Ini adalah pengingat bahwa pengejaran kebenaran tidak pernah sia-sia)"
    ]
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

type ResultProps = {
    result: boolean,
    expression: string,
    nums: number[]
}

function addParentheses(expression: string): string {
    let nums: string[] = expression.split(/[+\-*/]/)
    let operators: string[] = expression.match(/[+\-*/]/g) || [];
    return `((${nums[0]}${operators[0]}${nums[1]})${operators[1]}${nums[2]})${operators[2]}${nums[3]}`
}

export default function Result({result, expression, nums}: ResultProps){
    let textIndex = randomInt(0, 9)
    let gifIndex = randomInt(0, 9)

    return (
        <div className="min-h-screen flex items-center justify-center font-bold p-5">
            <div className="block text-center">
                <div className="flex items-center justify-center">
                    <Image
                        src={result ? guessedRight.gifs[gifIndex] : guessedWrong.gifs[gifIndex]}
                        alt="Winning gif"
                        width={250}
                        height={250}
                        className="rounded-xl"
                    >
                    </Image>
                </div>
                <div className="mt-5"></div>
                <p className={notoSansJP.className}>
                    {result ? guessedRight.kanji[textIndex] : guessedWrong.kanji[textIndex]}
                    <br />
                    <span className="opacity-75">
                        {result ? guessedRight.romaji[textIndex] : guessedWrong.romaji[textIndex]}
                    </span>
                </p>
                <div className="mb-3 mt-3">
                    [{nums.join(',')}]
                    {expression ? (<p>
                        Solution: {addParentheses(expression)}
                    </p>) : ""}
                </div>
                <Button href="/play" variant="contained" color="primary" style={{
                    marginTop: 20,
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: 'block'
                }} className='font-bold'
                >
                    {result ? "lagi ah aku jago" : "aku akan balas dendam"}
                </Button>
                <Button href="/" variant="contained" color="secondary" style={{
                    marginTop: 20,
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: 'block'
                }} className='font-bold'
                >
                    Udah ah capek males mikir
                </Button>
            </div>
        </div>
    )
}