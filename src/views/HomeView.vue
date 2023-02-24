<template>
  <div>
    <div class="px-4 py-2"><b>fab</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab @on-click="onEmit"/>
      <md2-fab icon="face"/>
      <md2-fab text="text"/>
      <md2-fab icon="face" text="text + icon"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab icon="face" progress text="progress"/>
      <md2-fab disabled icon="face" text="disabled"/>
      <md2-fab dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab icon="face" palette="green" text="palette"/>
      <md2-fab icon="face" palette="red" text="palette"/>
      <md2-fab disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab :ripple="true" icon="face" text="ripple/true"/>
      <md2-fab :ripple="false" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>fab, adaptive</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab adaptive="sm" icon="face" text="sm"/>
      <md2-fab adaptive="md" icon="face" text="md"/>
      <md2-fab adaptive="lg" icon="face" text="lg"/>
      <md2-fab adaptive="icon" icon="face" text="icon"/>
      <md2-fab adaptive="full" icon="face" text="full"/>
    </div>

    <div class="px-4 py-2"><b>fab, rounded</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab icon="face" rounded="none" text="none"/>
      <md2-fab icon="face" rounded="standard" text="standard"/>
      <md2-fab icon="face" rounded="sm" text="sm"/>
      <md2-fab icon="face" rounded="md" text="md"/>
      <md2-fab icon="face" rounded="full" text="full"/>
    </div>

    <div class="px-4 py-2"><b>fab, width</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab icon="face" text="auto" width="auto"/>
      <md2-fab icon="face" text="sm" width="sm"/>
      <md2-fab icon="face" text="md" width="md"/>
      <md2-fab icon="face" text="lg" width="lg"/>
      <md2-fab icon="face" text="320px" width="320px"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab icon="face" text="full" width="full"/>
    </div>

    <div class="px-4 py-2"><b>fab, height</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab height="sm" icon="face" text="sm"/>
      <md2-fab height="md" icon="face" text="md"/>
      <md2-fab height="lg" icon="face" text="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab height="sm" text="sm"/>
      <md2-fab height="md" text="md"/>
      <md2-fab height="lg" text="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab height="sm" icon="face"/>
      <md2-fab height="md" icon="face"/>
      <md2-fab height="lg" icon="face"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-fab height="sm" icon="face" rounded="full" text="sm + rounded full"/>
      <md2-fab height="md" icon="face" rounded="full" text="md + rounded full"/>
      <md2-fab height="lg" icon="face" rounded="full" text="lg + rounded full"/>
    </div>

    <div class="px-4 py-2"><b>chip</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip @on-click="onEmit"/>
      <md2-chip icon="face"/>
      <md2-chip icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-chip icon="face" icon-trailing="home"/>
      <md2-chip text="text"/>
      <md2-chip icon="face" text="text + icon"/>
      <md2-chip icon-trailing="home" text="text + trailing"/>
      <md2-chip icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip icon-trailing="home" text="turn" turn/>
      <md2-chip icon="face" selected text="selected"/>
      <md2-chip icon="face" readonly text="readonly"/>
      <md2-chip icon="face" progress text="progress"/>
      <md2-chip disabled icon="face" text="disabled"/>
      <md2-chip disabled icon="face" selected text="disabled + selected"/>
      <md2-chip dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip icon="face" palette="green" text="palette"/>
      <md2-chip icon="face" palette="green" selected text="palette + selected"/>
      <md2-chip icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-chip disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip dense icon="face" text="dense"/>
      <md2-chip :ripple="true" icon="face" text="ripple/true"/>
      <md2-chip :ripple="false" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>chip, outlined</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip appearance="outlined" @on-click="onEmit"/>
      <md2-chip appearance="outlined" icon="face"/>
      <md2-chip appearance="outlined" icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-chip appearance="outlined" icon="face" icon-trailing="home"/>
      <md2-chip appearance="outlined" text="text"/>
      <md2-chip appearance="outlined" icon="face" text="text + icon"/>
      <md2-chip appearance="outlined" icon-trailing="home" text="text + trailing"/>
      <md2-chip appearance="outlined" icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip appearance="outlined" icon-trailing="home" text="turn" turn/>
      <md2-chip appearance="outlined" icon="face" selected text="selected"/>
      <md2-chip appearance="outlined" icon="face" readonly text="readonly"/>
      <md2-chip appearance="outlined" icon="face" progress text="progress"/>
      <md2-chip appearance="outlined" disabled icon="face" text="disabled"/>
      <md2-chip appearance="outlined" disabled icon="face" selected text="disabled + selected"/>
      <md2-chip appearance="outlined" dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip appearance="outlined" icon="face" palette="green" text="palette"/>
      <md2-chip appearance="outlined" icon="face" palette="green" selected text="palette + selected"/>
      <md2-chip appearance="outlined" icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-chip appearance="outlined" disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip appearance="outlined" dense icon="face" text="dense"/>
      <md2-chip appearance="outlined" :ripple="true" icon="face" text="ripple/true"/>
      <md2-chip appearance="outlined" :ripple="false" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>chip, hide</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip :hide="true" icon="face" text="true"/>
      <md2-chip :hide="false" icon="face" text="false"/>
      <md2-chip :hide="hide" icon="face" text="click" @click="hide = !hide"/>
      <md2-chip :hide="hide" dense icon="face" text="click + dense" @click="hide = !hide"/>
      <md2-chip :hide="hide" icon="face" rounded="full" text="click + rounded" @click="hide = !hide"/>
    </div>

    <div class="px-4 py-2"><b>chip, align</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip align="left" icon="face" text="left" width="lg"/>
      <md2-chip align="center" icon="face" text="center" width="lg"/>
      <md2-chip align="right" icon="face" text="right" width="lg"/>
    </div>

    <div class="px-4 py-2"><b>chip, adaptive</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip adaptive="sm" icon="face" text="sm"/>
      <md2-chip adaptive="md" icon="face" text="md"/>
      <md2-chip adaptive="lg" icon="face" text="lg"/>
      <md2-chip adaptive="icon" icon="face" text="icon"/>
      <md2-chip adaptive="full" icon="face" text="full"/>
    </div>

    <div class="px-4 py-2"><b>chip, rounded</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip icon="face" rounded="none" text="none"/>
      <md2-chip icon="face" rounded="standard" text="standard"/>
      <md2-chip icon="face" rounded="sm" text="sm"/>
      <md2-chip icon="face" rounded="md" text="md"/>
      <md2-chip icon="face" rounded="full" text="full"/>
      <md2-chip dense icon="face" rounded="full" text="full + dense"/>
    </div>

    <div class="px-4 py-2"><b>chip, width</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip icon="face" text="auto" width="auto"/>
      <md2-chip icon="face" text="sm" width="sm"/>
      <md2-chip icon="face" text="md" width="md"/>
      <md2-chip icon="face" text="lg" width="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip icon="face" text="full" width="full"/>
    </div>

    <div class="px-4 py-2"><b>chip, height</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip height="sm" icon="face" text="sm"/>
      <md2-chip height="md" icon="face" text="md"/>
      <md2-chip height="lg" icon="face" text="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-chip height="sm" icon="face" rounded="full" text="sm + rounded full"/>
      <md2-chip height="md" icon="face" rounded="full" text="md + rounded full"/>
      <md2-chip height="lg" icon="face" rounded="full" text="lg + rounded full"/>
    </div>

    <div class="px-4 py-2"><b>button</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button @on-click="onEmit"/>
      <md2-button icon="face"/>
      <md2-button icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-button icon="face" icon-trailing="home"/>
      <md2-button text="text"/>
      <md2-button icon="face" text="text + icon"/>
      <md2-button icon-trailing="home" text="text + trailing"/>
      <md2-button icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button icon-trailing="home" text="turn" turn/>
      <md2-button icon="face" selected text="selected"/>
      <md2-button icon="face" readonly text="readonly"/>
      <md2-button icon="face" progress text="progress"/>
      <md2-button disabled icon="face" text="disabled"/>
      <md2-button disabled icon="face" selected text="disabled + selected"/>
      <md2-button dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button icon="face" palette="green" text="palette"/>
      <md2-button icon="face" palette="green" selected text="palette + selected"/>
      <md2-button icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-button disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button dense icon="face" text="dense"/>
      <md2-button icon="face" lowercase text="lowercase"/>
      <md2-button :ellipsis="true" icon="face" text="ellipsis/true"/>
      <md2-button :ellipsis="false" icon="face" text="ellipsis/false"/>
      <md2-button :ripple="true" icon="face" text="ripple/true"/>
      <md2-button :ripple="false" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>button, elevated</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="elevated" @on-click="onEmit"/>
      <md2-button appearance="elevated" icon="face"/>
      <md2-button appearance="elevated" icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-button appearance="elevated" icon="face" icon-trailing="home"/>
      <md2-button appearance="elevated" text="text"/>
      <md2-button appearance="elevated" icon="face" text="text + icon"/>
      <md2-button appearance="elevated" icon-trailing="home" text="text + trailing"/>
      <md2-button appearance="elevated" icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="elevated" icon-trailing="home" text="turn" turn/>
      <md2-button appearance="elevated" icon="face" selected text="selected"/>
      <md2-button appearance="elevated" icon="face" readonly text="readonly"/>
      <md2-button appearance="elevated" icon="face" progress text="progress"/>
      <md2-button appearance="elevated" disabled icon="face" text="disabled"/>
      <md2-button appearance="elevated" disabled icon="face" selected text="disabled + selected"/>
      <md2-button appearance="elevated" dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="elevated" icon="face" palette="green" text="palette"/>
      <md2-button appearance="elevated" icon="face" palette="green" selected text="palette + selected"/>
      <md2-button appearance="elevated" icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-button appearance="elevated" disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="elevated" dense icon="face" text="dense"/>
      <md2-button appearance="elevated" icon="face" lowercase text="lowercase"/>
      <md2-button :ellipsis="true" appearance="elevated" icon="face" text="ellipsis/true"/>
      <md2-button :ellipsis="false" appearance="elevated" icon="face" text="ellipsis/false"/>
      <md2-button :ripple="true" appearance="elevated" icon="face" text="ripple/true"/>
      <md2-button :ripple="false" appearance="elevated" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>button, tonal</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="tonal" @on-click="onEmit"/>
      <md2-button appearance="tonal" icon="face"/>
      <md2-button appearance="tonal" icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-button appearance="tonal" icon="face" icon-trailing="home"/>
      <md2-button appearance="tonal" text="text"/>
      <md2-button appearance="tonal" icon="face" text="text + icon"/>
      <md2-button appearance="tonal" icon-trailing="home" text="text + trailing"/>
      <md2-button appearance="tonal" icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="tonal" icon-trailing="home" text="turn" turn/>
      <md2-button appearance="tonal" icon="face" selected text="selected"/>
      <md2-button appearance="tonal" icon="face" readonly text="readonly"/>
      <md2-button appearance="tonal" icon="face" progress text="progress"/>
      <md2-button appearance="tonal" disabled icon="face" text="disabled"/>
      <md2-button appearance="tonal" disabled icon="face" selected text="disabled + selected"/>
      <md2-button appearance="tonal" dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="tonal" icon="face" palette="green" text="palette"/>
      <md2-button appearance="tonal" icon="face" palette="green" selected text="palette + selected"/>
      <md2-button appearance="tonal" icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-button appearance="tonal" disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="tonal" dense icon="face" text="dense"/>
      <md2-button appearance="tonal" icon="face" lowercase text="lowercase"/>
      <md2-button :ellipsis="true" appearance="tonal" icon="face" text="ellipsis/true"/>
      <md2-button :ellipsis="false" appearance="tonal" icon="face" text="ellipsis/false"/>
      <md2-button :ripple="true" appearance="tonal" icon="face" text="ripple/true"/>
      <md2-button :ripple="false" appearance="tonal" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>button, outlined</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="outlined" @on-click="onEmit"/>
      <md2-button appearance="outlined" icon="face"/>
      <md2-button appearance="outlined" icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-button appearance="outlined" icon="face" icon-trailing="home"/>
      <md2-button appearance="outlined" text="text"/>
      <md2-button appearance="outlined" icon="face" text="text + icon"/>
      <md2-button appearance="outlined" icon-trailing="home" text="text + trailing"/>
      <md2-button appearance="outlined" icon="face" icon-trailing="home" text="text + icon + trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="outlined" icon-trailing="home" text="turn" turn/>
      <md2-button appearance="outlined" icon="face" selected text="selected"/>
      <md2-button appearance="outlined" icon="face" readonly text="readonly"/>
      <md2-button appearance="outlined" icon="face" progress text="progress"/>
      <md2-button appearance="outlined" disabled icon="face" text="disabled"/>
      <md2-button appearance="outlined" disabled icon="face" selected text="disabled + selected"/>
      <md2-button appearance="outlined" dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="outlined" icon="face" palette="green" text="palette"/>
      <md2-button appearance="outlined" icon="face" palette="green" selected text="palette + selected"/>
      <md2-button appearance="outlined" icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-button appearance="outlined" disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="outlined" dense icon="face" text="dense"/>
      <md2-button appearance="outlined" icon="face" lowercase text="lowercase"/>
      <md2-button :ellipsis="true" appearance="outlined" icon="face" text="ellipsis/true"/>
      <md2-button :ellipsis="false" appearance="outlined" icon="face" text="ellipsis/false"/>
      <md2-button :ripple="true" appearance="outlined" icon="face" text="ripple/true"/>
      <md2-button :ripple="false" appearance="outlined" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>button, text</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="text" @on-click="onEmit"/>
      <md2-button appearance="text" icon="face"/>
      <md2-button appearance="text" icon-trailing="home" @on-click="onEmit" @on-trailing="onEmit"/>
      <md2-button appearance="text" icon="face" icon-trailing="home"/>
      <md2-button appearance="text" text="text"/>
      <md2-button appearance="text" icon="face" text="text + icon"/>
      <md2-button appearance="text" icon-trailing="home" text="text + trailing"/>
      <md2-button appearance="text" icon="face" icon-trailing="home" text="text + icon + trailing"/>
      <md2-button appearance="text" dense icon="face" text="text + icon + dense"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="text" icon-trailing="home" text="turn" turn/>
      <md2-button appearance="text" icon="face" selected text="selected"/>
      <md2-button appearance="text" icon="face" readonly text="readonly"/>
      <md2-button appearance="text" icon="face" progress text="progress"/>
      <md2-button appearance="text" disabled icon="face" text="disabled"/>
      <md2-button appearance="text" disabled icon="face" selected text="disabled + selected"/>
      <md2-button appearance="text" dragged icon="face" text="dragged"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="text" icon="face" palette="green" text="palette"/>
      <md2-button appearance="text" icon="face" palette="green" selected text="palette + selected"/>
      <md2-button appearance="text" icon="face" palette="green" readonly text="palette + readonly"/>
      <md2-button appearance="text" disabled icon="face" palette="green" text="palette + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button appearance="text" dense icon="face" text="dense"/>
      <md2-button appearance="text" icon="face" lowercase text="lowercase"/>
      <md2-button :ellipsis="true" appearance="text" icon="face" text="ellipsis/true"/>
      <md2-button :ellipsis="false" appearance="text" icon="face" text="ellipsis/false"/>
      <md2-button :ripple="true" appearance="text" icon="face" text="ripple/true"/>
      <md2-button :ripple="false" appearance="text" icon="face" text="ripple/false"/>
    </div>

    <div class="px-4 py-2"><b>button, hide</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button :hide="true" icon="face" text="true"/>
      <md2-button :hide="false" icon="face" text="false"/>
      <md2-button :hide="hide" icon="face" text="click" @click="hide = !hide"/>
      <md2-button :hide="hide" dense icon="face" text="click + dense" @click="hide = !hide"/>
      <md2-button :hide="hide" icon="face" rounded="full" text="click + rounded" @click="hide = !hide"/>
    </div>

    <div class="px-4 py-2"><b>button, align</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button align="left" icon="face" text="left" width="lg"/>
      <md2-button align="center" icon="face" text="center" width="lg"/>
      <md2-button align="right" icon="face" text="right" width="lg"/>
    </div>

    <div class="px-4 py-2"><b>button, adaptive</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button adaptive="sm" icon="face" text="sm"/>
      <md2-button adaptive="md" icon="face" text="md"/>
      <md2-button adaptive="lg" icon="face" text="lg"/>
      <md2-button adaptive="icon" icon="face" text="icon"/>
      <md2-button adaptive="full" icon="face" text="full"/>
    </div>

    <div class="px-4 py-2"><b>button, rounded</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button icon="face" rounded="none" text="none"/>
      <md2-button icon="face" rounded="standard" text="standard"/>
      <md2-button icon="face" rounded="sm" text="sm"/>
      <md2-button icon="face" rounded="md" text="md"/>
      <md2-button icon="face" rounded="full" text="full"/>
      <md2-button dense icon="face" rounded="full" text="full + dense"/>
    </div>

    <div class="px-4 py-2"><b>button, width</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button icon="face" text="auto" width="auto"/>
      <md2-button icon="face" text="sm" width="sm"/>
      <md2-button icon="face" text="md" width="md"/>
      <md2-button icon="face" text="lg" width="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button icon="face" text="full" width="full"/>
    </div>

    <div class="px-4 py-2"><b>button, height</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button height="sm" icon="face" text="sm"/>
      <md2-button height="md" icon="face" text="md"/>
      <md2-button height="lg" icon="face" text="lg"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-button height="sm" icon="face" rounded="full" text="sm + rounded full"/>
      <md2-button height="md" icon="face" rounded="full" text="md + rounded full"/>
      <md2-button height="lg" icon="face" rounded="full" text="lg + rounded full"/>
    </div>

    <div class="px-4 py-2"><b>input</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" text="This selector could have also been written as"/>
      <md2-input v-model="inputValue" palette="green" text="green"/>
      <md2-input
        v-model="inputValue"
        palette="green"
        text="green + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" palette="green" selected text="green + selected"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input disabled palette="green" text="green + disabled"/>
      <md2-input palette="green" readonly text="green + readonly"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input text="text + value" value="value"/>
      <md2-input text="validation" validation-message="validation message"/>
      <md2-input selected text="selected"/>
      <md2-input selected text="validation + selected" validation-message="validation message"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" disabled text="disabled"/>
      <md2-input v-model="inputValue" disabled text="disabled + validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" disabled selected text="disabled + selected"/>
      <md2-input
        v-model="inputValue"
        disabled
        selected
        text="disabled + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" readonly text="readonly"/>
      <md2-input v-model="inputValue" readonly text="readonly + validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" readonly selected text="readonly + selected"/>
      <md2-input
        v-model="inputValue"
        readonly
        selected
        text="readonly + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input required text="required"/>
      <md2-input helper-message="helper message" text="helper"/>
      <md2-input counter text="counter"/>
      <md2-input counter :maxlength="12" text="counter + maxlength"/>
    </div>

    <div class="px-4 py-2"><b>input, outlined</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="outlined" text="This selector could have also been written as"/>
      <md2-input v-model="inputValue" appearance="outlined" palette="green" text="green"/>
      <md2-input
        v-model="inputValue"
        appearance="outlined"
        palette="green"
        text="green + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="outlined" palette="green" selected text="green + selected"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" text="text + value" value="value"/>
      <md2-input appearance="outlined" text="validation" validation-message="validation message"/>
      <md2-input appearance="outlined" selected text="selected"/>
      <md2-input appearance="outlined" selected text="validation + selected" validation-message="validation message"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="outlined" disabled text="disabled"/>
      <md2-input
        v-model="inputValue"
        appearance="outlined"
        disabled
        text="disabled + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="outlined" disabled selected text="disabled + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="outlined"
        disabled
        selected
        text="disabled + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="outlined" readonly text="readonly"/>
      <md2-input
        v-model="inputValue"
        appearance="outlined"
        readonly
        text="readonly + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="outlined" readonly selected text="readonly + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="outlined"
        readonly
        selected
        text="readonly + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" required text="required"/>
      <md2-input appearance="outlined" helper-message="helper message" text="helper"/>
      <md2-input appearance="outlined" counter text="counter"/>
      <md2-input appearance="outlined" counter :maxlength="12" text="counter + maxlength"/>
    </div>

    <div class="px-4 py-2"><b>input, standard</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="standard" text="This selector could have also been written as"/>
      <md2-input v-model="inputValue" appearance="standard" palette="green" text="green"/>
      <md2-input
        v-model="inputValue"
        appearance="standard"
        palette="green"
        text="green + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="standard" palette="green" selected text="green + selected"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="standard" text="text + value" value="value"/>
      <md2-input appearance="standard" text="validation" validation-message="validation message"/>
      <md2-input appearance="standard" selected text="selected"/>
      <md2-input appearance="standard" selected text="validation + selected" validation-message="validation message"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="standard" disabled text="disabled"/>
      <md2-input
        v-model="inputValue"
        appearance="standard"
        disabled
        text="disabled + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="standard" disabled selected text="disabled + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="standard"
        disabled
        selected
        text="disabled + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="standard" readonly text="readonly"/>
      <md2-input
        v-model="inputValue"
        appearance="standard"
        readonly
        text="readonly + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="standard" readonly selected text="readonly + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="standard"
        readonly
        selected
        text="readonly + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="standard" required text="required"/>
      <md2-input appearance="standard" helper-message="helper message" text="helper"/>
      <md2-input appearance="standard" counter text="counter"/>
      <md2-input appearance="standard" counter :maxlength="12" text="counter + maxlength"/>
    </div>

    <div class="px-4 py-2"><b>input, tonal</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="tonal" text="This selector could have also been written as"/>
      <md2-input v-model="inputValue" appearance="tonal" palette="green" text="green"/>
      <md2-input
        v-model="inputValue"
        appearance="tonal"
        palette="green"
        text="green + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="tonal" palette="green" selected text="green + selected"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="tonal" text="text + value" value="value"/>
      <md2-input appearance="tonal" text="validation" validation-message="validation message"/>
      <md2-input appearance="tonal" selected text="selected"/>
      <md2-input appearance="tonal" selected text="validation + selected" validation-message="validation message"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="tonal" disabled text="disabled"/>
      <md2-input
        v-model="inputValue"
        appearance="tonal"
        disabled
        text="disabled + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="tonal" disabled selected text="disabled + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="tonal"
        disabled
        selected
        text="disabled + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" appearance="tonal" readonly text="readonly"/>
      <md2-input
        v-model="inputValue"
        appearance="tonal"
        readonly
        text="readonly + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" appearance="tonal" readonly selected text="readonly + selected"/>
      <md2-input
        v-model="inputValue"
        appearance="tonal"
        readonly
        selected
        text="readonly + validation + selected"
        validation-message="validation message"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="tonal" required text="required"/>
      <md2-input appearance="tonal" helper-message="helper message" text="helper"/>
      <md2-input appearance="tonal" counter text="counter"/>
      <md2-input appearance="tonal" counter :maxlength="12" text="counter + maxlength"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input icon="face" text="text"/>
      <md2-input icon="face" text="text + value" value="value"/>
      <md2-input icon="face" text="validation" validation-message="validation message"/>
      <md2-input disabled icon="face" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, outlined, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" icon="face" text="text"/>
      <md2-input appearance="outlined" icon="face" text="text + value" value="value"/>
      <md2-input appearance="outlined" icon="face" text="validation" validation-message="validation message"/>
      <md2-input appearance="outlined" disabled icon="face" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, standard, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="standard" icon="face" text="text"/>
      <md2-input appearance="standard" icon="face" text="text + value" value="value"/>
      <md2-input appearance="standard" icon="face" text="validation" validation-message="validation message"/>
      <md2-input appearance="standard" disabled icon="face" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input icon-trailing="home" text="text"/>
      <md2-input icon-trailing="home" text="text + value" value="value"/>
      <md2-input icon-trailing="home" text="validation" validation-message="validation message"/>
      <md2-input disabled icon-trailing="home" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input icon="face" icon-trailing="home" text="text"/>
      <md2-input icon="face" icon-trailing="home" text="text + value" value="value"/>
      <md2-input
        icon="face"
        icon-trailing="home"
        text="validation"
        validation-message="validation message"
      />
      <md2-input
        disabled
        icon="face"
        icon-trailing="home"
        text="disabled"
      />
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, prefix</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input prefix="prefix" text="text"/>
      <md2-input prefix="prefix" text="text + value" value="value"/>
      <md2-input prefix="prefix" text="validation" validation-message="validation message"/>
      <md2-input disabled prefix="prefix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, prefix, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input icon="face" prefix="prefix" text="text"/>
      <md2-input icon="face" prefix="prefix" text="text + value" value="value"/>
      <md2-input
        icon="face"
        prefix="prefix"
        text="validation"
        validation-message="validation message"
      />
      <md2-input disabled icon="face" prefix="prefix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, suffix</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input suffix="suffix" text="text"/>
      <md2-input suffix="suffix" text="text + value" value="value"/>
      <md2-input suffix="suffix" text="validation" validation-message="validation message"/>
      <md2-input disabled suffix="suffix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, suffix, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input suffix="suffix" icon-trailing="home" text="text"/>
      <md2-input suffix="suffix" icon-trailing="home" text="text + value" value="value"/>
      <md2-input
        icon-trailing="home"
        suffix="suffix"
        text="validation"
        validation-message="validation message"
      />
      <md2-input
        disabled
        icon-trailing="home"
        suffix="suffix"
        text="disabled"
      />
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, align</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="left" text="left"/>
      <md2-input align="left" text="left + value" value="value"/>
      <md2-input align="left" text="left + validation" validation-message="validation message"/>
      <md2-input align="left" disabled text="left + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="center" text="center"/>
      <md2-input align="center" text="center + value" value="value"/>
      <md2-input
        align="center"
        text="center + validation"
        validation-message="validation message"
      />
      <md2-input align="center" disabled text="center + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="right" text="right"/>
      <md2-input align="right" text="right + value" value="value"/>
      <md2-input align="right" text="right + validation" validation-message="validation message"/>
      <md2-input align="right" disabled text="right + disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, align, arrow</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="left" arrow text="left"/>
      <md2-input align="left" arrow text="left + value" value="value"/>
      <md2-input
        align="left"
        arrow
        text="left + validation"
        validation-message="validation message"
      />
      <md2-input align="left" arrow disabled text="left + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="center" arrow text="center"/>
      <md2-input align="center" arrow text="center + value" value="value"/>
      <md2-input
        align="center"
        arrow
        text="center + validation"
        validation-message="validation message"
      />
      <md2-input align="center" arrow disabled text="center + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input align="right" arrow text="right"/>
      <md2-input align="right" text="right + value" arrow value="value"/>
      <md2-input
        align="right"
        arrow
        text="right + validation"
        validation-message="validation message"
      />
      <md2-input align="right" arrow disabled text="right + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input :max="9" :min="5" arrow text="arrow"/>
      <md2-input :max="9" :min="5" arrow value="5" text="arrow + min"/>
      <md2-input :max="9" :min="5" arrow value="9" text="arrow + max"/>
      <md2-input :ripple="false" arrow text="arrow + not ripple"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, cancel</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input cancel="auto" text="auto"/>
      <md2-input cancel="hide" text="hide"/>
      <md2-input cancel="always" text="always"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, rounded</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input rounded="none" text="none"/>
      <md2-input icon="face" rounded="none" text="none + icon"/>
      <md2-input icon-trailing="home" rounded="none" text="none + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" rounded="none" text="none + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input rounded="standard" text="standard"/>
      <md2-input icon="face" rounded="standard" text="standard + icon"/>
      <md2-input icon-trailing="home" rounded="standard" text="standard + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" rounded="standard" text="standard + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input rounded="sm" text="sm"/>
      <md2-input icon="face" rounded="sm" text="sm + icon"/>
      <md2-input icon-trailing="home" rounded="sm" text="sm + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" rounded="sm" text="sm + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input rounded="md" text="md"/>
      <md2-input icon="face" rounded="md" text="md + icon"/>
      <md2-input icon-trailing="home" rounded="md" text="md + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" rounded="md" text="md + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input rounded="full" text="full"/>
      <md2-input icon="face" rounded="full" text="full + icon"/>
      <md2-input icon-trailing="home" rounded="full" text="full + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" rounded="full" text="full + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input arrow rounded="full" text="full + arrow"/>
      <md2-input arrow icon="face" rounded="full" text="full + arrow + icon"/>
      <md2-input arrow icon-trailing="home" rounded="full" text="full + arrow + icon-trailing"/>
      <md2-input arrow icon="face" icon-trailing="home" rounded="full" text="full + arrow + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input arrow rounded="full" text="full + arrow"/>
      <md2-input align="left" arrow rounded="full" text="full + arrow + left"/>
      <md2-input align="center" arrow rounded="full" text="full + arrow + center"/>
      <md2-input align="right" arrow rounded="full" text="full + arrow + right"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, outlined, rounded</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" rounded="none" text="none"/>
      <md2-input appearance="outlined" icon="face" rounded="none" text="none + icon"/>
      <md2-input appearance="outlined" icon-trailing="home" rounded="none" text="none + icon-trailing"/>
      <md2-input
        appearance="outlined"
        icon="face"
        icon-trailing="home"
        rounded="none"
        text="none + icon + icon-trailing"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" rounded="standard" text="standard"/>
      <md2-input appearance="outlined" icon="face" rounded="standard" text="standard + icon"/>
      <md2-input appearance="outlined" icon-trailing="home" rounded="standard" text="standard + icon-trailing"/>
      <md2-input
        appearance="outlined"
        icon="face"
        icon-trailing="home"
        rounded="standard"
        text="standard + icon + icon-trailing"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" rounded="sm" text="sm"/>
      <md2-input appearance="outlined" icon="face" rounded="sm" text="sm + icon"/>
      <md2-input appearance="outlined" icon-trailing="home" rounded="sm" text="sm + icon-trailing"/>
      <md2-input appearance="outlined" icon="face" icon-trailing="home" rounded="sm" text="sm + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" rounded="md" text="md"/>
      <md2-input appearance="outlined" icon="face" rounded="md" text="md + icon"/>
      <md2-input appearance="outlined" icon-trailing="home" rounded="md" text="md + icon-trailing"/>
      <md2-input appearance="outlined" icon="face" icon-trailing="home" rounded="md" text="md + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" rounded="full" text="full"/>
      <md2-input appearance="outlined" icon="face" rounded="full" text="full + icon"/>
      <md2-input appearance="outlined" icon-trailing="home" rounded="full" text="full + icon-trailing"/>
      <md2-input
        appearance="outlined"
        icon="face"
        icon-trailing="home"
        rounded="full"
        text="full + icon + icon-trailing"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" arrow rounded="full" text="full + arrow"/>
      <md2-input appearance="outlined" arrow icon="face" rounded="full" text="full + arrow + icon"/>
      <md2-input appearance="outlined" arrow icon-trailing="home" rounded="full" text="full + arrow + icon-trailing"/>
      <md2-input
        appearance="outlined"
        arrow
        icon="face"
        icon-trailing="home"
        rounded="full"
        text="full + arrow + icon + icon-trailing"
      />
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input appearance="outlined" arrow rounded="full" text="full + arrow"/>
      <md2-input appearance="outlined" align="left" arrow rounded="full" text="full + arrow + left"/>
      <md2-input appearance="outlined" align="center" arrow rounded="full" text="full + arrow + center"/>
      <md2-input appearance="outlined" align="right" arrow rounded="full" text="full + arrow + right"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, height</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="xm" text="xm"/>
      <md2-input icon="face" height="xm" text="xm + icon"/>
      <md2-input icon-trailing="home" height="xm" text="xm + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="xm" text="xm + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="sm" text="sm"/>
      <md2-input icon="face" height="sm" text="sm + icon"/>
      <md2-input icon-trailing="home" height="sm" text="sm + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="sm" text="sm + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="md" text="md"/>
      <md2-input icon="face" height="md" text="md + icon"/>
      <md2-input icon-trailing="home" height="md" text="md + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="md" text="md + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="lg" text="lg"/>
      <md2-input icon="face" height="lg" text="lg + icon"/>
      <md2-input icon-trailing="home" height="lg" text="lg + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="lg" text="lg + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="xl" text="xl"/>
      <md2-input icon="face" height="xl" text="xl + icon"/>
      <md2-input icon-trailing="home" height="xl" text="xl + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="xl" text="xl + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="2xl" text="2xl"/>
      <md2-input icon="face" height="2xl" text="2xl + icon"/>
      <md2-input icon-trailing="home" height="2xl" text="2xl + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="2xl" text="2xl + icon + icon-trailing"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input height="2xl" rounded="full" text="2xl"/>
      <md2-input icon="face" height="2xl" rounded="full" text="2xl + icon"/>
      <md2-input icon-trailing="home" height="2xl" rounded="full" text="2xl + icon-trailing"/>
      <md2-input icon="face" icon-trailing="home" height="2xl" rounded="full" text="2xl + icon + icon-trailing"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, width</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input width="auto" text="auto"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input width="full" text="full"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input width="500px" text="500px"/>
    </div>
  </div>
  <div class="h-96"/>
  <div class="h-96"/>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { Icon } from '../../constructors/Image/Icon'
import { AssociativeType } from '../../constructors/types'
import Md2Input from '../../md2/Md2Input/index.vue'
import Md2Button from '../../md2/Md2Button/index.vue'
import Md2Chip from '../../md2/Md2Chip/index.vue'
import Md2Fab from '../../md2/Md2Fab/index.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Fab,
    Md2Chip,
    Md2Button,
    Md2Input
  },
  setup () {
    const data = ref('close')
    const icon = ref('close') as Ref<string | AssociativeType>
    const file = ref() as Ref<File | undefined>
    const toggle = ref(false)

    setInterval(() => {
      // toggle.value = !toggle.value
    }, 1600)

    return {
      data,
      file,
      toggle,
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
      onFile (e: Event) {
        file.value = (e.target as HTMLInputElement).files?.[0]
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
