import re

def hts_to_html(hts_code):
    """
    Compile HypertextingScript (HTS) code into HTML.
    
    Parameters:
    - hts_code (str): The HTS code to be compiled.
    
    Returns:
    - str: The compiled HTML code.
    """
    
    # Universal pattern to match all tag-like structures
    universal_tag_pattern = re.compile(r"(\w+)\(\s*\"([^\"]+)\"\s*\)|(\w+)\[([^\]]+)\]\(\)")
    
    # Replace function to handle dynamic tag generation
    def replace_match(match):
        tag1, content1, tag2, attributes = match.groups()
        
        if tag1:
            # Matches patterns like tag("content")
            return f"<{tag1}>{content1}</{tag1}>"
        elif tag2:
            # Matches patterns like tag[attributes]()
            attribute_parts = attributes.split('=')
            if len(attribute_parts) == 2:
                attribute_name, attribute_value = attribute_parts
                return f"<{tag2} {attribute_name}=\"{attribute_value}\">{attribute_value}</{tag2}>"
            else:
                print(f"Warning: Invalid attribute syntax: {attributes}")
                return match.group(0)  # Leave unprocessed if the attribute syntax is incorrect
        return match.group(0)  # Return the original match for any unexpected cases
    
    # Apply the replacement to the HTS code
    html_output = universal_tag_pattern.sub(replace_match, hts_code)
    
    return html_output
