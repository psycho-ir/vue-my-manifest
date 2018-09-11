<template>
  <multipane class="vertical-panes" layout="vertical">
  <div class="pane" :style="{ minWidth: '100px', width: '50%', maxWidth: '50%' }">
    <div>
      <input type="number" min="1" v-model.number="manifest.spec.replicas" />
      <input type="button"  v-on:click="delete manifest.spec.replicas" value="x" />
    </div>

    <div>
      <input type="button" v-on:click="manifest.spec.volumes = undefined" value="x" />
      <input type="button" v-on:click="manifest.spec.volumes = [{}]" value="y"/>
    </div>
    <div>
      <input type="text" v-model="manifest.spec.image" />
    </div>
    <div>
      <input type="button" value="click me" v-on:click="counter += 1" />
      {{ counter }}
    </div>
    <div>
      {{ manifest }}
    </div>
    <div>
      <textarea v-text="yamljs.dump(manifest)" v-model="x" />
      <textarea v-text="jsyml.dump(manifest)"  />
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
import { Multipane, MultipaneResizer } from 'vue-multipane'

export default {
  name: 'HelloWorld',
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
      return yamljs.dump(this.manifest)
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript')    //language
      require('brace/mode/less')
      require('brace/theme/twilight')
      require('brace/snippets/javascript') //snippet
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
</style>
