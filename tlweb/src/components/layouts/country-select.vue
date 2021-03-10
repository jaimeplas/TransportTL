<script>
// import regions from '@/dataCountrys.js'
import regions from '@/data/mexico.js'
export default {
  name: 'CountrySelect',
  props: {
    country: String,
    countryName: Boolean,
    whiteList: Array,
    blackList: Array,
    className: String,
    shortCodeDropdown: Boolean,
    autocomplete: Boolean,
    topCountry: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select Country'
    },
    disablePlaceholder: {
      type: Boolean,
      default: false
    },
    removePlaceholder: {
      type: Boolean,
      default: false
    },
    usei18n: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    ran: false
  }),
  computed: {
    countries () {
      let countryList = regions.filter((region) => {
        if (this.countryName) {
          return region.label !== this.firstCountry
        } else {
          return region.countryShortCode !== this.firstCountry
        }
      })
      if (this.whiteList) {
        countryList = countryList.filter((country) => {
          return this.whiteList.includes(country.countryShortCode)
        })
      }
      if (this.blackList) {
        countryList = countryList.filter((country) => {
          return !this.blackList.includes(country.countryShortCode)
        })
      }
      if (this.$i18n && this.usei18n) {
        countryList = countryList.map((country) => {
          const localeCountry = Object.assign({ }, country)
          localeCountry.countryName = this.$t(country.label)
          return localeCountry
        })
        countryList.sort((country1, country2) => {
          return (country1.label > country2.label) ? 1 : -1
        })
      }
      if (this.removePlaceholder) {
        const c = this.firstCountry || countryList[0][this.valueType]
        this.onChange(c)
      }
      return countryList
    },
    firstCountry () {
      if (this.countryName) {
        if (this.topCountry.length === 2) {
          const regionObj = regions.find((region) => {
            return region.countryShortCode === this.topCountry
          })
          return regionObj.label
        } else {
          return this.topCountry
        }
      }
      if (this.topCountry) {
        return this.topCountry
      }
      return ''
    },
    name () {
      return this.name
    },
    value () {
      return this.label
    },
    valueType () {
      return this.countryName ? 'label' : 'countryShortCode'
    },
    autocompleteAttr () {
      const autocompleteType = (showsFullCountryName) => showsFullCountryName ? 'country-name' : 'country'
      return this.autocomplete ? autocompleteType(this.countryName) : 'off'
    }
  },
  methods: {
    filterByString (data, s) {
      return data.filter(e => e.label.includes(s))
        .sort((a, b) => a.label.includes(s) && !b.label.includes(s) ? -1 : b.label.includes(s) && !a.label.includes(s) ? 1 : 0)
    },
    onChange (country) {
      // this.$emit('input', country)
      const countryList = this.filterByString(this.countries, country)
      this.$emit('input', countryList)
      // alert(JSON.stringify(countryList))
      if (this.countryName) {
      //  return region.countryName !== this.firstCountry
        return 'IF'
      } else {
        // return region.countryShortCode !== this.firstCountry
        return 'ELSE'
      }
    },
    topCountryName () {
      const regionObj = regions.find((region) => {
        if (this.countryName) {
          return region.label === this.firstCountry
        } else {
          return region.countryShortCode === this.firstCountry
        }
      })
      if (this.$i18n && this.usei18n) {
        return this.$t(regionObj.label)
      }
      return this.shortCodeDropdown ? regionObj.countryShortCode : regionObj.label
    }
  }
}
</script>

<template>
  <div>
    <h2>COUNTRY</h2>
    <select @change="onChange($event.target.value)" :class="className" :autocomplete="autocompleteAttr">
      <option value="" v-if="!disablePlaceholder && !removePlaceholder">{{ placeholder }}</option>
      <option value="" v-if="disablePlaceholder && !removePlaceholder" disabled selected>{{ placeholder }}</option>
      <option v-if="topCountry" :value="firstCountry" :selected="country === firstCountry">{{topCountryName()}}</option>
      <option v-for="(region, index) in countries" :value="region[valueType]" :selected="country === region[valueType]" :key="index">{{ shortCodeDropdown ? region.countryShortCode : region.label }}</option>
    </select>
  </div>
</template>
