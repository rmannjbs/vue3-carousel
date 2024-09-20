var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, withModifiers, withDirectives, Fragment, renderList, vShow, resolveComponent, renderSlot, createBlock, createCommentVNode, createVNode } from "vue";
const autoplay = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 2e3
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: true
    },
    /**
     * Autoplay direction. User can insert backward to make autoplay move from right to left
     */
    autoplayDirection: {
      type: String,
      default: "forward"
    }
  },
  data() {
    return {
      autoplayInterval: null
    };
  },
  destroyed() {
    if (!this.$isServer) {
      this.$el.removeEventListener("mouseenter", this.pauseAutoplay);
      this.$el.removeEventListener("mouseleave", this.startAutoplay);
    }
  },
  methods: {
    pauseAutoplay() {
      if (this.autoplayInterval) {
        this.autoplayInterval = clearInterval(this.autoplayInterval);
      }
    },
    startAutoplay() {
      if (this.autoplay) {
        this.autoplayInterval = setInterval(
          this.autoplayAdvancePage,
          this.autoplayTimeout
        );
      }
    },
    restartAutoplay() {
      this.pauseAutoplay();
      this.startAutoplay();
    },
    autoplayAdvancePage() {
      this.advancePage(this.autoplayDirection);
    }
  },
  mounted() {
    if (!this.$isServer && this.autoplayHoverPause) {
      this.$el.addEventListener("mouseenter", this.pauseAutoplay);
      this.$el.addEventListener("mouseleave", this.startAutoplay);
    }
    this.startAutoplay();
  }
};
const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = void 0;
    const later = () => {
      timeout = null;
      {
        func.apply(context);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  name: "navigation",
  inject: ["carousel"],
  props: {
    /**
     * Amount of padding to apply around the label in pixels
     */
    clickTargetSize: {
      type: Number,
      default: 8
    },
    /**
     * Text content of the navigation next button
     */
    nextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    prevLabel: {
      type: String,
      default: "&#9664"
    }
  },
  emits: ["navigationclick"],
  computed: {
    /**
     * @return {boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  methods: {
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      this.$emit("navigationclick", direction);
    }
  }
};
const _hoisted_1$3 = { class: "VueCarousel-navigation" };
const _hoisted_2 = ["tabindex", "innerHTML"];
const _hoisted_3 = ["tabindex", "innerHTML"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("button", {
      type: "button",
      "aria-label": "Previous page",
      tabindex: $options.canAdvanceBackward ? 0 : -1,
      class: normalizeClass(["VueCarousel-navigation-button VueCarousel-navigation-prev", { "VueCarousel-navigation--disabled": !$options.canAdvanceBackward }]),
      style: normalizeStyle(`padding: ${$props.clickTargetSize}px; margin-right: -${$props.clickTargetSize}px;`),
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.triggerPageAdvance("backward"), ["prevent"])),
      innerHTML: $props.prevLabel
    }, null, 14, _hoisted_2),
    createElementVNode("button", {
      type: "button",
      "aria-label": "Next page",
      tabindex: $options.canAdvanceForward ? 0 : -1,
      class: normalizeClass(["VueCarousel-navigation-button VueCarousel-navigation-next", { "VueCarousel-navigation--disabled": !$options.canAdvanceForward }]),
      style: normalizeStyle(`padding: ${$props.clickTargetSize}px; margin-left: -${$props.clickTargetSize}px;`),
      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $options.triggerPageAdvance("forward"), ["prevent"])),
      innerHTML: $props.nextLabel
    }, null, 14, _hoisted_3)
  ]);
}
const Navigation = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-44b55579"]]);
const _sfc_main$2 = {
  name: "pagination",
  inject: ["carousel"],
  emits: ["paginationclick"],
  computed: {
    paginationPositionModifierName() {
      const { paginationPosition } = this.carousel;
      if (!paginationPosition.includes("overlay")) return;
      return paginationPosition;
    },
    paginationPropertyBasedOnPosition() {
      return this.carousel.paginationPosition.includes("top") ? "bottom" : "top";
    },
    paginationCount() {
      return this.carousel && this.carousel.scrollPerPage ? this.carousel.pageCount : this.carousel.slideCount || 0;
    },
    dotContainerStyle() {
      const { carousel } = this;
      if (carousel.maxPaginationDotCount === -1)
        return {
          "margin-top": `${carousel.paginationPadding * 2}px`
        };
      const doublePadding = carousel.paginationPadding * 2;
      const containerWidth = carousel.maxPaginationDotCount * (carousel.paginationSize + doublePadding);
      return {
        "margin-top": `${carousel.paginationPadding * 2}px`,
        overflow: "hidden",
        width: `${containerWidth}px`,
        margin: "0 auto",
        "white-space": "nowrap"
      };
    }
  },
  methods: {
    /**
     * Change page by index
     * @param {number} index
     * return {void}
     */
    goToPage(index) {
      this.$emit("paginationclick", index);
    },
    /**
     * Check on current dot
     * @param {number} index - dot index
     * @return {boolean}
     */
    isCurrentDot(index) {
      return index === this.carousel.currentPage;
    },
    /**
     * Generate dot title
     * @param {number} index - dot index
     * @return {string}
     */
    getDotTitle(index) {
      return this.carousel.$children[index].title ? this.carousel.$children[index].title : `Item ${index}`;
    },
    /**
     * Control dots appear and disappear
     * @param {number} index - dot index
     * @return {object} - dot(buttn) style
     */
    dotStyle(index) {
      const { carousel } = this;
      const basicBtnStyle = {};
      basicBtnStyle[`margin-${this.paginationPropertyBasedOnPosition}`] = `${carousel.paginationPadding * 2}px`;
      Object.assign(basicBtnStyle, {
        padding: `${carousel.paginationPadding}px`,
        width: `${carousel.paginationSize}px`,
        height: `${carousel.paginationSize}px`,
        "background-color": `${this.isCurrentDot(index) ? carousel.paginationActiveColor : carousel.paginationColor}`
      });
      if (carousel.maxPaginationDotCount === -1) return basicBtnStyle;
      const eachDotsWidth = carousel.paginationSize + carousel.paginationPadding * 2;
      const maxReverse = carousel.pageCount - carousel.maxPaginationDotCount;
      const translateAmount = carousel.currentPage > maxReverse ? maxReverse : carousel.currentPage <= carousel.maxPaginationDotCount / 2 ? 0 : carousel.currentPage - Math.ceil(carousel.maxPaginationDotCount / 2) + 1;
      const transformWidth = 0 - eachDotsWidth * translateAmount;
      return Object.assign(basicBtnStyle, {
        "-webkit-transform": `translate3d(${transformWidth}px,0,0)`,
        transform: `translate3d(${transformWidth}px,0,0)`,
        "-webkit-transition": `-webkit-transform ${carousel.speed / 1e3}s`,
        transition: `transform ${carousel.speed / 1e3}s`
      });
    }
  }
};
const _hoisted_1$2 = ["title", "value", "aria-label", "aria-selected", "onClick"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    class: normalizeClass(["VueCarousel-pagination", { [`VueCarousel-pagination--${$options.paginationPositionModifierName}`]: $options.paginationPositionModifierName }])
  }, [
    createElementVNode("div", {
      class: "VueCarousel-dot-container",
      role: "tablist",
      style: normalizeStyle($options.dotContainerStyle)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.paginationCount, (page, index) => {
        return openBlock(), createElementBlock("button", {
          key: `${page}_${index}`,
          class: normalizeClass(["VueCarousel-dot", { "VueCarousel-dot--active": $options.isCurrentDot(index) }]),
          "aria-hidden": "false",
          role: "tab",
          title: $options.getDotTitle(index),
          value: $options.getDotTitle(index),
          "aria-label": $options.getDotTitle(index),
          "aria-selected": $options.isCurrentDot(index) ? "true" : "false",
          style: normalizeStyle($options.dotStyle(index)),
          onClick: ($event) => $options.goToPage(index)
        }, null, 14, _hoisted_1$2);
      }), 128))
    ], 4)
  ], 2)), [
    [vShow, $options.carousel.pageCount > 1]
  ]);
}
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-3c6d1d8d"]]);
const transitionEndNames = {
  onwebkittransitionend: "webkitTransitionEnd",
  onmoztransitionend: "transitionend",
  onotransitionend: "oTransitionEnd otransitionend",
  ontransitionend: "transitionend"
};
const getTransitionEnd = () => {
  for (const name in transitionEndNames) {
    if (name in window) {
      return transitionEndNames[name];
    }
  }
};
const _sfc_main$1 = {
  name: "carousel",
  components: {
    Navigation,
    Pagination
  },
  mixins: [autoplay],
  // use `provide` to avoid `Slide` being nested with other components
  provide() {
    return {
      carousel: this
    };
  },
  props: {
    /**
     *  Adjust the height of the carousel for the current slide
     */
    adjustableHeight: {
      type: Boolean,
      default: false
    },
    /**
     * Slide transition easing for adjustableHeight
     * Any valid CSS transition easing accepted
     */
    adjustableHeightEasing: {
      type: String,
      default: "ease"
    },
    /**
     *  Center images when the size is less than the container width
     */
    centerMode: {
      type: Boolean,
      default: false
    },
    /**
     * Slide transition easing
     * Any valid CSS transition easing accepted
     */
    easing: {
      type: String,
      validator: function(value) {
        return ["ease", "linear", "ease-in", "ease-out", "ease-in-out"].includes(
          value
        ) || value.includes("cubic-bezier");
      },
      default: "ease"
    },
    /**
     * Flag to make the carousel loop around when it reaches the end
     */
    loop: {
      type: Boolean,
      default: false
    },
    /**
     * Minimum distance for the swipe to trigger
     * a slide advance
     */
    minSwipeDistance: {
      type: Number,
      default: 8
    },
    /**
     * Flag to toggle mouse dragging
     */
    mouseDrag: {
      type: Boolean,
      default: true
    },
    /**
     * Flag to toggle touch dragging
     */
    touchDrag: {
      type: Boolean,
      default: true
    },
    /**
     * Listen for an external navigation request using this prop.
     */
    navigateTo: {
      type: [Number, Array],
      default: 0
    },
    /**
     * Amount of padding to apply around the label in pixels
     */
    navigationClickTargetSize: {
      type: Number,
      default: 8
    },
    /**
     * Flag to render the navigation component
     * (next/prev buttons)
     */
    navigationEnabled: {
      type: Boolean,
      default: false
    },
    /**
     * Text content of the navigation next button
     */
    navigationNextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    navigationPrevLabel: {
      type: String,
      default: "&#9664"
    },
    /**
     * The fill color of the active pagination dot
     * Any valid CSS color is accepted
     */
    paginationActiveColor: {
      type: String,
      default: "#000000"
    },
    /**
     * The fill color of pagination dots
     * Any valid CSS color is accepted
     */
    paginationColor: {
      type: String,
      default: "#efefef"
    },
    /**
     * Flag to render pagination component
     */
    paginationEnabled: {
      type: Boolean,
      default: true
    },
    /**
     * The padding inside each pagination dot
     * Pixel values are accepted
     */
    paginationPadding: {
      type: Number,
      default: 10
    },
    /**
     * Configure the position for the pagination component.
     * The possible values are: 'bottom', 'top', 'bottom-overlay' and 'top-overlay'
     */
    paginationPosition: {
      type: String,
      default: "bottom"
    },
    /**
     * The size of each pagination dot
     * Pixel values are accepted
     */
    paginationSize: {
      type: Number,
      default: 10
    },
    /**
     * Maximum number of slides displayed on each page
     */
    perPage: {
      type: Number,
      default: 2
    },
    /**
     * Configure the number of visible slides with a particular browser width.
     * This will be an array of arrays, ex. [[320, 2], [1199, 4]]
     * Formatted as [x, y] where x=browser width, and y=number of slides displayed.
     * ex. [1199, 4] means if (window <= 1199) then show 4 slides per page
     */
    // eslint-disable-next-line vue/require-default-prop
    perPageCustom: {
      type: Array
    },
    /**
     * Resistance coefficient to dragging on the edge of the carousel
     * This dictates the effect of the pull as you move towards the boundaries
     */
    resistanceCoef: {
      type: Number,
      default: 20
    },
    /**
     * Scroll per page, not per item
     */
    scrollPerPage: {
      type: Boolean,
      default: true
    },
    /**
     *  Space padding option adds left and right padding style (in pixels) onto VueCarousel-inner.
     */
    spacePadding: {
      type: Number,
      default: 0
    },
    /**
     *  Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.
     */
    spacePaddingMaxOffsetFactor: {
      type: Number,
      default: 0
    },
    /**
     * Slide transition speed
     * Number of milliseconds accepted
     */
    speed: {
      type: Number,
      default: 500
    },
    /**
     * Name (tag) of slide component
     * Overwrite when extending slide component
     */
    tagName: {
      type: String,
      default: "slide"
    },
    /**
     * Support for v-model functionality
     */
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Number
    },
    /**
     * Support Max pagination dot amount
     */
    maxPaginationDotCount: {
      type: Number,
      default: -1
    },
    /**
     * Support right to left
     */
    rtl: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "transition-end",
    "transitionEnd",
    "transition-start",
    "transitionStart",
    "pagination-click",
    "navigation-click",
    "mounted",
    "pageChange",
    "page-change",
    "input"
  ],
  data() {
    return {
      browserWidth: null,
      carouselWidth: 0,
      currentPage: 0,
      dragging: false,
      dragMomentum: 0,
      dragOffset: 0,
      dragStartY: 0,
      dragStartX: 0,
      isTouch: typeof window !== "undefined" && "ontouchstart" in window,
      offset: 0,
      refreshRate: 16,
      slideCount: 0,
      transitionstart: "transitionstart",
      transitionend: "transitionend",
      currentHeight: "auto"
    };
  },
  computed: {
    /**
     * Given a viewport width, find the number of slides to display
     * @return {number} Number of slides to display
     */
    breakpointSlidesPerPage() {
      if (!this.perPageCustom) {
        return this.perPage;
      }
      const breakpointArray = this.perPageCustom;
      const width = this.browserWidth;
      const breakpoints = breakpointArray.sort(
        (a, b) => a[0] > b[0] ? -1 : 1
      );
      const matches = breakpoints.filter(
        (breakpoint) => width >= breakpoint[0]
      );
      const match = matches[0] && matches[0][1];
      return match || this.perPage;
    },
    /**
     * @return {boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.loop || this.offset < this.maxOffset;
    },
    /**
     * @return {boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.loop || this.currentPage > 0;
    },
    /**
     * Number of slides to display per page in the current context.
     * This is constant unless responsive perPage option is set.
     * @return {number} The number of slides per page to display
     */
    currentPerPage() {
      return !this.perPageCustom || this.$isServer ? this.perPage : this.breakpointSlidesPerPage;
    },
    /**
     * The horizontal distance the inner wrapper is offset while navigating.
     * @return {number} Pixel value of offset to apply
     */
    currentOffset() {
      if (this.isCenterModeEnabled) {
        return 0;
      } else if (this.rtl) {
        return (this.offset - this.dragOffset) * 1;
      } else {
        return (this.offset + this.dragOffset) * -1;
      }
    },
    isHidden() {
      return this.carouselWidth <= 0;
    },
    /**
     * Maximum offset the carousel can slide
     * Considering the spacePadding
     * @return {number}
     */
    maxOffset() {
      return Math.max(
        this.slideWidth * (this.slideCount - this.currentPerPage) - this.spacePadding * this.spacePaddingMaxOffsetFactor,
        0
      );
    },
    /**
     * Calculate the number of pages of slides
     * @return {number} Number of pages
     */
    pageCount() {
      return this.scrollPerPage ? Math.ceil(this.slideCount / this.currentPerPage) : this.slideCount - this.currentPerPage + 1;
    },
    /**
     * Calculate the width of each slide
     * @return {number} Slide width
     */
    slideWidth() {
      const width = this.carouselWidth - this.spacePadding * 2;
      const perPage = this.currentPerPage;
      return width / perPage;
    },
    /**
     * @return {boolean} Is navigation required?
     */
    isNavigationRequired() {
      return this.slideCount > this.currentPerPage;
    },
    /**
     * @return {boolean} Center images when have less than min currentPerPage value
     */
    isCenterModeEnabled() {
      return this.centerMode && !this.isNavigationRequired;
    },
    transitionStyle() {
      const speed = `${this.speed / 1e3}s`;
      const transtion = `${speed} ${this.easing} transform`;
      if (this.adjustableHeight) {
        return `${transtion}, height ${speed} ${this.adjustableHeightEasing || this.easing}`;
      }
      return transtion;
    },
    padding() {
      const padding = this.spacePadding;
      return padding > 0 ? padding : false;
    }
  },
  watch: {
    value(val) {
      if (val !== this.currentPage) {
        this.goToPage(val);
        this.render();
      }
    },
    navigateTo: {
      immediate: true,
      handler(val) {
        if (typeof val === "object") {
          if (val[1] == false) {
            this.dragging = true;
            setTimeout(() => {
              this.dragging = false;
            }, this.refreshRate);
          }
          this.$nextTick(() => {
            this.goToPage(val[0]);
          });
        } else {
          this.$nextTick(() => {
            this.goToPage(val);
          });
        }
      }
    },
    currentPage(val) {
      this.$emit("pageChange", val);
      this.$emit("page-change", val);
      this.$emit("input", val);
    },
    autoplay(val) {
      if (val === false) {
        this.pauseAutoplay();
      } else {
        this.restartAutoplay();
      }
    }
  },
  beforeUpdate() {
    this.computeCarouselWidth();
  },
  beforeUnmount() {
    this.detachMutationObserver();
    window.removeEventListener("resize", this.getBrowserWidth);
    this.$refs["VueCarousel-inner"].removeEventListener(
      this.transitionstart,
      this.handleTransitionStart
    );
    this.$refs["VueCarousel-inner"].removeEventListener(
      this.transitionend,
      this.handleTransitionEnd
    );
    this.$refs["VueCarousel-wrapper"].removeEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    );
  },
  mounted() {
    window.addEventListener(
      "resize",
      debounce(this.onResize, this.refreshRate)
    );
    if (this.isTouch && this.touchDrag || this.mouseDrag) {
      this.$refs["VueCarousel-wrapper"].addEventListener(
        this.isTouch ? "touchstart" : "mousedown",
        this.onStart
      );
    }
    this.attachMutationObserver();
    this.computeCarouselWidth();
    this.computeCarouselHeight();
    this.transitionstart = getTransitionEnd();
    this.$refs["VueCarousel-inner"].addEventListener(
      this.transitionstart,
      this.handleTransitionStart
    );
    this.transitionend = getTransitionEnd();
    this.$refs["VueCarousel-inner"].addEventListener(
      this.transitionend,
      this.handleTransitionEnd
    );
    this.$emit("mounted");
    if (this.autoplayDirection === "backward") {
      this.goToLastSlide();
    }
  },
  methods: {
    /**
     * @return {number} The index of the next page
     */
    getNextPage() {
      if (this.currentPage < this.pageCount - 1) {
        return this.currentPage + 1;
      }
      return this.loop ? 0 : this.currentPage;
    },
    /**
     * @return {number} The index of the previous page
     */
    getPreviousPage() {
      if (this.currentPage > 0) {
        return this.currentPage - 1;
      }
      return this.loop ? this.pageCount - 1 : this.currentPage;
    },
    /**
     * Increase/decrease the current page value
     * @param  {string} direction (Optional) The direction to advance
     */
    advancePage(direction) {
      if (direction && direction === "backward" && this.canAdvanceBackward) {
        this.goToPage(this.getPreviousPage(), "navigation");
      } else if ((!direction || direction && direction !== "backward") && this.canAdvanceForward) {
        this.goToPage(this.getNextPage(), "navigation");
      }
    },
    goToLastSlide() {
      this.dragging = true;
      setTimeout(() => {
        this.dragging = false;
      }, this.refreshRate);
      this.$nextTick(() => {
        this.goToPage(this.pageCount);
      });
    },
    /**
     * A mutation observer is used to detect changes to the containing node
     * in order to keep the magnet container in sync with the height its reference node.
     */
    attachMutationObserver() {
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      if (MutationObserver) {
        let config = {
          attributes: true,
          data: true
        };
        if (this.adjustableHeight) {
          config = __spreadProps(__spreadValues({}, config), {
            childList: true,
            subtree: true,
            characterData: true
          });
        }
        this.mutationObserver = new MutationObserver(() => {
          this.$nextTick(() => {
            this.computeCarouselWidth();
            this.computeCarouselHeight();
          });
        });
        if (this.$parent.$el) {
          const carouselInnerElements = this.$el.getElementsByClassName("VueCarousel-inner");
          for (let i = 0; i < carouselInnerElements.length; i++) {
            this.mutationObserver.observe(carouselInnerElements[i], config);
          }
        }
      }
    },
    handleNavigation(direction) {
      this.advancePage(direction);
      this.pauseAutoplay();
      this.$emit("navigation-click", direction);
    },
    /**
     * Stop listening to mutation changes
     */
    detachMutationObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
    },
    /**
     * Get the current browser viewport width
     * @return {number} Browser"s width in pixels
     */
    getBrowserWidth() {
      this.browserWidth = window.innerWidth;
      return this.browserWidth;
    },
    /**
     * Get the width of the carousel DOM element
     * @return {number} Width of the carousel in pixels
     */
    getCarouselWidth() {
      const carouselInnerElements = this.$el.getElementsByClassName("VueCarousel-inner");
      for (let i = 0; i < carouselInnerElements.length; i++) {
        if (carouselInnerElements[i].clientWidth > 0) {
          this.carouselWidth = carouselInnerElements[i].clientWidth || 0;
        }
      }
      return this.carouselWidth;
    },
    /**
     * Get the maximum height of the carousel active slides
     * @return {string} The carousel height
     */
    getCarouselHeight() {
      if (!this.adjustableHeight) {
        return "auto";
      }
      const slideOffset = this.currentPerPage * (this.currentPage + 1) - 1;
      const maxSlideHeight = [...Array(this.currentPerPage)].map((_, idx) => this.getSlide(slideOffset + idx)).reduce(
        (clientHeight, slide) => Math.max(clientHeight, slide && slide.$el.clientHeight || 0),
        0
      );
      this.currentHeight = maxSlideHeight === 0 ? "auto" : `${maxSlideHeight}px`;
      return this.currentHeight;
    },
    /**
     * Filter slot contents to slide instances and return length
     * @return {number} The number of slides
     */
    getSlideCount() {
      this.slideCount = this.$slots && this.$slots.default && this.$slots.default.filter(
        (slot) => slot.tag && slot.tag.match(`^vue-component-\\d+-${this.tagName}$`) !== null
      ).length || 0;
    },
    /**
     * Gets the slide at the specified index
     * @return {object} The slide at the specified index
     */
    getSlide(index) {
      const slides = this.$children.filter(
        (child) => child.$vnode.tag.match(`^vue-component-\\d+-${this.tagName}$`) !== null
      );
      return slides[index];
    },
    /**
     * Set the current page to a specific value
     * This function will only apply the change if the value is within the carousel bounds
     * for carousel scrolling per page.
     * @param  {number} page The value of the new page number
     * @param  {string|undefined} advanceType An optional value describing the type of page advance
     */
    goToPage(page, advanceType) {
      if (page >= 0 && page <= this.pageCount) {
        this.offset = this.scrollPerPage ? Math.min(
          this.slideWidth * this.currentPerPage * page,
          this.maxOffset
        ) : this.slideWidth * page;
        if (this.autoplay && !this.autoplayHoverPause) {
          this.restartAutoplay();
        }
        this.currentPage = page;
        if (advanceType === "pagination") {
          this.pauseAutoplay();
          this.$emit("pagination-click", page);
        }
      }
    },
    /**
     * Trigger actions when mouse is pressed
     * @param  {object} e The event object
     */
    /* istanbul ignore next */
    onStart(e) {
      if (e.button == 2) {
        return;
      }
      document.addEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onEnd,
        true
      );
      document.addEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag,
        true
      );
      this.startTime = e.timeStamp;
      this.dragging = true;
      this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX;
      this.dragStartY = this.isTouch ? e.touches[0].clientY : e.clientY;
    },
    /**
     * Trigger actions when mouse is released
     * @param  {object} e The event object
     */
    onEnd(e) {
      if (this.autoplay && !this.autoplayHoverPause) {
        this.restartAutoplay();
      }
      this.pauseAutoplay();
      const eventPosX = this.isTouch ? e.changedTouches[0].clientX : e.clientX;
      const deltaX = this.dragStartX - eventPosX;
      this.dragMomentum = deltaX / (e.timeStamp - this.startTime);
      if (this.minSwipeDistance !== 0 && Math.abs(deltaX) >= this.minSwipeDistance) {
        const width = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
        this.dragOffset = this.dragOffset + Math.sign(deltaX) * (width / 2);
      }
      if (this.rtl) {
        this.offset -= this.dragOffset;
      } else {
        this.offset += this.dragOffset;
      }
      this.dragOffset = 0;
      this.dragging = false;
      this.render();
      document.removeEventListener(
        this.isTouch ? "touchend" : "mouseup",
        this.onEnd,
        true
      );
      document.removeEventListener(
        this.isTouch ? "touchmove" : "mousemove",
        this.onDrag,
        true
      );
    },
    /**
     * Trigger actions when mouse is pressed and then moved (mouse drag)
     * @param  {object} e The event object
     */
    onDrag(e) {
      const eventPosX = this.isTouch ? e.touches[0].clientX : e.clientX;
      const eventPosY = this.isTouch ? e.touches[0].clientY : e.clientY;
      const newOffsetX = this.dragStartX - eventPosX;
      const newOffsetY = this.dragStartY - eventPosY;
      if (this.isTouch && Math.abs(newOffsetX) < Math.abs(newOffsetY)) {
        return;
      }
      e.stopImmediatePropagation();
      this.dragOffset = newOffsetX;
      const nextOffset = this.offset + this.dragOffset;
      if (this.rtl) {
        if (this.offset == 0 && this.dragOffset > 0) {
          this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset);
        } else if (this.offset == this.maxOffset && this.dragOffset < 0) {
          this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset);
        }
      } else {
        if (nextOffset < 0) {
          this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset);
        } else if (nextOffset > this.maxOffset) {
          this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset);
        }
      }
    },
    onResize() {
      this.computeCarouselWidth();
      this.computeCarouselHeight();
      this.dragging = true;
      this.render();
      setTimeout(() => {
        this.dragging = false;
      }, this.refreshRate);
    },
    render() {
      if (this.rtl) {
        this.offset -= Math.max(
          -this.currentPerPage + 1,
          Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)
        ) * this.slideWidth;
      } else {
        this.offset += Math.max(
          -this.currentPerPage + 1,
          Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)
        ) * this.slideWidth;
      }
      const width = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
      const lastFullPageOffset = width * Math.floor(this.slideCount / (this.currentPerPage - 1));
      const remainderOffset = lastFullPageOffset + this.slideWidth * (this.slideCount % this.currentPerPage);
      if (this.offset > (lastFullPageOffset + remainderOffset) / 2) {
        this.offset = remainderOffset;
      } else {
        this.offset = width * Math.round(this.offset / width);
      }
      this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));
      this.currentPage = this.scrollPerPage ? Math.round(this.offset / this.slideWidth / this.currentPerPage) : Math.round(this.offset / this.slideWidth);
    },
    /**
     * Re-compute the width of the carousel and its slides
     */
    computeCarouselWidth() {
      this.getSlideCount();
      this.getBrowserWidth();
      this.getCarouselWidth();
      this.setCurrentPageInBounds();
    },
    /**
     * Re-compute the height of the carousel and its slides
     */
    computeCarouselHeight() {
      this.getCarouselHeight();
    },
    /**
     * When the current page exceeds the carousel bounds, reset it to the maximum allowed
     */
    setCurrentPageInBounds() {
      if (!this.canAdvanceForward && this.scrollPerPage) {
        const setPage = this.pageCount - 1;
        this.currentPage = setPage >= 0 ? setPage : 0;
        this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));
      }
    },
    handleTransitionStart() {
      this.$emit("transitionStart");
      this.$emit("transition-start");
    },
    handleTransitionEnd() {
      this.$emit("transitionEnd");
      this.$emit("transition-end");
    }
  }
};
const _hoisted_1$1 = {
  ref: "VueCarousel-wrapper",
  class: "VueCarousel-wrapper"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_navigation = resolveComponent("navigation");
  const _component_pagination = resolveComponent("pagination");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["VueCarousel", { "VueCarousel--reverse": $props.paginationPosition === "top" }])
  }, [
    createElementVNode("div", _hoisted_1$1, [
      createElementVNode("div", {
        ref: "VueCarousel-inner",
        class: normalizeClass([
          "VueCarousel-inner",
          { "VueCarousel-inner--center": $options.isCenterModeEnabled }
        ]),
        style: normalizeStyle({
          transform: `translate(${$options.currentOffset}px, 0)`,
          transition: $data.dragging ? "none" : $options.transitionStyle,
          "ms-flex-preferred-size": `${$options.slideWidth}px`,
          "webkit-flex-basis": `${$options.slideWidth}px`,
          "flex-basis": `${$options.slideWidth}px`,
          visibility: $options.slideWidth ? "visible" : "hidden",
          height: `${$data.currentHeight}`,
          "padding-left": `${$options.padding}px`,
          "padding-right": `${$options.padding}px`
        })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6)
    ], 512),
    $props.navigationEnabled ? renderSlot(_ctx.$slots, "navigation", { key: 0 }, () => [
      $options.isNavigationRequired ? (openBlock(), createBlock(_component_navigation, {
        key: 0,
        "click-target-size": $props.navigationClickTargetSize,
        "next-label": $props.navigationNextLabel,
        "prev-label": $props.navigationPrevLabel,
        onNavigationclick: $options.handleNavigation
      }, null, 8, ["click-target-size", "next-label", "prev-label", "onNavigationclick"])) : createCommentVNode("", true)
    ]) : createCommentVNode("", true),
    $props.paginationEnabled ? renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
      createVNode(_component_pagination, {
        onPaginationclick: _cache[0] || (_cache[0] = ($event) => $options.goToPage($event, "pagination"))
      })
    ]) : createCommentVNode("", true)
  ], 2);
}
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "slide",
  inject: ["carousel"],
  props: ["title"],
  emits: ["slideclick", "slide-click"],
  data() {
    return {
      width: null
    };
  },
  computed: {
    activeSlides() {
      const { currentPage, breakpointSlidesPerPage, $children } = this.carousel;
      const activeSlides = [];
      const children = $children.filter(
        (child) => child.$el && child.$el.className.includes("VueCarousel-slide")
      ).map((child) => child._uid);
      let i = 0;
      while (i < breakpointSlidesPerPage) {
        const child = children[currentPage * breakpointSlidesPerPage + i];
        activeSlides.push(child);
        i++;
      }
      return activeSlides;
    },
    /**
     * `isActive` describes whether a slide is visible
     * @return {boolean}
     */
    isActive() {
      return this.activeSlides.includes(this._uid);
    },
    /**
     * `isCenter` describes whether a slide is in the center of all visible slides
     * if perPage is an even number, we quit
     * @return {boolean}
     */
    isCenter() {
      const { breakpointSlidesPerPage } = this.carousel;
      if (breakpointSlidesPerPage % 2 === 0 || !this.isActive) return false;
      return this.activeSlides.indexOf(this._uid) === Math.floor(breakpointSlidesPerPage / 2);
    },
    /**
     * `isAdjustableHeight` describes if the carousel adjusts its height to the active slide(s)
     * @return {boolean}
     */
    isAdjustableHeight() {
      const { adjustableHeight } = this.carousel;
      return adjustableHeight;
    }
  },
  mounted() {
    if (!this.$isServer) {
      this.$el.addEventListener("dragstart", (e) => e.preventDefault());
    }
    this.$el.addEventListener(
      this.carousel.isTouch ? "touchend" : "mouseup",
      this.onTouchEnd
    );
  },
  methods: {
    onTouchEnd(e) {
      const eventPosX = this.carousel.isTouch && e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX;
      const deltaX = this.carousel.dragStartX - eventPosX;
      if (this.carousel.minSwipeDistance === 0 || Math.abs(deltaX) < this.carousel.minSwipeDistance) {
        this.$emit("slideclick", Object.assign({}, e.currentTarget.dataset));
        this.$emit("slide-click", Object.assign({}, e.currentTarget.dataset));
      }
    }
  }
};
const _hoisted_1 = ["aria-hidden"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["VueCarousel-slide", {
      "VueCarousel-slide-active": $options.isActive,
      "VueCarousel-slide-center": $options.isCenter,
      "VueCarousel-slide-adjustableHeight": $options.isAdjustableHeight
    }]),
    tabindex: "-1",
    "aria-hidden": !$options.isActive,
    role: "tabpanel"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1);
}
const Slide = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const install = (Vue) => {
  Vue.component("carousel", Carousel);
  Vue.component("slide", Slide);
};
export {
  Carousel,
  Slide,
  install
};
//# sourceMappingURL=v.mjs.map
