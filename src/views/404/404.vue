<template>
    <section class="not-match user-select-none">
        <div>
            <img src="../../assets/images/not-match.gif" alt="未匹配" class="pointer-events-none" />
            <div class="page-text">卧槽！页面不见了！</div>
            <div class="go">
                <router-link to="/">首页</router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'NotMatch'
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.not-match {
    padding-top: 30px;
    text-align: center;
    @include center(center, flex-start, center, start);

    .page-text {
        padding: 10px 0;
        border: 1px solid #ddd;
        background: #f5f5f5;
    }

    .go {
        margin-top: 15px;

        span {
            cursor: pointer;
        }
    }
}
</style>
