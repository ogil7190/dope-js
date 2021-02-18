import {vars} from './vars';
import {fetch, parseValue} from './utils';

export function ifTag(node, nodeRef, callback){
    try{
        let variableAttr = node.attributes.variable;
        let leftVariableAttr = node.attributes['left-variable'];
        let rightVariableAttr = node.attributes['right-variable'];
        let valueAttr = node.attributes.value;
        let conditionAttr = node.attributes.condition;
        let typeAttr = node.attributes.type;
        if(variableAttr && valueAttr){
            let condition;
            if(conditionAttr){
                condition = conditionAttr.value.trim().toLowerCase();
            } else {
                condition = 'e';
            }
            let variable = variableAttr.value.trim();
            let value;
            if(typeAttr){
                value = parseValue(valueAttr.value, typeAttr.value);
            } else {
                value = valueAttr.value;
            }
            let ref = nodeRef + `.${variable}`;
            let value2 = fetch(vars, ref);
            if(applyCondition(condition, value, value2)){
                return node.innerHTML;
            }
        } 
        else if(leftVariableAttr && rightVariableAttr){
            let condition;
            if(conditionAttr){
                condition = conditionAttr.value.trim().toLowerCase();
            } else {
                condition = 'e';
            }
            let leftVariable = leftVariableAttr.value.trim();
            let rightVariable = rightVariableAttr.value.trim();
            let ref1 = nodeRef + `.${leftVariable}`;
            let value1 = fetch(vars, ref1);
            let ref2 = nodeRef + `.${rightVariable}`;
            let value2 = fetch(vars, ref2);
            if(applyCondition(condition, value1, value2)){
                return node.innerHTML;
            }
        }
        else {
            throw 'Must have variable & value attributes';
        }
    } catch(e){
        callback(e, null);
    }
    return false;
}

function applyCondition(condition, value1, value2){
    switch(condition){
        case 'e' :
            return value1 === value2;
        case 'l' :
            return value1 < value2;
        case 'g' :
            return value1 > value2;
        case 'le' :
            return value1 <= value2;  
        case 'ge' :
            return value1 >= value2;  
        case 'ne' :
            return value1 !== value2;         
    }
    return false;
}