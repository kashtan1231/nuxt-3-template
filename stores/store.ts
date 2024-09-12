import { defineStore } from 'pinia'

type State = object

export const usePackageStore = defineStore('package', {
  actions: {},
  state: (): State => ({}),
  getters: {},
})
