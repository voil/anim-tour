<template>
  <div
    v-if="currentStep"
    class="AnimTourTooltip AnimTourFadeIn"
    ref="animTourTooltipInstance"
    :style="`top:${position.y}px;left:${position.x}px`"
  >
    <div class="AnimTourTooltip__content">
      <h3 class="AnimTourTooltip__title">
        <svg
          class="AnimTourTooltip__icon"
          viewBox="0 0 20 20"
        >
          <path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,
          8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,
          8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,
          10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,
          0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,
          10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,
          6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,
          0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,
          6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,
          2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,
          0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,
          3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,
          0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,
          0.294-0.12h7.881V3.959z"></path>
        </svg>
        <div class="AnimTourTooltip__text">{{currentStep.title}}</div>
      </h3>
      <p class="AnimTourTooltip__description">{{currentStep.description}}</p>
      <i :class="`${settingsTooltip.typePosition === 'top'
        ? 'AnimTourTooltip__tringle-top' : 'AnimTourTooltip__tringle-bottom'}`"></i>
      <div v-if="scenario.length > 1" class="AnimTourTooltip__footer">
        <button
          v-if="currentIndex > 0"
          @click="() => changeStepTour('previous')"
          :style="getMainColorButton"
          class="AnimTourTooltip__button">{{texts.previous}}</button>
        <button
          @click="() => changeStepTour('next')"
          v-if="currentIndex < scenario.length-1"
          :style="getMainColorButton"
          class="AnimTourTooltip__button AnimTourTooltip__button--end">
          {{texts.next}}
        </button>
        <button
          @click="stopTour"
          :style="getMainColorButton"
          v-if="currentIndex === scenario.length-1"
          class="AnimTourTooltip__button AnimTourTooltip__button--end">
          {{texts.finish}}
        </button>
      </div>
      <svg
        @click="stopTour"
        class="AnimTourTooltip__close"
        viewBox="0 0 20 20"
      >
        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,
        8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,
        1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,
        7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,
        17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,
        0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,
        6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,
        0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,
        0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,
        2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,
        0-0.637L10.824,10z"></path>
      </svg>
    </div>
  </div>
</template>
<style src="./style.sass" lang="sass" scoped></style>
<script src="./component.ts" lang="ts"/>
