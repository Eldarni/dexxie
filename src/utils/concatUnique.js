
/**
 * 
 * @param {*} array1 
 * @param {*} array2 
 */
export default (array1, array2) => {
    return array1.concat(array2.filter((item) => array1.indexOf(item) < 0))
};