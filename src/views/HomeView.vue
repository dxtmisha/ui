<template>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        :value="data"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple/>
      <md2-progress :visible="visible"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple inverse/>
      <md2-progress :value="100" :max="300" bottom/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        size="200%"
      />
      <md2-progress :visible="visible" type="circular"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        x="25%"
      />
      <md2-progress :value="100" :max="300" type="circular"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        :coordinator="[50, 50, 0, 0]"
      />
      <md2-progress :visible="visible" type="circular" indeterminate="type2" inverse/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="#ff0000"
        :hide="hide"
        :disabled="disabled"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="@test"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple/>
      <md2-progress :visible="visible" indeterminate="type2"/>
    </div>
  </div>
  <div>
    <button @click="onClick">test</button>
    <div>
      <input type="checkbox" name="hide" v-model="hide"> hide
    </div>
    <div>
      <input type="checkbox" name="disabled" v-model="disabled"> disabled
    </div>
    <div>
      <input type="checkbox" name="visible" v-model="visible"> visible
    </div>
  </div>
  <div class="flex items-start gap-4 px-4 py-4">
    <div class="border">
      <md2-textarea-autosize v-model="inputValue"/>
    </div>
    <div class="border">
      <md2-textarea-autosize @on-input="onEmit"/>
    </div>
    <div class="border">
      <md2-textarea-autosize height="99px" @on-input="onEmit"/>
    </div>
  </div>
  <div class="flex items-start gap-4 px-4 py-4">
    <div class="border">
      <md2-textarea-autosize height="sm" @on-input="onEmit"/>
    </div>
    <div class="border">
      <md2-textarea-autosize height="md" @on-input="onEmit"/>
    </div>
    <div class="border">
      <md2-textarea-autosize height="lg" @on-input="onEmit"/>
    </div>
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      :type="'password'"
      v-model="inputValue"
    />
    <md2-input
      text="text"
      mask="+7(***) **-**-**"
    />
    <md2-input
      text="text"
      type="date"
      name="is-date"
      v-model="inputValue"
      @on-input="onEmit"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      align="left"
      appearance="outlined"
      v-model="inputValue"
    />
    <md2-input
      text="text"
      align="right"
      appearance="outlined"
      v-model="inputValue"
    />
    <md2-input
      text="text"
      align="center"
      appearance="outlined"
      v-model="inputValue"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      align="left"
      arrow
      v-model="inputValue"
    />
    <md2-input
      text="text"
      align="right"
      arrow
      v-model="inputValue"
    />
    <md2-input
      text="text"
      align="center"
      arrow
      v-model="inputValue"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      type="text"
      counter
      name="is-match"
      required
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      text="tel"
      type="tel"
      required
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      text="tel"
      type="tel"
      required
      v-model="inputValue"
      helper-message="helper message"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="always"
      v-model="inputValue"
      cancel="always"
    />
    <md2-input
      text="hide"
      v-model="inputValue"
      cancel="hide"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="disabled"
      v-model="inputValue"
      disabled
      icon="face"
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      icon="face"
      readonly
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      cancel="always"
      readonly
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="standard"
      v-model="inputValue"
      icon="face"
      appearance="standard"
    />
    <md2-input
      text="selected"
      v-model="inputValue"
      icon="face"
      appearance="standard"
      selected
    />
    <md2-input
      text="disabled"
      v-model="inputValue"
      disabled
      icon="face"
      appearance="standard"
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      cancel="always"
      readonly
      appearance="standard"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="classic"
      v-model="inputValue"
      icon="face"
      appearance="classic"
    />
    <md2-input
      text="selected"
      v-model="inputValue"
      icon="face"
      appearance="classic"
      selected
    />
    <md2-input
      text="disabled"
      v-model="inputValue"
      disabled
      icon="face"
      appearance="classic"
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      cancel="always"
      readonly
      appearance="classic"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="tonal"
      v-model="inputValue"
      icon="face"
      appearance="tonal"
    />
    <md2-input
      text="selected"
      v-model="inputValue"
      icon="face"
      appearance="tonal"
      selected
    />
    <md2-input
      text="disabled"
      v-model="inputValue"
      disabled
      icon="face"
      appearance="tonal"
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      cancel="always"
      readonly
      appearance="tonal"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="outlined"
      v-model="inputValue"
      icon="face"
      appearance="outlined"
    />
    <md2-input
      text="selected"
      v-model="inputValue"
      icon="face"
      appearance="outlined"
      selected
    />
    <md2-input
      text="disabled"
      v-model="inputValue"
      disabled
      icon="face"
      appearance="outlined"
    />
    <md2-input
      text="readonly"
      v-model="inputValue"
      cancel="always"
      readonly
      appearance="outlined"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      arrow
      text="text"
      type="number"
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      :min="10"
      arrow
      text="text"
      type="number"
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      :max="30"
      :min="10"
      arrow
      text="text"
      type="number"
      @on-input="onEmit"
      @on-change="onEmit"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      type="text"
      name="is-match"
      required
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      type="text"
      input-match="input[name='is-match']"
      required
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      text="text"
      value="is value"
      type="email"
      required
      validation-message="is validation message"
      @on-input="onEmit"
      @on-change="onEmit"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      icon="face"
      required
      :validation-code="{valueMissing:'is validation code'}"
      @on-input="onEmit"
      @on-change="onEmit"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      icon="face"
    />
    <md2-input
      text="text"
      value="is value"
      icon="face"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      icon="face"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      icon="face"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      value="is value"
      icon="face"
      icon-trailing="close"
      name="name"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      icon="face"
      icon-trailing="close"
      name="name"
      prefix="prefix"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      icon="face"
      icon-trailing="close"
      name="name"
      prefix="prefix"
    />
    <md2-input
      text="text"
      value="is value"
      icon="face"
      icon-trailing="close"
      name="name"
      prefix="prefix"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      prefix="prefix"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      prefix="prefix"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      value="is value"
      prefix="prefix"
      icon-trailing="close"
      name="name"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      icon="face"
      icon-trailing="close"
      name="name"
      suffix="suffix"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      icon="face"
      icon-trailing="close"
      name="name"
      suffix="suffix"
    />
    <md2-input
      text="text"
      value="is value"
      icon="face"
      icon-trailing="close"
      name="name"
      suffix="suffix"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      text="text"
      suffix="suffix"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      placeholder="placeholder"
      suffix="suffix"
      icon-trailing="close"
      name="name"
    />
    <md2-input
      text="text"
      value="is value"
      suffix="suffix"
      icon-trailing="close"
      name="name"
    />
  </div>
  <div class="flex gap-4 px-4 py-4">
    <md2-input
      :type="'email'"
      icon-trailing="close"
      name="name"
      required
      text="text"
    />
    <md2-input
      :type="'email'"
      icon-trailing="close"
      name="name"
      placeholder="placeholder"
      required
      text="text"
    />
    <md2-input
      :type="'email'"
      icon-trailing="close"
      name="name"
      text="text"
      required
      value="is value"
    />
  </div>
  <div class="px-4 py-4">
    <div>mack0:
      <md2-mask
        mask="***-**-**"
        @on-change="onEmit"
        @on-input="onEmit"
      />
    </div>
    <div>mack1:
      <md2-mask
        mask="+7(***) ***-**-**"
        @on-change="onEmit"
        @on-input="onEmit"
      />
    </div>
    <div>mack1a:
      <md2-mask
        :mask="['+84 ***-**','+7(***) ***-**-**']"
        @on-change="onEmit"
        @on-input="onEmit"
      />
    </div>
    <div>mack1b:
      <md2-mask
        :mask="['+84 ***-**','+7(***) ***-**-**']"
        :visible="false"
        @on-change="onEmit"
        @on-input="onEmit"
      />
    </div>
    <div>mack2:
      <md2-mask
        :type="'datetime'"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack3:
      <md2-mask :type="'date'"/>
    </div>
    <div>mack3a:
      <md2-mask :type="'month'"/>
    </div>
    <div>mack3b:
      <md2-mask :type="'time'"/>
    </div>
    <div>mack3c:
      <md2-mask :type="'second'"/>
    </div>
    <div>mack4:
      <md2-mask :type="'date'" :pattern="{check:{type:'date', min:'1990-06-01', max:'2025-03-15'}}"/>
    </div>
    <div>mack5:
      <md2-mask mask="*" :special="{'*':{rubber:true}}"/>
    </div>
    <div>mack6:
      <md2-mask mask="is *.dd.eee" :special="{'*':{rubber:true, transitionChar: '.'}, d:{}, e:{}}"/>
    </div>
    <div>mack7:
      <md2-mask :type="'number'" class="w-96 block"/>
    </div>
    <div>mack7a:
      <md2-mask
        :type="'number'"
        :fraction="3"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack7b:
      <md2-mask
        :type="'number'"
        :fraction="true"
        class="w-96 block"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack8:
      <md2-mask
        :type="'currency'"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack8a:
      <md2-mask
        :type="'currency'"
        currency="RUB"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack8b:
      <md2-mask
        :type="'currency'"
        value="123456.78"
        currency="RUB"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack8c:
      <md2-mask
        :type="'currency'"
        value="123456"
        class="w-96 block"
        currency="RUB"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
    <div>mack8c:
      <md2-mask
        :type="'currency'"
        class="w-96 block"
        currency="VND"
        @on-change=" onEmit"
        @on-input=" onEmit"
      />
    </div>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="tonal"
      helper-message="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в Коллегию иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29]."
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="tonal"
      palette="red"
      helper-message="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года"
      validation-message="13 июня высочайшим указом был определён в Коллегию иностранных дел"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="tonal"
      palette="red"
      selected
      helper-message="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года"
      validation-message="13 июня высочайшим указом был определён в Коллегию иностранных дел"
      :counter="16"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="classic"
      helper-message="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года"
      validation-message="13 июня высочайшим указом был определён в Коллегию иностранных дел"
      :counter="16"
      :maxlength="20"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="classic"
      disabled
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue" placeholder="placeholder">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="classic"
      palette="deep-orange"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="standard"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="standard"
      palette="teal"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="standard"
      selected
      palette="teal"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="standard"
      selected
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="standard"
      disabled
      helper-message="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года"
      validation-message="13 июня высочайшим указом был определён в Коллегию иностранных дел"
      :counter="16"
      :maxlength="20"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="outlined"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      palette="red"
      appearance="outlined"
      icon="face"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      palette="green"
      appearance="outlined"
      icon="face"
      icon-trailing="close"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue" placeholder="placeholder">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      appearance="outlined"
      icon="face"
      icon-trailing="close"
      disabled
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue" disabled>
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      palette="green"
      appearance="outlined"
      icon="face"
      icon-trailing="close"
      disabled
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue" placeholder="placeholder" disabled>
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      palette="red"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue" placeholder="placeholder">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      palette="green"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="selected"
      selected
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="selected"
      palette="red"
      selected
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="selected"
      palette="green"
      selected
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      rounded="none"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      rounded="standard"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      text="Interactive demo"
      rounded="sm"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      icon="face"
      :value="inputValue"
      text="Interactive demo"
      rounded="md"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      icon="face"
      :value="inputValue"
      text="Interactive demo"
      rounded="xl"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      icon="face"
      :value="inputValue"
      text="Interactive demo"
      rounded="full"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      icon="face"
      text="Interactive demo"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      icon="face"
      text="Interactive demo"
      prefix="prefix"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      prefix="prefix"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      prefix="prefix"
      suffix="suffix"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      text="Interactive demo"
      arrow
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      arrow
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="auto"
      icon-trailing="close"
      text="Interactive demo"
      suffix="suffix"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="auto"
      icon-trailing="close"
      text="Interactive demo"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="always"
      text="Interactive demo"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="auto"
      arrow
      icon-trailing="close"
      text="Interactive demo"
      prefix="pr"
      align="center"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="auto"
      arrow
      icon-trailing="close"
      text="Interactive demo"
      prefix="pr"
      align="left"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      cancel="auto"
      arrow
      icon-trailing="close"
      text="Interactive demo"
      prefix="pr"
      align="right"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      height="xm"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      height="sm"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      height="md"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      height="lg"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
    <md2-field
      :value="inputValue"
      :turn="turn"
      icon="face"
      icon-trailing="close"
      text="Interactive demo"
      height="xl"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="flex gap-4 px-4 pb-4">
    <md2-field
      :value="inputValue"
      :turn="turn"
      text="Interactive demo"
      height="2xl"
    >
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" v-model="inputValue">
      </template>
    </md2-field>
  </div>
  <div class="px-4 pb-4">
    <md2-field text="Interactive demo" width="auto" :value="true">
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" placeholder="placeholder">
      </template>
    </md2-field>
  </div>
  <div class="px-4 pb-4">
    <md2-field text="Interactive demo" width="full">
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes">
      </template>
    </md2-field>
  </div>
  <div class="flex items-center gap-2 pb-8 px-4 pb-4">
    <md2-field text="Interactive demo" required>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes">
      </template>
    </md2-field>
  </div>
  <div class="flex items-center gap-2 pb-8 px-4 pb-4">
    <md2-field text="Interactive demo" value="value" required>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value">
      </template>
    </md2-field>
    <md2-field text="Interactive demo" value="value" required readonly>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="readonly" readonly>
      </template>
    </md2-field>
    <md2-field text="Interactive demo" value="value" required disabled>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
  </div>
  <div class="flex items-center gap-2 pb-8 px-4 pb-4">
    <md2-field text="Interactive demo" value="value" required disabled arrow>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
    <md2-field text="Interactive demo" value="value" required disabled-next arrow>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
    <md2-field text="Interactive demo" value="value" required disabled-previous arrow>
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
  </div>
  <div class="flex items-center gap-2 pb-8 px-4 pb-4">
    <md2-field text="Interactive demo" value="value" required disabled arrow appearance="classic">
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
    <md2-field text="Interactive demo" value="value" required disabled icon="face" icon-trailing="close">
      <template v-slot:default="binds">
        <input :id="binds.id" :class="binds.classes" value="value" disabled>
      </template>
    </md2-field>
  </div>
  <div class="flex items-center gap-2">
    <md2-icon :icon="{value: 'close', disabled: true}" :active="active" :turn="turn" :background="background"
              :hide="hide"
              animation-show :disabled="disabled"/>
    <md2-icon :icon="icon" icon-active="face" size="md" :active="active" :turn="turn" :background="background"
              :hide="hide" :animation-show="animationShow" :disabled="disabled"/>
    <md2-icon icon="close" size="lg" :active="active" :turn="turn" :background="background" :hide="hide"
              animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
    <md2-icon icon="close" size="xl" :active="active" :turn="turn" :background="background" :hide="hide"
              animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
    test
  </div>
  <div>
    <div>
      <input type="checkbox" name="active" v-model="active"> active
    </div>
    <div>
      <input type="checkbox" name="turn" v-model="turn"> turn
    </div>
    <div>
      <input type="checkbox" name="background" v-model="background"> background
    </div>
    <div>
      <input type="checkbox" name="animationShow" v-model="animationShow"> animationShow
    </div>
    <button @click="onClickIcon">test 2</button>
  </div>
  <div class="flex gap-2 pt-8 pl-8">
    <div class="w-96 border">
      <md2-list-item text="List item 1" :progress="visible"/>
      <md2-list-item text="List item 2" :progress="visible"/>
      <md2-list-item text="prefix" :progress="visible" prefix="+100"/>
      <md2-list-item text="suffix" :progress="visible" suffix="Clt+P"/>
      <md2-list-item text="description" :progress="visible"
                     description="Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен"/>
      <md2-list-item text="prefix + suffix" :progress="visible" prefix="+100" suffix="Clt+P"/>
      <md2-list-item icon="face" text="icon" :progress="visible"/>
      <md2-list-item icon-trailing="close" text="icon trailing" :progress="visible"/>
      <md2-list-item icon="face" icon-trailing="close" text="icon/icon trailing" :progress="visible"/>
      <md2-list-item palette="teal" text="palette"/>
      <md2-list-item selected palette="teal" text="palette+selected"/>
      <md2-list-item overlay="255,0,0" text="background"/>
      <md2-list-item overlay palette="red" text="background"/>
      <md2-list-item highlight text="highlight"/>
      <md2-list-item disabled text="disabled"/>
      <md2-list-item selected text="selected"/>
      <md2-list-item disabled selected text="selected + disabled"/>
    </div>
    <div class="w-96 border">
      <md2-list-item text="List item 1" :progress="visible" height="sm"/>
      <md2-list-item text="List item 2" :progress="visible" height="md"/>
      <md2-list-item text="List item 3" :progress="visible" height="lg"/>
    </div>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window>
      <template v-slot:control="binds">
        <md2-button text="window" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>test</template>
    </md2-window>
    <md2-window>
      <template v-slot:control="binds">
        <md2-button text="window" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        <md2-window :auto-close="false">
          <template v-slot:control="binds">
            <md2-button class="window-static" text="auto-close 2" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>{{ text }}</template>
        </md2-window>
        <md2-window>
          <template v-slot:control="binds">
            <md2-button class="window-static" text="norm" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>{{ text }}</template>
        </md2-window>
        {{ text }}
      </template>
    </md2-window>
    <md2-window :auto-close="false">
      <template v-slot:control="binds">
        <md2-button text="auto-close" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        <md2-window :auto-close="false">
          <template v-slot:control="binds">
            <md2-button text="auto-close 2" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>{{ text }}</template>
        </md2-window>
        <md2-window>
          <template v-slot:control="binds">
            <md2-button text="norm" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>{{ text }}</template>
        </md2-window>
        {{ text }}
      </template>
    </md2-window>
    <md2-window :in-dom="true">
      <template v-slot:control="binds">
        <md2-button text="in-dom" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window persistent>
      <template v-slot:control="binds">
        <md2-button text="persistent" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window adaptive="menu">
      <template v-slot:control="binds">
        <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        <md2-window adaptive="menu">
          <template v-slot:control="binds">
            <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>
            <md2-window adaptive="menu">
              <template v-slot:control="binds">
                <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
              </template>
              <template v-slot:default>
                Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
                коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в
                Коллегию
                иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
              </template>
            </md2-window>
            Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
            коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в
            Коллегию
            иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
          </template>
        </md2-window>
        Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
        коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в Коллегию
        иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
      </template>
    </md2-window>
    <md2-window adaptive="menu" :auto-close="false">
      <template v-slot:control="binds">
        <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        <md2-window adaptive="menu" :auto-close="false">
          <template v-slot:control="binds">
            <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
          </template>
          <template v-slot:default>
            <md2-window adaptive="menu" :auto-close="false">
              <template v-slot:control="binds">
                <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
              </template>
              <template v-slot:default>
                Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
                коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в
                Коллегию
                иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
              </template>
            </md2-window>
            Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
            коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в
            Коллегию
            иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
          </template>
        </md2-window>
        Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
        коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в Коллегию
        иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window fullscreen>
      <template v-slot:control="binds">
        <md2-button text="fullscreen" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
        коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в Коллегию
        иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
      </template>
    </md2-window>
    <md2-window adaptive="md" fullscreen>
      <template v-slot:control="binds">
        <md2-button text="fullscreen/md" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        Свидетельство, выданное Пушкину по окончании лицея Из лицея Пушкин был выпущен 9 июня 1817 года в чине
        коллежского секретаря (10-го класса, по Табели о рангах)[28], 13 июня высочайшим указом был определён в Коллегию
        иностранных дел и 15 июня принёс присягу, подписав бланк клятвенного обещания императору[29].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window width="auto">
      <template v-slot:control="binds">
        <md2-button text="auto" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>test</template>
    </md2-window>
    <md2-window width="auto">
      <template v-slot:control="binds">
        <md2-button text="auto" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window width="sm">
      <template v-slot:control="binds">
        <md2-button text="sm" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window width="md">
      <template v-slot:control="binds">
        <md2-button text="md" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window width="lg">
      <template v-slot:control="binds">
        <md2-button text="lg" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window width="full">
      <template v-slot:control="binds">
        <md2-button text="full/text" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>test</template>
    </md2-window>
    <md2-window width="full">
      <template v-slot:control="binds">
        <md2-button text="full" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window width="128px">
      <template v-slot:control="binds">
        <md2-button text="128px" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>128px</template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window height="auto">
      <template v-slot:control="binds">
        <md2-button text="auto" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>test</template>
    </md2-window>
    <md2-window height="auto">
      <template v-slot:control="binds">
        <md2-button text="auto" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window height="sm">
      <template v-slot:control="binds">
        <md2-button text="sm" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window height="md">
      <template v-slot:control="binds">
        <md2-button text="md" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window height="lg">
      <template v-slot:control="binds">
        <md2-button text="lg" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window height="full">
      <template v-slot:control="binds">
        <md2-button text="full/text" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>test</template>
    </md2-window>
    <md2-window height="full">
      <template v-slot:control="binds">
        <md2-button text="full" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window height="128px">
      <template v-slot:control="binds">
        <md2-button text="128px" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>128px</template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window rounded="none">
      <template v-slot:control="binds">
        <md2-button text="none" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="standard">
      <template v-slot:control="binds">
        <md2-button text="standard" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="sm">
      <template v-slot:control="binds">
        <md2-button text="sm" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="md">
      <template v-slot:control="binds">
        <md2-button text="md" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="lg">
      <template v-slot:control="binds">
        <md2-button text="lg" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="xl">
      <template v-slot:control="binds">
        <md2-button text="xl" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window rounded="72px">
      <template v-slot:control="binds">
        <md2-button text="72px" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window animation-origin="auto">
      <template v-slot:control="binds">
        <md2-button text="auto" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window animation-origin="bottom">
      <template v-slot:control="binds">
        <md2-button text="bottom" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window animation-origin="center">
      <template v-slot:control="binds">
        <md2-button text="center" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window animation-origin="left">
      <template v-slot:control="binds">
        <md2-button text="left" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window animation-origin="right">
      <template v-slot:control="binds">
        <md2-button text="right" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
    <md2-window animation-origin="top">
      <template v-slot:control="binds">
        <md2-button text="top" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>{{ text }}</template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    alignment
    <md2-window alignment="bottom" animation-origin="bottom">
      <template v-slot:control="binds">
        <md2-button text="bottom" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window alignment="center" animation-origin="center">
      <template v-slot:control="binds">
        <md2-button text="center" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window alignment="left" animation-origin="left">
      <template v-slot:control="binds">
        <md2-button text="left" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window alignment="right" animation-origin="right">
      <template v-slot:control="binds">
        <md2-button text="right" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window alignment="top" animation-origin="top">
      <template v-slot:control="binds">
        <md2-button text="top" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 py-12 pl-8">
    adaptive
    <md2-window adaptive="sm">
      <template v-slot:control="binds">
        <md2-button text="sm" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="md">
      <template v-slot:control="binds">
        <md2-button text="md" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="lg">
      <template v-slot:control="binds">
        <md2-button text="lg" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="xl">
      <template v-slot:control="binds">
        <md2-button text="xl" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="menu">
      <template v-slot:control="binds">
        <md2-button text="menu" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="modal">
      <template v-slot:control="binds">
        <md2-button text="modal" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 py-12 pl-8">
    axis
    <md2-window adaptive="menu" axis="x">
      <template v-slot:control="binds">
        <md2-button text="x" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="menu" axis="y">
      <template v-slot:control="binds">
        <md2-button text="y" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="menu" axis="y">
      <template v-slot:control="binds">
        <md2-button text="y" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 py-12 pl-8">
    indent
    <md2-window adaptive="menu" axis="y" :indent="16">
      <template v-slot:control="binds">
        <md2-button text="16" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="menu" axis="y" :indent="24">
      <template v-slot:control="binds">
        <md2-button text="24" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
    <md2-window adaptive="menu" axis="y" :indent="32">
      <template v-slot:control="binds">
        <md2-button text="32" :class="binds.classes" v-on="binds.on"/>
      </template>
      <template v-slot:default>
        В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
        веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
        молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
        Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
        Лагарп[19].
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 py-12 pl-8">
    <md2-scrollbar border style="height: 400px">
      В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
      веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
      молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
      Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
      Лагарп[19]. В его ранней лирике соединились традиции французского и русского классицизма. Учителями Пушкина-поэта
      стали Батюшков, признанный мастер «лёгкой поэзии», и Жуковский, глава отечественного романтизма. Пушкинская лирика
      периода 1813—1815 годов пронизана мотивами быстротечности жизни, которая диктовала жажду наслаждения радостями
      бытия. С 1816 года, вслед за Жуковским, он обращается к элегиям, где развивает характерные для этого жанра мотивы:
      неразделённой любви, ухода молодости, угасания души. Лирика Пушкина ещё подражательна, полна литературных
      условностей и штампов, тем не менее уже тогда начинающий поэт выбирает свой, особый путь[20]. Не замыкаясь на
      поэзии камерной, Пушкин обращался к темам более сложным, общественно значимым. «Воспоминания в Царском Селе»
      (1814), заслужившие одобрение Державина, — в начале 1815 года Пушкин читал стихотворение в его присутствии, —
      посвящено событиям Отечественной войны 1812 года[21]. Стихотворение было опубликовано в 1815 году в журнале
      «Российский музеум» за полной подписью автора. А в пушкинском послании «Лицинию» критически изображена современная
      жизнь России, где в образе «любимца деспота» выведен Аракчеев. Уже в начале своего творческого пути Пушкин
      проявлял интерес к русским писателям-сатирикам прошлого века. Влияние Фонвизина чувствуется в сатирической поэме
      Пушкина «Тень Фонвизина» (1815)[22]; с творчеством Радищева связаны «Бова» (1814) и «Безверие» (1817)[23].

      <div class="py-6">
        <b>Молодость</b>
      </div>

      Свидетельство, выданное Пушкину по окончании лицея
      Из лицея Пушкин был выпущен 9 июня 1817 года в чине коллежского секретаря (10-го класса, по Табели о рангах)[28],
      13 июня высочайшим указом был определён в Коллегию иностранных дел и 15 июня принёс присягу, подписав бланк
      клятвенного обещания императору[29].

      В это время отец передал Александру своего дворового крепостного Никиту, знавшего Сашу с первых дней, ставшего ему
      настоящим другом и прошедшего с ним практически весь жизненный путь вплоть до последнего дня, кроме года
      Михайловской ссылки[30].

      Пушкин становится постоянным посетителем театра, принимает участие в заседаниях «Арзамаса» (принят он был туда
      заочно, ещё учеником Лицея, и получил кличку «Сверчок»)[31], в 1819 году вступает в литературно-театральное
      общество «Зелёная лампа», которым руководит «Союз благоденствия» (см. Декабристы)[32].

      Пушкин на лицейском экзамене. Картина И. Репина (1911)
      Не участвуя в деятельности первых тайных организаций, Пушкин тем не менее связан дружескими узами со многими
      активными членами декабристских обществ, пишет политические эпиграммы и стихи «К Чаадаеву» («Любви, надежды, тихой
      славы…», 1818), «Вольность» (1818), «Н. Я. Плюсковой» (1818), «Деревня» (1819), распространявшиеся в списках.

      В эти годы Пушкин работает над поэмой «Руслан и Людмила», начатой в Лицее и отвечавшей программным установкам
      литературного общества «Арзамас» о необходимости создания национальной богатырской поэмы. Поэма опубликована в мае
      1820 года (по спискам была известна ранее) и вызвала различные, не всегда благожелательные, отклики. Уже после
      высылки Пушкина вокруг поэмы разгорелись споры[33]. Некоторые критики были возмущены снижением высокого канона.
      Смешение в «Руслане и Людмиле» русско-французских приёмов словесного выражения с просторечием и фольклорной
      стилистикой вызвало упрёки и со стороны защитников демократической народности в литературе. Такие нарекания
      содержало письмо Д. Зыкова, литературного последователя Катенина, опубликованное в «Сыне отечества»[34][35].
    </md2-scrollbar>
    <div class="h-4"></div>
    <md2-scrollbar border inverse style="height: 400px">
      В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
      веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
      молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
      Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
      Лагарп[19]. В его ранней лирике соединились традиции французского и русского классицизма. Учителями Пушкина-поэта
      стали Батюшков, признанный мастер «лёгкой поэзии», и Жуковский, глава отечественного романтизма. Пушкинская лирика
      периода 1813—1815 годов пронизана мотивами быстротечности жизни, которая диктовала жажду наслаждения радостями
      бытия. С 1816 года, вслед за Жуковским, он обращается к элегиям, где развивает характерные для этого жанра мотивы:
      неразделённой любви, ухода молодости, угасания души. Лирика Пушкина ещё подражательна, полна литературных
      условностей и штампов, тем не менее уже тогда начинающий поэт выбирает свой, особый путь[20]. Не замыкаясь на
      поэзии камерной, Пушкин обращался к темам более сложным, общественно значимым. «Воспоминания в Царском Селе»
      (1814), заслужившие одобрение Державина, — в начале 1815 года Пушкин читал стихотворение в его присутствии, —
      посвящено событиям Отечественной войны 1812 года[21]. Стихотворение было опубликовано в 1815 году в журнале
      «Российский музеум» за полной подписью автора. А в пушкинском послании «Лицинию» критически изображена современная
      жизнь России, где в образе «любимца деспота» выведен Аракчеев. Уже в начале своего творческого пути Пушкин
      проявлял интерес к русским писателям-сатирикам прошлого века. Влияние Фонвизина чувствуется в сатирической поэме
      Пушкина «Тень Фонвизина» (1815)[22]; с творчеством Радищева связаны «Бова» (1814) и «Безверие» (1817)[23].

      <div class="py-6">
        <b>Молодость</b>
      </div>

      Свидетельство, выданное Пушкину по окончании лицея
      Из лицея Пушкин был выпущен 9 июня 1817 года в чине коллежского секретаря (10-го класса, по Табели о рангах)[28],
      13 июня высочайшим указом был определён в Коллегию иностранных дел и 15 июня принёс присягу, подписав бланк
      клятвенного обещания императору[29].

      В это время отец передал Александру своего дворового крепостного Никиту, знавшего Сашу с первых дней, ставшего ему
      настоящим другом и прошедшего с ним практически весь жизненный путь вплоть до последнего дня, кроме года
      Михайловской ссылки[30].

      Пушкин становится постоянным посетителем театра, принимает участие в заседаниях «Арзамаса» (принят он был туда
      заочно, ещё учеником Лицея, и получил кличку «Сверчок»)[31], в 1819 году вступает в литературно-театральное
      общество «Зелёная лампа», которым руководит «Союз благоденствия» (см. Декабристы)[32].

      Пушкин на лицейском экзамене. Картина И. Репина (1911)
      Не участвуя в деятельности первых тайных организаций, Пушкин тем не менее связан дружескими узами со многими
      активными членами декабристских обществ, пишет политические эпиграммы и стихи «К Чаадаеву» («Любви, надежды, тихой
      славы…», 1818), «Вольность» (1818), «Н. Я. Плюсковой» (1818), «Деревня» (1819), распространявшиеся в списках.

      В эти годы Пушкин работает над поэмой «Руслан и Людмила», начатой в Лицее и отвечавшей программным установкам
      литературного общества «Арзамас» о необходимости создания национальной богатырской поэмы. Поэма опубликована в мае
      1820 года (по спискам была известна ранее) и вызвала различные, не всегда благожелательные, отклики. Уже после
      высылки Пушкина вокруг поэмы разгорелись споры[33]. Некоторые критики были возмущены снижением высокого канона.
      Смешение в «Руслане и Людмиле» русско-французских приёмов словесного выражения с просторечием и фольклорной
      стилистикой вызвало упрёки и со стороны защитников демократической народности в литературе. Такие нарекания
      содержало письмо Д. Зыкова, литературного последователя Катенина, опубликованное в «Сыне отечества»[34][35].
    </md2-scrollbar>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="sm" icon="face"/>
    <md2-fab :progress="visible" height="sm" text="text"/>
    <md2-fab :progress="visible" height="sm" text="text" icon="face"/>
    <md2-fab :progress="visible" height="sm" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="sm" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="md" icon="face"/>
    <md2-fab :progress="visible" height="md" text="text"/>
    <md2-fab :progress="visible" height="md" text="text" icon="face"/>
    <md2-fab :progress="visible" height="md" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="md" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="lg" icon="face"/>
    <md2-fab :progress="visible" height="lg" text="text"/>
    <md2-fab :progress="visible" height="lg" text="text" icon="face"/>
    <md2-fab :progress="visible" height="lg" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="lg" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" disabled icon="face"/>
    <md2-fab :progress="visible" disabled text="text"/>
    <md2-fab :progress="visible" disabled text="text" icon="face"/>
    <md2-fab :progress="visible" disabled text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" disabled text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" adaptive="sm" text="sm" icon="face"/>
    <md2-fab :progress="visible" adaptive="md" text="md" icon="face"/>
    <md2-fab :progress="visible" adaptive="lg" text="lg" icon="face"/>
    <md2-fab :progress="visible" adaptive="full" text="full" icon="face"/>
    <md2-fab :progress="visible" adaptive="icon" text="icon" icon="face"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" rounded="none" text="none" icon="face"/>
    <md2-fab :progress="visible" rounded="standard" text="standard" icon="face"/>
    <md2-fab :progress="visible" rounded="sm" text="sm" icon="face"/>
    <md2-fab :progress="visible" rounded="md" text="md" icon="face"/>
    <md2-fab :progress="visible" rounded="lg" text="lg" icon="face"/>
    <md2-fab :progress="visible" rounded="full" text="full" icon="face"/>
    <md2-fab :progress="visible" rounded="full" text="full" icon="face" :ripple="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip
      text="chip"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip text="red" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-chip text="green" palette="green"/>
    <md2-chip text="green" palette="green" selected/>
    <md2-chip text="dragged" dragged/>
    <md2-chip text="readonly" readonly/>
    <md2-chip text="selected" selected/>
    <md2-chip text="selected+disabled" selected disabled/>
    <md2-chip text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      appearance="outlined"
    />
    <md2-chip text="red" appearance="outlined" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-chip text="green" appearance="outlined" palette="green"/>
    <md2-chip text="green" appearance="outlined" palette="green" selected/>
    <md2-chip text="dragged" appearance="outlined" dragged/>
    <md2-chip text="readonly" appearance="outlined" readonly/>
    <md2-chip text="selected" appearance="outlined" selected/>
    <md2-chip text="selected+disabled" appearance="outlined" selected disabled/>
    <md2-chip text="disabled" appearance="outlined" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="none"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="none"
    />
    <md2-chip
      text="standard"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="standard"
    />
    <md2-chip
      text="sm"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="sm"
    />
    <md2-chip
      text="md"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="md"
    />
    <md2-chip
      text="full"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="full"
    />
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip text="sm" icon="face" height="sm" :progress="visible" :hide="hide"/>
    <md2-chip text="md" icon="face" height="md" :progress="visible" :hide="hide"/>
    <md2-chip text="lg" icon="face" height="lg" :progress="visible" :hide="hide"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip text="sm" height="sm" :progress="visible"/>
    <md2-chip dense text="sm" height="sm" :progress="visible"/>
    <md2-chip dense text="sm" icon="face" height="sm" :progress="visible"/>
    <md2-chip dense text="md" icon="face" height="md" :progress="visible"/>
    <md2-chip dense text="lg" icon="face" height="lg" :progress="visible"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-chip text="auto" width="auto"/>
    <md2-chip text="sm" width="sm"/>
    <md2-chip text="md" width="md"/>
    <md2-chip text="lg" width="lg"/>
    <md2-chip text="200px" width="200px"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-button
      text="button"
      :progress="visible"
      :disabled="disabled"
      icon-trailing="close"
      @onClick="onEmit"
      @onTrailing="onEmit"
      :detail="{name:'name',value:'value'}"
      value="test"
    />
    <md2-button>slot</md2-button>
    <md2-button text="red" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-button text="green" palette="green" :progress="visible"/>
    <md2-button text="dragged" dragged/>
    <md2-button text="readonly" readonly/>
    <md2-button text="selected" selected/>
    <md2-button text="selected+disabled" selected disabled ellipsis/>
    <md2-button text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-button text="link" tag="a"/>
    <md2-button text="progress" progress/>
    <md2-button icon="face" text="progress+icon" progress/>
    <md2-button icon-trailing="close" text="progress+trailing" progress/>
    <md2-button icon="face" icon-trailing="close" text="progress+icon+trailing" progress/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="outlined" :disabled="disabled" text="button"/>
    <md2-button appearance="outlined">slot</md2-button>
    <md2-button appearance="outlined" text="red" palette="red" :progress="visible"/>
    <md2-button appearance="outlined" text="green" palette="green" :progress="visible"/>
    <md2-button appearance="outlined" text="dragged" dragged/>
    <md2-button appearance="outlined" text="readonly" readonly/>
    <md2-button appearance="outlined" text="selected" selected/>
    <md2-button appearance="outlined" text="selected+disabled" selected disabled ellipsis/>
    <md2-button appearance="outlined" text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" :disabled="disabled" text="button"/>
    <md2-button appearance="text">slot</md2-button>
    <md2-button appearance="text" text="red" palette="red"/>
    <md2-button appearance="text" text="green" palette="green"/>
    <md2-button appearance="text" text="dragged" dragged/>
    <md2-button appearance="text" text="readonly" readonly/>
    <md2-button appearance="text" text="selected" selected/>
    <md2-button appearance="text" text="selected+disabled" selected disabled/>
    <md2-button appearance="text" text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button icon="close" :progress="visible" :disabled="disabled"/>
    <md2-button icon="close" :progress="visible">text</md2-button>
    <md2-button text="icon" icon="close"/>
    <md2-button text="icon+iconActive" :disabled="disabled" :progress="visible" :icon="{icon:'close',iconActive:'face'}"
                selected/>
    <md2-button>
      <md2-icon icon="face"/>
      slot+icon
      <md2-icon icon="close" in-end/>
    </md2-button>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button icon="close" :progress="visible" height="sm"/>
    <md2-button icon="face" :progress="visible" height="md"/>
    <md2-button icon="close" :progress="visible" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" icon="close" :progress="visible"/>
    <md2-button appearance="text" icon="close" :progress="visible">text</md2-button>
    <md2-button appearance="text" text="icon" icon="close"/>
    <md2-button appearance="text" text="icon+iconActive" :progress="visible" :icon="{icon:'close',iconActive:'face'}"
                selected/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="icon+icon-trailing" :progress="visible" icon="face" icon-trailing="close"/>
    <md2-button icon="face" icon-trailing="close"/>
    <md2-button text="icon-trailing" icon-trailing="close"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" text="icon+icon-trailing" :progress="visible" icon="face" icon-trailing="close"/>
    <md2-button appearance="text" icon="face" icon-trailing="close"/>
    <md2-button appearance="text" text="icon-trailing" icon-trailing="close"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="lowercase" lowercase/>
    <md2-button text="lowercase+disabled" lowercase disabled/>
    <md2-button text="ellipsis" :ellipsis="false"/>
    <md2-button text="dense" dense/>
    <md2-button text="ripple" :ripple="false"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="sm" height="sm"/>
    <md2-button text="md" height="md"/>
    <md2-button text="lg" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="l" align="left" width="lg"/>
    <md2-button text="r" align="right" width="lg"/>
    <md2-button text="c" align="center" width="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="standard" rounded="standard"/>
    <md2-button text="none" rounded="none"/>
    <md2-button text="sm" rounded="sm"/>
    <md2-button text="md" rounded="md"/>
    <md2-button text="lg" rounded="lg"/>
    <md2-button text="xl" rounded="xl"/>
    <md2-button text="full" rounded="full"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" adaptive="full"/>
    <md2-button text="sm" adaptive="sm"/>
    <md2-button text="md" adaptive="md"/>
    <md2-button text="lg" adaptive="lg"/>
    <md2-button text="icon" adaptive="icon"/>
    <md2-button text="icon" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" icon="face" adaptive="full"/>
    <md2-button text="sm" icon="face" adaptive="sm"/>
    <md2-button text="md" icon="face" adaptive="md"/>
    <md2-button text="lg" icon="face" adaptive="lg"/>
    <md2-button text="icon" icon="face" adaptive="icon"/>
    <md2-button text="icon" icon="face" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-chip text="full" icon="face" adaptive="full"/>
    <md2-chip text="sm" icon="face" adaptive="sm"/>
    <md2-chip text="md" icon="face" adaptive="md"/>
    <md2-chip text="lg" icon="face" adaptive="lg"/>
    <md2-chip text="icon" icon="face" adaptive="icon"/>
    <md2-chip text="icon" icon="face" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" icon="face" icon-trailing="close" adaptive="full" :turn="turn"/>
    <md2-button text="sm" icon="face" icon-trailing="close" adaptive="sm" :turn="turn"/>
    <md2-button text="md" icon="face" icon-trailing="close" adaptive="md" :turn="turn"/>
    <md2-button text="lg" icon="face" icon-trailing="close" adaptive="lg" :turn="turn"/>
    <md2-button text="icon" icon="face" icon-trailing="close" adaptive="icon" :turn="turn"/>
    <md2-button text="icon" icon="face" icon-trailing="close" adaptive="icon" dense :turn="turn"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="outlined"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" icon="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="text" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="text" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="contained" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="md" disabled/>
    <md2-button appearance="outlined" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="auto" width="auto"/>
    <md2-button text="sm" width="sm"/>
    <md2-button text="md" width="md"/>
    <md2-button text="lg" width="lg"/>
    <md2-button text="200px" width="200px"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" width="full"/>
  </div>
  <div style="height: 100px"/>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="500"
        :object-height="500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="500"
        :object-height="1000"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="1000"
      />
    </div>
    <div class="relative w-96 h-96">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="1000"
      />
    </div>
  </div>
  <div style="height: 800px"/>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1500"
        :object-height="1500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="1500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1500"
        :object-height="2000"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="2000"
      />
    </div>
    <div class="relative w-96 h-96">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="2000"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import Md2Image from '../../md2/Md2Image/index.vue'
import { Icon } from '../../constructors/Image/Icon'
import Md2Ripple from '../../md2/Md2Ripple/index.vue'
import Md2Progress from '../../md2/Md2Progress/index.vue'
import Md2Icon from '../../md2/Md2Icon/index.vue'
import Md2Button from '../../md2/Md2Button/index.vue'
import { AssociativeType } from '../../constructors/types'
import Md2Chip from '../../md2/Md2Chip/index.vue'
import Md2Fab from '../../md2/Md2Fab/index.vue'
import Md2Window from '../../md2/Md2Window/index.vue'
import Md2Scrollbar from '../../md2/Md2Scrollbar/index.vue'
import Md2ListItem from '../../md2/Md2ListItem/index.vue'
import Md2Field from '../../md2/Md2Field/index.vue'
import Md2Mask from '../../md2/Md2Mask/index.vue'
import Md2Input from '../../md2/Md2Input/index.vue'
import Md2TextareaAutosize from '../../md2/Md2TextareaAutosize/index.vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2TextareaAutosize,
    Md2Input,
    Md2Mask,
    Md2Field,
    Md2ListItem,
    Md2Scrollbar,
    Md2Window,
    Md2Fab,
    Md2Chip,
    Md2Button,
    Md2Icon,
    Md2Progress,
    Md2Ripple,
    Md2Image
  },
  setup () {
    const data = ref('close')
    const icon = ref('close') as Ref<string | AssociativeType>
    return {
      data,
      onClick () {
        data.value = 'https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e'
      },
      onClickIcon () {
        icon.value = {
          value: 'menu',
          disabled: true
        }
      },
      onEmit (e: object) {
        console.log('e', e)
      },
      icon,
      hide: ref(),
      disabled: ref(),
      visible: ref(false),
      active: ref(false),
      turn: ref(),
      background: ref(),
      animationShow: ref(),
      inputValue: ref(''),
      text: `
      Карьера до прихода в правительство
Служба в КГБ СССР (1975—1991)

Фото из личного дела сотрудника КГБ
В 1975 году окончил юридический факультет ЛГУ[29], был направлен по распределению на работу в Комитет государственной безопасности[2]. Тогда же прошёл курсы подготовки оперативного состава на Охте («401-я школа») и был аттестован младшим офицером (старший лейтенант юстиции) в системе территориальных органов КГБ СССР[30]. В 1976 году Путин участвовал в расследовании дела, возбуждённого из-за надписи «Вы распинаете свободу, но душа человека не знает оков!», которую Олег Волков и Юлий Рыбаков нанесли на Государев бастион Петропавловской крепости[31]. После 1977 года работал по линии контрразведки в следственном отделе Управления КГБ СССР по Ленинграду и Ленинградской области[11]. Рабочее место Путина находилось в так называемом «Большом доме»[22], в 1979 году прошёл обучение на шестимесячных курсах переподготовки в Высшей школе КГБ.

В 1984 году в звании майора юстиции был откомандирован на обучение на одногодичный факультет Краснознамённого института КГБ, который окончил в 1985 году по специальности «Внешняя разведка». Путин проходил подготовку как по линии легальной, так и нелегальной разведки. Был старостой учебного отделения, изучал немецкий язык[22].

В 1985—1990 годах Путин работал в ГДР[30] по линии внешней разведки КГБ. Его руководителем был начальник советской разведгруппы в Восточной Германии, представитель КГБ СССР при Министерстве госбезопасности ГДР полковник Лазарь Матвеев (рассекречен в мае 2017 года в возрасте 90 лет). Коллегами Путина по службе в Дрездене были, в частности, Сергей Чемезов и Николай Токарев[22][32]. Путин действовал в территориальной разведточке в Дрездене под прикрытием должности директора дрезденского Дома дружбы СССР — ГДР. В сферу интересов советской разведгруппы, как рассказывал в 2018 году сам Путин, входили преимущественно страны Западной Европы — союзники США. Эти государства, прежде всего ФРГ, к середине 1980-х годов разместили на своей территории ракеты средней и меньшей дальности, нацеленные на СССР[22].

В течение командировки по выслуге лет Путин повышен в звании до подполковника и в должности до старшего помощника начальника отдела. Вскоре после падения Берлинской стены, 5 декабря 1989 года толпа немецких демонстрантов пыталась взять штурмом особняк советской резидентуры по улице Angelikastrasse 4 с целью захвата архивов КГБ, однако Путину без применения табельного оружия удалось уговорить собравшихся разойтись. Большой объём секретных оперативных документов он сжёг в печке резидентуры. В январе 1990 года Путин завершил командировку в ГДР и вернулся в Ленинград[22].

В 1989 году был награждён бронзовой медалью «За заслуги» Национальной народной армии ГДР.

После окончания загранкомандировки и возвращения в СССР, по словам Путина, добровольно отказался от перехода в центральный аппарат внешней разведки КГБ в Москве и вернулся в штат первого отдела (разведка с территории СССР) Ленинградского управления КГБ. В 1990 году в здании на Литейном подполковник Путин занимал кабинет № 643. На этом же шестом этаже, в соседнем кабинете, работал Сергей Иванов — в будущем министр обороны РФ, глава администрации президента Путина[11][22].

20 августа 1991 года, когда мэр Ленинграда Собчак отказался выполнять распоряжения ГКЧП, Путин, к тому времени работавший с Собчаком более года, написал рапорт об увольнении из КГБ; отставка была принята[22][33].

Работа в Санкт-Петербурге (1990—1996)
Портал:Политика
Россия
Coat of Arms of the Russian Federation.svg
Статья из серии
Политическая система
России

Конституция Российской Федерации

Всенародное голосование о принятии Конституции (1993)
Внесение поправок:
• 2008
• февраль 2014
• июль 2014
• 2020 (общероссийское голосование)
Президент Российской Федерации

Владимир Путин
Администрация президента
Государственный совет
Совет безопасности
Правительство

Состав правительства
Председатель правительства
Михаил Мишустин
Федеральное собрание

Совет Федерации
Сенаторы
Председатель СФ
Валентина Матвиенко
Государственная дума
Депутаты Госдумы
Председатель Госдумы
Вячеслав Володин
Судебная система

Конституционный суд
Верховный суд
Прокуратура

Федеративное устройство

Субъекты федерации
Республики • Края • Области
Города федерального значения
Автономные области
Автономные округа
Главы субъектов федерации
Федеральные территории
Выборы

Парламентские выборы:
1990 • 1993 • 1995 • 1999 • 2003 •
2007 • 2011 • 2016 • 2021
Президентские выборы:
1991 • 1996 • 2000 • 2004 • 2008 •
2012 • 2018 • 2024
Референдумы: 1991 • 1993
Политические партии
Центральная избирательная комиссия
Внешняя политика
Внутренняя политика
Военное положение
Гражданство России
Оппозиция
Права человека
Сепаратизм
Участие в международных организациях

Основная статья: Работа Владимира Путина в органах власти Ленинграда и Санкт-Петербурга
С начала весны 1990 года основным официальным местом работы Путина был Ленинградский государственный университет, в котором он стал помощником ректора Станислава Меркурьева по международным вопросам. Меркурьев позже рекомендовал Путина Собчаку как исполнительного работника[34].

В мае 1990 года, вскоре после избрания Собчака председателем Ленинградского городского Совета народных депутатов, Путин стал его советником.

С 28 июня 1991 года, после избрания Собчака на пост мэра, — исполняющий обязанности председателя, а с 15 июля — председатель Комитета по внешним связям мэрии Ленинграда (с 16 мая 1992 года — Санкт-Петербурга)[35]. Помимо комитета по внешним связям, Путин руководил комиссией мэрии по оперативным вопросам[34].

В 1992 году депутатской рабочей группой Ленсовета во главе с Мариной Салье и Юрием Гладковым (так называемой «комиссией Салье») против руководителя комитета по внешнеэкономическим связям Путина было выдвинуто обвинение в махинациях в связи с программой снабжения Санкт-Петербурга продовольствием в обмен на сырьё[36][37][38]. Впоследствии, уже исполняя обязанности президента, Путин признал, что продовольствие было поставлено не в полном объёме, однако утверждал, что «в уголовном порядке преследовать было не за что и некого», а расследования комиссия Салье в действительности не проводила[39]. По мнению Путина, этот скандал часть депутатов Ленсовета пыталась использовать для воздействия на Собчака, чтобы тот его уволил[39].

С 1993 года Собчак на время своих зарубежных поездок стал оставлять Путина заместителем вместо себя[40].

В марте 1994 года Путин был назначен первым заместителем председателя правительства Санкт-Петербурга, сохранив за собой должность руководителя комитета по внешним связям[40]. В обязанности Путина как зампреда петербургского правительства входили координация работы и взаимодействие мэрии с территориальными органами силовых и правоохранительных ведомств (ГУВД, Минобороны России, ФСБ России, прокуратура, суды, Таможенный комитет), а также политическими и общественными организациями. В ведении Путина находились регистрационная палата, а также управления мэрии: юстиции, по связям с общественностью, административных органов, гостиниц.

В 1995 году Путин возглавлял региональное отделение партии «Наш дом — Россия»[источник не указан 81 день].

В 1992—1996 годах Путин в числе «реформистски настроенных политических активистов» проходил тренинг по программе американского Национального демократического института международных отношений (англ. National Democratic Institute for International Affairs, NDI)[41].

Летом 1996 года Собчак покинул пост мэра, проиграв выборы, после чего работа Путина в мэрии Санкт-Петербурга закончилась.

Впоследствии многие из тех, кто вместе с Путиным работал в мэрии Санкт-Петербурга (И. И. Сечин, Д. А. Медведев, В. А. Зубков, А. Л. Кудрин, А. Б. Миллер, Г. О. Греф, Д. Н. Козак, В. П. Иванов, С. Е. Нарышкин, В. Л. Мутко и др.), в 2000-е годы заняли ответственные посты в правительстве России, администрации президента России и руководстве государственных компаний[42][43].

Работа в Москве (1996—1999)
В августе 1996 года, после поражения Собчака на губернаторских выборах, Владимир Путин, по собственным воспоминаниям, вновь, как и во дни августовского путча 1991 года, планировал подрабатывать в такси[44]. Бывший вице-мэр Петербурга контр-адмирал Вячеслав Щербаков упоминал, что Путина приглашали в новую администрацию Владимира Яковлева, однако Путин, по свидетельству Игоря Сечина, счёл это предательством и наотрез отказался[45][46].

Вскоре Путин был приглашён на работу в Москву на должность заместителя Павла Бородина, управляющего делами президента. Здесь он курировал юридическое управление и управление российской заграничной собственностью[47]. По мнению писателя Роя Медведева, привлекая к работе Путина, Бородин учёл его опыт в международных деловых связях[48].

26 марта 1997 года Путин был назначен заместителем руководителя Администрации президента России — начальником Главного контрольного управления президента Российской Федерации, сменив на этом посту Алексея Кудрина[47]. На эту должность его пригласил Валентин Юмашев, возглавивший Администрацию президента после того, как прежний руководитель Анатолий Чубайс перешёл на должность первого вице-премьера в правительстве Виктора Черномырдина. По словам Юмашева, именно Чубайс и предложил ему взять в администрацию Владимира Путина — «сильного кандидата, с которым он работал в Петербурге»[49].

По словам Путина, результаты проведённой Главным контрольным управлением проверки, связанной с выполнением оборонного заказа, стали одной из причин отставки министра обороны России Игоря Родионова в мае 1997 года[50].


Директор Федеральной службы безопасности РФ Владимир Путин. 1998 год
В ноябре 1997 года Путин организовал отъезд во Францию Собчака[51], к тому времени проходившего по уголовному делу о злоупотреблениях в мэрии Санкт-Петербурга[52]. Поступок Путина вызвал в Кремле глубокую признательность; так, по мнению Юмашева, этот эпизод повлиял на выбор Путина в качестве преемника Ельцина[53][54].
`
    }
  }
})
</script>

<style/>
