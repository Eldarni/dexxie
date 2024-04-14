

//
import { css } from 'styled-components'

//
export const pseudo = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { display?: string, position?: string, content?: string, inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`

    //
    display: ${display || 'block'};

    //
    position: ${position || 'absolute'};

    //
    content: ${((content  !== undefined) ? `'${content}'` : `''`)};

    //
    ${inset !== undefined && `inset: ${inset};`}

    //
    ${insetBlockStart  !== undefined && `inset-block-start: ${insetBlockStart};`}
    ${insetInlineStart !== undefined && `inset-inline-start: ${insetInlineStart};`}
    ${insetBlockEnd    !== undefined && `inset-block-end: ${insetBlockEnd};`}
    ${insetInlineEnd   !== undefined && `inset-inline-end: ${insetInlineEnd};`}

`

export const before = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { display?: string, position?: string, content?: string, inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }, contents) => css`
    &::before {
        ${pseudo({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
        ${typeof contents == 'function' && contents()}
    }
`

export const after = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { display?: string, position?: string, content?: string, inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }, contents) => css`
    &::after {
        ${pseudo({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
        ${typeof contents == 'function' && contents()}
    }
`
