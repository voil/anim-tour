import {
  ObjectInterface,
  ElementInterface,
  SizePropertiesInterface,
  ObjectPropertiesInterface,
  PositionPropertiesInterface,
} from '@/support/interfaces';

/**
* hGetScollPosition
* Function to get global scroll position.
*/
/* eslint-disable import/prefer-default-export */
export function hGetScollPosition(): PositionPropertiesInterface {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

/**
* hScrollTo
* Function to scroll window to element.
* @param destination: ElementInterface
* @param callback: () => void
*/
export function hScrollTo(destination: ElementInterface, callback: () => void): void {
  const easings = {
    linear(t: number): number {
      return t;
    },
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight : destinationOffset - 200,
  );

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / 100));

    const timeFunction = easings.linear(time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
    if (window.pageYOffset === (destinationOffsetToScroll < 0 ? 0 : destinationOffsetToScroll)) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

/**
* Helper to load image.
* @param src: string
* @param size: SizeProperties
*/
export function hLoadImage(src: string, callback: (size: SizePropertiesInterface) => void): void {
  const image = new Image();
  image.onload = () => callback({
    width: image.width,
    height: image.height,
  });
  image.src = src;
}

/**
* hGetElementAbsolutePosition
* Function to get absolute position of element.
* @param element: ElementProperties
* @return ObjectInterface
*/
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function hGetElementAbsolutePosition(element: ElementInterface): ObjectPropertiesInterface {
  const frame = window;

  function getIEVersion() {
    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      const ua = navigator.userAgent;
      const re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }

  function getOperaVersion() {
    let rv = 0;
    if (frame.opera) {
      const sver = frame.opera.version();
      rv = parseFloat(sver);
    }
    return rv;
  }

  function parseBorderWidth(width: string) {
    let res = 0;
    if (typeof width === 'string' && width !== null && width !== '') {
      const p = width.indexOf('px');
      if (p >= 0) {
        res = parseInt(width.substring(0, p), 10);
      } else {
        res = 1;
      }
    }
    return res;
  }

  function kGetBorderWidth(current: ElementInterface) {
    const res = {} as ObjectInterface;
    res.left = 0;
    res.top = 0;
    res.right = 0;
    res.bottom = 0;
    if (window.getComputedStyle) {
      const elStyle = window.getComputedStyle(current, null);
      res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2), 10);
      res.top = parseInt(elStyle.borderTopWidth.slice(0, -2), 10);
      res.right = parseInt(elStyle.borderRightWidth.slice(0, -2), 10);
      res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2), 10);
    } else {
      res.left = parseBorderWidth(current.style.borderLeftWidth);
      res.top = parseBorderWidth(current.style.borderTopWidth);
      res.right = parseBorderWidth(current.style.borderRightWidth);
      res.bottom = parseBorderWidth(current.style.borderBottomWidth);
    }

    return res;
  }

  const userAgent = navigator.userAgent;
  const isIE = navigator.appVersion.match(/MSIE/) != null;
  const IEVersion = getIEVersion();
  const isIENew = isIE && IEVersion >= 8;
  const isIEOld = isIE && !isIENew;

  const isFireFox = userAgent.match(/firefox/i) != null;
  const isFireFoxOld = isFireFox && ((userAgent.match(/firefox\/2./i) != null)
    || (userAgent.match(/firefox\/1./i) != null));
  const isFireFoxNew = isFireFox && !isFireFoxOld;

  const isWebKit = navigator.appVersion.match(/WebKit/) != null;
  const isChrome = navigator.appVersion.match(/Chrome/) != null;
  const isOpera = frame.opera != null;
  const operaVersion = getOperaVersion();
  const isOperaOld = isOpera && (operaVersion < 10);
  const res = {} as ObjectPropertiesInterface;
  let offsetParent: any;

  res.x = 0;
  res.y = 0;
  if (element !== null) {
    if (element.getBoundingClientRect) {
      const viewportElement = document.documentElement;
      const box = element.getBoundingClientRect();
      const scrollLeft = viewportElement.scrollLeft;
      const scrollTop = viewportElement.scrollTop;

      res.x = box.left + scrollLeft;
      res.y = box.top + scrollTop;
    } else {
      res.x = element.offsetLeft;
      res.y = element.offsetTop;

      let parentNode = element.parentNode as ElementInterface;
      let borderWidth = null;

      while (offsetParent != null) {
        res.x += offsetParent.offsetLeft;
        res.y += offsetParent.offsetTop;

        const parentTagName = offsetParent.tagName.toLowerCase();

        if ((isIEOld && parentTagName !== 'table') || ((isFireFoxNew || isChrome) && parentTagName === 'td')) {
          borderWidth = kGetBorderWidth(offsetParent);
          res.x += borderWidth.left;
          res.y += borderWidth.top;
        }

        if (offsetParent !== document.body && offsetParent !== document.documentElement) {
          res.x -= offsetParent.scrollLeft;
          res.y -= offsetParent.scrollTop;
        }

        if (!isIE && (!isOperaOld || isIENew)) {
          while (offsetParent !== parentNode && parentNode !== null) {
            res.x -= parentNode.scrollLeft;
            res.y -= parentNode.scrollTop;
            if (isFireFoxOld || isWebKit) {
              borderWidth = kGetBorderWidth(parentNode);
              res.x += borderWidth.left;
              res.y += borderWidth.top;
            }
            parentNode = parentNode.parentNode as ElementInterface;
          }
        }

        parentNode = offsetParent.parentNode;
        offsetParent = offsetParent.offsetParent;
      }
    }
  }

  return res;
}
