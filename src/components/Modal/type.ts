import {GameType} from "../../api_client/type";
import React from "react";

export interface IModal {
    text: string;
    buttonText: string;
    action: () => void;
    modalValue?: string | GameType;
    type?: 'selector' | 'textField';
    selectorProps?:{title:string, variants:string[]};
    setModalValue?: React.Dispatch<React.SetStateAction<string | GameType>>;
    closeFromOutside?: React.Dispatch<React.SetStateAction<boolean>>;
}