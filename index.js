const range = (from, to, step) =>
  Array(~~((to - from) / step) + 1) // '~~' is Alternative for Math.floor()
    .fill()
    .map((v, i) => from + i * step);

const toRadians = angle => {
  return angle * (Math.PI / 180);
};

function getPoints(point1, point2, numberOfPoints, quadrant, key1, key2, r) {
  let steps = 90 / numberOfPoints;

  let cx = 0;
  let cy = 0;

  let angleStart;
  let angleEnd;

  switch (quadrant) {
    case 1:
      cx = point1[0] + r;
      cy = point2[1] + r;
      angleStart = 181;
      angleEnd = 269;
      break;

    case 2:
      cx = point1[0] + r;
      cy = point2[1] - r;
      angleStart = 91;
      angleEnd = 179;
      break;
    case 3:
      cx = point2[0] - r;
      cy = point1[1] - r;
      angleStart = 1;
      angleEnd = 89;
      break;
    case 4:
      cx = point2[0] - r;
      cy = point1[1] + r;
      angleStart = 271;
      angleEnd = 359;
      break;
    default:
      throw new Error("Please choose a quadrant in the range [1 - 4].");
      break;
  }
  let points = [];

  let degrees = range(angleStart, angleEnd, steps);
  for (let degree of degrees) {
    let obj = {};
    obj[key1] = r * Math.cos(toRadians(degree)) + cx;
    obj[key2] = r * Math.sin(toRadians(degree)) + cy;
    points.push(obj);
  }

  points = points.reverse();

  if (quadrant === 2 || quadrant === 3) {
    let obj = {};
    obj[key1] = point2[0];
    obj[key2] = point2[1];
    points.push(obj);

    obj = {};
    obj[key1] = point1[0];
    obj[key2] = point1[1];
    points.unshift(obj);
  } else {
    let obj = {};
    obj[key1] = point2[0];
    obj[key2] = point2[1];
    points.unshift(obj);

    obj = {};
    obj[key1] = point1[0];
    obj[key2] = point1[1];
    points.push(obj);
  }

  return points;
}

function smoothPoints(points, numberOfPointsBetween, key1, key2, r) {
  if (r <= 0) {
    throw new Error("The radius have to be positive");
  }

  let allPoints = [];
  for (const [index, point] of points.entries()) {
    if (!point.hasOwnProperty(key1)) {
      throw new Error("The input points has the wrong keys.");
    }

    let point1;
    let point2;
    switch (index) {
      case 0:
        point1 = [point[key1], point[key2] + r];
        point2 = [point[key1] + r, point[key2]];
        getPoints(point1, point2, numberOfPointsBetween, 1, key1, key2, r).map(
          p => allPoints.push(p)
        );
        break;
      case 1:
        point1 = [point[key1], point[key2] - r];
        point2 = [point[key1] + r, point[key2]];
        getPoints(point1, point2, numberOfPointsBetween, 2, key1, key2, r).map(
          p => allPoints.push(p)
        );
        break;
      case 2:
        point1 = [point[key1] - r, point[key2]];
        point2 = [point[key1], point[key2] - r];
        getPoints(point1, point2, numberOfPointsBetween, 3, key1, key2, r).map(
          p => allPoints.push(p)
        );
        break;
      case 3:
        point1 = [point[key1] - r, point[key2]];
        point2 = [point[key1], point[key2] + r];
        getPoints(point1, point2, numberOfPointsBetween, 4, key1, key2, r).map(
          p => allPoints.push(p)
        );
        break;
      default:
        throw new Error("To many points.");
        break;
    }
  }
  return allPoints;
}

exports.smoothPointsXY = (points, numberOfPointsBetween, r) => {
  return smoothPoints(points, numberOfPointsBetween, "x", "y", r);
};

exports.smoothPointsLatLong = (points, numberOfPointsBetween, r) => {
  return smoothPoints(
    points,
    numberOfPointsBetween,
    "longitude",
    "latitude",
    r
  );
};

//smoothPointsLatLong([{"latitude":37.33155296875,"longitude":-122.03200293945312},{"latitude":37.33290625976562,"longitude":-122.03200293945312},{"latitude":37.33290625976562,"longitude":-122.0306496484375},{"latitude":37.33155296875,"longitude":-122.0306496484375}],2, 0.000021)
