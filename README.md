<div align="center">
  <img src="assets/logo.svg" alt="Logo - google map picker" />
</div>
<div align="center">
  <h1>Strapi v4 - google map picker</h1>
  <p>A simple plugin to add a point to the map, with the <a href="https://github.com/JustFly1984/react-google-maps-api">@react-google-maps/api
</a> package</p>
</div>

---

## 🔧 Configuration

```javascript
// config/plugins.js
...
...
...
"google-map-picker": {
    config: {
    apiKey: env("GOOGLE_PUBLIC_KEY"),
    default_center: { lat: 54.106438, lng: 11.556940 },
    favorites_places: [
        {
        title: "Berlin",
        coordinates: { lat: 52.518536, lng: 52.518536 },
        },
        {
        title: "Zurich",
        coordinates: { lat: 47.384168, lng: 8.526831 },
        },
        {
        title: "Oslo",
        coordinates: { lat: 59.911002, lng: 10.756167},
        },
    ],
    },
},
...
...
...
```