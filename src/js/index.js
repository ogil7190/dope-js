import {Tags} from './tags/collection';
const onLoadHandler = () => {
    let mainNode = document.querySelectorAll('body')[0];
    render(mainNode);
};

function render(node, nodeRef = ''){
    if(Tags[node.nodeName]){
        let ref = nodeRef.slice(0, -1);
        let rendering = renderTag(ref, node);
        if(rendering){
            node.innerHTML = rendering;
            nodeRef += `${node.nodeName}.`
            if(node.childElementCount > 0){
                for(let i=0; i<node.childElementCount; i++){
                    render(node.children[i], nodeRef);
                }
            }
        } else {
            node.innerHTML = '';
        }
    } else {
        nodeRef += `${node.nodeName}.`
        for(let i=0; i<node.childElementCount; i++){
            render(node.children[i], nodeRef);
        }
    }
}

function renderTag(nodeRef, node){
    let tag = Tags[node.nodeName];
    if(tag){
        return tag(node, nodeRef, (err, res)=>{
            if(err){
                console.log('Error', err);
            }
        });
    }
    return false;
}

document.addEventListener( 'DOMContentLoaded', onLoadHandler, false );