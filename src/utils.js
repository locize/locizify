export function isWindow(obj) {
  return obj != null && obj === obj.window;
}

export function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

export function offset(elem) {
  var docElem, win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

  docElem = doc.documentElement;

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }
  win = getWindow(doc);
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
};

export function getClickedElement(e) {
  let el, toHigh, toLeft, toLeftNextOffset;

  if (e.originalEvent && e.originalEvent.explicitOriginalTarget) {
    el = e.originalEvent.explicitOriginalTarget;
  } else {
    let parent = e.srcElement;
    let left = e.pageX;
    let top = e.pageY;
    let pOffset = offset(parent);
    console.warn(top, left, pOffset)
    for (let i = 0; i < parent.childNodes.length; i++) {
      let n = parent.childNodes[i];
      //if (n.nodeType === 1) {
        let nOffset = offset(n);
        console.warn(nOffset, n, n.clientHeight)
        // if (nOffset.top > pOffset.top) {console.warn('to high')
        //   if (nOffset.top > top) {
        //     toHigh = parent.childNodes[i - 1];
        //   }
        // } else if (nOffset.top + (n.clientHeight || 0) >= pOffset.top) {console.warn('next row')
          if (toLeft &&
            ((nOffset.top > top) || // is below
            (toLeftNextOffset.top > nOffset.top && toLeftNextOffset.left > nOffset.left)) // the below element is a textnode with top 0 and is more left
          ) {console.warn('del to left', nOffset.top < top, toLeftNextOffset.top > nOffset.top && toLeftNextOffset.left > nOffset.left)
            toLeft = null; // allow next row if not below click
            toLeftNextOffset = null;
          }
          if (!toLeft && nOffset.left > left) {
            toLeft = parent.childNodes[i - 1];
            toLeftNextOffset = nOffset;
          }
        // }
      //}
      if (toHigh && toLeft) {
        break;
      }
      el = n;
    }
  }
  return toLeft || toHigh || el;
}
