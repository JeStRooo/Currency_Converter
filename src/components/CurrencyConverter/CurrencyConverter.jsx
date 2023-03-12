import React, {useEffect, useState} from 'react';
import CurrencyCard from "./CurrencyCard/CurrencyCard";
import axios from "axios";

import reverse from "../../assets/reverse-arrows.svg";

import classes from "./CurrencyConverter.module.scss";


const CurrencyConverter = () => {
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
  const [fromCurrencyValue, setFromCurrencyValue] = useState(0)
  const [toCurrencyValue, setToCurrencyValue] = useState(0)
  const [fromCurrency, setFromCurrency] = useState([])
  const [toCurrency, setToCurrency] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
    console.log(response.data.Valute)
    setFromCurrency(response.data.Valute)
    setToCurrency(response.data.Valute)
  }

  const convertFromPrice = (value) => {
    setFromValue(value)
    const convertedNumber = (toCurrencyValue / fromCurrencyValue) * fromValue
    setToValue(convertedNumber)
  }

  const convertToPrice = (value) => {
    setToValue(value)
    const convertedNumber = (fromCurrencyValue / toCurrencyValue) * toValue
    setFromValue(convertedNumber)
  }

  const switchCurrency = () => {
    setFromValue(toValue)
    setToValue(fromValue)
    setFromCurrencyValue(toCurrencyValue)
    setToCurrencyValue(fromCurrencyValue)
  }

  return (
    <div className={classes.converter}>
      <h1 className={classes.converter__title}>Конвертер валют</h1>
      <div className={classes.converter__cards}>
        <CurrencyCard
          title={"У меня есть"}
          currencyValue={fromCurrencyValue}
          value={fromValue}
          currency={fromCurrency}
          convert={convertFromPrice}
          setCurrencyValue={setFromCurrencyValue}
        />
        <img className={classes.converter__reverse}
             src={reverse}
             alt="reverse"
        />
        <CurrencyCard
          title={"Я хочу купить"}
          currencyValue={toCurrencyValue}
          value={toValue}
          currency={toCurrency}
          convert={convertToPrice}
          setCurrencyValue={setToCurrencyValue}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;