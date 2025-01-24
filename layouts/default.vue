<template>
  <div class="layout">
    <MHeader />

    <div class="layout__wrapper">
      <slot></slot>
    </div>

    <MFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
