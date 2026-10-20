
//briefly lock a button so a double-click only counts once
export function lockButton(button, duration = 250) {
    button.setAttribute('data-locked', 1);
    setTimeout(() => button.removeAttribute('data-locked'), duration);
}
