export interface ButtonProps {
	variant: 'number' | 'operator' | 'method'
	handleClick: (arg: string) => void
	children: string
}

export interface InputProps {
	type: 'text' | 'number'
	value: string | number
	onChange: (e: React.ChangeEvent) => void
	onKeyDown: (e: React.KeyboardEvent) => void
	placeholder?: string
	preview?: boolean
	children?: string
	onFocus: (e: React.FocusEvent) => void
	onBlur: (e: React.FocusEvent) => void
}

export type Operator = 'C' | '+' | '-' | '*' | '÷' | '='
