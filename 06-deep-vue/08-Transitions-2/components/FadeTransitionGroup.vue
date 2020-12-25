<script>
export default {
  name: 'FadeTransitionGroup',

  inheritAttrs: false,

  render(h) {
    this.$slots.default.forEach((vnode) => {
      if (vnode.data.staticClass) {
        vnode.data.staticClass += ' fade-list-item';
      } else {
        vnode.data.staticClass = 'fade-list-item';
      }
    });

    return h(
      'transition-group',
      {
        on: this.$listeners,
        attrs: this.$attrs,
        props: {
          name: 'fade-list',
        },
        class: 'fade-list',
      },
      this.$slots.default,
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
