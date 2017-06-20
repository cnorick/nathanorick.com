<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p class="copyright">&copy; 2017 Nathan Orick</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'copyright'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped, lang="scss">
@import "~bulma/sass/utilities/variables";
@import "~bulma/sass/utilities/functions";

$backgroundColor: $white;

footer.footer {
    background-color: $backgroundColor;
}
p.copyright {
    color: findColorInvert($backgroundColor)
}
</style>
