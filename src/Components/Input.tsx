import React from 'react'
import { InputProps } from '../Types/Types'
import './style.scss'

function Input({
	type,
	value,
	onChange,
	onKeyDown,
	placeholder,
	preview,
	children,
	onFocus,
	onBlur,
}: InputProps): JSX.Element {
	return (
		<div className='input__container'>
			{preview && <span className='input__preview'>{children}</span>}
			<input
				type={type}
				style={{ paddingTop: children && children.length ? '0' : '18px' }}
				className='input'
				min='0'
				step='.01'
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	)
}

export default Input
