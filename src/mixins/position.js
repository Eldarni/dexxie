
//
import { css } from 'styled-components';

//
const position = ({ position, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`

    //
    position: ${position};
    
    //
    ${inset !== undefined && `inset: ${inset};`}

    //
    ${insetBlockStart  !== undefined && `inset-block-start: ${insetBlockStart};`};
    ${insetInlineStart !== undefined && `inset-inline-start: ${insetInlineStart};`};
    ${insetBlockEnd    !== undefined && `inset-block-end: ${insetBlockEnd};`};
    ${insetInlineEnd   !== undefined && `inset-inline-end: ${insetInlineEnd};`};

`;


const relative = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`
    ${position({ position : 'relative', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`;

const absolute = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`
    ${position({ position : 'absolute', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`;

const fixed = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`
    ${position({ position : 'fixed', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`;

const sticky = ({ inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`
    ${position({ position : 'sticky', inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
`;

//
export default { position, relative, absolute, fixed, sticky };