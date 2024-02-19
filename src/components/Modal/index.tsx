import React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {IModal} from "./type";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const Modal = ({text, buttonText, action, modalValue, setModalValue, closeFromOutside, type = 'textField', selectorProps}: IModal) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);
    return (
        <div className={'absolute w-full h-full bg-black/70 z-10 flex justify-center items-center'} onClick={() => {
            if (closeFromOutside) {
                closeFromOutside(false);
            }
        }}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}
                 className={`${theme === 'dark' ? 'bg-neutral-900 text-white shadow-black' : 'bg-neutral-200'}
                 w-[350px] h-[200px] rounded-lg shadow-lg flex flex-col justify-evenly items-center`}>
                <h2>
                    {text}
                </h2>
                {
                    type === 'textField'
                    ? <TextField sx={{
                            input: {color: theme === 'dark' ? 'white' : ''}
                            , '.MuiInput-root::before': {borderBottomColor: theme === 'dark' ? 'white' : ''},
                        }}
                                id="standard-basic" variant="standard" value={modalValue} onChange={(e) => {
                                    if(setModalValue)
                                    setModalValue(e.target.value)
                        }}/>
                    :  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">{selectorProps?.title}</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={modalValue}
                                onChange={(e)=>{
                                    if(setModalValue)
                                    setModalValue(e.target.value)
                                }}
                                label={selectorProps?.title}
                            >
                                {
                                    selectorProps?.variants.map((item, i)=>
                                        <MenuItem key={i} value={i+1}>{item}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                }
                <Button color={theme === 'dark' ? 'inherit' : 'info'}
                        variant="outlined" disabled={!(!!modalValue)} onClick={action}
                        sx={{
                            "&.Mui-disabled": theme === 'dark' ? {
                                color: 'rgb(64 64 64)',
                                borderColor: 'rgb(64 64 64)'
                            } : ''
                        }}
                >{buttonText}</Button>
            </div>
        </div>
    )
}

export default Modal