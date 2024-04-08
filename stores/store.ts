import { defineStore } from 'pinia'

interface State {}

export const usePackageStore = defineStore('package', {
  actions: {},
  state: (): State => ({}),
  getters: {},
})
