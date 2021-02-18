import {vars} from './vars';
import {assign, parseValue} from './utils';

export function variableTag(node, nodeRef, callback){
    try{
        let nameAttr = node.attributes.name;
        let valueAttr = node.attributes.value;
        let typeAttr = node.attributes.type;
        if(nameAttr && valueAttr){
            let name = nameAttr.value.trim();
            let value;
            if(typeAttr){
                value = parseValue(valueAttr.value, typeAttr.value);
            } else {
                value = valueAttr.value;
            }
            assign(vars, `${nodeRef}.${name}` , value);
            console.log(vars);
            callback(null,true); 
        } else {
            throw 'Must have name & value attributes';
        }
    } catch(e){
        callback(e, null);
    }
    return false;
}