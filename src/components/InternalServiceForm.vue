<template>
  <div>
    <form-wizard title="Service Manifest Wizard" subtitle="Describe an external service">
      <tab-content title="General">
        <vue-form-generator :model="spec"
                            :schema="generalSchema"
        ></vue-form-generator>
      </tab-content>
      <tab-content title="Volume Configuration">
        <label>Volume path</label>
        <div class="wrapper">
           <input  class="form-control"
          type="text"
          v-model="currentVolume.mount_path" />
         </div>
        <label>Storage sub path</label>
        <div class="wrapper">
           <input  class="form-control"
          type="text"
          v-model="currentVolume.sub_path" />
         </div>
        <div class="wrapper">
          <b-button @click=" spec.volume_mounts.push(currentVolume); currentVolume={}">Add</b-button>
        </div>
        <b-table striped hover :fields="fields" :items="spec.volume_mounts">
          <template slot="show_details" slot-scope="row">
              <b-button size="sm" variant="danger" @click="spec.volume_mounts = spec.volume_mounts.filter(i => i != row.item)">remove</b-button>
          </template>
        </b-table>
        <div v-for="vm in spec.volume_mounts" v-bind:key="vm.mount_path">
          {{vm}} <span @click="spec.volume_mounts = spec.volume_mounts.filter(i => i != vm)">x</span>
        </div>
      </tab-content>
      <tab-content title="Healthcheck Configuration">
        Healthcheck design
      </tab-content>
    </form-wizard>
  </div>
</template>
<script>

import VueFormGenerator from 'vue-form-generator'
import {FormWizard, TabContent} from 'vue-form-wizard'
import VolumeMountForm from './VolumeMountForm'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: 'VolumeMountForm',
  props: ['spec'],
  data () {
    return {
      fields: [ 'mount_path', 'sub_path', 'show_details' ],
      currentVolume: {},
      generalSchema: {
        fields: [{
          type: 'input',
          inputType: 'text',
          label: 'Image Name',
          model: 'image',
          required: true,
          styleClasses: 'col-xs-6'
        }, {
          type: 'input',
          inputType: 'number',
          min: 1,
          label: 'Replicas',
          model: 'replicas',
          required: true,
          styleClasses: 'col-xs-6'
        }]
      }
    }
  },
  components: {
    'vue-form-generator': VueFormGenerator.component,
    VolumeMountForm,
    FormWizard,
    TabContent
  }
}
</script>
