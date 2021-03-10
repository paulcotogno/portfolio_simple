<template>
    <div class="galery_max">
        <img :src="'img/galery/' + source" alt="">
    </div>
</template>

<script>
export default {
    props: {
        source: {
            type: String,
            default: '1.png',
        }
    }
}
</script>

<style lang="scss">

</style>