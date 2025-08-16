//
import { addEventListener } from '../utilities/addEventListener.mjs';

//
export async function showPopup(title, callback) {

    //
    const existingPopup = document.querySelector('.popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    //
    const popup = document.createRange().createContextualFragment(`
        <div class="popup-overlay">
            <div class="popup-content" role="dialog" aria-labelledby="popup-title" aria-labelledby="popup-title">
                <div class="popup-header">
                    <h2 id="popup-title"></h2>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-body"></div>
            </div>
        </div>
    `);

    //
    if (title !== undefined && typeof title === 'string') {
        popup.querySelector('.popup-header h2').textContent = title;
    }

    //
    if (typeof callback === 'function') {
        await callback(popup.querySelector('.popup-body'));
    }

    //
    popup.querySelector('button.popup-close').addEventListener('click', hidePopup);

    //
    const mainContainer = document.querySelector('main');
    mainContainer.appendChild(popup);
    
    //dismiss popup when clicking outside of the popup
    addEventListener({ on: '.popup-overlay', event: 'click', callback: (event) => {
        if (event.target.closest('.popup-content') === null) {
            hidePopup();
        }
    }});     

    //get the drawer to animate in (done on next frame as the animation skips frames for some reason)
    setTimeout(() => {
        document.querySelector('.popup-content').setAttribute('data-show', 'true');
    }, 1);
    
}

//
export function hidePopup() {

    //
    const popup = document.querySelector('.popup-overlay');

    //
    if (!popup) {
        return;
    }

    //
    popup.querySelector('.popup-content').setAttribute('data-hide', 'true');
        
    //
    popup.addEventListener('animationend', (event) => { 
        popup.remove();
    });

}
