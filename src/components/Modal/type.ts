export interface IModal {
    text: string;
    buttonText: string;
    action: () => void;
    modalValue?: string | number;
    type?: 'selector' | 'textField';
    selectorProps?:{title:string, variants:string[]};
    setModalValue?: React.Dispatch<React.SetStateAction<any>>;
    closeFromOutside?: React.Dispatch<React.SetStateAction<boolean>>;
}