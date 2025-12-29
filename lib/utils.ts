import { type ClassValue, clsx } from 'clsx'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cnFrom(cnObj: object) {
  return classNames(cnObj)
}
