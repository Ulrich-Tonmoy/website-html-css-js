const sqDistance = (c1, c2) => {
  return (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2;
};

const colorMatch = (c1, c2, threshold = 160) => {
  return sqDistance(c1, c2) < threshold * threshold;
};

const getLocationsWithColor = (imgData, color) => {
  const locs = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    const pColor = {
      r: imgData.data[i],
      g: imgData.data[i + 1],
      b: imgData.data[i + 2],
    };
    const pIndex = i / 4;
    const loc = {
      x: pIndex % imgData.width,
      y: Math.floor(pIndex / imgData.width),
    };

    if (colorMatch(pColor, color)) {
      locs.push(loc);
    }
  }
  return locs;
};

const average = (locs) => {
  const res = { x: 0, y: 0 };
  locs.forEach((loc) => {
    res.x += loc.x;
    res.y += loc.y;
  });
  res.x /= locs.length;
  res.y /= locs.length;
  return res;
};

const lerp = (a, b, t) => {
  return a + (b - a) * t;
};

const hextorgb = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  return { r, g, b };
};
