import type { NextPage } from "next";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import styles from '../styles/Game.module.css';

const Game: NextPage = ({ number }: any) => {
    const [score, setScore] = useState(0)
    const [secret, setSecret] = useState(number)
    const [oldSecret, setOldSecret] = useState<number>(secret)
    const [oldOldSecret, setOldOldSecret] = useState<number>(secret)
    const [streak, setStreak] = useState<number>(0)
    const [scoreBuffer, setScoreBuffer] = useState<number>(0)

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
        setScore(score + scoreBuffer)
        setScoreBuffer(0)
        setStreak(0)
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.title}>Hi-low Game</div>
                <div className={styles.gameWrapper}>
                    <div className={styles.score}>Score: {score}</div>
                    <div className={styles.score}>Win: {scoreBuffer}</div>
                    <div><span className={styles.oldSecret}>{oldOldSecret} -&gt; {oldSecret} -&gt;</span> <span className={styles.newSecret}>{secret}</span></div>
                    <div className={styles.gameControls}>
                        <button className={styles.button} onClick={() => handleSkipClick()}>Skip</button>
                        <button className={styles.button} onClick={() => handleHighClick()}>High</button>
                        <button className={styles.button} onClick={() => handleLowClick()}>Low</button>
                        <button className={styles.button} onClick={() => handleCheckoutClick()}>Checkout</button>
                    </div>
                    {streak > 0 && <div>Winning Streak x{streak}</div>}
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