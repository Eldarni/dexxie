
//
import { css } from 'styled-components'

//
export const position = ({ position, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { position?: string, inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`

    //
    position: ${position};

    //
    ${inset !== undefined && `inset: ${inset};`}

    //
    ${insetBlockStart  !== undefined && `inset-block-start: ${insetBlockStart};`}
    ${insetInlineStart !== undefined && `inset-inline-start: ${insetInlineStart};`}
    ${insetBlockEnd    !== undefined && `inset-block-end: ${insetBlockEnd};`}
    ${insetInlineEnd   !== undefined && `inset-inline-end: ${insetInlineEnd};`}

`


export const relative = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`
    ${position({ 'position' : 'relative', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`

export const absolute = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`
    ${position({ 'position' : 'absolute', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`

export const fixed = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`
    ${position({ 'position' : 'fixed', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`

export const sticky = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }: { inset?: string, insetBlockStart?: string, insetInlineStart?: string, insetBlockEnd?: string, insetInlineEnd?: string }) => css`
    ${position({ 'position' : 'sticky', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`