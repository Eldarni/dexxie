

//
import { css } from 'styled-components';

//
export const pseudo = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }) => css`

    //
    display: ${display || 'block'};

    //
    position: ${position || 'absolute'};

    //
    content: ${position || '\'\''};

    //
    ${inset !== undefined && `inset: ${inset};`}

    //
    ${insetBlockStart  !== undefined && `inset-block-start: ${insetBlockStart};`};
    ${insetInlineStart !== undefined && `inset-inline-start: ${insetInlineStart};`};
    ${insetBlockEnd    !== undefined && `inset-block-end: ${insetBlockEnd};`};
    ${insetInlineEnd   !== undefined && `inset-inline-end: ${insetInlineEnd};`};

`;

export const before = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }, contents) => css`
    &::before {
        ${pseudo({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
        ${typeof contents == 'function' && contents()}
    }
`;

export const after = ({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd }, contents) => css`
    &::after {
        ${pseudo({ display, position, content, inset, insetBlockStart, insetInlineStart, insetBlockEnd, insetInlineEnd })}
        ${typeof contents == 'function' && contents()}
    }
`;

//
export default { pseudo, before, after };
