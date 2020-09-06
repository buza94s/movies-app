export default class HelperFunction {
    Cutdescription(desc) {
        if (desc.length <= 170) return desc
        const newDesc = desc.slice(0,169).split(' ');
        newDesc.pop();
        return newDesc.join(' ');
    }
}