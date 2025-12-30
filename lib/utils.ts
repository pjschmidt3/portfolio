import classNames from 'classnames'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cnFrom(cnObj: object) {
  return classNames(cnObj)
}
