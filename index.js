'use strict';
var toMask = require('json-mask');
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

module.exports = async (object, attributes, options={}) => {
  const objectJson = object.toJSON ? object.toJSON(): object;
  await Promise.all(attributes.map(async (attr) => {
    if (Reflect.has(object, attr) && typeof object[attr] == 'function') {
      objectJson[attr] = await object[attr](options)
    } else if(!Reflect.has(object, attr)) {
      console.log(object.toString() + ' missing attr: ' + attr);
    }
    
    if (options.serializers && options.serializers[attr]) {
      objectJson[attr] = await options.serializers[attr](object[attr], options);
    }
  }));
  return await toMask(objectJson, attributes.join(','));
}