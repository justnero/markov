export function extractSelectors(element) {
    const selectors = [];

    if (element.id) {
        selectors.push('#' + element.id);
    }
    element.classList
        .forEach(clazz => {
            if (!selectors.includes('.' + clazz)) {
                selectors.push('.' + clazz);
            }
        });

    const nodes = element.getElementsByTagName("*");
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const id = node.id;
        if (id && !selectors.includes('#' + id)) {
            selectors.push('#' + id);
        }

        node.classList
            .forEach(clazz => {
                if (!selectors.includes('.' + clazz)) {
                    selectors.push('.' + clazz);
                }
            });
    }

    return selectors;
}

export function extractCSS(parentElement) {
    const selectors = extractSelectors(parentElement);

    let css = '';
    for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i];

        try {
            if (!styleSheet.cssRules) continue;
        } catch (e) {
            if (e.name !== 'SecurityError') {
                throw e;
            }
            continue;
        }

        const cssRules = styleSheet.cssRules;
        for (let r = 0; r < cssRules.length; r++) {
            if (cssRules[r].selectorText &&
                selectors.some(selector => cssRules[r].selectorText.startsWith(selector))) {
                css += cssRules[r].cssText;
            }
        }
    }

    return css;
}

export function extractSvg(node) {
    node.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    const css = extractCSS(node);
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = css;
    node.insertBefore(styleElement, node.hasChildNodes() ? node.children[0] : null);

    const serializer = new XMLSerializer();
    let svg = serializer.serializeToString(node);
    svg = svg.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svg = svg.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svg;
}

export function svg2image(node, callback) {
    const str = extractSvg(node);
    const width = node.getAttribute('width');
    const height = node.getAttribute('height');

    svgString2image(str, width * 2, height * 2, callback);
}


export function svgString2image(svgString, width, height, callback) {
    const imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.onload = () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(blob => {
            if (callback) {
                callback(blob);
            }
        });
    };

    image.src = imgSrc;
}
