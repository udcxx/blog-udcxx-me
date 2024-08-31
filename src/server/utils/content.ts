export const generateContentFromAst = (children): string => {
    let text = '';

    for (const node of children) {
        let startTag = ''
        let endTag = ''

        if (node.type === 'element' && node?.tag) {
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'blockquate', 'em', 'strong', 'del', 'pre', 'code'].includes(node.tag)) {
                // <p>テキスト</p> のようにテキストの前後にタグがついてるもの
                startTag = `<${node.tag}>`
                endTag = `</${node.tag}>`
            } else if (['hr', 'br'].includes(node.tag)) {
                // <hr /> のようにタグ単体で完結するもの
                text += `<${node.tag} />`
            } else if (['a'].includes(node.tag)) {
                // リンク
                const href = (node?.props?.href as string) || ''
                startTag = `<${node.tag} href="${href}">`
                endTag = `</${node.tag}>`
            } else if (['img'].includes(node.tag)) {
                // 画像
                const src = (node?.props?.src as string) || ''
                const alt = (node?.props?.alt as string) || ''
                text += `<${node.tag} src="${src}" alt="${alt}" />`
            }
        }

        if (node.type === 'text') {
            text += `${(node?.value || '').trim()}`
        }

        if (node?.children) {
            text += `${startTag}${generateContentFromAst(node.children).trim()}${endTag}`
        }
    }

    return text
}