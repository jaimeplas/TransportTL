<template>
    <div>
      <div style="display: flex; aling-items: center; justify-content: space-between">
        <div id="locationField">
<h3>Obtener Coordenadas a partir de una dirección</h3>
 <div id="mapa" style="width: 450px; height: 30px;"></div>
 <div><p id="coordenadas"></p></div>
 <input type="text" id="search"> <button @click="getCoords">Buscar Dirección</button>
        </div>
         <div>
          <h1>You Coordinates:</h1>
          <p>{{mycoordinates.lat}} Latitude, {{mycoordinates.lng}} Longitude</p>
        </div>
        <div>
          <h1>Map Coordinates:</h1>
          <p>{{mapcoordinates.lat}} Latitude, {{mapcoordinates.lng}} Longitude</p>
          <p>{{zoom}} zoom</p>
        </div>
      </div>
        <div>
          <h2>Search and add a pin</h2>
          <label>
            <gmap-autocomplete
              @place_changed="setPlace">
            </gmap-autocomplete>
            <button @click="addMarker">Add</button>
          </label>
          <br/>
        </div>
        <br>
        <h3>MAPA</h3>
        <GmapMap
          :center="mycoordinates"
          :zoom="zoom"
          style="width: 500px; height: 300px; margin 32px auto;"
          ref="mapRef"
          @dragend="handleDrag"
        >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></GmapMarker>
        </GmapMap>
    </div>
</template>

<script type="text/javascript" src="https://maps.google.com/maps/api/js"></script>
<script>
// import About from '../../views/About.vue'
export default {
  // components: { About },
  data () {
    return {
      map: null,
      zoom: 7,
      markers: [],
      places: [],
      currentPlace: null,
      mycoordinates: { lat: 0, lng: 0 },
      newAddress: Array
    }
  },
  created () {
    // get User's Coordinates from Browser Request:
    this.$getLocation({})
      .then(coordinates => {
        this.mycoordinates = coordinates
      })
      .catch(error => alert(error))

    // does the user have a sabed center? use it instaed of the default
    if (localStorage.center) {
      this.mycoordinates = JSON.parse(localStorage.center)
    }
    // does the user have a sabed zoom? use it instaed of the default
    if (localStorage.zoom) {
      this.zoom = JSON.parse(localStorage.zoom)
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then(map => this.map = map)
  },
  computed: {
    mapcoordinates () {
      if (!this.map) {
        return {
          lat: 45.508,
          lng: -73.587
        }
      }
      return {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      }
    }
  },
  methods: {
    getCoords: function (){
      var geocoder = new google.maps.Geocoder()
      var address = document.getElementById('search').value;
      if(address!=''){
        alert(address)
        // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
        geocoder.geocode({ 'address': address}, function(results, status)
        {
          if (status == 'OK')
          {
            // Mostramos las coordenadas obtenidas en el p con id coordenadas
            document.getElementById("coordenadas").innerHTML='Coordenadas:   '+results[0].geometry.location.lat()+', '+results[0].geometry.location.lng();
            // Posicionamos el marcador en las coordenadas obtenidas
            mapa.marker.setPosition(results[0].geometry.location);
            // Centramos el mapa en las coordenadas obtenidas
            mapa.map.setCenter(mapa.marker.getPosition());
            agendaForm.showMapaEventForm();
          }
        });
      }
    },
    GetLocation: function () {
      const options = ''
      this.$getLocation(options)
        .then(coordinates => {
          this.mycoordinates = coordinates
          alert('DIR:' + coordinates)
        })
    },
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      alert(JSON.stringify(this.currentPlace))
      if (this.currentPlace) {
        this.ShowMarker(this.currentPlace)
      /*
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        alert(JSON.stringify(marker))
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      */
      }
    },
    ShowMarker (CurrentPlace) {
      if (CurrentPlace) {
        alert(JSON.stringify(CurrentPlace))
        const marker = {
          lat: CurrentPlace.geometry.location.lat(),
          lng: CurrentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(CurrentPlace)
        this.center = marker
        alert(JSON.stringify(CurrentPlace))
        alert(JSON.stringify(marker))
        CurrentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    handleDrag: function () {
      // Get center and zoom lavel, store in localstorage
      const center = {
        lat: this.getCenter().lat(),
        lng: this.getCenter().lng()
      }
      const zoom = this.map.getZoom()

      localStorage.center = JSON.stringify(center)
      localStorage.zoom = zoom
    },
    updateCoordinates (newAddress) {
      this.newAddress = {
        lat: newAddress.latLng.lat(),
        lng: newAddress.latLng.lng()
      }
      this.place = {
        lat: newAddress.geometry.location.latLng.lat(),
        lng: newAddress.geometry.location.latLng.lng()
      }
      var latitude = newAddress.latLng.lat()
      var longitude = newAddress.latLng.lng()
      console.log(latitude, longitude)
      console.log(this.place)
    }
  }
}

</script>
