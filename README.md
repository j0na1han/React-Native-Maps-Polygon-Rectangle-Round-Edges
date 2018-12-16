# React Native Maps Polygon/Rectangle Round Edges

With this library it is possible to input 4 points of a rectangle and get back all points you need for a rectangle with round edges.

### Installing

```
npm i react-native-polygon-round-edge
```

### Use

Import:

```
import roundPolygon from "react-native-polygon-round-edges";
```


There are two functions: 
``` smoothPointsXY
roundPolygon.smoothPointsLatLong(...)
roundPolygon.smoothLatLong(...)
```
which returns an `Array<LatLng>` or an`Array<XY>`. These arrays outline the points of the rectangle with round edges.

**Arguments:**

**Important:** The order of the points is essential. Start with the lower left corner and continue clockwise.


| Argument     | Type    | Note |
| --------|---------|-------|
| points  | `Array<LatLng>` or `Array<XY>`   | 4 points of the rectangle  |
| numberOfPointsBetween | Positive Number | how many points are on the circle orbit(How round is the circle)    |
|radius|Positive Number| |

**Types:**
```
type LatLng {
  latitude: Number,
  longitude: Number,
}

type XY {
  x: Number,
  y: Number,
}
```

### Authors

* **Jonathan Zimmermann** - *Initial work*