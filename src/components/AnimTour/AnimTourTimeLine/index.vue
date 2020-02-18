<template>
  <div class="AnimTourTimeLine AnimTourFadeIn">
    <div class="AnimTourTimeLine__box AnimTourTimeLine__box--start">
      <div class="AnimTourTimeLine__index AnimTourTimeLine__index--small">&nbsp;</div>
    </div>
    <div
      :class="`AnimTourTimeLine__box
        ${index === currentIndex? 'AnimTourTimeLine__box--active' : ''}`"
      :key="step.id"
      v-for="(step, index) in scenario"
      @click="() => index === currentIndex? {} : setStep(index)"
    >
      <div
      :class="`AnimTourTimeLine__index
        ${index === currentIndex? 'AnimTourTimeLine__index--active' : ''}`"
      >{{index+1}}</div>
      <div class="AnimTourTimeLine__title">{{step.title}}</div>
    </div>
    <div class="AnimTourTimeLine__box" @click="stopTour">
      <div class="AnimTourTimeLine__index
        AnimTourTimeLine__index--small
        AnimTourTimeLine__index--end"></div>
      <div class="AnimTourTimeLine__title">{{texts.finish}}</div>
    </div>
    <div class="AnimTourTimeLine__box AnimTourTimeLine__box--end">
      <div class="AnimTourTimeLine__index AnimTourTimeLine__index--small">&nbsp;</div>
    </div>
  </div>
</template>
<style src="./style.sass" lang="sass" scoped></style>
<script src="./component.ts" lang="ts"/>
