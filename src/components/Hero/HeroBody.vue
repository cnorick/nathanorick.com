<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-2">
                Nathan Orick
            </h1>
            <h2 class="subtitle is-5">
                Developer
            </h2>
            <p>
                <a class="button is-outlined" href="http://www.github.com/cnorick">
                    <span class="icon">
                        <icon name="github"></icon>
                    </span>
                    <span>
                        Github
                    </span>
                </a>
                <a class="button is-outlined" href="http://www.linkedin.com/in/nathan-orick">
                    <span class="icon">
                        <icon name="linkedin"></icon>
                    </span>
                    <span>
                        LinkedIn
                    </span>
                </a>
            </p>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/github'
import 'vue-awesome/icons/linkedin'

export default {
  name: 'hero-body'
}
</script>

<style scoped>
.is-outlined {
  background-color:transparent;
  color:#fff;
}
.is-outlined:hover {
    border-color: darkcyan;
    color: #fff
}
</style>
