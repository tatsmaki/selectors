const parseHTML = string => {
    return string.replace(/><\/\w+>/g, ' />\n').replace(/ class="stop"/g, '');
}

export default parseHTML;