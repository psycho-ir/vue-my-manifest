<template>
  <div>
    <form-wizard title="Service Manifest Wizard" subtitle="Describe an external service">
      <tab-content title="General">
        <vue-form-generator :model="spec"
                            :schema="generalSchema"
        ></vue-form-generator>
      </tab-content>
      <tab-content title="Volume Configuration">
        <volume-mount-form :spec="spec"></volume-mount-form>
      </tab-content>
      <tab-content title="Healthcheck Configuration">
        <health-check-form :spec="spec"></health-check-form>
      </tab-content>
    </form-wizard>
  </div>
</template>
<script>

import VueFormGenerator from 'vue-form-generator'
import {FormWizard, TabContent} from 'vue-form-wizard'
import VolumeMountForm from './VolumeMountForm'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import HealthCheckForm from './HealthcheckForm'

export default {
  name: 'InternalServiceForm',
  props: ['spec'],
  data () {
    return {
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
    TabContent,
    HealthCheckForm

  }
}
</script>
