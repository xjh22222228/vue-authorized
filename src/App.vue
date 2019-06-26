<template>
	<div id="xiejiahe">
		<div class="go-top user-select-none" @click="goTop">
			<p>回</p>
			<p>顶</p>
			<p>部</p>
		</div>
		<div class="router-view">
			<Header />
				<router-view />
			<Footer />
		</div>
	</div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
  },
  setup() {
    const goTop = () => {
      window.scrollTo(0, 0);
    };

    return {
      goTop
    }
  }
}
</script>

<style lang="scss">
.go-top {
  z-index: 666;
  position: fixed;
  bottom: 30px;
  right: 15px;
  padding: 5px 10px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #e1e1e1;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }

  p {
    color: #666;
  }
}

// sticky footer
.router-view {
  display: flex;
  flex-direction: column;

  & > section {
    min-height: 100vh;
    flex: 1;
  }
}
</style>
