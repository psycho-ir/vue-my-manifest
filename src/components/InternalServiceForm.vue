<template>
  <div>
    <form-wizard>
      <tab-content title="عمومی">
        <vue-form-generator :model="spec"
                            :schema="generalSchema"
        ></vue-form-generator>
      </tab-content>
      <tab-content title="Volume Configuration">
        <label>Volume path</label>
        <div class="wrapper">
           <input  class="form-control"
          type="text"
          v-model="currentVolume.volume_path" />
         </div>
        <label>Storage sub path</label>
        <div class="wrapper">
           <input  class="form-control"
          type="text"
          v-model="currentVolume.sub_path" />
         </div>
        <input type="button" @click=" spec.volume_mounts.push(currentVolume); currentVolume={}" value="add"/>
        <div v-for="vm in spec.volume_mounts" v-bind:key="vm.volume_path">
          {{vm}} <span @click="spec.volume_mounts = spec.volume_mounts.filter(i => i != vm)">x</span>
        </div>
      </tab-content>
      <tab-content title="Healthcheck Configuration">
        Yuhuuu! This seems pretty damn simple
      </tab-content>
    </form-wizard>
  </div>
</template>
<script>

import VueFormGenerator from 'vue-form-generator'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

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
          label: 'نام ایمیج',
          model: 'image',
          required: true,
          styleClasses: 'col-xs-6'
        }, {
          type: 'input',
          inputType: 'number',
          min: 1,
          label: 'تعداد رپلیکا',
          model: 'replicas',
          required: true,
          styleClasses: 'col-xs-6'
        }]
      }
    }
  },
  components: {
    'vue-form-generator': VueFormGenerator.component,
    FormWizard,
    TabContent
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
