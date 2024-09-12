<template>
  <div class="layout">
    <div @click="$emit('close')" class="layout__wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
