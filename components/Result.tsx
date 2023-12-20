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
        "https://media.tenor.com/V8QQHq5r5AgAAAAj/bocchi-bocchi-the-rock.gif",
        "https://media1.tenor.com/m/kq18c9o1QPAAAAAC/kita-ikuyo.gif",
        "https://media.tenor.com/MyPnF_oV1YAAAAAj/chika-thumbs-up.gif",
        "https://media.tenor.com/gePaZLuiEagAAAAM/miyamura-izumi.gif",
        "https://media.tenor.com/2GoQRjy7DVkAAAAM/bocchi-the-rock.gif",
        "https://media.tenor.com/AtUsmb-2Ch8AAAAM/satou-mafuyu.gif",
        "https://media.tenor.com/hnP8FWI5fB4AAAAM/joseph-joestar-nice.gif",
        "https://media.tenor.com/j_eF3ar6RHwAAAAM/jjba-jo-jos-bizarre-adventure.gif",
        "https://media.tenor.com/bkhfUGiT26wAAAAM/rwby-ruby-rose-rwby-ice-queendom.gif",
        "https://media.tenor.com/YzBJz32I8QMAAAAM/chika-fast.gif"  
    ],
    kanji: [
        "やったね！正解だよ！",
        "すごい！見事に当たったね！",
        "おめでとう！よくやったね！",
        "素晴らしい！完璧な答えだね！",
        "さすが！ぴったり合ってるよ！",
        "すばらしい！正しい答えを見つけたね！",
        "お見事！正解を当てたね！",
        "すごいね！正解を言い当てたよ！",
        "おめでとうございます！正解です！",
        "素敵！正解を導き出したね！"
    ],
    romaji: [
        "(Yatta ne! Seikai da yo!)",
        "(Sugoi! Migitoni atta ne!)",
        "(Omedetou! Yoku yatta ne!)",
        "(Subarashii! Kanpeki na kotae da ne!)",
        "(Sasuga! Pittari atteru yo!)",
        "(Subarashii! Tadashii kotae o mitsuketa ne!)",
        "(Omisugoi! Seikai o ateta ne!)",
        "(Sugoi ne! Seikai o iiateta yo!)",
        "(Omedetou gozaimasu! Seikai desu!)",
        "(Suteki! Seikai o michibikidashita ne!)"
    ]
}

const guessedWrong = {
    gifs: [
        "https://media.tenor.com/BYsOZIxZGB0AAAAM/josuke.gif",
        "https://media.tenor.com/8kvx6rXn5w4AAAAM/anime-smile.gif",
        "https://media.tenor.com/EqrI4CB-grYAAAAM/anime-happy.gif",
        "https://media.tenor.com/ZglUG-3bnOAAAAAM/anime-shikimoris-not-just-cute.gif",
        "https://media.tenor.com/-R5KgJXNyiwAAAAM/jujutsu-kaisen-itadori.gif",
        "https://media.tenor.com/jKCHrqzLx2wAAAAM/jojo-laugh.gif",
        "https://media.tenor.com/ZncIFM9jiMoAAAAM/anime-crying.gif",
        "https://media.tenor.com/EXikU561DxsAAAAM/sad-anime.gif",
        "https://media.tenor.com/pqXmHpbIy0MAAAAM/anime-anime-hug.gif",
        "https://media.tenor.com/Di5YqKxPrCIAAAAM/bocchi-the-rock-bocchi-the-rock-shock.gif"
    ],
    kanji: [
        "残念！不正解だよ！",
        "あらら！外れちゃったね！",
        "残念！間違ってるよ！",
        "残念！正しい答えじゃないね！",
        "あれ？違うよ！",
        "残念！正解とは違うね！",
        "あらら！見事に外したね！",
        "残念！正解を言い当てられなかったね！",
        "残念でした！不正解です！",
        "残念！正解を導き出せなかったね！"
    ],
    romaji: [
        "(Zannen! Fuseikai da yo!)",
        "(Arara! Hazurechatta ne!)",
        "(Zannen! Machigatteru yo!)",
        "(Zannen! Tadashii kotae janai ne!)",
        "(Are? Chigau yo!)",
        "(Zannen! Seikai to wa chigau ne!)",
        "(Arara! Migitoni hazushita ne!)",
        "(Zannen! Seikai o iiatrarenakatta ne!)",
        "(Zannen deshita! Fuseikai desu!)",
        "(Zannen! Seikai o michibikidasenakatta ne!)"
    ]
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

type ResultProps = {
    result: boolean,
    expression: string
}

function addParentheses(expression: string): string {
    let nums: string[] = expression.split(/[+\-*/]/)
    let operators: string[] = expression.match(/[+\-*/]/g) || [];
    return `((${nums[0]}${operators[0]}${nums[1]})${operators[1]}${nums[2]})${operators[2]}${nums[3]}`
}

export default function Result({result, expression}: ResultProps){
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
                    Play again {result ? "😆✨" : "😡💢"}
                </Button>
                <Button href="/" variant="contained" color="secondary" style={{
                    marginTop: 20,
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: 'block'
                }} className='font-bold'
                >
                    Decrease me here
                </Button>
            </div>
        </div>
    )
}