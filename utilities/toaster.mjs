
//
const toaster = document.querySelector('.toaster');

//
let lastAnimationFrame = null;

//
export function toast(message, style = 'default', duration = 3000) {

    //
    const toast = document.createElement('div');

    //
    toast.className = `toast ${style}`;

    //
    toast.textContent = message;

    //
    if (duration >= 0) {
        toast.dataset.duration  = duration;
        toast.dataset.remaining = duration;
    }

    //
    const button = document.createElement('button');

    //
    button.type = 'button';
    button.className = 'close';
    button.textContent = '×';

    //
    button.addEventListener('click', () => {
        toast.remove();
    });

    //
    toast.appendChild(button);

    //
    toaster.append(toast);

    //
    if (toaster.children.length == 1) {
        requestAnimationFrame(update);
    }

}

//
function update(timestamp) {

    //
    const deltaTime = ((lastAnimationFrame !== null) ? timestamp - lastAnimationFrame : 0);

    //
    lastAnimationFrame = timestamp;

    // If the user is hovering over the toaster, then skip
    if (toaster.matches(':hover')) {

        //
        lastAnimationFrame = null;

        //
        requestAnimationFrame(update);
        return;

    }

    // For each toast, update remaining time, remove if expired, and update --progress
    toaster.querySelectorAll('.toast[data-duration]').forEach((toast) => {

        //
        const duration  = parseFloat(toast.dataset.duration);
        const remaining = toast.dataset.remaining = parseFloat(toast.dataset.remaining) - deltaTime;

        //
        if (remaining <= 0) {
            toast.remove();
            return;
        }

        //
        const percent = Math.min(Math.max((duration - remaining) / duration, 0), 1);
        toast.style.setProperty('--progress', `${(1 - percent) * 100}%`);

    });

    //
    let toasts = toaster.querySelectorAll('.toast').length;
    toaster.querySelectorAll('.toast').forEach((toast) => {
        toast.style.setProperty('--toasts-before', --toasts);
    });

    //
    if (toaster.children.length >= 1) {
        requestAnimationFrame(update);
        return;
    }

    //
    lastAnimationFrame = null;

}