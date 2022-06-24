import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from '../styles/Game.module.css';

const Game: NextPage = ({ number }: any) => {
    const [score, setScore] = useState(0)
    const [secret, setSecret] = useState(number)
    const [oldSecret2, setOldSecret2] = useState(number)
    const [oldSecret, setOldSecret] = useState(number)
    const [guess, setGuess] = useState<null | string>(null)

    const generateNextNumber = () => {
        setOldSecret2(oldSecret)
        setOldSecret(secret)
        setSecret(randomNumber(0, 100))
    }

    const handleGuessClick = (guess: string) => {
        setGuess(guess)
        generateNextNumber()
    }

    useEffect(() => {
        if (guess === 'high' && oldSecret < secret
            || guess === 'low' && oldSecret > secret) {
            setScore(score + 1)
        }
    }, [secret])

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.title}>Hi-low Game</div>
                <div className={styles.gameWrapper}>
                    <div className={styles.score}>Score: {score}</div>
                    <div><span className={styles.oldSecret}>{oldSecret2} -&gt; {oldSecret} -&gt;</span> <span className={styles.newSecret}>{secret}</span></div>
                    <div className={styles.gameControls}>
                        <button className={styles.button} onClick={() => handleGuessClick('skip')}>Skip</button>
                        <button className={styles.button} onClick={() => handleGuessClick('high')}>High</button>
                        <button className={styles.button} onClick={() => handleGuessClick('low')}>Low</button>
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