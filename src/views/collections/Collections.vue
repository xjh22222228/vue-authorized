<template>
    <section class="index-section">
        <div class="topics-container collections">
            <div class="collections-loading" v-show="loading">loading...</div>
            <div class="collections-title">
                <router-link to="/">主页</router-link>
                <em class="slashes"> / </em>
                <span>{{ loginname }} 收藏的话题</span>
            </div>
            <List :topics="userCollections" />
        </div>
        <Sidebar />
    </section>
</template>

<script>
import API_CONFIG from '../../api'
export default {
    name: 'Collections',
    props: ['loginname'],
    data () {
        return {
            userCollections: [],
            loading: true,
        }
    },
    created () {
        this.fetchCollections();
    },
    methods: {
        fetchCollections () {
            axios.get(`${API_CONFIG.userCollections}${this.$route.params.loginname}`)
            .then(res => {
                if( res.data.success ) {
                    this.userCollections = res.data.data;
                    this.loading = false;
                }
            })
            .catch(e => {
                this.$Message.warning('不存在此用户');
                this.$router.replace('/');
            });
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.collections {
    position: relative;
    min-height: 250px;
    background: #fff;

    .collections-loading {
        position: absolute;
        top: 80px;
        left: calc(50% - 30px);
    }

    .collections-title {
        padding: 10px;
        background: $boxTopColor;

        a {
            color: #80bd01;

            &:hover {
                text-decoration: underline;
            }
        }

        em {
            color: #ccc;
        }

        span {
            color: #999;
        }
    }
}
</style>
