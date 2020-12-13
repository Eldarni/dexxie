
/**
 * 
 * @param {*} array1 
 * @param {*} array2 
 */
export const toggleTag = (tags, tag) => {
    const index = tags.indexOf(tag);
    if (index !== -1) {
        tags.splice(index, 1);
    } else {
        tags.push(tag);
    }
};