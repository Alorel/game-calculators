(function (location) {
  if (location.protocol === 'http:' && location.hostname !== 'localhost') {
    location.href = [
      'https://',
      location.host,
      location.pathname,
      location.search,
      location.hash
    ].join('');
  }
})(location);