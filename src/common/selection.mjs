
//
import { emit } from '../../utilities/events.mjs';

//the ids of the selected pokemon, kept in memory only
const selected = new Set();

//the last card clicked, used as the starting point for shift+click ranges
let anchor = null;

//
export function getSelection() {
    return [...selected];
}

//
export function isSelected(id) {
    return selected.has(id);
}

//
export function toggleSelection(id) {

    //
    if (selected.has(id)) {
        selected.delete(id);
    } else {
        selected.add(id);
    }

    //
    anchor = id;

    //
    emit('selection-changed');

}

//
export function selectOnly(id) {

    //
    selected.clear();
    selected.add(id);

    //
    anchor = id;

    //
    emit('selection-changed');

}

//add everything between the anchor and the given id (in display order) to the selection
export function selectRange(orderedIds, id) {

    //without a visible anchor there is no range, so treat it as a toggle
    const start = orderedIds.indexOf(anchor);
    const end = orderedIds.indexOf(id);
    if (start === -1 || end === -1) {
        toggleSelection(id);
        return;
    }

    //
    orderedIds.slice(Math.min(start, end), Math.max(start, end) + 1).forEach(id => selected.add(id));

    //
    emit('selection-changed');

}

//
export function selectAll(ids) {

    //
    ids.forEach(id => selected.add(id));

    //
    emit('selection-changed');

}

//
export function clearSelection() {

    //
    selected.clear();
    anchor = null;

    //
    emit('selection-changed');

}
