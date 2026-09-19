import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { decrement, incrementByAmount, incrementAsync } from "../state/counter/CounterSlice"

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <section className="counter-card" aria-labelledby="counter-title">
            <p className="counter-label">Redux state</p>
            <h2 id="counter-title" className="counter-title">Counter</h2>
            <p className="counter-value" aria-live="polite">{count}</p>
            <div className="counter-actions">
                {/* <button
                    className="counter-button counter-button--primary"
                    onClick={() => dispatch(incrementByAmount(10))}
                >
                    Increment
                </button> */}
                <button
                    className="counter-button counter-button--primary"
                    onClick={() => dispatch(incrementAsync(10))}
                >
                    Increment
                </button>

                <button
                    className="counter-button counter-button--secondary"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </section>
    )
}