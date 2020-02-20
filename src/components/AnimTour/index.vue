<template>
  <div class="AnimTour" ref="animTourInstance">
    <AnimTourTooltip
      :texts="texts"
      :color="color"
      :scenario="scenario"
      v-on:stopTour="stopTour"
      v-if="settingsAnimTour.isToolTipVisible"
      :current-index="currentStepNumber"
      :mask-properties="maskProperties"
      :current-step="currentStep || null"
      v-on:changeStepTour="changeStepTour"
    />
    <AnimTourTimeLine
      :texts="texts"
      :color="color"
      v-if="isMapVisible"
      v-on:setStep="setStep"
      v-on:stopTour="stopTour"
      :scenario="getScenarioWhitId"
      :current-step="currentStep || null"
      :current-index="currentStepNumber"
    />
    <svg>
      <path
        :d="getMaskProperties"
        fill="rgba(0, 0, 0, 0.5)"
        stroke-width="0.5"
        stroke="#2980b9"
        stroke-dasharray="2, 1"
      />
    </svg>
  </div>
</template>
<style src="./style.sass" lang="sass" scoped></style>
<script src="./component.ts" lang="ts"/>
