function enhancedHtsToHtml(htsCode) {
    const nestedTagPattern = /{([^}]*)}/g;
    const universalTagPattern = /(\w+)\(\s*"([^"]+)"\s*\)|(\w+)\[([^\]]+)\]\(\)/g;

    function processTags(code) {
        return code.replace(universalTagPattern, (match, tag1, content1, tag2, attributes) => {
            if (tag1) {
                return `<${tag1}>${processTags(content1)}</${tag1}>`;
            } else if (tag2) {
                const [attributeName, attributeValue] = attributes.split('=');
                if (attributeName && attributeValue) {
                    return `<${tag2} ${attributeName}="${attributeValue}">${attributeValue}</${tag2}>`;
                } else {
                    console.warn(`Invalid attribute syntax: ${attributes}`);
                    return match; 
                }
            }
            return match; 
        });
    }

    return htsCode.replace(nestedTagPattern, (match, nestedCode) => {
        return processTags(nestedCode);
    }).replace(universalTagPattern, (match, tag1, content1, tag2, attributes) => {
        if (tag1) {
            return `<${tag1}>${content1}</${tag1}>`;
        } else if (tag2) {
            const [attributeName, attributeValue] = attributes.split('=');
            if (attributeName && attributeValue) {
                return `<${tag2} ${attributeName}="${attributeValue}">${attributeValue}</${tag2}>`;
            } else {
                console.warn(`Invalid attribute syntax: ${attributes}`);
                return match; 
            }
        }
        return match; 
    });
}

// Usage
console.log(enhancedHtsToHtml('div("Hello, {span(\"World!\")}")')); 
console.log(enhancedHtsToHtml('img[src="logo.png"]()')); 
console.log(enhancedHtsToHtml('a[invalid]()')); 
