import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Spinner } from '@/components/ui/spinner'
import { ReactNode } from 'react'

export interface LoadingIndicatorProps {
  message?: string | ReactNode
  content?: string | ReactNode
}

export function LoadingIndicator({ message, content }: LoadingIndicatorProps) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {message || 'Processing...'}
          </ItemTitle>
        </ItemContent>
        {content && (
          <ItemContent className="flex-none justify-end">{content}</ItemContent>
        )}
      </Item>
    </div>
  )
}
