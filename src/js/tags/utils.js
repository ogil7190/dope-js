/*
    @param value to be parse
    @param type to parsed into
    @return updated value 
    @default all variables are String
*/
export function parseValue(value, type){
    type = type.toLowerCase();
    switch(type){
        case 'number':
            value = Number(value);
            break;
        case 'array':
        case 'object':
            value = JSON.parse(value);
            break;
        default :
            break;
    }
    return value;
};

/*
    @object object where to Store
    @prop name of the variable
    @value value of the variable
    @void puts the value in right scope
    @thanks https://stackoverflow.com/questions/13719593/how-to-set-object-property-of-object-property-of-given-its-string-name-in-ja?noredirect=1&lq=1
*/
export function assign(obj, prop, value) {
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else
        obj[prop[0]] = value;
};

/*
    @object object where to look for
    @prop name of the variable
    @return object finds the value in right scope
*/
export function fetch(obj, prop, flag = true) {
    // console.log(obj, prop);
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        if(flag){
            var e = prop.shift();
            let val = fetch(obj[e], prop, true);
            if(val !== undefined){
                return val;
            } else {
                return fetch(obj, prop[0], false);
            }
        }
    } else
        return obj[prop[0]];
};