javascript: (function () {
  const getTextContent = (selector, parent = document) => {
    const element = parent.querySelector(selector);
    return element ? element.innerText.trim() : '';
  };

  const getPrice = () => {
    const selectors = [
      '#tmm-grid-swatch-HARDCOVER .slot-price',
      '#tmm-grid-swatch-PAPERBACK .slot-price',
      '#tmm-grid-swatch-OTHER .slot-price',
      '#corePriceDisplay_desktop_feature_div .a-price-whole',
      '#corePrice_desktop .a-price > .a-offscreen',
    ];
    for (const selector of selectors) {
      const price = getTextContent(selector);
      if (price) return price;
    }
    return '';
  };

  const getAuthors = (withHash = false) => {
    return Array.from(document.querySelectorAll('#bylineInfo > span > a'))
      .map(author => withHash ? `#${author.innerText.replace(/\s+/g, '')}` : author.innerText.trim())
      .join(withHash ? ' ' : ' / ');
  };

  const getProductOverview = () => {
    return Array.from(document.querySelectorAll('#productOverview_feature_div tr'))
      .map(row => {
        const header = row.querySelector('td.a-span3')?.innerText.trim() || '';
        const value = row.querySelector('td.a-span9')?.innerText.trim() || '';
        if (header && value) {
          return `${header}：${value}`;
        }
      })
      .join('\n');
  };

  const output = [
    // `URL：${window.location.href}`,
    `「${getTextContent('#productTitle')}」`,
    `Amazon価格：${getPrice()}`,
    `${getAuthors()}\n`,
    `${getProductOverview()}\n`,
    `${getTextContent('#drengr_desktopTabbedDescriptionOverviewContent_feature_div')}\n`,
    `${getTextContent('#drengr_DesktopTabbedDescriptionOverviewContent_feature_div')}\n`,
    `${getTextContent('#bookDescription_feature_div')}\n`,
    `${getTextContent('#feature-bullets ul')}\n`,
    `${getAuthors(true)}\n`,
  ].filter(line => line).join('\n').replace(/\n{2,}/g, '\n\n');

  navigator.clipboard.writeText(output).then(() => {
    alert('コピーしました！');
  }).catch(err => {
    console.error('コピーに失敗しました：', err);
  });
})();
