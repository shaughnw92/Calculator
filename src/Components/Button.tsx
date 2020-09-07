import React from 'react'
import classNames from 'classnames'
import { ButtonProps } from '../Types/Types'

function Button({ variant, handleClick, children }: ButtonProps): JSX.Element {
	return (
		<button
			className={classNames(
				'button',
				children.includes('0' || 'C') && 'button--lg',
				variant !== 'number' && 'button--red button--bold'
			)}
			onClick={() => handleClick(children)}
		>
			{children}
		</button>
	)
}

export default Button
