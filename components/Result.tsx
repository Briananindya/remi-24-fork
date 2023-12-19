import Image from "next/image"
import { Noto_Sans_JP } from "next/font/google"

type ResultProps = {
    result: boolean
}

const notoSansJP = Noto_Sans_JP({
    weight: '600', 
    subsets: ['latin'], 
    variable: '--font-noto-sans-jp',
})

export default function Result({result}: ResultProps){

    const guessedRight = {
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

    return (
        <div className="min-h-screen flex items-center justify-center font-bold p-5">
            <div className="block text-center">
                <Image 
                src="https://media1.tenor.com/m/kq18c9o1QPAAAAAC/kita-ikuyo.gif" 
                alt="Winning gif" 
                width={250} 
                height={250}
                className="rounded-xl"
                >
                </Image>
                <p className={notoSansJP.className}>{guessedRight.kanji[0]}</p>
            </div>
        </div>
    )
}