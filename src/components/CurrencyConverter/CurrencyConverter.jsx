import React, {useEffect, useState} from 'react';
import CurrencyCard from "./CurrencyCard/CurrencyCard";
import axios from "axios";

import reverse from "../../assets/reverse-arrows.svg";

import classes from "./CurrencyConverter.module.scss";


const CurrencyConverter = () => {
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
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
    setFromPrice(value)
    const convertedNumber = (toValue / fromValue) * fromPrice
    setToPrice(convertedNumber)
  }

  const convertToPrice = (value) => {
    setToPrice(value)
    const convertedNumber = (fromValue / toValue) * toPrice
    setFromPrice(convertedNumber)
  }

  return (
    <div className={classes.converter}>
      <h1 className={classes.converter__title}>Конвертер валют</h1>
      <div className={classes.converter__cards}>
        <CurrencyCard
          title={"У меня есть"}
          value={fromValue}
          price={fromPrice}
          currency={fromCurrency}
          convert={convertFromPrice}
          setValue={setFromValue}
        />
        <img className={classes.converter__reverse}
             src={reverse}
             alt="reverse"
        />
        <CurrencyCard
          title={"Я хочу купить"}
          value={toValue}
          price={toPrice}
          currency={toCurrency}
          convert={convertToPrice}
          setValue={setToValue}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;