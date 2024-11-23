function htsToHtml(htsCode) {
    // Universal pattern to match all tag-like structures
    const universalTagPattern = /(\w+)\(\s*"([^"]+)"\s*\)|(\w+)\[([^\]]+)\]\(\)/g;

    // Replace function to handle dynamic tag generation
    const htmlOutput = htsCode.replace(universalTagPattern, (match, tag1, content1, tag2, attributes) => {
        if (tag1) {
            // Matches patterns like tag("content")
            return `<${tag1}>${content1}</${tag1}>`;
        } else if (tag2) {
            // Matches patterns like tag[attributes]()
            const [attributeName, attributeValue] = attributes.split('=');
            if (attributeName && attributeValue) {
                return `<${tag2} ${attributeName}="${attributeValue}">${attributeValue}</${tag2}>`; // very messy code ngl
            } else {
                console.warn(`Invalid attribute syntax: ${attributes}`);
                return match; // Leave unprocessed if the attribute syntax is incorrect
            }
        }
        return match; // Return the original match for any unexpected cases
    });

    return htmlOutput;
}
// easter egg: this im putting random comments on this bc i dont want python to be show as primary language on github :D
