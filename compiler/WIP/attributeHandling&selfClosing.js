function advancedHtsToHtml(htsCode) {
    const universalTagPattern = /(\w+)\[([^\]]+)\]\(\)|(\w+)\(\s*"([^"]+)"\s*\)/g;

    function processTags(code) {
        return code.replace(universalTagPattern, (match, tagWithAttrs, attrs, tag, content) => {
            if (tagWithAttrs) {
                const attrsObj = {};
                attrs.split(',').forEach(attr => {
                    const [key, value] = attr.trim().split('=');
                    if (key && value) attrsObj[key] = value.replace(/"/g, '');
                });
                const attrString = Object.keys(attrsObj).map(key => `${key}="${attrsObj[key]}"`).join(' ');
                const isSelfClosing = ['img', 'br', 'hr'].includes(tagWithAttrs);
                return isSelfClosing? `<${tagWithAttrs} ${attrString} />` : `<${tagWithAttrs} ${attrString}>${content || ''}</${tagWithAttrs}>`;
            } else if (tag) {
                return `<${tag}>${content}</${tag}>`;
            }
            return match;
        });
    }

    return processTags(htsCode);
}

// Usage
console.log(advancedHtsToHtml('div("Hello, World!")')); 
console.log(advancedHtsToHtml('img[src="logo.png", alt="Logo Image"]()')); 
console.log(advancedHtsToHtml('a[href="https://example.com", target="_blank"]()')); 
console.log(advancedHtsToHtml('br()')); 
