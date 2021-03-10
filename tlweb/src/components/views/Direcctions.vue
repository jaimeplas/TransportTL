<template>
  <v-data-table
    :headers="headers"
    :items="Direcciones"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      {{"country: " + country[0].label}}
      {{"Info: " + info}}
      <country-select v-model="country" :country="country" topCountry="" :countryName="true" />
      {{"region: "}}
      <region-select v-model="region" :country="country" :region="region" :countryName="true" :regionName="true" />
        <Map/>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Direcciones (Listado de Direcciones)</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva Direccion
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Dir_FullName"
                      label="Nombre Direccion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Guia"
                      label="Guia"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.OrdenNo"
                      label="No. Orden"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ProdQty"
                      label="Cantidad de Productos"
                    ></v-text-field>
                  </v-col>
        <v-divider
          class="mx-4"
          inset
        ></v-divider>
        </v-row>
        <v-row>
        <!--
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-combobox
              v-model="selectedItem"
              clearable
              hide-selected
              :items="items"
              item-text="SecctionName"
              item-value="value"
              :return-object="true"
              label="Seccion"
              outlined>
            </v-combobox>
          </v-col>
        -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.Dir"
                      label="Calle"
                      @blur="getCoords"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.NumExt"
                      label="Numero ext"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                    sm="4"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Numint"
                      label="Numero int"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.CP"
                      label="CP"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Pais"
                      label="Pais"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Ciudad"
                      label="Ciudad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Estado"
                      label="Estado"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Dir"
                      label="Direccion"
                      @blur="getCoords"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Lat"
                      label="Lat"
                      id="lat"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Lng"
                      label="Lng"
                      id="lng"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Estas seguro de eliminar este registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script type="text/javascript" src="https://maps.google.com/maps/api/js"></script>
<script>
import CountrySelect from '@/components/layouts/country-select.vue'
import RegionSelect from '@/components/layouts/region-select.vue'
import Map from './map.vue'
import axios from 'axios'
export default {
  components: {
    Map,
    CountrySelect,
    RegionSelect
  },
  data: () => ({
    items: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Direcciones',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Dir_FullName', value: 'Dir_FullName' },
      { text: 'Guia', value: 'Guia' },
      { text: 'OrdenNo', value: 'OrdenNo' },
      { text: 'ProdQty', value: 'ProdQty' },
      { text: 'Lat', value: 'Lat' },
      { text: 'Lng', value: 'Lng' },
      { text: 'Dir', value: 'Dir' },
      { text: 'Checked', value: 'Checked' },
      { text: 'CP', value: 'CP' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    selectedItem: [],
    Direcciones: [],
    editedIndex: -1,
    editedItem: {
      Seccion: '',
      Dir_FullName: '',
      Guia: '',
      OrdenNo: '',
      ProdQty: '',
      Lat: '',
      Lng: '',
      Dir: '',
      Checked: '',
      CP: ''
    },
    defaultItem: {
      Seccion: '',
      Dir_FullName: '',
      Guia: '',
      OrdenNo: '',
      ProdQty: '',
      Lat: '',
      Lng: '',
      Dir: '',
      Checked: '',
      CP: ''
    },
    country: [{}],
    region: 'West Lothian (Linlithgowshire)'
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.Direcciones = [
        {
          Seccion: '0',
          Dir_FullName: 'Full Name0',
          Guia: 'Guia0000',
          OrdenNo: 'OrderNo000',
          ProdQty: '1',
          Lat: '',
          Lng: '',
          Dir: 'Direccion 00',
          Checked: '0',
          CP: '00000'
        },
        {
          Seccion: '1',
          Dir_FullName: 'Full Name1',
          Guia: 'Guia0001',
          OrdenNo: 'OrderNo001',
          ProdQty: '2',
          Lat: '',
          Lng: '',
          Dir: 'Direccion 01',
          Checked: '1',
          CP: '11111'
        }
      ]
      this.LoadSecction()
    },
    editItem (item) {
      this.selectedItem = null
      this.editedIndex = this.Direcciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      for (var i in this.items) {
        if (this.items[i].value.toString() === this.editedItem.Seccion.toString()) {
          this.selectedItem = { SecctionName: this.items[i].SecctionName, value: this.items[i].value }
        }
      }
      this.dialog = true
    },
    deleteItem (item) {
      this.selectedItem = null
      this.editedIndex = this.Direcciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.selectedItem = null
      this.Direcciones.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.selectedItem = null
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.selectedItem = null
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.editedItem.Seccion = this.selectedItem.value
      this.editedItem.Lat = localStorage.getItem("lat")
      this.editedItem.Lng = localStorage.getItem("lng")

      if (this.editedIndex > -1) {
        Object.assign(this.Direcciones[this.editedIndex], this.editedItem)
        this.UpdateDirecctions(this.editedItem)
      } else {
        this.Direcciones.push(this.editedItem)
        this.SaveDirecctions(this.editedItem)
      }
      this.close()
    },
    LoadSecction: function () {
      const apiToken = localStorage.getItem('token')
      const axiosInstance = axios.create({
        method: 'get',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true,
          Authorization: 'Bearer ' + apiToken
        }
      })
      const UrlVar = ''
      axiosInstance
        .get('GetSecction' + UrlVar)
        .then(response => {
          for (var i in response.data) {
            this.items.push({
              SecctionName: response.data[i].Name,
              value: response.data[i].SecctionId
            })
          }
        })
        .catch(e => console.log('ERROR::!!!' + e))
    },
    LoadDirecctions: function () {
      const apiToken = localStorage.getItem('token')
      const axiosInstance = axios.create({
        method: 'get',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true,
          Authorization: 'Bearer ' + apiToken
        }
      })
      const UrlVar = ''
      axiosInstance
        .get('GetDestinationDir' + UrlVar)
        .then(response => {
          for (var i in response.data) {
            this.Direcciones.push({
              Seccion: response.data[i].Seccion,
              Dir_FullName: response.data[i].Dir_FullName,
              Guia: response.data[i].Guia,
              OrdenNo: response.data[i].OrdenNo,
              ProdQty: response.data[i].ProdQty,
              Lat: response.data[i].Lat,
              Lng: response.data[i].Lng,
              Dir: response.data[i].Dir,
              Checked: response.data[i].Checked,
              CP: response.data[i].CP
            })
          }
        })
        .catch(e => console.log('ERROR::!!!' + e))
    },
    SaveDirecctions: function (Direcciones) {
      const apiToken = localStorage.getItem('token')
      const axiosInstance = axios.create({
        method: 'post',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true,
          Authorization: 'Bearer ' + apiToken
        }
      })
      const UrlVar = {
        DestinationDirId: 0,
        SecctionId: Direcciones.Seccion,
        position: Direcciones.position,
        Dir_FullName: Direcciones.Dir_FullName,
        Guia: Direcciones.Guia,
        OrdenNo: Direcciones.OrdenNo,
        ProdQty: Direcciones.ProdQty,
        Lat: Direcciones.Lat,
        Lng: Direcciones.Lng,
        Dir: Direcciones.Dir,
        Checked: 0,
        CP: Direcciones.CP
      }
      alert(JSON.stringify(UrlVar))
      axiosInstance
        .post('SaveDestinationDir', UrlVar)
        .then(response => {
          for (var i in response.data) {
            this.Direcciones.push({
              Seccion: response.data[i].Seccion,
              Dir_FullName: response.data[i].Dir_FullName,
              Guia: response.data[i].Guia,
              OrdenNo: response.data[i].OrdenNo,
              ProdQty: response.data[i].ProdQty,
              Lat: response.data[i].Lat,
              Lng: response.data[i].Lng,
              Dir: response.data[i].Dir,
              Checked: response.data[i].Checked,
              CP: response.data[i].CP
            })
          }
        })
        .catch(e => console.log('ERROR::!!!' + e))
    },
    UpdateDirecctions: function (Direcciones) {
      const apiToken = localStorage.getItem('token')
      const axiosInstance = axios.create({
        method: 'put',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true,
          Authorization: 'Bearer ' + apiToken
        }
      })
      const UrlVar = {
        DestinationDirId: Direcciones.DestinationDirId,
        SecctionId: Direcciones.Seccion,
        position: Direcciones.position,
        Dir_FullName: Direcciones.Dir_FullName,
        Guia: Direcciones.Guia,
        OrdenNo: Direcciones.OrdenNo,
        ProdQty: Direcciones.ProdQty,
        Lat: Direcciones.lat,
        Lng: Direcciones.lng,
        Dir: Direcciones.Dir,
        Checked: 0,
        CP: Direcciones.CP
      }
      alert(JSON.stringify(UrlVar))
      axiosInstance
        .then(response => {
          for (var i in response.data) {
            this.Direcciones.push({
              Seccion: response.data[i].Seccion,
              Dir_FullName: response.data[i].Dir_FullName,
              Guia: response.data[i].Guia,
              OrdenNo: response.data[i].OrdenNo,
              ProdQty: response.data[i].ProdQty,
              Lat: response.data[i].Lat,
              Lng: response.data[i].Lng,
              Dir: response.data[i].Dir,
              Checked: response.data[i].Checked,
              CP: response.data[i].CP
            })
          }
        })
      .catch(e => console.log('ERROR::!!!' + e))
    },
    getCoords: function () {
      var geocoder = new google.maps.Geocoder ()
      var address = this.editedItem.Dir // document.getElementById('search').value
      if(address!=''){
        // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
        geocoder.geocode({ 'address': address}, function(results, status)
        {
          if (status == 'OK')
          {
            // Mostramos las coordenadas obtenidas en el p con id coordenadas
            // document.getElementById("coordenadas").innerHTML='Coordenadas:   '+results[0].geometry.location.lat()+', '+results[0].geometry.location.lng()
            localStorage.setItem("lat", results[0].geometry.location.lat().toFixed(4))
            localStorage.setItem("lng", results[0].geometry.location.lng().toFixed(4))
            //// Posicionamos el marcador en las coordenadas obtenidas
            //mapa.marker.setPosition(results[0].geometry.location);
            //// Centramos el mapa en las coordenadas obtenidas
            //mapa.map.setCenter(mapa.marker.getPosition());
            //agendaForm.showMapaEventForm();
          }
        });
      }
    }
  }
}
</script>
