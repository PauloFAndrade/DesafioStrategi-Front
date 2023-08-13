import React from 'react';
import InputMask from 'react-input-mask';

const MaskedInput = ({type, value, onChange, mask, name, required}) => {
    return <InputMask type={type} required id={name} name={name} value={value} onChange={onChange} mask={mask} placeholder={name} className='duration-300 px-3 py-3 placeholder-slate-300 text-black relative bg-white rounded-xl text-sm border border-bluesebrae outline-none focus:outline-none w-full'/>
}

export default MaskedInput