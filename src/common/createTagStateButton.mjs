
//
import { createElement } from '../../utilities/createElement.mjs';

//build a tag button with a tick/indeterminate/cross icon, css shows the icon that matches data-state (on, mixed or off)
export function createTagStateButton(tag, state, className) {
    return createElement('button', { 'type': 'button', 'class': className, 'data-action': 'toggle-tag', 'data-tag': tag, 'data-state': state }, [
        ['span', { 'class': 'state-icon on' },    [['i', { 'class': 'fa-solid fa-check' }]]],
        ['span', { 'class': 'state-icon mixed' }, [['i', { 'class': 'fa-solid fa-minus' }]]],
        ['span', { 'class': 'state-icon off' },   [['i', { 'class': 'fa-solid fa-xmark' }]]],
        ['span', { 'class': 'tag-name' }, tag]
    ]);
}
