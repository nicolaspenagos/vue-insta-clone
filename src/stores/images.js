   import { ref, computed } from 'vue'
   import { defineStore } from 'pinia'

   export const useImagesStore = defineStore('images', () => {

       let imagesPaths = ''

       const getImagePaths = computed(() => imagesPaths)

       function addPath(newPath) {


           if (!imagesPaths.includes(newPath)) {
               imagesPaths = imagesPaths + newPath;
           }

       }

       return { imagesPaths, getImagePaths, addPath }
   })