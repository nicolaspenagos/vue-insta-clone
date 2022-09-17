<template>
    <div class="backdrop" @click.self="cerrarModal">
        <aside class="modal-container">
            <h1 :class="titleClass">{{ title }}</h1>
            <slot>
                <p>Valor por defecto si no se envia el slot desde el padre</p>
            </slot>
                <button v-if="showButton" @click="cerrarModal"> cerrar </button>
            <slot name="links"></slot>    
        </aside>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
    props: {
        title: String,
        showButton: Boolean,
        titleColor: String
    },
    methods: {
        cerrarModal() {
            this.$emit('close')
        }
    },
    computed: {
        titleClass() {
            return `title--${this.titleColor}`
        }
    }
}
</script> 
<style scoped lang="scss">
.title--purple {
    color: purple;
}

.title--blue {
    color: darkblue;
}

h3 {
 color: red;
}

.backdrop {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
}

.modal-container {
    width: 800px;
    padding: 50px;
    background-color: white;
    z-index: 30;
}

</style>
