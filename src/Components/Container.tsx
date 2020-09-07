import React, { useState, useRef } from 'react'
import Button from './Button'
import Input from './Input'
import './style.scss'
import { Operator } from '../Types/Types'

function Container(): JSX.Element {
	const [text, setText] = useState<string>('')
	const numbersRef = useRef<(null | number)[]>([])
	const resultRef = useRef(0)
	const [placeholder, setPlaceholder] = useState('0')
	const [preview, setPreview] = useState('')
	const [editing, setEditing] = useState<boolean | null>(null)
	const regex = /[^!0-9.]/

	const handleCancel = (value: string): void => {
		if (!value.includes('C')) return
		if (preview.length > 0) {
			setPreview('')
		} else {
			setText('')
			setPlaceholder('0')
			numbersRef.current = []
		}
	}

	const handleValue = (value: Operator): void => {
		let lastOperator: Omit<Operator, 'C'> = preview[preview.search(regex)]

		switch (value) {
			case '+':
				lastOperator = '+'

				if (numbersRef.current.length <= 1) return
				resultRef.current = (numbersRef.current as number[]).reduce(
					(acc, val) => acc + val
				)
				break

			case '-':
				lastOperator = '-'

				if (numbersRef.current.length <= 1) return
				resultRef.current = (numbersRef.current as number[]).reduce(
					(acc, val) => val - acc
				)
				break

			case '*':
				lastOperator = '*'

				if (numbersRef.current.length <= 1) return
				resultRef.current = (numbersRef.current as number[]).reduce(
					(acc, val) => acc * val
				)
				break

			case '÷':
				lastOperator = '/'

				if (numbersRef.current.length <= 1) return
				resultRef.current = (numbersRef.current as number[]).reduce(
					(acc, val) => val / acc
				)
				break

			case '=':
				resultRef.current = (numbersRef.current as number[]).reduce(
					(acc, val) => {
						if (lastOperator === '+') return acc + val
						else if (lastOperator === '*') return acc * val
						else if (lastOperator === '-') return val - acc
						else if (lastOperator === '/') return val / acc

						return val
					}
				)
				break

			default:
				break
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent): void => {
		if (editing) {
			if (typeof text === 'string' && text.indexOf('.') === 1) {
				if (e.keyCode === 190) e.preventDefault()
			}
		}

		if (e.keyCode === 67) {
			if (preview.length > 0) {
				setPreview('')
			} else {
				numbersRef.current = []
				resultRef.current = 0
				setText('')
			}
		} else if (e.keyCode === 13 || 187) {
			setText(numbersRef.toString())
		} else {
			setText(text + e.currentTarget.textContent)
		}
	}

	const handleNumber = (value: string): void => setText(text + value)
	const handleClick = (value: string): void => {
		if (typeof text === 'string' && !text.length) return
		setPreview((preview + text + value).replace('=', ''))
		text.replace(regex, '')
		numbersRef.current.push(parseFloat(text))
		handleValue(value as Operator)
		setPlaceholder(resultRef.current.toString())
		setText('')
	}

	const handleChange = (e: React.ChangeEvent) => {
		if (text.includes(resultRef.current.toString())) {
			setText('')
		}
		setText((e.target as HTMLInputElement).value.replace(regex, ''))
	}

	return (
		<div className='container'>
			<Input
				type={editing ? 'text' : 'number'}
				value={text}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				preview
				onFocus={() => setEditing(true)}
				onBlur={() => setEditing(false)}
			>
				{preview}
			</Input>
			<div className='button__container'>
				<div className='button__row'>
					<Button variant='operator' handleClick={handleCancel}>
						C
					</Button>
					<Button variant='operator' handleClick={handleClick}>
						÷
					</Button>
				</div>
				<div className='button__row'>
					<Button variant='number' handleClick={handleNumber}>
						7
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						8
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						9
					</Button>
					<Button variant='method' handleClick={handleClick}>
						+
					</Button>
				</div>
				<div className='button__row'>
					<Button variant='number' handleClick={handleNumber}>
						4
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						5
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						6
					</Button>
					<Button variant='method' handleClick={handleClick}>
						-
					</Button>
				</div>
				<div className='button__row'>
					<Button variant='number' handleClick={handleNumber}>
						1
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						2
					</Button>
					<Button variant='number' handleClick={handleNumber}>
						3
					</Button>
					<Button variant='method' handleClick={handleClick}>
						x
					</Button>
				</div>
				<div className='button__row'>
					<Button variant='number' handleClick={handleNumber}>
						0
					</Button>
					<Button variant='method' handleClick={handleClick}>
						=
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Container
