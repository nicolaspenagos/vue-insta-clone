<template>
    <section class="container">
        <aside class="photoGrid" >
        
            <LoginPhoto :imageName="imageName" :id="imageName" v-for="(imageName) in images" :key="imageName"/>
        </aside>
    
    </section>
</template>

<script>
import LoginPhoto from '../components/LoginPhoto.vue';



export default {
    data() {
        return {
            images : ["img1", "img2", "img3", "img4", "img5", "img6" , "img7", "img8", "img9"]}
        },
    components: { LoginPhoto }
}
</script>


<style lang="scss">
    .photoGrid{
        display: grid;
        grid-template-columns: auto auto auto;
    }


</style>