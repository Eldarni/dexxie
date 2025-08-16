  
import { debounceTrailing, debounceLeading } from './debounce.mjs';

/**
 * Wrapper for the addEventListener that replicates the behaviour of jQueries ".on()" method for "deferred events" with built in debounce functionality
 * Returns a couple of methods that can be used to remove the listener and trigger the event
 */
export function addEventListener({ on = 'body', event = 'click', target, callback, debounce, debounceStrategy = 'leading', capture = false, stopPropagation = false }) {

    //resolve the parent element (as this might be a selector
    const actualParentElement = ((typeof on === 'string' ) ? document.querySelector(on) : on);
    if (actualParentElement === null) {
        throw new Error(`Unable to find an element that matches selector "${on}".`);
    }

    //if it's a click event, and no user defined debounce time is set, assume a default of 200ms to guard against double-clicks
    if (debounce === undefined && event === 'click') {
        debounce = 200;
    }

    //add the debounce to the callback
    callback = ((debounce !== undefined) ? (debounceStrategy === 'trailing' ? debounceTrailing(debounce, callback) : debounceLeading(debounce, callback)) : callback);

    //if no target is provided, use the parent element as the target
    if (target === undefined) {
        target = actualParentElement;
    }

    //
    const eventHandler = (originalEvent) => {

        //
        let eventTarget = originalEvent.target;

        //move up the dom tree to check if the target or any of its parents match the selector (replicating the way jquery .on() works)
        while (eventTarget) {
            if (target === undefined || ((typeof target === 'string') ? eventTarget.matches(target) : eventTarget === target)) {
                if (stopPropagation) {
                    originalEvent.stopPropagation();
                }
                return callback.call(eventTarget, originalEvent);
            }
            eventTarget = eventTarget.parentElement;
        }

    };

    //
    actualParentElement?.addEventListener(event, eventHandler, capture);

    //
    return {
        'remove' : () => { actualParentElement?.removeEventListener(event, eventHandler, capture); },
        'trigger' : (event) => { return callback(event); }
    };

}