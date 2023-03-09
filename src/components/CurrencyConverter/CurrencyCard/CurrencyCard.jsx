import React from 'react';

import classes from "./CurrencyCard.module.scss";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";

const CurrencyCard = ({title, value, price, currency, convert, setValue}) => {
  return (
    <div className={classes.converter__card}>
      <h2 className={classes.converter__card__title}>{title}</h2>
      <input type="number"
             className={classes.converter__card__input}
             placeholder={`Текущий курс = ${value}`}
             value={price || ""}
             onChange={e => convert(e.target.value)}
      />
      <FormControl sx={{m: 1, minWidth: 370, margin: 0}}>
        <InputLabel id="demo-simple-select-autowidth-label">Выберите валюту</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          defaultValue=""
          onChange={e => setValue(e.target.value)}
          autoWidth
          label="Валюта"
        >
          {Object.keys(currency).map((value, index) =>
            <MenuItem value={currency[value].Value} key={index}>
              {currency[value].Name}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default CurrencyCard;