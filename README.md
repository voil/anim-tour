# @voil/anim-tour
## What is this?

This is very basic tour animation based on the script you create.

## Why I made this?

Because I didn't find a suitable component on the network that would be light and quick to use.

## Where to get it from?

It's simple:

```
npm install @voil/anim-tour
```

or

```
yarn add @voil/anim-tour
```

## How to use this?

### First you must import styles for component.

In your `main.ts`:

```ts
import "@voil/anim-tour/dist/anim-tour.css";
```

or in some css file:

```css
@import "@voil/anim-tour/dist/anim-tour.css";
```

### Use this in components
template set:

```html
<template>
  <div id="app">
    <AnimTour
      :scenario="scenario"
      ref="animTourInstance"
    />
    <button @click="start">Start Tour</button>
    <div class="First_selector">Lorem ipsum dolor consectetur adipiscing elit.Pellentesque</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import AnimTour from '@voil/anim-tour';

@Component({
  components: {
    AnimTour,
  },
})
export default class App extends Vue {
  public scenario = [
    {
      title: 'Lorem ipsum dolor consectetur adipiscing elit.Pellentesque',
      selector: '.First_selector',
      description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque
        pellentesque mauris sit amet sapien ullamcorper,
        vel bibendum erat varius. Curabitur efficitur eleifend purus',
      `,
    },
  ];

  @Ref() readonly animTourInstance!: AnimTour;

  public start(): void {
    this.animTourInstance.startTour();
  }
}
</script>
```

### Callback handlers

You can add before and after callback show tooltip for tour.
You just have to add new parameters to your scenario.

```ts
  public scenario = [
    {
      title: 'Lorem ipsum dolor consectetur adipiscing elit.Pellentesque',
      selector: '.First_selector',
      before: this.beforeCallback(),
      description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque
        pellentesque mauris sit amet sapien ullamcorper,
        vel bibendum erat varius. Curabitur efficitur eleifend purus',
      `,
    },,
    {
      title: 'Lorem ipsum dolor consectetur adipiscing elit.Pellentesque',
      selector: '.First_selector',
      afert: this.afterCallback(),
      description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque
        pellentesque mauris sit amet sapien ullamcorper,
        vel bibendum erat varius. Curabitur efficitur eleifend purus',
      `,
    },
  ];
```

### Props for component
You can hide mini map for tour:

```ts
  <AnimTour
    :scenario="scenario"
    :is-map-visible="false"
    ref="animTourInstance"
  />
```

And change text for tooltips:

```ts
  <AnimTour
    :scenario="scenario"
    :texts="{ next: 'Next', finish: 'End tour', previous: 'Previous' }"
    ref="animTourInstance"
  />
```

Change color for tooltips:

```ts
  <AnimTour
    color="#8e44ad"
    :scenario="scenario"
    ref="animTourInstance"
  />
```


