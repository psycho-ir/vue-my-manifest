<template>
  <div>
    <multipane class="vertical-panes" layout="vertical" :style="{height: '800px'}">
      <div class="pane manifest-form" :style="{ minWidth: '100px', width: '50%', maxWidth: '50%' }">
        <div v-if="selectedKind === '' ">
          <b-form-group label="Service Type">
            <b-form-select v-model="manifest.kind" :options="options" >
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>-- Please select a service type --</option>
              </template>
              <!-- these options will appear after the ones from 'options' prop -->
              <option value="ExternalService">External Service</option>
              <option value="InternalService">Internal Service</option>
              <option value="ManagedService">Managed Service</option>
            </b-form-select>
          </b-form-group>
          <b-form-group label="Service Name">
            <b-form-input v-model="manifest.name"></b-form-input>
          </b-form-group>
          <b-button variant="outline-success" @click="selectedKind = manifest.kind">Select</b-button>
        </div>
        <div v-if="selectedKind !== '' ">
          <b-button variant="outline-success" @click="selectedKind = ''">Reset</b-button>
        </div>
        <div v-if="selectedKind === 'InternalService'">
          <internal-service-form v-bind:spec="manifest.spec">
          </internal-service-form>
        </div>
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" :style="{ flexGrow: 1 }">
        <editor v-model="yml" @init="editorInit" lang="yaml" theme="twilight" width="100%" height="100%"></editor>
      </div>
    </multipane>
  </div>
</template>

<script>
import yamljs from 'yamljs'
import jsyml from 'js-yaml'
import VueFormWizard from 'vue-form-wizard'
import VueFormGenerator from 'vue-form-generator'
import InternalServiceForm from '@/components/InternalServiceForm'
import {Multipane, MultipaneResizer} from 'vue-multipane'

export default {
  name: 'ManifestDesigner',
  data () {
    return {
      x: '',
      selectedKind: '',
      yamljs: yamljs,
      jsyml: jsyml,
      msg: 'Welcome to Your Vue.js App',
      counter: 0,
      manifest: {
        spec: {
          volume_mounts: [],
          readiness_probe: {
            http_get: {}
          },
          liveness_probe: {}
        }
      },
      kindSchema: {
        fields: [{
          type: 'select',
          label: 'نوع سرویس',
          model: 'kind',
          required: true,
          styleClasses: 'col-xs-6',
          values: ['ExternalService', 'InternalService', 'ManagedService']
        }, {
          type: 'input',
          inputType: 'text',
          label: 'نام سرویس',
          model: 'name',
          required: true,
          styleClasses: 'col-xs-6'
        }]
      }
    }
  },
  computed: {
    yml: function () {
      console.log('manifest', this.manifest)
      Object.keys(this.manifest).forEach(key => this.manifest[key] === undefined || this.manifest[key] === '' ? delete this.manifest[key] : '')
      return jsyml.safeDump(this.manifest, {sortKeys: true, skipInvalid: true})
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools')
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/less')
      require('brace/theme/twilight')
      require('brace/snippets/javascript')
    }
  },
  components: {
    editor: require('vue2-ace-editor'),
    'vue-form-generator': VueFormGenerator.component,
    'vue-form-wizard': VueFormWizard.component,
    InternalServiceForm,
    Multipane,
    MultipaneResizer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .vertical-panes {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
  }

  .vertical-panes > .pane {
    text-align: left;
    padding: 15px;
    overflow: hidden;
    background: #eee;
  }

  .vertical-panes > .pane ~ .pane {
    border-left: 1px solid #ccc;
  }

  .manifest-form {
  }
</style>
