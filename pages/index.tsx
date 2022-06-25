import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import styles from '../styles/Game.module.css';

const Game: NextPage = ({ number }: any) => {
    const [score, setScore] = useState(0)
    const [secret, setSecret] = useState(number)
    const [oldSecret, setOldSecret] = useState<number>(secret)
    const [oldOldSecret, setOldOldSecret] = useState<number>(secret)
    const [streak, setStreak] = useState<number>(0)
    const [scoreBuffer, setScoreBuffer] = useState<number>(0)
    const formattedScore = useMemo(() => {
        return new Intl.NumberFormat('en-US', { notation: "compact" }).format(score)
    }, [score])

    function generateNextNumber(): number {
        return randomNumber(0, 100)
    }

    function populateSecret(rnd: number) {
        const tempSecret = secret
        const tempOldSecret = oldSecret
        setOldOldSecret(tempOldSecret)
        setOldSecret(tempSecret)
        setSecret(rnd)
    }

    function handleResult(test: Function) {
        if (test()) {
            const tempStreak = streak + 1
            let tempScoreBuffer = scoreBuffer + 1
            tempScoreBuffer += scoreBuffer * streak
            setScoreBuffer(tempScoreBuffer)
            setStreak(tempStreak)
        } else {
            setScoreBuffer(0)
            setStreak(0)
        }
    }

    function handleHighClick() {
        const newSecret = generateNextNumber()
        populateSecret(newSecret)

        handleResult(() => secret < newSecret)
    }

    function handleLowClick() {
        const newSecret = generateNextNumber()
        populateSecret(newSecret)

        handleResult(() => secret > newSecret)
    }

    function handleSkipClick() {
        const newSecret = generateNextNumber()
        populateSecret(newSecret)
    }

    function handleCheckoutClick() {
        if (scoreBuffer <= 0) return

        setScore(score + scoreBuffer)
        setScoreBuffer(0)
        setStreak(0)
    }

    return (
        <div className={styles.container}>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"></link>
                <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
            </Head>

            <main className={styles.main}>
                <div className={styles.title}>Hi-low Game</div>
                <div className={styles.gameWrapper}>
                    <div className="nes-container is-rounded is-dark">
                        <div className={styles.score}>Score: {formattedScore}</div>
                        <div className={styles.score}>Win: {scoreBuffer}</div>
                        <div className={"nes-text is-error " + styles.streak}>{streak > 0 && `Winning Streak x${streak}`}</div>
                        <div className={styles.newSecret}>{secret}</div>
                        <div className={styles.oldSecret}>{oldOldSecret} -&gt; {oldSecret} -&gt;</div>
                    </div>
                    <div className={styles.gameControls}>
                        <button className="nes-btn" onClick={() => handleSkipClick()}>Skip</button>
                        <button className="nes-btn is-primary" onClick={() => handleHighClick()}>High</button>
                        <button className="nes-btn is-primary" onClick={() => handleLowClick()}>Low</button>
                        <button className="nes-btn is-success" onClick={() => handleCheckoutClick()}>Checkout</button>

                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            number: randomNumber(0, 100)
        },
    }
}

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export default Game;