import { create } from 'zustand'

const useStore = create(set => ({
    current: 0,
    storedAmount: 0,
    currentOperation: '',
    newResult: false,
    error: false,

    setCurrent: (value) => set({ current: value, storedAmount: 0, newResult: false }),
    updateCurrent: (value) => set(state => {
        if (!state.error) {
            if (state.current == 0) {
                return { current: value, newResult: false }
            } else {
                return { current: state.current + value, newResult: false }
            }
        } else {
            return { current: state.current, newResult: false }
        }
    }),
    invertCurrent: () => set(state => ({ current: state.current * -1, newResult: false })),

    setStoredAmount: (value) => set({ storedAmount: value, newResult: false }),
    setError: (value) => set({ error: value }),
    clearAll: () => set({ current: 0, storedAmount: 0, currentOperation: '' }),
    createOperation: (operation) => set(state => ({
        currentOperation: operation, storedAmount: state.current, current: 0, newResult: false
    })),
    percentage: () => set(state => {
        if (state.storedAmount === 0) {
            return ({ current: state.current / 100 })
        }
        else {
            return ({ current: state.storedAmount * (state.current / 100) })
        }
    }),
    getResult: () => set(state => {
        if (state.currentOperation === '+') {
            return { current: Number(state.current) + Number(state.storedAmount), currentOperation: '', storedAmount: 0, newResult: true }
        }
        else if (state.currentOperation === '-') {
            return { current: state.storedAmount - state.current, currentOperation: '', storedAmount: 0, newResult: true }
        }
        else if (state.currentOperation === 'x') {
            return { current: state.storedAmount * state.current, currentOperation: '', storedAmount: 0, newResult: true }
        }
        else if (state.currentOperation === '÷') {
            return { current: state.storedAmount / state.current, currentOperation: '', storedAmount: 0, newResult: true }
        }
        else {
            return { current: state.current, currentOperation: '', storedAmount: 0 }
        }
    }),
}))

export { useStore }
