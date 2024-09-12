<template>
  <div class="layout">
    <div class="layout__wrapper" @click="$emit('close')">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
