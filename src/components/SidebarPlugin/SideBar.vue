<template>
  <div
    :class="{ hide: !$sidebar.showSidebar, sidebar: true }"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <md-button class="toggle burger" :class="{ rotate: !$sidebar.showSidebar }" @click="toggleSidebar">
      <span class="icon-bar arrow"></span>
    </md-button>
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="" />
        </div>
      </a>

      <a
        href="https://www.creative-tim.com/product/vue-material-dashboard"
        target="_blank"
        class="simple-text logo-normal"
      >
        {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link v-for="(link, index) in sidebarLinks" :key="link.name + index" :to="link.path" :link="link">
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Vue MD",
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg"),
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/vue-logo.png"),
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: (value) => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
};
</script>
<style scoped lang="scss">
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

.burger {
  position: absolute;
  z-index: 10;
  top: 73px;
  right: -15px;
  min-width: 30px;
  width: 30px;
  height: 30px;
  background-color: #fff !important;
  border-radius: 50%;
  margin: 0;

  & .arrow {
    border-radius: 1px;
    width: 9px;
    height: 9px;
    border-top: 2px solid #171f33;
    border-left: 2px solid #171f33;
    transform: rotate(-45deg);
    position: absolute;
    left: -17.5px;
  }

  &.rotate {
    transform: rotate(180deg);
  }
}
</style>
