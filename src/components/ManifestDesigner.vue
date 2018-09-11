<template>
  <multipane class="vertical-panes" layout="vertical">
  <div class="pane manifest-form" :style="{ minWidth: '100px', width: '50%', maxWidth: '50%', textAlign: 'right' }">
    <div>
      <label>نوع سرویس</label>
      <select v-model="manifest.kind">
        <option value="ExternalService">External Service</option>
        <option value="InternalService">Internal Service</option>
        <option value="ManagedService">Managed Service</option>
      </select>
    </div>
    <div>
      <label>نام سرویس</label>
      <input type="text" v-model="manifest.name"/>
    </div>
    <div>
      <label>نام ایمیج</label>
      <input type="text" v-model="manifest.spec.image" />
    </div>
    <div>
      <label>پورت سرویس</label>
      <input type="number" min="1" v-model.number="manifest.spec.port" />
    </div>
    <div>
      <label>اندازه رپلیکا</label>
      <input type="number" min="1" v-model.number="manifest.spec.replicas" />
    </div>


  </div>
  <multipane-resizer></multipane-resizer>
  <div class="pane" :style="{ flexGrow: 1 }">
      <editor v-model="yml" @init="editorInit" lang="yaml" theme="twilight" width="100%" height="100%"></editor>
  </div>
</multipane>
</template>

<script>
import yamljs from 'yamljs'
import jsyml from 'js-yaml'
import { Multipane, MultipaneResizer } from 'vue-multipane'

export default {
  name: 'ManifestDesigner',
  data () {
    return {
      x: '',
      yamljs: yamljs,
      jsyml: jsyml,
      msg: 'Welcome to Your Vue.js App',
      counter: 0,
      manifest: {
        spec: {
          volumes: undefined
        }
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
    text-align: right;
  }
</style>
