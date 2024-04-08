import React, { useEffect, useState } from "react";
import { NumBtn } from "./NumBtn";
import './styles.css';
import { useStore } from './Store'

const Calc = () => {

  //state management
  const {
    updateCurrent,
    current,
    currentOperation,
    storedAmount,
    invertCurrent,
    createOperation,
    clearAll,
    getResult,
    percentage,
    setCurrent,
    newResult,
    setError
  } = useStore();

  const handleOperation = (operation) => {
    if (storedAmount) {
      getResult()
      createOperation(operation)
    } else {
      createOperation(operation)
    }
  }

  //font size management
  const fontSize = { fontSize: current.length >= 8 ? '2rem' : '' }

  //keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      const isNumber = !isNaN(e.key)
      if (isNumber) {
        updateCurrent(e.key)
      }
      else if (e.key === '.') {
        updateCurrent(e.key)
      }
      else if (e.key === '+') {
        createOperation('+')
      }
      else if (e.key === '-') {
        createOperation('-')
      }
      else if (e.key === '*') {
        createOperation('x')
      }
      else if (e.key === '/') {
        createOperation('÷')
      }
      else if (e.key === 'Enter') {
        getResult()
      }
      else if (e.key === 'Escape') {
        clearAll()
      }
      else if (e.key === '%') {
        percentage()
      }
      else if (e.key === 'Backspace') {
        clearAll()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [updateCurrent, createOperation, clearAll, getResult, setCurrent, current]);

  //max limit management
  useEffect(() => {
    if (current.length > 16) {
      setError(true)
      setCurrent('Max limit')
      setTimeout(() => {
        setError(false)
        setCurrent(0)
      }, 800)
    }
  }, [current])

  //results with decimal
  useEffect(() => {
    const hasDecimal = (value) => value.includes('.')
    if (!newResult) return
    if (hasDecimal(current.toString())) {
      setCurrent(parseFloat(current).toFixed(2))
    }
  }, [newResult])

  return (
    <div className="calc">
      <div className="calc-ctn">
        <div className="number-container">
          {storedAmount != 0 ?
            <div className="history-num">
              <div>{storedAmount}</div>
              <div>{currentOperation}</div>
            </div> : null}
          <div style={fontSize} className="current-num">{current}</div>
        </div>
        <div className="numpad-ctn">
          <div className="numpad-col">
            <div className="advance-wrp">
              <NumBtn color='btn-light' onClick={() => clearAll()} text="c" />
              <NumBtn color='btn-light' onClick={() => invertCurrent()} text="+/-" />
              <NumBtn color='btn-light' onClick={() => percentage()} text="%" />
            </div>
            <div className="numbers-wpr">
              <NumBtn text="1" type='num' />
              <NumBtn text="2" type='num' />
              <NumBtn text="3" type='num' />
              <NumBtn text="4" type='num' />
              <NumBtn text="5" type='num' />
              <NumBtn text="6" type='num' />
              <NumBtn text="7" type='num' />
              <NumBtn text="8" type='num' />
              <NumBtn text="9" type='num' />
              <NumBtn largeWidth mobileWidth={10} text="0" type='num' />
              <NumBtn text="." type='num' />
            </div>
          </div>
          <div className="operation-wpr">
            <NumBtn color='primary' onClick={() => handleOperation('÷')} text="÷" />
            <NumBtn color='primary' onClick={() => handleOperation('x')} text="x" />
            <NumBtn color='primary' onClick={() => handleOperation('-')} text="-" />
            <NumBtn color='primary' onClick={() => handleOperation('+')} text="+" />
            <NumBtn color='primary' onClick={() => getResult()} text="=" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
