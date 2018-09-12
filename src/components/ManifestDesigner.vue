<template>
  <div>
    <multipane class="vertical-panes" layout="vertical" :style="{height: '800px'}">
      <div class="pane manifest-form" :style="{ minWidth: '100px', width: '50%', maxWidth: '50%' }">
      <div v-if="selectedKind === '' ">
        <vue-form-generator :model="manifest"
                            :schema="kindSchema"
                            :options="formOptions"
        >
        </vue-form-generator>
        <input type="button" value="start" @click="selectedKind = manifest.kind"/>
      </div>
      <div v-if="selectedKind !== '' ">
        <input type="button" value="Resert" @click="selectedKind = ''"/>
      </div>
        <div v-if="selectedKind === 'InternalService'" >
          <internal-service-form v-bind:spec="manifest.spec">
          </internal-service-form>
        </div>

        <div>
          <label>پورت سرویس</label>
          <input type="number" min="1" v-model.number="manifest.spec.port"/>
        </div>
        <div>
          <label>اندازه رپلیکا</label>
          <input type="number" min="1" v-model.number="manifest.spec.replicas"/>
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
          volume_mounts: []
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
